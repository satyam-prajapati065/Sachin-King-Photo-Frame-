import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Phone,
  MessageCircle,
  Sparkles,
  CheckCircle2,
  Award,
  Clock,
  Tag,
  ArrowRight,
  Frame,
  Star,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Send,
  Printer,
  Gift,
  Layers,
} from "lucide-react";
import api from "../services/api";
import ServiceCard from "../components/ServiceCard";
import GalleryLightbox from "../components/GalleryLightbox";

const heroSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=1920",
    heading: "Royal & Classic Photo Framing",
    subheading:
      "Preserve your precious moments with antique gold, synthetic & teakwood frames.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    heading: "Devotional God Frames with LED",
    subheading:
      "Premium backlit god photo frames with velvet mounts for homes and offices.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1587271636175-90d58cdad458?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW5kaWFuJTIwd2VkZGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    heading: "HD Canvas & Banner Printing",
    subheading:
      "High resolution canvas stretchers, visiting cards, flex banners & customized gifts.",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [services, setServices] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const phoneNumber = "+91 7052668517";
  const whatsappUrl =
    "https://wa.me/917052668517?text=Hello%20Sachin%20King%20Photo%20Frame,%20I%20have%20an%20inquiry.";

  // Automatic slideshow hero timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  // Fetch Initial Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, galleryRes, testRes] = await Promise.all([
          api.get("/services"),
          api.get("/gallery"),
          api.get("/testimonials"),
        ]);
        setServices(servicesRes.data || []);
        setGallery(galleryRes.data || []);
        setTestimonials(testRes.data || []);
      } catch (err) {
        console.error("Error fetching home data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-20 pb-16">
      {/* 1. HERO SLIDESHOW BANNER */}
      <section className="relative min-h-[480px] sm:min-h-[580px] h-[75vh] sm:h-[85vh] max-h-[800px] overflow-hidden flex items-center justify-center">
        {/* Slides Background */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 z-0"
          >
            <img
              src={heroSlides[currentSlide].image}
              alt="Photo Framing Banner"
              className="w-full h-full object-cover filter brightness-[0.38]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f12] via-black/40 to-black/70" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-black/80" />
          </motion.div>
        </AnimatePresence>

        {/* Hero Content Overlay (Centered & Compact on Mobile) */}
        <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-6 text-center space-y-3 sm:space-y-6 py-8 sm:py-12 flex flex-col items-center justify-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[9px] sm:text-xs md:text-sm font-semibold tracking-wider uppercase gold-glow max-w-full text-center"
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 animate-pulse shrink-0" />
            <span className="truncate">
              "Ek Hi Chhat Ke Neeche Sabhi Suvidhayein"
            </span>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl sm:text-5xl lg:text-6xl font-bold font-playfair tracking-tight text-amber-50 drop-shadow-2xl leading-tight text-center"
          >
            Sachin King <span className="text-gold-gradient">Photo Frame</span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-[11px] sm:text-lg lg:text-xl text-amber-100/90 max-w-xl mx-auto font-poppins leading-normal sm:leading-relaxed px-1 text-center"
          >
            {heroSlides[currentSlide].subheading}
          </motion.p>

          {/* Action Callouts Centered & Compact on Mobile */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="pt-2 sm:pt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-4 max-w-lg mx-auto"
          >
            <a
              href={`tel:${phoneNumber}`}
              className="flex items-center justify-center gap-1.5 px-3.5 sm:px-6 py-2 sm:py-3.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 font-bold text-[10px] sm:text-xs md:text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-2xl gold-glow"
            >
              <Phone className="w-3 h-3 sm:w-4 sm:h-4 fill-slate-950 shrink-0" />{" "}
              Call Now
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 px-3.5 sm:px-6 py-2 sm:py-3.5 rounded-xl bg-emerald-600 text-white font-bold text-[10px] sm:text-xs md:text-sm uppercase tracking-wider hover:bg-emerald-500 transition-all shadow-xl"
            >
              <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 fill-white shrink-0" />{" "}
              WhatsApp
            </a>

            <Link
              to="/services"
              className="flex items-center justify-center gap-1 px-3.5 sm:px-6 py-2 sm:py-3.5 rounded-xl bg-amber-950/60 text-amber-200 border border-amber-500/40 text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-wider hover:bg-amber-900/60 transition-all"
            >
              Explore{" "}
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
            </Link>
          </motion.div>
        </div>

        {/* Hero Slider Navigation Arrows */}
        <button
          onClick={() =>
            setCurrentSlide((prev) =>
              prev === 0 ? heroSlides.length - 1 : prev - 1,
            )
          }
          className="absolute left-1.5 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-1.5 sm:p-2.5 rounded-full bg-black/60 border border-amber-500/30 text-amber-300 hover:bg-black/80 transition-colors"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={() =>
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
          }
          className="absolute right-1.5 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-1.5 sm:p-2.5 rounded-full bg-black/60 border border-amber-500/30 text-amber-300 hover:bg-black/80 transition-colors"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 sm:gap-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 sm:h-2 rounded-full transition-all ${
                currentSlide === idx
                  ? "w-6 sm:w-8 bg-amber-400"
                  : "w-1.5 sm:w-2 bg-amber-500/30"
              }`}
            />
          ))}
        </div>
      </section>

      {/* 2. ABOUT SHOP BRIEF SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Decorative Image Collage */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-2xl gold-glow">
              <img
                src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=1000"
                alt="Sachin King Photo Frame Workshop"
                className="w-full h-[400px] object-cover"
              />
            </div>

            {/* Float Overlay Badge */}
            <div className="absolute -bottom-6 -right-6 bg-[#181822] border-2 border-amber-500/50 p-5 rounded-2xl shadow-2xl hidden sm:flex items-center gap-4 max-w-xs glass-card">
              <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xl font-bold font-playfair text-amber-300">
                  10+ Years
                </h4>
                <p className="text-xs text-amber-200/80">
                  Crafting Unmatched Quality Frames & Prints
                </p>
              </div>
            </div>
          </div>

          {/* Right Text Description */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              <Sparkles className="w-3.5 h-3.5" /> Welcome To Sachin King Photo
              Frame
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold font-playfair text-amber-100 leading-tight">
              Complete Framing & Printing Solutions Under One Roof
            </h2>

            <p className="text-sm text-amber-200/80 leading-relaxed font-poppins">
              At{" "}
              <strong className="text-amber-300">
                Sachin King Photo Frame
              </strong>
              , we turn your cherished memories into timeless art pieces.
              Whether it is a family portrait, a devotional god frame with LED
              lighting, high-definition canvas stretchers, visiting cards, or
              flex banners for your shop, we deliver precision craftsmanship at
              unbeatable local pricing.
            </p>

            {/* Quick Highlights Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs font-medium text-amber-200/90 pt-2">
              {[
                "Premium Wooden & Synthetic Frames",
                "Matte, Gloss & 3D Photo Lamination",
                "Custom Devotional God Photo Frames",
                "HD Canvas Stretchers & Printing",
                "Flex Banners & Pamphlet Printing",
                "Fast 24-48 Hour Order Delivery",
              ].map((point, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Link
                to="/about"
                className="px-6 py-3 rounded-xl bg-amber-500/20 text-amber-300 font-semibold text-xs uppercase tracking-wider border border-amber-500/40 hover:bg-amber-500/30 transition-all flex items-center gap-2"
              >
                Read More About Us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE US */}
      <section className="bg-gradient-to-b from-[#121218] via-[#161622] to-[#121218] py-16 border-y border-amber-500/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Our Core Promise
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-playfair text-amber-100">
              Why Customers Choose Sachin King
            </h2>
            <p className="text-xs sm:text-sm text-amber-200/70">
              We combine artisan attention to detail with state-of-the-art
              printing machinery.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
            {[
              {
                icon: Award,
                title: "Premium Quality",
                desc: "Termite-proof wood, synthetic moldings & non-fading pigments.",
              },
              {
                icon: Clock,
                title: "Fast Delivery",
                desc: "Quick turnaround time. Get standard framing & urgent prints fast.",
              },
              {
                icon: Tag,
                title: "Affordable Price",
                desc: "Direct workshop pricing with no middleman margins.",
              },
              {
                icon: ShieldCheck,
                title: "100% Custom",
                desc: "Custom frame width, mount colors & non-reflective glass.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-3.5 sm:p-6 rounded-2xl glass-card border border-amber-500/20 hover:border-amber-400/50 transition-all duration-300 space-y-2 sm:space-y-3 hover:-translate-y-1"
              >
                <div className="p-2 sm:p-3 w-fit rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  <feature.icon className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-sm sm:text-lg font-bold font-playfair text-amber-200">
                  {feature.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-amber-200/70 leading-normal sm:leading-relaxed font-poppins">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SEPARATED SERVICES SECTIONS */}
      {/* SECTION 4A: PHOTO FRAMING & LAMINATION SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-amber-500/30 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 inline-flex items-center gap-1.5">
              <Frame className="w-3.5 h-3.5 text-amber-400" /> Photo Framing &
              Lamination
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-playfair text-amber-100 mt-2">
              Photo Framing & Lamination Services
            </h2>
            <p className="text-xs text-amber-200/70 mt-1 font-poppins">
              Classic wooden frames, devotional God photo frames with LED,
              wedding portraits & matte/gloss photo lamination.
            </p>
          </div>
          <Link
            to="/services"
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 uppercase tracking-wider shrink-0"
          >
            View All Framing Services &rarr;
          </Link>
        </div>

        {loading ? (
          <div className="py-8 text-center text-amber-400">
            Loading Framing Services...
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-6">
            {services
              .filter((s) => {
                const name = (s.name || "").toLowerCase();
                const cat = (s.category || "").toLowerCase();
                if (
                  name.includes("office") ||
                  name.includes("gift") ||
                  name.includes("insurance") ||
                  name.includes("customized")
                )
                  return false;
                return (
                  name.includes("frame") ||
                  name.includes("lamination") ||
                  cat.includes("framing") ||
                  cat.includes("religious") ||
                  cat.includes("decor")
                );
              })
              .map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
          </div>
        )}
      </section>

      {/* SECTION 4B: PRINTING SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-amber-500/30 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 inline-flex items-center gap-1.5">
              <Printer className="w-3.5 h-3.5 text-amber-400" /> HD Printing &
              Advertising
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-playfair text-amber-100 mt-2">
              Printing & Banner Services
            </h2>
            <p className="text-xs text-amber-200/70 mt-1 font-poppins">
              Canvas stretchers, flex banners, pamphlets, visiting cards, bill
              books, and royal wedding invitation cards.
            </p>
          </div>
          <Link
            to="/services"
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 uppercase tracking-wider shrink-0"
          >
            View All Printing Services &rarr;
          </Link>
        </div>

        {loading ? (
          <div className="py-8 text-center text-amber-400">
            Loading Printing Services...
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-6">
            {services
              .filter((s) => {
                const name = (s.name || "").toLowerCase();
                const cat = (s.category || "").toLowerCase();
                return (
                  name.includes("print") ||
                  name.includes("banner") ||
                  name.includes("card") ||
                  name.includes("bill") ||
                  name.includes("pamphlet") ||
                  name.includes("handbill") ||
                  name.includes("poster") ||
                  cat.includes("printing")
                );
              })
              .map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
          </div>
        )}
      </section>

      {/* SECTION 4C: CUSTOM & SPECIALTY SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-amber-500/30 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 inline-flex items-center gap-1.5">
              <Gift className="w-3.5 h-3.5 text-amber-400" /> Custom Gifts &
              Utilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-playfair text-amber-100 mt-2">
              Custom & Special Services
            </h2>
            <p className="text-xs text-amber-200/70 mt-1 font-poppins">
              Customized frame sizing, photo gift items, office certificate
              framing, and vehicle insurance assistance.
            </p>
          </div>
          <Link
            to="/services"
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 uppercase tracking-wider shrink-0"
          >
            View All Custom Services &rarr;
          </Link>
        </div>

        {loading ? (
          <div className="py-8 text-center text-amber-400">
            Loading Custom Services...
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-6">
            {services
              .filter((s) => {
                const name = (s.name || "").toLowerCase();
                const cat = (s.category || "").toLowerCase();
                return (
                  name.includes("office") ||
                  name.includes("gift") ||
                  name.includes("insurance") ||
                  name.includes("custom") ||
                  cat.includes("corporate") ||
                  cat.includes("gifts") ||
                  cat.includes("services")
                );
              })
              .map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
          </div>
        )}
      </section>

      {/* 5. GALLERY PREVIEW */}
      <section className="bg-[#121218] py-16 border-t border-amber-500/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                Visual Showcase
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-playfair text-amber-100 mt-2">
                Sample Work & Frame Gallery
              </h2>
            </div>
            <Link
              to="/gallery"
              className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 uppercase tracking-wider"
            >
              Explore Full Gallery &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-6">
            {gallery.slice(0, 6).map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedGalleryItem(item)}
                className="group relative rounded-2xl overflow-hidden cursor-pointer border border-amber-500/30 bg-black/60 shadow-xl hover:border-amber-400 transition-all duration-300"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-36 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 text-amber-50 space-y-0.5 sm:space-y-1">
                  <span className="text-[8px] sm:text-[10px] uppercase font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-500/40 inline-block">
                    {item.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold font-playfair text-amber-100 group-hover:text-amber-300 transition-colors line-clamp-1">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CUSTOMER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Customer Testimonials
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-playfair text-amber-100">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-6">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="p-3 sm:p-6 rounded-2xl glass-card border border-amber-500/20 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex gap-0.5 text-amber-400">
                  {[...Array(test.rating || 5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 sm:w-4 sm:h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-[10px] sm:text-xs text-amber-200/80 italic font-poppins leading-normal sm:leading-relaxed line-clamp-4">
                  "{test.review}"
                </p>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 pt-2 sm:pt-4 border-t border-amber-500/15">
                <img
                  src={test.customerImage}
                  alt={test.customerName}
                  className="w-7 h-7 sm:w-10 sm:h-10 rounded-full object-cover border border-amber-500/40"
                />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-amber-200 font-playfair line-clamp-1">
                    {test.customerName}
                  </h4>
                  <span className="text-[8px] sm:text-[10px] text-amber-400/70 block">
                    Verified Buyer
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CONTACT CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 border border-amber-500/40 text-center space-y-6 shadow-2xl gold-glow relative overflow-hidden">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Need Custom Framing or Printing?
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-playfair text-amber-100">
              Get Instant Price Quote on WhatsApp
            </h2>
            <p className="text-xs sm:text-sm text-amber-200/80 max-w-xl mx-auto font-poppins">
              Send your photo or frame dimension requirements directly to our
              master artisan Sachin ji and receive an instant estimate.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-emerald-500 transition-all shadow-xl"
            >
              <MessageCircle className="w-4 h-4 fill-white" /> WhatsApp +91
              7052668517
            </a>

            <a
              href={`tel:${phoneNumber}`}
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-all shadow-xl"
            >
              <Phone className="w-4 h-4 fill-slate-950" /> Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Gallery Lightbox Preview Modal */}
      {selectedGalleryItem && (
        <GalleryLightbox
          item={selectedGalleryItem}
          onClose={() => setSelectedGalleryItem(null)}
        />
      )}
    </div>
  );
}
