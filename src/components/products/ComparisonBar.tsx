"use client";

import { X, ArrowRight, Scale } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product.types";

interface ComparisonBarProps {
  products: Product[];
  onRemove: (productId: string) => void;
  onClear: () => void;
  maxProducts?: number;
  className?: string;
}

export default function ComparisonBar({
  products,
  onRemove,
  onClear,
  maxProducts = 4,
  className,
}: ComparisonBarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (products.length === 0) {
    return null;
  }

  const remainingSlots = maxProducts - products.length;

  const getImageUrl = (product: Product): string => {
    if (!product.images || product.images.length === 0) {
      return "/images/products/placeholder.jpg";
    }
    
    const firstImage = product.images[0];

    if (typeof firstImage === 'string') {
      return firstImage;
    } else if (firstImage && typeof firstImage === 'object' && 'url' in firstImage) {
      return (firstImage as any).url;
    } else if (firstImage && typeof firstImage === 'object' && 'src' in firstImage) {
      return (firstImage as any).src;
    }
    
    return "/images/products/placeholder.jpg";
  };

  const getCategoryName = (product: Product): string => {
    if (!product.category) return "";
    
    if (typeof product.category === 'string') {
      return product.category;
    } else if (product.category && typeof product.category === 'object' && 'name' in product.category) {
      return (product.category as any).name;
    }
    
    return "";
  };

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 border-t bg-background shadow-lg transition-transform duration-300",
        isCollapsed && "translate-y-[calc(100%-3rem)]",
        className
      )}
    >
      {/* Collapse/Expand Header */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-accent"
      >
        <div className="flex items-center gap-3">
          <Scale className="h-5 w-5 text-primary" />
          <span className="font-semibold">
            Compare Products ({products.length}/{maxProducts})
          </span>
          {remainingSlots > 0 && (
            <Badge variant="secondary" className="text-xs">
              Add {remainingSlots} more
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          {products.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
              className="text-xs"
            >
              Clear all
            </Button>
          )}
          <ArrowRight
            className={cn(
              "h-4 w-4 transition-transform",
              isCollapsed ? "rotate-90" : "-rotate-90"
            )}
          />
        </div>
      </button>

      {/* Product Comparison Content */}
      <div className="max-h-[300px] overflow-y-auto border-t">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {/* Selected Products */}
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col gap-2 rounded-lg border bg-card p-3 transition-colors hover:border-primary"
              >
                {/* Remove Button */}
                <button
                  onClick={() => onRemove(product.id)}
                  className="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-background/80 opacity-0 shadow-sm transition-opacity hover:bg-destructive hover:text-destructive-foreground group-hover:opacity-100"
                  aria-label={`Remove ${product.name} from comparison`}
                >
                  <X className="h-3 w-3" />
                </button>

                {/* Product Image */}
                <div className="relative aspect-square w-full overflow-hidden rounded-md bg-muted">
                  <Image
                    src={getImageUrl(product)}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>

                {/* Product Info */}
                <div className="space-y-1">
                  <h4 className="line-clamp-2 text-sm font-medium leading-tight">
                    {product.name}
                  </h4>
                  {product.price && (
                    <p className="text-sm font-semibold text-primary">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>
                  )}
                  {product.category && (
                    <p className="text-xs text-muted-foreground capitalize">
                      {getCategoryName(product)}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Empty Slots */}
            {Array.from({ length: remainingSlots }).map((_, index) => (
              <div
                key={`empty-${index}`}
                className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-muted/20 p-3 text-center"
              >
                <Scale className="h-8 w-8 text-muted-foreground/40" />
                <p className="text-xs text-muted-foreground">
                  Add product to compare
                </p>
              </div>
            ))}
          </div>

          {/* Compare Button */}
          {products.length >= 2 && (
            <>
              <Separator className="my-4" />
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Select at least 2 products to compare
                </p>
                <Button asChild size="lg">
                  <Link href={`/compare?ids=${products.map((p) => p.id).join(",")}`}>
                    <Scale className="mr-2 h-4 w-4" />
                    Compare Now
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Info Message */}
      {products.length === maxProducts && (
        <div className="border-t bg-muted/50 px-4 py-2">
          <p className="text-center text-xs text-muted-foreground">
            Maximum of {maxProducts} products can be compared at once
          </p>
        </div>
      )}
    </div>
  );
}