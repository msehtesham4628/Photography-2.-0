import React, { useRef } from 'react';
import {
  Calendar,
  MessageCircle,
  Phone,
  Mail,
  Instagram,
  MapPin,
  Award,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { motion } from 'motion/react';

interface FinalHeroProps {
  onBookClick: () => void;
}

export const FinalHero: React.FC<FinalHeroProps> = ({ onBookClick }) => {
  const primaryPhone = '+91 93473 07151';
  const secondaryPhone = '+91 93904 89371';
  const email = 'info@ShakeelaPhotography.in';
  const address = 'Janaki Nagar Colony, Toli Chowki, Hyderabad, Telangana 500008, India';

  const defaultWhatsappMsg = encodeURIComponent(
    'Hello Shakeela Photography, I would like to enquire about photography and videography services.'
  );
  const whatsappUrl = `https://wa.me/919347307151?text=${defaultWhatsappMsg}`;
  const instagramUrl = 'https://www.instagram.com/shakeelaphotography';
  const googleMapsUrl = 'https://maps.google.com/?q=Shakeela+Photography+Janaki+Nagar+Colony+Toli+Chowki+Hyderabad+Telangana+500008';

  return (
    <section
      id="final-hero"
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#FAF8F5] text-[#141312] border-t border-[#EAE2D7]"
    >
      {/* Background Cinematic Visual with Light Editorial Champagne Overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=2000&q=85"
          alt="Shakeela Photography Final Grand Royal Wedding"
          className="w-full h-full object-cover object-center scale-105 opacity-30 mix-blend-multiply"
        />
        {/* Luxury Light Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/90 via-[#FAF8F5]/70 to-[#FAF8F5]/95" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#FAF8F5]/50 to-[#FAF8F5]/95" />
      </div>

      {/* Top Experience Pill */}
      <div className="relative z-10 pt-16 sm:pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-[#C5B49F] bg-[#FAF8F5]/90 backdrop-blur-md shadow-xs mb-4">
          <Award className="w-4 h-4 text-[#997328]" />
          <span className="text-xs sm:text-sm font-serif font-semibold tracking-[0.25em] text-[#2C2723] uppercase">
            20+ YEARS OF CAPTURING STORIES
          </span>
        </div>
      </div>

      {/* Center Cinematic Climax Headline Block */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-10 sm:py-14">
        <div className="space-y-2 sm:space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-normal tracking-[0.08em] uppercase text-[#141312] leading-[0.95]"
          >
            YOUR MOMENT.
          </motion.h2>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-normal tracking-[0.08em] uppercase text-[#7A6A58] leading-[0.95]"
          >
            YOUR STORY.
          </motion.h2>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-normal tracking-[0.08em] uppercase text-[#997328] italic leading-[0.95]"
          >
            YOUR FILM.
          </motion.h2>
        </div>

        {/* Supporting Line */}
        <p className="mt-8 text-base sm:text-xl md:text-2xl text-[#3D3732] font-serif italic max-w-2xl mx-auto font-light">
          "Let's create memories that last forever."
        </p>

        {/* Studio Identity Block */}
        <div className="mt-10 pt-10 border-t border-[#E3D9CD] max-w-3xl mx-auto space-y-3">
          <h3 className="text-2xl sm:text-3xl font-serif tracking-[0.2em] uppercase text-[#141312] font-bold">
            SHAKEELA PHOTOGRAPHY
          </h3>
          <p className="text-xs sm:text-sm text-[#7A746E] uppercase font-mono tracking-widest">
            Janaki Nagar Colony, Toli Chowki, Hyderabad, Telangana 500008, India
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-2 text-xs sm:text-sm font-medium text-[#2E2A27]">
            <a href="tel:+919347307151" className="hover:text-[#997328] transition-colors">
              +91 93473 07151
            </a>
            <span className="text-[#C5B49F]">•</span>
            <a href="tel:+919390489371" className="hover:text-[#997328] transition-colors">
              +91 93904 89371
            </a>
            <span className="text-[#C5B49F]">•</span>
            <a href="mailto:info@ShakeelaPhotography.in" className="hover:text-[#997328] transition-colors">
              info@ShakeelaPhotography.in
            </a>
          </div>
        </div>

        {/* Action Buttons Cluster: BOOK YOUR DATE, WHATSAPP US, CALL US, EMAIL US, INSTAGRAM, GOOGLE MAPS */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
          {/* 1. BOOK YOUR DATE */}
          <button
            onClick={onBookClick}
            className="px-6 sm:px-8 py-3.5 rounded-full bg-[#141312] text-[#FAF8F5] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#997328] transition-all duration-300 shadow-xl active:scale-95 flex items-center space-x-2"
          >
            <Calendar className="w-4 h-4 text-[#C5A059]" />
            <span>BOOK YOUR DATE</span>
          </button>

          {/* 2. WHATSAPP US */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-full bg-[#25D366] text-white text-xs font-semibold tracking-[0.18em] uppercase hover:bg-[#20ba59] transition-all shadow-md active:scale-95 flex items-center space-x-2"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>WHATSAPP US</span>
          </a>

          {/* 3. CALL US */}
          <a
            href="tel:+919347307151"
            className="px-5 py-3.5 rounded-full border border-[#D5C7B7] bg-[#FAF8F5] text-[#141312] text-xs font-medium tracking-[0.15em] uppercase hover:bg-[#EAE2D7] transition-all flex items-center space-x-2 shadow-xs"
          >
            <Phone className="w-4 h-4 text-[#997328]" />
            <span>CALL US</span>
          </a>

          {/* 4. EMAIL US */}
          <a
            href="mailto:info@ShakeelaPhotography.in"
            className="px-5 py-3.5 rounded-full border border-[#D5C7B7] bg-[#FAF8F5] text-[#141312] text-xs font-medium tracking-[0.15em] uppercase hover:bg-[#EAE2D7] transition-all flex items-center space-x-2 shadow-xs"
          >
            <Mail className="w-4 h-4 text-[#997328]" />
            <span>EMAIL US</span>
          </a>

          {/* 5. INSTAGRAM */}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3.5 rounded-full border border-[#D5C7B7] bg-[#FAF8F5] text-[#141312] text-xs font-medium tracking-[0.15em] uppercase hover:bg-[#EAE2D7] transition-all flex items-center space-x-2 shadow-xs"
          >
            <Instagram className="w-4 h-4 text-[#997328]" />
            <span>INSTAGRAM</span>
          </a>

          {/* 6. GOOGLE MAPS */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3.5 rounded-full border border-[#D5C7B7] bg-[#FAF8F5] text-[#141312] text-xs font-medium tracking-[0.15em] uppercase hover:bg-[#EAE2D7] transition-all flex items-center space-x-2 shadow-xs"
          >
            <MapPin className="w-4 h-4 text-[#997328]" />
            <span>GOOGLE MAPS</span>
          </a>
        </div>
      </div>

      {/* ABSOLUTE END OF THE WEBSITE: Copyright Notice inside Final Hero */}
      <div className="relative z-10 w-full border-t border-[#E3D9CD] py-8 text-center bg-[#FAF8F5]/80 backdrop-blur-xs">
        <p className="text-xs tracking-[0.2em] font-serif text-[#6A625A] uppercase">
          © Shakeela Photography. All Rights Reserved.
        </p>
        <p className="text-[10px] font-mono text-[#8C8379] tracking-widest mt-1">
          HYDERABAD, TELANGANA • HTTPS://SHAKEELAPHOTOGRAPHY.IN
        </p>
      </div>
    </section>
  );
};
