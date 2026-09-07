import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  Sparkles,
  Camera,
  ShieldCheck,
  Award,
  Video,
  MapPin,
  Phone,
  MessageCircle,
  CheckCircle2
} from 'lucide-react';
import {
  OFFICIAL_PHOTOGRAPHER,
  OFFICIAL_TITLE,
  OFFICIAL_PHONE,
  OFFICIAL_REGISTRATION
} from '../data/instagramData';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
  keywords: string[];
}

const FAQ_DATA: FaqItem[] = [
  {
    category: 'Accreditation & Studio',
    question: 'Why is Shakeela Photography ranked the best wedding photographer in Hyderabad?',
    answer:
      'Led by Syeda Shakila Qazi, recipient of the prestigious "Best Female Photographer of the Year" award, Shakeela Photography has preserved royal Nizami weddings for over 24 years. With 155,000+ followers on Instagram and over 2,200 documented celebrations, our studio is celebrated for capturing heritage dignity, sacred Nikah emotion, and timeless cinematic aesthetics.',
    keywords: ['best wedding photographer in hyderabad', 'syeda shakila qazi', 'royal nizami weddings']
  },
  {
    category: 'Privacy & Culture',
    question: 'Do you provide a 100% all-female crew for Parda and private wedding functions?',
    answer:
      'Yes, absolutely. We honor sacred cultural and religious traditions. Shakeela Photography features a certified, full-time all-female crew of master photographers, cinematographers, and drone pilots for ladies-only functions, bridal makeup suites, and parda wedding ceremonies with complete confidentiality guaranteed.',
    keywords: ['female wedding photographer hyderabad', 'parda wedding photography', 'ladies only photography crew']
  },
  {
    category: 'Technology & Cinema',
    question: 'What cinema equipment, drone capabilities, and live screens do you deploy?',
    answer:
      'We shoot with cinema-grade Sony FX full-frame systems, high-speed prime lenses, 3-axis motorized gimbals, licensed 4K HDR drones, hydraulic jib cranes, and multi-camera live video mixing transmitted to high-definition outdoor LED display walls.',
    keywords: ['4k drone wedding cinema hyderabad', 'live led screen wedding hyderabad', 'cinematic wedding films']
  },
  {
    category: 'Booking & Timeline',
    question: 'How early should we reserve our wedding date with Syeda Shakila Qazi?',
    answer:
      'Due to our artisan policy of accepting a strictly limited number of weddings per season to maintain uncompromised directorial focus, couples typically reserve their auspicious dates 2 to 6 months in advance. You can instantly initiate your reservation on WhatsApp at +91 9347307151.',
    keywords: ['wedding photography booking hyderabad', 'wedding dates consultation', 'syeda shakila qazi booking']
  },
  {
    category: 'Destinations & Venues',
    question: 'Which venues across Hyderabad and destination locations do you cover?',
    answer:
      'We regularly cover weddings at premier Hyderabad royal venues including Taj Falaknuma Palace, Chowmahalla Palace, Golconda Resorts, Classic Convention Three, Novotel HICC, and destination weddings across Telangana, Andhra Pradesh, and internationally.',
    keywords: ['taj falaknuma palace wedding photography', 'chowmahalla palace wedding photography', 'destination wedding hyderabad']
  },
  {
    category: 'Legal Registration',
    question: 'Is Shakeela Photography an officially licensed and registered commercial establishment?',
    answer:
      'Yes. Shakeela Photography is officially registered with the Government of Telangana Labour Department under Registration Number SEA/HYD/ALO/19/1395837/2026 under the Telangana Shops & Establishments Act, 1988, with headquarters at Ali Nagar, East Bandlaguda, Mailardevpally, Circle 19, Hyderabad.',
    keywords: ['registered photography studio hyderabad', 'government of telangana shops act', 'official shakeela photography']
  }
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      className="relative w-full bg-[#090807] text-white py-24 sm:py-32 px-5 sm:px-10 lg:px-16 border-t border-white/10"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-[#C5A059]/40 text-[#E6B85C] text-xs font-mono uppercase tracking-[0.2em]">
              <HelpCircle className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>FREQUENTLY ASKED QUESTIONS · HYDERABAD BRIDAL GUIDE</span>
            </div>

            <h2
              id="faq-heading"
              className="font-serif text-3xl sm:text-5xl font-normal uppercase tracking-tight text-white"
            >
              Everything You Need To Know About <br />
              <span className="italic text-[#C5A059]">Royal Wedding Photography.</span>
            </h2>

            <p className="text-sm sm:text-base text-white/75 font-sans leading-relaxed">
              Explore essential details about our bespoke Nizami Nikah coverage, all-female parda crews, 4K drone cinematography, and official government registration.
            </p>
          </div>

          <div className="text-xs font-mono text-white/60 space-y-2 shrink-0">
            <div className="flex items-center gap-2 text-[#E6B85C]">
              <Award className="w-4 h-4 text-[#C5A059]" />
              <span className="font-semibold">{OFFICIAL_TITLE}</span>
            </div>
            <div>Syeda Shakila Qazi · 24+ Years Heritage</div>
          </div>
        </div>

        {/* 2-Column FAQ Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: FAQ Accordion */}
          <div className="lg:col-span-7 space-y-4">
            {FAQ_DATA.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={item.question}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-black/70 border-[#C5A059]/60 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
                      : 'bg-black/40 border-white/10 hover:border-white/20'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-widest block">
                        {item.category}
                      </span>
                      <h3 className="font-serif text-base sm:text-lg font-medium text-white leading-snug">
                        {item.question}
                      </h3>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen
                          ? 'bg-[#C5A059] text-black rotate-180'
                          : 'bg-white/10 text-white/70'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-sm font-sans text-white/80 leading-relaxed border-t border-white/10 space-y-3">
                      <p>{item.answer}</p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.keywords.map((kw) => (
                          <span
                            key={kw}
                            className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-white/50"
                          >
                            #{kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: SEO Trust Highlights & Direct Contact Card */}
          <div className="lg:col-span-5 space-y-5">
            {/* Quick Consultation CTA */}
            <div className="rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-[#C5A059]/40 p-6 sm:p-8 space-y-5 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#C5A059]/20 border border-[#C5A059]/50 flex items-center justify-center shrink-0">
                  <Sparkles className="w-6 h-6 text-[#C5A059]" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-white uppercase">
                    Have A Custom Query?
                  </h3>
                  <p className="text-xs text-white/70 font-mono pt-0.5">
                    Speak directly with our studio directors
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-white/80 font-sans leading-relaxed">
                Whether you're planning a multi-day Nikah at Falaknuma Palace or an intimate wedding ceremony in Hyderabad, we tailor our photography packages to your dream itinerary.
              </p>

              <div className="space-y-3 pt-2">
                <a
                  href={`https://wa.me/919347307151?text=${encodeURIComponent(
                    'Hello Syeda Shakila Qazi, I have a question regarding wedding photography & cinematography packages in Hyderabad!'
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#0A2614] font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-lg hover:scale-[1.01]"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>ASK US ON WHATSAPP (+91 9347307151)</span>
                </a>

                <a
                  href={`tel:${OFFICIAL_PHONE.replace(/\s+/g, '')}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs uppercase tracking-wider font-medium transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>CALL STUDIO DIRECTLY</span>
                </a>
              </div>
            </div>

            {/* Why Hyderabad Chooses Shakeela Photography */}
            <div className="rounded-3xl bg-black/60 border border-white/15 p-6 space-y-4 text-xs font-mono text-white/80">
              <div className="text-white font-bold uppercase tracking-wider flex items-center gap-2 text-sm">
                <ShieldCheck className="w-4 h-4 text-[#34A853]" />
                <span>HYDERABAD #1 WEDDING STUDIO TRUST</span>
              </div>

              <div className="space-y-2.5 divide-y divide-white/10">
                <div className="pt-2 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>24+ Years of continuous Royal Nizami wedding documentation.</span>
                </div>
                <div className="pt-2 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>155K+ Instagram followers trust our authentic wedding reels.</span>
                </div>
                <div className="pt-2 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>Official Government of Telangana registered establishment (Form-II).</span>
                </div>
                <div className="pt-2 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>100% Female crew available for strict parda wedding protocols.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
