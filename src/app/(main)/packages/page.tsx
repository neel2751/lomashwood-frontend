"use client";

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SlidersHorizontal, ArrowRight, Check, X } from "lucide-react";
import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const filterOptions = {
  category: ["Kitchen", "Bedroom"],
  style: ["Modern", "Traditional", "Contemporary", "Shaker", "Handleless", "Minimalist"],
  material: ["Solid Wood", "MDF", "Plywood", "Laminate", "Acrylic"],
  finish: ["Gloss", "Matt", "Wood Grain", "Painted", "Mirror"],
  layout: ["L-Shape", "U-Shape", "Galley", "Island", "Single Wall", "Open Plan"],
};

const allPackages = [
  {
    id: "1",
    title: "Complete Kitchen Package",
    category: "Kitchen",
    style: "Modern",
    material: "MDF",
    finish: "Gloss",
    layout: "Island",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=600&auto=format&fit=crop",
    features: ["Cabinets", "Countertops", "Appliances", "Installation"],
    badge: "Popular",
  },
  {
    id: "2",
    title: "Shaker Kitchen Bundle",
    category: "Kitchen",
    style: "Shaker",
    material: "Solid Wood",
    finish: "Painted",
    layout: "L-Shape",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=600&auto=format&fit=crop",
    features: ["Shaker Doors", "Soft Close", "Worktop", "Handles"],
    badge: null,
  },
  {
    id: "3",
    title: "Bedroom Wardrobe Package",
    category: "Bedroom",
    style: "Contemporary",
    material: "Plywood",
    finish: "Matt",
    layout: "Single Wall",
    image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=600&auto=format&fit=crop",
    features: ["Fitted Wardrobe", "Sliding Doors", "Interior Fittings", "Mirror"],
    badge: "New",
  },
  {
    id: "4",
    title: "Luxury Bedroom Suite",
    category: "Bedroom",
    style: "Modern",
    material: "Solid Wood",
    finish: "Gloss",
    layout: "Open Plan",
    image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=600&auto=format&fit=crop",
    features: ["Wardrobe", "Bed Frame", "Bedside Tables", "Dressing Table"],
    badge: "Popular",
  },
  {
    id: "5",
    title: "Traditional Kitchen Package",
    category: "Kitchen",
    style: "Traditional",
    material: "Solid Wood",
    finish: "Wood Grain",
    layout: "U-Shape",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=600&auto=format&fit=crop",
    features: ["Solid Wood Doors", "Stone Worktop", "Belfast Sink", "Handles"],
    badge: null,
  },
  {
    id: "6",
    title: "Small Space Bedroom",
    category: "Bedroom",
    style: "Minimalist",
    material: "Laminate",
    finish: "Matt",
    layout: "Single Wall",
    image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=600&auto=format&fit=crop",
    features: ["Space-Saving Design", "Built-in Storage", "Sliding Doors"],
    badge: null,
  },
];

// ── Filter state shape ────────────────────────────────────────────────────────
interface ActiveFilters {
  category: string[];
  style: string[];
  material: string[];
  finish: string[];
  layout: string[];
}

const emptyFilters: ActiveFilters = {
  category: [],
  style: [],
  material: [],
  finish: [],
  layout: [],
};

