"use client";

import React from "react";
import Image from "next/image";
import { Check, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package } from "@/types";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";

interface PackageCardProps {
  package: Package;
  className?: string;
}

export function PackageCard({ package: pkg, className }: PackageCardProps) {
  return (
    <div
      className={cn(
        "group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col",
        pkg.popular && "ring-2 ring-lomash-primary",
        className
      )}
    >
      {/* Popular Badge */}
      {pkg.popular && (
        <div className="absolute top-4 right-4 z-10">
          <Badge variant="default" className="shadow-lg">
            <Star className="h-3 w-3 mr-1 fill-current" />
            Most Popular
          </Badge>
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-lomash-gray-100">
        <Image
          src={pkg.image || "/images/placeholder.jpg"}
          alt={pkg.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Price on Image */}
        {pkg.price && (
          <div className="absolute bottom-4 left-4 text-white">
            <p className="text-sm font-medium mb-1">Starting from</p>
            <p className="text-3xl font-bold">{formatCurrency(pkg.price)}</p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-xl font-bold text-lomash-dark mb-3 group-hover:text-lomash-primary transition-colors">
          {pkg.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-lomash-gray-600 mb-4 line-clamp-2">
          {pkg.description}
        </p>

        {/* Features */}
        <div className="space-y-2 mb-6 flex-1">
          {pkg.features.slice(0, 5).map((feature, index) => (
            <div key={index} className="flex items-start space-x-2">
              <Check className="h-5 w-5 text-lomash-primary shrink-0 mt-0.5" />
              <span className="text-sm text-lomash-gray-700">{feature}</span>
            </div>
          ))}
          {pkg.features.length > 5 && (
            <p className="text-sm text-lomash-gray-500 pl-7">
              +{pkg.features.length - 5} more features
            </p>
          )}
        </div>

        {/* CTA Button */}
        <Button className="w-full" size="lg">
          Learn More
        </Button>
      </div>
    </div>
  );
}