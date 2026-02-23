"use client";

import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFilterStore } from "@/stores/useFilterStore";


interface ActiveFilter {
  key: string;
  label: string;
  value: string | number;
  displayValue: string;
  type: "color" | "price" | "style" | "finish" | "range" | "search";
}

const COLOR_MAP: Record<string, string> = {
  white: "White",
  black: "Black",
  gray: "Gray",
  beige: "Beige",
  brown: "Brown",
  cream: "Cream",
  navy: "Navy Blue",
  charcoal: "Charcoal",
  walnut: "Walnut",
  oak: "Oak",
  cherry: "Cherry",
  mahogany: "Mahogany",
  maple: "Maple",
  espresso: "Espresso",
  sage: "Sage Green",
  slate: "Slate",
};

const STYLE_MAP: Record<string, string> = {
  modern: "Modern",
  contemporary: "Contemporary",
  traditional: "Traditional",
  transitional: "Transitional",
  scandinavian: "Scandinavian",
  industrial: "Industrial",
  shaker: "Shaker",
  country: "Country",
  minimalist: "Minimalist",
  luxury: "Luxury",
};

const FINISH_MAP: Record<string, string> = {
  gloss: "High Gloss",
  matt: "Matt",
  satin: "Satin",
  textured: "Textured",
  "wood-grain": "Wood Grain",
  metallic: "Metallic",
  lacquered: "Lacquered",
  laminate: "Laminate",
  veneer: "Veneer",
  painted: "Painted",
};

export default function ActiveFilters() {
  const filterStore = useFilterStore();

  const getActiveFilters = (): ActiveFilter[] => {
    const active: ActiveFilter[] = [];

    const filters = (filterStore as any).filters || filterStore;

    const colors = filters.colors || filters.color || [];
    if (Array.isArray(colors) && colors.length > 0) {
      colors.forEach((color: string) => {
        active.push({
          key: "colors",
          label: "Colour",
          value: color,
          displayValue: COLOR_MAP[color] || color,
          type: "color",
        });
      });
    }

    // const priceRange = filters.priceRange;
    // if (priceRange) {
    //   const min = typeof priceRange === 'object' ? (priceRange.min ?? 0) : 0;
    //   const max = typeof priceRange === 'object' ? (priceRange.max ?? 500000) : 500000;
    //   if (min !== 0 || max !== 500000) {
    //     active.push({
    //       key: "priceRange",
    //       label: "Price",
    //       value: `${min}-${max}`,
    //       displayValue: `${formatCurrency(min)} - ${formatCurrency(max)}`,
    //       type: "price",
    //     });
    //   }
    // }

    const styles = filters.styles || filters.style || [];
    if (Array.isArray(styles) && styles.length > 0) {
      styles.forEach((style: string) => {
        active.push({
          key: "styles",
          label: "Style",
          value: style,
          displayValue: STYLE_MAP[style] || style,
          type: "style",
        });
      });
    }

    const finishes = filters.finishes || filters.finish || [];
    if (Array.isArray(finishes) && finishes.length > 0) {
      finishes.forEach((finish: string) => {
        active.push({
          key: "finishes",
          label: "Finish",
          value: finish,
          displayValue: FINISH_MAP[finish] || finish,
          type: "finish",
        });
      });
    }

    const searchQuery = filters.searchQuery || filters.search || "";
    if (typeof searchQuery === "string" && searchQuery.trim()) {
      active.push({
        key: "searchQuery",
        label: "Search",
        value: searchQuery,
        displayValue: `"${searchQuery}"`,
        type: "search",
      });
    }

    return active;
  };

  const handleRemoveFilter = (filter: ActiveFilter) => {
    const store = filterStore as any;
    
    if (filter.type === "price") {
      if (store.setPriceRange) {
        store.setPriceRange({ min: 0, max: 500000 });
      } else if (store.updatePriceRange) {
        store.updatePriceRange({ min: 0, max: 500000 });
      }
    } else if (filter.type === "search") {
      if (store.setSearchQuery) {
        store.setSearchQuery("");
      } else if (store.updateSearchQuery) {
        store.updateSearchQuery("");
      }
    } else {
      const filters = store.filters || store;
      const currentValues = filters[filter.key] || [];
      const newValues = Array.isArray(currentValues) 
        ? currentValues.filter((v: string) => v !== filter.value)
        : [];

      const setterName = `set${filter.key.charAt(0).toUpperCase() + filter.key.slice(1)}`;
      const updateName = `update${filter.key.charAt(0).toUpperCase() + filter.key.slice(1)}`;
      
      if (store[setterName]) {
        store[setterName](newValues);
      } else if (store[updateName]) {
        store[updateName](newValues);
      } else if (store.updateFilter) {
        store.updateFilter(filter.key, newValues);
      } else if (store.setFilter) {
        store.setFilter(filter.key, newValues);
      }
    }
  };

  const handleClearAll = () => {
    const store = filterStore as any;
    if (store.resetFilters) {
      store.resetFilters();
    } else if (store.clearFilters) {
      store.clearFilters();
    } else if (store.reset) {
      store.reset();
    }
  };

  const activeFilters = getActiveFilters();

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        {activeFilters.map((filter, index) => (
          <Badge
            key={`${filter.key}-${filter.value}-${index}`}
            variant="secondary"
            className={cn(
              "group flex items-center gap-1.5 pr-1 pl-3 py-1.5 transition-colors",
              "hover:bg-primary hover:text-primary-foreground"
            )}
          >
            <span className="text-xs font-medium">
              {filter.label}: {filter.displayValue}
            </span>
            <button
              onClick={() => handleRemoveFilter(filter)}
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded-sm transition-colors",
                "hover:bg-primary-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
              )}
              aria-label={`Remove ${filter.label} filter: ${filter.displayValue}`}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}

        {activeFilters.length > 1 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            className="h-8 text-xs text-muted-foreground hover:text-foreground"
          >
            Clear all
          </Button>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        {activeFilters.length} {activeFilters.length === 1 ? "filter" : "filters"} applied
      </p>
    </div>
  );
}