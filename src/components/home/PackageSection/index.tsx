  "use client";

  import { useQuery } from "@tanstack/react-query";

  import { Skeleton } from "@/components/ui/skeleton";
  import { QUERY_KEYS } from "@/lib/react-query";

  import { PackageCard } from "./PackageCard";


  export function PackageSection() {
    const { data: packagesData, isLoading } = useQuery({
      queryKey: QUERY_KEYS.packages.all,
      queryFn: async () => {
        const res = await fetch('/api/packages');
        if (!res.ok) throw new Error('Failed to fetch packages');
        return res.json() as Promise<{ data: { id: string; title: string; description: string; image: string; price?: number; features: string[]; popular?: boolean }[] }>;
      },
    });

    const packages = packagesData?.data ?? [];

    return (
      <section className="section-padding bg-white
    px-6 sm:px-10 lg:px-18
      pt-12 md:pt-16 lg:pt-20
      pb-16 md:pb-20 lg:pb-24
      ">
        <div className="container-custom">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <div>
              <h2 className="heading-2 text-lomash-dark mb-2">
                Kitchen & Bedroom Packages
              </h2>
              <p className="text-lg text-lomash-gray-600">
                Complete solutions tailored to your needs
              </p>
            </div>
            {/* <Link href="/sale" className="hidden md:block">
              <Button variant="outline" size="lg" className="group">
                View All Packages
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link> */}
          </div>

          {/* Packages Carousel */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-96 w-full rounded-lg" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <PackageCard key={pkg.id} package={pkg} />
              ))}
            </div>
          )}

          {/* Mobile we have to show two buttons kitchen pacakge & bedroom package */}
          {/* <div className="flex flex-col sm:flex-row items-center justify-center mt-10 gap-4">
            <Link
              href="/kitchen?packages"
              className="inline-flex items-center gap-2 px-6 py-3 bg-lomash-primary text-white font-medium rounded-full hover:bg-lomash-primary-dark transition-colors"
            >
              View Kitchen Packages
            </Link>
            <Link
              href="/bedroom?packages"
              className="inline-flex items-center gap-2 px-6 py-3 bg-lomash-secondary text-white font-medium rounded-full hover:bg-lomash-secondary-dark transition-colors"
            >
              View Bedroom Packages
            </Link>
          </div> */}
        </div>
      </section>
    );
  }