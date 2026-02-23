"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MegaMenuProps {
  type: "kitchen" | "bedroom";
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const kitchenCategories = [
  {
    title: "By Style",
    items: [
      { label: "Modern Kitchens", href: "/kitchen?style=modern", isNew: false },
      { label: "Traditional Kitchens", href: "/kitchen?style=traditional", isNew: false },
      { label: "Contemporary", href: "/kitchen?style=contemporary", isNew: false },
      { label: "Shaker Kitchens", href: "/kitchen?style=shaker", isNew: false },
      { label: "Handleless Kitchens", href: "/kitchen?style=handleless", isNew: true },
    ],
  },
  {
    title: "By Finish",
    items: [
      { label: "Gloss Kitchens", href: "/kitchen?finish=gloss", isNew: false },
      { label: "Matt Kitchens", href: "/kitchen?finish=matt", isNew: false },
      { label: "Wood Grain", href: "/kitchen?finish=wood-grain", isNew: false },
      { label: "Painted Kitchens", href: "/kitchen?finish=painted", isNew: false },
    ],
  },
  {
    title: "By Color",
    items: [
      { label: "White Kitchens", href: "/kitchen?color=white", isNew: false },
      { label: "Grey Kitchens", href: "/kitchen?color=grey", isNew: false },
      { label: "Black Kitchens", href: "/kitchen?color=black", isNew: false },
      { label: "Blue Kitchens", href: "/kitchen?color=blue", isNew: false },
    ],
  },
];

const bedroomCategories = [
  {
    title: "By Type",
    items: [
      { label: "Fitted Wardrobes", href: "/bedroom?type=fitted", isNew: false },
      { label: "Sliding Wardrobes", href: "/bedroom?type=sliding", isNew: false },
      { label: "Walk-in Wardrobes", href: "/bedroom?type=walkin", isNew: true },
      { label: "Hinged Wardrobes", href: "/bedroom?type=hinged", isNew: false },
    ],
  },
  {
    title: "By Style",
    items: [
      { label: "Modern Bedrooms", href: "/bedroom?style=modern", isNew: false },
      { label: "Classic Bedrooms", href: "/bedroom?style=classic", isNew: false },
      { label: "Contemporary", href: "/bedroom?style=contemporary", isNew: false },
      { label: "Minimalist", href: "/bedroom?style=minimalist", isNew: false },
    ],
  },
  {
    title: "By Finish",
    items: [
      { label: "Gloss Finish", href: "/bedroom?finish=gloss", isNew: false },
      { label: "Matt Finish", href: "/bedroom?finish=matt", isNew: false },
      { label: "Wood Grain", href: "/bedroom?finish=wood-grain", isNew: false },
      { label: "Mirror Doors", href: "/bedroom?finish=mirror", isNew: true },
    ],
  },
];

const kitchenFeatured = {
  title: "Premium Collection",
  description: "Explore our latest kitchen designs",
  image: "/images/products/kitchen/featured.jpg",
  href: "/kitchen?collection=premium",
  badge: "New Collection",
};

const bedroomFeatured = {
  title: "Luxury Wardrobes",
  description: "Transform your bedroom space",
  image: "/images/products/bedroom/featured.jpg",
  href: "/bedroom?collection=luxury",
  badge: "Popular",
};

export function MegaMenu({
  type,
  isOpen,
  onMouseEnter,
  onMouseLeave,
}: MegaMenuProps) {
  const categories = type === "kitchen" ? kitchenCategories : bedroomCategories;
  const featured = type === "kitchen" ? kitchenFeatured : bedroomFeatured;

  return (
    <div
      className={cn(
        "absolute left-0 top-full w-full bg-background border-b shadow-lg transition-all duration-300 ease-in-out origin-top",
        isOpen
          ? "opacity-100 visible scale-y-100"
          : "opacity-0 invisible scale-y-95 pointer-events-none"
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Categories Grid */}
          <div className="col-span-9">
            <div className="grid grid-cols-3 gap-8">
              {categories.map((category) => (
                <div key={category.title}>
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">
                    {category.title}
                  </h3>
                  <ul className="space-y-3">
                    {category.items.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          className="group flex items-center gap-2 text-sm hover:text-primary transition-colors"
                        >
                          <span className="group-hover:translate-x-1 transition-transform">
                            {item.label}
                          </span>
                          {item.isNew && (
                            <Badge
                              variant="secondary"
                              className="text-xs px-1.5 py-0"
                            >
                              New
                            </Badge>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Bottom Links */}
            <div className="mt-8 pt-6 border-t">
              <div className="flex items-center gap-6">
                <Link
                  href={type === "kitchen" ? "/kitchen" : "/bedroom"}
                  className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-2"
                >
                  View All {type === "kitchen" ? "Kitchens" : "Bedrooms"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={`/${type}/inspiration`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  Get Inspired
                </Link>
                <Link
                  href="/book-appointment"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Book Free Consultation
                </Link>
              </div>
            </div>
          </div>

          {/* Featured Card */}
          <div className="col-span-3">
            <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
              <Link href={featured.href}>
                <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-primary/90 backdrop-blur-sm">
                      {featured.badge}
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-base mb-1 group-hover:text-primary transition-colors">
                    {featured.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {featured.description}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full group/btn"
                  >
                    Explore Collection
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}