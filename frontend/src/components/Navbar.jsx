import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageCircle, Menu, X, Frame, Shield, Sparkles, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const phoneNumber = '+91 7052668517';
  const whatsappUrl = 'https://wa.me/917052668517?text=Hello%20Sachin%20King%20Photo%20Frame,%20I%20have%20an%20inquiry.';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Reviews', path: '/testimonials' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Top Announcement Bar - Hidden on Mobile, Visible on Tablet & Desktop */}
      <div className="hidden sm:block bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 text-amber-200 text-xs py-1.5 px-4 border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto flex flex-row justify-between items-center gap-2 text-left">
          <div className="flex items-center gap-2 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>"Ek Hi Chhat Ke Neeche Photo Framing Ki Sabhi Suvidhayein"</span>
          </div>
          <div className="flex items-center gap-4 text-amber-100 shrink-0">
            <a href={`tel:${phoneNumber}`} className="hover:text-amber-300 transition-colors flex items-center gap-1">
              <Phone className="w-3 h-3 text-amber-400" /> {phoneNumber}
            </a>
            <span className="text-amber-500/40">|</span>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
              <MessageCircle className="w-3 h-3 text-emerald-400" /> WhatsApp Now
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className={`sticky top-0 z-40 transition-all duration-300 relative ${
        isScrolled 
          ? 'bg-[#121218]/95 backdrop-blur-md shadow-2xl border-b border-amber-500/30 py-2.5 sm:py-3' 
          : 'bg-[#121218]/80 backdrop-blur-sm border-b border-amber-500/10 py-3 sm:py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
          
          {/* Business Logo & Name (Left) */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            <img
              src="/logo.svg"
              alt="Sachin King Photo Frame Logo"
              className="w-9 h-9 sm:w-12 sm:h-12 object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(245,158,11,0.4)]"
              referrerPolicy="no-referrer"
            />
            <div>
              <span className="block text-sm sm:text-xl font-bold font-playfair tracking-wide text-amber-100 group-hover:text-amber-300 transition-colors">
                Sachin King <span className="text-amber-400">Photo Frame</span>
              </span>
              <span className="block text-[8px] sm:text-[10px] text-amber-400/80 uppercase tracking-widest font-semibold">
                Premium Framing & Printing
              </span>
            </div>
          </Link>

          {/* Desktop Navigation (Center) */}
          <nav className="hidden lg:flex items-center gap-1 bg-amber-950/30 p-1.5 rounded-full border border-amber-500/20 mx-auto">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                    : 'text-amber-200/80 hover:text-amber-200 hover:bg-amber-500/10'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Buttons (Right Shifted) */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0 ml-auto lg:ml-0">
            {isAuthenticated && (
              <div className="flex items-center gap-1 sm:gap-2">
                <Link
                  to="/admin"
                  className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 transition-colors"
                >
                  <UserCheck className="w-3.5 h-3.5" /> <span className="hidden xs:inline">Dashboard</span>
                </Link>
                <button
                  onClick={logout}
                  className="text-[11px] sm:text-xs px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}

            <a
              href={`tel:${phoneNumber}`}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 font-bold text-[10px] sm:text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-md gold-glow whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 fill-slate-950" /> <span className="hidden xs:inline">Call Now</span><span className="xs:hidden">Call</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300 hover:bg-amber-900/50 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden absolute top-full left-0 right-0 z-50 bg-[#121218]/98 border-b border-amber-500/30 backdrop-blur-xl shadow-2xl max-h-[85vh] overflow-y-auto"
            >
              <div className="px-4 sm:px-6 py-5 space-y-2.5">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-2.5 rounded-xl text-sm sm:text-base font-medium transition-all ${
                      isActive(link.path)
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'text-amber-100/90 hover:bg-amber-500/10'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="pt-3 border-t border-amber-500/20 space-y-2.5">
                  <a
                    href={`tel:${phoneNumber}`}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider"
                  >
                    <Phone className="w-4 h-4 fill-slate-950" /> Call +91 7052668517
                  </a>
                  
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs sm:text-sm uppercase tracking-wider"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" /> WhatsApp Chat
                  </a>

                  {isAuthenticated && (
                    <div className="flex gap-2 pt-1">
                      <Link
                        to="/admin"
                        onClick={() => setIsOpen(false)}
                        className="flex-1 text-center py-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs sm:text-sm font-semibold border border-emerald-500/40"
                      >
                        Admin Dashboard
                      </Link>
                      <button
                        onClick={() => { logout(); setIsOpen(false); }}
                        className="px-4 py-2.5 rounded-xl bg-red-500/20 text-red-300 text-xs sm:text-sm font-semibold border border-red-500/40"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
