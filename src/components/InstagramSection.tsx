import React, { useState } from 'react';
import { instagramPosts, OFFICIAL_INSTAGRAM_URL, OFFICIAL_INSTAGRAM_HANDLE } from '../data/instagramData';
import { InstagramPostItem } from '../types';
import { Instagram, Heart, MessageCircle, Play, ExternalLink, RefreshCw, X } from 'lucide-react';

export const InstagramSection: React.FC = () => {
  const [activeItem, setActiveItem] = useState<InstagramPostItem | null>(null);
  const [instagramUrl, setInstagramUrl] = useState<string>(
    localStorage.getItem('shakeela_instagram_url') || OFFICIAL_INSTAGRAM_URL
  );
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshFeed = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 900);
  };

  return (
    <section
      id="instagram-section"
      className="relative w-full py-24 sm:py-32 bg-[#FAF8F5] text-[#141312] overflow-hidden border-b border-[#EAE2D7]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono tracking-[0.25em] text-[#997328] uppercase mb-3">
              <Instagram className="w-3.5 h-3.5" />
              <span>OFFICIAL META / INSTAGRAM PROFESSIONAL FEED</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-[0.06em] uppercase text-[#141312] leading-[1.05]">
              LATEST FROM
              <span className="block text-[#997328] italic font-normal">INSTAGRAM.</span>
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end space-y-3">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#141312] text-[#FAF8F5] text-xs font-serif tracking-[0.18em] uppercase hover:bg-[#997328] transition-colors shadow-md group"
            >
              <Instagram className="w-4 h-4 text-[#C5A059]" />
              <span>FOLLOW ON INSTAGRAM</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
            </a>

            <div className="flex items-center space-x-2 text-xs text-[#7A746E]">
              <span className="font-mono">{OFFICIAL_INSTAGRAM_HANDLE}</span>
              <span>•</span>
              <button
                onClick={handleRefreshFeed}
                className="flex items-center space-x-1 text-[#997328] hover:underline"
              >
                <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>Sync Meta API</span>
              </button>
            </div>
          </div>
        </div>

        {/* Instagram Grid Showcase */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {instagramPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setActiveItem(post)}
              className="group relative aspect-square rounded-xl overflow-hidden border border-[#DCD3C7] bg-black cursor-pointer shadow-sm hover:shadow-xl transition-all"
            >
              <img
                src={post.thumbnailUrl}
                alt={post.caption}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Reel indicator icon */}
              {post.type === 'reel' && (
                <div className="absolute top-2.5 right-2.5 p-1 rounded-md bg-black/60 text-white backdrop-blur-xs">
                  <Play className="w-3 h-3 fill-current" />
                </div>
              )}

              {/* Hover Engagement Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-3 text-center">
                <div className="flex items-center space-x-3 text-xs font-mono mb-2">
                  <span className="flex items-center space-x-1">
                    <Heart className="w-3.5 h-3.5 fill-current text-rose-400" />
                    <span>{post.likes}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MessageCircle className="w-3.5 h-3.5 fill-current text-white" />
                    <span>{post.comments}</span>
                  </span>
                </div>
                <p className="text-[10px] line-clamp-2 text-white/90 font-light">
                  {post.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reel / Post Modal Player */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative max-w-lg w-full bg-[#FAF8F5] text-[#141312] rounded-2xl overflow-hidden shadow-2xl border border-[#D5C7B7]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 border-b border-[#E3D9CD] flex items-center justify-between bg-[#F4EFEA]">
              <div className="flex items-center space-x-2">
                <Instagram className="w-4 h-4 text-[#997328]" />
                <span className="text-xs font-mono font-semibold">{OFFICIAL_INSTAGRAM_HANDLE}</span>
              </div>
              <button
                onClick={() => setActiveItem(null)}
                className="p-1 rounded-full hover:bg-black/10 text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Media Box */}
            <div className="aspect-square bg-black relative">
              {activeItem.type === 'reel' ? (
                <video
                  autoPlay
                  loop
                  controls
                  playsInline
                  poster={activeItem.thumbnailUrl}
                  className="w-full h-full object-cover"
                >
                  <source src={activeItem.mediaUrl} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={activeItem.mediaUrl}
                  alt={activeItem.caption}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Post Information */}
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between text-xs text-[#524B44]">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1 text-rose-600 font-semibold">
                    <Heart className="w-4 h-4 fill-current" />
                    <span>{activeItem.likes.toLocaleString()} likes</span>
                  </span>
                  <span className="flex items-center space-x-1 text-[#6A625A]">
                    <MessageCircle className="w-4 h-4" />
                    <span>{activeItem.comments} comments</span>
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#8C8379]">{activeItem.date}</span>
              </div>

              <p className="text-xs text-[#3A3530] leading-relaxed">
                {activeItem.caption}
              </p>

              <a
                href={activeItem.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-[#141312] text-[#FAF8F5] text-xs font-medium uppercase tracking-wider flex items-center justify-center space-x-2 hover:bg-[#997328] transition-colors"
              >
                <span>VIEW ON INSTAGRAM</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
