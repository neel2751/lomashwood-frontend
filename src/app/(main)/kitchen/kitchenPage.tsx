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



export default function KitchenPageCom({products}: {products: any[]}) {

    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const handleViewChange = (mode: 'grid' | 'list') => {
        setViewMode(mode);
    };

  return (
    <div className="min-h-screen bg-background">
      {/* Category Hero */}
      <CategoryHero
        title="Kitchen Design & Consultation"
        description="Transform your kitchen into the heart of your home with our expertly crafted designs"
        image="https://plus.unsplash.com/premium_photo-1683140941523-f1fbbabe54d5?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        category="kitchen"
        className="px-4 sm:px-6 lg:px-18
    pt-12 md:pt-16 lg:pt-20
    pb-16 md:pb-20 lg:pb-24"
      />

      <div className="container mx-auto px-8 lg:px-18 py-8 lg:py-12">
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
                onChange={
                  (view) => {
                    handleViewChange(view);
                  }
                }
                 />
              </div>

              {/* Desktop Toolbar */}
              <div className="hidden lg:flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h1 className="text-2xl font-semibold">Kitchen Products</h1>
                  <span className="text-sm text-muted-foreground">
                    Showing {products.length} results
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <ProductSort />
                  <ViewToggle
                    view={viewMode}
                    onChange={(view) => {
                      handleViewChange(view);
                    }}
                   />
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <Suspense fallback={<ProductGridSkeleton />}>
              <ProductGrid products={products} viewMode={viewMode} />
            </Suspense>

            {/* CTA Section */}
            <div className="mt-12 bg-primary/5 rounded-lg p-6 lg:p-8 text-center">
              <h2 className="text-2xl font-semibold mb-3">
                Need Help Choosing Your Kitchen?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Our expert designers are here to guide you through every step of your kitchen journey. 
                Book a free consultation today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/book-appointment">
                    Book Free Consultation
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="tel:+1234567890" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Call Us Now
                  </Link>
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Quality Assured</h3>
                <p className="text-sm text-muted-foreground">
                  Premium materials with lifetime warranty
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Free Design Service</h3>
                <p className="text-sm text-muted-foreground">
                  Expert designers at your service
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
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Flexible Finance</h3>
                <p className="text-sm text-muted-foreground">
                  0% finance options available
                </p>
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