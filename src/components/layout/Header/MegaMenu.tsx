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
  onToggle?: () => void;
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
      { label: "White Kitchens", href: "/kitchen?color=white", isNew: false, swatch: "#FFFFFF" },
      { label: "Grey Kitchens", href: "/kitchen?color=grey", isNew: false, swatch: "#9CA3AF" },
      { label: "Black Kitchens", href: "/kitchen?color=black", isNew: false, swatch: "#1A1A1A" },
      { label: "Blue Kitchens", href: "/kitchen?color=blue", isNew: false, swatch: "#3B82F6" },
      { label: "Green Kitchens", href: "/kitchen?color=green", isNew: false, swatch: "#77c117" },
      { label: "Cream Kitchens", href: "/kitchen?color=cream", isNew: false, swatch: "#F5F0E8" },
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
    title: "By Color",
    items: [
      { label: "White", href: "/bedroom?color=white", isNew: false, swatch: "#FFFFFF" },
      { label: "Grey", href: "/bedroom?color=grey", isNew: false, swatch: "#9CA3AF" },
      { label: "Black", href: "/bedroom?color=black", isNew: false, swatch: "#1A1A1A" },
      { label: "Oak / Wood", href: "/bedroom?color=oak", isNew: false, swatch: "#C4962A" },
      { label: "Ivory", href: "/bedroom?color=ivory", isNew: false, swatch: "#FFFFF0" },
      { label: "Navy Blue", href: "/bedroom?color=navy", isNew: false, swatch: "#1E3A5F" },
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
  const viewAllLabel = type === "kitchen" ? "View All Kitchens" : "View All Bedrooms";
  const viewAllHref = type === "kitchen" ? "/kitchen" : "/bedroom";

  return (
    <div
      className={cn(
        "fixed left-0 right-0 top-24 z-50 bg-white border-t-2 border-[#77c117] shadow-2xl transition-all duration-200 ease-in-out origin-top",
        isOpen
          ? "opacity-100 visible translate-y-0"
          : "opacity-0 invisible -translate-y-2 pointer-events-none"
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="container mx-auto px-8 lg:px-18 py-8">
        <div className="flex gap-8">

          {/* Categories */}
          <div className="flex flex-1 gap-12">
            {categories.map((category) => (
              <div key={category.title} className="min-w-0">
                {/* Category Title */}
                <h3 className="font-bold text-[11px] uppercase tracking-widest text-[#77c117] mb-4 pb-2 border-b border-gray-100">
                  {category.title}
                </h3>

                <ul className="space-y-2.5">
                  {category.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="group flex items-center gap-2.5 text-[13.5px] text-gray-600 hover:text-[#77c117] transition-colors duration-150"
                      >
                        {/* Color swatch if available */}
                        {"swatch" in item && item.swatch ? (
                          <span
                            className="h-[14px] w-[14px] rounded-full flex-shrink-0 border border-gray-300 shadow-sm"
                            style={{ backgroundColor: item.swatch }}
                          />
                        ) : (
                          <ArrowRight className="h-3 w-3 text-[#77c117] opacity-0 group-hover:opacity-100 flex-shrink-0 transition-opacity" />
                        )}
                        <span className="group-hover:translate-x-0.5 transition-transform whitespace-nowrap font-medium">
                          {item.label}
                        </span>
                        {item.isNew && (
                          <Badge
                            variant="secondary"
                            className="text-[10px] px-1.5 py-0 h-4 bg-[#77c117]/10 text-[#77c117] border border-[#77c117]/20"
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

          {/* Divider */}
          <div className="w-px bg-gray-100 flex-shrink-0" />

          {/* Featured Card */}
          <div className="w-52 flex-shrink-0">
            <Link href={featured.href} className="group block">
              <div className="relative w-full h-40 rounded-xl overflow-hidden bg-gray-100 mb-3 shadow-md">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-[#77c117] text-white text-[10px] px-2 py-0.5 shadow-sm">
                    {featured.badge}
                  </Badge>
                </div>
              </div>
              <h4 className="font-semibold text-[13px] text-gray-900 group-hover:text-[#77c117] transition-colors mb-1">
                {featured.title}
              </h4>
              <p className="text-[12px] text-gray-500 mb-2 leading-relaxed">{featured.description}</p>
              <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#77c117] group-hover:underline">
                Explore Collection
                <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-6">
          {/* View All - highlighted prominently */}
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-2 text-[13px] font-bold text-white bg-[#77c117] hover:bg-[#6aad14] px-4 py-2 rounded-full transition-colors duration-200"
          >
            {viewAllLabel}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          <Link
            href={`/${type}/inspiration`}
            className="text-[13px] text-gray-500 hover:text-[#77c117] transition-colors inline-flex items-center gap-1.5 font-medium"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Get Inspired
          </Link>

          <Link
            href="/book-appointment"
            className="text-[13px] text-gray-500 hover:text-[#77c117] transition-colors font-medium"
          >
            Book Free Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}