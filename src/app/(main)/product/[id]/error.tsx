'use client';

import { 
  AlertTriangle, 
  Home, 
  RefreshCw, 
  Search,
  ShoppingBag
} from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ProductErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ProductError({ error, reset }: ProductErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Product page error:', error);
  }, [error]);

  // Determine error type
  const isNotFound = error.message.includes('404') || error.message.includes('not found');
  const isNetworkError = error.message.includes('fetch') || error.message.includes('network');

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground">Product Error</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 lg:p-12 text-center">
            {/* Error Icon */}
            <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="h-10 w-10 text-destructive" />
            </div>

            {/* Error Title */}
            <h1 className="text-3xl font-bold mb-3">
              {isNotFound ? 'Product Not Found' : 'Something Went Wrong'}
            </h1>

            {/* Error Message */}
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              {isNotFound
                ? "We couldn't find the product you're looking for. It may have been removed or is temporarily unavailable."
                : isNetworkError
                ? "We're having trouble loading this product. Please check your internet connection and try again."
                : "An unexpected error occurred while loading this product. Our team has been notified and we're working to fix it."}
            </p>

            {/* Error Details (Development only) */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mb-8 p-4 bg-muted rounded-lg text-left">
                <p className="text-xs font-mono text-muted-foreground break-all">
                  {error.message}
                </p>
                {error.digest && (
                  <p className="text-xs font-mono text-muted-foreground mt-2">
                    Error ID: {error.digest}
                  </p>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              {!isNotFound && (
                <Button onClick={reset} size="lg" className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Try Again
                </Button>
              )}
              
              <Button asChild variant={isNotFound ? 'default' : 'outline'} size="lg" className="gap-2">
                <Link href="/">
                  <Home className="h-4 w-4" />
                  Go Home
                </Link>
              </Button>
            </div>

            {/* Alternative Actions */}
            <div className="pt-8 border-t">
              <p className="text-sm text-muted-foreground mb-4">
                You might also want to:
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild variant="ghost" size="sm" className="gap-2">
                  <Link href="/kitchen">
                    <ShoppingBag className="h-4 w-4" />
                    Browse Kitchen
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="sm" className="gap-2">
                  <Link href="/bedroom">
                    <ShoppingBag className="h-4 w-4" />
                    Browse Bedroom
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="sm" className="gap-2">
                  <Link href="/search">
                    <Search className="h-4 w-4" />
                    Search Products
                  </Link>
                </Button>
              </div>
            </div>
          </Card>

          {/* Help Section */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Need help finding what you're looking for?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild variant="outline" size="sm">
                <Link href="/contact">
                  Contact Support
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/book-appointment">
                  Book Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="tel:01708898755">
                  Call Us Now
                </Link>
              </Button>
            </div>
          </div>

          {/* Popular Categories */}
          <div className="mt-12">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Explore Popular Categories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link 
                href="/kitchen"
                className="group p-6 border rounded-lg hover:border-primary hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      Kitchen Design
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Browse our kitchen collection
                    </p>
                  </div>
                </div>
              </Link>

              <Link 
                href="/bedroom"
                className="group p-6 border rounded-lg hover:border-primary hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      Bedroom Design
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Explore bedroom furniture
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}