"use client";

import { X, ChevronDown, Plus, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

import { Sheet, SheetContent } from '@/components/ui/sheet';
import { API_ENDPOINTS } from '@/config/api';

interface FilterOption {
  id: string;
  label: string;
}

interface FilterGroup {
  id: string;
  label: string;
  type: "colour" | "style" | "collection";
  options: FilterOption[];
}

export interface ActiveFilter {
  filterId: string;
  optionId: string;
}

const COLOR_MAP: Record<string, string> = {
  black: "#1a1a1a",
  white: "#f5f5f5",
  blue: "#3b82f6",
  green: "#22c55e",
  red: "#ef4444",
  grey: "#9ca3af",
  wood: "#a0522d",
  oak: "#c8a96e",
  beige: "#e8d5b7",
  charcoal: "#4b5563",
};

interface FiltersProps {
  resultCount?: number;
  onFiltersChange?: (filters: ActiveFilter[], sort: string) => void;
}

export default function Filters({ resultCount = 0, onFiltersChange }: FiltersProps) {
  const [sortBy, setSortBy] = useState("popular");
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<FilterGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [categoriesRes, coloursRes] = await Promise.all([
          fetch(`/api/v1${API_ENDPOINTS.products.categories}`),
          fetch(`/api/v1${API_ENDPOINTS.products.colours}`),
        ]);

        const [categoriesData, coloursData] = await Promise.all([
          categoriesRes.json(),
          coloursRes.json(),
        ]);

        const builtFilters: FilterGroup[] = [
          {
            id: "collection",
            label: "Collection",
            type: "collection",
            options: categoriesData?.data?.collections?.map((c: { id: string; name: string }) => ({
              id: c.id,
              label: c.name,
            })) ?? [],
          },
          {
            id: "style",
            label: "Kitchen style",
            type: "style",
            options: categoriesData?.data?.styles?.map((s: { id: string; name: string }) => ({
              id: s.id,
              label: s.name,
            })) ?? [],
          },
          {
            id: "colour",
            label: "Kitchen colour",
            type: "colour",
            options: coloursData?.data?.colours?.map((c: { id: string; name: string }) => ({
              id: c.id,
              label: c.name,
            })) ?? [],
          },
        ];

        setFilters(builtFilters);
      } catch (err) {
        console.error('Failed to fetch filters:', err);
        setError('Failed to load filters');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilters();
  }, []);

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
    notify([], sortBy);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    notify(activeFilters, newSort);
  };

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      next.has(groupId) ? next.delete(groupId) : next.add(groupId);
      return next;
    });
  };

  const getFilterLabel = (filterId: string, optionId: string) => {
    const filter = filters.find((f) => f.id === filterId);
    return filter?.options.find((o) => o.id === optionId)?.label || "";
  };

  const totalSelected = activeFilters.length;

  // Loading state
  if (isLoading) return (
    <div className="w-full mb-6 flex items-center gap-2">
      <div className="h-4 w-16 rounded bg-gray-100 animate-pulse" />
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-9 w-32 rounded-full bg-gray-100 animate-pulse" />
      ))}
    </div>
  );

  // Error state
  if (error) return (
    <div className="w-full mb-6 text-sm text-red-500">{error}</div>
  );

  return (
    <>
      {/* ── Filter Bar ──────────────────────────────────────────────── */}
      <div className="w-full mb-6">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-slate-600 shrink-0">Filter by</span>

          {filters.map((filter) => {
            const count = activeFilters.filter((f) => f.filterId === filter.id).length;
            return (
              <button
                key={filter.id}
                onClick={() => {
                  setIsDrawerOpen(true);
                  setExpandedGroups(new Set([filter.id]));
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                  count > 0
                    ? "border-green-600 bg-green-50 text-green-700"
                    : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                }`}
              >
                {filter.label}
                {count > 0 ? (
                  <span className="bg-green-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                    {count}
                  </span>
                ) : (
                  <Plus size={14} className="text-gray-500" />
                )}
              </button>
            );
          })}

          {/* Packages Link */}
          <Link href="/packages">
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-700 hover:border-gray-400 text-sm font-medium transition-all">
              Packages
              <ArrowRight size={14} className="text-gray-500" />
            </button>
          </Link>

          <div className="ml-auto flex items-center gap-3">
            <span className="text-sm text-gray-500 shrink-0">{resultCount} kitchens</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="appearance-none bg-white border border-gray-300 text-slate-700 pl-3 pr-8 py-2 rounded-full font-medium text-sm cursor-pointer hover:border-gray-400 transition-colors"
              >
                <option value="popular">Sort by</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
                <option value="rating">Top Rated</option>
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Active Filter Chips ──────────────────────────────────────────────── */}
      {activeFilters.length > 0 && (
        <div className="mb-6 w-full">
          <div className="flex flex-wrap items-center gap-2">
            {activeFilters.map((filter) => (
              <div
                key={`${filter.filterId}-${filter.optionId}`}
                className="bg-green-50 border border-green-300 rounded-full px-3 py-1.5 flex items-center gap-1.5"
              >
                <span className="text-sm font-medium text-green-800">
                  {getFilterLabel(filter.filterId, filter.optionId)}
                </span>
                <button
                  onClick={() => removeFilter(filter.filterId, filter.optionId)}
                  className="text-green-600 hover:text-green-800 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            <button
              onClick={clearAllFilters}
              className="text-slate-500 font-medium text-sm hover:text-slate-700 transition-colors underline underline-offset-2"
            >
              Clear all
            </button>
          </div>
        </div>
      )}

      {/* ── Filter Drawer ────────────────────────────────────────────────────── */}
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent side="left" className="w-full max-w-sm p-0 flex flex-col">

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b">
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Filter</h2>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50 transition"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          </div>

          {/* Accordion Filter Groups */}
          <div className="flex-1 overflow-y-auto">
            {filters.map((filter, index) => {
              const isExpanded = expandedGroups.has(filter.id);
              const count = activeFilters.filter((f) => f.filterId === filter.id).length;

              return (
                <div key={filter.id}>
                  <button
                    onClick={() => toggleGroup(filter.id)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition"
                  >
                    <span className="text-base font-semibold text-green-700 flex items-center gap-2">
                      {filter.label}
                      {count > 0 && (
                        <span className="bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                          {count}
                        </span>
                      )}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 text-green-700 transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Options */}
                  {isExpanded && (
                    <div className="px-6 pb-4 space-y-1">
                      {filter.options.map((option) => {
                        const isSelected = activeFilters.some(
                          (f) => f.filterId === filter.id && f.optionId === option.id
                        );
                        const colorHex = COLOR_MAP[option.id];

                        return (
                          <label
                            key={option.id}
                            className="flex items-center gap-3 cursor-pointer py-1.5"
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleFilter(filter.id, option.id)}
                              className="w-4 h-4 rounded accent-green-600"
                            />
                            {colorHex && (
                              <span
                                className="w-5 h-5 rounded-full border border-gray-200 shrink-0"
                                style={{ backgroundColor: colorHex }}
                              />
                            )}
                            <span className="text-sm text-gray-700">{option.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  )}

                  {index < filters.length - 1 && (
                    <div className="mx-6 border-b border-gray-200" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="border-t p-6 space-y-3">
            <button
              onClick={clearAllFilters}
              className="w-full py-3.5 rounded-full border border-gray-300 bg-white text-gray-700 font-medium text-sm hover:bg-gray-50 transition"
            >
              Clear filters
            </button>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="w-full py-3.5 rounded-full bg-gray-900 text-white font-semibold text-sm hover:bg-gray-800 transition"
            >
              Apply filters{totalSelected > 0 ? ` (${totalSelected})` : ""}
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}