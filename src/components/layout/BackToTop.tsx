"use client";

import { ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BackToTopProps {
  showAt?: number;
  className?: string;
}

export function BackToTop({ showAt = 300, className }: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > showAt) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, [showAt]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      onClick={scrollToTop}
      size="icon"
      className={cn(
        "fixed bottom-8 right-8 z-40 rounded-full shadow-lg transition-all duration-300",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-16 pointer-events-none",
        className
      )}
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
}