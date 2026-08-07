import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import api from "../services/api";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const phoneNumber = "+91 7052668517";
  const whatsappUrl =
    "https://wa.me/917052668517?text=Hello%20Sachin%20King%20Photo%20Frame,%20I%20want%20to%20get%20in%20touch.";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile || !formData.message) {
      setError("Please fill out all required fields (*)");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await api.post("/contact", formData);
      if (res.data.success) {
        setSubmitted(true);
        setFormData({ name: "", mobile: "", email: "", message: "" });
      }
    } catch (err) {
      setError(
        "Failed to send message. Please try sending directly via WhatsApp.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20 inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Get In Touch
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold font-playfair text-amber-50">
          Contact Sachin King Photo Frame
        </h1>
        <p className="text-xs sm:text-sm text-amber-200/80 font-poppins leading-relaxed">
          Visit our workshop, call us, or send a quick message below for photo
          framing, devotional frames, and printing inquiries.
        </p>
      </div>

      {/* Grid: Contact Info + Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Contact Info & Action Cards */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl glass-card border border-amber-500/30 space-y-4">
            <h3 className="text-xl font-bold font-playfair text-amber-200">
              Business Details
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-amber-100 text-sm">
                    Shop Address
                  </h4>
                  <p className="text-amber-200/80 leading-relaxed mt-0.5">
                    Sachin King Photo Frame, Mirjapur, Akbarpur, Ambedkar Nagar,
                    Uttar Pradesh - 224122, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-amber-100 text-sm">
                    Call & WhatsApp Number
                  </h4>
                  <a
                    href={`tel:${phoneNumber}`}
                    className="text-amber-300 font-semibold text-sm hover:underline block mt-0.5"
                  >
                    +91 7052668517
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-amber-100 text-sm">
                    Official Email
                  </h4>
                  <a
                    href="mailto:sp073643@gmail.com"
                    className="text-amber-300 font-semibold text-sm hover:underline block mt-0.5"
                  >
                    sp073643@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp Direct Action Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 border border-emerald-500/40 space-y-3">
            <h4 className="text-lg font-bold text-emerald-200 font-playfair flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-emerald-400" /> Fast
              WhatsApp Inquiry
            </h4>
            <p className="text-xs text-emerald-100/80 leading-relaxed">
              Prefer instant messaging? Share your photo or frame requirements
              directly on WhatsApp for quick estimates.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-emerald-500 transition-colors shadow-lg"
            >
              <MessageCircle className="w-4 h-4 fill-white" /> WhatsApp Chat
              (+91 7052668517)
            </a>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="p-8 rounded-3xl glass-card border border-amber-500/40 shadow-2xl space-y-6">
          <div className="space-y-1">
            <h3 className="text-2xl font-bold font-playfair text-amber-100">
              Send Us a Direct Message
            </h3>
            <p className="text-xs text-amber-200/70">
              Your message will be sent directly to the Sachin King Photo Frame.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-lg font-bold text-emerald-300 font-playfair">
                Message Sent Successfully!
              </h4>
              <p className="text-xs text-amber-200/80">
                Thank you for contacting Sachin King Photo Frame. We will reach
                out to you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs text-amber-300 font-semibold underline pt-2 block mx-auto"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {error && (
                <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-amber-300 font-medium mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-amber-500/30 text-amber-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-amber-300 font-medium mb-1">
                    Mobile / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 9876543210"
                    value={formData.mobile}
                    onChange={(e) =>
                      setFormData({ ...formData, mobile: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-amber-500/30 text-amber-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-amber-300 font-medium mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-amber-500/30 text-amber-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-amber-300 font-medium mb-1">
                  Your Message *
                </label>
                <textarea
                  rows="4"
                  required
                  placeholder="Tell us what you want framed or printed..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-amber-500/30 text-amber-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 font-bold uppercase tracking-wider text-xs hover:brightness-110 transition-all gold-glow"
              >
                <Send className="w-4 h-4" />{" "}
                {loading ? "Sending..." : "Submit Message"}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Embedded Google Map Section */}
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-2xl font-bold font-playfair text-amber-100">
            Find Our Shop on Google Maps
          </h3>
          <p className="text-xs text-amber-200/70">
            Visit us for frame samples, mount board selection, and physical
            consultations
          </p>
        </div>

        <div className="rounded-3xl overflow-hidden border-2 border-amber-500/30 shadow-2xl h-[380px] bg-black">
          <iframe
            title="Sachin King Photo Frame Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3572.9921129459153!2d82.5201816!3d26.423731099999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399093003980f267%3A0xaf6ea61052bec4e1!2zU2F0eWFtIEhvdXNlIE1pcmphcHVyIPCfj6Hwn4-g!5e0!3m2!1sen!2sin!4v1786130208501!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
