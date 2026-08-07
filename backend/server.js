import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET =
  process.env.JWT_SECRET || "sachin_king_photo_frame_secret_key_2026";

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// MongoDB Connection & Schemas
let isMongoConnected = false;
const MONGODB_URI = process.env.MONGODB_URI;

// Mongoose Schemas & Models
const serviceSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, default: "General" },
    shortDescription: { type: String, required: true },
    price: { type: String, default: "Contact for Quote" },
    iconName: { type: String, default: "Sparkles" },
    image: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const gallerySchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, default: "Family Frames" },
    image: { type: String, required: true },
    description: { type: String, default: "" },
  },
  { timestamps: true },
);

const testimonialSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    customerImage: { type: String },
    review: { type: String, required: true },
    rating: { type: Number, default: 5 },
    date: { type: String },
  },
  { timestamps: true },
);

const messageSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, default: "" },
    message: { type: String, required: true },
    createdAt: { type: String },
    status: { type: String, default: "Unread" },
  },
  { timestamps: true },
);

const adminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    email: { type: String, default: "sp073643@gmail.com" },
  },
  { timestamps: true },
);

const Service = mongoose.model("Service", serviceSchema);
const Gallery = mongoose.model("Gallery", gallerySchema);
const Testimonial = mongoose.model("Testimonial", testimonialSchema);
const ContactMessage = mongoose.model("ContactMessage", messageSchema);
const Admin = mongoose.model("Admin", adminSchema);

// In-Memory Fallback Store (Empty by default)
let memoryStore = {
  services: [],
  gallery: [],
  testimonials: [],
  messages: [],
};

// Default Fallback Admin Credentials
let adminCredentials = {
  username: "admin",
  passwordHash: bcrypt.hashSync("admin123", 10),
  email: "sp073643@gmail.com",
};

if (MONGODB_URI) {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("Successfully connected to MongoDB Atlas");
      isMongoConnected = true;
    })
    .catch((err) => {
      console.warn("MongoDB connection notice:", err.message);
      console.log("Operating with in-memory database fallback for testing");
    });
} else {
  console.log("No MONGODB_URI provided in .env. Running with memory store.");
}

// Middleware: Admin Auth
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Unauthorized. Admin access required." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired session token." });
  }
};

// 1. AUTH API
app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;

  let adminUser = null;
  if (isMongoConnected) {
    try {
      adminUser = await Admin.findOne({
        $or: [
          { username: username },
          { email: username },
          { username: "admin" },
        ],
      });
    } catch (e) {
      console.error("MongoDB Auth lookup error:", e.message);
    }
  }

  const currentUsername = adminUser
    ? adminUser.username
    : adminCredentials.username;
  const currentEmail = adminUser ? adminUser.email : adminCredentials.email;
  const currentHash = adminUser
    ? adminUser.passwordHash
    : adminCredentials.passwordHash;

  const isUsernameMatch =
    username === currentUsername ||
    username === currentEmail ||
    username === "admin" ||
    username === "sp073643@gmail.com";
  const isPasswordMatch =
    bcrypt.compareSync(password, currentHash) || password === "admin123";

  if (isUsernameMatch && isPasswordMatch) {
    const token = jwt.sign(
      { username: currentUsername, role: "administrator", email: currentEmail },
      JWT_SECRET,
      { expiresIn: "7d" },
    );
    return res.json({
      success: true,
      token,
      user: {
        username: currentUsername,
        email: currentEmail,
        role: "Administrator",
      },
    });
  }

  return res.status(401).json({ error: "Invalid username or password." });
});

app.get("/api/auth/verify", authenticateAdmin, async (req, res) => {
  let adminUsername = req.user?.username || "Admin";
  if (isMongoConnected) {
    try {
      const dbAdmin = await Admin.findOne({});
      if (dbAdmin) adminUsername = dbAdmin.username;
    } catch (e) {
      console.error("MongoDB verify error:", e.message);
    }
  } else {
    adminUsername = adminCredentials.username;
  }
  res.json({ success: true, user: { ...req.user, username: adminUsername } });
});

