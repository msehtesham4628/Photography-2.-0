import React, { useState } from 'react';
import { EventStory } from '../types';
import { X, Play, MapPin, Calendar, Folder, CheckCircle, ExternalLink, Film, Camera } from 'lucide-react';

interface EventGalleryModalProps {
  event: EventStory;
  onClose: () => void;
  onBookClick: () => void;
}

export const EventGalleryModal: React.FC<EventGalleryModalProps> = ({
  event,
  onClose,
  onBookClick
}) => {
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-6 overflow-y-auto animate-in fade-in duration-300">
      <div className="relative w-full max-w-5xl bg-[#FAF8F5] text-[#141312] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto border border-[#D5C7B7]">
        {/* Modal Top Header Bar */}
        <div className="p-4 sm:p-6 border-b border-[#E3D9CD] flex items-center justify-between bg-[#F4EFEA]">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 rounded-full bg-[#141312] text-[#FAF8F5] text-[10px] font-mono uppercase tracking-widest">
              {event.category}
            </span>
            <span className="text-xs text-[#7A746E] hidden sm:inline">• {event.date}</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#EAE2D7] text-[#141312] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Event Body */}
        <div className="p-6 sm:p-10 space-y-8 max-h-[80vh] overflow-y-auto">
          {/* Cover & Title Block */}
          <div>
            <span className="text-xs font-mono tracking-[0.25em] text-[#997328] uppercase block mb-1">
              EVENT STORY GALLERY
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif tracking-wide uppercase text-[#141312]">
              {event.name}
            </h2>
            {event.couple && (
              <p className="text-lg font-serif italic text-[#7A7168] mt-1">
                Featuring {event.couple}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-[#6A625A]">
              <div className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#997328]" />
                <span>{event.venue}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#997328]" />
                <span>{event.date}</span>
              </div>
              {event.driveFolder && (
                <div className="flex items-center space-x-1.5 text-[#997328] font-mono">
                  <Folder className="w-3.5 h-3.5" />
                  <span>Drive: {event.driveFolder}</span>
                </div>
              )}
            </div>
          </div>

          {/* Cinematic Highlight Film */}
          <div className="relative aspect-16/9 rounded-2xl overflow-hidden shadow-xl border border-[#D5C7B7] bg-black">
            <video
              controls
              playsInline
              preload="metadata"
              poster={event.coverPhoto}
              className="w-full h-full object-cover"
            >
              <source src={event.filmUrl} type="video/mp4" />
            </video>
          </div>

          {/* Story Narrative & Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl bg-[#F4EFEA] border border-[#E3D9CD]">
            <div className="md:col-span-2 space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#7A7168]">
                NARRATIVE SUMMARY
              </h3>
              <p className="text-sm text-[#4A433D] font-light leading-relaxed">
                {event.description}
              </p>
              {event.quote && (
                <blockquote className="text-sm font-serif italic text-[#997328] border-l-2 border-[#997328] pl-4 py-1 mt-2">
                  "{event.quote}"
                </blockquote>
              )}
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#7A7168]">
                DELIVERABLE HIGHLIGHTS
              </h3>
              <ul className="space-y-2">
                {event.highlights.map((h, i) => (
                  <li key={i} className="flex items-start space-x-2 text-xs text-[#524B44]">
                    <CheckCircle className="w-3.5 h-3.5 text-[#997328] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Full High-Resolution Event Photo Gallery */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-mono tracking-wider uppercase text-[#7A7168]">
                <Camera className="w-3.5 h-3.5 text-[#997328]" />
                <span>HEIRLOOM PHOTOGRAPHY ARCHIVE ({event.photos.length} MASTER FRAMES)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {event.photos.map((photoUrl, idx) => (
                <div
                  key={idx}
                  onClick={() => setActivePhoto(photoUrl)}
                  className="group relative aspect-4/3 rounded-xl overflow-hidden border border-[#D5C7B7] bg-[#EAE2D7] cursor-pointer shadow-sm hover:shadow-md transition-all"
                >
                  <img
                    src={photoUrl}
                    alt={`${event.name} Frame ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1 rounded-full bg-white/90 text-black text-xs font-mono">
                      VIEW FULL RESOLUTION
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action CTA */}
          <div className="p-6 rounded-2xl bg-[#141312] text-[#FAF8F5] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-serif text-lg uppercase tracking-wide">
                Enamored by this story?
              </h4>
              <p className="text-xs text-[#D5C7B7] font-light mt-0.5">
                Let Shakeela Photography choreograph the timeless visual legacy of your own date.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onBookClick();
              }}
              className="px-6 py-2.5 rounded-full bg-[#FAF8F5] text-[#141312] text-xs font-semibold tracking-widest uppercase hover:bg-[#997328] hover:text-white transition-colors shrink-0 shadow-md"
            >
              BOOK YOUR DATE
            </button>
          </div>
        </div>
      </div>

      {/* Full Resolution Photo Lightbox Overlay */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/95 p-4"
          onClick={() => setActivePhoto(null)}
        >
          <button
            onClick={() => setActivePhoto(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/20 text-white hover:bg-white/40"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={activePhoto}
            alt="Expanded view"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />
        </div>
      )}
    </div>
  );
};
