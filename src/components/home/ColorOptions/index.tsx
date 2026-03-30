"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { ColorPicker } from "./ColorPicker";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface FeaturedColour {
  id: string;
  name: string;
  hexCode: string;
}

export function ColorOptions() {
  const { data: coloursData, isLoading } = useQuery<FeaturedColour[]>({
    queryKey: ["featured-colours"],
    queryFn: async () => {
      const response = await fetch('/api/featured-colours', {
        method: 'GET',
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      });

      if (!response.ok) {
        return [];
      }

      const payload = await response.json();
      return Array.isArray(payload?.data) ? payload.data : [];
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const colours = Array.isArray(coloursData) ? coloursData : [];

  return (
    <section className="w-full bg-gradient-to-br from-[#E8F3F5] via-[#F1F9FB] to-[#E8F3F5] py-16 md:py-24 lg:py-32">
      <div className="container-custom px-6 sm:px-10 lg:px-18">
        {/* Section Header */}
        <div className="mb-8 md:mb-12 lg:mb-16">
          {/* ✅ Removed font-serif — now matches ExploreBedroom bold sans-serif style */}
          <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            Explore kitchens by colour
          </h2>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed">
            Explore our kitchen collections and discover unrivalled quality
          </p>
          <div className="mt-6 h-1 w-16 bg-gradient-to-r from-green-600 to-transparent" />
        </div>

        {/* Colors Grid */}
        {isLoading ? (
          <div className="flex gap-6 md:gap-8 overflow-x-auto pb-6 md:pb-0">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex-shrink-0">
                <Skeleton className="w-24 h-24 md:w-28 md:h-28 rounded-full" />
                <Skeleton className="h-3 w-20 mt-4 mx-auto" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-6 md:gap-8 justify-start md:justify-center">
            {colours.slice(0, 11).map((colour) => (
              <ColorPicker key={colour.id} colour={colour} />
            ))}
          </div>
        )}

        {/* Divider */}
        <div className="my-10 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent md:my-12" />

        {/* CTA Button */}
        <div className="flex justify-center">
          <Link href="/kitchen">
            <Button 
              size="lg" 
              variant="outline" 
              className="rounded-full px-8 font-medium transition-all duration-300
                hover:bg-lomash-primary hover:text-white hover:border-lomash-primary">
              View All Colours
              <span className="ml-2">→</span>
            </Button>
          </Link>
        </div>

        {!isLoading && colours.length === 0 && (
          <div className="text-center py-8">
            <p className="text-base text-slate-600">No featured colours available right now.</p>
          </div>
        )}
      </div>
    </section>
  );
}