export default function PackagesPage() {
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>(emptyFilters);

  // ── Toggle a single checkbox value ─────────────────────────────────────────
  const toggleFilter = (group: keyof ActiveFilters, value: string) => {
    setActiveFilters((prev) => {
      const current = prev[group];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [group]: updated };
    });
  };

  // ── Clear all filters ───────────────────────────────────────────────────────
  const clearFilters = () => setActiveFilters(emptyFilters);

  // ── Check if any filter is active ──────────────────────────────────────────
  const hasActiveFilters = Object.values(activeFilters).some((arr) => arr.length > 0);

  // ── Count total active selections ──────────────────────────────────────────
  const activeCount = Object.values(activeFilters).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  // ── Filter packages based on activeFilters ──────────────────────────────────
  const filteredPackages = useMemo(() => {
    return allPackages.filter((pkg) => {
      if (activeFilters.category.length > 0 && !activeFilters.category.includes(pkg.category))
        return false;
      if (activeFilters.style.length > 0 && !activeFilters.style.includes(pkg.style))
        return false;
      if (activeFilters.material.length > 0 && !activeFilters.material.includes(pkg.material))
        return false;
      if (activeFilters.finish.length > 0 && !activeFilters.finish.includes(pkg.finish))
        return false;
      if (activeFilters.layout.length > 0 && !activeFilters.layout.includes(pkg.layout))
        return false;
      return true;
    });
  }, [activeFilters]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-lomash-dark py-14 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Packages
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Complete kitchen and bedroom solutions designed to suit every style and budget
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Filter Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5 text-lomash-primary" />
                  <h2 className="font-bold text-lg text-lomash-dark">Filters</h2>
                </div>
                {/* Active filter count badge */}
                {activeCount > 0 && (
                  <span className="text-xs font-semibold bg-lomash-primary text-white px-2 py-0.5 rounded-full">
                    {activeCount}
                  </span>
                )}
              </div>

              {/* Render each filter group */}
              {(Object.keys(filterOptions) as Array<keyof typeof filterOptions>).map(
                (group, idx, arr) => (
                  <div key={group}>
                    <div className="mb-6">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-lomash-primary mb-3">
                        {group.charAt(0).toUpperCase() + group.slice(1)}
                      </h3>
                      <div className="space-y-2">
                        {filterOptions[group].map((item) => (
                          <label
                            key={item}
                            className="flex items-center gap-2 cursor-pointer group"
                          >
                            <input
                              type="checkbox"
                              checked={activeFilters[group].includes(item)}
                              onChange={() => toggleFilter(group, item)}
                              className="h-4 w-4 rounded border-gray-300 text-lomash-primary focus:ring-lomash-primary cursor-pointer"
                            />
                            <span className="text-sm text-gray-700 group-hover:text-lomash-primary transition-colors">
                              {item}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                    {idx < arr.length - 1 && <div className="h-px bg-gray-100 mb-6" />}
                  </div>
                )
              )}

              <Button
                className="w-full mt-2"
                variant="outline"
                onClick={clearFilters}
                disabled={!hasActiveFilters}
              >
                <X className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </aside>

          {/* Package Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-semibold text-lomash-dark">
                  {filteredPackages.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-lomash-dark">
                  {allPackages.length}
                </span>{" "}
                packages
              </p>

              {/* Active filter chips */}
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(activeFilters) as Array<keyof ActiveFilters>).map((group) =>
                    activeFilters[group].map((value) => (
                      <span
                        key={`${group}-${value}`}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-lomash-primary/10 text-lomash-primary text-xs font-medium"
                      >
                        {value}
                        <X
                          className="h-3 w-3 cursor-pointer hover:text-red-500"
                          onClick={() => toggleFilter(group, value)}
                        />
                      </span>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* No results */}
            {filteredPackages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <SlidersHorizontal className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  No packages match your filters
                </h3>
                <p className="text-sm text-gray-400 mb-6">
                  Try removing some filters to see more results.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={pkg.image}
                        alt={pkg.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <Badge className="bg-white text-lomash-dark text-xs font-medium border-0 shadow-sm">
                          {pkg.category}
                        </Badge>
                        {pkg.badge && (
                          <Badge className="bg-lomash-primary text-white text-xs font-medium border-0">
                            {pkg.badge}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="font-bold text-lomash-dark text-base mb-1 group-hover:text-lomash-primary transition-colors">
                        {pkg.title}
                      </h3>
                      <p className="text-xs text-gray-400 mb-3">
                        {pkg.style} · {pkg.finish}
                      </p>

                      <div className="space-y-1.5 mb-4">
                        {pkg.features.map((f) => (
                          <div key={f} className="flex items-center gap-2">
                            <Check className="h-3.5 w-3.5 text-lomash-primary flex-shrink-0" />
                            <span className="text-xs text-gray-600">{f}</span>
                          </div>
                        ))}
                      </div>

                      <Link href={`/packages/${pkg.id}`}>
                        <Button className="w-full" size="sm">
                          <span>View Package</span>
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}