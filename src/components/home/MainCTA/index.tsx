"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MainCTA() {
  return (
    <section className="section-padding bg-lomash-gray-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/cta-image.jpg"
                alt="Lomash Wood Showroom"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Decorative Elements */}
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-lomash-primary/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-lomash-accent/20 rounded-full blur-3xl" />
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-6 hidden md:block">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-lomash-primary/10 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-lomash-primary"
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
                <div>
                  <p className="text-2xl font-bold text-lomash-primary">10,000+</p>
                  <p className="text-sm text-lomash-gray-600">Happy Customers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="order-1 lg:order-2">
            <div className="inline-block px-4 py-2 bg-lomash-primary/10 rounded-full mb-4">
              <span className="text-lomash-primary font-semibold text-sm">
                Get Started Today
              </span>
            </div>

            <h2 className="heading-2 text-lomash-dark mb-4">
              Ready to Transform Your Home?
            </h2>

            <p className="text-lg text-lomash-gray-600 mb-6">
              Book your free consultation today and let our expert designers help you create the kitchen or bedroom of your dreams. Get started with a personalized design plan tailored to your style and budget.
            </p>

            {/* Benefits List */}
            <ul className="space-y-4 mb-8">
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-lomash-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    className="w-4 h-4 text-lomash-primary"
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
                <div>
                  <p className="font-semibold text-lomash-dark">Free Home Consultation</p>
                  <p className="text-sm text-lomash-gray-600">
                    Our experts visit your home for precise measurements
                  </p>
                </div>
              </li>

              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-lomash-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    className="w-4 h-4 text-lomash-primary"
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
                <div>
                  <p className="font-semibold text-lomash-dark">Customized 3D Design</p>
                  <p className="text-sm text-lomash-gray-600">
                    Visualize your space before installation begins
                  </p>
                </div>
              </li>

              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-lomash-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    className="w-4 h-4 text-lomash-primary"
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
                <div>
                  <p className="font-semibold text-lomash-dark">10-Year Warranty</p>
                  <p className="text-sm text-lomash-gray-600">
                    Peace of mind with comprehensive coverage
                  </p>
                </div>
              </li>
            </ul>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/book-appointment">
                <Button size="xl" className="group">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              <Link href="/contact">
                <Button size="xl" variant="outline" className="group">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Us Now
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 pt-8 border-t border-lomash-gray-200">
              <div className="flex flex-wrap items-center gap-6 text-sm text-lomash-gray-600">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-lomash-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>4.9/5 Rating</span>
                </div>

                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-lomash-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <span>10,000+ Customers</span>
                </div>

                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-lomash-primary"
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
                  <span>10-Year Warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}