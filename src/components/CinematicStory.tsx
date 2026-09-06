import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Play, Pause, Compass, ArrowRight, Eye, Film, Sparkles } from 'lucide-react';

interface CinematicStoryProps {
  onExploreGallery: () => void;
}

export const CinematicStory: React.FC<CinematicStoryProps> = ({ onExploreGallery }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isPlayingSceneVideo, setIsPlayingSceneVideo] = useState(false);
  const sceneVideoRef = useRef<HTMLVideoElement>(null);

  const scenes = [
    {
      id: 'scene-1',
      act: 'ACT I • THE DAWN',
      title: 'The Solitary Glance',
      quote: 'Before the music begins, there is a quiet intake of breath.',
      location: 'Taj Falaknuma Palace, Hyderabad',
      photoUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=85',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-bride-putting-on-her-earrings-before-the-wedding-41728-large.mp4',
      lens: '85mm f/1.2 Anamorphic',
      focalNote: 'Hand-embroidered zardozi veil falling in natural palace window light.'
    },
    {
      id: 'scene-2',
      act: 'ACT II • SACRED UNION',
      title: 'Vows Under Starlight',
      quote: 'Two souls promise eternity beneath falling rose petals and sacred mantras.',
      location: 'Chowmahalla Palace Khilwat',
      photoUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-bride-walking-down-the-aisle-41727-large.mp4',
      lens: '50mm f/1.4 Cine Prime',
      focalNote: 'The instant their eyes lock during the sacred exchange.'
    },
    {
      id: 'scene-3',
      act: 'ACT III • HERITAGE ODYSSEY',
      title: 'Echoes of Golconda',
      quote: 'Ancient stones whisper love stories carved in centuries past.',
      location: 'Golconda Fort Enclave',
      photoUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-couple-walking-hand-in-hand-in-a-field-41584-large.mp4',
      lens: '35mm f/1.4 Wide Master',
      focalNote: 'Grand arches framing timeless royal silhouettes at golden hour.'
    },
    {
      id: 'scene-4',
      act: 'ACT IV • ECSTATIC BLISS',
      title: 'The Celebration Unleashed',
      quote: 'Golden turmeric, joyous laughter, and the rhythm of celebration.',
      location: 'Jubilee Hills Estate Lawn',
      photoUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=85',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-bride-holding-a-bouquet-of-flowers-41726-large.mp4',
      lens: '24-70mm f/2.8 High-Speed',
      focalNote: 'Unscripted tears of joy and swirling festive colors.'
    }
  ];

  const currentScene = scenes[activeSceneIndex];

  const toggleVideoMotion = () => {
    if (isPlayingSceneVideo) {
      sceneVideoRef.current?.pause();
      setIsPlayingSceneVideo(false);
    } else {
      sceneVideoRef.current?.play();
      setIsPlayingSceneVideo(true);
    }
  };

  useEffect(() => {
    setIsPlayingSceneVideo(false);
    if (sceneVideoRef.current) {
      sceneVideoRef.current.currentTime = 0;
    }
  }, [activeSceneIndex]);

  return (
    <section
      id="cinematic-story"
      ref={containerRef}
      className="relative w-full py-24 sm:py-32 bg-[#FAF8F5] text-[#141312] overflow-hidden border-b border-[#EAE2D7]"
    >
      {/* Light editorial ambient background gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F3ECE1] rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#EBE2D5] rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Headline Section: "WE DON'T JUST CAPTURE MOMENTS. WE TURN THEM INTO STORIES." */}
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-[#D5C7B7] bg-[#F7F2EB] text-[#7A746E] text-xs uppercase tracking-[0.25em] mb-6">
            <Film className="w-3.5 h-3.5 text-[#997328]" />
            <span>A CINEMATIC WALKING EXPERIENCE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif tracking-[0.08em] uppercase text-[#141312] leading-tight">
            WE DON'T JUST CAPTURE MOMENTS.
          </h2>
          <p className="text-2xl sm:text-4xl md:text-5xl font-serif italic tracking-wide text-[#997328] mt-3 font-normal">
            "WE TURN THEM INTO STORIES."
          </p>
          <p className="mt-6 text-sm sm:text-base text-[#615850] max-w-2xl mx-auto font-light leading-relaxed">
            As you walk through each chapter, observe how still photographs transcend into cinematic movement. 
            Step forward into the emotional cadence of Indian weddings.
          </p>
        </div>

        {/* Cinematic Virtual Camera Stage (Interactive Walking Frame) */}
        <div className="relative rounded-2xl sm:rounded-3xl border border-[#DCD3C7] bg-[#F4EFE9]/90 shadow-2xl overflow-hidden backdrop-blur-md">
          {/* Film Camera Top Bar Indicator */}
          <div className="px-6 py-4 border-b border-[#E3D9CD] flex flex-wrap items-center justify-between gap-4 bg-[#FAF8F5]/80 text-xs">
            <div className="flex items-center space-x-3">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#997328] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#997328]"></span>
              </span>
              <span className="font-mono tracking-widest text-[#4A433D] uppercase font-semibold">
                REC • 4K CINEMA 24FPS
              </span>
              <span className="text-[#8C8379]">|</span>
              <span className="text-[#6A625A] hidden md:inline">{currentScene.act}</span>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              {scenes.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSceneIndex(idx)}
                  className={`px-3 py-1 rounded-full text-xs font-serif tracking-wider transition-all ${
                    activeSceneIndex === idx
                      ? 'bg-[#141312] text-[#FAF8F5] shadow-xs'
                      : 'bg-[#EAE2D7]/70 text-[#524B44] hover:bg-[#DCD3C7]'
                  }`}
                >
                  0{idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Center Stage: Transforming Image into Video & 3D Perspective */}
          <div className="relative min-h-[460px] sm:min-h-[580px] lg:min-h-[640px] w-full flex items-center justify-center p-4 sm:p-8 lg:p-12 overflow-hidden">
            {/* Visual Frame with 3D Depth */}
            <div className="relative w-full max-w-5xl aspect-16/10 sm:aspect-16/9 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/60">
              {/* Photo View */}
              <img
                src={currentScene.photoUrl}
                alt={currentScene.title}
                className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 ${
                  isPlayingSceneVideo ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
                }`}
              />

              {/* Video Motion View */}
              <video
                ref={sceneVideoRef}
                loop
                muted
                playsInline
                preload="metadata"
                poster={currentScene.photoUrl}
                className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
                  isPlayingSceneVideo ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <source src={currentScene.videoUrl} type="video/mp4" />
              </video>

              {/* Cinematic Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#141312]/75 via-transparent to-[#141312]/20 pointer-events-none" />

              {/* In-Frame Transformation Overlay Trigger */}
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20">
                <button
                  onClick={toggleVideoMotion}
                  className="px-4 py-2 rounded-full bg-[#FAF8F5]/90 hover:bg-white text-[#141312] text-xs font-medium tracking-wider backdrop-blur-md shadow-md flex items-center space-x-2 transition-transform active:scale-95"
                >
                  {isPlayingSceneVideo ? (
                    <>
                      <Pause className="w-3.5 h-3.5 text-[#997328]" />
                      <span>VIEW STILL PHOTOGRAPHY</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-[#997328] text-[#997328]" />
                      <span>TRANSFORM TO CINEMA MOTION</span>
                    </>
                  )}
                </button>
              </div>

              {/* In-Frame Location and Lens Info */}
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20 hidden sm:block text-right">
                <span className="px-3 py-1 rounded-full bg-[#141312]/60 backdrop-blur-md text-[#FAF8F5] text-[11px] font-mono tracking-wider">
                  {currentScene.lens}
                </span>
              </div>

              {/* Bottom In-Frame Story Narrative */}
              <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 z-20 text-white">
                <span className="text-xs font-mono tracking-[0.25em] text-[#E8DFD3] uppercase block mb-1">
                  {currentScene.location}
                </span>
                <h3 className="text-2xl sm:text-4xl md:text-5xl font-serif tracking-wide text-white drop-shadow-md">
                  {currentScene.title}
                </h3>
                <p className="mt-2 text-xs sm:text-base text-[#F4EFEA] font-light max-w-xl italic drop-shadow-sm">
                  "{currentScene.quote}"
                </p>
              </div>
            </div>
          </div>

          {/* Camera Controls & Scene Advancer */}
          <div className="px-6 sm:px-10 py-5 bg-[#FAF8F5] border-t border-[#E3D9CD] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3 text-xs text-[#6A625A]">
              <Compass className="w-4 h-4 text-[#997328]" />
              <span className="font-light italic">{currentScene.focalNote}</span>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() =>
                  setActiveSceneIndex((prev) => (prev > 0 ? prev - 1 : scenes.length - 1))
                }
                className="px-4 py-2 rounded-full border border-[#D5C7B7] text-xs font-serif tracking-wider text-[#3A342E] hover:bg-[#EAE2D7] transition-colors"
              >
                PREVIOUS SCENE
              </button>

              <button
                onClick={() =>
                  setActiveSceneIndex((prev) => (prev < scenes.length - 1 ? prev + 1 : 0))
                }
                className="px-5 py-2 rounded-full bg-[#141312] text-[#FAF8F5] text-xs font-serif tracking-wider hover:bg-[#997328] transition-colors flex items-center space-x-2"
              >
                <span>NEXT SCENE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Film Strip Gallery teaser preview */}
        <div className="mt-14 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-4 h-4 text-[#997328]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#6A625A] font-medium">
              SCENE STRIP DIRECTORY
            </span>
          </div>
          <button
            onClick={onExploreGallery}
            className="text-xs uppercase tracking-[0.2em] text-[#997328] hover:text-[#141312] font-semibold flex items-center space-x-1 transition-colors"
          >
            <span>VIEW COMPLETE PORTFOLIO</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Thumbnails */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {scenes.map((scene, idx) => (
            <div
              key={scene.id}
              onClick={() => setActiveSceneIndex(idx)}
              className={`group cursor-pointer rounded-xl overflow-hidden border transition-all duration-300 relative ${
                activeSceneIndex === idx
                  ? 'border-[#997328] ring-2 ring-[#997328]/30 shadow-md'
                  : 'border-[#DCD3C7] opacity-70 hover:opacity-100'
              }`}
            >
              <div className="aspect-16/10 relative">
                <img
                  src={scene.photoUrl}
                  alt={scene.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <span className="text-[9px] uppercase tracking-wider block opacity-80">
                    0{idx + 1} • {scene.title}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
