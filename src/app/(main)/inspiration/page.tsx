import { Metadata } from 'next';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import InspirationHero from '@/components/inspiration/inspirationHero';

const InspirationGallery = ({  }: any) => <div className="py-12">Gallery</div>;
const StyleGuides = ({  }: any) => <div className="py-12">Style Guides</div>;
const TrendingDesigns = ({  }: any) => <div className="py-12">Trending Designs</div>;
const ColorPaletteSection = ({  }: any) => <div className="py-12">Color Palettes</div>;
const DesignTipsSection = ({  }: any) => <div className="py-12">Design Tips</div>;
const VirtualTourSection = ({  }: any) => <div className="py-12">Virtual Tour</div>;
const BookConsultationCTA = ({ title, }: any) => <div className="py-12 bg-primary-100"><h2>{title}</h2></div>;

export const metadata: Metadata = {
  title: 'Kitchen Design Inspiration | Lomash Wood',
  description:
    'Explore stunning kitchen design ideas, styles, and color palettes. Get inspired by our curated collection of modern, traditional, and contemporary kitchen designs.',
  keywords: [
    'kitchen inspiration',
    'kitchen design ideas',
    'modern kitchen designs',
    'kitchen styles',
    'kitchen color palettes',
    'contemporary kitchens',
    'traditional kitchens',
  ],
  openGraph: {
    title: 'Kitchen Design Inspiration | Lomash Wood',
    description:
      'Explore stunning kitchen design ideas and get inspired for your dream kitchen.',
    type: 'website',
    images: [
      {
        url: '/images/inspiration/kitchen-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Kitchen Design Inspiration',
      },
    ],
  },
};

export default function KitchenInspirationPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <InspirationHero
        category="kitchen"
        title="Kitchen Design Inspiration"
        subtitle="Discover stunning kitchen designs and find the perfect style for your home"
        backgroundImage="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80"
      />

      {/* Style Guides Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container">
          <div className="mb-8 text-center md:mb-12">
            <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Popular Kitchen Styles
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
              Explore our curated collection of kitchen styles to find the perfect match for your taste
            </p>
          </div>
          <Suspense fallback={<StyleGuidesSkeleton />}>
            <StyleGuides category="kitchen" />
          </Suspense>
        </div>
      </section>

      {/* Trending Designs */}
      <section className="bg-muted/30 py-12 md:py-16 lg:py-20">
        <div className="container">
          <div className="mb-8 text-center md:mb-12">
            <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Trending Kitchen Designs
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
              See what's popular this season in kitchen design
            </p>
          </div>
          <Suspense fallback={<TrendingDesignsSkeleton />}>
            <TrendingDesigns category="kitchen" />
          </Suspense>
        </div>
      </section>

      {/* Color Palette Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container">
          <div className="mb-8 text-center md:mb-12">
            <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Kitchen Color Palettes
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
              Find the perfect color combination for your dream kitchen
            </p>
          </div>
          <Suspense fallback={<ColorPaletteSkeleton />}>
            <ColorPaletteSection category="kitchen" />
          </Suspense>
        </div>
      </section>

      {/* Inspiration Gallery */}
      <section className="bg-muted/30 py-12 md:py-16 lg:py-20">
        <div className="container">
          <div className="mb-8 text-center md:mb-12">
            <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Kitchen Design Gallery
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
              Browse through our extensive collection of kitchen designs
            </p>
          </div>
          <Suspense fallback={<GallerySkeleton />}>
            <InspirationGallery category="kitchen" />
          </Suspense>
        </div>
      </section>

      {/* Design Tips Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container">
          <div className="mb-8 text-center md:mb-12">
            <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Kitchen Design Tips
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
              Expert advice to help you create your perfect kitchen
            </p>
          </div>
          <Suspense fallback={<DesignTipsSkeleton />}>
            <DesignTipsSection category="kitchen" />
          </Suspense>
        </div>
      </section>

      {/* Virtual Tour Section */}
      <section className="bg-muted/30 py-12 md:py-16 lg:py-20">
        <div className="container">
          <div className="mb-8 text-center md:mb-12">
            <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Virtual Kitchen Tours
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
              Take a virtual tour of our stunning kitchen displays
            </p>
          </div>
          <Suspense fallback={<VirtualTourSkeleton />}>
            <VirtualTourSection category="kitchen" />
          </Suspense>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container">
          <BookConsultationCTA
            title="Ready to Design Your Dream Kitchen?"
            description="Book a free consultation with our expert designers and bring your kitchen vision to life"
            ctaText="Book Free Consultation"
            variant="kitchen"
          />
        </div>
      </section>
    </div>
  );
}

function StyleGuidesSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-[4/3] w-full rounded-lg" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  );
}

function TrendingDesignsSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <Skeleton className="h-5 w-2/3" />
        </div>
      ))}
    </div>
  );
}

function ColorPaletteSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="space-y-4 rounded-lg border p-4">
          <Skeleton className="h-6 w-1/2" />
          <div className="flex gap-2">
            {[...Array(5)].map((_, j) => (
              <Skeleton key={j} className="h-12 flex-1 rounded" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function GallerySkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(9)].map((_, i) => (
        <Skeleton key={i} className="aspect-[4/3] w-full rounded-lg" />
      ))}
    </div>
  );
}

function DesignTipsSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="space-y-3 rounded-lg border p-6">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      ))}
    </div>
  );
}

function VirtualTourSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-video w-full rounded-lg" />
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  );
}