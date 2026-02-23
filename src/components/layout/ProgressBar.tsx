"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setProgress(0);

    const timer = setTimeout(() => {
      setProgress(100);
    }, 100);

    const completeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 400);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [pathname, searchParams]);

  if (!isLoading && progress === 0) return null;

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 h-1 z-50 bg-primary origin-left transition-all duration-300 ease-out",
        !isLoading && "opacity-0"
      )}
      style={{
        transform: `scaleX(${progress / 100})`,
      }}
    />
  );
}