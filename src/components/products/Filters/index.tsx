"use client";

import { X, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface FilterOption {
  id: string;
  label: string;
}

interface FilterGroup {
  id: string;
  label: string;
  type: "colour" | "style" | "finish" | "range";
  options: FilterOption[];
}

export interface ActiveFilter {
  filterId: string;
  optionId: string;
}

const FILTERS: FilterGroup[] = [
  {
    id: "colour",
    label: "Colour",
    type: "colour",
    options: [
      { id: "black", label: "Black" },
      { id: "white", label: "White" },
      { id: "blue", label: "Blue" },
      { id: "green", label: "Green" },
      { id: "red", label: "Red" },
      { id: "grey", label: "Grey" },
      { id: "wood", label: "Wood" },
      { id: "oak", label: "Oak" },
      { id: "beige", label: "Beige" },
      { id: "charcoal", label: "Charcoal" },
    ],
  },
  {
    id: "style",
    label: "Style",
    type: "style",
    options: [
      { id: "modern", label: "Modern" },
      { id: "contemporary", label: "Contemporary" },
      { id: "traditional", label: "Traditional" },
      { id: "minimalist", label: "Minimalist" },
      { id: "rustic", label: "Rustic" },
      { id: "industrial", label: "Industrial" }, // ← added
    ],
  },
  {
    id: "finish",
    label: "Finish",
    type: "finish",
    options: [
      { id: "matte", label: "Matte" },
      { id: "glossy", label: "Glossy" },
      { id: "textured", label: "Textured" },
      { id: "wood-grain", label: "Wood Grain" },
      { id: "lacquer", label: "Lacquer" },
    ],
  },
  {
    id: "range",
    label: "Range",
    type: "range",
    options: [
      { id: "budget", label: "Budget" },
      { id: "mid-range", label: "Mid-range" },
      { id: "premium", label: "Premium" },
      { id: "luxury", label: "Luxury" },
    ],
  },
];

interface FiltersProps {
  resultCount?: number;
  onFiltersChange?: (filters: ActiveFilter[], sort: string) => void;
}

export default function Filters({ resultCount = 0, onFiltersChange }: FiltersProps) {
  const [sortBy, setSortBy] = useState("popular");
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(FILTERS[0].id);

  const notify = (filters: ActiveFilter[], sort: string) => {
    onFiltersChange?.(filters, sort);
  };

  const toggleFilter = (filterId: string, optionId: string) => {
    setActiveFilters((prev) => {
      const exists = prev.some((f) => f.filterId === filterId && f.optionId === optionId);
      const next = exists
        ? prev.filter((f) => !(f.filterId === filterId && f.optionId === optionId))
        : [...prev, { filterId, optionId }];
      notify(next, sortBy);
      return next;
    });
  };

  const removeFilter = (filterId: string, optionId: string) => {
    setActiveFilters((prev) => {
      const next = prev.filter((f) => !(f.filterId === filterId && f.optionId === optionId));
      notify(next, sortBy);
      return next;
    });
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setSortBy("popular");
    notify([], "popular");
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    notify(activeFilters, newSort);
  };

  const getFilterLabel = (filterId: string, optionId: string) => {
    const filter = FILTERS.find((f) => f.id === filterId);
    return filter?.options.find((o) => o.id === optionId)?.label || "";
  };

  const totalSelected = activeFilters.length;

  const FilterContent = () => (
    <div className="space-y-4">
      {FILTERS.map((filter) => (
        <div key={filter.id}>
          <h3 className="font-semibold text-slate-800 mb-3">{filter.label}</h3>
          <div className="space-y-2 pl-2">
            {filter.options.map((option) => (
              <label key={option.id} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={activeFilters.some(
                    (f) => f.filterId === filter.id && f.optionId === option.id
                  )}
                  onChange={() => toggleFilter(filter.id, option.id)}
                  className="w-4 h-4 text-green-600 rounded accent-green-600"
                />
                <span className="ml-3 text-slate-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* ── DESKTOP: Filter Bar ──────────────────────────────────────────────── */}
      <div className="hidden lg:block mb-6 w-full">
        <div className="bg-gradient-to-r from-[#D4F4DD] via-[#E8F9ED] to-[#D4F4DD] rounded-lg p-4">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-800 text-sm shrink-0">Filter by</span>

            <button
              onClick={() => setIsModalOpen(true)}
              className={`flex items-center gap-2 border-2 border-green-600 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 shadow-sm shrink-0 ${
                totalSelected > 0
                  ? "bg-green-700 text-white hover:bg-green-800"
                  : "bg-white text-green-700 hover:bg-green-50"
              }`}
            >
              <SlidersHorizontal size={15} />
              All Filters
              {totalSelected > 0 && (
                <span className="bg-white text-green-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold leading-none">
                  {totalSelected}
                </span>
              )}
            </button>

            <div className="relative ml-auto shrink-0">
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="appearance-none bg-white border-2 border-green-600 text-slate-800 pl-3 pr-8 py-2 rounded-lg font-medium text-xs cursor-pointer hover:bg-green-50 transition-colors duration-200"
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
                <option value="rating">Top Rated</option>
              </select>
              <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-green-600 text-[10px]">
                ▼
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── DESKTOP: Floating Filter Modal ──────────────────────────────────── */}
      {isModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/35 backdrop-blur-sm z-40"
            onClick={() => setIsModalOpen(false)}
            style={{ animation: "fadeIn 0.2s ease" }}
          />

          <div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(92vw,560px)] bg-white rounded-2xl z-50 overflow-hidden"
            style={{
              boxShadow: "0 25px 60px rgba(0,0,0,0.18), 0 0 0 1px rgba(46,125,50,0.08)",
              animation: "slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)",
            }}
          >
            {/* Header */}
            <div
              className="px-6 py-5 flex items-center justify-between"
              style={{ background: "linear-gradient(135deg, #15803d 0%, #22c55e 100%)" }}
            >
              <div>
                <h2 className="text-white text-xl font-bold">Filter Products</h2>
                <p className="text-green-100 text-sm mt-0.5">
                  {totalSelected > 0
                    ? `${totalSelected} filter${totalSelected > 1 ? "s" : ""} applied`
                    : "Refine your search"}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-white/20 hover:bg-white/30 text-white rounded-full w-9 h-9 flex items-center justify-center text-xl transition-colors"
              >
                ×
              </button>
            </div>

            {/* Category tabs */}
            <div className="flex border-b border-green-100 bg-green-50/50 px-2 gap-0.5">
              {FILTERS.map((filter) => {
                const count = activeFilters.filter((f) => f.filterId === filter.id).length;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveTab(filter.id)}
                    className={`flex-1 py-3.5 text-sm flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                      activeTab === filter.id
                        ? "border-green-700 text-green-700 font-bold"
                        : "border-transparent text-gray-500 hover:text-green-600 font-medium"
                    }`}
                  >
                    {filter.label}
                    {count > 0 && (
                      <span className="bg-green-700 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold leading-none">
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Options grid */}
            <div className="p-6 min-h-[200px]">
              <div className="grid grid-cols-2 gap-2.5">
                {FILTERS.find((f) => f.id === activeTab)?.options.map((option) => {
                  const isSelected = activeFilters.some(
                    (f) => f.filterId === activeTab && f.optionId === option.id
                  );
                  return (
                    <button
                      key={option.id}
                      onClick={() => toggleFilter(activeTab, option.id)}
                      className={`px-4 py-3 rounded-xl border text-sm text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? "border-green-700 bg-green-50 text-green-900 font-semibold"
                          : "border-gray-200 bg-white text-gray-600 hover:border-green-300 hover:bg-green-50/50"
                      }`}
                    >
                      {option.label}
                      {isSelected && (
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#15803d"
                          strokeWidth="3"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-green-100 bg-green-50/50 flex gap-3">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-3.5 border-2 border-green-200 rounded-xl bg-white text-green-700 font-semibold text-sm hover:border-green-400 transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-[2] py-3.5 rounded-xl text-white font-bold text-sm transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #15803d, #22c55e)" }}
              >
                Apply Filters{totalSelected > 0 ? ` (${totalSelected})` : ""}
              </button>
            </div>
          </div>

          <style>{`
            @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
            @keyframes slideUp {
              from { opacity: 0; transform: translate(-50%, -44%) scale(0.95) }
              to   { opacity: 1; transform: translate(-50%, -50%) scale(1) }
            }
          `}</style>
        </>
      )}

      {/* ── MOBILE: Sheet ────────────────────────────────────────────────────── */}
      <div className="lg:hidden mb-6">
        <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="w-full border-green-600 text-green-600 hover:bg-green-50"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
              {totalSelected > 0 && (
                <span className="ml-2 bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {totalSelected}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
              <div className="mt-6 pt-6 border-t space-y-3">
                {totalSelected > 0 && (
                  <Button
                    variant="outline"
                    onClick={clearAllFilters}
                    className="w-full border-red-200 text-red-500 hover:bg-red-50"
                  >
                    Clear All Filters
                  </Button>
                )}
                <Button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Show {resultCount} Results
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* ── Active Filter Chips ──────────────────────────────────────────────── */}
      {activeFilters.length > 0 && (
        <div className="mb-6 w-full">
          <div className="flex flex-wrap items-center gap-3">
            {activeFilters.map((filter) => (
              <div
                key={`${filter.filterId}-${filter.optionId}`}
                className="bg-[#E8F9ED] border border-green-300 rounded-full px-4 py-2 flex items-center gap-2"
              >
                <span className="text-sm font-medium text-slate-700">
                  {getFilterLabel(filter.filterId, filter.optionId)}
                </span>
                <button
                  onClick={() => removeFilter(filter.filterId, filter.optionId)}
                  className="text-slate-500 hover:text-slate-700 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            <button
              onClick={clearAllFilters}
              className="text-slate-600 font-medium text-sm hover:text-slate-800 transition-colors"
            >
              Clear all
            </button>
          </div>
        </div>
      )}
    </>
  );
}