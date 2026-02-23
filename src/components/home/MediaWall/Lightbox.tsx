'use client';

import { X, ChevronLeft, ChevronRight, Play, ZoomIn, ZoomOut } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail: string;
  title: string;
  category: 'kitchen' | 'bedroom' | 'both';
  description?: string;
  duration?: string;
}

interface LightboxProps {
  items: MediaItem[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex: number;
}

export default function Lightbox({ items, isOpen, onClose, initialIndex }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [zoom, setZoom] = useState(1);

  const currentItem = items[currentIndex];

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setZoom(1);
    setIsPlaying(false);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
    setZoom(1);
    setIsPlaying(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    setZoom(1);
    setIsPlaying(false);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 1));
  };

  if (!currentItem) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 bg-black/95 border-0">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-white text-lg md:text-xl font-bold mb-1">
                {currentItem.title}
              </h3>
              {currentItem.description && (
                <p className="text-gray-300 text-sm">{currentItem.description}</p>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20 ml-4 shrink-0"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Counter */}
          <div className="mt-3 flex items-center gap-2">
            <Badge variant="secondary" className="bg-white/20 text-white border-0">
              {currentIndex + 1} / {items.length}
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-0">
              {currentItem.type === 'image' ? 'Photo' : 'Video'}
            </Badge>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative w-full h-full flex items-center justify-center p-16">
          {currentItem.type === 'image' ? (
            <div
              className="relative w-full h-full transition-transform duration-300"
              style={{ transform: `scale(${zoom})` }}
            >
              <Image
                src={currentItem.url}
                alt={currentItem.title}
                fill
                className="object-contain"
                sizes="95vw"
                priority
              />
            </div>
          ) : (
            <div className="relative w-full h-full max-w-5xl">
              <video
                src={currentItem.url}
                controls
                autoPlay={isPlaying}
                className="w-full h-full object-contain"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>

        {/* Navigation Controls */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-50">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevious}
            className="h-12 w-12 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm"
            disabled={items.length <= 1}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
        </div>

        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-50">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNext}
            className="h-12 w-12 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm"
            disabled={items.length <= 1}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </div>

        {/* Zoom Controls (Images Only) */}
        {currentItem.type === 'image' && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full p-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleZoomOut}
              disabled={zoom <= 1}
              className="h-10 w-10 rounded-full text-white hover:bg-white/20"
            >
              <ZoomOut className="h-5 w-5" />
            </Button>
            <span className="text-white text-sm font-medium px-2 min-w-[60px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleZoomIn}
              disabled={zoom >= 3}
              className="h-10 w-10 rounded-full text-white hover:bg-white/20"
            >
              <ZoomIn className="h-5 w-5" />
            </Button>
          </div>
        )}

        {/* Thumbnail Strip */}
        <div className="absolute bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            {items.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentIndex(index);
                  setZoom(1);
                  setIsPlaying(false);
                }}
                className={`relative shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all ${
                  index === currentIndex
                    ? 'ring-2 ring-white scale-110'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Play className="h-4 w-4 text-white fill-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}