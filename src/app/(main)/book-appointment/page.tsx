import { 
  Calendar,
  Clock,
  MapPin,
  Phone,
  CheckCircle2,
  Users
} from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

import BookingWizard from '@/components/booking/BookingWizard';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';


export const metadata: Metadata = {
  title: 'Book Free Consultation | Lomash Wood',
  description: 'Schedule your free design consultation with our expert designers. Available for home visits or showroom appointments.',
  openGraph: {
    title: 'Book Free Consultation | Lomash Wood',
    description: 'Schedule your free design consultation with our expert designers.',
    type: 'website',
  },
};

export default async function BookAppointmentPage({searchParams}: { searchParams: { product?: string, category?: string } }) {
  const { product, category } = await searchParams;
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-primary/5 border-b">
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Book Your Free Consultation Today
              {product && category ? (
                <>
                  <br />
                  <span className="text-primary">
                    for {product.replace(/-/g, ' ')}
                  </span>
                </>
              ) : null}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Meet with our expert designers to bring your dream kitchen or bedroom to life. 
              No obligation, completely free.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="font-medium">100% Free Service</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="font-medium">Expert Designers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="font-medium">No Obligation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 lg:py-12
      px-4 sm:px-6 lg:px-16
      ">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground">Book Appointment</span>
        </nav>

        {product && category && (
          <div className="mb-8">
            <ShowProductCategoryCard product={product} category={category} />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Booking Form */}
          <div className="lg:col-span-2">
            <Suspense fallback={<BookingWizardSkeleton />}>
              <BookingWizard product={product} category={category} />
            </Suspense>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* What to Expect */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4 text-lg">What to Expect</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Initial Discussion</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Share your ideas and requirements with our designer
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Space Assessment</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        We'll measure and assess your space (for home visits)
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Design Concepts</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Explore styles, colors, and materials together
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">4</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Custom Quote</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Receive a detailed, personalized quotation
                      </p>
                    </div>
                  </li>
                </ul>
              </Card>

              {/* Appointment Types */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4 text-lg">Appointment Options</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Free Home Measure Appointment</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        In just 60 minutes, our expert will visit your home to measure your space and discuss your design needs in detail.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Users className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Showroom Visit</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Visit our showroom to explore our full range of products and materials with the guidance of our designers.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Video Consultation</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Connect with our designers from the comfort of your home for a virtual consultation.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Contact */}
              <Card className="p-6 bg-primary/5">
                <h3 className="font-semibold mb-3">Prefer to Speak to Us?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Call our team directly and we'll help you book an appointment over the phone.
                </p>
                <Link
                  href="tel:+1234567890"
                  className="flex items-center justify-center gap-2 w-full rounded-md bg-lomash-primary px-4 py-3 text-base font-medium text-primary-foreground hover:bg-lomash-secondary transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  Call Us Now
                </Link>
                <p className="text-xs text-center text-muted-foreground mt-3">
                  Mon-Fri: 9am-6pm | Sat: 9am-5pm | Sun: 10am-4pm
                </p>
              </Card>

              {/* Trust Signals */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4 text-lg">Why Book With Us?</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Over 20 years of design experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Award-winning design team</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Thousands of satisfied customers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Free design service with no obligation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Flexible appointment times to suit you</span>
                  </li>
                </ul>
              </Card>

              {/* FAQ Quick Links */}
              <Card className="p-6">
                <h3 className="font-semibold mb-3">Common Questions</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#" className="text-primary hover:underline">
                      How long does a consultation take?
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-primary hover:underline">
                      Can I reschedule my appointment?
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-primary hover:underline">
                      What should I prepare for the visit?
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-primary hover:underline">
                      Do you offer evening appointments?
                    </Link>
                  </li>
                </ul>
              </Card>
            </div>
          </aside>
        </div>

        {/* Additional Information */}
        <div className="mt-12 container mx-auto">
          <Card className="p-6 lg:p-8">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Preparing for Your Consultation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Before Your Appointment
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Gather inspiration photos or ideas</li>
                  <li>• Measure your space if possible</li>
                  <li>• Note any specific requirements</li>
                  <li>• Consider your budget range</li>
                  <li>• List must-have features</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  During Your Appointment
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Share your vision and lifestyle needs</li>
                  <li>• Ask questions about materials and finishes</li>
                  <li>• Discuss timeline and installation</li>
                  <li>• Explore finance options if needed</li>
                  <li>• Review warranty and aftercare</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function BookingWizardSkeleton() {
  return (
    <Card className="p-6 lg:p-8">
      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center">
            <Skeleton className="h-10 w-10 rounded-full" />
            {i < 3 && <Skeleton className="h-1 w-16 mx-2" />}
          </div>
        ))}
      </div>

      {/* Form Content */}
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-full max-w-lg" />
        
        <div className="space-y-4 mt-8">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <Skeleton className="h-11 w-24" />
          <Skeleton className="h-11 w-32" />
        </div>
      </div>
    </Card>
  );
}

function ShowProductCategoryCard({ product, category }: { product?: string, category?: string }) {
    return (
      <Card className="bg-primary/5">
        <CardHeader className="flex flex-row items-start gap-4">
          <div className="w-16 h-16 rounded-md bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary uppercase">
              {product ? product.charAt(0) : 'P'}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-lg capitalize">
              Booking Consultation for {product ? product.replace(/-/g, ' ') : 'Product'}
            </h3>
            <p className="text-sm text-muted-foreground capitalize">
              Service: {category ? category.replace(/-/g, ' ') : 'N/A'}
            </p>
          </div>
        </CardHeader>
      </Card>
    );
}