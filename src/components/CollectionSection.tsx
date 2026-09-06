import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowUpRight,
  X,
  Sparkles,
  MapPin,
  Heart,
  ZoomIn,
  MessageCircle,
  ChevronDown,
  Layers,
  LayoutGrid,
  Calendar,
  Phone,
  Film
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { INSTAGRAM_PHOTOS, InstagramPhoto } from '../data/photosData';
import {
  OFFICIAL_PHOTOGRAPHER,
  OFFICIAL_PHONE
} from '../data/instagramData';

gsap.registerPlugin(ScrollTrigger);

const collectionVideoH264 = '/assets/collection-reel-h264.mp4';
const collectionVideoOriginal = '/assets/collection-reel.mp4';
const collectionPoster = '/assets/collection-reel-poster.jpg';

interface CollectionSectionProps {
  onBookAppointment: () => void;
}

export const CollectionSection: React.FC<CollectionSectionProps> = ({ onBookAppointment }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<InstagramPhoto | null>(null);
  const [viewMode, setViewMode] = useState<'3d-parallax' | 'masonry'>('3d-parallax');

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);
  const depthRibbonRef = useRef<HTMLDivElement>(null);
  const banner3dRef = useRef<HTMLDivElement>(null);

  // Auto-play background video with IntersectionObserver
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    const playVideo = () => {
      video.play().catch(() => {});
    };

    playVideo();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playVideo();
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const categories = [
    { id: 'all', label: 'All Works' },
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

  // Split photos into 3 columns for 3D multi-layered depth parallax
  const col1Photos = filteredPhotos.filter((_, i) => i % 3 === 0);
  const col2Photos = filteredPhotos.filter((_, i) => i % 3 === 1);
  const col3Photos = filteredPhotos.filter((_, i) => i % 3 === 2);

  // GSAP ScrollTrigger 3D Parallax Effect
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Hero 3D depth banner tilt on scroll
      if (banner3dRef.current) {
        gsap.fromTo(
          banner3dRef.current,
          {
            transformPerspective: 1200,
            rotateX: 10,
            translateZ: -40,
            opacity: 0.95
          },
          {
            rotateX: 0,
            translateZ: 0,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: banner3dRef.current,
              start: 'top 85%',
              end: 'top 30%',
              scrub: 1
            }
          }
        );
      }

      // 2. Responsive Parallax MatchMedia
      const mm = gsap.matchMedia();

      // Desktop & Tablet (768px+) - Full 3D Layered Parallax with differential Z and Y velocities
      mm.add('(min-width: 768px)', () => {
        // Foreground Stream (Column 1) - Moves faster and sits closer to camera
        if (col1Ref.current) {
          gsap.fromTo(
            col1Ref.current,
            { y: 50, transformPerspective: 1400, rotateY: 2, translateZ: 35 },
            {
              y: -110,
              rotateY: -2,
              translateZ: 55,
              ease: 'none',
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2
              }
            }
          );
        }

        // Center Deep Core Stream (Column 2) - Stately, grounded, centered depth
        if (col2Ref.current) {
          gsap.fromTo(
            col2Ref.current,
            { y: 120, transformPerspective: 1400, rotateX: -2, translateZ: 0 },
            {
              y: -50,
              rotateX: 2,
              translateZ: 10,
              ease: 'none',
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
              }
            }
          );
        }

        // Accelerated Accent Stream (Column 3) - High velocity with lateral 3D rotation
        if (col3Ref.current) {
          gsap.fromTo(
            col3Ref.current,
            { y: 30, transformPerspective: 1400, rotateY: -2.5, translateZ: 45 },
            {
              y: -160,
              rotateY: 2.5,
              translateZ: 75,
              ease: 'none',
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.4
              }
            }
          );
        }

        // Floating 3D Accent Depth Chips
        if (depthRibbonRef.current) {
          gsap.fromTo(
            depthRibbonRef.current,
            { y: 90, rotateZ: -1.5, translateZ: 80 },
            {
              y: -200,
              rotateZ: 1.5,
              translateZ: 100,
              ease: 'none',
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8
              }
            }
          );
        }
      });

      // Mobile (<768px) - Smooth lightweight vertical parallax without excessive 3D rotation
      mm.add('(max-width: 767px)', () => {
        if (col1Ref.current) {
          gsap.fromTo(
            col1Ref.current,
            { y: 20 },
            {
              y: -40,
              ease: 'none',
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
              }
            }
          );
        }
      });
    }, containerRef);

    // Refresh ScrollTrigger when category switches or images load
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [activeCategory, viewMode]);

  // Handle Interactive 3D Card Hover Tilt
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / rect.height) * 10;
    const rotateY = (x / rect.width) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(30px) scale3d(1.02, 1.02, 1.02)`;
    card.style.transition = 'transform 0.1s ease-out';
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)';
    card.style.transition = 'transform 0.5s ease-out';
  };

  // Keyboard navigation for Lightbox modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPhoto) return;
      if (e.key === 'Escape') {
        setSelectedPhoto(null);
      } else if (e.key === 'ArrowRight') {
        const currentIndex = filteredPhotos.findIndex((p) => p.id === selectedPhoto.id);
        const nextIndex = (currentIndex + 1) % filteredPhotos.length;
        setSelectedPhoto(filteredPhotos[nextIndex]);
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = filteredPhotos.findIndex((p) => p.id === selectedPhoto.id);
        const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
        setSelectedPhoto(filteredPhotos[prevIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, filteredPhotos]);

  const scrollToSelectedWork = () => {
    const el = document.getElementById('selected-work-stream');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="collection" className="relative w-full bg-[#080706] text-white selection:bg-[#C5A059] selection:text-black">
      {/* 1. FULL-BLEED HORIZONTAL HERO VIDEO FOR OUR COLLECTION */}
      <section className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden border-t border-white/10">
        {/* Background Video Layer - Vividly Visible with delicate translucent vignette */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={collectionPoster}
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.88] saturate-[1.05]"
          >
            <source src={collectionVideoH264} type="video/mp4" />
            <source src={collectionVideoOriginal} type="video/mp4" />
          </video>

          {/* Translucent cinematic overlay - Keeps the video vibrant and clearly moving */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-[#080706]/35 to-[#080706]/65" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/60" />
        </div>

        {/* Foreground Collection Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-10 lg:px-16 pt-28 sm:pt-36 pb-16 flex-1 flex flex-col justify-between">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 border border-[#C5A059]/50 text-[#E6B85C] text-xs font-mono uppercase tracking-[0.25em] backdrop-blur-md shadow-lg">
              <Film className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>OUR COLLECTION · CINEMATIC ROYAL FRAMES</span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 border border-white/20 text-white/90 text-xs font-mono tracking-wider backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>HYDERABAD &amp; DESTINATION WEDDINGS</span>
            </div>
          </div>

          {/* Title & Description */}
          <div className="max-w-3xl space-y-6 my-auto py-8">
            <span className="font-mono text-xs uppercase tracking-[0.35em] text-[#C5A059] block">
              CURATED WEDDING ARCHIVES
            </span>

            <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[0.95] uppercase tracking-[-0.03em] text-white">
              Our Collection <br />
              <i className="font-normal italic text-[#C5A059]">&amp; Selected Work.</i>
            </h2>

            <p className="text-base sm:text-xl text-white/90 font-light font-sans leading-relaxed">
              Every celebration is a grand tapestry of royal emotion. Explore our signature collection of bespoke bridal portraits, sacred Nikah chronicles, and candid wedding cinematography.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                type="button"
                onClick={scrollToSelectedWork}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#C5A059] hover:bg-[#b08e4d] text-[#070605] font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-xl hover:scale-[1.02] cursor-pointer"
              >
                <span>VIEW 3D PARALLAX GALLERY</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onBookAppointment}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-mono text-xs uppercase tracking-widest font-medium transition-all backdrop-blur-md shadow-md cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#C5A059]" />
                <span>BOOK APPOINTMENT</span>
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
            <div>ROYAL NIKAH · BRIDAL JEWELS · DESTINATION RECEPTIONS</div>
            <button
              type="button"
              onClick={scrollToSelectedWork}
              className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer text-white/70"
            >
              <span>SCROLL TO GALLERY</span>
              <ChevronDown className="w-4 h-4 text-[#C5A059]" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. SELECTED WORK SECTION WITH GSAP SCROLLTRIGGER 3D LAYERED PARALLAX */}
      <section id="selected-work-stream" className="relative pt-24 sm:pt-32 pb-16 px-5 sm:px-10 lg:px-16 border-t border-white/10 overflow-hidden bg-[#0c0b0a]">
        <div className="max-w-7xl mx-auto relative z-10">
          <div ref={banner3dRef} className="space-y-6 max-w-4xl mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/40 text-[#E6B85C] text-xs font-mono uppercase tracking-[0.2em]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SELECTED WORK · 3D LAYERED PARALLAX</span>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-3xl sm:text-5xl font-normal leading-[1] uppercase tracking-[-0.02em] text-white">
                Curated <i className="font-normal italic text-[#C5A059]">Royal Heirlooms</i>
              </h3>
              <p className="text-sm sm:text-base font-sans text-white/75 max-w-2xl leading-relaxed">
                Scroll to experience differential 3D depth and parallax across foreground and background layers. Click any portrait for detailed framing, venue details, and WhatsApp bookings.
              </p>
            </div>

            {/* Filter Categories and View Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
              {/* Categories */}
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  const count =
                    cat.id === 'all'
                      ? INSTAGRAM_PHOTOS.length
                      : INSTAGRAM_PHOTOS.filter((p) => p.category === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#C5A059] text-black font-semibold shadow-md scale-[1.02]'
                          : 'bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white'
                      }`}
                    >
                      {cat.label} ({count})
                    </button>
                  );
                })}
              </div>

              {/* View Toggle */}
              <div className="inline-flex p-1 rounded-full bg-white/5 border border-white/10">
                <button
                  type="button"
                  onClick={() => setViewMode('3d-parallax')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    viewMode === '3d-parallax'
                      ? 'bg-[#C5A059] text-black font-semibold'
                      : 'text-white/60 hover:text-white'
                  }`}
                  title="GSAP ScrollTrigger 3D Depth Parallax View"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>3D PARALLAX</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode('masonry')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    viewMode === 'masonry'
                      ? 'bg-[#C5A059] text-black font-semibold'
                      : 'text-white/60 hover:text-white'
                  }`}
                  title="Curated Grid View"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>GRID</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Parallax Stage */}
        <div
          ref={containerRef}
          className="max-w-7xl mx-auto relative z-10"
          style={{ perspective: '1400px', transformStyle: 'preserve-3d' }}
        >
          {/* Floating 3D Accent Depth Chips */}
          <div
            ref={depthRibbonRef}
            className="pointer-events-none hidden lg:flex justify-between items-center max-w-7xl mx-auto absolute inset-x-0 -top-8 z-20 px-4 text-xs font-mono"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="px-4 py-2 rounded-full bg-black/85 border border-[#C5A059]/40 text-[#E6B85C] shadow-2xl backdrop-blur-xl transform -rotate-2">
              ✨ نِكَاح · Sacred Nizami Vows
            </div>
            <div className="px-4 py-2 rounded-full bg-black/85 border border-white/20 text-white/90 shadow-2xl backdrop-blur-xl transform rotate-1">
              📍 Taj Falaknuma Palace &amp; Chowmahalla
            </div>
            <div className="px-4 py-2 rounded-full bg-black/85 border border-[#C5A059]/40 text-[#E6B85C] shadow-2xl backdrop-blur-xl transform -rotate-1">
              💍 Couture Bridal Heirlooms
            </div>
          </div>

          {viewMode === '3d-parallax' ? (
            /* 3-COLUMN 3D LAYERED PARALLAX STREAM */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start pt-6">
              {/* STREAM 1: FOREGROUND DEPTH LAYER */}
              <div
                ref={col1Ref}
                className="space-y-8 will-change-transform"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {col1Photos.map((photo, idx) => (
                  <div
                    key={photo.id}
                    onMouseMove={handleCardMouseMove}
                    onMouseLeave={handleCardMouseLeave}
                    onClick={() => setSelectedPhoto(photo)}
                    className="group relative rounded-3xl overflow-hidden bg-[#151312] border border-white/15 cursor-pointer shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-shadow duration-500 hover:shadow-[0_25px_60px_rgba(197,160,89,0.25)] hover:border-[#C5A059]/70"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="relative aspect-4/5 overflow-hidden">
                      <img
                        src={photo.image}
                        alt={photo.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 filter group-hover:brightness-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                      <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                        <span className="font-mono text-[10px] text-white/90 bg-black/70 px-3 py-1 rounded-full border border-white/15 backdrop-blur-md">
                          STREAM 01 · #{String(idx * 3 + 1).padStart(2, '0')}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#E6B85C] bg-[#C5A059]/25 px-3 py-1 rounded-full border border-[#C5A059]/40 backdrop-blur-md">
                          {photo.category}
                        </span>
                      </div>

                      <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 z-10 space-y-2">
                        <h4 className="font-serif text-lg sm:text-xl text-white font-medium line-clamp-1 group-hover:text-[#E6B85C] transition-colors">
                          {photo.title}
                        </h4>
                        <p className="text-xs text-white/75 font-sans line-clamp-2 leading-relaxed">
                          {photo.caption}
                        </p>
                        <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-white/60 border-t border-white/10">
                          <span className="flex items-center gap-1.5 truncate max-w-[70%]">
                            <MapPin className="w-3 h-3 text-[#C5A059] shrink-0" />
                            <span className="truncate">{photo.location}</span>
                          </span>
                          <span className="inline-flex items-center gap-1 text-[#C5A059] font-medium shrink-0">
                            <ZoomIn className="w-3 h-3" />
                            <span>INSPECT</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* STREAM 2: CORE GROUNDED LAYER */}
              <div
                ref={col2Ref}
                className="space-y-8 will-change-transform pt-0 sm:pt-12"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {col2Photos.map((photo, idx) => (
                  <div
                    key={photo.id}
                    onMouseMove={handleCardMouseMove}
                    onMouseLeave={handleCardMouseLeave}
                    onClick={() => setSelectedPhoto(photo)}
                    className="group relative rounded-3xl overflow-hidden bg-[#151312] border border-white/15 cursor-pointer shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-shadow duration-500 hover:shadow-[0_25px_60px_rgba(197,160,89,0.25)] hover:border-[#C5A059]/70"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="relative aspect-4/5 overflow-hidden">
                      <img
                        src={photo.image}
                        alt={photo.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 filter group-hover:brightness-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                      <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                        <span className="font-mono text-[10px] text-white/90 bg-black/70 px-3 py-1 rounded-full border border-white/15 backdrop-blur-md">
                          STREAM 02 · #{String(idx * 3 + 2).padStart(2, '0')}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#E6B85C] bg-[#C5A059]/25 px-3 py-1 rounded-full border border-[#C5A059]/40 backdrop-blur-md">
                          {photo.category}
                        </span>
                      </div>

                      <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 z-10 space-y-2">
                        <h4 className="font-serif text-lg sm:text-xl text-white font-medium line-clamp-1 group-hover:text-[#E6B85C] transition-colors">
                          {photo.title}
                        </h4>
                        <p className="text-xs text-white/75 font-sans line-clamp-2 leading-relaxed">
                          {photo.caption}
                        </p>
                        <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-white/60 border-t border-white/10">
                          <span className="flex items-center gap-1.5 truncate max-w-[70%]">
                            <MapPin className="w-3 h-3 text-[#C5A059] shrink-0" />
                            <span className="truncate">{photo.location}</span>
                          </span>
                          <span className="inline-flex items-center gap-1 text-[#C5A059] font-medium shrink-0">
                            <ZoomIn className="w-3 h-3" />
                            <span>INSPECT</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* STREAM 3: ACCELERATED ACCENT LAYER */}
              <div
                ref={col3Ref}
                className="space-y-8 will-change-transform pt-0 sm:pt-24"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {col3Photos.map((photo, idx) => (
                  <div
                    key={photo.id}
                    onMouseMove={handleCardMouseMove}
                    onMouseLeave={handleCardMouseLeave}
                    onClick={() => setSelectedPhoto(photo)}
                    className="group relative rounded-3xl overflow-hidden bg-[#151312] border border-white/15 cursor-pointer shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-shadow duration-500 hover:shadow-[0_25px_60px_rgba(197,160,89,0.25)] hover:border-[#C5A059]/70"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="relative aspect-4/5 overflow-hidden">
                      <img
                        src={photo.image}
                        alt={photo.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 filter group-hover:brightness-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                      <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                        <span className="font-mono text-[10px] text-white/90 bg-black/70 px-3 py-1 rounded-full border border-white/15 backdrop-blur-md">
                          STREAM 03 · #{String(idx * 3 + 3).padStart(2, '0')}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#E6B85C] bg-[#C5A059]/25 px-3 py-1 rounded-full border border-[#C5A059]/40 backdrop-blur-md">
                          {photo.category}
                        </span>
                      </div>

                      <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 z-10 space-y-2">
                        <h4 className="font-serif text-lg sm:text-xl text-white font-medium line-clamp-1 group-hover:text-[#E6B85C] transition-colors">
                          {photo.title}
                        </h4>
                        <p className="text-xs text-white/75 font-sans line-clamp-2 leading-relaxed">
                          {photo.caption}
                        </p>
                        <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-white/60 border-t border-white/10">
                          <span className="flex items-center gap-1.5 truncate max-w-[70%]">
                            <MapPin className="w-3 h-3 text-[#C5A059] shrink-0" />
                            <span className="truncate">{photo.location}</span>
                          </span>
                          <span className="inline-flex items-center gap-1 text-[#C5A059] font-medium shrink-0">
                            <ZoomIn className="w-3 h-3" />
                            <span>INSPECT</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* MASONRY GRID VIEW */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-6">
              {filteredPhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  onClick={() => setSelectedPhoto(photo)}
                  className="group relative rounded-2xl overflow-hidden bg-[#151312] border border-white/10 cursor-pointer aspect-4/5 shadow-lg transition-all duration-300 hover:border-[#C5A059]/60 hover:shadow-2xl"
                >
                  <img
                    src={photo.image}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent opacity-85 group-hover:opacity-95" />

                  <div className="absolute top-3.5 left-3.5 z-10 font-mono text-[10px] text-white/80 bg-black/60 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-md">
                    #{String(index + 1).padStart(2, '0')}
                  </div>

                  <div className="absolute top-3.5 right-3.5 z-10 font-mono text-[10px] uppercase tracking-wider text-[#E6B85C] bg-[#C5A059]/20 px-2.5 py-1 rounded-full border border-[#C5A059]/40 backdrop-blur-md">
                    {photo.category}
                  </div>

                  <div className="absolute bottom-0 inset-x-0 p-4 z-10 space-y-1">
                    <h4 className="font-serif text-base text-white font-medium line-clamp-1 group-hover:text-[#E6B85C]">
                      {photo.title}
                    </h4>
                    <p className="text-xs text-white/70 font-sans line-clamp-2">
                      {photo.caption}
                    </p>
                    <div className="pt-1.5 flex items-center justify-between text-[10px] font-mono text-white/50 border-t border-white/10">
                      <span className="truncate">{photo.location}</span>
                      <span className="text-[#C5A059]">VIEW</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Luxury Inquiry Bar */}
          <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-black/80 via-[#151312] to-black/80 border border-[#C5A059]/30 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl backdrop-blur-xl">
            <div className="space-y-2 text-center md:text-left">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#C5A059] block">
                RESERVE YOUR CEREMONY DATES
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white">
                Every Love Story Deserves Royal Preservation.
              </h3>
              <p className="text-sm text-white/70 font-sans max-w-xl">
                Consult with Syeda Shakila Qazi for bespoke Hyderabadi wedding photography, cinematic films, and heirloom albums.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={onBookAppointment}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#C5A059] hover:bg-[#b08e4d] text-[#070605] font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-xl hover:scale-[1.02] cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>BOOK APPOINTMENT</span>
              </button>

              <a
                href={`https://wa.me/919347307151?text=${encodeURIComponent(
                  'Hello Syeda Shakila Qazi, I am exploring your wedding collection and would like to inquire about booking availability.'
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 text-[#25D366] font-mono text-xs uppercase tracking-wider font-semibold transition-all backdrop-blur-md cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WHATSAPP {OFFICIAL_PHONE}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LIGHTBOX INSPECT MODAL (No Instagram Links) */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[92vh] bg-[#121110] border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/70 hover:bg-black text-white/80 hover:text-white border border-white/20 transition-all cursor-pointer shadow-lg"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Image View */}
            <div className="lg:w-3/5 bg-black flex items-center justify-center overflow-hidden max-h-[50vh] lg:max-h-[85vh] relative group">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain object-center"
              />
            </div>

            {/* Right Information & Booking CTA */}
            <div className="lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#C5A059] bg-[#C5A059]/10 px-3 py-1 rounded-full border border-[#C5A059]/30">
                    {selectedPhoto.category}
                  </span>
                  <span className="font-mono text-xs text-white/50">{selectedPhoto.location}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white leading-tight">
                  {selectedPhoto.title}
                </h3>

                <p className="text-sm font-sans text-white/80 leading-relaxed">
                  {selectedPhoto.caption}
                </p>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono text-white/75 space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{selectedPhoto.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Captured by {OFFICIAL_PHOTOGRAPHER}</span>
                  </div>
                </div>
              </div>

              {/* CTAs - Pure WhatsApp & Appointment Consultation, No Instagram */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <a
                  href={`https://wa.me/919347307151?text=${encodeURIComponent(
                    `Hello Syeda Shakila Qazi, I saw this frame "${selectedPhoto.title}" on your website and would love to inquire for my wedding!`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-[#0A2614] font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-lg"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>INQUIRE VIA WHATSAPP</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedPhoto(null);
                    onBookAppointment();
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-[#C5A059] hover:bg-[#b08e4d] text-black font-mono text-xs uppercase tracking-wider font-bold transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>SCHEDULE CONSULTATION</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
