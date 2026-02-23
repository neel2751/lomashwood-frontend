"use client";

import { RotateCw, Play, Pause, RotateCcw } from "lucide-react";
import Image from "next/image";
import type { MouseEvent, TouchEvent } from "react";
import { useState, useRef, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

import type { ProductImage } from "./index";

interface ThreeSixtyViewProps {
  images: ProductImage[];
  productName: string;
  frameCount?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  className?: string;
}

function ThreeSixtyView({
  images,
  productName,
  frameCount = 36,
  autoRotate = false,
  autoRotateSpeed = 100,
  className,
}: ThreeSixtyViewProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoRotate);
  const [dragStartX, setDragStartX] = useState(0);
  const [preloadedImages, setPreloadedImages] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null);

  const viewImages = images.filter((img) => !img.is360).slice(0, frameCount);
  const totalFrames = viewImages.length;

  useEffect(() => {
    const loadImages = async () => {
      const loadedUrls = await Promise.all(
        viewImages.map((img) => {
          return new Promise<string>((resolve) => {
            const imageObj = document.createElement("img");
            imageObj.onload = () => resolve(img.url);
            imageObj.onerror = () => resolve(img.url);
            imageObj.src = img.url;
          });
        })
      );
      setPreloadedImages(loadedUrls);
    };

    loadImages();
  }, [viewImages]);

  useEffect(() => {
    if (isPlaying && totalFrames > 0) {
      autoRotateRef.current = setInterval(() => {
        setCurrentFrame((prev) => (prev + 1) % totalFrames);
      }, autoRotateSpeed);
    } else if (autoRotateRef.current) {
      clearInterval(autoRotateRef.current);
      autoRotateRef.current = null;
    }

    return () => {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
      }
    };
  }, [isPlaying, totalFrames, autoRotateSpeed]);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setIsPlaying(false);
    setDragStartX(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || totalFrames === 0) return;

    const deltaX = e.clientX - dragStartX;
    const sensitivity = 5;
    const frameChange = Math.floor(deltaX / sensitivity);

    if (frameChange !== 0) {
      setCurrentFrame((prev) => {
        const newFrame = (prev + frameChange + totalFrames) % totalFrames;
        return newFrame;
      });
      setDragStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setIsPlaying(false);
      setDragStartX(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!isDragging || totalFrames === 0 || e.touches.length !== 1) return;

    const deltaX = e.touches[0].clientX - dragStartX;
    const sensitivity = 5;
    const frameChange = Math.floor(deltaX / sensitivity);

    if (frameChange !== 0) {
      setCurrentFrame((prev) => {
        const newFrame = (prev + frameChange + totalFrames) % totalFrames;
        return newFrame;
      });
      setDragStartX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleReset = () => {
    setCurrentFrame(0);
    setIsPlaying(false);
  };

  const handleSliderChange = (value: number[]) => {
    setCurrentFrame(value[0]);
    setIsPlaying(false);
  };

  if (totalFrames === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-lg bg-muted p-8">
        <div className="text-center">
          <RotateCw className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            360° view not available
          </p>
        </div>
      </div>
    );
  }

  const currentImage = viewImages[currentFrame];

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* 360 View Container */}
      <div
        ref={containerRef}
        className={cn(
          "relative aspect-square w-full overflow-hidden rounded-lg bg-muted",
          isDragging ? "cursor-grabbing" : "cursor-grab"
        )}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {preloadedImages.length > 0 ? (
          <Image
            src={currentImage.url}
            alt={`${productName} - 360° view frame ${currentFrame + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
            priority
            quality={90}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <RotateCw className="mx-auto mb-2 h-8 w-8 animate-spin text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Loading 360° view...</p>
            </div>
          </div>
        )}

        {/* Instructions Overlay */}
        {!isDragging && !isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100">
            <div className="text-center text-white">
              <RotateCw className="mx-auto mb-2 h-8 w-8" />
              <p className="text-sm font-medium">Drag to rotate</p>
            </div>
          </div>
        )}

        {/* Frame Counter */}
        <div className="absolute bottom-2 right-2 rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur-sm">
          {currentFrame + 1} / {totalFrames}
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {/* Slider */}
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground">0°</span>
          <Slider
            value={[currentFrame]}
            max={totalFrames - 1}
            step={1}
            onValueChange={handleSliderChange}
            className="flex-1"
          />
          <span className="text-xs text-muted-foreground">360°</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={togglePlayPause}
            className="gap-2"
          >
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Play
              </>
            )}
          </Button>

          <Button variant="outline" size="sm" onClick={handleReset} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>

        {/* Info */}
        <p className="text-center text-xs text-muted-foreground">
          Drag or use the slider to rotate • Click play for auto rotation
        </p>
      </div>
    </div>
  );
}

export default ThreeSixtyView;