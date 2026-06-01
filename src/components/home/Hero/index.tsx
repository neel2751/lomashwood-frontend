'use client';

import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

import CTAButton from './CTAButton';
import HeroSlide from './HeroSlide';
import VideoBackground from './VideoBackground';

import { Button } from '@/components/ui/button';
import { apiClient } from '@/lib/api';
import { cn } from '@/lib/utils';

interface Slide {
  id: string;
  type: 'image' | 'video';
  src: string;
  title: string;
  subtitle: string;
  description?: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  overlayOpacity?: number;
}

const fallbackSlides: Slide[] = [
  {
    id: '1',
    type: 'video',
    src: 'https://lomashwood-prod.s3.eu-west-2.amazonaws.com/public/hero/kitchen.mp4',
    title: 'British Made Bespoke Kitchen',
    subtitle: 'Modern Designs, Timeless Quality',
    description: 'Discover our premium kitchen solutions tailored to your lifestyle',
    ctaText: 'Explore Kitchens',
    ctaLink: '/kitchen',
    secondaryCtaText: 'Book Free Consultation',
    secondaryCtaLink: '/book-appointment',
    overlayOpacity: 0.4,
  },
  {
    id: '2',
    type: 'video',
    src: 'https://lomashwood-prod.s3.eu-west-2.amazonaws.com/public/hero/Bedroom.mp4',
    title: 'Modern Fitted bedrooms',
    subtitle: 'Where Comfort Meets Elegance',
    description: 'Discover our premium bedroom solutions tailored to your lifestyle',
    ctaText: 'Explore Bedrooms',
    ctaLink: '/bedroom',
    secondaryCtaText: 'View Portfolio',
    secondaryCtaLink: '/inspiration',
    overlayOpacity: 0.5,
  },
  // {
  //   id: '3',
  //   type: 'image',
  //   src: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1748&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //   title: 'Limited Time Offers',
  //   subtitle: 'Up to 30% Off Selected Ranges',
  //   description: 'Transform your home with our exclusive seasonal deals',
  //   ctaText: 'View Offers',
  //   ctaLink: '/sale',
  //   secondaryCtaText: 'Download Brochure',
  //   secondaryCtaLink: '/brochure',
  //   overlayOpacity: 0.45,
  // },
];

const HERO_CACHE_KEY = 'hero-slides-cache-v1';

function toPath(value?: string): string | undefined {
  if (!value) return value;
  return value.startsWith('/') ? value : `/${value}`;
}

function normalizeSlides(payload: unknown): Slide[] {
  const rows = Array.isArray(payload)
    ? payload
    : Array.isArray((payload as { data?: unknown[] } | null)?.data)
      ? ((payload as { data: unknown[] }).data)
      : [];

  return rows
    .map((item) => item as Partial<Slide>)
    .filter((item) => !!item?.id && !!item?.src && !!item?.title)
    .map((item) => ({
      id: String(item.id),
      type: item.type === 'video' ? 'video' : 'image',
      src: String(item.src),
      title: String(item.title),
      subtitle: item.subtitle ?? '',
      description: item.description,
      ctaText: item.ctaText ?? 'Explore',
      ctaLink: toPath(item.ctaLink) ?? '/',
      secondaryCtaText: item.secondaryCtaText,
      secondaryCtaLink: toPath(item.secondaryCtaLink),
      overlayOpacity: item.overlayOpacity,
    }));
}

