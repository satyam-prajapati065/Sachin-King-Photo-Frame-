import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';

export default function FloatingButtons() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  const phoneNumber = '+917052668517';
  const whatsappUrl = 'https://wa.me/917052668517?text=Hello%20Sachin%20King%20Photo%20Frame,%20I%20have%20a%20framing/printing%20inquiry.';

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-2.5 sm:gap-3 pointer-events-none">
      
      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="pointer-events-auto p-2.5 sm:p-3 rounded-full bg-amber-950/90 text-amber-300 border border-amber-500/40 shadow-xl hover:bg-amber-800 transition-all transform hover:scale-110 gold-glow"
          aria-label="Back to Top"
        >
          <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      )}

      {/* Floating Call Button */}
      <a
        href={`tel:${phoneNumber}`}
        className="pointer-events-auto p-3 sm:p-3.5 rounded-full bg-amber-500 text-slate-950 font-bold shadow-2xl hover:bg-amber-400 transition-all transform hover:scale-110 gold-glow flex items-center justify-center group"
        aria-label="Call Sachin King Photo Frame"
      >
        <Phone className="w-5 h-5 sm:w-6 sm:h-6 fill-slate-950 group-hover:rotate-12 transition-transform" />
      </a>

      {/* Floating WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="pointer-events-auto p-3 sm:p-3.5 rounded-full bg-emerald-500 text-white font-bold shadow-2xl hover:bg-emerald-400 transition-all transform hover:scale-110 flex items-center justify-center group animate-bounce"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-white" />
      </a>

    </div>
  );
}
