import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { AboutSection } from './components/AboutSection';
import { CollectionSection } from './components/CollectionSection';
import { AppointmentSection } from './components/AppointmentSection';
import { FooterSection } from './components/FooterSection';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  const [currentSection, setCurrentSection] = useState<string>('about');

  const scrollTo = (id: string) => {
    setCurrentSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'collection', 'appointment'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setCurrentSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#070605] text-[#FAF8F5] overflow-x-hidden selection:bg-[#C5A059] selection:text-black">
      {/* 1. PERSISTENT NAVIGATION BAR: About Us, Our Collection, Book Appointment */}
      <Navigation
        onNavigate={scrollTo}
        currentSection={currentSection}
      />

      {/* 2. ABOUT US (Royal Nizami Photography Studio & Heritage) */}
      <AboutSection
        onExploreCollection={() => scrollTo('collection')}
        onBookAppointment={() => scrollTo('appointment')}
      />

      {/* 3. OUR COLLECTION & SELECTED WORK (GSAP ScrollTrigger 3D Layered Parallax Showcase + 12 Curated Heirlooms) */}
      <CollectionSection
        onBookAppointment={() => scrollTo('appointment')}
      />

      {/* 4. BOOK APPOINTMENT (Royal Nizami Wedding Consultation & Inquiry) */}
      <AppointmentSection />

      {/* 5. FOOTER */}
      <FooterSection />

      {/* 6. FLOATING WHATSAPP BUTTON (Direct VIP Studio Access) */}
      <FloatingWhatsApp />
    </div>
  );
}
