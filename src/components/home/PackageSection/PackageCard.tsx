"use client";

import { Check, Star } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Package } from "@/types";

interface PackageCardProps {
  package: Package;
  className?: string;
}

export function PackageCard({ package: pkg, className }: PackageCardProps) {

  const normalizeFilterValue = (input: string) =>
    input
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  return (
    <div
      className={cn(
        "group relative bg-white rounded-lg overflow-hidden group hover:shadow-xl transition-all duration-300 h-full flex flex-col cursor-pointer",
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

        {/* Overlay Gradient - Media Wall Style */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col bg-white group-hover:bg-gray-50 transition-colors">
        {/* Title */}
        <h3 className="text-xl font-bold text-lomash-dark mb-3 group-hover:text-lomash-primary transition-colors duration-200">
          {pkg.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-lomash-gray-600 mb-4 line-clamp-2 group-hover:text-lomash-gray-700 transition-colors duration-200">
          {pkg.description}
        </p>

        {/* Features */}
        <div className="space-y-2 mb-6 flex-1">
          {pkg.features.slice(0, 5).map((feature, index) => (
            <div key={index} className="flex items-start space-x-2 group-hover:translate-x-1 transition-transform duration-200" style={{ transitionDelay: `${index * 30}ms` }}>
              <Check className="h-5 w-5 text-lomash-primary shrink-0 mt-0.5 group-hover:scale-125 transition-transform duration-200" />
              <span className="text-sm text-lomash-gray-700 group-hover:text-lomash-gray-800 transition-colors duration-200">{feature}</span>
            </div>
          ))}
          {pkg.features.length > 5 && (
            <p className="text-sm text-lomash-gray-500 pl-7 group-hover:text-lomash-gray-600 transition-colors duration-200">
              +{pkg.features.length - 5} more features
            </p>
          )}
        </div>

        {/* CTA Button two buttons kitchen package & bedroom package */}
 <div className="flex flex-col sm:flex-row items-center justify-center mt-10 gap-4">
            <Link
              href={`/kitchen?package=${normalizeFilterValue(pkg.title)}`}
              className="inline-flex items-center gap-2 px-6 py-2 bg-lomash-primary text-white font-medium rounded-full hover:bg-lomash-primary-dark transition-colors"
            >Kitchen Packages
            </Link>
            <Link
              href={`/bedroom?package=${normalizeFilterValue(pkg.title)}`}
              className="inline-flex items-center gap-2 px-6 py-2 bg-lomash-secondary text-white font-medium rounded-full hover:bg-lomash-secondary-dark transition-colors"
            >Bedroom Packages
            </Link>
          </div>
      </div>
    </div>
  );
}