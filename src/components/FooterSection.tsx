import React, { useRef, useEffect, useState } from 'react';
import {
  Instagram,
  Phone,
  MessageCircle,
  MapPin,
  Mail,
  ArrowUpRight,
  Sparkles,
  Heart,
  ShieldCheck,
  FileCheck2,
  ExternalLink
} from 'lucide-react';
import {
  OFFICIAL_INSTAGRAM_URL,
  OFFICIAL_INSTAGRAM_HANDLE,
  OFFICIAL_PHONE,
  OFFICIAL_GOOGLE_PHONE,
  OFFICIAL_PHONE_ALT,
  OFFICIAL_EMAIL,
  OFFICIAL_ADDRESS,
  OFFICIAL_STUDIO_LOCATION,
  OFFICIAL_STATS,
  OFFICIAL_REGISTRATION
} from '../data/instagramData';
import { RegistrationCertificateModal } from './RegistrationCertificateModal';

const footerVideoH264 = '/assets/footer-reel-h264.mp4';
const footerVideoOriginal = '/assets/footer-reel.mp4';
const footerPoster = '/assets/footer-reel-poster.jpg';

const whatsappBookingUrl = `https://wa.me/919347307151?text=${encodeURIComponent(
  'Hello Syeda Shakila Qazi, I am reaching out from your website and would like to inquire about wedding photography & cinematography bookings!'
)}`;