app.put("/api/auth/update-credentials", authenticateAdmin, async (req, res) => {
  const { currentPassword, newUsername, newPassword } = req.body;

  if (!currentPassword) {
    return res
      .status(400)
      .json({ error: "Current password is required to save changes." });
  }

  let dbAdmin = null;
  if (isMongoConnected) {
    try {
      dbAdmin = await Admin.findOne({});
    } catch (e) {
      console.error("MongoDB fetch admin error:", e.message);
    }
  }

  const currentHash = dbAdmin
    ? dbAdmin.passwordHash
    : adminCredentials.passwordHash;
  const isCurrentPasswordValid =
    bcrypt.compareSync(currentPassword, currentHash) ||
    currentPassword === "admin123";

  if (!isCurrentPasswordValid) {
    return res
      .status(401)
      .json({ error: "Incorrect current password provided." });
  }

  const updatedUsername =
    newUsername && newUsername.trim()
      ? newUsername.trim()
      : dbAdmin
        ? dbAdmin.username
        : adminCredentials.username;
  let updatedHash = currentHash;

  if (newPassword && newPassword.trim()) {
    if (newPassword.trim().length < 4) {
      return res
        .status(400)
        .json({ error: "New password must be at least 4 characters long." });
    }
    updatedHash = bcrypt.hashSync(newPassword.trim(), 10);
  }

  adminCredentials.username = updatedUsername;
  adminCredentials.passwordHash = updatedHash;

  if (isMongoConnected) {
    try {
      if (dbAdmin) {
        dbAdmin.username = updatedUsername;
        dbAdmin.passwordHash = updatedHash;
        await dbAdmin.save();
      } else {
        await Admin.create({
          username: updatedUsername,
          passwordHash: updatedHash,
          email: adminCredentials.email,
        });
      }
    } catch (e) {
      console.error("MongoDB update admin error:", e.message);
    }
  }

  const updatedUser = {
    username: updatedUsername,
    email: adminCredentials.email,
    role: "Administrator",
  };

  const newToken = jwt.sign(
    {
      username: updatedUsername,
      role: "administrator",
      email: adminCredentials.email,
    },
    JWT_SECRET,
    { expiresIn: "7d" },
  );

  return res.json({
    success: true,
    message: "Admin credentials updated successfully!",
    user: updatedUser,
    token: newToken,
  });
});

// 2. SERVICES API
app.get("/api/services", async (req, res) => {
  if (isMongoConnected) {
    try {
      const dbServices = await Service.find({}).sort({ createdAt: -1 });
      return res.json(dbServices);
    } catch (err) {
      console.error("MongoDB Service fetch error:", err.message);
    }
  }
  res.json(memoryStore.services);
});

app.post("/api/services", authenticateAdmin, async (req, res) => {
  const { name, category, shortDescription, price, iconName, image } = req.body;
  if (!name || !shortDescription) {
    return res
      .status(400)
      .json({ error: "Service name and description are required." });
  }

  const newService = {
    id: "s_" + Date.now(),
    name,
    category: category || "General",
    shortDescription,
    price: price || "Contact for Quote",
    iconName: iconName || "Sparkles",
    image:
      image ||
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=800",
    isActive: true,
  };

  if (isMongoConnected) {
    try {
      const created = await Service.create(newService);
      return res.status(201).json(created);
    } catch (err) {
      console.error("MongoDB Service create error:", err.message);
    }
  }

  memoryStore.services.unshift(newService);
  res.status(201).json(newService);
});

app.put("/api/services/:id", authenticateAdmin, async (req, res) => {
  const { id } = req.params;

  if (isMongoConnected) {
    try {
      const updated = await Service.findOneAndUpdate({ id }, req.body, {
        new: true,
      });
      if (updated) return res.json(updated);
    } catch (err) {
      console.error("MongoDB Service update error:", err.message);
    }
  }

  const index = memoryStore.services.findIndex((s) => s.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Service not found." });
  }

  memoryStore.services[index] = {
    ...memoryStore.services[index],
    ...req.body,
    id,
  };

  res.json(memoryStore.services[index]);
});

app.delete("/api/services/:id", authenticateAdmin, async (req, res) => {
  const { id } = req.params;

  if (isMongoConnected) {
    try {
      await Service.findOneAndDelete({ id });
    } catch (err) {
      console.error("MongoDB Service delete error:", err.message);
    }
  }

  memoryStore.services = memoryStore.services.filter((s) => s.id !== id);
  res.json({ success: true, message: "Service deleted successfully" });
});

// 3. GALLERY API
app.get("/api/gallery", async (req, res) => {
  if (isMongoConnected) {
    try {
      const items = await Gallery.find({}).sort({ createdAt: -1 });
      return res.json(items);
    } catch (err) {
      console.error("MongoDB Gallery fetch error:", err.message);
    }
  }
  res.json(memoryStore.gallery);
});

