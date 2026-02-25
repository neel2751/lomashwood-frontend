"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { apiClient } from "@/lib/api";
import { QUERY_KEYS } from "@/lib/react-query";

import { ColorPicker } from "./ColorPicker";

const coloursDemoData = [
  { id: "white", name: "White", hexCode: "#FFFFFF" },
  { id: "grey", name: "Grey", hexCode: "#808080" },
  { id: "black", name: "Black", hexCode: "#000000" },
  { id: "blue", name: "Blue", hexCode: "#0000FF" },
  { id: "red", name: "Red", hexCode: "#FF0000" },
  { id: "green", name: "Green", hexCode: "#00FF00" },
  { id: "yellow", name: "Yellow", hexCode: "#FFFF00" },
  { id: "purple", name: "Purple", hexCode: "#800080" },
  { id: "orange", name: "Orange", hexCode: "#FFA500" },
  { id: "pink", name: "Pink", hexCode: "#FFC0CB" },
  { id: "brown", name: "Brown", hexCode: "#A52A2A" },
  { id: "cyan", name: "Cyan", hexCode: "#00FFFF" },
  { id: "magenta", name: "Magenta", hexCode: "#FF00FF" },
  { id: "lime", name: "Lime", hexCode: "#00FF00" },
  { id: "navy", name: "Navy", hexCode: "#000080" },
  { id: "teal", name: "Teal", hexCode: "#008080" },
  { id: "olive", name: "Olive", hexCode: "#808000" },
  { id: "maroon", name: "Maroon", hexCode: "#800000" },
  { id: "silver", name: "Silver", hexCode: "#C0C0C0" },
  { id: "gold", name: "Gold", hexCode: "#FFD700" },
];


export function ColorOptions() {
  const { data: coloursData, isLoading } = useQuery({
    queryKey: QUERY_KEYS.colours.all,
    queryFn: () => apiClient.colours.getAll(),
  });

  const colours = coloursData?.data || coloursDemoData;

  return (
    <section className="section-padding bg-white
     px-6 sm:px-10 lg:px-18
    pt-12 md:pt-16 lg:pt-20
    pb-16 md:pb-20 lg:pb-24
    ">
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