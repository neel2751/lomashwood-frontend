import React from "react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-2",
    lg: "w-12 h-12 border-3",
    xl: "w-16 h-16 border-4",
  };

  return (
    <div
      className={cn(
        "inline-block rounded-full border-lomash-gray-200 border-t-lomash-primary animate-spin",
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

interface PageLoaderProps {
  className?: string;
}

export function PageLoader({ className }: PageLoaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center min-h-screen bg-white",
        className
      )}
    >
      <div className="text-center space-y-4">
        <LoadingSpinner size="xl" />
        <p className="text-lomash-gray-600 text-lg">Loading...</p>
      </div>
    </div>
  );
}

interface SpinnerOverlayProps {
  message?: string;
  className?: string;
}

export function SpinnerOverlay({ message, className }: SpinnerOverlayProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50",
        className
      )}
    >
      <div className="bg-white rounded-lg p-8 shadow-2xl text-center space-y-4">
        <LoadingSpinner size="lg" />
        {message && (
          <p className="text-lomash-dark font-medium">{message}</p>
        )}
      </div>
    </div>
  );
}