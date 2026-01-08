"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "./ColorPicker";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { QUERY_KEYS } from "@/lib/react-query";
import { Skeleton } from "@/components/ui/skeleton";

export function ColorOptions() {
  const { data: coloursData, isLoading } = useQuery({
    queryKey: QUERY_KEYS.colours.all,
    queryFn: () => apiClient.colours.getAll(),
  });

  const colours = coloursData?.data || [];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="heading-2 text-lomash-dark mb-4">
            Colour Options
          </h2>
          <p className="text-lg text-lomash-gray-600 max-w-2xl mx-auto">
            Choose from our extensive range of premium colours to create your perfect kitchen or bedroom
          </p>
        </div>

        {/* Colors Grid */}
        {isLoading ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4 md:gap-6">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="w-full aspect-square rounded-lg" />
                <Skeleton className="h-3 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4 md:gap-6">
            {colours.slice(0, 20).map((colour) => (
              <ColorPicker key={colour.id} colour={colour} />
            ))}
          </div>
        )}

        {/* CTA Button */}
        <div className="mt-10 flex justify-center">
          <Link href="/kitchen">
            <Button size="lg" variant="outline" className="group">
              View All Colours
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}