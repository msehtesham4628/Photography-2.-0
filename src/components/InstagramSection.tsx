import React, { useState } from 'react';
import {
  instagramPosts,
  instagramProfileData,
  OFFICIAL_INSTAGRAM_URL,
  OFFICIAL_INSTAGRAM_HANDLE,
  OFFICIAL_PHONE,
  OFFICIAL_PHOTOGRAPHER
} from '../data/instagramData';
import { InstagramPostItem } from '../types';
import {
  Instagram,
  Heart,
  MessageCircle,
  Play,
  ExternalLink,
  Phone,
  Award,
  CheckCircle2,
  Film,
  Sparkles,
  Camera,
  Share2,
  X,
  Volume2,
  VolumeX
} from 'lucide-react';

const storyHighlights = [
  {
    title: 'Bridal',
    img: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=400&q=80',
    tag: 'Nizami Brides'
  },
  {
    title: 'Reels',
    img: '/assets/hero-reel-poster.jpg',
    tag: 'Viral Reels'
  },
  {
    title: 'Awards 🏆',
    img: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=400&q=80',
    tag: 'Best Female Photog'
  },
  {
    title: 'Payal & Polki',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    tag: 'Bridal Jewelry'
  },
  {
    title: 'Haldi Joy',
    img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=400&q=80',
    tag: 'Candid Joy'
  },
  {
    title: 'Falaknuma',
    img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80',
    tag: 'Royal Weddings'
  },
  {
    title: 'Drone 4K',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80',
    tag: 'Aerial Cinema'
  }
];

