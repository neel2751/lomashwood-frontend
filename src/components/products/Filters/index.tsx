"use client";

import { SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import ActiveFilters from './ActiveFilters';
import FilterSidebar from './FilterSidebar';

interface FiltersProps {
  resultCount?: number;
}

export default function Filters({ resultCount = 0 }: FiltersProps) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-6">
        <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full relative">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterSidebar />
              <div className="mt-6 pt-6 border-t space-y-3">
                <Button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full"
                >
                  Show {resultCount} Results
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Active Filters (shown for both mobile and desktop) */}
      <div className="mb-6">
        <ActiveFilters />
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <div className="sticky top-24">
          <FilterSidebar />
        </div>
      </div>
    </>
  );
}