"use client";
import { Phone, Shield, Paintbrush, CreditCard, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Suspense, useState, useMemo } from 'react';

import CategoryHero from '@/components/category/CategoryHero';
import HelpSidebar from '@/components/category/HelpSidebar';
import Filters, { ActiveFilter } from '@/components/products/Filters';
import ProductGrid from '@/components/products/ProductGrid';
import ProductSort from '@/components/products/ProductSort';
import ViewToggle from '@/components/products/ViewToggle';
import { Button } from '@/components/ui/button';

interface KitchenPageComProps {
  products: any[];
  filterBarSpacing?: string;
  productsSpacing?: string;
}

export default function KitchenPageCom({ 
  products,
  filterBarSpacing = "pt-10 pb-6",
  productsSpacing = "pb-16"
}: KitchenPageComProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);
  const [sortBy, setSortBy] = useState("popular");

  // ── Filter + Sort logic ────────────────────────────────────────────────────
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeFilters.length > 0) {
      // Group filters by category (OR within category, AND across categories)
      const filtersByGroup: Record<string, string[]> = {};
      activeFilters.forEach(({ filterId, optionId }) => {
        if (!filtersByGroup[filterId]) filtersByGroup[filterId] = [];
        filtersByGroup[filterId].push(optionId);
      });

      result = result.filter((product) =>
        Object.entries(filtersByGroup).every(([filterId, optionIds]) => {
          if (filterId === "colour") {
            return optionIds.some((id) =>
              product.colors?.some((c: string) => c.toLowerCase().includes(id.toLowerCase()))
            );
          }
          if (filterId === "style") {
            return optionIds.some((id) =>
              product.style?.toLowerCase().includes(id.toLowerCase())
            );
          }
          if (filterId === "finish") {
            return optionIds.some((id) =>
              product.finish?.toLowerCase().replace(" ", "-").includes(id.toLowerCase())
            );
          }
          if (filterId === "range") {
            return optionIds.some((id) => {
              const price = product.price?.from ?? 0;
              if (id === "budget") return price < 50000;
              if (id === "mid-range") return price >= 50000 && price < 75000;
              if (id === "premium") return price >= 75000 && price < 150000;
              if (id === "luxury") return price >= 150000;
              return true;
            });
          }
          return true;
        })
      );
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => (a.price?.from ?? 0) - (b.price?.from ?? 0));
        break;
      case "price-high":
        result.sort((a, b) => (b.price?.from ?? 0) - (a.price?.from ?? 0));
        break;
      case "rating":
        result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case "newest":
        result.sort((a) => (a.isNew ? -1 : 1));
        break;
      default:
        break;
    }

    return result;
  }, [products, activeFilters, sortBy]);

  const handleFiltersChange = (filters: ActiveFilter[], sort: string) => {
    setActiveFilters(filters);
    setSortBy(sort);
  };

  return (
    <div className="min-h-screen bg-white">
      <CategoryHero
        title="Kitchen Design & Consultation"
        description="Create your perfect kitchen with our luxurious designs tailored to your lifestyle"
        image="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0"
        category="kitchen"
        className="px-4 sm:px-6 lg:px-18 pt-12 md:pt-16 lg:pt-20 pb-16 md:pb-20 lg:pb-24"
      />

      <div className="container mx-auto px-8 lg:px-18 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">

          {/* Sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <HelpSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">

            {/* Single Filters instance — passes state up via onFiltersChange */}
            <div className={`w-full ${filterBarSpacing} border-b border-gray-200 mb-6`}>
              <Filters
                resultCount={filteredProducts.length}
                onFiltersChange={handleFiltersChange}
              />
            </div>

            {/* Toolbar */}
            <div className={`mb-6 space-y-4 ${productsSpacing}`}>
              <div className="flex items-center justify-between gap-4 lg:hidden">
                <ProductSort />
                <ViewToggle view={viewMode} onChange={(view) => setViewMode(view)} />
              </div>
              <div className="hidden lg:flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h1 className="text-2xl font-semibold text-gray-900">Kitchen Products</h1>
                  <span className="text-sm text-gray-500">
                    Showing {filteredProducts.length} of {products.length} results
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <ProductSort />
                  <ViewToggle view={viewMode} onChange={setViewMode} />
                </div>
              </div>
            </div>

            {/* Products Grid — receives filtered products */}
            <Suspense fallback={<ProductGridSkeleton />}>
              <ProductGrid products={filteredProducts} viewMode={viewMode} />
            </Suspense>

            {/* CTA Section */}
            <div className="mt-12 rounded-2xl p-8 lg:p-10 text-center bg-[#77c117]/8 border border-[#77c117]/20">
              <div className="inline-flex items-center gap-2 bg-[#77c117]/15 text-[#77c117] text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#77c117]" />
                Free Consultation Available
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to Transform Your Kitchen?</h2>
              <p className="text-gray-500 mb-8 max-w-2xl mx-auto text-[15px] leading-relaxed">
                Let our experienced designers help you create the kitchen of your dreams.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-[#77c117] hover:bg-[#6aad14] text-white font-semibold px-8 rounded-full shadow-md shadow-[#77c117]/30">
                  <Link href="/book-appointment">Book Free Consultation</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-[#77c117] text-[#77c117] hover:bg-[#77c117]/5 font-semibold px-8 rounded-full">
                  <Link href="tel:+1234567890" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Call Us Now
                  </Link>
                </Button>
              </div>
            </div>

            {/* Info Cards */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { icon: <Shield className="w-6 h-6 text-[#77c117]" />, title: "Lifetime Warranty", desc: "Premium quality with comprehensive coverage" },
                { icon: <Paintbrush className="w-6 h-6 text-[#77c117]" />, title: "Bespoke Designs", desc: "Tailored furniture to match your space" },
                { icon: <CreditCard className="w-6 h-6 text-[#77c117]" />, title: "Flexible Payment", desc: "0% APR finance options available" },
              ].map((card) => (
                <div key={card.title} className="text-center p-6 border border-gray-100 rounded-xl hover:border-[#77c117]/30 hover:shadow-sm transition-all duration-200 bg-white">
                  <div className="w-12 h-12 bg-[#77c117]/10 rounded-full flex items-center justify-center mx-auto mb-4">{card.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-500">{card.desc}</p>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="mt-10 border border-gray-100 rounded-xl p-6 lg:p-8 bg-gray-50/50">
              <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">Why Choose Our Kitchen Furniture?</h2>
              <p className="text-center text-sm text-gray-500 mb-8">Crafted with care, built to last</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { title: "Custom Storage Solutions", desc: "Maximize your space with cabinetry, drawers, and shelving designed for your needs" },
                  { title: "Premium Materials", desc: "Hand-selected woods and finishes that stand the test of time" },
                  { title: "Professional Installation", desc: "Expert fitting service included with every purchase" },
                  { title: "Design Flexibility", desc: "Choose from hundreds of colours, styles, and configurations" },
                ].map((feature) => (
                  <div key={feature.title} className="flex gap-4 p-4 bg-white rounded-lg border border-gray-100 hover:border-[#77c117]/20 transition-colors">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-8 h-8 bg-[#77c117]/10 rounded-lg flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-[#77c117]" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1 text-[14px]">{feature.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(9)].map((_, i) => (
        <div key={i} className="space-y-4">
          <div className="aspect-[4/3] bg-gray-100 animate-pulse rounded-xl" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-100 animate-pulse rounded w-3/4" />
            <div className="h-3 bg-gray-100 animate-pulse rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}