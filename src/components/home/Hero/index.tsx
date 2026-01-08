"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { HeroSlide as HeroSlideType } from "@/types";

// Mock data - Replace with API call
const heroSlides: HeroSlideType[] = [
  {
    id: "1",
    image: "/images/hero/hero-1.jpg",
    title: "Transform Your Kitchen",
    description: "Discover premium kitchen designs at unbeatable prices. Book your free consultation today.",
    buttonText: "Explore Kitchens",
    buttonLink: "/kitchen",
  },
  {
    id: "2",
    image: "/images/hero/hero-2.jpg",
    title: "Dream Bedroom Solutions",
    description: "Create the perfect bedroom with our expert design team and premium quality materials.",
    buttonText: "Explore Bedrooms",
    buttonLink: "/bedroom",
  },
  {
    id: "3",
    image: "/images/hero/hero-3.jpg",
    title: "Special Offers Available",
    description: "Limited time deals on our most popular kitchen and bedroom collections. Save up to 30%.",
    buttonText: "View Offers",
    buttonLink: "/sale",
  },
];

export function Hero() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <section className="relative w-full">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {heroSlides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px]">
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                  }}
                >
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40" />
                </div>

                {/* Content */}
                <div className="relative h-full container-custom flex items-center">
                  <div className="max-w-2xl text-white">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-slide-up">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl mb-8 text-white/90 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                      {slide.description}
                    </p>
                    <Link href={slide.buttonLink}>
                      <Button
                        size="xl"
                        className="font-semibold shadow-lg hover:shadow-xl animate-slide-up"
                        style={{ animationDelay: "0.2s" }}
                      >
                        {slide.buttonText}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons */}
        <CarouselPrevious className="left-4 md:left-8" />
        <CarouselNext className="right-4 md:right-8" />
      </Carousel>
    </section>
  );
}