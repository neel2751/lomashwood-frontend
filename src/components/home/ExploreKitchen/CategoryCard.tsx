"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface CategoryCardProps {
  product: Product;
  className?: string;
}

export function CategoryCard({ product, className }: CategoryCardProps) {
  return (
    <Link href={`/product/${product.slug}?category=${product.category}`} className="group">
      <div
        className={cn(
          "product-card-pdf overflow-hidden hover:shadow-lg transition-all duration-300 rounded-lg",
          className
        )}
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-lomash-gray-100 rounded-t-lg">
          <Image
            src={product.images[0] || "/images/placeholder.jpg"}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110 rounded-t-lg"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
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
          <h3 className="font-bold tracking-normal text-xl text-lomash-dark mb-1 line-clamp-1 group-hover:text-lomash-primary transition-colors">
            {product.title}
          </h3>

          {/* Description */}
          {/* <p className="text-sm text-lomash-gray-600 mb-2 line-clamp-2">
            {product.description}
          </p> */}

          {/* Range Name */}
          <div className="flex items-center justify-between mt-2">
            {/* <p className="text-sm font-medium text-lomash-gray-700">
              {product.rangeName}
            </p> */}
            
            {/* View Details Link */}
            <span className="text-base text-lomash-primary font-semibold">
              View Details 
            </span>
              <ArrowRight className="ml-1 h-5 w-5 inline-block transition-transform group-hover:translate-x-1 group-hover:scale-110 group-hover:text-lomash-primary" />
          </div>
        </div>
      </div>
    </Link>
  );
}