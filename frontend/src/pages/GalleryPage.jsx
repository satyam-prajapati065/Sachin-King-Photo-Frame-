import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ZoomIn, Filter } from 'lucide-react';
import api from '../services/api';
import GalleryLightbox from '../components/GalleryLightbox';

const categories = [
  'All',
  'Family Frames',
  'God Frames',
  'Wedding Frames',
  'Nature Frames',
  'Canvas Prints',
  'Gift Items'
];

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeLightboxItem, setActiveLightboxItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await api.get('/gallery');
        setGalleryItems(res.data || []);
      } catch (err) {
        console.error('Error fetching gallery:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const filteredItems = galleryItems.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20 inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Frame Showcase
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold font-playfair text-amber-50">
          Work Showcase & Frame Gallery
        </h1>
        <p className="text-xs sm:text-sm text-amber-200/80 font-poppins leading-relaxed">
          Explore our real finished photo frames, carved golden devotional frames, wedding portraits, and textured canvas artworks.
        </p>
      </div>

      {/* Category Filter Tabs */}
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

      {/* Gallery Grid */}
      {loading ? (
        <div className="py-20 text-center text-amber-400">Loading Frame Gallery...</div>
      ) : filteredItems.length === 0 ? (
        <div className="py-20 text-center text-amber-200/80">
          No images found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6">
          {filteredItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              onClick={() => setActiveLightboxItem(item)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer border border-amber-500/30 bg-black/60 shadow-xl hover:border-amber-400 transition-all duration-300 hover:-translate-y-1 gold-glow-hover"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-36 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Hover Zoom Icon */}
              <div className="absolute top-2 right-2 p-1.5 sm:p-2 rounded-full bg-amber-500/30 backdrop-blur-md border border-amber-400/50 text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>

              {/* Info Overlay */}
              <div className="absolute bottom-2.5 sm:bottom-4 left-2.5 sm:left-4 right-2.5 sm:right-4 text-amber-50 space-y-0.5 sm:space-y-1">
                <span className="text-[8px] sm:text-[10px] uppercase font-bold text-amber-300 bg-amber-950/90 px-2 py-0.5 rounded-full border border-amber-500/40 inline-block">
                  {item.category}
                </span>
                <h4 className="text-xs sm:text-sm font-bold font-playfair text-amber-100 group-hover:text-amber-300 transition-colors line-clamp-1">
                  {item.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {activeLightboxItem && (
        <GalleryLightbox
          item={activeLightboxItem}
          onClose={() => setActiveLightboxItem(null)}
        />
      )}

    </div>
  );
}
