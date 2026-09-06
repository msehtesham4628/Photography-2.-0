import React, { useState } from 'react';
import { Instagram, ArrowUpRight, X, Sparkles, MapPin, Heart, Share2, ZoomIn, MessageCircle } from 'lucide-react';
import { INSTAGRAM_PHOTOS, InstagramPhoto } from '../data/photosData';
import { OFFICIAL_INSTAGRAM_URL, OFFICIAL_INSTAGRAM_HANDLE } from '../data/instagramData';

export const PhotosSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<InstagramPhoto | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'Bridal', label: 'Bridal Couture' },
    { id: 'Nikah', label: 'Sacred Nikah' },
    { id: 'Royal Groom', label: 'Royal Groom' },
    { id: 'Celebrity', label: 'Celebrity Styling' },
    { id: 'Candid', label: 'Candid Emotion' }
  ];

  const filteredPhotos =
    activeCategory === 'all'
      ? INSTAGRAM_PHOTOS
      : INSTAGRAM_PHOTOS.filter((p) => p.category === activeCategory);

  return (
    <section id="photos" className="py-24 sm:py-32 px-5 sm:px-10 lg:px-16 bg-[#0E0D0C] text-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/30 text-[#E6B85C] text-xs font-mono uppercase tracking-[0.2em] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OFFICIAL INSTAGRAM GALLERY</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-normal leading-[0.95] uppercase tracking-[-0.03em] text-white">
              Selected <i className="font-normal italic text-[#C5A059]">Works</i>
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2">
            <p className="text-sm font-sans text-white/70 max-w-md md:text-right">
              Curated masterworks from our Instagram feed capturing sacred vows, bespoke jewels, and joyous Nizami traditions.
            </p>
            <a
              href={OFFICIAL_INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C5A059] hover:text-white transition-colors"
            >
              <span>EXPLORE ALL 2,233+ ON {OFFICIAL_INSTAGRAM_HANDLE}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#C5A059] text-black font-semibold shadow-md'
                    : 'bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* 12-Photos Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative rounded-xl overflow-hidden bg-[#181614] border border-white/10 cursor-pointer aspect-4/5 shadow-lg transition-transform duration-500 hover:-translate-y-1 hover:border-[#C5A059]/50"
            >
              {/* Image */}
              <img
                src={photo.image}
                alt={photo.title}
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 filter group-hover:brightness-105"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Top Tag & Number */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-white/80">
                <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-xs border border-white/15">
                  {photo.category}
                </span>
                <span className="opacity-60">#{String(index + 1).padStart(2, '0')}</span>
              </div>

              {/* Bottom Caption Info */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="font-serif text-lg font-medium leading-tight mb-1 text-white group-hover:text-[#C5A059] transition-colors">
                  {photo.title}
                </h3>
                <p className="text-xs text-white/70 line-clamp-2 font-sans mb-3">
                  {photo.caption}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-white/15 text-[10px] font-mono text-white/60">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-[#C5A059]" />
                    <span className="truncate max-w-[140px]">{photo.location}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[#C5A059] group-hover:translate-x-0.5 transition-transform">
                    <span>VIEW</span>
                    <ZoomIn className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram Post Callout */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-white/5 via-[#C5A059]/10 to-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#E63946] via-[#D90429] to-[#9B5DE5] flex items-center justify-center text-white shadow-lg">
              <Instagram className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-xl font-medium text-white">
                Connect on Instagram
              </h4>
              <p className="text-xs font-mono text-white/70">
                Follow {OFFICIAL_INSTAGRAM_HANDLE} for daily bridal portraits, live story highlights, and wedding films.
              </p>
            </div>
          </div>

          <a
            href={OFFICIAL_INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-mono text-xs uppercase tracking-widest font-semibold hover:bg-[#C5A059] transition-all shadow-md shrink-0"
          >
            <span>VISIT INSTAGRAM PROFILE</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#161412] border border-white/15 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Preview Container */}
            <div className="md:w-3/5 bg-black flex items-center justify-center overflow-hidden p-2 sm:p-4">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="max-h-[60vh] md:max-h-[82vh] w-auto object-contain rounded-lg"
              />
            </div>

            {/* Post Details Container */}
            <div className="md:w-2/5 p-6 flex flex-col justify-between overflow-y-auto bg-[#161412]">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#E63946] to-[#9B5DE5] flex items-center justify-center text-white text-xs font-bold">
                      <Instagram className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-mono text-xs font-semibold block text-white">
                        {OFFICIAL_INSTAGRAM_HANDLE}
                      </span>
                      <span className="font-mono text-[9px] text-[#C5A059] uppercase tracking-wider block">
                        Official Post
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPhoto(null)}
                    aria-label="Close modal"
                    className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="inline-block px-2.5 py-1 rounded-md bg-[#C5A059]/20 text-[#E6B85C] text-[10px] font-mono uppercase tracking-wider mb-2">
                  {selectedPhoto.category}
                </div>

                <h3 className="font-serif text-2xl font-semibold text-white mb-2">
                  {selectedPhoto.title}
                </h3>

                <p className="text-xs text-white/80 font-sans leading-relaxed whitespace-pre-wrap mb-4">
                  {selectedPhoto.caption}
                </p>

                <div className="flex items-center gap-2 text-xs font-mono text-white/60 mb-6">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{selectedPhoto.location}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-4 border-t border-white/10 font-mono">
                <a
                  href={selectedPhoto.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#E63946] to-[#9B5DE5] text-white text-xs uppercase tracking-wider font-semibold hover:brightness-110 transition-all shadow-lg"
                >
                  <Instagram className="w-4 h-4" />
                  <span>OPEN IN INSTAGRAM</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href={`https://wa.me/919347307151?text=${encodeURIComponent(`Hello Syeda Shakila Qazi, I saw this photo on your website (${selectedPhoto.title}) and would like to enquire about similar wedding photography.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] text-[#0A2614] text-xs uppercase tracking-wider font-bold hover:brightness-105 transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>INQUIRE ON WHATSAPP</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
