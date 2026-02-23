"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

interface FilterGroupProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  count?: number;
  className?: string;
}

export default function FilterGroup({
  title,
  children,
  defaultOpen = true,
  count,
  className,
}: FilterGroupProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn("border-b border-border last:border-b-0", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-left transition-colors hover:text-primary"
        aria-expanded={isOpen}
        aria-controls={`filter-${title.toLowerCase().replace(/\s+/g, "-")}`}
      >
        <div className="flex items-center gap-2">
          <span className="font-medium">{title}</span>
          {count !== undefined && count > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {count}
            </span>
          )}
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 transition-transform" />
        ) : (
          <ChevronDown className="h-4 w-4 transition-transform" />
        )}
      </button>

      {isOpen && (
        <div
          id={`filter-${title.toLowerCase().replace(/\s+/g, "-")}`}
          className="animate-in slide-in-from-top-2 pb-4"
        >
          {children}
        </div>
      )}
    </div>
  );
}