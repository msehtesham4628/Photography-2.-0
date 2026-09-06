import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, MessageCircle, Calendar, ArrowUpRight } from 'lucide-react';
import { OFFICIAL_PHONE } from '../data/instagramData';

interface NavigationProps {
  onNavigate: (sectionId: string) => void;
  currentSection?: string;
}

export const Navigation: React.FC<NavigationProps> = ({ onNavigate, currentSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'about', label: 'About Us' },
    { id: 'collection', label: 'Our Collection' },
    { id: 'appointment', label: 'Book Appointment' }
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#070605]/90 backdrop-blur-xl border-b border-white/15 py-3 shadow-2xl'
            : 'bg-gradient-to-b from-[#070605]/95 via-[#070605]/60 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Identity */}
          <button
            type="button"
            onClick={() => handleNavClick('about')}
            className="flex flex-col text-left group cursor-pointer"
          >
            <span className="font-serif tracking-[0.22em] text-lg sm:text-xl font-medium text-white group-hover:text-[#C5A059] transition-colors">
              SHAKEELA PHOTOGRAPHY
            </span>
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#C5A059] uppercase">
              SYEDA SHAKILA QAZI · HYDERABAD
            </span>
          </button>

          {/* Nav Items (Requested: About Us, Our Collection, Book Appointment) */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`text-xs font-mono uppercase tracking-[0.2em] transition-all py-1 cursor-pointer relative ${
                    isActive
                      ? 'text-[#C5A059] font-semibold'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#C5A059] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              type="button"
              onClick={() => handleNavClick('appointment')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C5A059] hover:bg-[#b08e4d] text-[#070605] font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-lg hover:scale-[1.02] cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>BOOK NOW</span>
            </button>

            <a
              href={`https://wa.me/919347307151?text=${encodeURIComponent(
                'Hello Syeda Shakila Qazi, I am inquiring about booking a wedding photography consultation.'
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-[#25D366] text-xs font-mono tracking-wider transition-all backdrop-blur-md"
              title="WhatsApp Consultation"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span className="hidden lg:inline">WHATSAPP</span>
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden px-5 pt-4 pb-6 bg-[#0e0c0b]/98 backdrop-blur-2xl border-b border-white/15 space-y-3 mt-3 animate-in fade-in slide-in-from-top-4 duration-200">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className="w-full text-left py-3 px-4 rounded-xl hover:bg-white/10 text-white font-mono text-sm uppercase tracking-wider transition-colors flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="text-xs text-[#C5A059]">→</span>
              </button>
            ))}

            <div className="pt-3 border-t border-white/10 space-y-2">
              <button
                type="button"
                onClick={() => handleNavClick('appointment')}
                className="w-full py-3.5 rounded-xl bg-[#C5A059] text-black font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>BOOK APPOINTMENT</span>
              </button>

              <a
                href={`https://wa.me/919347307151?text=${encodeURIComponent(
                  'Hello Syeda Shakila Qazi, I am inquiring from your mobile website.'
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-xl bg-white/10 border border-white/20 text-white font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] fill-current" />
                <span>WHATSAPP {OFFICIAL_PHONE}</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