export const FooterSection: React.FC = () => {
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
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
    <footer id="contact" className="relative w-full min-h-[750px] bg-[#070605] text-white overflow-hidden border-t border-white/20">
      {/* 1. VISIBLE FULL-BLEED BACKGROUND VIDEO */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={footerPoster}
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.88] saturate-[1.05]"
        >
          <source src={footerVideoH264} type="video/mp4" />
          <source src={footerVideoOriginal} type="video/mp4" />
        </video>

        {/* Delicate, translucent vignette so the background video is clearly visible with motion */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070605]/80 via-[#070605]/30 to-[#070605]/85" />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* 2. FOREGROUND CONTENT LAYER */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-10 lg:px-16 pt-16 sm:pt-20 pb-12 flex flex-col justify-between">
        {/* Top Heritage Badge & Instagram Attribution */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-8 max-w-full">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-black/60 border border-[#C5A059]/50 text-[#E6B85C] text-xs font-mono uppercase tracking-wider backdrop-blur-md shadow-lg max-w-full">
            <Heart className="w-3.5 h-3.5 fill-[#C5A059]/60 shrink-0" />
            <span className="truncate">HAPPILY EVER AFTER STARTS NOW</span>
          </div>

          <a
            href={OFFICIAL_INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white text-xs font-mono tracking-wider transition-all backdrop-blur-md shadow-md max-w-full"
          >
            <Instagram className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
            <span className="truncate max-w-[200px] sm:max-w-none">{OFFICIAL_INSTAGRAM_HANDLE}</span>
            <ArrowUpRight className="w-3 h-3 text-[#C5A059] shrink-0" />
          </a>
        </div>

        {/* Heroic Booking & Narrative Card */}
        <div className="my-auto py-8">
          <div className="max-w-3xl rounded-3xl bg-black/55 backdrop-blur-md border border-white/15 p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-6 overflow-hidden">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-[#C5A059]">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">SHAKEELA PHOTOGRAPHY · SYEDA SHAKILA QAZI</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1] uppercase tracking-[-0.02em] text-white">
              Let's Frame <br />
              <i className="font-normal italic text-[#C5A059]">Your Forever.</i>
            </h2>

            <p className="text-base sm:text-xl font-serif italic text-white/95 leading-relaxed">
              “Once in a while, right in the middle of an ordinary life, love gives us a fairytale.”
            </p>

            <p className="text-xs sm:text-sm text-white/85 font-sans leading-relaxed">
              Give your wedding memories a magnificent Royal look. We make sure that every glance, grand entrance, and sacred Nikah ritual will always and forever be the most cherished heirloom of your weddings.
            </p>

            <div className="pt-1 text-xs font-mono text-white/70 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] shrink-0" />
              <span>Bridal makeup by @makeoversbyzarnain · Royal Nizami &amp; Destination Weddings</span>
            </div>

            {/* Quick CTAs: Responsive Stack on Mobile, Flex Row on Desktop */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3 max-w-full">
              <a
                href={whatsappBookingUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-[#0A2614] font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-xl hover:scale-[1.02] text-center shrink-0"
              >
                <MessageCircle className="w-4 h-4 fill-current shrink-0" />
                <span className="whitespace-nowrap">RESERVE ON WHATSAPP</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </a>

              <a
                href={OFFICIAL_INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto max-w-full inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-mono text-xs uppercase tracking-wider font-medium transition-all backdrop-blur-md shadow-md text-center overflow-hidden"
              >
                <Instagram className="w-4 h-4 text-[#E63946] shrink-0" />
                <span className="truncate max-w-[200px] sm:max-w-none">{OFFICIAL_INSTAGRAM_HANDLE}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70 shrink-0" />
              </a>
            </div>
          </div>
        </div>

        {/* Directory Card */}
        <div className="mt-8 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-6 border-b border-white/10">
            {/* Primary Studio Branch (Google Verified Location) */}
            <div className="md:col-span-6 space-y-2 text-xs font-mono text-white/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white font-semibold uppercase tracking-wider">
                  <MapPin className="w-4 h-4 text-[#C5A059]" />
                  <span>STUDIO BRANCH (TOLI CHOWKI)</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#107c41]/20 border border-[#107c41]/50 text-[#34A853] font-bold">
                  ★ 4.4 (137 GOOGLE REVIEWS)
                </span>
              </div>
              <p className="font-sans text-sm text-white/90 leading-relaxed font-medium">
                {OFFICIAL_STUDIO_LOCATION.address}
              </p>
              <div className="text-[11px] text-[#C5A059] flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 font-mono">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
                  <span>{OFFICIAL_STUDIO_LOCATION.hours}</span>
                </span>
                <span>•</span>
                <a
                  href={`tel:${OFFICIAL_GOOGLE_PHONE.replace(/\s+/g, '')}`}
                  className="hover:text-white transition-colors"
                >
                  Landline/Helpline: {OFFICIAL_GOOGLE_PHONE}
                </a>
              </div>
            </div>

            {/* Registered Corporate Headquarters & Direct Booking */}
            <div className="md:col-span-6 space-y-2 text-xs font-mono text-white/80">
              <div className="flex items-center gap-2 text-white font-semibold uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-[#C5A059]" />
                <span>REGISTERED HEADQUARTERS &amp; BOOKINGS</span>
              </div>
              <p className="font-sans text-xs text-white/75 leading-relaxed">
                {OFFICIAL_ADDRESS}
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 font-sans text-sm pt-1">
                <a href={`tel:${OFFICIAL_PHONE}`} className="text-white hover:text-[#C5A059] transition-colors font-medium flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{OFFICIAL_PHONE}</span>
                </a>
                <span className="text-white/40 hidden sm:inline">•</span>
                <a href={`mailto:${OFFICIAL_EMAIL}`} className="text-white/80 hover:text-white transition-colors">
                  {OFFICIAL_EMAIL}
                </a>
              </div>
              <p className="text-[11px] text-white/60 font-sans">
                Available across Hyderabad, Telangana, Andhra Pradesh, and royal destination weddings.
              </p>
            </div>
          </div>

          {/* Government of Telangana Registration Authentication Strip */}
          <div className="p-4 rounded-xl bg-white/[0.04] border border-[#C5A059]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#107c41]/20 border border-[#107c41]/50 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#34A853]" />
              </div>
              <div className="space-y-0.5 text-xs font-mono">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-white uppercase">GOVERNMENT OF TELANGANA</span>
                  <span className="text-white/40">•</span>
                  <span className="text-[#34A853] font-semibold">LABOUR DEPARTMENT REGISTERED</span>
                </div>
                <div className="text-white/70 text-[11px] flex flex-wrap items-center gap-x-2">
                  <span>Reg. No: <strong className="text-white font-mono">{OFFICIAL_REGISTRATION.regNo}</strong></span>
                  <span className="text-white/30">•</span>
                  <span>Employer: <strong className="text-white font-mono">{OFFICIAL_REGISTRATION.employerName}</strong></span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-stretch sm:self-auto shrink-0">
              <button
                type="button"
                onClick={() => setIsCertModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#C5A059]/15 hover:bg-[#C5A059]/25 border border-[#C5A059]/40 text-[#E6B85C] text-xs font-mono font-medium transition-all cursor-pointer"
              >
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>View Certificate</span>
              </button>

              <a
                href={OFFICIAL_REGISTRATION.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors"
                title="Verify at labour.telangana.gov.in"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Internal SEO Navigation Links */}
          <nav aria-label="Footer Quick Links" className="py-3 border-b border-white/10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono text-white/70">
            <a href="#about" className="hover:text-[#C5A059] transition-colors">About Us</a>
            <span className="text-white/20">•</span>
            <a href="#collection" className="hover:text-[#C5A059] transition-colors">Our Collection</a>
            <span className="text-white/20">•</span>
            <a href="#appointment" className="hover:text-[#C5A059] transition-colors">Book Appointment</a>
            <span className="text-white/20">•</span>
            <a href="#faq" className="hover:text-[#C5A059] transition-colors">Bridal FAQ &amp; Guide</a>
            <span className="text-white/20">•</span>
            <a href="https://www.instagram.com/shakeela__photography" target="_blank" rel="noreferrer" className="hover:text-[#C5A059] transition-colors">
              Instagram @shakeela__photography
            </a>
          </nav>

          {/* Copyright & Accolades */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-white/55">
            <div>
              © 2000–2026 SHAKEELA PHOTOGRAPHY · SYEDA SHAKILA QAZI · ALL RIGHTS RESERVED
            </div>
            <div className="flex items-center gap-3">
              <span>HYDERABAD, INDIA</span>
              <span>·</span>
              <span className="text-[#C5A059] font-medium">{OFFICIAL_STATS.followers} INSTAGRAM FOLLOWERS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Certificate Modal */}
      <RegistrationCertificateModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
      />
    </footer>
  );
};
