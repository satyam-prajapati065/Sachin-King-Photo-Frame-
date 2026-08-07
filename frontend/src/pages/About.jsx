import React from 'react';
import { motion } from 'motion/react';
import { Award, ShieldCheck, Clock, Tag, Sparkles, CheckCircle2, Phone, MessageCircle } from 'lucide-react';

export default function About() {
  const phoneNumber = '+91 7052668517';
  const whatsappUrl = 'https://wa.me/917052668517?text=Hello%20Sachin%20King%20Photo%20Frame,%20I%20want%20to%20know%20more%20about%20your%20shop.';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20 inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> About Sachin King Photo Frame
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold font-playfair text-amber-50">
          Crafting Memories Into Timeless Wall Art
        </h1>
        <p className="text-xs sm:text-sm text-amber-200/80 font-poppins leading-relaxed">
          "Ek Hi Chhat Ke Neeche Photo Framing Ki Sabhi Suvidhayein" - Your trusted local framing and printing destination for over a decade.
        </p>
      </div>

      {/* Main Intro Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative rounded-2xl overflow-hidden border-2 border-amber-500/30 shadow-2xl gold-glow">
          <img
            src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=1000"
            alt="Sachin King Photo Frame Workshop"
            className="w-full h-[420px] object-cover"
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold font-playfair text-amber-200">
            Welcome to Sachin King Photo Frame
          </h2>
          
          <p className="text-xs sm:text-sm text-amber-200/80 leading-relaxed font-poppins">
            Established with a passion for preservation and artistic excellence, <strong className="text-amber-300">Sachin King Photo Frame</strong> has grown into the premier photo framing, canvas printing, and commercial media hub in the region.
          </p>

          <p className="text-xs sm:text-sm text-amber-200/80 leading-relaxed font-poppins">
            We specialize in traditional wooden framing, synthetic moldings, devotional God photo frames with backlight LED illumination, high-definition canvas printing, visiting cards, flex banners, bill books, and personalized gift items.
          </p>

          <div className="p-4 rounded-2xl glass-card border border-amber-500/30 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-base font-bold font-playfair text-amber-300">Over 10,000+ Happy Customers</h4>
              <p className="text-xs text-amber-200/70">Trusted by families, temples, offices, and commercial stores.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl glass-card border border-amber-500/30 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Our Mission
          </span>
          <h3 className="text-2xl font-bold font-playfair text-amber-100">Preserving Emotion with Perfection</h3>
          <p className="text-xs sm:text-sm text-amber-200/80 leading-relaxed font-poppins">
            To provide top-tier photo framing and printing solutions using termite-proof materials, non-fading inks, and custom border finishes, ensuring every customer gets premium aesthetics under one single roof at genuine local rates.
          </p>
        </div>

        <div className="p-8 rounded-3xl glass-card border border-amber-500/30 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Our Vision
          </span>
          <h3 className="text-2xl font-bold font-playfair text-amber-100">The Ultimate Framing Destination</h3>
          <p className="text-xs sm:text-sm text-amber-200/80 leading-relaxed font-poppins">
            To remain the most trusted photo frame, devotional wall art, and advertising print brand in Uttar Pradesh through continuous innovation, state-of-the-art printing machines, and warm customer care.
          </p>
        </div>
      </div>

      {/* 4 Pillars: Quality, Delivery, Price, Craft */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold font-playfair text-amber-100">Why Sachin King Stands Apart</h2>
          <p className="text-xs text-amber-200/70">Our commitment to every single frame crafted in our workshop</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: ShieldCheck,
              title: 'Premium Quality',
              desc: 'Treated wood, velvet backing, optical glass & archival pigment inks.'
            },
            {
              icon: Clock,
              title: 'Fast Delivery',
              desc: 'Urgent framing & printing orders processed within 24 hours.'
            },
            {
              icon: Tag,
              title: 'Affordable Pricing',
              desc: 'Wholesale & workshop direct pricing with zero hidden costs.'
            },
            {
              icon: Sparkles,
              title: 'Master Artisans',
              desc: 'Experienced craftsman guiding custom frame choices and mounts.'
            }
          ].map((pillar, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-[#14141d] border border-amber-500/20 space-y-3">
              <pillar.icon className="w-8 h-8 text-amber-400" />
              <h4 className="text-lg font-bold font-playfair text-amber-200">{pillar.title}</h4>
              <p className="text-xs text-amber-200/70 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 border border-amber-500/40 text-center space-y-4 shadow-xl">
        <h3 className="text-xl sm:text-3xl font-bold font-playfair text-amber-100">Have a Question or Custom Framing Need?</h3>
        <p className="text-xs sm:text-sm text-amber-200/80 max-w-lg mx-auto">Call or message Sachin ji directly on WhatsApp for guidance and instant quote.</p>
        <div className="flex justify-center gap-4 pt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-emerald-500 transition-colors"
          >
            <MessageCircle className="w-4 h-4 fill-white" /> WhatsApp Chat
          </a>
          <a
            href={`tel:${phoneNumber}`}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold uppercase tracking-wider hover:bg-amber-400 transition-colors"
          >
            <Phone className="w-4 h-4 fill-slate-950" /> Call {phoneNumber}
          </a>
        </div>
      </div>

    </div>
  );
}
