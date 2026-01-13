import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for could not be found.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-lomash-light via-white to-lomash-gray-50 px-4 py-16 dark:from-lomash-gray-900 dark:via-lomash-gray-900 dark:to-lomash-gray-800">
      <div className="w-full max-w-2xl text-center">
        {/* 404 Illustration */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 animate-pulse rounded-full bg-lomash-primary/10 blur-3xl" />
            <svg
              className="relative h-64 w-64 text-lomash-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Error Code */}
        <div className="mb-4">
          <h1 className="text-gradient bg-gradient-to-r from-lomash-primary via-lomash-secondary to-lomash-accent bg-clip-text font-heading text-9xl font-bold text-transparent">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-8 space-y-3">
          <h2 className="font-heading text-3xl font-semibold text-lomash-dark dark:text-white md:text-4xl">
            Page Not Found
          </h2>
          <p className="mx-auto max-w-md text-lg text-lomash-gray-600 dark:text-lomash-gray-400">
            Oops! The page you're looking for seems to have wandered off into the
            woods. Let's help you find your way back home.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="btn-primary inline-flex items-center gap-2 text-base"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Back to Home
          </Link>

          <Link
            href="/products"
            className="btn-outline inline-flex items-center gap-2 text-base"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            Browse Products
          </Link>
        </div>

        {/* Popular Links */}
        <div className="mt-12 rounded-lg border border-lomash-gray-200 bg-white p-6 shadow-sm dark:border-lomash-gray-700 dark:bg-lomash-gray-800">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-lomash-gray-500 dark:text-lomash-gray-400">
            Popular Pages
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Link
              href="/products"
              className="link-muted text-sm transition-colors hover:text-lomash-primary"
            >
              Products
            </Link>
            <Link
              href="/categories"
              className="link-muted text-sm transition-colors hover:text-lomash-primary"
            >
              Categories
            </Link>
            <Link
              href="/about"
              className="link-muted text-sm transition-colors hover:text-lomash-primary"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="link-muted text-sm transition-colors hover:text-lomash-primary"
            >
              Contact
            </Link>
            <Link
              href="/blog"
              className="link-muted text-sm transition-colors hover:text-lomash-primary"
            >
              Blog
            </Link>
            <Link
              href="/showrooms"
              className="link-muted text-sm transition-colors hover:text-lomash-primary"
            >
              Showrooms
            </Link>
            <Link
              href="/faq"
              className="link-muted text-sm transition-colors hover:text-lomash-primary"
            >
              FAQ
            </Link>
            <Link
              href="/cart"
              className="link-muted text-sm transition-colors hover:text-lomash-primary"
            >
              Shopping Cart
            </Link>
          </div>
        </div>

        {/* Search Suggestion */}
        <div className="mt-8">
          <p className="mb-4 text-sm text-lomash-gray-600 dark:text-lomash-gray-400">
            Looking for something specific?
          </p>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 text-sm text-lomash-primary transition-colors hover:text-lomash-secondary"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Try searching our site
          </Link>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-4 top-1/4 h-72 w-72 rounded-full bg-lomash-primary/5 blur-3xl" />
        <div className="absolute -right-4 bottom-1/4 h-72 w-72 rounded-full bg-lomash-accent/5 blur-3xl" />
      </div>
    </div>
  );
}