import { Search, Monitor, Store } from 'lucide-react';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';

import { PageLoader } from '@/components/shared/PageLoader';
import ShowroomList from '@/components/showroom/ShowroomList';
import ShowroomMap from '@/components/showroom/ShowroomMap';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const metadata: Metadata = {
  title: 'Kitchen Showrooms Near Me | Lomash Wood',
  description:
    'Find your nearest Lomash Wood showroom. Explore our kitchen and bedroom displays, get expert design advice, and see our quality craftsmanship firsthand.',
  keywords:
    'Lomash Wood showrooms, kitchen showroom, bedroom showroom, design consultation, showroom locations',
  openGraph: {
    title: 'Kitchen Showrooms Near Me | Lomash Wood',
    description: 'Visit our showrooms to explore premium kitchen and bedroom designs',
    type: 'website',
  },
};

async function getShowrooms() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/v1/showrooms`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    return data?.data ?? [];
  } catch (error) {
    console.error('Failed to fetch showrooms:', error);
    return [];
  }
}

export default async function ShowroomsPage() {
  const showrooms = await getShowrooms();

  return (
    <main className="min-h-screen">

      {/* ── Hero / Search Section ── */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Find Your Nearest
              {" "}<br/>
              <span className="text-lomash-primary">
                Lomash Wood Showroom
              </span>
            </h1>
            <p className="text-base md:text-lg text-slate-600 mb-8 font-medium">
              Dreaming of a{' '}
              <strong className="font-semibold text-slate-900">
                <Link href="/kitchen" className="underline hover:text-lomash-primary transition-colors">
                  Traditional Kitchen
                </Link>
              </strong>
              ? Or have you been longing for a bedroom refresh with our{' '}
              <strong className="font-semibold text-slate-900">
                <Link href="/bedroom" className="underline hover:text-lomash-primary transition-colors">
                  Bespoke Bedroom Designs
                </Link>
              </strong>
              ? Whatever your kitchen or bedroom dream, find your nearest Lomash Wood showroom and let our
              expert designers help bring it to life.
            </p>

            {/* Search bar */}
            <div className="relative max-w-xl mx-auto">
              <Input
                type="text"
                placeholder="Search by postcode, town or city"
                className="pl-5 pr-14 py-6 text-base rounded-none focus:ring-0 focus:border-lomash-primary w-full"
              />
              <button
                className="absolute right-0 top-0 h-full px-5 bg-white border border-l-0 border-slate-300 hover:bg-lomash-primary hover:text-white transition-colors group"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-lomash-primary group-hover:text-white" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Showrooms List / Map (tabs) ── */}
      <section className="py-8 md:py-12 px-4 md:px-18 bg-slate-50">
        <div className="container mx-auto px-4">
          {showrooms.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              No showrooms found. Please check back later.
            </div>
          ) : (
            <Tabs defaultValue="list" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full max-w-xs grid-cols-2 rounded-full border border-slate-300 bg-white p-0 h-auto">
                  <TabsTrigger
                    value="list"
                    className="rounded-none py-3 text-sm font-medium data-[state=active]:bg-lomash-primary data-[state=active]:text-white
                    rounded-l-full data-[state=active]:rounded-l-full data-[state=active]:rounded-r-full"
                  >
                    List View
                  </TabsTrigger>
                  <TabsTrigger
                    value="map"
                    className="rounded-none py-3 text-sm font-medium data-[state=active]:bg-lomash-primary data-[state=active]:text-white
                    rounded-r-full data-[state=active]:rounded-r-full data-[state=active]:rounded-l-full"
                  >
                    Map View
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="list" className="mt-0">
                <Suspense fallback={<PageLoader />}>
                  <ShowroomList showrooms={showrooms} />
                </Suspense>
              </TabsContent>

              <TabsContent value="map" className="mt-0">
                <Suspense fallback={<PageLoader />}>
                  <ShowroomMap showrooms={showrooms} />
                </Suspense>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </section>

      {/* ── Bespoke Design Service ── */}
      <section className="bg-lomash-dark py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">

            {/* Urgency badge */}
            <div className="flex justify-center mb-8">
              <span className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-lomash-primary inline-block" />
                Appointments filling up fast
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-lomash-light text-center mb-10">
              Our bespoke design service
            </h2>

            {/* Two cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {/* In-store */}
              <div className="bg-white p-8 rounded-lg">
                <Monitor className="w-9 h-9 text-lomash-primary mb-5" strokeWidth={1.5} />
                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                  In-store design appointment
                </h3>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-lomash-primary flex-shrink-0" />
                    Meet your dedicated designer
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-lomash-primary flex-shrink-0" />
                    Receive a quote tailored to your style and budget
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-lomash-primary flex-shrink-0" />
                    3D design to visualise your dream kitchen
                  </li>
                </ul>
              </div>

              {/* Virtual */}
              <div className="bg-white p-8 rounded-lg">
                <Store className="w-9 h-9 text-lomash-primary mb-5" strokeWidth={1.5} />
                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                  Virtual design appointment
                </h3>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-lomash-primary flex-shrink-0" />
                    Expert design advice from the comfort of your home
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-lomash-primary flex-shrink-0" />
                    Receive a quote tailored to your style and budget
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-lomash-primary flex-shrink-0" />
                    3D design to visualise your dream kitchen
                  </li>
                </ul>
              </div>
            </div>

            {/* CTA button */}
            <div className="flex justify-center">
              
                href="/book-appointment"
                className="inline-flex items-center text-base font-semibold rounded-full justify-center px-10 py-4 bg-lomash-primary text-white hover:bg-lomash-secondary transition-colors"
                Book a free appointment

            </div>
          </div>
        </div>
      </section>

      {/* ── Why Visit ── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12">
              Why visit our showrooms?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: 'See & Touch Quality',
                  body: 'Experience premium materials and craftsmanship firsthand. Feel the quality of our finishes and hardware before you buy.',
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  ),
                },
                {
                  title: 'Expert Advice',
                  body: 'Get personalised design advice from our experienced showroom consultants who understand your needs and budget.',
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  ),
                },
                {
                  title: 'Design Inspiration',
                  body: 'Browse complete kitchen and bedroom displays to spark ideas and visualise your dream space in a real setting.',
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  ),
                },
                {
                  title: 'No Pressure',
                  body: 'Browse at your own pace with no obligation. Our team is here to help when you need us — never pushy.',
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  ),
                },
              ].map(({ title, body, icon }) => (
                <div key={title} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-11 h-11 bg-lomash-primary flex items-center justify-center rounded-full">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {icon}
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{title}</h3>
                    <p className="text-base text-slate-600 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Trade Banner ── */}
      <section className="bg-lomash-secondary py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 max-w-5xl mx-auto">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Are you in the trade?</h2>
              <p className="text-white/80 text-sm">
                Sign up for a Lomash Wood Trade account and get exclusive benefits &amp; discounts
              </p>
            </div>
            
              href="/business"
              className="flex-shrink-0 inline-flex rounded-full items-center justify-center px-7 py-3 bg-transparent text-white font-semibold text-base border border-white hover:bg-white hover:text-slate-900 transition-colors whitespace-nowrap"
            
              Apply on Lomash Trade

          </div>
        </div>
      </section>

    </main>
  );
}