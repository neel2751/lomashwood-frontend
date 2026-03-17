"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import type { Colour } from "@/types";

interface ColorPickerProps {
  colour: Colour;
  className?: string;
}

export function ColorPicker({ colour, className }: ColorPickerProps) {
  const colourQueryValue = colour.name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

  return (
    <Link
      href={`/kitchen?colour=${encodeURIComponent(colourQueryValue)}`}
      className={cn("group flex flex-col items-center", className)}
    >
      {/* Color Circle */}
      <div className="relative w-24 h-24 mb-2">
        <div
          className="w-full h-full rounded-full shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:scale-110 border-2 border-slate-200 group-hover:border-green-600 ring-2 ring-green-600/20"
          style={{ backgroundColor: colour.hexCode }}
        >
          {/* Checkered pattern for light/white colors */}
          {(colour.hexCode.toLowerCase() === "#ffffff" ||
            colour.hexCode.toLowerCase() === "#fff") && (
            <div
              className="absolute inset-0 rounded-full opacity-10"
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
      <p className="text-xs md:text-sm font-medium text-slate-900 text-center line-clamp-2 group-hover:text-green-600 transition-colors">
        {colour.name}
      </p>
    </Link>
  );
}