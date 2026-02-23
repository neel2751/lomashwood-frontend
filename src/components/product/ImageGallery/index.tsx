"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import MainImage from "./MainImage";
import Thumbnails from "./Thumbnails";

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  is360?: boolean;
}

interface ImageGalleryProps {
  images: ProductImage[];
  productName: string;
  className?: string;
}

export default function ImageGallery({
  images,
  productName,
  className,
}: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className={cn("space-y-4", className)}>
        <div className="aspect-square w-full rounded-lg bg-muted flex items-center justify-center">
          <p className="text-muted-foreground">No images available</p>
        </div>
      </div>
    );
  }

  const currentImage = images[selectedIndex];

  return (
    <div className={cn("space-y-4", className)}>
      {/* Main Image */}
      <MainImage
        image={currentImage}
        productName={productName}
        allImages={images}
        currentIndex={selectedIndex}
        onIndexChange={setSelectedIndex}
      />

      {/* Thumbnails */}
      {images.length > 1 && (
        <Thumbnails
          images={images}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
          productName={productName}
        />
      )}
    </div>
  );
}