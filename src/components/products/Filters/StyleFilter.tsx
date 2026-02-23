"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useFilterStore } from "@/stores/useFilterStore";

interface Style {
  id: string;
  name: string;
  description?: string;
  available: boolean;
  count?: number;
}

const AVAILABLE_STYLES: Style[] = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean lines and minimalist design",
    available: true,
    count: 45,
  },
  {
    id: "contemporary",
    name: "Contemporary",
    description: "Current trends with timeless appeal",
    available: true,
    count: 38,
  },
  {
    id: "traditional",
    name: "Traditional",
    description: "Classic and ornate detailing",
    available: true,
    count: 32,
  },
  {
    id: "transitional",
    name: "Transitional",
    description: "Blend of traditional and modern",
    available: true,
    count: 28,
  },
  {
    id: "scandinavian",
    name: "Scandinavian",
    description: "Simple, functional, and bright",
    available: true,
    count: 22,
  },
  {
    id: "industrial",
    name: "Industrial",
    description: "Raw materials and exposed elements",
    available: true,
    count: 18,
  },
  {
    id: "shaker",
    name: "Shaker",
    description: "Simple, clean, and functional",
    available: true,
    count: 25,
  },
  {
    id: "country",
    name: "Country",
    description: "Warm, cozy, and rustic",
    available: true,
    count: 15,
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Less is more approach",
    available: true,
    count: 20,
  },
  {
    id: "luxury",
    name: "Luxury",
    description: "High-end finishes and details",
    available: true,
    count: 12,
  },
];

export default function StyleFilter() {
  const store = useFilterStore();

  const selectedStyles = ((store as any).styles || (store as any).style || []) as string[];

  const handleStyleToggle = (styleId: string) => {
    const newStyles = selectedStyles.includes(styleId)
      ? selectedStyles.filter((id) => id !== styleId)
      : [...selectedStyles, styleId];

    const storeAny = store as any;
    if (storeAny.setFilter) {
      storeAny.setFilter("styles", newStyles);
    } else if (storeAny.setStyles) {
      storeAny.setStyles(newStyles);
    } else if (storeAny.setStyle) {
      storeAny.setStyle(newStyles);
    } else if (storeAny.updateStyles) {
      storeAny.updateStyles(newStyles);
    }
  };

  const handleClearStyles = () => {
    const storeAny = store as any;
    if (storeAny.setFilter) {
      storeAny.setFilter("styles", []);
    } else if (storeAny.setStyles) {
      storeAny.setStyles([]);
    } else if (storeAny.setStyle) {
      storeAny.setStyle([]);
    } else if (storeAny.updateStyles) {
      storeAny.updateStyles([]);
    }
  };

  const handleSelectAll = () => {
    const allStyleIds = AVAILABLE_STYLES.filter((s) => s.available).map(
      (s) => s.id
    );
    
    const storeAny = store as any;
    if (storeAny.setFilter) {
      storeAny.setFilter("styles", allStyleIds);
    } else if (storeAny.setStyles) {
      storeAny.setStyles(allStyleIds);
    } else if (storeAny.setStyle) {
      storeAny.setStyle(allStyleIds);
    } else if (storeAny.updateStyles) {
      storeAny.updateStyles(allStyleIds);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header with Actions */}
      {selectedStyles.length > 0 && (
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            {selectedStyles.length} selected
          </Badge>
          <div className="flex items-center gap-2">
            {selectedStyles.length < AVAILABLE_STYLES.length && (
              <button
                onClick={handleSelectAll}
                className="text-xs text-primary hover:underline"
              >
                Select all
              </button>
            )}
            <button
              onClick={handleClearStyles}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Style List */}
      <div className="space-y-3">
        {AVAILABLE_STYLES.map((style) => {
          const isSelected = selectedStyles.includes(style.id);
          const isDisabled = !style.available;

          return (
            <div
              key={style.id}
              className={cn(
                "flex items-start space-x-3 rounded-lg p-3 transition-colors",
                "hover:bg-accent",
                isSelected && "bg-accent/50",
                isDisabled && "cursor-not-allowed opacity-40"
              )}
            >
              <Checkbox
                id={`style-${style.id}`}
                checked={isSelected}
                onCheckedChange={() => !isDisabled && handleStyleToggle(style.id)}
                disabled={isDisabled}
                className="mt-0.5"
              />
              <div className="flex-1 space-y-1">
                <label
                  htmlFor={`style-${style.id}`}
                  className={cn(
                    "flex items-center justify-between cursor-pointer font-medium leading-none",
                    isDisabled && "cursor-not-allowed"
                  )}
                >
                  <span>{style.name}</span>
                  {style.count !== undefined && (
                    <span className="text-xs text-muted-foreground">
                      ({style.count})
                    </span>
                  )}
                </label>
                {style.description && (
                  <p className="text-xs text-muted-foreground leading-snug">
                    {style.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Text */}
      <p className="text-xs text-muted-foreground">
        Select multiple styles to see all matching products
      </p>
    </div>
  );
}