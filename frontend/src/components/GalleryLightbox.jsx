import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn, MessageCircle, Sparkles } from 'lucide-react';

export default function GalleryLightbox({ item, onClose }) {
  if (!item) return null;

  const whatsappMessage = encodeURIComponent(
    `Hello Sachin King Photo Frame, I am interested in this gallery item: *${item.title}* (${item.category}). Please let me know pricing and customization options.`
  );
  const whatsappUrl = `https://wa.me/917052668517?text=${whatsappMessage}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg">
        
        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative max-w-4xl w-full bg-[#121218] rounded-2xl border border-amber-500/40 shadow-2xl overflow-hidden flex flex-col md:flex-row"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/70 text-amber-300 hover:text-white hover:bg-black transition-all"
            aria-label="Close Preview"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left: Image Container */}
          <div className="md:w-2/3 bg-black flex items-center justify-center p-2 relative min-h-[280px] max-h-[70vh]">
            <img
              src={item.image}
              alt={item.title}
              className="max-h-[65vh] w-auto object-contain rounded-xl shadow-2xl"
            />
          </div>

          {/* Right: Info Sidebar */}
          <div className="md:w-1/3 p-6 flex flex-col justify-between border-t md:border-t-0 md:border-l border-amber-500/20 bg-[#15151e] text-amber-50">
            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold uppercase tracking-widest inline-flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" /> {item.category}
              </span>

              <h3 className="text-xl font-bold font-playfair text-amber-100">
                {item.title}
              </h3>

              <p className="text-xs text-amber-200/80 leading-relaxed font-poppins">
                {item.description || 'Custom crafted with premium grade wood, high-definition photo print, and crystal clear protective finish.'}
              </p>
            </div>

            <div className="pt-6 space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-emerald-500 transition-colors shadow-lg"
              >
                <MessageCircle className="w-4 h-4 fill-white" /> Inquire Frame on WhatsApp
              </a>

              <a
                href="tel:+917052668517"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-500/20 text-amber-300 font-semibold text-xs border border-amber-500/40 hover:bg-amber-500/30 transition-colors"
              >
                📞 Call Shop: +91 7052668517
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
