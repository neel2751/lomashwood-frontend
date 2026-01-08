"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PackageCard } from "./PackageCard";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { QUERY_KEYS } from "@/lib/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import Autoplay from "embla-carousel-autoplay";

export function PackageSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 4500, stopOnInteraction: true })
  );

  const { data: packagesData, isLoading } = useQuery({
    queryKey: QUERY_KEYS.packages.all,
    queryFn: () => apiClient.packages.getAll(),
  });

  const packages = packagesData?.data || [];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <div>
            <h2 className="heading-2 text-lomash-dark mb-2">
              Kitchen & Bedroom Packages
            </h2>
            <p className="text-lg text-lomash-gray-600">
              Complete solutions tailored to your needs
            </p>
          </div>
          <Link href="/sale" className="hidden md:block">
            <Button variant="outline" size="lg" className="group">
              View All Packages
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Packages Carousel */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-96 w-full rounded-lg" />
              </div>
            ))}
          </div>
        ) : (
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
            <CarouselContent className="-ml-4">
              {packages.map((pkg) => (
                <CarouselItem
                  key={pkg.id}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <PackageCard package={pkg} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-4" />
            <CarouselNext className="hidden md:flex -right-4" />
          </Carousel>
        )}

        {/* Mobile View All Button */}
        <div className="mt-8 flex justify-center md:hidden">
          <Link href="/sale">
            <Button size="lg" className="w-full sm:w-auto group">
              View All Packages
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}