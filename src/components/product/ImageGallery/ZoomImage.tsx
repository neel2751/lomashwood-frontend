"use client";

import { ChevronLeft, ChevronRight,ZoomIn, ZoomOut } from "lucide-react";
import Image from "next/image";
import type { MouseEvent, TouchEvent } from "react";
import { useState, useRef } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { ProductImage } from "./index";

interface ZoomImageProps {
  image: ProductImage;
  productName: string;
  allImages: ProductImage[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  className?: string;
}

export default function ZoomImage({
  image,
  productName,
  allImages,
  currentIndex,
  onIndexChange,
  className,
}: ZoomImageProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setScale((prev) => {
      const newScale = Math.max(prev - 0.5, 1);
      if (newScale === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return newScale;
    });
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (scale > 1 && e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    }
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (isDragging && scale > 1 && e.touches.length === 1) {
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : allImages.length - 1;
    onIndexChange(newIndex);
    handleReset();
  };

  const handleNext = () => {
    const newIndex = currentIndex < allImages.length - 1 ? currentIndex + 1 : 0;
    onIndexChange(newIndex);
    handleReset();
  };

  return (
    <div className={cn("relative flex h-full w-full flex-col", className)}>
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b bg-background p-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            {currentIndex + 1} / {allImages.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom Controls */}
          <Button
            variant="outline"
            size="icon"
            onClick={handleZoomOut}
            disabled={scale <= 1}
            aria-label="Zoom out"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>

          <span className="min-w-[3rem] text-center text-sm">
            {Math.round(scale * 100)}%
          </span>

          <Button
            variant="outline"
            size="icon"
            onClick={handleZoomIn}
            disabled={scale >= 3}
            aria-label="Zoom in"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>

          {scale > 1 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="ml-2"
            >
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Image Container */}
      <div className="relative flex-1 overflow-hidden bg-muted">
        <div
          ref={imageRef}
          className={cn(
            "relative h-full w-full",
            scale > 1 ? "cursor-move" : "cursor-zoom-in"
          )}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={() => {
            if (scale === 1) handleZoomIn();
          }}
        >
          <div
            className="relative h-full w-full transition-transform"
            style={{
              transform: `scale(${scale}) translate(${position.x / scale}px, ${
                position.y / scale
              }px)`,
              transformOrigin: "center center",
            }}
          >
            <Image
              src={image.url}
              alt={image.alt || `${productName} - Zoomed view`}
              fill
              className="object-contain"
              sizes="100vw"
              quality={100}
              priority
            />
          </div>
        </div>

        {/* Navigation Arrows */}
        {allImages.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2"
              onClick={handlePrevious}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <Button
              variant="secondary"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2"
              onClick={handleNext}
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}

        {/* Instructions */}
        {scale === 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-lg bg-black/70 px-4 py-2 text-sm text-white backdrop-blur-sm">
            Click to zoom • Drag to pan when zoomed
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto border-t bg-background p-4">
          {allImages.map((img, index) => (
            <button
              key={img.id || index}
              onClick={() => {
                onIndexChange(index);
                handleReset();
              }}
              className={cn(
                "relative h-16 w-16 flex-shrink-0 overflow-hidden rounded border-2 transition-all",
                index === currentIndex
                  ? "border-primary ring-2 ring-primary ring-offset-2"
                  : "border-border hover:border-primary"
              )}
            >
              <Image
                src={img.url}
                alt={img.alt || `Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}