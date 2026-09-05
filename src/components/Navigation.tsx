import React, { useState, useEffect } from 'react';
import { Menu, X, Volume2, VolumeX, Calendar, Phone, ArrowUpRight } from 'lucide-react';
import { cinematicAudio } from '../utils/audio';

interface NavigationProps {
  onBookClick: () => void;
  onOpenDriveManager: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onBookClick, onOpenDriveManager }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const playing = cinematicAudio.toggle();
    setIsAudioPlaying(playing);
  };

  const navLinks = [
    { label: 'HOME', href: '#opening-hero' },
    { label: 'STORIES', href: '#cinematic-story' },
    { label: 'ABOUT', href: '#about-section' },
    { label: 'PHOTOGRAPHY', href: '#photography-showcase' },
    { label: 'FILMS', href: '#videography-section' },
    { label: 'EVENTS', href: '#event-stories' },
    { label: 'INSTAGRAM', href: '#instagram-section' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        id="main-navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#FAF8F5]/90 backdrop-blur-md shadow-xs py-3 border-b border-[#EAE2D7]/80'
            : 'bg-gradient-to-b from-[#FAF8F5]/80 via-[#FAF8F5]/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <a
              href="#opening-hero"
              onClick={(e) => handleLinkClick(e, '#opening-hero')}
              className="flex flex-col group text-left"
            >
              <span className="font-serif tracking-[0.25em] text-lg sm:text-xl font-bold text-[#141312] uppercase group-hover:text-[#997328] transition-colors">
                SHAKEELA
              </span>
              <span className="text-[9px] tracking-[0.35em] text-[#7A746E] uppercase font-sans font-medium">
                PHOTOGRAPHY • HYDERABAD
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-xs tracking-[0.2em] font-medium text-[#2C2926] hover:text-[#997328] transition-colors uppercase relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#997328] hover:after:w-full after:transition-all after:duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right Action Cluster */}
            <div className="hidden sm:flex items-center space-x-4">
              {/* Ambient Audio Toggle */}
              <button
                onClick={toggleSound}
                title={isAudioPlaying ? 'Mute Cinema Sound' : 'Play Cinema Ambient Sound'}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-[#DCD3C7] bg-[#F4EFEA]/80 text-[#3A3531] hover:border-[#997328] hover:text-[#997328] transition-all text-xs tracking-wider font-medium"
              >
                {isAudioPlaying ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-[#997328] animate-pulse" />
                    <span className="text-[11px] font-sans">SOUND ON</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-[#7A746E]" />
                    <span className="text-[11px] font-sans text-[#7A746E]">SOUND OFF</span>
                  </>
                )}
              </button>

              {/* Drive Admin Badge */}
              <button
                onClick={onOpenDriveManager}
                title="Google Drive Event Manager"
                className="hidden xl:inline-flex items-center text-[10px] tracking-wider uppercase px-2.5 py-1 rounded border border-dashed border-[#C5B49F] text-[#6A625A] hover:bg-[#EFE9DF] transition-colors"
              >
                Drive CMS
              </button>

              {/* Book CTA */}
              <button
                onClick={onBookClick}
                className="inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-[#141312] text-[#FAF8F5] text-xs font-medium tracking-[0.15em] uppercase hover:bg-[#997328] hover:shadow-md transition-all active:scale-95"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>BOOK YOUR DATE</span>
              </button>
            </div>

            {/* Mobile Action & Hamburger */}
            <div className="flex items-center space-x-3 lg:hidden">
              <button
                onClick={toggleSound}
                className="p-2 rounded-full text-[#3A3531] border border-[#DCD3C7]"
                aria-label="Toggle Sound"
              >
                {isAudioPlaying ? (
                  <Volume2 className="w-4 h-4 text-[#997328]" />
                ) : (
                  <VolumeX className="w-4 h-4 text-[#7A746E]" />
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#141312] focus:outline-hidden"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF8F5] border-b border-[#E8DFD3] px-6 pt-4 pb-8 space-y-4 shadow-xl animate-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col space-y-3 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-sm tracking-[0.2em] font-medium text-[#141312] hover:text-[#997328] py-2 border-b border-[#F0EAE1]"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-3 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookClick();
                }}
                className="w-full py-3 rounded-full bg-[#141312] text-[#FAF8F5] text-xs font-medium tracking-[0.2em] uppercase flex items-center justify-center space-x-2 shadow-md hover:bg-[#997328] transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>BOOK YOUR DATE</span>
              </button>

              <a
                href="tel:+919347307151"
                className="w-full py-2.5 rounded-full border border-[#DCD3C7] text-[#141312] text-xs font-medium tracking-[0.15em] uppercase flex items-center justify-center space-x-2 bg-[#F5EFE7]"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>+91 93473 07151</span>
              </a>

              <div className="pt-2 flex justify-between items-center text-xs text-[#7A746E]">
                <span>Shakeela Photography, Hyderabad</span>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDriveManager();
                  }}
                  className="underline text-[11px] text-[#997328]"
                >
                  Drive Event CMS
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
