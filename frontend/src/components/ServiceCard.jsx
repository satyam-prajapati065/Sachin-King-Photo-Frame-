import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  MessageCircle, 
  Frame, 
  Layers, 
  Sparkles, 
  Users, 
  Heart, 
  Image, 
  LayoutGrid, 
  Building, 
  Gift, 
  Wrench, 
  Calendar, 
  FileText, 
  Copy, 
  Receipt, 
  CreditCard, 
  ShieldCheck, 
  Mail, 
  Printer, 
  Grid, 
  Tv, 
  Send 
} from 'lucide-react';
import QuoteModal from './QuoteModal';

// Icon Map fallback for dynamic icon string names
const iconMap = {
  Frame,
  Layers,
  Sparkles,
  Users,
  Heart,
  Image,
  LayoutGrid,
  Building,
  Gift,
  Wrench,
  Calendar,
  FileText,
  Copy,
  Receipt,
  CreditCard,
  ShieldCheck,
  Mail,
  Printer,
  Grid,
  Tv
};

export default function ServiceCard({ service }) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const IconComponent = iconMap[service.iconName] || Frame;

  const whatsappMessage = encodeURIComponent(
    `Hello Sachin King Photo Frame, I am interested in your service: *${service.name}*. Please provide quote and details.`
  );
  const whatsappUrl = `https://wa.me/917052668517?text=${whatsappMessage}`;

  return (
    <>
      <motion.div
        whileHover={{ y: -6, transition: { duration: 0.2 } }}
        className="group relative rounded-2xl glass-card border border-amber-500/20 hover:border-amber-400/60 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl gold-glow-hover"
      >
        {/* Top Image & Category Tag */}
        <div className="relative h-28 sm:h-48 w-full overflow-hidden bg-black/80">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121218] via-transparent to-transparent" />
          
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-amber-950/80 backdrop-blur-md border border-amber-500/40 text-[8px] sm:text-[10px] uppercase font-bold text-amber-300 tracking-wider truncate max-w-[85%]">
            {service.category || 'Framing'}
          </div>

          <div className="absolute bottom-2 right-2 p-1.5 sm:p-2.5 rounded-xl bg-amber-500/20 backdrop-blur-md border border-amber-400/40 text-amber-300 shadow-md">
            <IconComponent className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
          </div>
        </div>

        {/* Card Body */}
        <div className="p-2.5 sm:p-5 flex-1 flex flex-col justify-between space-y-2 sm:space-y-4">
          <div>
            <h3 className="text-xs sm:text-lg font-bold font-playfair text-amber-100 group-hover:text-amber-300 transition-colors line-clamp-1">
              {service.name}
            </h3>
            
            <p className="text-[10px] sm:text-xs text-amber-200/70 mt-1 sm:mt-2 line-clamp-2 sm:line-clamp-3 leading-normal sm:leading-relaxed font-poppins">
              {service.shortDescription}
            </p>
          </div>

          {/* Pricing tag if available */}
          {service.price && (
            <div className="pt-1.5 sm:pt-2 border-t border-amber-500/15 flex items-center justify-between text-[10px] sm:text-xs">
              <span className="text-amber-400/70 font-medium hidden sm:inline">Starting:</span>
              <span className="font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg border border-amber-500/20 text-[10px] sm:text-xs w-full text-center sm:w-auto">
                {service.price}
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-1.5 sm:pt-2 grid grid-cols-2 gap-1.5 sm:gap-2">
            <button
              onClick={() => setIsQuoteOpen(true)}
              className="w-full flex items-center justify-center gap-1 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25 text-[10px] sm:text-xs font-semibold transition-colors px-1"
            >
              <Send className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" /> <span className="truncate">Quote</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-1 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600/30 text-[10px] sm:text-xs font-semibold transition-colors px-1"
            >
              <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 fill-emerald-400/20 shrink-0" /> <span className="truncate">WhatsApp</span>
            </a>
          </div>
        </div>
      </motion.div>

      {/* Quote Modal Trigger */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        service={service}
      />
    </>
  );
}
