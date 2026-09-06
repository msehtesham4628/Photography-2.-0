import React, { useRef, useEffect } from 'react';
import {
  Award,
  Sparkles,
  Camera,
  Film,
  Tv,
  ShieldCheck,
  ChevronDown,
  ArrowUpRight,
  MessageCircle,
  Calendar
} from 'lucide-react';
import {
  OFFICIAL_PHOTOGRAPHER,
  OFFICIAL_TITLE,
  OFFICIAL_STATS,
  OFFICIAL_PHONE,
  OFFICIAL_INSTAGRAM_URL,
  OFFICIAL_INSTAGRAM_HANDLE
} from '../data/instagramData';

const aboutVideoH264 = '/assets/about-reel-h264.mp4';
const aboutVideoOriginal = '/assets/about-reel.mp4';
const aboutPoster = '/assets/about-reel-poster.jpg';

interface AboutSectionProps {
  onExploreCollection: () => void;
  onBookAppointment: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onExploreCollection,
  onBookAppointment
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

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

  return (
    <section
      id="about"
      className="relative w-full min-h-screen bg-[#070605] text-white flex flex-col justify-between overflow-hidden"
    >
      {/* 1. VISIBLE FULL-BLEED HORIZONTAL BACKGROUND VIDEO */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={aboutPoster}
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.88] saturate-[1.05]"
        >
          <source src={aboutVideoH264} type="video/mp4" />
          <source src={aboutVideoOriginal} type="video/mp4" />
        </video>

        {/* Delicate, translucent cinematic overlay so the video is vividly visible with crisp motion */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070605] via-[#070605]/30 to-[#070605]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/50" />
      </div>

      {/* 2. FOREGROUND HERO CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-10 lg:px-16 pt-28 sm:pt-36 pb-16 flex-1 flex flex-col justify-between">
        {/* Top Tag & Heritage Badge */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-6 max-w-full">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-black/60 border border-[#C5A059]/50 text-[#E6B85C] text-xs font-mono uppercase tracking-wider backdrop-blur-md shadow-lg max-w-full">
            <Award className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
            <span className="truncate">ABOUT US · 24+ YEARS OF NIZAMI HERITAGE</span>
          </div>

          <a
            href={OFFICIAL_INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white text-xs font-mono tracking-wider transition-all backdrop-blur-md shadow-md max-w-full"
          >
            <span className="truncate max-w-[200px] sm:max-w-none">{OFFICIAL_INSTAGRAM_HANDLE}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
          </a>
        </div>

        {/* Centerpiece Hero Narrative & Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center my-auto py-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-[0.35em] text-[#C5A059] block">
                {OFFICIAL_PHOTOGRAPHER} · {OFFICIAL_TITLE}
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[0.95] uppercase tracking-[-0.03em] text-white">
                Preserving <br />
                <i className="font-normal italic text-[#C5A059]">Heritage,</i> <br />
                One Vow At A Time.
              </h1>
            </div>

            <p className="text-base sm:text-xl text-white/90 font-light font-sans leading-relaxed max-w-2xl">
              Honored as Hyderabad's <strong>Best Female Photographer of the Year</strong>, Syeda Shakila Qazi brings over two decades of artistic mastery to Royal Nizami weddings, sacred Nikah ceremonies, and cinematic heirlooms.
            </p>

            <blockquote className="border-l-2 border-[#C5A059] pl-4 sm:pl-6 py-1 text-sm sm:text-base text-white/80 italic font-serif max-w-xl">
              “A royal wedding is an everlasting heirloom of whispered prayers, stolen glances, and sacred memories.”
            </blockquote>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                type="button"
                onClick={onExploreCollection}
                className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-9 py-4 rounded-full bg-[#C5A059] hover:bg-[#b08e4d] text-[#070605] font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-xl hover:scale-[1.02] cursor-pointer"
              >
                <span>OUR COLLECTION</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onBookAppointment}
                className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-mono text-xs uppercase tracking-widest font-medium transition-all backdrop-blur-md shadow-md cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <span>BOOK APPOINTMENT</span>
              </button>

              <a
                href={`https://wa.me/919347307151?text=${encodeURIComponent(
                  'Hello Syeda Shakila Qazi, I would like to inquire about royal wedding photography & cinematography bookings!'
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-full bg-black/50 hover:bg-black/70 border border-[#25D366]/40 text-[#25D366] font-mono text-xs uppercase tracking-wider transition-all backdrop-blur-md"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span className="hidden sm:inline">WHATSAPP: {OFFICIAL_PHONE}</span>
                <span className="sm:hidden">WHATSAPP</span>
              </a>
            </div>
          </div>

          {/* Right Metrics & Capabilities Box */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-3xl bg-black/60 backdrop-blur-md border border-white/15 p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="font-mono text-xs uppercase tracking-widest text-white/70">STUDIO ACCREDITATION</span>
                <span className="text-[#C5A059] font-mono text-xs font-bold">EST. 2000</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="font-serif text-2xl sm:text-3xl text-[#C5A059] font-medium">
                    {OFFICIAL_STATS.experience}
                  </div>
                  <div className="text-[11px] font-mono text-white/70 uppercase pt-1">
                    CRAFT LEGACY
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="font-serif text-2xl sm:text-3xl text-white font-medium">
                    {OFFICIAL_STATS.posts}
                  </div>
                  <div className="text-[11px] font-mono text-white/70 uppercase pt-1">
                    ROYAL ARCHIVES
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="font-serif text-2xl sm:text-3xl text-white font-medium">
                    {OFFICIAL_STATS.followers}
                  </div>
                  <div className="text-[11px] font-mono text-white/70 uppercase pt-1">
                    INSTAGRAM FANS
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="font-serif text-2xl sm:text-3xl text-[#C5A059] font-medium">
                    100%
                  </div>
                  <div className="text-[11px] font-mono text-white/70 uppercase pt-1">
                    FEMALE-LED CREW
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2 text-xs font-mono text-white/75">
                <div className="flex items-center gap-2">
                  <Camera className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Cinematic Royal Photography</span>
                </div>
                <div className="flex items-center gap-2">
                  <Film className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>4K HDR Wedding Films</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tv className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Live LED Drone & Crane Coverage</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Complete Parda / Privacy Protocol</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Scroll Indicator */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
          <div>HYDERABAD · TELANGANA · DESTINATION ROYAL WEDDINGS</div>
          <button
            type="button"
            onClick={onExploreCollection}
            className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer text-white/70"
          >
            <span>EXPLORE OUR COLLECTION</span>
            <ChevronDown className="w-4 h-4 text-[#C5A059]" />
          </button>
        </div>
      </div>
    </section>
  );
};
