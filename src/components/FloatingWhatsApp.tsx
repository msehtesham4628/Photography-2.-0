import React, { useState } from 'react';
import { MessageCircle, Phone, ChevronUp, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showNumbers, setShowNumbers] = useState(false);

  const primaryPhone = '919347307151';
  const secondaryPhone = '919390489371';
  const defaultMessage = encodeURIComponent(
    'Hello Shakeela Photography, I would like to enquire about photography and videography services.'
  );

  const primaryUrl = `https://wa.me/${primaryPhone}?text=${defaultMessage}`;
  const secondaryUrl = `https://wa.me/${secondaryPhone}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-2">
      {/* Secondary popup options */}
      {showNumbers && (
        <div className="bg-[#FFFFFF] border border-[#E8DFD3] rounded-2xl p-4 shadow-2xl mb-2 w-72 backdrop-blur-md animate-in slide-in-from-bottom-3 duration-300">
          <div className="flex items-center justify-between pb-2 border-b border-[#F0EAE1]">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#141312]">
                Chat on WhatsApp
              </span>
            </div>
            <button
              onClick={() => setShowNumbers(false)}
              className="text-[#7A746E] hover:text-[#141312] p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[12px] text-[#6A625A] my-2.5 leading-relaxed">
            Connect instantly with Shakeela Photography studio desk for date availability & bespoke wedding film packages.
          </p>

          <div className="space-y-2">
            <a
              href={primaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#25D366] text-white hover:bg-[#20ba59] transition-all text-xs font-medium shadow-xs"
            >
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Primary: +91 93473 07151</span>
              </div>
            </a>

            <a
              href={secondaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#F4EFEA] text-[#141312] hover:bg-[#EAE2D7] transition-all text-xs font-medium border border-[#DCD3C7]"
            >
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Secondary: +91 93904 89371</span>
              </div>
            </a>
          </div>
        </div>
      )}

      {/* Main Floating Pill Button */}
      <div className="flex items-center shadow-2xl rounded-full group">
        <a
          href={primaryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2.5 px-4 sm:px-5 py-3 rounded-l-full rounded-r-none bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-semibold tracking-wider transition-all duration-300 shadow-md group-hover:shadow-lg"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-white text-white animate-bounce duration-1000" />
          <span className="whitespace-nowrap font-sans uppercase text-[11px] sm:text-xs tracking-[0.12em]">
            CHAT ON WHATSAPP
          </span>
        </a>

        <button
          onClick={() => setShowNumbers(!showNumbers)}
          className="px-2.5 py-3 rounded-r-full bg-[#1da851] text-white hover:bg-[#199246] transition-colors border-l border-white/20"
          title="More WhatsApp options"
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
