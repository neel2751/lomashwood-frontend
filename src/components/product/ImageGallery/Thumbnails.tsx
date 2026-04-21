"use client";

import { RotateCw } from "lucide-react";
import Image from "next/image";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

import type { ProductImage } from "./index";

interface ThumbnailsProps {
  images: ProductImage[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  productName: string;
  className?: string;
}

export default function Thumbnails({
  images,
  selectedIndex,
  onSelect,
  productName,
  className,
}: ThumbnailsProps) {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <ScrollArea className={cn("w-full", className)}>
      <div className="flex gap-2 pb-2">
        {images.map((image, index) => {
          const isSelected = index === selectedIndex;

          return (
            <button
              key={image.id || index}
              onClick={() => onSelect(index)}
              className={cn(
                "group relative flex-shrink-0 overflow-hidden rounded-md border-2 transition-all",
                "hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isSelected
                  ? "border-primary ring-2 ring-primary ring-offset-2"
                  : "border-border"
              )}
              aria-label={`View image ${index + 1}`}
              aria-pressed={isSelected}
            >
              <div className="relative h-40 w-40 bg-muted">
                {image.is360 ? (
                  // 360 View Indicator
                  <div className="flex h-full w-full items-center justify-center">
                    <RotateCw className="h-8 w-8 text-muted-foreground" />
                  </div>
                ) : (
                  <Image
                    src={image.url}
                    alt={image.alt || `${productName} thumbnail ${index + 1}`}
                    fill
                    className={cn(
                      "object-cover transition-all duration-200",
                      isSelected
                        ? "scale-105"
                        : "group-hover:scale-110 group-hover:opacity-90"
                    )}
                    sizes="80px"
                  />
                )}

                {/* Overlay on hover */}
                {!isSelected && (
                  <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                )}

                {/* 360 Badge */}
                {image.is360 && (
                  <div className="absolute bottom-1 right-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-white">
                    360°
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}