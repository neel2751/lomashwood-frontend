import { Skeleton } from '@/components/ui/skeleton';

export default function KitchenLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Skeleton */}
      <div className="relative h-[300px] lg:h-[400px] bg-muted animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="container mx-auto px-4 pb-8">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-96 max-w-full" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Filters Sidebar Skeleton - Desktop */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Filter Groups */}
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-3 p-4 border rounded-lg">
                  <Skeleton className="h-5 w-24" />
                  <div className="space-y-2">
                    {[...Array(5)].map((_, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4 rounded" />
                        <Skeleton className="h-4 flex-1" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Help Sidebar Skeleton */}
              <div className="p-6 border rounded-lg space-y-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </aside>

          {/* Main Content Skeleton */}
          <main className="lg:col-span-3">
            {/* Toolbar Skeleton */}
            <div className="mb-6 space-y-4">
              {/* Mobile Filters */}
              <div className="flex items-center justify-between gap-4 lg:hidden">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-20" />
              </div>

              {/* Desktop Toolbar */}
              <div className="hidden lg:flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-5 w-32" />
                </div>
                <div className="flex items-center gap-4">
                  <Skeleton className="h-10 w-40" />
                  <Skeleton className="h-10 w-24" />
                </div>
              </div>
            </div>

            {/* Products Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="space-y-4">
                  {/* Image Skeleton */}
                  <Skeleton className="aspect-[4/3] w-full rounded-lg" />
                  
                  {/* Content Skeleton */}
                  <div className="space-y-3">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Section Skeleton */}
            <div className="mt-12 bg-muted/50 rounded-lg p-6 lg:p-8 text-center space-y-6">
              <Skeleton className="h-8 w-72 mx-auto" />
              <Skeleton className="h-4 w-full max-w-2xl mx-auto" />
              <Skeleton className="h-4 w-3/4 max-w-xl mx-auto" />
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Skeleton className="h-11 w-48" />
                <Skeleton className="h-11 w-40" />
              </div>
            </div>

            {/* Info Cards Skeleton */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="text-center p-6 border rounded-lg space-y-4">
                  <Skeleton className="w-12 h-12 rounded-full mx-auto" />
                  <Skeleton className="h-5 w-32 mx-auto" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}