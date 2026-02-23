"use client";

import { Loader2 } from "lucide-react";
import { useEffect  } from "react";

import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";

interface InfiniteScrollProps {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  isFetchingNextPage?: boolean;
  className?: string;
  children?: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  loadMoreText?: string;
  endMessage?: string;
}

export default function InfiniteScroll({
  onLoadMore,
  hasMore,
  isLoading,
  isFetchingNextPage = false,
  className,
  children,
  threshold = 0.5,
  rootMargin = "100px",
  loadMoreText = "Load More Products",
  endMessage = "You've reached the end",
}: InfiniteScrollProps) {
  const { ref: intersectionRef, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
  });

  useEffect(() => {
    if (isIntersecting && hasMore && !isLoading && !isFetchingNextPage) {
      onLoadMore();
    }
  }, [isIntersecting, hasMore, isLoading, isFetchingNextPage, onLoadMore]);

  return (
    <div className={cn("w-full", className)}>
      {children}

      {/* Loading Trigger Element */}
      <div ref={intersectionRef as React.RefObject<HTMLDivElement>} className="py-8">
        {hasMore ? (
          <div className="flex flex-col items-center justify-center gap-4">
            {(isLoading || isFetchingNextPage) && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-sm">Loading more products...</span>
              </div>
            )}

            {/* Manual Load More Button (fallback) */}
            {!isLoading && !isFetchingNextPage && (
              <Button
                onClick={onLoadMore}
                variant="outline"
                size="lg"
                className="min-w-[200px]"
              >
                {loadMoreText}
              </Button>
            )}
          </div>
        ) : (
          !isLoading && (
            <div className="flex flex-col items-center justify-center gap-2 py-8">
              <div className="h-px w-32 bg-border" />
              <p className="text-sm text-muted-foreground">{endMessage}</p>
              <div className="h-px w-32 bg-border" />
            </div>
          )
        )}
      </div>
    </div>
  );
}