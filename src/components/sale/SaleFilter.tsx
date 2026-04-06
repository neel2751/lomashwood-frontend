"use client";

import {
  SlidersHorizontal,
  X,
  Tag,
  Percent,
  Calendar,
  DollarSign,
  TrendingUp,
  Filter,
  RotateCcw,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export interface SaleFilterState {
  categories: string[];
  discountTypes: string[];
  discountRange: [number, number];
  status: string[];
  featured: boolean | null;
  limited: boolean | null;
}

interface SaleFilterProps {
  filters: SaleFilterState;
  onFiltersChange: (filters: SaleFilterState) => void;
  variant?: "sidebar" | "sheet" | "inline";
  showActiveCount?: boolean;
  className?: string;
}

const categories = [
  { id: "kitchen", label: "Kitchen", icon: "🍽️" },
  { id: "bedroom", label: "Bedroom", icon: "🛏️" },
  { id: "both", label: "Kitchen & Bedroom", icon: "🏠" },
  { id: "accessories", label: "Accessories", icon: "✨" },
];

const discountTypes = [
  { id: "percentage", label: "Percentage Off", icon: Percent },
  { id: "fixed", label: "Fixed Amount", icon: DollarSign },
  { id: "bundle", label: "Bundle Deals", icon: Tag },
];

const statusOptions = [
  { id: "active", label: "Active Offers", icon: TrendingUp },
  { id: "ending-soon", label: "Ending Soon", icon: Calendar },
  { id: "new", label: "New Arrivals", icon: Tag },
];

const defaultFilters: SaleFilterState = {
  categories: [],
  discountTypes: [],
  discountRange: [0, 100],
  status: [],
  featured: null,
  limited: null,
};

export default function SaleFilter({
  filters,
  onFiltersChange,
  variant = "sidebar",
  showActiveCount = true,
  className,
}: SaleFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [discountDraft, setDiscountDraft] = useState<number[]>([filters.discountRange[1]]);
  const maxDiscount = discountDraft[0] ?? filters.discountRange[1];

  useEffect(() => {
    setDiscountDraft([filters.discountRange[1]]);
  }, [filters.discountRange]);

  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter((id) => id !== categoryId)
      : [...filters.categories, categoryId];
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handleDiscountTypeToggle = (typeId: string) => {
    const newTypes = filters.discountTypes.includes(typeId)
      ? filters.discountTypes.filter((id) => id !== typeId)
      : [...filters.discountTypes, typeId];
    onFiltersChange({ ...filters, discountTypes: newTypes });
  };

  const handleStatusToggle = (statusId: string) => {
    const newStatus = filters.status.includes(statusId)
      ? filters.status.filter((id) => id !== statusId)
      : [...filters.status, statusId];
    onFiltersChange({ ...filters, status: newStatus });
  };

  const clampDiscount = (value?: number) => {
    return Math.max(0, Math.min(100, value ?? defaultFilters.discountRange[1]));
  };

  const handleDiscountRangeChange = (value: number[]) => {
    const nextValue = clampDiscount(value[0]);
    setDiscountDraft([nextValue]);
  };

  const handleDiscountRangeCommit = (value: number[]) => {
    const nextValue = clampDiscount(value[0]);
    onFiltersChange({ ...filters, discountRange: [0, nextValue] });
  };

  const handleResetFilters = () => {
    onFiltersChange(defaultFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.categories.length > 0) count += filters.categories.length;
    if (filters.discountTypes.length > 0) count += filters.discountTypes.length;
    if (filters.status.length > 0) count += filters.status.length;
    if (
      filters.discountRange[0] !== defaultFilters.discountRange[0] ||
      filters.discountRange[1] !== defaultFilters.discountRange[1]
    )
      count++;
    if (filters.featured !== null) count++;
    if (filters.limited !== null) count++;
    return count;
  };

  const activeCount = getActiveFilterCount();
  const hasActiveFilters = activeCount > 0;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold">Category</h4>
          {filters.categories.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onFiltersChange({ ...filters, categories: [] })}
              className="h-auto p-0 text-xs"
            >
              Clear
            </Button>
          )}
        </div>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={filters.categories.includes(category.id)}
                onCheckedChange={() => handleCategoryToggle(category.id)}
              />
              <label
                htmlFor={`category-${category.id}`}
                className="flex items-center gap-2 cursor-pointer flex-1 text-sm"
              >
                <span>{category.icon}</span>
                <span>{category.label}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Discount Type */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold">Discount Type</h4>
          {filters.discountTypes.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onFiltersChange({ ...filters, discountTypes: [] })}
              className="h-auto p-0 text-xs"
            >
              Clear
            </Button>
          )}
        </div>
        <div className="space-y-2">
          {discountTypes.map((type) => {
            const Icon = type.icon;
            return (
              <div key={type.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`discount-${type.id}`}
                  checked={filters.discountTypes.includes(type.id)}
                  onCheckedChange={() => handleDiscountTypeToggle(type.id)}
                />
                <label
                  htmlFor={`discount-${type.id}`}
                  className="flex items-center gap-2 cursor-pointer flex-1 text-sm"
                >
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span>{type.label}</span>
                </label>
              </div>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* Discount Range */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold">Discount Range</h4>
        <div className="space-y-4">
          <Slider
            min={0}
            max={100}
            step={1}
            value={discountDraft}
            onValueChange={handleDiscountRangeChange}
            onValueCommit={handleDiscountRangeCommit}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>0%</span>
            <span>Up to {maxDiscount}%</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Status */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold">Status</h4>
          {filters.status.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onFiltersChange({ ...filters, status: [] })}
              className="h-auto p-0 text-xs"
            >
              Clear
            </Button>
          )}
        </div>
        <div className="space-y-2">
          {statusOptions.map((option) => {
            const Icon = option.icon;
            return (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`status-${option.id}`}
                  checked={filters.status.includes(option.id)}
                  onCheckedChange={() => handleStatusToggle(option.id)}
                />
                <label
                  htmlFor={`status-${option.id}`}
                  className="flex items-center gap-2 cursor-pointer flex-1 text-sm"
                >
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span>{option.label}</span>
                </label>
              </div>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* Special Offers */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold">Special Offers</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={filters.featured === true}
              onCheckedChange={(checked) =>
                onFiltersChange({ ...filters, featured: checked ? true : null })
              }
            />
            <label htmlFor="featured" className="cursor-pointer text-sm">
              Featured Offers Only
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="limited"
              checked={filters.limited === true}
              onCheckedChange={(checked) =>
                onFiltersChange({ ...filters, limited: checked ? true : null })
              }
            />
            <label htmlFor="limited" className="cursor-pointer text-sm">
              Limited Stock Only
            </label>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      {hasActiveFilters && (
        <>
          <Separator />
          <Button
            variant="outline"
            onClick={handleResetFilters}
            className="w-full gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset All Filters
          </Button>
        </>
      )}
    </div>
  );

  if (variant === "sheet") {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className={cn("gap-2", className)}>
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {showActiveCount && activeCount > 0 && (
              <Badge variant="secondary">{activeCount}</Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full sm:w-96">
          <SheetHeader>
            <SheetTitle>Filter Offers</SheetTitle>
            <SheetDescription>
              Refine your search to find the perfect deals
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 overflow-y-auto max-h-[calc(100vh-200px)] pr-4">
            <FilterContent />
          </div>
          <SheetFooter className="mt-6">
            <Button onClick={() => setIsOpen(false)} className="w-full">
              Apply Filters
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  }

  if (variant === "inline") {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </h3>
            {showActiveCount && activeCount > 0 && (
              <Badge variant="secondary">{activeCount} active</Badge>
            )}
          </div>
          <Accordion type="multiple" defaultValue={["category", "discount"]} className="w-full">
            <AccordionItem value="category">
              <AccordionTrigger className="text-sm">Categories</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`inline-category-${category.id}`}
                        checked={filters.categories.includes(category.id)}
                        onCheckedChange={() => handleCategoryToggle(category.id)}
                      />
                      <label
                        htmlFor={`inline-category-${category.id}`}
                        className="flex items-center gap-2 cursor-pointer flex-1 text-sm"
                      >
                        <span>{category.icon}</span>
                        <span>{category.label}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="discount">
              <AccordionTrigger className="text-sm">Discount Type</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-2">
                  {discountTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <div key={type.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`inline-discount-${type.id}`}
                          checked={filters.discountTypes.includes(type.id)}
                          onCheckedChange={() => handleDiscountTypeToggle(type.id)}
                        />
                        <label
                          htmlFor={`inline-discount-${type.id}`}
                          className="flex items-center gap-2 cursor-pointer flex-1 text-sm"
                        >
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <span>{type.label}</span>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="ranges">
              <AccordionTrigger className="text-sm">Discount Range</AccordionTrigger>
              <AccordionContent className="space-y-6 pt-2">
                <div className="space-y-3">
                  <label className="text-xs font-medium block">Discount Range</label>
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={discountDraft}
                    onValueChange={handleDiscountRangeChange}
                    onValueCommit={handleDiscountRangeCommit}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>Up to {maxDiscount}%</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={handleResetFilters}
              className="w-full mt-4 gap-2"
              size="sm"
            >
              <RotateCcw className="h-3 w-3" />
              Reset Filters
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5" />
            Filters
          </h3>
          {showActiveCount && activeCount > 0 && (
            <Badge variant="secondary">{activeCount} active</Badge>
          )}
        </div>
        <FilterContent />
      </CardContent>
    </Card>
  );
}

export function ActiveFilters({
  filters,
  onRemoveFilter,
  onClearAll,
  className,
}: {
  filters: SaleFilterState;
  onRemoveFilter: (key: keyof SaleFilterState, value?: string) => void;
  onClearAll: () => void;
  className?: string;
}) {
  const hasFilters =
    filters.categories.length > 0 ||
    filters.discountTypes.length > 0 ||
    filters.status.length > 0 ||
    filters.featured !== null ||
    filters.limited !== null;

  if (!hasFilters) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <span className="text-sm text-muted-foreground">Active filters:</span>

      {filters.categories.map((cat) => (
        <Badge key={cat} variant="secondary" className="gap-1">
          {categories.find((c) => c.id === cat)?.label}
          <X
            className="h-3 w-3 cursor-pointer"
            onClick={() => onRemoveFilter("categories", cat)}
          />
        </Badge>
      ))}

      {filters.discountTypes.map((type) => (
        <Badge key={type} variant="secondary" className="gap-1">
          {discountTypes.find((t) => t.id === type)?.label}
          <X
            className="h-3 w-3 cursor-pointer"
            onClick={() => onRemoveFilter("discountTypes", type)}
          />
        </Badge>
      ))}

      {filters.status.map((status) => (
        <Badge key={status} variant="secondary" className="gap-1">
          {statusOptions.find((s) => s.id === status)?.label}
          <X
            className="h-3 w-3 cursor-pointer"
            onClick={() => onRemoveFilter("status", status)}
          />
        </Badge>
      ))}

      {filters.featured && (
        <Badge variant="secondary" className="gap-1">
          Featured
          <X
            className="h-3 w-3 cursor-pointer"
            onClick={() => onRemoveFilter("featured")}
          />
        </Badge>
      )}

      {filters.limited && (
        <Badge variant="secondary" className="gap-1">
          Limited Stock
          <X
            className="h-3 w-3 cursor-pointer"
            onClick={() => onRemoveFilter("limited")}
          />
        </Badge>
      )}

      <Button variant="ghost" size="sm" onClick={onClearAll} className="h-7 text-xs">
        Clear All
      </Button>
    </div>
  );
}