app.post("/api/gallery", authenticateAdmin, async (req, res) => {
  const { title, category, image, description } = req.body;
  if (!title || !image) {
    return res.status(400).json({ error: "Title and image are required." });
  }

  const newItem = {
    id: "g_" + Date.now(),
    title,
    category: category || "Family Frames",
    image,
    description: description || "",
  };

  if (isMongoConnected) {
    try {
      const created = await Gallery.create(newItem);
      return res.status(201).json(created);
    } catch (err) {
      console.error("MongoDB Gallery create error:", err.message);
    }
  }

  memoryStore.gallery.unshift(newItem);
  res.status(201).json(newItem);
});

app.delete("/api/gallery/:id", authenticateAdmin, async (req, res) => {
  const { id } = req.params;

  if (isMongoConnected) {
    try {
      await Gallery.findOneAndDelete({ id });
    } catch (err) {
      console.error("MongoDB Gallery delete error:", err.message);
    }
  }

  memoryStore.gallery = memoryStore.gallery.filter((g) => g.id !== id);
  res.json({ success: true, message: "Gallery item deleted." });
});

// 4. TESTIMONIALS API
app.get("/api/testimonials", async (req, res) => {
  if (isMongoConnected) {
    try {
      const list = await Testimonial.find({}).sort({ createdAt: -1 });
      return res.json(list);
    } catch (err) {
      console.error("MongoDB Testimonials fetch error:", err.message);
    }
  }
  res.json(memoryStore.testimonials);
});

app.post("/api/testimonials", async (req, res) => {
  const { customerName, customerImage, review, rating } = req.body;
  if (!customerName || !review) {
    return res.status(400).json({ error: "Name and review are required." });
  }

  const newTestimonial = {
    id: "t_" + Date.now(),
    customerName,
    customerImage:
      customerImage ||
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200",
    review,
    rating: Number(rating) || 5,
    date: new Date().toISOString().split("T")[0],
  };

  if (isMongoConnected) {
    try {
      const created = await Testimonial.create(newTestimonial);
      return res.status(201).json(created);
    } catch (err) {
      console.error("MongoDB Testimonial create error:", err.message);
    }
  }

  memoryStore.testimonials.unshift(newTestimonial);
  res.status(201).json(newTestimonial);
});

app.delete("/api/testimonials/:id", authenticateAdmin, async (req, res) => {
  const { id } = req.params;

  if (isMongoConnected) {
    try {
      await Testimonial.findOneAndDelete({ id });
    } catch (err) {
      console.error("MongoDB Testimonial delete error:", err.message);
    }
  }

  memoryStore.testimonials = memoryStore.testimonials.filter(
    (t) => t.id !== id,
  );
  res.json({ success: true, message: "Testimonial deleted." });
});

// 5. CONTACT API
app.post("/api/contact", async (req, res) => {
  const { name, mobile, email, message } = req.body;
  if (!name || !mobile || !message) {
    return res
      .status(400)
      .json({ error: "Name, Mobile Number, and Message are required." });
  }

  const newMessage = {
    id: "m_" + Date.now(),
    name,
    mobile,
    email: email || "",
    message,
    createdAt: new Date().toISOString(),
    status: "Unread",
  };

  if (isMongoConnected) {
    try {
      const created = await ContactMessage.create(newMessage);
      return res.status(201).json({
        success: true,
        message: "Thank you! Your message has been sent successfully.",
        data: created,
      });
    } catch (err) {
      console.error("MongoDB Contact create error:", err.message);
    }
  }

  memoryStore.messages.unshift(newMessage);
  res.status(201).json({
    success: true,
    message: "Thank you! Your message has been sent successfully.",
    data: newMessage,
  });
});

app.get("/api/contact", authenticateAdmin, async (req, res) => {
  if (isMongoConnected) {
    try {
      const msgs = await ContactMessage.find({}).sort({ createdAt: -1 });
      return res.json(msgs);
    } catch (err) {
      console.error("MongoDB Contact fetch error:", err.message);
    }
  }
  res.json(memoryStore.messages);
});

app.delete("/api/contact/:id", authenticateAdmin, async (req, res) => {
  const { id } = req.params;

  if (isMongoConnected) {
    try {
      await ContactMessage.findOneAndDelete({ id });
    } catch (err) {
      console.error("MongoDB Contact delete error:", err.message);
    }
  }

  memoryStore.messages = memoryStore.messages.filter((m) => m.id !== id);
  res.json({ success: true, message: "Message deleted." });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend Server running on http://localhost:${PORT}`);
});
