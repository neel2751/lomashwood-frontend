"use client";

import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";

import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  slug: string;
  image: string;
  images: string[];
  category: string;
  style: string;
  finish: string;
  priceRange: {
    min: number;
    max: number;
  };
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
}

interface RelatedProductsProps {
  productId: string;
  category?: string;
  style?: string;
  maxItems?: number;
  title?: string;
  className?: string;
}

export default function RelatedProducts({
  productId,
  category,
  style,
  maxItems = 8,
  title = "You May Also Like",
  className,
}: RelatedProductsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["relatedProducts", productId, category, style],
    queryFn: async () => {
      const params = new URLSearchParams({
        productId,
        limit: maxItems.toString(),
        ...(category && { category }),
        ...(style && { style }),
      });

      const response = await fetch(`/api/products/related?${params}`);
      if (!response.ok) {
        throw new Error("Failed to fetch related products");
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
  });

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener("resize", checkScrollButtons);
    return () => window.removeEventListener("resize", checkScrollButtons);
  }, [products]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });

      setTimeout(checkScrollButtons, 300);
    }
  };

  if (isLoading) {
    return (
      <section className={cn("space-y-6", className)}>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-0">
                <Skeleton className="aspect-square w-full" />
                <div className="space-y-2 p-4">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-6 w-1/3" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>

        {/* Desktop Navigation */}
        <div className="hidden gap-2 md:flex">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="h-9 w-9"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Scroll left</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="h-9 w-9"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Scroll right</span>
          </Button>
        </div>
      </div>

      {/* Mobile: Grid View */}
      <div className="grid grid-cols-2 gap-4 md:hidden">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Desktop: Scrollable View */}
      <div className="relative hidden md:block">
        {/* Left Gradient */}
        {canScrollLeft && (
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-background to-transparent" />
        )}

        {/* Right Gradient */}
        {canScrollRight && (
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-background to-transparent" />
        )}

        <div
          ref={scrollContainerRef}
          onScroll={checkScrollButtons}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-[280px] flex-shrink-0 lg:w-[300px]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* View All Button (Mobile) */}
      {products.length > 4 && (
        <div className="flex justify-center md:hidden">
          <Button variant="outline" asChild>
            <a href={`/${category || "products"}`}>View All Products</a>
          </Button>
        </div>
      )}
    </section>
  );
}