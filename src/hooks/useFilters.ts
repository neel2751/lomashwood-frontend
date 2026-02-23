import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';

import { useFilterStore } from '@/stores/useFilterStore';

export interface UseFiltersOptions {
  syncWithUrl?: boolean;
  debounceDelay?: number;
  onFilterChange?: (filters: FilterState) => void;
}

export interface FilterState {
  searchQuery: string;
  selectedCategories: string[];
  selectedWoodTypes: string[];
  priceRange: {
    min: number;
    max: number;
  };
  inStockOnly: boolean;
  sortBy: string;
}

export interface UseFiltersReturn {
  filters: FilterState;

  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;

  selectedCategories: string[];
  toggleCategory: (category: string) => void;
  selectCategories: (categories: string[]) => void;
  clearCategories: () => void;
  isCategorySelected: (category: string) => boolean;

  selectedWoodTypes: string[];
  toggleWoodType: (woodType: string) => void;
  selectWoodTypes: (woodTypes: string[]) => void;
  clearWoodTypes: () => void;
  isWoodTypeSelected: (woodType: string) => boolean;

  priceRange: { min: number; max: number };
  setPriceRange: (range: { min: number; max: number }) => void;
  setMinPrice: (min: number) => void;
  setMaxPrice: (max: number) => void;
  resetPriceRange: () => void;

  inStockOnly: boolean;
  setInStockOnly: (value: boolean) => void;
  toggleInStockOnly: () => void;

  sortBy: string;
  setSortBy: (sortBy: string) => void;

  hasActiveFilters: boolean;
  activeFilterCount: number;
  getActiveFilters: () => Array<{ type: string; value: any; label: string }>;

  resetFilters: () => void;
  resetAllFilters: () => void;
  removeFilter: (type: string, value?: any) => void;

  updateUrl: () => void;
  loadFromUrl: () => void;

  getFilterParams: () => URLSearchParams;
  getApiFilters: () => Record<string, any>;
}

const DEFAULT_PRICE_RANGE = {
  min: 0,
  max: 100000,
};

