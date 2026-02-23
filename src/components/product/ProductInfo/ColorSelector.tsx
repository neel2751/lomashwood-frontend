"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

interface ColorOption {
  name: string;
  hex?: string;
  image?: string;
}

interface ColorSelectorProps {
  colors: string[];
  selectedColor: string;
  onColorSelect: (color: string) => void;
  colorOptions?: ColorOption[];
}

export default function ColorSelector({
  colors,
  selectedColor,
  onColorSelect,
  colorOptions,
}: ColorSelectorProps) {
  const getColorDetails = (colorName: string): ColorOption => {
    const option = colorOptions?.find(
      (opt) => opt.name.toLowerCase() === colorName.toLowerCase()
    );
    return option || { name: colorName };
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-base font-semibold block">Select Colour</label>
        <p className="text-sm text-muted-foreground">
          Current: <span className="font-medium text-foreground">{selectedColor}</span>
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {colors.map((color) => {
          const colorDetails = getColorDetails(color);
          const isSelected = selectedColor === color;

          return (
            <div key={color} className="relative group">
              <button
                type="button"
                onClick={() => onColorSelect(color)}
                className={cn(
                  "relative w-12 h-12 rounded-full border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                  isSelected
                    ? "border-primary ring-2 ring-primary ring-offset-2 scale-110"
                    : "border-gray-300 hover:border-gray-400 hover:scale-105"
                )}
                aria-label={`Select ${color} colour`}
                title={colorDetails.name}
              >
                {/* Color Display */}
                <div
                  className="w-full h-full rounded-full overflow-hidden"
                  style={{
                    backgroundColor: colorDetails.hex || "#e5e7eb",
                    backgroundImage: colorDetails.image
                      ? `url(${colorDetails.image})`
                      : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* Checkmark for selected color */}
                  {isSelected && (
                    <div className="w-full h-full flex items-center justify-center bg-black/20">
                      <Check className="w-5 h-5 text-white drop-shadow-md" />
                    </div>
                  )}
                </div>

                {/* Selected Indicator Ring */}
                {isSelected && (
                  <div className="absolute inset-0 rounded-full border-2 border-primary animate-pulse" />
                )}
              </button>
              
              {/* Tooltip using CSS */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                {colorDetails.name}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Color Grid View (Alternative for many colors) */}
      {colors.length > 8 && (
        <div className="pt-2">
          <details className="group">
            <summary className="text-sm text-primary hover:text-primary/80 cursor-pointer font-medium list-none flex items-center gap-1">
              View all {colors.length} colours
              <span className="group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="mt-4 grid grid-cols-6 sm:grid-cols-8 gap-2">
              {colors.map((color) => {
                const colorDetails = getColorDetails(color);
                const isSelected = selectedColor === color;

                return (
                  <div key={`grid-${color}`} className="relative group">
                    <button
                      type="button"
                      onClick={() => onColorSelect(color)}
                      className={cn(
                        "relative w-10 h-10 rounded-md border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary",
                        isSelected
                          ? "border-primary ring-2 ring-primary scale-105"
                          : "border-gray-300 hover:border-gray-400"
                      )}
                      title={colorDetails.name}
                      aria-label={`Select ${color} colour`}
                    >
                      <div
                        className="w-full h-full rounded-sm overflow-hidden"
                        style={{
                          backgroundColor: colorDetails.hex || "#e5e7eb",
                          backgroundImage: colorDetails.image
                            ? `url(${colorDetails.image})`
                            : undefined,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        {isSelected && (
                          <div className="w-full h-full flex items-center justify-center bg-black/20">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    </button>
                    
                    {/* Tooltip using CSS */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                      {colorDetails.name}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                    </div>
                  </div>
                );
              })}
            </div>
          </details>
        </div>
      )}
    </div>
  );
}