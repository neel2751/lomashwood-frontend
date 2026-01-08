"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HeroSlide as HeroSlideType } from "@/types";

interface HeroSlideProps {
  slide: HeroSlideType;
}

export function HeroSlide({ slide }: HeroSlideProps) {
  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {/* Background Image or Video */}
      {slide.video ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={slide.video} type="video/mp4" />
        </video>
      ) : (
        <div className="absolute inset-0">
          <Image
            src={slide.image || "/images/placeholder.jpg"}
            alt={slide.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      )}

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

      {/* Content */}
      <div className="relative h-full container-custom flex items-center">
        <div className="max-w-2xl text-white space-y-6">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight animate-slide-up">
            {slide.title}
          </h1>

          {/* Description */}
          <p
            className="text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-xl animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            {slide.description}
          </p>

          {/* CTA Button */}
          <div
            className="flex items-center space-x-4 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Link href={slide.buttonLink}>
              <Button
                size="xl"
                className="font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                {slide.buttonText}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </div>
  );
}