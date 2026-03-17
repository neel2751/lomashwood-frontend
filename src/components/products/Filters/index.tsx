"use client";

import { X, ChevronDown, Plus } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { parseAsString, useQueryStates } from 'nuqs';
import { API_ENDPOINTS } from '@/config/api';
import { api } from '@/lib/axios';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';


// Support all filter types and dynamic fields
type FilterOption = {
  id: string;
  label: string;
  value: string;
  // For colour
  hex?: string;
  // For size, finish, package
  description?: string;
  // For finish
  image?: string;
  // For package
  category?: string;
};

type FilterGroup = {
  id: string;
  label: string;
  type: string;
  options: FilterOption[];
};

export interface ActiveFilter {
  filterId: string;
  optionId: string;
}



interface FiltersProps {
  resultCount?: number;
  onFiltersChange?: (filters: ActiveFilter[], sort: string) => void;
}

export default function Filters({ resultCount = 0, onFiltersChange }: FiltersProps) {
  const normalizeFilterValue = (input: string) =>
    input
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

  const [queryState, setQueryState] = useQueryStates(
    {
      sort: parseAsString.withDefault('popular'),
      colour: parseAsString,
      style: parseAsString,
      size: parseAsString,
      finish: parseAsString,
      package: parseAsString,
    },
    {
      history: 'replace',
      shallow: false,
      clearOnDefault: true,
    }
  );

  const sortBy = queryState.sort;
  const activeFilters: ActiveFilter[] = useMemo(() => {
    const next: ActiveFilter[] = [];

    const pushGroup = (filterId: 'colour' | 'style' | 'size' | 'finish' | 'package', rawValue?: string | null) => {
      if (!rawValue) return;
      rawValue
        .split(',')
        .map((part) => part.trim())
        .filter(Boolean)
        .forEach((value) => next.push({ filterId, optionId: value }));
    };

    pushGroup('colour', queryState.colour);
    pushGroup('style', queryState.style);
    pushGroup('size', queryState.size);
    pushGroup('finish', queryState.finish);
    pushGroup('package', queryState.package);

    return next;
  }, [queryState.colour, queryState.style, queryState.size, queryState.finish, queryState.package]);

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

        // Fetch all filter data from API
        const [coloursRes, stylesRes, sizesRes, finishRes, packagesRes] = await Promise.allSettled([
          api.get(API_ENDPOINTS.products.colours),
          api.get(API_ENDPOINTS.products.style),
          api.get(API_ENDPOINTS.products.sizes),
          api.get(API_ENDPOINTS.products.finish),
          api.get(API_ENDPOINTS.products.packages),
        ]);

        const coloursData = coloursRes.status === 'fulfilled' ? coloursRes.value.data : null;
        const stylesData = stylesRes.status === 'fulfilled' ? stylesRes.value.data : null;
        const sizesData = sizesRes.status === 'fulfilled' ? sizesRes.value.data : null;
        const finishData = finishRes.status === 'fulfilled' ? finishRes.value.data : null;
        const packagesData = packagesRes.status === 'fulfilled' ? packagesRes.value.data : null;

        let styleOptions = (stylesData?.data || []).map((s: any) => {
          const rawLabel = s?.name || s?.title || s?.style || s?.label || '';
          const label = String(rawLabel).trim();
          return {
            id: s?.id || label,
            label,
            value: normalizeFilterValue(label || s?.id || 'unknown-style'),
            description: s?.description,
          };
        }).filter((s: any) => s.label);

        // Fallback when /products/style is unavailable: derive unique styles from product data
        if (styleOptions.length === 0) {
          const [kitchenRes, bedroomRes] = await Promise.allSettled([
            api.get(API_ENDPOINTS.products.base, { params: { category: 'kitchen' } }),
            api.get(API_ENDPOINTS.products.base, { params: { category: 'bedroom' } }),
          ]);

          const extractRows = (response: PromiseSettledResult<any>) => {
            if (response.status !== 'fulfilled') return [] as any[];
            const payload = response.value?.data;
            if (Array.isArray(payload?.data?.products)) return payload.data.products;
            if (Array.isArray(payload?.data)) return payload.data;
            if (Array.isArray(payload)) return payload;
            return [] as any[];
          };

          const mergedRows = [...extractRows(kitchenRes), ...extractRows(bedroomRes)];
          const uniqueStyles = Array.from(
            new Set(
              mergedRows
                .map((row: any) => String(row?.style || '').trim())
                .filter(Boolean)
            )
          );

          styleOptions = uniqueStyles.map((styleName) => ({
            id: styleName,
            label: styleName,
            value: normalizeFilterValue(styleName),
          }));
        }

        const builtFilters: FilterGroup[] = [
          {
            id: 'colour',
            label: 'Colour',
            type: 'colour',
            options: (coloursData?.data || []).map((c: any) => ({
              id: c.id,
              label: c.name || 'Unknown Colour',
              value: normalizeFilterValue(c.name || c.id || 'unknown-colour'),
              hex: c.hexCode,
            })),
          },
          {
            id: 'style',
            label: 'Style',
            type: 'style',
            options: styleOptions,
          },
          {
            id: 'size',
            label: 'Size',
            type: 'size',
            options: (sizesData?.data || []).map((s: any) => ({
              id: s.id,
              label: s.title || 'Unknown Size',
              value: normalizeFilterValue(s.title || s.id || 'unknown-size'),
              description: s.description,
            })),
          },
          {
            id: 'finish',
            label: 'Finish',
            type: 'finish',
            options: (finishData?.data || []).map((f: any) => ({
              id: f.id,
              label: f.name || 'Unknown Finish',
              value: normalizeFilterValue(f.name || f.id || 'unknown-finish'),
              description: f.description,
              image: f.image,
            })),
          },
          {
            id: 'package',
            label: 'Packages',
            type: 'package',
            options: (packagesData?.data || []).map((p: any) => ({
              id: p.id,
              label: p.title || 'Unknown Package',
              value: normalizeFilterValue(p.title || p.id || 'unknown-package'),
              description: p.description,
              image: p.image,
              category: p.category,
            })),
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

  const toggleFilter = (filterId: string, optionId: string) => {
    const queryKey = filterId as 'colour' | 'style' | 'size' | 'finish' | 'package';
    const currentValues = (queryState[queryKey] ?? '')
      .split(',')
      .map((part) => part.trim())
      .filter(Boolean);

    const valueSet = new Set(currentValues);
    if (valueSet.has(optionId)) {
      valueSet.delete(optionId);
    } else {
      valueSet.add(optionId);
    }

    const nextValue = Array.from(valueSet).join(',');
    void setQueryState({
      [queryKey]: nextValue || null,
    });
  };

  const removeFilter = (filterId: string, optionId: string) => {
    const queryKey = filterId as 'colour' | 'style' | 'size' | 'finish' | 'package';
    const currentValues = (queryState[queryKey] ?? '')
      .split(',')
      .map((p) => p.trim())
      .filter(Boolean);
    const nextValues = currentValues.filter((v) => v !== optionId);
    void setQueryState({ [queryKey]: nextValues.join(',') || null });
  };

  const clearAllFilters = () => {
    void setQueryState({
      colour: null,
      style: null,
      size: null,
      finish: null,
      package: null,
    });
  };

  const handleSortChange = (newSort: string) => {
    void setQueryState({ sort: newSort });
  };

  const onFiltersChangeRef = useRef(onFiltersChange);

  useEffect(() => {
    onFiltersChangeRef.current = onFiltersChange;
  }, [onFiltersChange]);

  const filtersKey = useMemo(
    () => activeFilters.map((f) => `${f.filterId}::${f.optionId}`).join('|'),
    [activeFilters]
  );

  useEffect(() => {
    onFiltersChangeRef.current?.(activeFilters, sortBy);
  }, [filtersKey, sortBy]);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      next.has(groupId) ? next.delete(groupId) : next.add(groupId);
      return next;
    });
  };

  const getFilterLabel = (filterId: string, optionId: string) => {
    const filter = filters.find((f) => f.id === filterId);
    return filter?.options.find((o) => o.value === optionId)?.label || "";
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
            <SheetHeader className="sr-only">
              <SheetTitle>Filter options</SheetTitle>
            </SheetHeader>
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
                          (f) => f.filterId === filter.id && f.optionId === option.value
                        );
                        // Show color swatch for colour filter using API hex
                        return (
                          <label
                            key={option.id}
                            className="flex items-center gap-3 cursor-pointer py-1.5"
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleFilter(filter.id, option.value)}
                              className="w-4 h-4 rounded accent-green-600"
                            />
                            {filter.id === 'colour' && option.hex && (
                              <span
                                className="w-6 h-6 rounded-full border-2 border-gray-200 shrink-0 shadow"
                                style={{ backgroundColor: option.hex }}
                                title={option.label}
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