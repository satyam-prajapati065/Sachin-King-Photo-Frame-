import React from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Frame,
  Sparkles,
  Heart,
  ChevronRight,
} from "lucide-react";

export default function Footer() {
  const phoneNumber = "+91 7052668517";
  const whatsappUrl =
    "https://wa.me/917052668517?text=Hello%20Sachin%20King%20Photo%20Frame,%20I%20want%20to%20know%20more.";

  return (
    <footer className="bg-[#0b0b0e] text-amber-200/80 border-t border-amber-500/20 pt-16 pb-8 relative overflow-hidden">
      {/* Background Decorative Gold Accent Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-amber-500/15">
          {/* Column 1: Business Branding */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.svg"
                alt="Sachin King Photo Frame Logo"
                className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]"
                referrerPolicy="no-referrer"
              />
              <div>
                <h3 className="text-xl font-bold font-playfair text-amber-100">
                  Sachin King{" "}
                  <span className="text-amber-400">Photo Frame</span>
                </h3>
                <p className="text-[10px] text-amber-400/80 uppercase tracking-widest font-semibold">
                  Framing & Printing Solution
                </p>
              </div>
            </div>

            <p className="text-xs text-amber-200/70 leading-relaxed font-poppins">
              "Ek Hi Chhat Ke Neeche Photo Framing Ki Sabhi Suvidhayein" -
              Providing premium wooden framing, lamination, god frames, wedding
              portraits, canvas printing, and commercial printing services.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600/30 text-xs font-semibold transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" /> Chat on
              WhatsApp
            </a>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-300 mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" /> Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { name: "Home", path: "/" },
                { name: "About Shop", path: "/about" },
                { name: "Our Services", path: "/services" },
                { name: "Frame Gallery", path: "/gallery" },
                { name: "Customer Reviews", path: "/testimonials" },
                { name: "Contact & Map", path: "/contact" },
                { name: "Admin Portal", path: "/admin/login" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="hover:text-amber-300 transition-colors flex items-center gap-1.5 py-1"
                  >
                    <ChevronRight className="w-3 h-3 text-amber-500/60" />{" "}
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Key Services */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-300 mb-4 flex items-center gap-2">
              <Frame className="w-4 h-4 text-amber-400" /> Popular Services
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                "Photo Framing & Lamination",
                "God & Devotional Frames",
                "Family & Wedding Frames",
                "HD Canvas Printing",
                "Calendar & Banner Printing",
                "Visiting Cards & Bill Books",
                "Vehicle Insurance Assistance",
              ].map((service, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-1.5 py-0.5 text-amber-200/80"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400/60" />{" "}
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-300 mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" /> Contact Details
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Main Shop Road, Near City Center, Photo Framing Hub, Uttar
                  Pradesh, India
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={`tel:${phoneNumber}`}
                  className="hover:text-amber-300 transition-colors"
                >
                  +91 7052668517
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href="mailto:sp073643@gmail.com"
                  className="hover:text-amber-300 transition-colors"
                >
                  sp073643@gmail.com
                </a>
              </div>

              <div className="pt-2">
                <a
                  href="https://maps.app.goo.gl/Z5HTAbMrnHQBjoYN6"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-[11px] text-amber-400 hover:underline font-medium"
                >
                  📍 Open Shop in Google Maps &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-amber-400/60 text-center">
          <p>
            © {new Date().getFullYear()} Sachin King Photo Frame. All rights
            reserved.
          </p>
          <p className="flex items-center justify-center gap-1">
            Crafted with{" "}
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />{" "}
            for Premium Quality & Customer Satisfaction
          </p>
        </div>
      </div>
    </footer>
  );
}
