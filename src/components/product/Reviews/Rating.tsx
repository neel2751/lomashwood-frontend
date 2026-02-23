"use client";

import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg" | "xl";
  showValue?: boolean;
  readonly?: boolean;
  onChange?: (rating: number) => void;
  className?: string;
}

const sizeClasses = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
  xl: "h-6 w-6",
};

export default function Rating({
  value,
  maxRating = 5,
  size = "md",
  showValue = false,
  readonly = false,
  onChange,
  className,
}: RatingProps) {
  const handleClick = (rating: number) => {
    if (!readonly && onChange) {
      onChange(rating);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, rating: number) => {
    if (!readonly && onChange) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onChange(rating);
      }
    }
  };

  const renderStar = (index: number) => {
    const starValue = index + 1;
    const fillPercentage = Math.min(Math.max(value - index, 0), 1);

    return (
      <div
        key={index}
        className="relative inline-block"
        onClick={() => handleClick(starValue)}
        onKeyDown={(e) => handleKeyDown(e, starValue)}
        role={readonly ? undefined : "button"}
        tabIndex={readonly ? undefined : 0}
        aria-label={`Rate ${starValue} out of ${maxRating}`}
      >
        {/* Background star (empty) */}
        <Star
          className={cn(
            sizeClasses[size],
            "text-gray-300",
            !readonly && "cursor-pointer transition-all hover:scale-110"
          )}
        />

        {/* Foreground star (filled) */}
        {fillPercentage > 0 && (
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${fillPercentage * 100}%` }}
          >
            <Star
              className={cn(
                sizeClasses[size],
                "fill-yellow-400 text-yellow-400",
                !readonly && "cursor-pointer transition-all hover:scale-110"
              )}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxRating }, (_, index) => renderStar(index))}
      </div>
      {showValue && (
        <span className="ml-1 text-sm font-medium text-muted-foreground">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
}