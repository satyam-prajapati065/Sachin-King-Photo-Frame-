import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageCircle, Phone, Sparkles, Send, CheckCircle } from 'lucide-react';
import api from '../services/api';

export default function QuoteModal({ isOpen, onClose, service }) {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !service) return null;

  const handleWhatsAppQuote = () => {
    const text = encodeURIComponent(
      `Hello Sachin King Photo Frame,\nI would like to get a quote for: *${service.name}*\nName: ${formData.name || 'Customer'}\nMobile: ${formData.mobile || 'Not specified'}\nDetails: ${formData.message || 'Please share pricing and size details.'}`
    );
    window.open(`https://wa.me/917052668517?text=${text}`, '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile) {
      setError('Please provide your name and mobile number.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await api.post('/contact', {
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email,
        message: `[Quote Request for ${service.name}]: ${formData.message || 'Interested in this service.'}`
      });
      setSubmitted(true);
    } catch (err) {
      setError('Could not send message. Try sending via WhatsApp directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-lg p-6 rounded-2xl glass-card border border-amber-500/40 text-amber-50 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex justify-between items-start pb-4 border-b border-amber-500/20">
            <div>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" /> Instant Quote Request
              </span>
              <h3 className="text-xl font-bold font-playfair text-amber-100">{service.name}</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-amber-400/80 hover:text-amber-200 hover:bg-amber-500/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
              <h4 className="text-lg font-bold text-amber-200 font-playfair">Quote Request Received!</h4>
              <p className="text-xs text-amber-200/80">
                Thank you, <strong className="text-amber-300">{formData.name}</strong>. Sachin King Photo Frame will call/WhatsApp you at <strong className="text-amber-300">{formData.mobile}</strong> shortly!
              </p>
              <div className="pt-4 flex flex-col gap-2">
                <button
                  onClick={handleWhatsAppQuote}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-emerald-500 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-white" /> Continue on WhatsApp Now
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl bg-amber-950/60 text-amber-300 text-xs font-semibold hover:bg-amber-900/60"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
              {error && (
                <div className="p-2.5 rounded-lg bg-red-500/20 border border-red-500/40 text-red-300 text-xs">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-amber-300 font-medium mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-amber-500/30 text-amber-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-amber-300 font-medium mb-1">Mobile / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 7052668517"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-amber-500/30 text-amber-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-amber-300 font-medium mb-1">Email Address (Optional)</label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-amber-500/30 text-amber-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-amber-300 font-medium mb-1">Frame Size / Details / Quantity</label>
                <textarea
                  rows="3"
                  placeholder="Specify frame dimensions (e.g., 24x18 inches), quantity, or custom preferences..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-amber-500/30 text-amber-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 font-bold uppercase tracking-wider text-xs hover:brightness-110 transition-all gold-glow"
                >
                  <Send className="w-4 h-4" /> {loading ? 'Sending...' : 'Submit Quote Request'}
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppQuote}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 text-white font-bold uppercase tracking-wider text-xs hover:bg-emerald-500 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-white" /> WhatsApp Directly
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
