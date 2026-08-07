import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Search, Frame, Printer, Gift, ShieldCheck } from 'lucide-react';
import api from '../services/api';
import ServiceCard from '../components/ServiceCard';

const categories = ['All', 'Framing', 'Printing', 'Religious', 'Decor', 'Corporate', 'Gifts', 'Services'];

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('/services');
        setServices(res.data || []);
      } catch (err) {
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Filter logic
  const filteredServices = services.filter((service) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      (service.category && service.category.toLowerCase() === selectedCategory.toLowerCase());

    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20 inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Ek Hi Chhat Ke Neeche Sabhi Suvidhayein
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold font-playfair text-amber-50">
          Photo Framing, Printing & Custom Services
        </h1>
        <p className="text-xs sm:text-sm text-amber-200/80 font-poppins leading-relaxed">
          Browse our complete range of custom wooden frames, photo lamination, devotional god frames, canvas printing, visiting cards, flex banners, and insurance services.
        </p>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="space-y-6">
        
        {/* Search Bar */}
        <div className="max-w-xl mx-auto relative">
          <Search className="w-5 h-5 text-amber-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search service name (e.g., Flex Banner, God Frame, Visiting Card)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-[#14141c] border border-amber-500/30 text-amber-100 placeholder-amber-500/50 text-xs sm:text-sm focus:outline-none focus:border-amber-400 glass-card shadow-xl"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-lg gold-glow font-bold'
                  : 'bg-amber-950/40 text-amber-200/80 border border-amber-500/20 hover:bg-amber-900/50 hover:text-amber-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="py-20 text-center text-amber-400">Loading All Services...</div>
      ) : filteredServices.length === 0 ? (
        <div className="py-20 text-center space-y-3 glass-card rounded-2xl p-8 max-w-md mx-auto">
          <p className="text-amber-200 font-medium">No services found matching your filter.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="text-xs text-amber-400 underline font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-6">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}

    </div>
  );
}