export const useFilters = (
  options: UseFiltersOptions = {}
): UseFiltersReturn => {
  const {
    syncWithUrl = true,
    debounceDelay = 300,
    onFilterChange,
  } = options;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    searchQuery,
    setSearchQuery: setStoreSearchQuery,
    clearSearchQuery,
    
    selectedCategories,
    toggleCategory: toggleStoreCategory,
    setCategories,
    clearCategories: clearStoreCategories,
    
    selectedWoodTypes,
    toggleWoodType: toggleStoreWoodType,
    setWoodTypes,
    clearWoodTypes: clearStoreWoodTypes,
    
    priceRange,
    setPriceRange: setStorePriceRange,
    setMinPrice: setStoreMinPrice,
    setMaxPrice: setStoreMaxPrice,
    resetPriceRange: resetStorePriceRange,
    
    inStockOnly,
    setInStockOnly: setStoreInStockOnly,
    toggleInStockOnly: toggleStoreInStockOnly,
    
    sortBy,
    setSortBy: setStoreSortBy,
    
    hasActiveFilters: storeHasActiveFilters,
    getActiveFilterCount,
    
    resetFilters: resetStoreFilters,
    resetAllExceptView,
  } = useFilterStore();

  const filters: FilterState = useMemo(
    () => ({
      searchQuery,
      selectedCategories,
      selectedWoodTypes,
      priceRange,
      inStockOnly,
      sortBy,
    }),
    [
      searchQuery,
      selectedCategories,
      selectedWoodTypes,
      priceRange,
      inStockOnly,
      sortBy,
    ]
  );

  // Search actions
  const setSearchQuery = useCallback(
    (query: string) => {
      setStoreSearchQuery(query);
    },
    [setStoreSearchQuery]
  );

  const clearSearch = useCallback(() => {
    clearSearchQuery();
  }, [clearSearchQuery]);

  const toggleCategory = useCallback(
    (category: string) => {
      toggleStoreCategory(category);
    },
    [toggleStoreCategory]
  );

  const selectCategories = useCallback(
    (categories: string[]) => {
      setCategories(categories);
    },
    [setCategories]
  );

  const clearCategories = useCallback(() => {
    clearStoreCategories();
  }, [clearStoreCategories]);

  const isCategorySelected = useCallback(
    (category: string) => {
      return selectedCategories.includes(category);
    },
    [selectedCategories]
  );

  const toggleWoodType = useCallback(
    (woodType: string) => {
      toggleStoreWoodType(woodType);
    },
    [toggleStoreWoodType]
  );

  const selectWoodTypes = useCallback(
    (woodTypes: string[]) => {
      setWoodTypes(woodTypes);
    },
    [setWoodTypes]
  );

  const clearWoodTypes = useCallback(() => {
    clearStoreWoodTypes();
  }, [clearStoreWoodTypes]);

  const isWoodTypeSelected = useCallback(
    (woodType: string) => {
      return selectedWoodTypes.includes(woodType);
    },
    [selectedWoodTypes]
  );

  const setPriceRange = useCallback(
    (range: { min: number; max: number }) => {
      setStorePriceRange(range);
    },
    [setStorePriceRange]
  );

  const setMinPrice = useCallback(
    (min: number) => {
      setStoreMinPrice(min);
    },
    [setStoreMinPrice]
  );

  const setMaxPrice = useCallback(
    (max: number) => {
      setStoreMaxPrice(max);
    },
    [setStoreMaxPrice]
  );

  const resetPriceRange = useCallback(() => {
    resetStorePriceRange();
  }, [resetStorePriceRange]);

  const setInStockOnly = useCallback(
    (value: boolean) => {
      setStoreInStockOnly(value);
    },
    [setStoreInStockOnly]
  );

  const toggleInStockOnly = useCallback(() => {
    toggleStoreInStockOnly();
  }, [toggleStoreInStockOnly]);

  const setSortBy = useCallback(
    (sort: string) => {
      setStoreSortBy(sort as any);
    },
    [setStoreSortBy]
  );

  const getActiveFilters = useCallback(() => {
    const activeFilters: Array<{ type: string; value: any; label: string }> = [];

    if (searchQuery) {
      activeFilters.push({
        type: 'search',
        value: searchQuery,
        label: `Search: "${searchQuery}"`,
      });
    }

    selectedCategories.forEach((category: string) => {
      activeFilters.push({
        type: 'category',
        value: category,
        label: `Category: ${category}`,
      });
    });

    selectedWoodTypes.forEach((woodType: string) => {
      activeFilters.push({
        type: 'woodType',
        value: woodType,
        label: `Wood: ${woodType}`,
      });
    });

    if (
      priceRange.min !== DEFAULT_PRICE_RANGE.min ||
      priceRange.max !== DEFAULT_PRICE_RANGE.max
    ) {
      activeFilters.push({
        type: 'price',
        value: priceRange,
        label: `Price: ₹${priceRange.min} - ₹${priceRange.max}`,
      });
    }

    if (inStockOnly) {
      activeFilters.push({
        type: 'stock',
        value: true,
        label: 'In Stock Only',
      });
    }

    return activeFilters;
  }, [searchQuery, selectedCategories, selectedWoodTypes, priceRange, inStockOnly]);

  const removeFilter = useCallback(
    (type: string, value?: any) => {
      switch (type) {
        case 'search':
          clearSearch();
          break;
        case 'category':
          if (value) {
            toggleCategory(value);
          } else {
            clearCategories();
          }
          break;
        case 'woodType':
          if (value) {
            toggleWoodType(value);
          } else {
            clearWoodTypes();
          }
          break;
        case 'price':
          resetPriceRange();
          break;
        case 'stock':
          setInStockOnly(false);
          break;
      }
    },
    [
      clearSearch,
      toggleCategory,
      clearCategories,
      toggleWoodType,
      clearWoodTypes,
      resetPriceRange,
      setInStockOnly,
    ]
  );

  const resetFilters = useCallback(() => {
    resetStoreFilters();
  }, [resetStoreFilters]);

  const resetAllFilters = useCallback(() => {
    resetAllExceptView();
  }, [resetAllExceptView]);

  const getFilterParams = useCallback((): URLSearchParams => {
    const params = new URLSearchParams();

    if (searchQuery) {
      params.set('search', searchQuery);
    }

    if (selectedCategories.length > 0) {
      params.set('categories', selectedCategories.join(','));
    }

    if (selectedWoodTypes.length > 0) {
      params.set('woodTypes', selectedWoodTypes.join(','));
    }

    if (priceRange.min !== DEFAULT_PRICE_RANGE.min) {
      params.set('minPrice', priceRange.min.toString());
    }

    if (priceRange.max !== DEFAULT_PRICE_RANGE.max) {
      params.set('maxPrice', priceRange.max.toString());
    }

    if (inStockOnly) {
      params.set('inStock', 'true');
    }

    if (sortBy !== 'newest') {
      params.set('sort', sortBy);
    }

    return params;
  }, [searchQuery, selectedCategories, selectedWoodTypes, priceRange, inStockOnly, sortBy]);

  const updateUrl = useCallback(() => {
    if (!syncWithUrl) return;

    const params = getFilterParams();
    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

    router.push(newUrl, { scroll: false });
  }, [syncWithUrl, pathname, router, getFilterParams]);

  const loadFromUrl = useCallback(() => {
    if (!syncWithUrl || !searchParams) return;

    const search = searchParams.get('search') || '';
    const categories = searchParams.get('categories')?.split(',').filter(Boolean) || [];
    const woodTypes = searchParams.get('woodTypes')?.split(',').filter(Boolean) || [];
    const minPrice = parseInt(searchParams.get('minPrice') || '0');
    const maxPrice = parseInt(searchParams.get('maxPrice') || '100000');
    const inStock = searchParams.get('inStock') === 'true';
    const sort = searchParams.get('sort') || 'newest';

    if (search) setStoreSearchQuery(search);
    if (categories.length > 0) setCategories(categories);
    if (woodTypes.length > 0) setWoodTypes(woodTypes);
    if (minPrice !== 0 || maxPrice !== 100000) {
      setStorePriceRange({ min: minPrice, max: maxPrice });
    }
    if (inStock) setStoreInStockOnly(true);
    if (sort !== 'newest') setStoreSortBy(sort as any);
  }, [
    syncWithUrl,
    searchParams,
    setStoreSearchQuery,
    setCategories,
    setWoodTypes,
    setStorePriceRange,
    setStoreInStockOnly,
    setStoreSortBy,
  ]);

  const getApiFilters = useCallback((): Record<string, any> => {
    return {
      search: searchQuery || undefined,
      categories: selectedCategories.length > 0 ? selectedCategories : undefined,
      woodTypes: selectedWoodTypes.length > 0 ? selectedWoodTypes : undefined,
      minPrice: priceRange.min !== DEFAULT_PRICE_RANGE.min ? priceRange.min : undefined,
      maxPrice: priceRange.max !== DEFAULT_PRICE_RANGE.max ? priceRange.max : undefined,
      inStockOnly: inStockOnly || undefined,
      sortBy,
    };
  }, [searchQuery, selectedCategories, selectedWoodTypes, priceRange, inStockOnly, sortBy]);

  useEffect(() => {
    if (syncWithUrl) {
      loadFromUrl();
    }
  }, []);

  useEffect(() => {
    if (syncWithUrl) {
      const timeoutId = setTimeout(() => {
        updateUrl();
      }, debounceDelay);

      return () => clearTimeout(timeoutId);
    }
  }, [filters, syncWithUrl, debounceDelay, updateUrl]);

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(filters);
    }
  }, [filters, onFilterChange]);

  return {
    filters,

    searchQuery,
    setSearchQuery,
    clearSearch,

    selectedCategories,
    toggleCategory,
    selectCategories,
    clearCategories,
    isCategorySelected,

    selectedWoodTypes,
    toggleWoodType,
    selectWoodTypes,
    clearWoodTypes,
    isWoodTypeSelected,

    priceRange,
    setPriceRange,
    setMinPrice,
    setMaxPrice,
    resetPriceRange,

    inStockOnly,
    setInStockOnly,
    toggleInStockOnly,

    sortBy,
    setSortBy,

    hasActiveFilters: storeHasActiveFilters(),
    activeFilterCount: getActiveFilterCount(),
    getActiveFilters,

    resetFilters,
    resetAllFilters,
    removeFilter,

    updateUrl,
    loadFromUrl,

    getFilterParams,
    getApiFilters,
  };
};