"use client";

import { Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useFilterStore } from "@/stores/useFilterStore";

interface Color {
  id: string;
  name: string;
  hex: string;
  available: boolean;
  count?: number;
}

const AVAILABLE_COLORS: Color[] = [
  { id: "white", name: "White", hex: "#FFFFFF", available: true, count: 24 },
  { id: "black", name: "Black", hex: "#000000", available: true, count: 18 },
  { id: "gray", name: "Gray", hex: "#9CA3AF", available: true, count: 32 },
  { id: "beige", name: "Beige", hex: "#F5F5DC", available: true, count: 15 },
  { id: "brown", name: "Brown", hex: "#8B4513", available: true, count: 12 },
  { id: "cream", name: "Cream", hex: "#FFFDD0", available: true, count: 20 },
  { id: "navy", name: "Navy Blue", hex: "#000080", available: true, count: 8 },
  { id: "charcoal", name: "Charcoal", hex: "#36454F", available: true, count: 14 },
  { id: "walnut", name: "Walnut", hex: "#773F1A", available: true, count: 10 },
  { id: "oak", name: "Oak", hex: "#BC987E", available: true, count: 16 },
  { id: "cherry", name: "Cherry", hex: "#9A3324", available: true, count: 9 },
  { id: "mahogany", name: "Mahogany", hex: "#C04000", available: true, count: 7 },
  { id: "maple", name: "Maple", hex: "#D4A574", available: true, count: 11 },
  { id: "espresso", name: "Espresso", hex: "#4B3621", available: true, count: 13 },
  { id: "sage", name: "Sage Green", hex: "#9CAF88", available: true, count: 6 },
  { id: "slate", name: "Slate", hex: "#708090", available: true, count: 5 },
];

export default function ColorFilter() {
  const store = useFilterStore();

  const selectedColors = ((store as any).colors || (store as any).color || []) as string[];

  const handleColorToggle = (colorId: string) => {
    const newColors = selectedColors.includes(colorId)
      ? selectedColors.filter((id) => id !== colorId)
      : [...selectedColors, colorId];

    const storeAny = store as any;
    if (storeAny.setFilter) {
      storeAny.setFilter("colors", newColors);
    } else if (storeAny.setColors) {
      storeAny.setColors(newColors);
    } else if (storeAny.setColor) {
      storeAny.setColor(newColors);
    } else if (storeAny.updateColors) {
      storeAny.updateColors(newColors);
    }
  };

  const handleClearColors = () => {
    const storeAny = store as any;
    if (storeAny.setFilter) {
      storeAny.setFilter("colors", []);
    } else if (storeAny.setColors) {
      storeAny.setColors([]);
    } else if (storeAny.setColor) {
      storeAny.setColor([]);
    } else if (storeAny.updateColors) {
      storeAny.updateColors([]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Selected Count & Clear */}
      {selectedColors.length > 0 && (
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            {selectedColors.length} selected
          </Badge>
          <button
            onClick={handleClearColors}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear
          </button>
        </div>
      )}

      {/* Color Grid */}
      <div className="grid grid-cols-4 gap-3">
        {AVAILABLE_COLORS.map((color) => {
          const isSelected = selectedColors.includes(color.id);
          const isDisabled = !color.available;

          return (
            <button
              key={color.id}
              onClick={() => !isDisabled && handleColorToggle(color.id)}
              disabled={isDisabled}
              className={cn(
                "group relative flex flex-col items-center gap-2 rounded-lg p-2 transition-all",
                "hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isDisabled && "cursor-not-allowed opacity-40"
              )}
              title={`${color.name}${color.count ? ` (${color.count})` : ""}`}
              aria-label={`Filter by ${color.name}`}
              aria-pressed={isSelected}
            >
              {/* Color Swatch */}
              <div
                className={cn(
                  "relative h-10 w-10 rounded-full border-2 transition-all",
                  isSelected
                    ? "border-primary ring-2 ring-primary ring-offset-2"
                    : "border-border group-hover:border-primary/50",
                  isDisabled && "grayscale"
                )}
                style={{
                  backgroundColor: color.hex,
                  boxShadow:
                    color.hex === "#FFFFFF"
                      ? "inset 0 0 0 1px rgba(0,0,0,0.1)"
                      : undefined,
                }}
              >
                {/* Check Icon */}
                {isSelected && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className={cn(
                        "flex h-5 w-5 items-center justify-center rounded-full",
                        color.hex === "#FFFFFF" ||
                          color.hex === "#F5F5DC" ||
                          color.hex === "#FFFDD0"
                          ? "bg-primary text-primary-foreground"
                          : "bg-white text-primary"
                      )}
                    >
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </div>
                  </div>
                )}
              </div>

              {/* Color Name */}
              <span
                className={cn(
                  "text-xs text-center leading-tight line-clamp-2",
                  isSelected ? "font-medium text-foreground" : "text-muted-foreground"
                )}
              >
                {color.name}
              </span>

              {/* Product Count */}
              {color.count !== undefined && (
                <span className="text-[10px] text-muted-foreground">
                  ({color.count})
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Info Text */}
      <p className="text-xs text-muted-foreground">
        Select multiple colours to see all matching products
      </p>
    </div>
  );
}