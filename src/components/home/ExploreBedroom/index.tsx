"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryCard } from "./CategoryCard";
import { useFeaturedProducts } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";

export function ExploreBedroom() {
  const { data: products, isLoading } = useFeaturedProducts("bedroom");

  return (
    <section className="section-padding bg-lomash-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <div>
            <h2 className="heading-2 text-lomash-dark mb-2">
              Explore Bedroom
            </h2>
            <p className="text-lg text-lomash-gray-600">
              All bedrooms come from the backend
            </p>
          </div>
          <Link href="/bedroom" className="hidden md:block">
            <Button variant="outline" size="lg" className="group">
              View All Bedrooms
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Bedroom Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-64 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products?.slice(0, 8).map((product) => (
              <CategoryCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Mobile View All Button */}
        <div className="mt-8 flex justify-center md:hidden">
          <Link href="/bedroom">
            <Button size="lg" className="w-full sm:w-auto group">
              View All Bedrooms
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}