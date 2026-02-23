import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductDetailLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb Skeleton */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-12" />
            <span className="text-muted-foreground">/</span>
            <Skeleton className="h-4 w-16" />
            <span className="text-muted-foreground">/</span>
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Image Gallery Skeleton */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="space-y-4">
              {/* Main Image */}
              <Skeleton className="aspect-square w-full rounded-lg" />
              
              {/* Thumbnail Grid */}
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="aspect-square w-full rounded-lg" />
                ))}
              </div>
            </div>
          </div>

          {/* Product Info & Actions Skeleton */}
          <div className="space-y-6">
            {/* Product Info */}
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-20" />
              </div>
              <Skeleton className="h-10 w-32" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>

            {/* Color Selector Skeleton */}
            <div className="space-y-3">
              <Skeleton className="h-5 w-32" />
              <div className="flex gap-3">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-12 rounded-full" />
                ))}
              </div>
            </div>

            {/* Finish Selector Skeleton */}
            <div className="space-y-3">
              <Skeleton className="h-5 w-28" />
              <div className="flex gap-3">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-10 w-24 rounded" />
                ))}
              </div>
            </div>

            {/* Price Calculator Skeleton */}
            <div className="space-y-3 p-4 border rounded-lg">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-8 w-40" />
            </div>

            <div className="h-px bg-border" />

            {/* Product Actions Skeleton */}
            <div className="space-y-3">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <div className="flex gap-3">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
            </div>

            {/* Trust Badges Skeleton */}
            <Card className="p-4 bg-muted/50">
              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* What's Included Skeleton */}
            <Card className="p-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <ul className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Skeleton className="h-5 w-5 rounded-full flex-shrink-0 mt-0.5" />
                    <Skeleton className="h-4 flex-1" />
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs Skeleton */}
        <div className="mb-12">
          {/* Tabs Header */}
          <div className="border-b mb-6">
            <div className="flex gap-6">
              {['Description', 'Specifications', 'Delivery & Returns', 'Reviews'].map((_, i) => (
                <Skeleton key={i} className="h-10 w-32" />
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>

        {/* Related Products Skeleton */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-8 w-48" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA Skeleton */}
        <Card className="p-6 lg:p-8 bg-muted/50 text-center">
          <Skeleton className="h-8 w-64 mx-auto mb-3" />
          <div className="space-y-2 mb-6 max-w-2xl mx-auto">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6 mx-auto" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Skeleton className="h-11 w-48" />
            <Skeleton className="h-11 w-40" />
          </div>
        </Card>
      </div>
    </div>
  );
}