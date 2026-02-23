'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

interface VideoBackgroundProps {
  src: string;
  isActive: boolean;
  overlayOpacity?: number;
}

export default function VideoBackground({
  src,
  isActive,
  overlayOpacity = 0.5,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.play().catch((error) => {
        console.error('Video playback failed:', error);
        setHasError(true);
      });
    } else {
      video.pause();
    }
  }, [isActive]);

  const handleLoadedData = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
  };

  if (hasError) {
    return (
      <div className="relative h-full w-full bg-gray-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white/50">Video unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      {/* Video Element */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedData={handleLoadedData}
        onError={handleError}
        className={cn(
          'h-full w-full object-cover transition-opacity duration-700',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Loading State */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/20 border-t-white" />
        </div>
      )}

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"
        style={{ opacity: overlayOpacity }}
      />

      {/* Additional Bottom Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
    </div>
  );
}