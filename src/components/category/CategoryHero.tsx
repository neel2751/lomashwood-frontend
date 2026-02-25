"use client";

import { ArrowRight, Filter } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface CategoryHeroProps {
  title: string;
  description: string;
  image?: string;
  totalProducts?: number;
  category: "kitchen" | "bedroom";
  onFilterClick?: () => void;
  className?: string;
}

export default function CategoryHero({
  title,
  description,
  image,
  totalProducts,
  category,
  onFilterClick,
  className,
}: CategoryHeroProps) {
  const defaultImages = {
    kitchen: "/images/products/kitchen/hero.jpg",
    bedroom: "/images/products/bedroom/hero.jpg",
  };

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-muted/50 to-muted",
        className
      )}
    >
      <div className="container">
        <div className="grid gap-8 py-12 md:grid-cols-2 md:py-16 lg:gap-12 lg:py-20">
          {/* Content */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Category Badge */}
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="text-sm">
                {category === "kitchen" ? "Kitchen Design" : "Bedroom Design"}
              </Badge>
              {totalProducts !== undefined && (
                <span className="text-sm text-muted-foreground">
                  {totalProducts} {totalProducts === 1 ? "Product" : "Products"}
                </span>
              )}
            </div>

            {/* Title */}
            <div className="space-y-3">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                {title}
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                {description}
              </p>
            </div>

            {/* Features List */}
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="flex h-1.5 w-1.5 rounded-full bg-primary" />
                Bespoke designs tailored to your space
              </li>
              <li className="flex items-center gap-2">
                <span className="flex h-1.5 w-1.5 rounded-full bg-primary" />
                Premium quality materials and finishes
              </li>
              <li className="flex items-center gap-2">
                <span className="flex h-1.5 w-1.5 rounded-full bg-primary" />
                Professional installation included
              </li>
              <li className="flex items-center gap-2">
                <span className="flex h-1.5 w-1.5 rounded-full bg-primary" />
                Free design consultation available
              </li>
            </ul>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/book-appointment">
                  Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={onFilterClick}
                className="gap-2 md:hidden"
              >
                <Filter className="h-4 w-4" />
                Filter Products
              </Button>
              <Button size="lg" variant="outline" asChild className="hidden md:flex">
                <Link href="/showrooms">Visit Showroom</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 ring-2 ring-background">
                    <span className="text-xs font-medium">4.9</span>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 ring-2 ring-background">
                    <span className="text-xs font-medium">★</span>
                  </div>
                </div>
                <span>Rated 4.9/5 by customers</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div>
                <span className="font-medium text-foreground">10+ years</span> of
                experience
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative order-first md:order-last">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border bg-muted shadow-xl md:aspect-square">
              <Image
                src={image || defaultImages[category]}
                alt={title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-4 left-4 right-4 rounded-lg border bg-background p-4 shadow-lg md:-bottom-6 md:left-6 md:right-auto md:w-64">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-xs text-muted-foreground">Projects</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">98%</div>
                  <div className="text-xs text-muted-foreground">Satisfaction</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">24/7</div>
                  <div className="text-xs text-muted-foreground">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="pointer-events-none absolute -right-1/4 -top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-1/4 -left-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
    </section>
  );
}