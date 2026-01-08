"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  product: Product;
  className?: string;
}

export function CategoryCard({ product, className }: CategoryCardProps) {
  return (
    <Link href={`/product/${product.id}`} className="group">
      <div
        className={cn(
          "product-card-pdf overflow-hidden hover:shadow-lg transition-all duration-300",
          className
        )}
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-lomash-gray-100">
          <Image
            src={product.images[0] || "/images/placeholder.jpg"}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.featured && (
              <Badge variant="default" className="shadow-md">
                Featured
              </Badge>
            )}
            {product.popular && (
              <Badge variant="accent" className="shadow-md">
                Popular
              </Badge>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Style Badge */}
          {product.style && (
            <p className="text-xs font-medium text-lomash-primary uppercase tracking-wider mb-2">
              {product.style}
            </p>
          )}

          {/* Title */}
          <h3 className="font-semibold text-lomash-dark mb-1 line-clamp-1 group-hover:text-lomash-primary transition-colors">
            {product.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-lomash-gray-600 mb-2 line-clamp-2">
            {product.description}
          </p>

          {/* Range Name */}
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-lomash-gray-700">
              {product.rangeName}
            </p>
            
            {/* View Details Link */}
            <span className="text-sm text-lomash-primary font-medium group-hover:underline">
              View Details
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}