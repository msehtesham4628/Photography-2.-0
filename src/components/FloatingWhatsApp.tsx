import React, { useState } from 'react';
import { MessageCircle, ChevronUp, X, Sparkles, PhoneCall } from 'lucide-react';
import {
  OFFICIAL_PHONE,
  OFFICIAL_PHONE_ALT,
  OFFICIAL_PHONE_RAW
} from '../data/instagramData';

export const FloatingWhatsApp: React.FC = () => {
  const [showNumbers, setShowNumbers] = useState(false);

  const primaryPhone = OFFICIAL_PHONE_RAW; // 9347307151
  const secondaryPhone = '919390489371';
  const defaultMessage = encodeURIComponent(
    'Hello Syeda Shakila Qazi, I would like to inquire about royal wedding photography & videography availability.'
  );

  const primaryUrl = `https://wa.me/91${primaryPhone}?text=${defaultMessage}`;
  const secondaryUrl = `https://wa.me/${secondaryPhone}?text=${defaultMessage}`;

  return (
    <div
      id="floating-whatsapp"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end space-y-2 max-w-[calc(100vw-2rem)]"
    >
      {/* Secondary Popup Menu with Studio Numbers */}
      {showNumbers && (
        <div className="bg-[#141210] border border-[#C5A059]/40 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.9)] mb-2 w-72 max-w-[calc(100vw-2.5rem)] backdrop-blur-xl animate-in slide-in-from-bottom-3 duration-200 text-white">
          <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#25D366]" />
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-[#E6B85C] font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#C5A059]" />
                <span>Chat with Studio</span>
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowNumbers(false)}
              className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close WhatsApp options"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[12px] text-white/75 my-2.5 leading-relaxed font-sans">
            Connect directly with Syeda Shakila Qazi's team for dates, cinematography packages &amp; bridal styling.
          </p>

          <div className="space-y-2">
            <a
              href={primaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#25D366] text-[#0A2614] hover:bg-[#20bd5a] transition-all text-xs font-mono font-bold shadow-md"
            >
              <div className="flex items-center space-x-2 truncate">
                <MessageCircle className="w-4 h-4 fill-current shrink-0" />
                <span className="truncate">Primary: {OFFICIAL_PHONE}</span>
              </div>
            </a>

            <a
              href={secondaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 border border-white/20 transition-all text-xs font-mono font-medium"
            >
              <div className="flex items-center space-x-2 truncate">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <span className="truncate">Desk: {OFFICIAL_PHONE_ALT}</span>
              </div>
            </a>

            <a
              href={`tel:${OFFICIAL_PHONE.replace(/\s+/g, '')}`}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-black/40 text-white/70 hover:text-white border border-white/10 transition-all text-[11px] font-mono"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Or Direct Call: {OFFICIAL_PHONE}</span>
            </a>
          </div>
        </div>
      )}

      {/* Main Floating Pill Button */}
      <div className="flex items-center shadow-[0_10px_30px_rgba(0,0,0,0.7)] rounded-full border border-white/15 backdrop-blur-md group hover:border-[#C5A059]/60 transition-all">
        <a
          href={primaryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 px-4 sm:px-5 py-3 rounded-l-full rounded-r-none bg-[#25D366] hover:bg-[#20bd5a] text-[#0A2614] text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 shadow-md"
          title="Chat with Syeda Shakila Qazi on WhatsApp"
        >
          <span className="relative flex h-4 w-4">
            <MessageCircle className="w-4 h-4 fill-current animate-bounce duration-1000" />
          </span>
          <span className="whitespace-nowrap text-[11px] sm:text-xs">
            CHAT ON WHATSAPP
          </span>
        </a>

        <button
          type="button"
          onClick={() => setShowNumbers(!showNumbers)}
          className="px-2.5 sm:px-3 py-3 rounded-r-full bg-[#1da851] hover:bg-[#199246] text-white transition-colors border-l border-white/20 cursor-pointer"
          title="More WhatsApp contacts"
          aria-label="Choose WhatsApp contact"
        >
          <ChevronUp
            className={`w-4 h-4 transition-transform duration-300 ${
              showNumbers ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>
    </div>
  );
};
