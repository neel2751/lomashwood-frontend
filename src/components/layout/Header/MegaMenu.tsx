"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
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
  image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=600&auto=format&fit=crop",
  href: "/kitchen?collection=premium",
  badge: "New Collection",
};

const bedroomFeatured = {
  title: "Luxury Wardrobes",
  description: "Transform your bedroom space",
  image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=600&auto=format&fit=crop",
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
        "fixed left-0 right-0 top-24 z-50 bg-white border-t border-gray-200 shadow-xl transition-all duration-200 ease-in-out origin-top",
        isOpen
          ? "opacity-100 visible translate-y-0"
          : "opacity-0 invisible -translate-y-2 pointer-events-none"
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="container mx-auto px-8 lg:px-18 py-6">
        <div className="flex gap-8">

          {/* Categories */}
          <div className="flex flex-1 gap-10">
            {categories.map((category) => (
              <div key={category.title} className="min-w-0">
                <h3 className="font-bold text-xs uppercase tracking-widest text-lomash-primary mb-3">
                  {category.title}
                </h3>
                <ul className="space-y-2">
                  {category.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="group flex items-center gap-2 text-sm text-gray-700 hover:text-lomash-primary transition-colors"
                      >
                        <ArrowRight className="h-3 w-3 text-lomash-primary flex-shrink-0" />
                        <span className="group-hover:translate-x-0.5 transition-transform whitespace-nowrap">
                          {item.label}
                        </span>
                        {item.isNew && (
                          <Badge variant="secondary" className="text-xs px-1.5 py-0 h-4">
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

          {/* Divider */}
          <div className="w-px bg-gray-100 flex-shrink-0" />

          {/* Featured Card */}
          <div className="w-48 flex-shrink-0">
            <Link href={featured.href} className="group block">
              <div className="relative w-full h-36 rounded-lg overflow-hidden bg-gray-100 mb-3">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-lomash-primary text-white text-xs px-2 py-0.5">
                    {featured.badge}
                  </Badge>
                </div>
              </div>
              <h4 className="font-semibold text-sm text-gray-900 group-hover:text-lomash-primary transition-colors mb-1">
                {featured.title}
              </h4>
              <p className="text-xs text-gray-500 mb-2">{featured.description}</p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-lomash-primary group-hover:underline">
                Explore Collection
                <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-6">
          <Link
            href={type === "kitchen" ? "/kitchen" : "/bedroom"}
            className="text-sm font-semibold text-lomash-primary hover:underline inline-flex items-center gap-1.5"
          >
            View All {type === "kitchen" ? "Kitchens" : "Bedrooms"}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href={`/${type}/inspiration`}
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors inline-flex items-center gap-1.5"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Get Inspired
          </Link>
          <Link
            href="/book-appointment"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            Book Free Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}