'use client';

import Image from 'next/image';
import { useState } from 'react';

import { cn } from '@/lib/utils';

interface HeroSlideProps {
  src: string;
  alt: string;
  overlayOpacity?: number;
  priority?: boolean;
}

export default function HeroSlide({
  src,
  alt,
  overlayOpacity = 0.4,
  priority = false,
}: HeroSlideProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative h-full w-full">
      {/* Background Image */}
      <div className="relative h-full w-full group">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          quality={90}
          sizes="100vw"
          className={cn(
            'object-cover transition-all duration-700',
            isLoaded ? 'scale-100 opacity-100' : 'scale-105 opacity-0',
            'group-hover:scale-110'
          )}
          onLoadingComplete={() => setIsLoaded(true)}
        />

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"
          style={{ opacity: overlayOpacity }}
        />

        {/* Additional Bottom Gradient for better text readability */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
    </div>
  );
}