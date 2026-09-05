import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, MapPin, Share2 } from 'lucide-react';
import { PhotoItem } from '../types';

interface LightboxModalProps {
  photos: PhotoItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photos,
  currentIndex,
  onClose,
  onNavigate
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const currentPhoto = photos[currentIndex];

  if (!currentPhoto) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(1);
    onNavigate(currentIndex > 0 ? currentIndex - 1 : photos.length - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(1);
    onNavigate(currentIndex < photos.length - 1 ? currentIndex + 1 : 0);
  };

  const toggleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(prev => (prev === 1 ? 1.8 : 1));
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Shakeela Photography - ${currentPhoto.title}`,
          text: currentPhoto.caption || 'Timeless wedding photography by Shakeela Photography',
          url: window.location.href
        });
      } catch (err) {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#141312]/95 backdrop-blur-xl animate-in fade-in duration-300 select-none"
      onClick={onClose}
    >
      {/* Top Controls Bar */}
      <div
        className="absolute top-0 left-0 right-0 p-4 sm:p-6 z-20 flex items-center justify-between text-white/90 bg-gradient-to-b from-black/80 to-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center space-x-3">
          <span className="font-serif tracking-widest text-sm uppercase text-[#C5A059]">
            SHAKEELA PHOTOGRAPHY
          </span>
          <span className="text-white/40">|</span>
          <span className="text-xs font-mono text-white/70">
            {currentIndex + 1} / {photos.length}
          </span>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            onClick={toggleZoom}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            title={zoomLevel === 1 ? 'Zoom In' : 'Reset Zoom'}
          >
            {zoomLevel === 1 ? <ZoomIn className="w-5 h-5" /> : <ZoomOut className="w-5 h-5" />}
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            title="Share Photograph"
          >
            <Share2 className="w-5 h-5" />
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            title="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div
        className="relative max-w-6xl max-h-[85vh] w-full h-full flex items-center justify-center p-4 sm:p-12 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentPhoto.url}
          alt={currentPhoto.title}
          style={{ transform: `scale(${zoomLevel})` }}
          className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl transition-transform duration-300 cursor-zoom-in"
          onClick={toggleZoom}
        />
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/80 text-white border border-white/20 transition-all active:scale-90"
        title="Previous photo"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/80 text-white border border-white/20 transition-all active:scale-90"
        title="Next photo"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Bottom Metadata Caption */}
      <div
        className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white z-20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#C5A059]">
              {currentPhoto.categoryLabel}
            </span>
            <h3 className="text-lg sm:text-xl font-serif tracking-wide">{currentPhoto.title}</h3>
            {currentPhoto.caption && (
              <p className="text-xs sm:text-sm text-white/80 font-light mt-0.5 max-w-2xl">
                {currentPhoto.caption}
              </p>
            )}
          </div>

          {currentPhoto.location && (
            <div className="flex items-center space-x-1.5 text-xs text-white/70 shrink-0">
              <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{currentPhoto.location}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