export function Hero() {
  const [cachedSlides, setCachedSlides] = useState<Slide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const { data: apiSlides } = useQuery<Slide[]>({
    queryKey: ['hero-slides'],
    queryFn: async () => {
      const response = await apiClient.heroSlider.getAll();
      return normalizeSlides(response);
    },
    retry: 1,
  });

  const hasApiSlides = Boolean(apiSlides && apiSlides.length > 0);
  const hasCachedSlides = cachedSlides.length > 0;
  // const shouldShowLoading = (isLoading || isFetching) && !hasApiSlides && !hasCachedSlides;
  const slides: Slide[] = hasApiSlides
    ? apiSlides ?? fallbackSlides
    : hasCachedSlides
      ? cachedSlides
      : fallbackSlides;
  const hasMultipleSlides = slides.length > 1;

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(HERO_CACHE_KEY);
      if (!raw) return;

      const parsed = JSON.parse(raw) as unknown;
      const normalized = normalizeSlides(parsed);

      if (normalized.length > 0) {
        setCachedSlides(normalized);
      }
    } catch {
      // Ignore cache parsing/storage errors.
    }
  }, []);

  useEffect(() => {
    if (!apiSlides || apiSlides.length === 0) return;

    try {
      sessionStorage.setItem(HERO_CACHE_KEY, JSON.stringify(apiSlides));
      setCachedSlides(apiSlides);
    } catch {
      // Ignore storage quota or serialization errors.
    }
  }, [apiSlides]);

  useEffect(() => {
    const firstVideo = slides.find((slide) => slide.type === 'video')?.src;
    if (!firstVideo || typeof document === 'undefined') return;

    const url = new URL(firstVideo);

    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = `${url.protocol}//${url.host}`;

    const preload = document.createElement('link');
    preload.rel = 'preload';
    preload.as = 'video';
    preload.href = firstVideo;

    document.head.appendChild(preconnect);
    document.head.appendChild(preload);

    return () => {
      preconnect.remove();
      preload.remove();
    };
  }, [slides]);

  const nextSlide = useCallback(() => {
    if (!hasMultipleSlides || isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [hasMultipleSlides, isTransitioning, slides.length]);

  const prevSlide = useCallback(() => {
    if (!hasMultipleSlides || isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [hasMultipleSlides, isTransitioning, slides.length]);

  const goToSlide = useCallback(
    (index: number) => {
      if (!hasMultipleSlides || isTransitioning || index === currentSlide) return;
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [currentSlide, hasMultipleSlides, isTransitioning]
  );

  useEffect(() => {
    if (!hasMultipleSlides) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 8000);

    return () => clearInterval(interval);
  }, [hasMultipleSlides, nextSlide]);

  useEffect(() => {
    if (!hasMultipleSlides) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasMultipleSlides, nextSlide, prevSlide]);

  useEffect(() => {
    if (currentSlide >= slides.length) {
      setCurrentSlide(0);
    }
  }, [currentSlide, slides.length]);

  return (
    <section
      className="relative h-[78svh] min-h-[560px] w-full overflow-hidden bg-gray-900 md:h-screen"
      aria-label="Hero Slider"
    >
      {/* {shouldShowLoading ? (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-gray-950">
          <div className="flex flex-col items-center gap-4 text-center text-white">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/70">Lomash Wood</p>
              <p className="mt-2 text-lg font-medium">Loading featured designs</p>
            </div>
          </div>
        </div>
      ) : null} */}

      {/* Slides */}
      <div className="relative h-full w-full">
        {fallbackSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              'absolute inset-0 transition-opacity duration-700 ease-in-out',
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            )}
          >
            {slide.type === 'video' ? (
              <VideoBackground
                src={slide.src}
                isActive={index === currentSlide}
                shouldPreload={index <= 1 || index === currentSlide}
                overlayOpacity={slide.overlayOpacity}
              />
            ) : (
              <HeroSlide
                src={slide.src}
                alt={slide.title}
                overlayOpacity={slide.overlayOpacity}
                priority={index === 0}
              />
            )}

            {/* Content Overlay */}
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-8 lg:px-16">
                <div className="max-w-3xl pb-14 pt-24 sm:pt-28 md:pb-6 md:pt-20">
                  {/* Subtitle */}
                  <div
                    className={cn(
                      'mb-4 transform transition-all duration-700 delay-100',
                      index === currentSlide
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-4 opacity-0'
                    )}
                  >
                    <span className="inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                      {slide.subtitle}
                    </span>
                  </div>

                  {/* Title */}
                  <h1
                    className={cn(
                      'mb-4 text-3xl font-bold leading-tight text-white sm:mb-6 sm:text-5xl lg:text-6xl xl:text-7xl',
                      'transform transition-all duration-700 delay-200',
                      index === currentSlide
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-4 opacity-0'
                    )}
                  >
                    {slide.title}
                  </h1>

                  {/* Description */}
                  {slide.description && (
                    <p
                      className={cn(
                        'mb-6 text-base text-white/90 sm:mb-8 sm:text-xl lg:text-2xl',
                        'transform transition-all duration-700 delay-300',
                        index === currentSlide
                          ? 'translate-y-0 opacity-100'
                          : 'translate-y-4 opacity-0'
                      )}
                    >
                      {slide.description}
                    </p>
                  )}

                  {/* CTAs */}
                  <div
                    className={cn(
                      'flex flex-col gap-3 sm:flex-row sm:gap-4',
                      'transform transition-all duration-700 delay-400',
                      index === currentSlide
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-4 opacity-0'
                    )}
                  >
                    <CTAButton
                      href={slide.ctaLink}
                      variant="primary"
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      {slide.ctaText}
                    </CTAButton>

                    {slide.secondaryCtaText && slide.secondaryCtaLink && (
                      <CTAButton
                        href={slide.secondaryCtaLink}
                        variant="secondary"
                        size="lg"
                        className="w-full sm:w-auto"
                      >
                        {slide.secondaryCtaText}
                      </CTAButton>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {hasMultipleSlides && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-3 top-1/2 z-30 hidden -translate-y-1/2 rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 md:flex"
            onClick={prevSlide}
            disabled={isTransitioning}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-3 top-1/2 z-30 hidden -translate-y-1/2 rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 md:flex"
            onClick={nextSlide}
            disabled={isTransitioning}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* Slide Indicators */}
      {hasMultipleSlides && (
        <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2 sm:bottom-8">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                index === currentSlide
                  ? 'w-8 bg-white'
                  : 'w-2 bg-white/50 hover:bg-white/75'
              )}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentSlide ? 'true' : 'false'}
            />
          ))}
        </div>
      )}

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-30 hidden animate-bounce lg:block">
        <div className="flex flex-col items-center gap-2 text-white/75">
          <span className="text-xs font-medium uppercase tracking-wider">
            Scroll
          </span>
          <div className="h-8 w-px bg-white/50" />
        </div>
      </div>
    </section>
  );
}

export default Hero;