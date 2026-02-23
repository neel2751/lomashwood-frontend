"use client";

import { X, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import ActiveFilters from "./ActiveFilters";
import ColorFilter from "./ColorFilter";
import FinishFilter from "./FinishFilter";
import StyleFilter from "./StyleFilter";

interface FilterGroup {
  id: string;
  label: string;
  component: React.ComponentType;
  defaultOpen?: boolean;
}

interface FilterSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  onApplyFilters?: () => void;
  onClearFilters?: () => void;
  activeFiltersCount?: number;
}

const filterGroups: FilterGroup[] = [
  {
    id: "color",
    label: "Colour",
    component: ColorFilter,
    defaultOpen: true,
  },
  {
    id: "style",
    label: "Style",
    component: StyleFilter,
    defaultOpen: true,
  },
  {
    id: "finish",
    label: "Finish",
    component: FinishFilter,
    defaultOpen: false,
  },
];

export default function FilterSidebar({
  isOpen = false,
  onClose,
  onApplyFilters,
  onClearFilters,
  activeFiltersCount = 0,
}: FilterSidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(filterGroups.filter((g) => g.defaultOpen).map((g) => g.id))
  );
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(groupId)) {
        newSet.delete(groupId);
      } else {
        newSet.add(groupId);
      }
      return newSet;
    });
  };

  const handleClearAll = () => {
    onClearFilters?.();
  };

  const handleApply = () => {
    onApplyFilters?.();
    if (!isDesktop) {
      onClose?.();
    }
  };

  const FilterContent = () => (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="space-y-4 p-4 lg:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Filters</h2>
            {activeFiltersCount > 0 && (
              <p className="text-sm text-muted-foreground">
                {activeFiltersCount} active {activeFiltersCount === 1 ? "filter" : "filters"}
              </p>
            )}
          </div>
          {!isDesktop && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close filters</span>
            </Button>
          )}
        </div>

        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <>
            <ActiveFilters />
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearAll}
              className="w-full"
            >
              Clear All Filters
            </Button>
          </>
        )}
      </div>

      <Separator />

      {/* Filter Groups */}
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-4 lg:p-6">
          {filterGroups.map((group, index) => {
            const isExpanded = expandedGroups.has(group.id);
            const FilterComponent = group.component;

            return (
              <div key={group.id} className="space-y-3">
                {/* Group Header */}
                <button
                  onClick={() => toggleGroup(group.id)}
                  className="flex w-full items-center justify-between py-2 text-left transition-colors hover:text-primary"
                >
                  <span className="font-medium">{group.label}</span>
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>

                {/* Group Content */}
                {isExpanded && (
                  <div className="pb-4">
                    <FilterComponent />
                  </div>
                )}

                {index < filterGroups.length - 1 && <Separator />}
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Footer - Mobile Only */}
      {!isDesktop && (
        <>
          <Separator />
          <div className="p-4">
            <Button onClick={handleApply} className="w-full" size="lg">
              Apply Filters
              {activeFiltersCount > 0 && (
                <span className="ml-2 rounded-full bg-white px-2 py-0.5 text-xs text-primary">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </div>
        </>
      )}
    </div>
  );

  // Mobile: Render as Sheet
  if (!isDesktop) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="w-full p-0 sm:max-w-md">
          <FilterContent />
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop: Render as sidebar
  return (
    <aside className="sticky top-24 h-fit w-full rounded-lg border bg-card shadow-sm">
      <FilterContent />
    </aside>
  );
}