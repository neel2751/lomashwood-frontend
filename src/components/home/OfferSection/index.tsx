"use client";

import { useQuery } from "@tanstack/react-query";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { apiClient } from "@/lib/api";
import { QUERY_KEYS } from "@/lib/react-query";

import { OfferCard } from "./OfferCard";

const salesDemoData = [
  {
    id: "1",
    title: "Spring Sale - Up to 30% Off!",
    description: "Refresh your home with our exclusive spring sale. Enjoy up to 30% off on selected kitchen and bedroom ranges. Limited time offer, shop now!",
    imageUrl: "https://plus.unsplash.com/premium_photo-1683140941523-f1fbbabe54d5?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    image: "https://plus.unsplash.com/premium_photo-1683140941523-f1fbbabe54d5?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    products: [],
    categories: [],
    termsAndConditions: "",
  },
  {
    id: "2",
    title: "Exclusive Bedroom Bundle - Save £500",
    description: "Transform your bedroom with our exclusive bundle offer. Save £ 500 when you purchase a bedroom set including bed, wardrobe, and bedside tables. Limited stock available!",
    imageUrl: "https://plus.unsplash.com/premium_photo-1683140941523-f1fbbabe54d5?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    image: "https://plus.unsplash.com/premium_photo-1683140941523-f1fbbabe54d5?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    products: [],
    categories: [],
    termsAndConditions: "",
  },
  {
    id: "3",
    title: "Kitchen Clearance - Up to 50% Off!",
    description: "Don't miss our kitchen clearance event! Enjoy up to 50% off on selected kitchen ranges. Perfect opportunity to upgrade your kitchen at unbeatable prices. Shop now while stocks last!",
    imageUrl: "https://plus.unsplash.com/premium_photo-1683140943-f1fbbabe54d5?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    image: "https://plus.unsplash.com/premium_photo-1683140943-f1fbbabe54d5?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    validUntil: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    products: [],
    categories: [],
    termsAndConditions: "",
  },
];


export function OfferSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const { data: salesData, isLoading } = useQuery({
    queryKey: QUERY_KEYS.sales.all,
    queryFn: () => apiClient.sales.getAll(),
  });

  const sales = salesData?.data || salesDemoData || [];

  return (
    <section className="section-padding bg-lomash-gray-50
    px-6 sm:px-10 lg:px-18
    pt-12 md:pt-16 lg:pt-20
    pb-16 md:pb-20 lg:pb-24
    ">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <div>
            <h2 className="heading-2 text-lomash-dark mb-2">
              Special Offers
            </h2>
            <p className="text-lg text-lomash-gray-600">
              Don't miss out on our exclusive deals
            </p>
          </div>
          <Link href="/sale" className="hidden md:block">
            <Button variant="outline" size="lg" className="group">
              View All Offers
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Offers Carousel */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-72 w-full rounded-lg" />
              </div>
            ))}
          </div>
        ) : (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="-ml-4">
              {sales.map((sale) => (
                <CarouselItem
                  key={sale.id}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <OfferCard sale={sale} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-4" />
            <CarouselNext className="hidden md:flex -right-4" />
          </Carousel>
        )}

        {/* Mobile View All Button */}
        <div className="mt-8 flex justify-center md:hidden">
          <Link href="/sale">
            <Button size="lg" className="w-full sm:w-auto group">
              View All Offers
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}