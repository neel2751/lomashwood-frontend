'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { apiClient } from '@/lib/api';

import CTAButton from './CTAButton';
import HeroSlide from './HeroSlide';
import VideoBackground from './VideoBackground';

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
    type: 'image',
    src: 'https://plus.unsplash.com/premium_photo-1680382578857-c331ead9ed51?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Transform Your Kitchen',
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
    src: 'https://portal.cdcproperty.management/storage/site_settings/68f11d406c6356qQ2x1760632128.mov',
    title: 'Bedroom Sanctuary',
    subtitle: 'Where Comfort Meets Elegance',
    description: 'Create your perfect retreat with our bespoke bedroom designs',
    ctaText: 'Explore Bedrooms',
    ctaLink: '/bedroom',
    secondaryCtaText: 'View Portfolio',
    secondaryCtaLink: '/inspiration',
    overlayOpacity: 0.5,
  },
  {
    id: '3',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1748&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Limited Time Offers',
    subtitle: 'Up to 30% Off Selected Ranges',
    description: 'Transform your home with our exclusive seasonal deals',
    ctaText: 'View Offers',
    ctaLink: '/sale',
    secondaryCtaText: 'Download Brochure',
    secondaryCtaLink: '/brochure',
    overlayOpacity: 0.45,
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Fetch slides from API
  const { data: heroData } = useQuery({
    queryKey: ['hero-slides'],
    queryFn: () => apiClient.heroSlider.getAll(),
  });

  const slides: Slide[] = (heroData?.data as unknown as Slide[]) ?? fallbackSlides;

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, slides.length]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, slides.length]);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentSlide) return;
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [currentSlide, isTransitioning]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 8000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-gray-900"
      aria-label="Hero Slider"
    >
      {/* Slides */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
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
                overlayOpacity={slide.overlayOpacity}
              />
            ) : (
              <HeroSlide
                src={slide.src}
                alt={slide.title}
                overlayOpacity={slide.overlayOpacity}
              />
            )}

            {/* Content Overlay */}
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-10 lg:px-16">
                <div className="max-w-3xl">
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
                      'mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl',
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
                        'mb-8 text-lg text-white/90 sm:text-xl lg:text-2xl',
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
                      'flex flex-col gap-4 sm:flex-row',
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
                    >
                      {slide.ctaText}
                    </CTAButton>

                    {slide.secondaryCtaText && slide.secondaryCtaLink && (
                      <CTAButton
                        href={slide.secondaryCtaLink}
                        variant="secondary"
                        size="lg"
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
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 z-30 hidden -translate-y-1/2 rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 md:flex"
        onClick={prevSlide}
        disabled={isTransitioning}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 z-30 hidden -translate-y-1/2 rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 md:flex"
        onClick={nextSlide}
        disabled={isTransitioning}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-2">
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