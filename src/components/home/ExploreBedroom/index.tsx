"use client";

import Autoplay from "embla-carousel-autoplay";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import { CategoryCard } from "../ExploreKitchen/CategoryCard";

import { AnimatedContent, AnimatedSection, fadeUp } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { useFeaturedProducts } from "@/hooks/useProducts";

export function ExploreBedroom() {
  const { data: products, isLoading } = useFeaturedProducts("bedroom");
  const productData = Array.isArray(products) ? products : [];

  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <AnimatedSection>
      <section
        id="explore-bedroom"
        className="section-padding bg-lomash-gray-50
          px-6 sm:px-10 lg:px-18
          pt-12 md:pt-16 lg:pt-20
          pb-16 md:pb-20 lg:pb-24"
      >
        <div className="container-custom">
          <AnimatedSection className="flex items-center justify-between mb-8 md:mb-12">
            <div>
              <AnimatedContent variants={fadeUp} custom={0}>
                <h2 className="heading-2 text-lomash-dark mb-2">Customised Bedroom</h2>
              </AnimatedContent>
              <AnimatedContent variants={fadeUp} custom={1}>
                <p className="text-lg text-lomash-gray-600">
                  Customised bedrooms designed around your lifestyle.
                </p>
              </AnimatedContent>
            </div>
            <AnimatedContent variants={fadeUp} custom={2}>
              <Link href="/bedroom" className="hidden md:block">
                <Button variant="outline" size="lg" className="group">
                  View All Bedrooms
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </AnimatedContent>
          </AnimatedSection>

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
            <Carousel
              plugins={[plugin.current]}
              onMouseEnter={() => plugin.current.stop()}
              onMouseLeave={() => plugin.current.play()}
              opts={{ align: "start", slidesToScroll: 1 }}
              className="w-full"
            > 
              <CarouselContent>
                {productData.slice(0, 8).map((product) => (
                  <CarouselItem
                    key={product.id}
                    className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/4 pb-2"
                  >
                    <CategoryCard product={product} sourceSection="explore-bedroom" />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          )}

          {!isLoading && productData.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-lomash-gray-600">No featured bedroom products available right now.</p>
            </div>
          )}

          {!isLoading && productData.length > 0 && (
            <div className="mt-8 flex justify-center md:hidden">
              <Link href="/bedroom">
                <Button size="lg" className="w-full sm:w-auto group">
                  View All Bedrooms
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </AnimatedSection>
  );
}
