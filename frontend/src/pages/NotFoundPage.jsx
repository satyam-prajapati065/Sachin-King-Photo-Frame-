import React from 'react';
import { Link } from 'react-router-dom';
import { Frame, Home, Sparkles } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md p-8 rounded-3xl glass-card border border-amber-500/40 space-y-6 shadow-2xl gold-glow">
        <div className="p-4 rounded-2xl bg-amber-500/20 border border-amber-500/40 w-fit mx-auto text-amber-400">
          <Frame className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">404 Page Not Found</span>
          <h1 className="text-3xl font-bold font-playfair text-amber-100">Picture Frame Out of Bounds</h1>
          <p className="text-xs text-amber-200/80 leading-relaxed font-poppins">
            The page you are looking for does not exist or has been moved. Explore our photo framing and printing services from the homepage.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 font-bold uppercase tracking-wider text-xs hover:brightness-110 transition-all gold-glow"
        >
          <Home className="w-4 h-4" /> Return To Home
        </Link>
      </div>
    </div>
  );
}
