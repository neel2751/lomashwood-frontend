import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const metadata: Metadata = {
  title: 'Blog & Design Inspiration | Lomash Wood',
  description: 'Discover the latest kitchen and bedroom design trends, tips, and inspiration from Lomash Wood experts.',
  keywords: 'kitchen design blog, bedroom design ideas, interior design tips, home decor inspiration',
  openGraph: {
    title: 'Blog & Design Inspiration | Lomash Wood',
    description: 'Discover the latest kitchen and bedroom design trends, tips, and inspiration.',
    type: 'website',
    url: 'https://lomashwood.com/blog',
    images: [
      {
        url: '/images/blog/og-blog.jpg',
        width: 1200,
        height: 630,
        alt: 'Lomash Wood Blog',
      },
    ],
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 to-stone-100 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 mb-6">
              Blog & Inspiration
            </h1>
            <p className="text-lg md:text-xl text-stone-600">
              Explore the latest trends, expert tips, and inspiring ideas for your dream kitchen and bedroom designs.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Category Filter */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="sticky top-24">
                <Suspense fallback={<Skeleton className="h-96 w-full" />}>
                </Suspense>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              <Suspense fallback={
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="space-y-4">
                      <Skeleton className="h-48 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                    </div>
                  ))}
                </div>
              }>
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-amber-700">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-amber-100 mb-8">
              Get the latest design trends and exclusive offers delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-white text-amber-700 font-semibold rounded-lg hover:bg-stone-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}