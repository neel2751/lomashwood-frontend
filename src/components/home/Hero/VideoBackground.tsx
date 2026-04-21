'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

interface VideoBackgroundProps {
  src: string;
  isActive: boolean;
  shouldPreload?: boolean;
  overlayOpacity?: number;
}

export default function VideoBackground({
  src,
  isActive,
  shouldPreload = false,
  overlayOpacity = 0.5,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  const attemptPlayback = async () => {
    const video = videoRef.current;
    if (!video || !isActive) return;

    try {
      await video.play();
    } catch (error) {
      // Ignore transient play timing failures during initial buffering.
      console.warn('Hero video playback delayed:', error);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;

    if (shouldPreload && video.readyState === 0) {
      video.load();
    }

    if (isActive) {
      void attemptPlayback();
    } else {
      video.pause();
    }
  }, [isActive, shouldPreload, src]);

  const handleLoadedData = () => {
    setIsLoaded(true);
    setHasError(false);

    if (isActive) {
      void attemptPlayback();
    }
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
  };

  if (hasError) {
    return (
      <div className="relative h-full w-full bg-gray-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.16),_transparent_36%),linear-gradient(135deg,_#3b2f26_0%,_#1f1813_45%,_#090909_100%)]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white/50">Video unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      {/* Branded Preview Layer */}
      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-500',
          isLoaded ? 'opacity-0' : 'opacity-100'
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.18),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(201,161,111,0.18),_transparent_28%),linear-gradient(135deg,_#4a392e_0%,_#251c15_46%,_#090909_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_20%,rgba(255,255,255,0.08)_40%,transparent_60%)] animate-[hero-shimmer_2.2s_linear_infinite]" />
      </div>

      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        autoPlay={isActive}
        muted
        loop
        playsInline
        preload={shouldPreload || isActive ? 'auto' : 'metadata'}
        onLoadedMetadata={handleLoadedData}
        onCanPlay={handleLoadedData}
        onLoadedData={handleLoadedData}
        onError={handleError}
        className={cn(
          'h-full w-full object-cover transition-opacity duration-500',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
      >
        Your browser does not support the video tag.
      </video>

      {/* Loading State */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 rounded-full bg-black/25 px-6 py-5 backdrop-blur-sm">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/20 border-t-white" />
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-white/80">
              Loading video
            </span>
          </div>
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