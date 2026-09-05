import React, { useState } from 'react';
import { eventStoriesData } from '../data/eventsData';
import { EventStory } from '../types';
import { EventGalleryModal } from './EventGalleryModal';
import { Calendar, MapPin, Play, ArrowRight, Folder, HardDrive, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface EventStoriesSectionProps {
  onBookClick: () => void;
  onOpenDriveManager: () => void;
}

export const EventStoriesSection: React.FC<EventStoriesSectionProps> = ({
  onBookClick,
  onOpenDriveManager
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeEvent, setActiveEvent] = useState<EventStory | null>(null);

  const categories = ['ALL', 'WEDDINGS', 'PRE-WEDDINGS', 'ENGAGEMENTS', 'RECEPTIONS', 'EVENTS'];

  const filteredEvents = selectedCategory === 'ALL'
    ? eventStoriesData
    : eventStoriesData.filter((e) => e.category.toUpperCase() === selectedCategory);

  return (
    <section
      id="event-stories"
      className="relative w-full py-24 sm:py-32 bg-[#FAF8F5] text-[#141312] overflow-hidden border-b border-[#EAE2D7]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono tracking-[0.25em] text-[#997328] uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>EVENT-BASED CINEMATIC PORTFOLIO</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-[0.06em] uppercase text-[#141312] leading-[1.05]">
              EVENT STORIES.
              <span className="block text-[#997328] italic font-normal">COMPLETE ARCHIVES.</span>
            </h2>
          </div>

          {/* Drive CMS Management pill */}
          <div className="flex flex-col items-start md:items-end space-y-2">
            <p className="max-w-md text-xs sm:text-sm text-[#615850] font-light leading-relaxed md:text-right">
              Explore full event journals featuring cover films, ceremonies, and heirloom photography suites.
            </p>
            <button
              onClick={onOpenDriveManager}
              className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-dashed border-[#C5B49F] bg-[#F4EFEA] text-[11px] text-[#524B44] hover:bg-[#EAE2D7] transition-colors"
            >
              <HardDrive className="w-3.5 h-3.5 text-[#997328]" />
              <span>Manage via Google Drive (No Paid Server)</span>
            </button>
          </div>
        </div>

        {/* Category Selector Filter */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-serif tracking-wider uppercase transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#141312] text-[#FAF8F5] shadow-md scale-105'
                  : 'bg-[#F4EFEA] text-[#554E47] hover:bg-[#EAE2D7] border border-[#E0D6C8]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => setActiveEvent(event)}
              className="group cursor-pointer rounded-2xl overflow-hidden border border-[#D5C7B7] bg-[#F4EFEA] shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
            >
              {/* Media Preview Box (Cover Photo / Hover Video hint) */}
              <div className="relative aspect-16/10 overflow-hidden bg-black">
                <img
                  src={event.coverPhoto}
                  alt={event.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />

                {/* Category & Date Pill */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full bg-[#FAF8F5]/90 backdrop-blur-md text-[10px] font-mono uppercase tracking-widest text-[#141312]">
                    {event.category}
                  </span>
                </div>

                {/* Film Play Indicator */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#FAF8F5]/80 text-[#141312] group-hover:bg-[#997328] group-hover:text-white flex items-center justify-center shadow-lg transition-all transform group-hover:scale-110">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Bottom photo count badge */}
                <div className="absolute bottom-3 right-3 text-[10px] font-mono text-white/90 bg-black/50 px-2 py-0.5 rounded backdrop-blur-xs">
                  {event.photos.length} Photos + Film
                </div>
              </div>

              {/* Event Content Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-xs text-[#7A746E] mb-2 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-[#997328]" />
                    <span>{event.date}</span>
                    <span>•</span>
                    <span className="truncate">{event.venue}</span>
                  </div>

                  <h3 className="text-xl font-serif uppercase tracking-wide text-[#141312] group-hover:text-[#997328] transition-colors line-clamp-1">
                    {event.name}
                  </h3>

                  {event.couple && (
                    <p className="text-xs font-serif italic text-[#6A625A] mt-0.5">
                      {event.couple}
                    </p>
                  )}

                  <p className="text-xs text-[#615850] font-light leading-relaxed mt-2.5 line-clamp-2">
                    {event.description}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-[#E3D9CD] flex items-center justify-between">
                  <span className="text-xs font-serif uppercase tracking-wider text-[#141312] group-hover:text-[#997328] font-semibold flex items-center space-x-1">
                    <span>EXPLORE FULL GALLERY</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </span>

                  <span className="text-[10px] font-mono text-[#8C8379] truncate max-w-[120px]">
                    {event.driveFolder ? 'Drive Synced' : ''}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full Event Story Modal */}
      {activeEvent && (
        <EventGalleryModal
          event={activeEvent}
          onClose={() => setActiveEvent(null)}
          onBookClick={onBookClick}
        />
      )}
    </section>
  );
};
