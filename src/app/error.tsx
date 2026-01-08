"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-lomash-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
          <AlertTriangle className="h-10 w-10 text-red-600" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-lomash-dark mb-3">
          Oops! Something went wrong
        </h1>

        {/* Description */}
        <p className="text-lomash-gray-600 mb-2">
          We're sorry, but something unexpected happened. Our team has been notified and is working on it.
        </p>

        {/* Error Message (Development Only) */}
        {process.env.NODE_ENV === "development" && error.message && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
            <p className="text-sm font-mono text-red-800 break-words">
              {error.message}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Button
            size="lg"
            onClick={reset}
            className="w-full sm:w-auto group"
          >
            <RefreshCcw className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
            Try Again
          </Button>

          <Link href="/" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </Link>
        </div>

        {/* Help Text */}
        <p className="text-sm text-lomash-gray-500 mt-8">
          If the problem persists, please{" "}
          <Link
            href="/contact"
            className="text-lomash-primary hover:underline font-medium"
          >
            contact our support team
          </Link>
          .
        </p>
      </div>
    </div>
  );
}