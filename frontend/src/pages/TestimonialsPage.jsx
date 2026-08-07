import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import api from '../services/api';

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [formData, setFormData] = useState({
    customerName: '',
    review: '',
    rating: 5
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await api.get('/testimonials');
      setTestimonials(res.data || []);
    } catch (err) {
      console.error('Error fetching testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.review) return;

    setSubmitting(true);
    try {
      await api.post('/testimonials', formData);
      setSuccess(true);
      setFormData({ customerName: '', review: '', rating: 5 });
      fetchTestimonials();
    } catch (err) {
      console.error('Error posting review:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20 inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Customer Feedback
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold font-playfair text-amber-50">
          Client Experience & Reviews
        </h1>
        <p className="text-xs sm:text-sm text-amber-200/80 font-poppins leading-relaxed">
          Read real reviews from our satisfied clients across Uttar Pradesh or leave your own review about our framing & printing service!
        </p>
      </div>

      {/* Testimonials List Grid */}
      {loading ? (
        <div className="py-12 text-center text-amber-400">Loading Customer Reviews...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-6">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="p-3 sm:p-6 rounded-2xl glass-card border border-amber-500/20 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex gap-0.5 text-amber-400">
                  {[...Array(test.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
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
                  <h4 className="text-xs sm:text-sm font-bold text-amber-200 font-playfair line-clamp-1">{test.customerName}</h4>
                  <span className="text-[8px] sm:text-[10px] text-amber-400/70 block">{test.date || 'Verified Buyer'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Leave a Review Section */}
      <div className="max-w-2xl mx-auto p-8 rounded-3xl glass-card border border-amber-500/40 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold font-playfair text-amber-100">Write Your Customer Review</h2>
          <p className="text-xs text-amber-200/70">Share your experience with Sachin King Photo Frame</p>
        </div>

        {success ? (
          <div className="p-6 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h4 className="text-base font-bold text-emerald-300">Thank you for your review!</h4>
            <p className="text-xs text-amber-200/80">Your feedback has been published on our website.</p>
            <button
              onClick={() => setSuccess(false)}
              className="text-xs text-amber-300 underline font-semibold"
            >
              Write Another Review
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-amber-300 font-medium mb-1">Your Full Name *</label>
              <input
                type="text"
                required
                placeholder="Enter your name"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-amber-500/30 text-amber-100 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-amber-300 font-medium mb-1">Star Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="p-1 text-amber-400"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= formData.rating ? 'fill-amber-400' : 'text-amber-500/30'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-amber-300 font-medium mb-1">Your Feedback / Review *</label>
              <textarea
                rows="4"
                required
                placeholder="Tell us about the photo frame or printing quality you received..."
                value={formData.review}
                onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-amber-500/30 text-amber-100 focus:outline-none focus:border-amber-400"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 font-bold uppercase tracking-wider text-xs hover:brightness-110 transition-all gold-glow"
            >
              <Send className="w-4 h-4" /> {submitting ? 'Submitting...' : 'Post Review'}
            </button>
          </form>
        )}
      </div>

    </div>
  );
}
