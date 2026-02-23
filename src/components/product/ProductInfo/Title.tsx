"use client";

import { Package, Tag } from "lucide-react";

import { Badge } from "@/components/ui/badge";

interface TitleProps {
  name: string;
  category?: string;
  sku?: string;
  inStock?: boolean;
}

export default function Title({ name, category, sku, inStock = true }: TitleProps) {
  return (
    <div className="space-y-3">
      {/* Category Badge */}
      {category && (
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs font-normal">
            {category}
          </Badge>
        </div>
      )}

      {/* Product Name */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
        {name}
      </h1>

      {/* SKU and Stock Status */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm">
        {/* SKU */}
        {sku && (
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Tag className="h-4 w-4" />
            <span className="font-medium">SKU:</span>
            <span>{sku}</span>
          </div>
        )}

        {/* Stock Status */}
        <div className="flex items-center gap-1.5">
          <Package className="h-4 w-4" />
          {inStock ? (
            <span className="text-green-600 font-medium">In Stock</span>
          ) : (
            <span className="text-red-600 font-medium">Out of Stock</span>
          )}
        </div>
      </div>
    </div>
  );
}