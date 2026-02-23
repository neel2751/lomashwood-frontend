"use client";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useFilterStore } from "@/stores/useFilterStore";
import { formatCurrency } from "@/utils/formatters";

const MIN_PRICE = 0;
const MAX_PRICE = 500000;
const STEP = 5000;

const QUICK_FILTERS = [
  { label: "Under ₹50,000", min: 0, max: 50000 },
  { label: "₹50,000 - ₹1,00,000", min: 50000, max: 100000 },
  { label: "₹1,00,000 - ₹2,00,000", min: 100000, max: 200000 },
  { label: "₹2,00,000 - ₹3,00,000", min: 200000, max: 300000 },
  { label: "Above ₹3,00,000", min: 300000, max: MAX_PRICE },
];

export default function PriceRangeFilter() {
  const store = useFilterStore();

  const storeAny = store as any;
  const priceRange = storeAny.priceRange || storeAny.filters?.priceRange || { min: MIN_PRICE, max: MAX_PRICE };

  const currentMin = Array.isArray(priceRange) ? priceRange[0] : (priceRange.min ?? MIN_PRICE);
  const currentMax = Array.isArray(priceRange) ? priceRange[1] : (priceRange.max ?? MAX_PRICE);

  const [localRange, setLocalRange] = useState<[number, number]>([currentMin, currentMax]);
  const [minInput, setMinInput] = useState(currentMin.toString());
  const [maxInput, setMaxInput] = useState(currentMax.toString());

  useEffect(() => {
    setLocalRange([currentMin, currentMax]);
    setMinInput(currentMin.toString());
    setMaxInput(currentMax.toString());
  }, [currentMin, currentMax]);

  const updatePriceRange = (min: number, max: number) => {
    if (storeAny.setFilter) {
      storeAny.setFilter("priceRange", [min, max]);
    } else if (storeAny.setPriceRange) {
      try {
        storeAny.setPriceRange([min, max]);
      } catch {
        storeAny.setPriceRange({ min, max });
      }
    } else if (storeAny.updatePriceRange) {
      try {
        storeAny.updatePriceRange([min, max]);
      } catch {
        storeAny.updatePriceRange({ min, max });
      }
    }
  };

  const handleSliderChange = (value: number[]) => {
    const newRange: [number, number] = [value[0], value[1]];
    setLocalRange(newRange);
    setMinInput(value[0].toString());
    setMaxInput(value[1].toString());
  };

  const handleSliderCommit = (value: number[]) => {
    updatePriceRange(value[0], value[1]);
  };

  const handleMinInputChange = (value: string) => {
    setMinInput(value);
    const numValue = parseInt(value) || 0;
    if (numValue >= MIN_PRICE && numValue <= localRange[1]) {
      setLocalRange([numValue, localRange[1]]);
    }
  };

  const handleMaxInputChange = (value: string) => {
    setMaxInput(value);
    const numValue = parseInt(value) || MAX_PRICE;
    if (numValue <= MAX_PRICE && numValue >= localRange[0]) {
      setLocalRange([localRange[0], numValue]);
    }
  };

  const handleInputBlur = () => {
    const min = Math.max(MIN_PRICE, Math.min(parseInt(minInput) || 0, localRange[1]));
    const max = Math.min(MAX_PRICE, Math.max(parseInt(maxInput) || MAX_PRICE, localRange[0]));
    
    setLocalRange([min, max]);
    setMinInput(min.toString());
    setMaxInput(max.toString());
    updatePriceRange(min, max);
  };

  const handleQuickFilter = (min: number, max: number) => {
    setLocalRange([min, max]);
    setMinInput(min.toString());
    setMaxInput(max.toString());
    updatePriceRange(min, max);
  };

  const handleReset = () => {
    setLocalRange([MIN_PRICE, MAX_PRICE]);
    setMinInput(MIN_PRICE.toString());
    setMaxInput(MAX_PRICE.toString());
    updatePriceRange(MIN_PRICE, MAX_PRICE);
  };

  const isDefaultRange =
    localRange[0] === MIN_PRICE && localRange[1] === MAX_PRICE;

  const isQuickFilterActive = (min: number, max: number) => {
    return localRange[0] === min && localRange[1] === max;
  };

  return (
    <div className="space-y-6">
      {/* Current Range Display */}
      <div className="text-center">
        <p className="text-sm font-medium">
          {formatCurrency(localRange[0])} - {formatCurrency(localRange[1])}
        </p>
      </div>

      {/* Slider */}
      <div className="px-2">
        <Slider
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={STEP}
          value={localRange}
          onValueChange={handleSliderChange}
          onValueCommit={handleSliderCommit}
          className="w-full"
          aria-label="Price range slider"
        />
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="min-price" className="text-xs text-muted-foreground block">
            Min Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              ₹
            </span>
            <Input
              id="min-price"
              type="number"
              value={minInput}
              onChange={(e) => handleMinInputChange(e.target.value)}
              onBlur={handleInputBlur}
              min={MIN_PRICE}
              max={MAX_PRICE}
              step={STEP}
              className="pl-7"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="max-price" className="text-xs text-muted-foreground block">
            Max Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              ₹
            </span>
            <Input
              id="max-price"
              type="number"
              value={maxInput}
              onChange={(e) => handleMaxInputChange(e.target.value)}
              onBlur={handleInputBlur}
              min={MIN_PRICE}
              max={MAX_PRICE}
              step={STEP}
              className="pl-7"
            />
          </div>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Quick Select</p>
        <div className="flex flex-wrap gap-2">
          {QUICK_FILTERS.map((filter) => (
            <Button
              key={filter.label}
              variant={
                isQuickFilterActive(filter.min, filter.max)
                  ? "default"
                  : "outline"
              }
              size="sm"
              onClick={() => handleQuickFilter(filter.min, filter.max)}
              className={cn(
                "text-xs h-8",
                isQuickFilterActive(filter.min, filter.max) &&
                  "bg-primary text-primary-foreground"
              )}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      {!isDefaultRange && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="w-full text-xs"
        >
          Reset Price Range
        </Button>
      )}

      {/* Info Text */}
      <p className="text-xs text-muted-foreground">
        Prices are estimated and may vary based on size and customization
      </p>
    </div>
  );
}