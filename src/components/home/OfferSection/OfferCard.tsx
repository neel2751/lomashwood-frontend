"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sale } from "@/types";
import { cn } from "@/lib/utils";

interface OfferCardProps {
  sale: Sale;
  className?: string;
}

export function OfferCard({ sale, className }: OfferCardProps) {
  // Calculate days remaining if validUntil exists
  const daysRemaining = sale.validUntil
    ? Math.ceil(
        (new Date(sale.validUntil).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : null;

  return (
    <div
      className={cn(
        "group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300",
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-lomash-gray-100">
        <Image
          src={sale.image || "/images/placeholder.jpg"}
          alt={sale.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Discount Badge */}
        {sale.discount && (
          <div className="absolute top-4 right-4">
            <Badge
              variant="destructive"
              className="text-lg px-4 py-2 shadow-lg"
            >
              <Tag className="h-4 w-4 mr-1" />
              {sale.discount}% OFF
            </Badge>
          </div>
        )}

        {/* Featured Badge */}
        {sale.featured && (
          <div className="absolute top-4 left-4">
            <Badge variant="accent" className="shadow-md">
              Featured
            </Badge>
          </div>
        )}

        {/* Time Remaining */}
        {daysRemaining !== null && daysRemaining > 0 && (
          <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-2 rounded-lg flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium">
              {daysRemaining} {daysRemaining === 1 ? "day" : "days"} left
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Categories */}
        <div className="flex items-center space-x-2 mb-3">
          {sale.categories.map((category) => (
            <Badge key={category} variant="secondary" className="text-xs">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Badge>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-lomash-dark mb-2 line-clamp-2 group-hover:text-lomash-primary transition-colors">
          {sale.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-lomash-gray-600 mb-4 line-clamp-3">
          {sale.description}
        </p>

        {/* CTA Button */}
        <Link href={`/sale#${sale.id}`}>
          <Button className="w-full group/btn">
            View Offer Details
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}