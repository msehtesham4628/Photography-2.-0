import React, { useRef, useState, useEffect } from 'react';
import { Calendar, Play, ArrowDown, Award, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'motion/react';

interface OpeningHeroProps {
  onBookClick: () => void;
  onExploreClick: () => void;
}

export const OpeningHero: React.FC<OpeningHeroProps> = ({ onBookClick, onExploreClick }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.play().catch(() => {
      // Browser autoplay policy fallback
    });
  }, []);

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);

    if (!nextMuted && videoRef.current.paused) {
      videoRef.current.play().catch(() => setIsMuted(true));
    }
  };

  return (
    <section
      id="opening-hero"
      aria-label="Introduction and Hero Showcase"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#FAF8F5]"
    >
      {/* Cinematic Video Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="w-full h-full will-change-transform"
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onLoadedData={() => setIsVideoLoaded(true)}
            poster="/assets/aistudio/IMG-20260904-WA0021.jpg"
            className={`w-full h-full object-cover object-center transition-opacity duration-1000 ${
              isVideoLoaded ? 'opacity-85' : 'opacity-0'
            }`}
          >
            <source
              src="/assets/aistudio/VID-20260904-WA0048.mp4"
              type="video/mp4"
            />
          </video>
        </motion.div>

        {/* Editorial Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/85 via-[#FAF8F5]/65 to-[#FAF8F5]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(250,248,245,0.4)_50%,_rgba(250,248,245,0.9)_100%)]" />
        <div className="absolute inset-0 bg-[#FFFDF9]/15 mix-blend-soft-light" />
      </div>

      {/* Floating Badges */}
      <div className="absolute top-24 sm:top-28 left-4 sm:left-12 z-20 hidden sm:flex items-center space-x-3 text-xs tracking-widest text-[#756C62] uppercase">
        <span className="w-8 h-[1px] bg-[#997328]" />
        <span>HYDERABAD • TELANGANA • WORLDWIDE</span>
      </div>

      <div className="absolute top-24 sm:top-28 right-4 sm:right-12 z-20 hidden sm:flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full border border-[#D5C7B7] bg-[#FAF8F5]/90 backdrop-blur-md text-[#4A443E] text-xs font-medium tracking-wider">
        <Award className="w-3.5 h-3.5 text-[#997328]" aria-hidden="true" />
        <span>BEST FEMALE PHOTOGRAPHER OF THE YEAR</span>
      </div>

      {/* Center Cinematic Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 sm:pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-[#C5B49F]/80 bg-[#FAF8F5]/90 backdrop-blur-md mb-6 shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-[#997328]" />
          <span className="text-xs sm:text-sm font-serif font-semibold tracking-[0.25em] text-[#2C2723] uppercase">
            20+ YEARS OF EXCELLENCE
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="space-y-3 sm:space-y-4"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-normal tracking-[0.12em] text-[#141312] uppercase leading-[0.95] drop-shadow-sm">
            SHAKEELA
          </h1>
          <p className="text-2xl sm:text-4xl md:text-5xl font-serif tracking-[0.28em] text-[#4A433D] uppercase font-light">
            PHOTOGRAPHY
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-6 sm:mt-8 flex items-center justify-center space-x-3 text-xs sm:text-sm tracking-[0.35em] text-[#6A625A] uppercase font-medium"
        >
          <span>WEDDINGS</span>
          <span className="text-[#997328] font-bold" aria-hidden="true">•</span>
          <span>FILMS</span>
          <span className="text-[#997328] font-bold" aria-hidden="true">•</span>
          <span>STORIES</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="max-w-xl mx-auto mt-5 text-sm sm:text-base text-[#524B44] font-light leading-relaxed font-sans"
        >
          Crafting high-end cinematic wedding films &amp; heirloom photography. 
          Capturing royal Nizami elegance, unscripted tears, and lifelong vows.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
        >
          <button
            type="button"
            onClick={onBookClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#141312] text-[#FAF8F5] text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase hover:bg-[#997328] transition-colors duration-300 shadow-lg active:scale-95 flex items-center justify-center space-x-2.5 group cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#E8DFD3] group-hover:scale-110 transition-transform" />
            <span>BOOK YOUR DATE</span>
          </button>

          <button
            type="button"
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-[#A49480] bg-[#FAF8F5]/80 text-[#141312] text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase hover:bg-[#EAE2D7] transition-colors duration-300 backdrop-blur-sm flex items-center justify-center space-x-2.5 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-[#141312] text-[#141312]" />
            <span>EXPLORE STORIES</span>
          </button>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="absolute bottom-6 left-0 right-0 z-20 max-w-7xl mx-auto px-6 flex items-center justify-between">
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute background video' : 'Mute background video'}
          className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-[#D5C7B7] bg-[#FAF8F5]/80 text-xs text-[#524B44] hover:text-[#141312] transition-colors cursor-pointer"
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="text-[11px] font-medium tracking-wider">HERO FILM MUTED</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#997328]" aria-hidden="true" />
              <span className="text-[11px] font-medium tracking-wider text-[#997328]">PLAYING AUDIO</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onExploreClick}
          className="flex items-center space-x-2 text-xs tracking-[0.2em] text-[#6A625A] hover:text-[#141312] transition-colors uppercase group cursor-pointer"
        >
          <span className="hidden sm:inline">WALK THROUGH SCENES</span>
          <ArrowDown className="w-4 h-4 text-[#997328] animate-bounce" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
};
