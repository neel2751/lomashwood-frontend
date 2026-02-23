"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useFilterStore } from "@/stores/useFilterStore";

interface Finish {
  id: string;
  name: string;
  description?: string;
  texture?: string;
  available: boolean;
  count?: number;
  swatch?: string;
}

const AVAILABLE_FINISHES: Finish[] = [
  {
    id: "gloss",
    name: "High Gloss",
    description: "Shiny, reflective finish",
    texture: "Smooth",
    available: true,
    count: 52,
    swatch: "linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)",
  },
  {
    id: "matt",
    name: "Matt",
    description: "Non-reflective, smooth finish",
    texture: "Smooth",
    available: true,
    count: 48,
    swatch: "#8E8E8E",
  },
  {
    id: "satin",
    name: "Satin",
    description: "Semi-gloss, subtle sheen",
    texture: "Smooth",
    available: true,
    count: 35,
    swatch: "linear-gradient(135deg, #f5f5f5 0%, #d0d0d0 100%)",
  },
  {
    id: "textured",
    name: "Textured",
    description: "Grainy or patterned surface",
    texture: "Textured",
    available: true,
    count: 28,
    swatch: "#B8B8B8",
  },
  {
    id: "wood-grain",
    name: "Wood Grain",
    description: "Natural wood texture",
    texture: "Wood",
    available: true,
    count: 42,
    swatch: "linear-gradient(135deg, #8B7355 0%, #A0826D 50%, #8B7355 100%)",
  },
  {
    id: "metallic",
    name: "Metallic",
    description: "Metal-like finish",
    texture: "Smooth",
    available: true,
    count: 18,
    swatch: "linear-gradient(135deg, #C0C0C0 0%, #808080 50%, #C0C0C0 100%)",
  },
  {
    id: "lacquered",
    name: "Lacquered",
    description: "High-shine protective coating",
    texture: "Smooth",
    available: true,
    count: 24,
    swatch: "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)",
  },
  {
    id: "laminate",
    name: "Laminate",
    description: "Durable synthetic finish",
    texture: "Smooth",
    available: true,
    count: 38,
    swatch: "#A8A8A8",
  },
  {
    id: "veneer",
    name: "Veneer",
    description: "Real wood thin layer",
    texture: "Wood",
    available: true,
    count: 26,
    swatch: "linear-gradient(135deg, #8B6F47 0%, #A68A64 100%)",
  },
  {
    id: "painted",
    name: "Painted",
    description: "Traditional painted finish",
    texture: "Smooth",
    available: true,
    count: 44,
    swatch: "#F5F5F5",
  },
];

export default function FinishFilter() {
  const store = useFilterStore();

  const selectedFinishes = ((store as any).finishes || (store as any).finish || []) as string[];

  const handleFinishToggle = (finishId: string) => {
    const newFinishes = selectedFinishes.includes(finishId)
      ? selectedFinishes.filter((id) => id !== finishId)
      : [...selectedFinishes, finishId];

    const storeAny = store as any;
    if (storeAny.setFilter) {
      storeAny.setFilter("finishes", newFinishes);
    } else if (storeAny.setFinishes) {
      storeAny.setFinishes(newFinishes);
    } else if (storeAny.setFinish) {
      storeAny.setFinish(newFinishes);
    } else if (storeAny.updateFinishes) {
      storeAny.updateFinishes(newFinishes);
    }
  };

  const handleClearFinishes = () => {
    const storeAny = store as any;
    if (storeAny.setFilter) {
      storeAny.setFilter("finishes", []);
    } else if (storeAny.setFinishes) {
      storeAny.setFinishes([]);
    } else if (storeAny.setFinish) {
      storeAny.setFinish([]);
    } else if (storeAny.updateFinishes) {
      storeAny.updateFinishes([]);
    }
  };

  const handleSelectAll = () => {
    const allFinishIds = AVAILABLE_FINISHES.filter((f) => f.available).map(
      (f) => f.id
    );
    
    const storeAny = store as any;
    if (storeAny.setFilter) {
      storeAny.setFilter("finishes", allFinishIds);
    } else if (storeAny.setFinishes) {
      storeAny.setFinishes(allFinishIds);
    } else if (storeAny.setFinish) {
      storeAny.setFinish(allFinishIds);
    } else if (storeAny.updateFinishes) {
      storeAny.updateFinishes(allFinishIds);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header with Actions */}
      {selectedFinishes.length > 0 && (
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            {selectedFinishes.length} selected
          </Badge>
          <div className="flex items-center gap-2">
            {selectedFinishes.length < AVAILABLE_FINISHES.length && (
              <button
                onClick={handleSelectAll}
                className="text-xs text-primary hover:underline"
              >
                Select all
              </button>
            )}
            <button
              onClick={handleClearFinishes}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Finish List */}
      <div className="space-y-2">
        {AVAILABLE_FINISHES.map((finish) => {
          const isSelected = selectedFinishes.includes(finish.id);
          const isDisabled = !finish.available;

          return (
            <div
              key={finish.id}
              className={cn(
                "flex items-start gap-3 rounded-lg border p-3 transition-all",
                "hover:border-primary hover:bg-accent/50",
                isSelected && "border-primary bg-accent",
                isDisabled && "cursor-not-allowed opacity-40"
              )}
            >
              <Checkbox
                id={`finish-${finish.id}`}
                checked={isSelected}
                onCheckedChange={() => !isDisabled && handleFinishToggle(finish.id)}
                disabled={isDisabled}
                className="mt-1"
              />

              {/* Finish Swatch */}
              <div
                className={cn(
                  "h-10 w-10 flex-shrink-0 rounded border-2 transition-all",
                  isSelected ? "border-primary ring-2 ring-primary ring-offset-2" : "border-border"
                )}
                style={{ background: finish.swatch }}
              />

              {/* Finish Details */}
              <div className="flex-1 space-y-1">
                <label
                  htmlFor={`finish-${finish.id}`}
                  className={cn(
                    "flex items-center justify-between cursor-pointer font-medium leading-none",
                    isDisabled && "cursor-not-allowed"
                  )}
                >
                  <span>{finish.name}</span>
                  {finish.count !== undefined && (
                    <span className="text-xs text-muted-foreground">
                      ({finish.count})
                    </span>
                  )}
                </label>

                {finish.description && (
                  <p className="text-xs text-muted-foreground leading-snug">
                    {finish.description}
                  </p>
                )}

                {finish.texture && (
                  <span className="inline-block text-[10px] text-muted-foreground">
                    Texture: {finish.texture}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Text */}
      <div className="rounded-lg bg-muted p-3 text-xs text-muted-foreground">
        <p className="font-medium mb-1">About Finishes:</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>High Gloss reflects light and shows fingerprints easily</li>
          <li>Matt finish is easy to clean and hides imperfections</li>
          <li>Wood Grain adds natural warmth to your space</li>
        </ul>
      </div>
    </div>
  );
}