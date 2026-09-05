import React from 'react';
import { Award, Camera, Video, Film, CheckCircle2, HeartHandshake, Sparkles, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

interface AboutSectionProps {
  onBookClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onBookClick }) => {
  const pillars = [
    {
      title: '20+ Years Experience',
      desc: 'Two decades of documenting royal Nizami weddings, multicultural celebrations, and heirloom legacies across India.',
      icon: Award
    },
    {
      title: 'Timeless Photography',
      desc: 'Natural skin tones, authentic ambient light, and unforced moments that remain elegant fifty years from today.',
      icon: Camera
    },
    {
      title: 'Cinematography',
      desc: 'Colour-graded 4K anamorphic cinema lenses paired with bespoke sound design and evocative storytelling.',
      icon: Film
    },
    {
      title: 'Discreet Emotion',
      desc: 'We merge into your family’s circle with warmth, documenting raw tears, quiet whispers, and grand jubilation.',
      icon: HeartHandshake
    }
  ];

  const services = [
    'Wedding Photography',
    'Wedding Videography',
    'Candid Photography',
    'Cinematography',
    'Pre-Wedding Photography',
    'Engagement Photography',
    'Reception Photography',
    'Event Photography',
    'All Types of Functions'
  ];

  return (
    <section
      id="about-section"
      className="relative w-full py-24 sm:py-32 bg-[#FAF8F5] text-[#141312] overflow-hidden border-b border-[#EAE2D7]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Top Eyebrow */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-10 border-b border-[#E3D9CD] mb-16 gap-4">
          <div className="flex items-center space-x-3">
            <span className="text-xs uppercase font-serif tracking-[0.25em] text-[#857B72]">
              ESTABLISHED IN HYDERABAD
            </span>
            <span className="w-8 h-[1px] bg-[#997328]" />
            <span className="text-xs font-mono text-[#997328]">1999 — PRESENT</span>
          </div>

          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-[#D5C7B7] bg-[#F4EFEA] text-xs text-[#4A433D] font-medium tracking-wider">
            <Award className="w-3.5 h-3.5 text-[#997328]" />
            <span>Best Female Photographer of the Year</span>
          </div>
        </div>

        {/* Hero Narrative Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Headline & Big Quote */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-mono tracking-[0.3em] text-[#997328] uppercase block">
                ABOUT SHAKEELA PHOTOGRAPHY
              </span>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-[0.06em] uppercase text-[#141312] leading-[1.05]">
                20+ YEARS OF CAPTURING STORIES
              </h2>
            </div>

            <p className="text-lg sm:text-xl text-[#3D3732] font-light leading-relaxed font-serif border-l-2 border-[#997328] pl-6 py-1">
              "With more than 20 years of experience, Shakeela Photography captures weddings, celebrations and special moments through timeless photography and cinematic films."
            </p>

            <p className="text-sm sm:text-base text-[#615850] font-light leading-relaxed">
              Based in the historic cultural heart of Toli Chowki, Hyderabad, Shakeela Photography represents a legacy of feminine sensitivity, technical mastery, and artistic poise. Recognized as the Best Female Photographer of the Year, Shakeela and her master cinematography crew bring an elevated, editorial eye to every sacred ceremony.
            </p>

            {/* Services Grid with Custom Ticks */}
            <div className="pt-4">
              <h4 className="text-xs font-serif uppercase tracking-[0.2em] text-[#7A7168] mb-4">
                SPECIALIZED DISCIPLINES & SERVICES
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {services.map((svc) => (
                  <div
                    key={svc}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-[#F4EFE9]/80 border border-[#E8DFD3] text-xs text-[#2E2925] font-medium hover:border-[#997328] transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#997328] shrink-0" />
                    <span className="truncate">{svc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Action */}
            <div className="pt-2 flex items-center space-x-4">
              <button
                onClick={onBookClick}
                className="px-6 py-3 rounded-full bg-[#141312] text-[#FAF8F5] text-xs font-serif tracking-[0.18em] uppercase hover:bg-[#997328] transition-all shadow-md active:scale-95"
              >
                SCHEDULE CONSULTATION
              </button>
              <div className="flex items-center space-x-1.5 text-xs text-[#7A7168]">
                <MapPin className="w-3.5 h-3.5 text-[#997328]" />
                <span>Toli Chowki, Hyderabad</span>
              </div>
            </div>
          </div>

          {/* Right Column: Layered Editorial Photographic Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Heritage Portrait */}
              <div className="aspect-3/4 rounded-2xl overflow-hidden shadow-2xl border border-white relative z-10 bg-[#E8DFD3]">
                <img
                  src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=1200&q=85"
                  alt="Shakeela Photography Editorial Bridal Portrait"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[10px] uppercase font-mono tracking-widest block opacity-80">
                    AWARDED DISTINCTION
                  </span>
                  <p className="font-serif text-lg tracking-wide">
                    Best Female Photographer of the Year
                  </p>
                </div>
              </div>

              {/* Overlapping Secondary Detail Frame */}
              <div className="hidden sm:block absolute -bottom-8 -left-10 w-48 aspect-square rounded-xl overflow-hidden shadow-xl border-2 border-white z-20 bg-[#F4EFE9]">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80"
                  alt="Intricate bridal details"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Experience Stamp */}
              <div className="absolute -top-6 -right-6 z-20 w-28 h-28 rounded-full bg-[#141312] text-[#FAF8F5] p-3 flex flex-col items-center justify-center text-center shadow-2xl border-2 border-[#E8DFD3]">
                <span className="text-2xl font-serif font-bold text-[#C5A059]">20+</span>
                <span className="text-[9px] uppercase tracking-widest font-sans">
                  YEARS OF STORIES
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Four Architectural Pillars (Non-boring layout) */}
        <div className="mt-24 pt-16 border-t border-[#E3D9CD] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group relative p-6 rounded-2xl bg-[#F7F2EB]/70 border border-[#E3D9CD] hover:border-[#997328] hover:bg-[#FAF8F5] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#D5C7B7] flex items-center justify-center mb-5 text-[#997328] group-hover:bg-[#141312] group-hover:text-[#FAF8F5] transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-[#8C8379] tracking-widest block mb-1">
                  0{idx + 1}
                </span>
                <h3 className="text-lg font-serif tracking-wide text-[#141312] uppercase mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#6A625A] font-light leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
