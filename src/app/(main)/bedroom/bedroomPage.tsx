"use client";
import { Phone } from 'lucide-react';
import Link from 'next/link';
import { Suspense, useState } from 'react';

import CategoryHero from '@/components/category/CategoryHero';
import HelpSidebar from '@/components/category/HelpSidebar';
import Filters from '@/components/products/Filters';
import ProductGrid from '@/components/products/ProductGrid';
import ProductSort from '@/components/products/ProductSort';
import ViewToggle from '@/components/products/ViewToggle';
import { Button } from '@/components/ui/button';


export default function BedroomPageCom({products}: {products: any[]}) {

    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const handleViewChange = (mode: 'grid' | 'list') => {
        setViewMode(mode);
    };

  return (
    <div className="min-h-screen bg-background">
      {/* Category Hero */}
      <CategoryHero
        title="Bedroom Design & Consultation"
        description="Create your perfect sanctuary with our luxurious bedroom designs tailored to your lifestyle"
        // image="https://plus.unsplash.com/premium_photo-1683120852623-143817d6400b?q=80&w=3276&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        image='https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=3280&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        category="bedroom"
        className="px-4 sm:px-6 lg:px-18
    pt-12 md:pt-16 lg:pt-20
    pb-16 md:pb-20 lg:pb-24"
      />

      <div className="container mx-auto px-18 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <Filters />
              <HelpSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {/* Toolbar */}
            <div className="mb-6 space-y-4">
              {/* Mobile Filters & Sort */}
              <div className="flex items-center justify-between gap-4 lg:hidden">
                <Filters />
                <ProductSort />
                <ViewToggle
                  view={viewMode}
                    onChange={(view) => {
                      handleViewChange(view);
                    }}
                />
              </div>

              {/* Desktop Toolbar */}
              <div className="hidden lg:flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h1 className="text-2xl font-semibold">Bedroom Products</h1>
                  <span className="text-sm text-muted-foreground">
                    Showing results
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <ProductSort />
                  <ViewToggle view={viewMode} onChange={handleViewChange} />
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <Suspense fallback={<ProductGridSkeleton />}>
              <ProductGrid 
                products={products}
                viewMode={viewMode}
              />
            </Suspense>

            {/* CTA Section */}
            <div className="mt-12 bg-primary/5 rounded-lg p-6 lg:p-8 text-center">
              <h2 className="text-2xl font-semibold mb-3">
                Ready to Transform Your Bedroom?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Let our experienced designers help you create the bedroom of your dreams. 
                Schedule a free consultation and bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/book-appointment">
                    Book Free Consultation
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="tel:+1234567890" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Call Us Now
                  </a>
                </Button>
              </div>
            </div>

            {/* Info Section */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 border rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Lifetime Warranty</h3>
                <p className="text-sm text-muted-foreground">
                  Premium quality with comprehensive coverage
                </p>
              </div>

              <div className="text-center p-6 border rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Bespoke Designs</h3>
                <p className="text-sm text-muted-foreground">
                  Tailored furniture to match your space
                </p>
              </div>

              <div className="text-center p-6 border rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Flexible Payment</h3>
                <p className="text-sm text-muted-foreground">
                  0% APR finance options available
                </p>
              </div>
            </div>

            {/* Features Section */}
            <div className="mt-12 border rounded-lg p-6 lg:p-8">
              <h2 className="text-xl font-semibold mb-6 text-center">
                Why Choose Our Bedroom Furniture?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Custom Storage Solutions</h3>
                    <p className="text-sm text-muted-foreground">
                      Maximize your space with wardrobes, drawers, and shelving designed for your needs
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Premium Materials</h3>
                    <p className="text-sm text-muted-foreground">
                      Hand-selected woods and finishes that stand the test of time
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Professional Installation</h3>
                    <p className="text-sm text-muted-foreground">
                      Expert fitting service included with every purchase
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Design Flexibility</h3>
                    <p className="text-sm text-muted-foreground">
                      Choose from hundreds of colours, styles, and configurations
                    </p>
                  </div>
                </div>
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