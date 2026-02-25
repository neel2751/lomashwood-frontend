"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useFeaturedProducts } from "@/hooks/useProducts";

import { CategoryCard } from "./CategoryCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";


const productDemoData = [
  {
    id: "1",
    slug: "cambridge-shaker-kitchen",
    title: "Cambridge Shaker Kitchen",
    description: "A classic shaker style kitchen with a modern twist. Featuring clean lines, soft-close drawers, and a range of finishes to suit any home.",
    images: ["https://plus.unsplash.com/premium_photo-1683140941523-f1fbbabe54d5?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    category: "kitchen" as const,
    rangeName: "Cambridge",
    style: "Traditional",
    colours: [{id: "white", name: "White", hexCode: "#FFFFFF" }, { id: "grey", name: "Grey", hexCode: "#808080" }, { id: "blue", name: "Blue", hexCode: "#0000FF" }],
    featured: true,
    popular: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    slug: "oslo-matt-graphite-kitchen",
    title: "Oslo Matt Graphite Kitchen",
    description: "A sleek, contemporary kitchen with a matte graphite finish. Designed for modern homes with clean lines and minimalist aesthetics.",
    style: "Contemporary",
    category: "kitchen" as const,
    rangeName: "Oslo",
    colours: [{ id: "black", name: "Black", hexCode: "#000000" }, { id: "white", name: "White", hexCode: "#FFFFFF" }, { id: "grey", name: "Grey", hexCode: "#808080" }],
    images: ["https://plus.unsplash.com/premium_photo-1683140941523-f1fbbabe54d5?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    featured: false,
    popular: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    slug: "milano-handleless-gloss-kitchen",
    title: "Milano Handleless Gloss Kitchen",
    description: "A modern kitchen with handleless gloss finishes. Perfect for contemporary homes seeking a clean, minimalist look.", 
    style: "Modern",
    category: "kitchen" as const,
    rangeName: "Milano",
      colours: [{ id: "white", name: "White", hexCode: "#FFFFFF" }, { id: "grey", name: "Grey", hexCode: "#808080" }, { id: "black", name: "Black", hexCode: "#000000" }],
    images: ["https://plus.unsplash.com/premium_photo-1683140941523-f1fbbabe54d5?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    featured: true,
    popular: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    slug: "cambridge-shaker-kitchen-2",
    title: "Cambridge Shaker Kitchen",
    description: "A classic shaker style kitchen with a modern twist. Featuring clean lines, soft-close drawers, and a range of finishes to suit any home.",
    style: "Traditional",
    category: "kitchen" as const,
    rangeName: "Cambridge",
      colours: [{ id: "white", name: "White", hexCode: "#FFFFFF" }, { id: "grey", name: "Grey", hexCode: "#808080" }, { id: "blue", name: "Blue", hexCode: "#0000FF" }],
    images: ["https://plus.unsplash.com/premium_photo-1683140941523-f1fbbabe54d5?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    featured: false,
    popular: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    slug: "oslo-matt-graphite-kitchen-2",
    title: "Oslo Matt Graphite Kitchen",
    description: "A sleek, contemporary kitchen with a matte graphite finish. Designed for modern homes with clean lines and minimalist aesthetics.",
    style: "Contemporary",
    category: "kitchen" as const,
    rangeName: "Oslo",
      colours: [{ id: "black", name: "Black", hexCode: "#000000" }, { id: "white", name: "White", hexCode: "#FFFFFF" }, { id: "grey", name: "Grey", hexCode: "#808080" }],
    images: ["https://plus.unsplash.com/premium_photo-1683140941523-f1fbbabe54d5?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    featured: false,
    popular: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "6",
    slug: "milano-handleless-gloss-kitchen-2",
    title: "Milano Handleless Gloss Kitchen",
    description: "A modern kitchen with handleless gloss finishes. Perfect for contemporary homes seeking a clean, minimalist look.",
    style: "Modern",
    category: "kitchen" as const,
    rangeName: "Milano",
      colours: [{ id: "white", name: "White", hexCode: "#FFFFFF" }, { id: "grey", name: "Grey", hexCode: "#808080" }, { id: "black", name: "Black", hexCode: "#000000" }],
    images: ["https://plus.unsplash.com/premium_photo-1683140941523-f1fbbabe54d5?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    featured: true,
    popular: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "7",
    slug: "cambridge-shaker-kitchen-3",
    title: "Cambridge Shaker Kitchen",
    description: "A classic shaker style kitchen with a modern twist. Featuring clean lines, soft-close drawers, and a range of finishes to suit any home.",
    style: "Traditional",
    category: "kitchen" as const,
    rangeName: "Cambridge",
    colours: [{ id: "white", name: "White", hexCode: "#FFFFFF" }, { id: "grey", name: "Grey", hexCode: "#808080" }, { id: "blue", name: "Blue", hexCode: "#0000FF" }],
    images: ["https://plus.unsplash.com/premium_photo-1683140941523-f1fbbabe54d5?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    featured: false,
    popular: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "8",
    slug: "oslo-matt-graphite-kitchen-3",
    title: "Oslo Matt Graphite Kitchen",
    description: "A sleek, contemporary kitchen with a matte graphite finish. Designed for modern homes with clean lines and minimalist aesthetics.",
    style: "Contemporary",
    category: "kitchen" as const,
    rangeName: "Oslo",
    colours: [{ id: "black", name: "Black", hexCode: "#000000" }, { id: "white", name: "White", hexCode: "#FFFFFF" }, { id: "grey", name: "Grey", hexCode: "#808080" }],
    images: ["https://plus.unsplash.com/premium_photo-1683140941523-f1fbbabe54d5?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    featured: true,
    popular: true,
    createdAt: new Date().toISOString(),
  },
];


export function ExploreKitchen() {
  const { data: products, isLoading } = useFeaturedProducts("kitchen");

    const productData = products && products.length > 0 ? products : productDemoData;

  return (
    <section className="section-padding bg-white 
   px-6 sm:px-10 lg:px-18
    pt-12 md:pt-16 lg:pt-20
    pb-16 md:pb-20 lg:pb-24
    ">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <div>
            <h2 className="heading-2 text-lomash-dark mb-2">
              Explore Kitchen
            </h2>
            <p className="text-lg text-lomash-gray-600">
              All kitchens come from the backend
            </p>
          </div>
          <Link href="/kitchen" className="hidden md:block">
            <Button variant="outline" size="lg" className="group">
              View All Kitchens
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>


        {/* Kitchen Grid */}
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
          // We have to use the swiper 

          <Carousel
          opts={{
            align:"start"
          }}

          >
            <CarouselContent>
              {Array.isArray(productData) && productData.slice(0, 8).map((product, index) => (
<CarouselItem key={index} className="basis-1/2 lg:basis-1/3 pb-2">
  <CategoryCard product={product} />
</CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext/>
          </Carousel>

          // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          //   {Array.isArray(productDemoData) && productDemoData.slice(0, 8).map((product) => (
          //     <CategoryCard key={product.id} product={product} />
          //   ))}
          // </div>
        )}

        {/* Empty State */}
        {!isLoading && (!products || products.length === 0) && (
          <div className="text-center py-12">
            <p className="text-lg text-lomash-gray-600">
              No kitchen products available at the moment.
            </p>
          </div>
        )}

        {/* Mobile View All Button */}
        {!isLoading && products && products.length > 0 && (
          <div className="mt-8 flex justify-center md:hidden">
            <Link href="/kitchen">
              <Button size="lg" className="w-full sm:w-auto group">
                View All Kitchens
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}