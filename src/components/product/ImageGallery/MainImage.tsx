"use client";

import { ChevronLeft, ChevronRight, Maximize2, RotateCw } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import ThreeSixtyView from "./ThreeSixtyView";
import ZoomImage from "./ZoomImage";

import type { ProductImage } from "./index";

interface MainImageProps {
  image: ProductImage;
  productName: string;
  allImages: ProductImage[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  className?: string;
}

export default function MainImage({
  image,
  productName,
  allImages,
  currentIndex,
  onIndexChange,
  className,
}: MainImageProps) {
  const [showFullscreen, setShowFullscreen] = useState(false);

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : allImages.length - 1;
    onIndexChange(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex < allImages.length - 1 ? currentIndex + 1 : 0;
    onIndexChange(newIndex);
  };

  if (image.is360) {
    return (
      <div className={cn("relative", className)}>
        <ThreeSixtyView images={allImages} productName={productName} />
      </div>
    );
  }

  return (
    <div className={cn("relative group", className)}>
      {/* Main Image Container */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted">
        <Image
          src={image.url}
          alt={image.alt || `${productName} - Image ${currentIndex + 1}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
          priority={currentIndex === 0}
          quality={90}
        />

        {/* Navigation Arrows */}
        {allImages.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
              onClick={handlePrevious}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="secondary"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
              onClick={handleNext}
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {/* Action Buttons */}
        <div className="absolute right-2 top-2 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          {/* Zoom Button */}
          <Dialog open={showFullscreen} onOpenChange={setShowFullscreen}>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="h-9 w-9"
                aria-label="View fullscreen"
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-7xl p-0">
              <ZoomImage
                image={image}
                productName={productName}
                allImages={allImages}
                currentIndex={currentIndex}
                onIndexChange={onIndexChange}
              />
            </DialogContent>
          </Dialog>

          {/* 360 View Indicator */}
          {allImages.some((img) => img.is360) && (
            <Button
              variant="secondary"
              size="icon"
              className="h-9 w-9"
              onClick={() => {
                const index360 = allImages.findIndex((img) => img.is360);
                if (index360 !== -1) {
                  onIndexChange(index360);
                }
              }}
              aria-label="360 degree view"
            >
              <RotateCw className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Image Counter */}
        {allImages.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur-sm">
            {currentIndex + 1} / {allImages.length}
          </div>
        )}
      </div>

      {/* Image Alt Text for Accessibility */}
      <span className="sr-only">
        {image.alt || `${productName} product image ${currentIndex + 1}`}
      </span>
    </div>
  );
}