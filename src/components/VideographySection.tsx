import React, { useState, useRef, useEffect } from 'react';
import { videoItems } from '../data/mediaData';
import { VideoItem } from '../types';
import { Play, Pause, Volume2, VolumeX, Maximize, Film, Clock, Sparkles, Check } from 'lucide-react';

export const VideographySection: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem>(videoItems[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.currentTime = 0;
    }
  }, [selectedVideo]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return (
    <section
      id="videography-section"
      className="relative w-full py-24 sm:py-32 bg-[#FAF8F5] text-[#141312] overflow-hidden border-b border-[#EAE2D7]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline: "YOUR STORY. IN MOTION." */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[#D5C7B7] bg-[#F4EFEA] text-xs font-mono uppercase tracking-[0.25em] text-[#997328] mb-4">
            <Film className="w-3.5 h-3.5" />
            <span>CINEMATOGRAPHY & WEDDING FILMS</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-[0.06em] uppercase text-[#141312] leading-[1.05]">
            YOUR STORY.
            <span className="block text-[#997328] italic font-normal">IN MOTION.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#615850] font-light leading-relaxed">
            Shot on anamorphic cinema packages, gimbal stabilizers, and calibrated sound recorders. 
            We turn vows and celebrations into heirloom films you will watch on every anniversary.
          </p>
        </div>

        {/* Master Full-Width Cinema Theater Stage */}
        <div
          ref={playerContainerRef}
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[#D5C7B7] bg-[#141312] group"
        >
          {/* Main Video Frame */}
          <div className="relative aspect-16/9 w-full overflow-hidden flex items-center justify-center">
            <video
              ref={videoRef}
              playsInline
              preload="metadata"
              muted={isMuted}
              poster={selectedVideo.posterUrl}
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
              className="w-full h-full object-cover"
              onClick={togglePlay}
            >
              <source src={selectedVideo.videoUrl} type="video/mp4" />
            </video>

            {/* Subtle Film Grain Texture Overlay */}
            <div className="absolute inset-0 bg-[#000000]/25 pointer-events-none" />

            {/* Big Play Overlay (when paused) */}
            {!isPlaying && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 cursor-pointer backdrop-blur-[2px] transition-all"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#FAF8F5]/90 text-[#141312] flex items-center justify-center shadow-2xl hover:scale-110 hover:bg-[#997328] hover:text-white transition-all">
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1" />
                </div>
                <div className="mt-4 text-center text-white px-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#E8DFD3] block">
                    {selectedVideo.category} • {selectedVideo.duration}
                  </span>
                  <h3 className="text-xl sm:text-3xl font-serif mt-1">{selectedVideo.title}</h3>
                </div>
              </div>
            )}

            {/* Custom Control Bar Overlay */}
            <div
              className={`absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 ${
                isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
              }`}
            >
              {/* Progress Slider */}
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#997328] mb-3"
              />

              <div className="flex items-center justify-between text-white text-xs">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={togglePlay}
                    className="p-2 rounded-full hover:bg-white/20 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-full hover:bg-white/20 transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-[#C5A059]" />}
                  </button>

                  <span className="font-mono text-white/80">
                    {formatTime(currentTime)} / {formatTime(duration || 0)}
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="hidden sm:inline font-serif text-sm tracking-wider text-white/90">
                    {selectedVideo.title}
                  </span>
                  <button
                    onClick={handleFullscreen}
                    className="p-2 rounded-full hover:bg-white/20 transition-colors"
                    title="Fullscreen"
                  >
                    <Maximize className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Film Catalog Selection List */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase font-mono tracking-[0.2em] text-[#7A746E]">
              SELECT WEDDING FILM OR HIGHLIGHT TEASER
            </span>
            <span className="text-xs text-[#997328] font-medium">5 Master Films Available</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {videoItems.map((item) => {
              const isSelected = selectedVideo.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedVideo(item)}
                  className={`cursor-pointer rounded-xl overflow-hidden border transition-all duration-300 p-3 bg-[#FAF8F5] ${
                    isSelected
                      ? 'border-[#997328] ring-2 ring-[#997328]/30 shadow-md bg-[#F4EFEA]'
                      : 'border-[#DCD3C7] hover:border-[#997328]/60 hover:bg-[#F8F4EE]'
                  }`}
                >
                  <div className="aspect-16/10 rounded-lg overflow-hidden relative mb-2 bg-black">
                    <img
                      src={item.posterUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div
                        className={`p-2 rounded-full ${
                          isSelected ? 'bg-[#997328] text-white' : 'bg-white/70 text-black'
                        }`}
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </div>
                    </div>
                    <span className="absolute bottom-1 right-1.5 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-mono text-white">
                      {item.duration}
                    </span>
                  </div>

                  <span className="text-[9px] uppercase font-mono text-[#997328] font-semibold block">
                    {item.category}
                  </span>
                  <h4 className="text-xs font-serif font-medium text-[#141312] truncate mt-0.5">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-[#7A746E] truncate mt-0.5">{item.subtitle}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
