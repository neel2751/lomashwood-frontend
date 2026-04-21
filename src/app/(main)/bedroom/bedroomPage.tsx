"use client";
import { Phone, Shield, Paintbrush, CreditCard, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { parseAsString, useQueryStates } from 'nuqs';
import { Suspense, useMemo } from 'react';

import CategoryHero from '@/components/category/CategoryHero';
import Filters from '@/components/products/Filters';
import ProductGrid from '@/components/products/ProductGrid';
import { Button } from '@/components/ui/button';

interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  style: string;
  finish: string;
  image: string;
  images?: string[];
  price?: { from: number; to?: number };
  colors?: string[];
  inStock: boolean;
  isNew?: boolean;
  isSale?: boolean;
  discount?: number;
  rating?: number;
  reviewCount?: number;
  description?: string;
}

export default function BedroomPageCom({ products }: { products: Product[] }) {
  // const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [queryState] = useQueryStates({
    sort: parseAsString.withDefault('popular'),
    finish: parseAsString,
  });

  // Server page provides API-filtered products; client applies finish-multi fallback + sort
  const filteredProducts = useMemo(() => {
    let result = [...products];

    const finishValues = (queryState.finish ?? '')
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);

    if (finishValues.length > 1) {
      result = result.filter((product) => {
        const productFinish = product.finish?.toLowerCase().replace(/\s+/g, '-') ?? '';
        return finishValues.some((value) => {
          if (value === 'matte') return productFinish === 'matt' || productFinish === 'matte';
          if (value === 'glossy') return productFinish === 'gloss' || productFinish === 'glossy';
          return productFinish.includes(value.toLowerCase());
        });
      });
    }

    // ── Sort ───────────────────────────────────────────────────────────────
    switch (queryState.sort) {
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
    }

    return result;
  }, [products, queryState.finish, queryState.sort]);

  return (
    <div className="min-h-screen bg-background">
      <CategoryHero
        title="Bedroom Design & Consultation"
        description="Create your perfect sanctuary with our luxurious bedroom designs tailored to your lifestyle"
        image="https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=3280&auto=format&fit=crop&ixlib=rb-4.1.0"
        category="bedroom"
        className="px-4 sm:px-6 lg:px-18 pt-12 md:pt-16 lg:pt-20 pb-16 md:pb-20 lg:pb-24"
      />

      <div className="container mx-auto px-8 lg:px-18 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

          {/* Sidebar */}
          {/* <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <HelpSidebar />
            </div>
          </aside> */}

          {/* Main Content */}
          <main className="lg:col-span-3">

            {/* Filters */}
            <div className="w-full pt-10 pb-6 border-b border-gray-200 mb-6">
              <Filters
                resultCount={filteredProducts.length}
              />
            </div>

            {/* Toolbar */}
            <div className="mb-6 space-y-4">
              <div className="flex items-center justify-between gap-4 lg:hidden">
                {/* <ProductSort /> */}
                {/* <ViewToggle view={viewMode} onChange={(view) => setViewMode(view)} /> */}
              </div>
              <div className="hidden lg:flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h1 className="text-2xl font-semibold">Bedroom Products</h1>
                  <span className="text-sm text-muted-foreground">
                    Showing {filteredProducts.length} of {products.length} results
                  </span>
                </div>
                {/* <div className="flex items-center gap-4">
                  <ProductSort />
                  <ViewToggle view={viewMode} onChange={setViewMode} />
                </div> */}
              </div>
            </div>

            {/* Products Grid */}
            <Suspense fallback={<ProductGridSkeleton />}>
              <ProductGrid products={filteredProducts} />
            </Suspense>

            {/* CTA Section */}
            <div className="mt-12 rounded-2xl p-8 lg:p-10 text-center bg-primary/5 border border-primary/20">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Free Consultation Available
              </div>
              <h2 className="text-2xl font-bold mb-3">Ready to Transform Your Bedroom?</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-[15px] leading-relaxed">
                Let our experienced designers help you create the bedroom of your dreams.
                Schedule a free consultation and bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/book-appointment">Book Free Consultation</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="tel:01708898755" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Call Us Now
                  </Link>
                </Button>
              </div>
            </div>

            {/* Info Cards */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { icon: <Shield className="w-6 h-6 text-primary" />, title: "Lifetime Warranty", desc: "Premium quality with comprehensive coverage" },
                { icon: <Paintbrush className="w-6 h-6 text-primary" />, title: "Bespoke Designs", desc: "Tailored furniture to match your space" },
                { icon: <CreditCard className="w-6 h-6 text-primary" />, title: "Flexible Payment", desc: "Easy financing options available" },
              ].map((card) => (
                <div
                  key={card.title}
                  className="text-center p-6 border border-gray-100 rounded-xl hover:border-primary/30 hover:shadow-sm transition-all duration-200 bg-white"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    {card.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.desc}</p>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="mt-10 border border-gray-100 rounded-xl p-6 lg:p-8 bg-gray-50/50">
              <h2 className="text-xl font-bold mb-2 text-center">
                Why Choose Our Bedroom Furniture?
              </h2>
              <p className="text-center text-sm text-muted-foreground mb-8">
                Crafted with care, built to last
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { title: "Custom Storage Solutions", desc: "Maximize your space with wardrobes, drawers, and shelving designed for your needs" },
                  { title: "Premium Materials", desc: "Hand-selected woods and finishes that stand the test of time" },
                  { title: "Professional Installation", desc: "Expert fitting service included with every purchase" },
                  { title: "Design Flexibility", desc: "Choose from hundreds of colours, styles, and configurations" },
                ].map((feature) => (
                  <div
                    key={feature.title}
                    className="flex gap-4 p-4 bg-white rounded-lg border border-gray-100 hover:border-primary/20 transition-colors"
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-[14px]">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
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
          <div className="aspect-[4/3] bg-muted animate-pulse rounded-lg" />
          <div className="space-y-2">
            <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
            <div className="h-3 bg-muted animate-pulse rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}