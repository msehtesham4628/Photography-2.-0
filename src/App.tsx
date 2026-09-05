/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { OpeningHero } from './components/OpeningHero';
import { CinematicStory } from './components/CinematicStory';
import { AboutSection } from './components/AboutSection';
import { PhotographyShowcase } from './components/PhotographyShowcase';
import { VideographySection } from './components/VideographySection';
import { EventStoriesSection } from './components/EventStoriesSection';
import { InstagramSection } from './components/InstagramSection';
import { BookingSection } from './components/BookingSection';
import { FinalHero } from './components/FinalHero';
import { AdminDriveModal } from './components/AdminDriveModal';

export default function App() {
  const [isAdminDriveOpen, setIsAdminDriveOpen] = useState(false);

  const scrollToBooking = () => {
    const el = document.getElementById('book-your-date');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToStory = () => {
    const el = document.getElementById('cinematic-story');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPhotography = () => {
    const el = document.getElementById('photography-showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FAF8F5] text-[#141312] selection:bg-[#EAE0D5] selection:text-[#141312]">
      {/* Overlay Navigation */}
      <Navigation
        onBookClick={scrollToBooking}
        onOpenDriveManager={() => setIsAdminDriveOpen(true)}
      />

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Main Continuous Cinematic Sequence */}
      <main className="w-full">
        {/* 1. OPENING HERO */}
        <OpeningHero
          onBookClick={scrollToBooking}
          onExploreClick={scrollToStory}
        />

        {/* 2. CINEMATIC STORY */}
        <CinematicStory
          onExploreGallery={scrollToPhotography}
        />

        {/* 3. ABOUT */}
        <AboutSection
          onBookClick={scrollToBooking}
        />

        {/* 4. PHOTOGRAPHY */}
        <PhotographyShowcase
          onBookClick={scrollToBooking}
        />

        {/* 5. VIDEOGRAPHY / FILMS */}
        <VideographySection />

        {/* 6. EVENT STORIES */}
        <EventStoriesSection
          onBookClick={scrollToBooking}
          onOpenDriveManager={() => setIsAdminDriveOpen(true)}
        />

        {/* 7. INSTAGRAM */}
        <InstagramSection />

        {/* 8. BOOK YOUR DATE */}
        <BookingSection />

        {/* 9. FINAL HERO — ABSOLUTE END (NOTHING AFTER THIS) */}
        <FinalHero
          onBookClick={scrollToBooking}
        />
      </main>

      {/* Admin Google Drive Content Management Modal */}
      {isAdminDriveOpen && (
        <AdminDriveModal
          onClose={() => setIsAdminDriveOpen(false)}
        />
      )}
    </div>
  );
}
