"use client";

import { 
  Tag, 
  Clock, 
  Percent,
  TrendingDown,
  Phone,
  Calendar
} from 'lucide-react';
import Link from 'next/link';
import { Suspense, useState } from 'react';

import SaleFilter from '@/components/sale/SaleFilter';
import SaleGrid from '@/components/sale/SaleGrid';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// ── Import SaleFilterState directly from SaleFilter to avoid mismatch ────────
import type { SaleFilterState } from '@/components/sale/SaleFilter';

export default function SalePage() {
  const [filters, setFilters] = useState<SaleFilterState>({
    categories: [],
    discountTypes: [],
    discountRange: [0, 100],
    status: [],
    featured: null,
    limited: null,
  });

  const handleFiltersChange = (filters: SaleFilterState) => {
    setFilters(filters);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-destructive/10 via-background to-primary/10 border-b">
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="destructive" className="mb-4 text-sm px-4 py-1">
              <Tag className="h-3 w-3 mr-1" />
              Limited Time Offers
            </Badge>

            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Sale: Kitchen & Bedroom Offers
            </h1>

            <p className="text-lg text-muted-foreground mb-6">
              Save big on premium kitchen and bedroom furniture. Exclusive deals
              with up to 50% off selected items.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-destructive" />
                <span className="font-medium">Up to 50% Off</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="font-medium">Limited Stock Available</span>
              </div>
              <div className="flex items-center gap-2">
                <Percent className="h-5 w-5 text-green-600" />
                <span className="font-medium">0% Finance Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground">Sale</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <SaleFilter
                filters={filters}
                onFiltersChange={handleFiltersChange}
              />

              {/* Quick Info Card */}
              <Card className="p-6 bg-primary/5">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Sale Information
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>All prices include free delivery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Limited stock on sale items</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Professional installation available</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Finance options from 0% APR</span>
                  </li>
                </ul>
              </Card>

              {/* Help Card */}
              <Card className="p-6">
                <h3 className="font-semibold mb-3">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our experts are here to help you find the perfect deal.
                </p>
                <div className="space-y-2">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full gap-2"
                  >
                    <Link href="/book-appointment">
                      <Calendar className="h-4 w-4" />
                      Book Consultation
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full gap-2"
                  >
                    <Link href="tel:07459324138">
                      <Phone className="h-4 w-4" />
                      Call Now
                    </Link>
                  </Button>
                </div>
              </Card>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {/* Toolbar - Mobile */}
            <div className="flex items-center justify-between gap-4 mb-6 lg:hidden">
              <SaleFilter
                filters={filters}
                onFiltersChange={handleFiltersChange}
                variant="sheet"
              />
              <div className="text-sm text-muted-foreground">
                Showing all offers
              </div>
            </div>

            {/* Desktop Toolbar */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold">Current Offers</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Browse our latest kitchen and bedroom deals
                </p>
              </div>
            </div>

            {/* Sale Grid */}
            <Suspense fallback={<SaleGridSkeleton />}>
              <SaleGrid offers={[]} />
            </Suspense>

            {/* Info Banner */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingDown className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Best Price Guarantee</h3>
                <p className="text-sm text-muted-foreground">
                  Find it cheaper elsewhere and we'll match the price
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Quick Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  Fast delivery on all sale items while stocks last
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Percent className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Flexible Finance</h3>
                <p className="text-sm text-muted-foreground">
                  0% APR finance available on selected sale items
                </p>
              </Card>
            </div>

            {/* CTA Section */}
            <Card className="mt-12 p-6 lg:p-8 bg-gradient-to-br from-primary/5 to-primary/10 text-center">
              <h2 className="text-2xl font-semibold mb-3">
                Don't Miss Out on These Amazing Deals
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Our sale items are selling fast! Book a free consultation today
                to secure your dream kitchen or bedroom at an unbeatable price.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/book-appointment">Book Free Consultation</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/showrooms">Visit a Showroom</Link>
                </Button>
              </div>
            </Card>

            {/* Terms & Conditions */}
            <Card className="mt-8 p-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Sale Terms & Conditions
              </h3>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  • All sale prices are subject to availability and may be
                  withdrawn at any time.
                </p>
                <p>
                  • Offers cannot be used in conjunction with any other
                  promotion or discount.
                </p>
                <p>
                  • Finance is subject to status and credit checks. Terms and
                  conditions apply.
                </p>
                <p>
                  • Sale items may have limited stock. First come, first served
                  basis.
                </p>
                <p>
                  • All measurements and specifications are approximate. Please
                  verify during consultation.
                </p>
                <p>
                  • Installation costs may vary depending on location and
                  complexity.
                </p>
              </div>
              <Button asChild variant="link" size="sm" className="mt-4 px-0">
                <Link href="/terms-conditions">
                  Read Full Terms & Conditions →
                </Link>
              </Button>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}

function SaleGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(9)].map((_, i) => (
        <div key={i} className="space-y-4">
          <div className="aspect-[4/3] bg-muted animate-pulse rounded-lg relative">
            <div className="absolute top-3 right-3 h-8 w-16 bg-background/50 rounded animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-5 bg-muted animate-pulse rounded w-3/4" />
            <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
            <div className="flex items-center gap-2">
              <div className="h-6 bg-muted animate-pulse rounded w-20" />
              <div className="h-5 bg-muted animate-pulse rounded w-16" />
            </div>
            <div className="h-10 bg-muted animate-pulse rounded w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}