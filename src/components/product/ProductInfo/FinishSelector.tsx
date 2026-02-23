"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

interface FinishOption {
  name: string;
  description?: string;
  image?: string;
  popular?: boolean;
}

interface FinishSelectorProps {
  finishes: string[];
  selectedFinish: string;
  onFinishSelect: (finish: string) => void;
  finishOptions?: FinishOption[];
}

export default function FinishSelector({
  finishes,
  selectedFinish,
  onFinishSelect,
  finishOptions,
}: FinishSelectorProps) {
  const getFinishDetails = (finishName: string): FinishOption => {
    const option = finishOptions?.find(
      (opt) => opt.name.toLowerCase() === finishName.toLowerCase()
    );
    return option || { name: finishName };
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-base font-semibold block">Select Finish</label>
        <p className="text-sm text-muted-foreground">
          Current: <span className="font-medium text-foreground">{selectedFinish}</span>
        </p>
      </div>

      <div className="space-y-3">
        {finishes.map((finish) => {
          const finishDetails = getFinishDetails(finish);
          const isSelected = selectedFinish === finish;

          return (
            <label
              key={finish}
              htmlFor={`finish-${finish}`}
              className={cn(
                "relative flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200",
                isSelected
                  ? "border-primary bg-primary/5 ring-2 ring-primary ring-offset-2"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              )}
            >
              {/* Custom Radio Button */}
              <div className="flex items-center pt-0.5">
                <input
                  type="radio"
                  id={`finish-${finish}`}
                  name="finish-selector"
                  value={finish}
                  checked={isSelected}
                  onChange={() => onFinishSelect(finish)}
                  className="sr-only"
                />
                <div
                  className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                    isSelected
                      ? "border-primary bg-primary"
                      : "border-gray-300 bg-white"
                  )}
                >
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
              </div>

              {/* Finish Image (if available) */}
              {finishDetails.image && (
                <div
                  className={cn(
                    "relative w-16 h-16 rounded-md border overflow-hidden flex-shrink-0",
                    isSelected ? "border-primary" : "border-gray-300"
                  )}
                >
                  <img
                    src={finishDetails.image}
                    alt={finishDetails.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Finish Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-900">
                    {finishDetails.name}
                  </span>
                  {finishDetails.popular && (
                    <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                      Popular
                    </span>
                  )}
                  {isSelected && (
                    <Check className="w-4 h-4 text-primary ml-auto" />
                  )}
                </div>
                {finishDetails.description && (
                  <p className="text-sm text-muted-foreground">
                    {finishDetails.description}
                  </p>
                )}
              </div>
            </label>
          );
        })}
      </div>

      {/* Compact View for Many Finishes */}
      {finishes.length > 5 && (
        <div className="pt-2">
          <details className="group">
            <summary className="text-sm text-primary hover:text-primary/80 cursor-pointer font-medium list-none flex items-center gap-1">
              View compact list
              <span className="group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {finishes.map((finish) => {
                const isSelected = selectedFinish === finish;
                return (
                  <button
                    key={`compact-${finish}`}
                    type="button"
                    onClick={() => onFinishSelect(finish)}
                    className={cn(
                      "px-3 py-2 text-sm rounded-md border-2 transition-all duration-200 text-left",
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground font-medium"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    )}
                  >
                    {finish}
                  </button>
                );
              })}
            </div>
          </details>
        </div>
      )}
    </div>
  );
}