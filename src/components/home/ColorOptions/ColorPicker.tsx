"use client";

import React from "react";
import Link from "next/link";
import { Colour } from "@/types";
import { cn } from "@/lib/utils";

interface ColorPickerProps {
  colour: Colour;
  className?: string;
}

export function ColorPicker({ colour, className }: ColorPickerProps) {
  return (
    <Link
      href={`/kitchen?colour=${colour.id}`}
      className={cn("group flex flex-col items-center", className)}
    >
      {/* Color Circle */}
      <div className="relative w-full aspect-square mb-2">
        <div
          className="w-full h-full rounded-lg shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:scale-110 border-2 border-lomash-gray-200 group-hover:border-lomash-primary"
          style={{ backgroundColor: colour.hexCode }}
        >
          {/* Checkered pattern for light/white colors */}
          {(colour.hexCode.toLowerCase() === "#ffffff" ||
            colour.hexCode.toLowerCase() === "#fff") && (
            <div
              className="absolute inset-0 rounded-lg opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(45deg, #ccc 25%, transparent 25%),
                  linear-gradient(-45deg, #ccc 25%, transparent 25%),
                  linear-gradient(45deg, transparent 75%, #ccc 75%),
                  linear-gradient(-45deg, transparent 75%, #ccc 75%)
                `,
                backgroundSize: "20px 20px",
                backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
              }}
            />
          )}
        </div>
      </div>

      {/* Color Name */}
      <p className="text-xs md:text-sm font-medium text-lomash-dark text-center line-clamp-2 group-hover:text-lomash-primary transition-colors">
        {colour.name}
      </p>
    </Link>
  );
}