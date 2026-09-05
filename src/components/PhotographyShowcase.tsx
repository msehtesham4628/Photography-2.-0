import React, { useState, useMemo, useRef } from 'react';
import { photographyItems } from '../data/mediaData';
import { MediaCategory, PhotoItem } from '../types';
import { LightboxModal } from './LightboxModal';
import { Maximize2, Sparkles, ChevronRight, ChevronLeft, Filter, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PhotographyShowcaseProps {
  onBookClick: () => void;
}

export const PhotographyShowcase: React.FC<PhotographyShowcaseProps> = ({ onBookClick }) => {
  const [selectedCategory, setSelectedCategory] = useState<MediaCategory>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);

  const categories: { key: MediaCategory; label: string }[] = [
    { key: 'all', label: 'All Curation' },
    { key: 'weddings', label: 'Weddings' },
    { key: 'engagements', label: 'Engagements' },
    { key: 'pre-weddings', label: 'Pre-Weddings' },
    { key: 'receptions', label: 'Receptions' },
    { key: 'couple-portraits', label: 'Couple Portraits' },
    { key: 'candid-photography', label: 'Candid Photography' },
    { key: 'family-functions', label: 'Family Functions' },
    { key: 'events', label: 'Events' },
  ];

  const filteredPhotos = useMemo(() => {
    if (selectedCategory === 'all') return photographyItems;
    return photographyItems.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const openLightbox = (photo: PhotoItem) => {
    const idx = filteredPhotos.findIndex((p) => p.id === photo.id);
    setLightboxIndex(idx !== -1 ? idx : 0);
  };

  const scrollHorizontal = (direction: 'left' | 'right') => {
    if (horizontalScrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      horizontalScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="photography-showcase"
      className="relative w-full py-24 sm:py-32 bg-[#FAF8F5] text-[#141312] overflow-hidden border-b border-[#EAE2D7]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block: "YOUR MOMENTS. FOREVER." */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono tracking-[0.25em] text-[#997328] uppercase mb-3">
              <Camera className="w-3.5 h-3.5" />
              <span>EDITORIAL PHOTOGRAPHY EXHIBITION</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-[0.06em] uppercase text-[#141312] leading-[1.05]">
              YOUR MOMENTS.
              <span className="block text-[#997328] italic font-normal">FOREVER.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm text-[#615850] font-light leading-relaxed">
            Every photograph is framed with museum-level intention. Layered compositions, authentic natural warmth, and the emotional resonance of royalty.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all shrink-0 ${
                selectedCategory === cat.key
                  ? 'bg-[#141312] text-[#FAF8F5] shadow-md scale-105'
                  : 'bg-[#F4EFEA] text-[#554E47] hover:bg-[#EAE2D7] border border-[#E0D6C8]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Horizontal Cinematic Panorama Reel (Scroll-Driven / Touch-Friendly) */}
        <div className="relative mb-14">
          <div className="flex items-center justify-between mb-3 text-xs tracking-wider text-[#756C62] uppercase">
            <span>CINEMATIC HORIZONTAL REEL</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => scrollHorizontal('left')}
                className="p-1.5 rounded-full border border-[#D5C7B7] hover:bg-[#F4EFEA] text-[#141312]"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollHorizontal('right')}
                className="p-1.5 rounded-full border border-[#D5C7B7] hover:bg-[#F4EFEA] text-[#141312]"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            ref={horizontalScrollRef}
            className="flex space-x-6 overflow-x-auto pb-4 no-scrollbar scroll-smooth"
          >
            {photographyItems.slice(0, 7).map((photo) => (
              <div
                key={photo.id}
                onClick={() => openLightbox(photo)}
                className="group relative shrink-0 w-[300px] sm:w-[380px] aspect-4/5 rounded-2xl overflow-hidden shadow-xl border border-[#DCD3C7] cursor-pointer bg-[#EAE2D7]"
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                <div className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#E8DFD3] block mb-1">
                    {photo.categoryLabel}
                  </span>
                  <h4 className="text-base sm:text-lg font-serif font-medium tracking-wide">
                    {photo.title}
                  </h4>
                  {photo.location && (
                    <p className="text-xs text-[#FAF8F5]/80 font-light truncate mt-0.5">
                      {photo.location}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Editorial Dynamic Asymmetric Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredPhotos.map((photo, index) => {
              const isLarge = index === 0 || index === 4;
              return (
                <motion.div
                  key={photo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => openLightbox(photo)}
                  className={`group relative rounded-2xl overflow-hidden border border-[#DCD3C7] bg-[#EAE2D7] shadow-lg cursor-pointer ${
                    isLarge ? 'sm:col-span-2 aspect-16/10' : 'aspect-4/5'
                  }`}
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle Light Luxury Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141312]/80 via-[#141312]/20 to-transparent opacity-75 group-hover:opacity-95 transition-opacity" />

                  {/* Top Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-[#FAF8F5]/90 backdrop-blur-md text-[10px] font-mono uppercase tracking-widest text-[#141312]">
                      {photo.categoryLabel}
                    </span>
                  </div>

                  {/* Expand button */}
                  <div className="absolute top-4 right-4 p-2.5 rounded-full bg-black/40 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </div>

                  {/* Bottom Caption Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 text-white transform transition-transform duration-300">
                    <h3 className="text-xl sm:text-2xl font-serif tracking-wide">{photo.title}</h3>
                    {photo.caption && (
                      <p className="text-xs sm:text-sm text-[#FAF8F5]/85 font-light mt-1 line-clamp-2">
                        {photo.caption}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-16 p-8 rounded-2xl border border-[#D5C7B7] bg-[#F4EFEA] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-xl font-serif uppercase tracking-wide text-[#141312]">
              Would you like to see our complete family heirloom albums?
            </h3>
            <p className="text-xs sm:text-sm text-[#6A625A] mt-1 font-light">
              We bring physical Italian handcrafted leather albums to in-person consultations in Hyderabad.
            </p>
          </div>
          <button
            onClick={onBookClick}
            className="px-6 py-3 rounded-full bg-[#141312] text-[#FAF8F5] text-xs font-serif tracking-[0.18em] uppercase hover:bg-[#997328] transition-colors shrink-0 shadow-md"
          >
            BOOK CONSULTATION
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <LightboxModal
          photos={filteredPhotos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(index) => setLightboxIndex(index)}
        />
      )}
    </section>
  );
};
