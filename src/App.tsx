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
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToStory = () => {
    const el = document.getElementById('cinematic-story');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPhotography = () => {
    const el = document.getElementById('photography-showcase');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#FAF8F5] text-[#141312] selection:bg-[#EAE0D5] selection:text-[#141312]">
      <Navigation
        onBookClick={scrollToBooking}
        onOpenDriveManager={() => setIsAdminDriveOpen(true)}
      />
      <FloatingWhatsApp />

      <main className="w-full">
        <OpeningHero onBookClick={scrollToBooking} onExploreClick={scrollToStory} />
        <CinematicStory onExploreGallery={scrollToPhotography} />
        <AboutSection onBookClick={scrollToBooking} />
        <PhotographyShowcase onBookClick={scrollToBooking} />
        <VideographySection />
        <EventStoriesSection
          onBookClick={scrollToBooking}
          onOpenDriveManager={() => setIsAdminDriveOpen(true)}
        />
        <InstagramSection />
        <BookingSection />
        <FinalHero onBookClick={scrollToBooking} />
      </main>

      {isAdminDriveOpen && (
        <AdminDriveModal onClose={() => setIsAdminDriveOpen(false)} />
      )}

      <footer className="flex min-h-[64px] items-center justify-center border-t border-black/10 bg-[#FAF8F5] px-6 py-5 text-center text-[11px] tracking-[0.18em] text-black/50">
        © 2023 Shakeela Photography. All Rights Reserved.
      </footer>
    </div>
  );
}
