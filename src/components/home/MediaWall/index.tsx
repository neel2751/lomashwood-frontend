"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { QUERY_KEYS } from "@/lib/react-query";
import { Skeleton } from "@/components/ui/skeleton";

export function MediaWall() {
  const { data: mediaWallData, isLoading } = useQuery({
    queryKey: QUERY_KEYS.mediaWall.all,
    queryFn: () => apiClient.mediaWall.get(),
  });

  const mediaWall = mediaWallData?.data;

  if (isLoading) {
    return (
      <section className="section-padding bg-white">
        <div className="container-custom">
          <Skeleton className="h-[500px] w-full rounded-lg" />
        </div>
      </section>
    );
  }

  if (!mediaWall) return null;

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Full-width Media Wall Section */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
          {/* Background Image */}
          <div className="relative aspect-[21/9] md:aspect-[21/7] lg:aspect-[21/6]">
            <Image
              src={mediaWall.backgroundImage || "/images/placeholder.jpg"}
              alt={mediaWall.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="container-custom">
                <div className="max-w-2xl text-white">
                  {/* Title */}
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                    {mediaWall.title}
                  </h2>

                  {/* Description */}
                  <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl">
                    {mediaWall.description}
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap items-center gap-4">
                    <Link href="/media-wall">
                      <Button size="xl" className="group/btn">
                        Explore Media Walls
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </Link>

                    <Link href="/book-appointment">
                      <Button
                        size="xl"
                        variant="outline"
                        className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-lomash-dark"
                      >
                        Book Consultation
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gallery Preview (if images available) */}
          {mediaWall.images && mediaWall.images.length > 0 && (
            <div className="absolute bottom-6 right-6 hidden lg:flex items-center space-x-2">
              {mediaWall.images.slice(0, 3).map((image, index) => (
                <div
                  key={index}
                  className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-white/50 shadow-lg hover:scale-110 transition-transform cursor-pointer"
                >
                  <Image
                    src={image}
                    alt={`Media Wall ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
              ))}
              {mediaWall.images.length > 3 && (
                <div className="w-20 h-20 rounded-lg bg-white/20 backdrop-blur-sm border-2 border-white/50 flex items-center justify-center text-white font-semibold">
                  +{mediaWall.images.length - 3}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}