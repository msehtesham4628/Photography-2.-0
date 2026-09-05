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
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Path resolver for standard Vite / Next / static deployments
  const posterSrc = '/assets/aistudio/IMG-20260904-WA0021.jpg';
  const videoSrc = '/assets/aistudio/VID-20260904-WA0048.mp4';

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsVideoPlaying(true))
        .catch(() => {
          // Keep poster visible if autoplay is blocked or format unsupported
          setIsVideoPlaying(false);
        });
    }
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
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#141312]"
    >
      {/* Background Visual Layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Always-visible static poster fallback */}
        <img
          src={posterSrc}
          alt="Shakeela Photography Wedding Shoot"
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
            isVideoPlaying ? 'opacity-0' : 'opacity-70'
          }`}
          loading="eager"
        />

        {/* Video stream layer */}
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
            preload="auto"
            onPlaying={() => setIsVideoPlaying(true)}
            onError={() => setIsVideoPlaying(false)}
            className={`w-full h-full object-cover object-center transition-opacity duration-1000 ${
              isVideoPlaying ? 'opacity-85' : 'opacity-0'
            }`}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </motion.div>

        {/* Luxury Vignette & Dark Tint for High Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.5)_60%,_rgba(0,0,0,0.9)_100%)]" />
      </div>

      {/* Floating Badges */}
      <div className="absolute top-24 sm:top-28 left-4 sm:left-12 z-20 hidden sm:flex items-center space-x-3 text-xs tracking-widest text-[#E8DFD3]/80 uppercase">
        <span className="w-8 h-[1px] bg-[#C5A880]" />
        <span>HYDERABAD • TELANGANA • WORLDWIDE</span>
      </div>

      <div className="absolute top-24 sm:top-28 right-4 sm:right-12 z-20 hidden sm:flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/10 backdrop-blur-md text-[#E8DFD3] text-xs font-medium tracking-wider">
        <Award className="w-3.5 h-3.5 text-[#C5A880]" aria-hidden="true" />
        <span>BEST FEMALE PHOTOGRAPHER OF THE YEAR</span>
      </div>

      {/* Hero Body */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 sm:pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-[#C5A880]/40 bg-black/40 backdrop-blur-md mb-6 shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
          <span className="text-xs sm:text-sm font-serif font-semibold tracking-[0.25em] text-[#E8DFD3] uppercase">
            20+ YEARS OF EXCELLENCE
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="space-y-3 sm:space-y-4"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-normal tracking-[0.12em] text-white uppercase leading-[0.95] drop-shadow-md">
            SHAKEELA
          </h1>
          <p className="text-2xl sm:text-4xl md:text-5xl font-serif tracking-[0.28em] text-[#E8DFD3] uppercase font-light">
            PHOTOGRAPHY
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-6 sm:mt-8 flex items-center justify-center space-x-3 text-xs sm:text-sm tracking-[0.35em] text-[#C5A880] uppercase font-medium"
        >
          <span>WEDDINGS</span>
          <span className="text-white font-bold" aria-hidden="true">•</span>
          <span>FILMS</span>
          <span className="text-white font-bold" aria-hidden="true">•</span>
          <span>STORIES</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="max-w-xl mx-auto mt-5 text-sm sm:text-base text-[#D1C7BD] font-light leading-relaxed font-sans"
        >
          Crafting high-end cinematic wedding films &amp; heirloom photography. 
          Capturing royal Nizami elegance, unscripted tears, and lifelong vows.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
        >
          <button
            type="button"
            onClick={onBookClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#C5A880] text-[#141312] text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase hover:bg-white transition-colors duration-300 shadow-lg active:scale-95 flex items-center justify-center space-x-2.5 group cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#141312] group-hover:scale-110 transition-transform" />
            <span>BOOK YOUR DATE</span>
          </button>

          <button
            type="button"
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/30 bg-white/10 text-white text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase hover:bg-white/20 transition-colors duration-300 backdrop-blur-sm flex items-center justify-center space-x-2.5 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-white text-white" />
            <span>EXPLORE STORIES</span>
          </button>
        </motion.div>
      </div>

      {/* Audio & Scroll Controls */}
      <div className="absolute bottom-6 left-0 right-0 z-20 max-w-7xl mx-auto px-6 flex items-center justify-between">
        {isVideoPlaying ? (
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-white/20 bg-black/40 text-xs text-white hover:bg-black/60 transition-colors cursor-pointer"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="text-[11px] font-medium tracking-wider">HERO FILM MUTED</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#C5A880]" aria-hidden="true" />
                <span className="text-[11px] font-medium tracking-wider text-[#C5A880]">PLAYING AUDIO</span>
              </>
            )}
          </button>
        ) : (
          <div />
        )}

        <button
          type="button"
          onClick={onExploreClick}
          className="flex items-center space-x-2 text-xs tracking-[0.2em] text-[#E8DFD3] hover:text-white transition-colors uppercase group cursor-pointer"
        >
          <span className="hidden sm:inline">WALK THROUGH SCENES</span>
          <ArrowDown className="w-4 h-4 text-[#C5A880] animate-bounce" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
};
