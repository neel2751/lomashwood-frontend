"use client";

import { ChevronDown, ChevronUp, Check } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DescriptionProps {
  shortDescription?: string;
  longDescription?: string;
  features?: string[];
}

export default function Description({
  shortDescription,
  longDescription,
  features,
}: DescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasLongDescription = longDescription && longDescription.length > 200;

  return (
    <div className="space-y-4">
      {/* Short Description */}
      {shortDescription && (
        <div className="text-base text-gray-700 leading-relaxed">
          {shortDescription}
        </div>
      )}

      {/* Long Description */}
      {longDescription && (
        <div className="space-y-3">
          <div
            className={cn(
              "text-sm text-gray-600 leading-relaxed transition-all duration-300",
              !isExpanded && hasLongDescription && "line-clamp-3"
            )}
          >
            {longDescription}
          </div>

          {/* Read More/Less Button */}
          {hasLongDescription && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-auto p-0 text-primary hover:text-primary/80 font-medium"
            >
              {isExpanded ? (
                <>
                  Read Less
                  <ChevronUp className="ml-1 h-4 w-4" />
                </>
              ) : (
                <>
                  Read More
                  <ChevronDown className="ml-1 h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>
      )}

      {/* Features List */}
      {features && features.length > 0 && (
        <div className="pt-2">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Key Features
          </h3>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-gray-700"
              >
                <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}