export const InstagramSection: React.FC = () => {
  const [activeItem, setActiveItem] = useState<InstagramPostItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'reels' | 'bridal' | 'candid'>('all');
  const [modalMuted, setModalMuted] = useState(true);

  const filteredPosts = instagramPosts.filter((post) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'reels') return post.type === 'reel';
    if (activeFilter === 'bridal') {
      return (
        post.caption.toLowerCase().includes('bridal') ||
        post.caption.toLowerCase().includes('bride') ||
        post.caption.toLowerCase().includes('payal') ||
        post.caption.toLowerCase().includes('polki')
      );
    }
    if (activeFilter === 'candid') {
      return (
        post.caption.toLowerCase().includes('candid') ||
        post.caption.toLowerCase().includes('haldi') ||
        post.caption.toLowerCase().includes('henna') ||
        post.caption.toLowerCase().includes('macro')
      );
    }
    return true;
  });

  const whatsappUrl = `https://wa.me/919347307151?text=${encodeURIComponent(
    'Hello Syeda Shakila Qazi, I saw your Instagram profile (@shakeela__photography) and would like to enquire about wedding photography & cinematography bookings.'
  )}`;

  return (
    <section
      id="instagram"
      className="relative w-full py-20 sm:py-28 bg-[#181614] text-[#F3EEEA] overflow-hidden border-t border-b border-[#2D2824]"
    >
      {/* Decorative subtle ambient backdrop */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#997328]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Instagram Profile Header Card */}
        <div className="mb-14 p-6 sm:p-8 rounded-2xl bg-[#221F1C]/90 border border-[#3A332C] shadow-2xl backdrop-blur-md">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Avatar & Identifiers */}
            <div className="flex items-center gap-5 sm:gap-6">
              <a
                href={OFFICIAL_INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="relative group block shrink-0"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[3px] bg-gradient-to-tr from-[#FFB703] via-[#E63946] to-[#9B5DE5] shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#181614] p-[2px]">
                    <img
                      src={instagramProfileData.avatarUrl}
                      alt={OFFICIAL_PHOTOGRAPHER}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-[#181614] rounded-full p-1 border border-[#3A332C]">
                  <Instagram className="w-4 h-4 text-[#E63946]" />
                </div>
              </a>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-serif tracking-wide text-white font-medium">
                    {OFFICIAL_PHOTOGRAPHER}
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#3A332C] text-[#C5A059] text-[10px] font-mono uppercase tracking-wider">
                    <CheckCircle2 className="w-3 h-3 text-[#C5A059]" />
                    Verified Creator
                  </span>
                </div>

                <a
                  href={OFFICIAL_INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs sm:text-sm font-mono text-[#A89F95] hover:text-[#C5A059] transition-colors inline-block mt-0.5"
                >
                  {OFFICIAL_INSTAGRAM_HANDLE}
                </a>

                {/* Badges / Awards */}
                <div className="flex items-center gap-2 mt-2 text-xs text-[#D9CEBF]">
                  <Award className="w-3.5 h-3.5 text-[#E6B85C]" />
                  <span className="font-serif italic font-medium text-[#E6B85C]">
                    Best Female Photographer of the Year
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Statistics */}
            <div className="flex items-center gap-6 sm:gap-10 border-t md:border-t-0 md:border-l border-[#3A332C] pt-4 md:pt-0 md:pl-8 w-full md:w-auto justify-around md:justify-start">
              <div className="text-center">
                <span className="block text-lg sm:text-xl font-mono font-bold text-white tracking-tight">
                  {instagramProfileData.stats.posts}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#9A9085]">Posts</span>
              </div>
              <div className="text-center">
                <span className="block text-lg sm:text-xl font-mono font-bold text-[#E6B85C] tracking-tight">
                  {instagramProfileData.stats.followers}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#9A9085]">Followers</span>
              </div>
              <div className="text-center">
                <span className="block text-lg sm:text-xl font-mono font-bold text-white tracking-tight">
                  {instagramProfileData.stats.experience}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#9A9085]">Since 2000</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full md:w-auto">
              <a
                href={OFFICIAL_INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#E63946] via-[#D90429] to-[#9B5DE5] text-white text-xs font-mono uppercase tracking-wider font-semibold hover:brightness-110 shadow-lg transition-all"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>FOLLOW ON INSTAGRAM</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-[#52483F] bg-[#181614] text-white text-xs font-mono uppercase tracking-wider hover:border-[#C5A059] transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-[#25D366]" />
                <span>BOOK: 9347307151</span>
              </a>
            </div>
          </div>

          {/* Bio text */}
          <div className="mt-5 pt-4 border-t border-[#312B25] text-xs text-[#BCB2A5] leading-relaxed flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p>
              <strong className="text-white font-medium">Services: </strong>
              Candid Photography · Cinematography & Films · 4K Drones · LED Wall Staging · Destination Weddings.
            </p>
            <span className="font-mono text-[11px] text-[#A69989] shrink-0">
              📍 Hyderabad, Telangana · Available Worldwide
            </span>
          </div>
        </div>

        {/* Story Highlights Circles */}
        <div className="mb-10">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#A89F95] uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>CURATED INSTAGRAM STORIES & REELS</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-3 scrollbar-thin">
            {storyHighlights.map((story) => (
              <div
                key={story.title}
                onClick={() => {
                  if (story.title.includes('Reels') || story.title.includes('Falaknuma')) {
                    setActiveItem(instagramPosts[0]);
                  } else {
                    setActiveItem(instagramPosts[1]);
                  }
                }}
                className="flex flex-col items-center gap-2 shrink-0 cursor-pointer group"
              >
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full p-[2.5px] bg-gradient-to-tr from-[#E6B85C] via-[#E63946] to-[#9B5DE5] group-hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#181614] p-[2px]">
                    <img
                      src={story.img}
                      alt={story.title}
                      className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                <span className="text-[11px] font-mono tracking-tight text-[#D9CEBF] group-hover:text-[#E6B85C] transition-colors whitespace-nowrap">
                  {story.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-[#2F2924] pb-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                activeFilter === 'all'
                  ? 'bg-[#E6B85C] text-[#141312] font-semibold shadow-sm'
                  : 'text-[#A89F95] hover:text-white hover:bg-[#25201C]'
              }`}
            >
              All Posts ({instagramPosts.length})
            </button>
            <button
              onClick={() => setActiveFilter('reels')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                activeFilter === 'reels'
                  ? 'bg-[#E6B85C] text-[#141312] font-semibold shadow-sm'
                  : 'text-[#A89F95] hover:text-white hover:bg-[#25201C]'
              }`}
            >
              <Film className="w-3 h-3" />
              Reels
            </button>
            <button
              onClick={() => setActiveFilter('bridal')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                activeFilter === 'bridal'
                  ? 'bg-[#E6B85C] text-[#141312] font-semibold shadow-sm'
                  : 'text-[#A89F95] hover:text-white hover:bg-[#25201C]'
              }`}
            >
              <Camera className="w-3 h-3" />
              Bridal & Jewelry
            </button>
            <button
              onClick={() => setActiveFilter('candid')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                activeFilter === 'candid'
                  ? 'bg-[#E6B85C] text-[#141312] font-semibold shadow-sm'
                  : 'text-[#A89F95] hover:text-white hover:bg-[#25201C]'
              }`}
            >
              Candid & Haldi
            </button>
          </div>

          <a
            href={OFFICIAL_INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-mono text-[#C5A059] hover:underline inline-flex items-center gap-1"
          >
            <span>{OFFICIAL_INSTAGRAM_HANDLE}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Instagram Post & Reel Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setActiveItem(post)}
              className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-[#221F1C] border border-[#362E27] cursor-pointer shadow-md hover:shadow-2xl hover:border-[#C5A059]/60 transition-all duration-300"
            >
              <img
                src={post.thumbnailUrl}
                alt={post.caption}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Type Badge */}
              <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/60 text-white backdrop-blur-sm">
                {post.type === 'reel' ? (
                  <Play className="w-3.5 h-3.5 fill-current text-[#E6B85C]" />
                ) : (
                  <Camera className="w-3.5 h-3.5 text-white/90" />
                )}
              </div>

              {/* Gradient Shade */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Caption & Engagements */}
              <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col justify-end text-white">
                <div className="flex items-center justify-between text-xs font-mono text-[#D9CEBF] mb-2">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-rose-400">
                      <Heart className="w-3.5 h-3.5 fill-current" />
                      <span>{post.likes.toLocaleString()}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>{post.comments}</span>
                    </span>
                  </div>
                  <span className="text-[10px] text-[#A89F95]">{post.date}</span>
                </div>

                <p className="text-xs text-[#EAE0D5] line-clamp-2 leading-relaxed font-light">
                  {post.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 text-center">
          <p className="text-xs font-mono text-[#9A9085] uppercase tracking-widest mb-3">
            EXPLORE 2,200+ POSTS, WEDDING FILMS & BRIDAL GLAMOUR
          </p>
          <a
            href={OFFICIAL_INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#FAF8F5] text-[#141312] text-xs font-mono uppercase tracking-widest font-semibold hover:bg-[#E6B85C] transition-all shadow-xl"
          >
            <Instagram className="w-4 h-4 text-[#E63946]" />
            <span>VISIT @SHAKEELA__PHOTOGRAPHY ON INSTAGRAM</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Reel & Post Modal Player */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative max-w-xl w-full bg-[#1A1816] text-[#FAF8F5] rounded-2xl overflow-hidden shadow-2xl border border-[#3E3730]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 border-b border-[#2F2924] flex items-center justify-between bg-[#221F1C]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full p-[1.5px] bg-gradient-to-tr from-[#FFB703] via-[#E63946] to-[#9B5DE5]">
                  <img
                    src={instagramProfileData.avatarUrl}
                    alt={OFFICIAL_PHOTOGRAPHER}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-mono font-semibold">{OFFICIAL_INSTAGRAM_HANDLE}</span>
                    <CheckCircle2 className="w-3 h-3 text-[#C5A059]" />
                  </div>
                  <span className="text-[10px] text-[#9A9085] block font-serif italic">
                    Syeda Shakila Qazi · Hyderabad
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {activeItem.type === 'reel' && (
                  <button
                    type="button"
                    onClick={() => setModalMuted((m) => !m)}
                    className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                    aria-label={modalMuted ? 'Unmute' : 'Mute'}
                  >
                    {modalMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#E6B85C]" />}
                  </button>
                )}
                <button
                  onClick={() => setActiveItem(null)}
                  className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Media */}
            <div className="aspect-[9/12] sm:aspect-square bg-black relative flex items-center justify-center overflow-hidden">
              {activeItem.type === 'reel' ? (
                <video
                  autoPlay
                  loop
                  playsInline
                  preload="metadata"
                  controls
                  muted={modalMuted}
                  poster={activeItem.thumbnailUrl}
                  className="w-full h-full object-contain bg-black"
                >
                  <source src={activeItem.mediaUrl} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={activeItem.mediaUrl}
                  alt={activeItem.caption}
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            {/* Modal Footer / Details */}
            <div className="p-5 space-y-3 bg-[#1A1816]">
              <div className="flex items-center justify-between text-xs text-[#D9CEBF]">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-rose-400 font-semibold font-mono">
                    <Heart className="w-4 h-4 fill-current" />
                    <span>{activeItem.likes.toLocaleString()} likes</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-[#B8AEA3] font-mono">
                    <MessageCircle className="w-4 h-4" />
                    <span>{activeItem.comments} comments</span>
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#8C8379]">{activeItem.date}</span>
              </div>

              <p className="text-xs text-[#D9CEBF] leading-relaxed">{activeItem.caption}</p>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href={activeItem.permalink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#E63946] to-[#9B5DE5] text-white text-xs font-mono uppercase tracking-wider font-medium flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-md"
                >
                  <Instagram className="w-4 h-4" />
                  <span>VIEW POST ON INSTAGRAM</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl border border-[#3E3730] text-xs font-mono uppercase tracking-wider text-white hover:border-[#C5A059] transition-all flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>ENQUIRE</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
