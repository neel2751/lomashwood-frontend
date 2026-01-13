import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SortOption = 'newest' | 'oldest' | 'price-low' | 'price-high' | 'name-a-z' | 'name-z-a';

interface FilterState {
  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clearSearchQuery: () => void;

  // Categories
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
  setCategories: (categories: string[]) => void;
  clearCategories: () => void;

  // Wood Types
  selectedWoodTypes: string[];
  toggleWoodType: (woodType: string) => void;
  setWoodTypes: (woodTypes: string[]) => void;
  clearWoodTypes: () => void;

  // Price Range
  priceRange: { min: number; max: number };
  setPriceRange: (range: { min: number; max: number }) => void;
  setMinPrice: (min: number) => void;
  setMaxPrice: (max: number) => void;
  resetPriceRange: () => void;

  // Stock Filter
  inStockOnly: boolean;
  setInStockOnly: (value: boolean) => void;
  toggleInStockOnly: () => void;

  // Sort
  sortBy: SortOption;
  setSortBy: (sortBy: SortOption) => void;

  // View Mode
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;

  // Utilities
  hasActiveFilters: () => boolean;
  getActiveFilterCount: () => number;
  resetFilters: () => void;
  resetAllExceptView: () => void;
}

const DEFAULT_PRICE_RANGE = {
  min: 0,
  max: 100000,
};

export const useFilterStore = create<FilterState>()(
  persist(
    (set, get) => ({
      // Initial State
      searchQuery: '',
      selectedCategories: [],
      selectedWoodTypes: [],
      priceRange: DEFAULT_PRICE_RANGE,
      inStockOnly: false,
      sortBy: 'newest',
      viewMode: 'grid',

      // Search Actions
      setSearchQuery: (query: string) => set({ searchQuery: query }),
      clearSearchQuery: () => set({ searchQuery: '' }),

      // Category Actions
      toggleCategory: (category: string) =>
        set((state) => ({
          selectedCategories: state.selectedCategories.includes(category)
            ? state.selectedCategories.filter((c) => c !== category)
            : [...state.selectedCategories, category],
        })),
      setCategories: (categories: string[]) => set({ selectedCategories: categories }),
      clearCategories: () => set({ selectedCategories: [] }),

      // Wood Type Actions
      toggleWoodType: (woodType: string) =>
        set((state) => ({
          selectedWoodTypes: state.selectedWoodTypes.includes(woodType)
            ? state.selectedWoodTypes.filter((w) => w !== woodType)
            : [...state.selectedWoodTypes, woodType],
        })),
      setWoodTypes: (woodTypes: string[]) => set({ selectedWoodTypes: woodTypes }),
      clearWoodTypes: () => set({ selectedWoodTypes: [] }),

      // Price Range Actions
      setPriceRange: (range: { min: number; max: number }) => set({ priceRange: range }),
      setMinPrice: (min: number) =>
        set((state) => ({ priceRange: { ...state.priceRange, min } })),
      setMaxPrice: (max: number) =>
        set((state) => ({ priceRange: { ...state.priceRange, max } })),
      resetPriceRange: () => set({ priceRange: DEFAULT_PRICE_RANGE }),

      // Stock Actions
      setInStockOnly: (value: boolean) => set({ inStockOnly: value }),
      toggleInStockOnly: () => set((state) => ({ inStockOnly: !state.inStockOnly })),

      // Sort Actions
      setSortBy: (sortBy: SortOption) => set({ sortBy }),

      // View Mode
      setViewMode: (mode: 'grid' | 'list') => set({ viewMode: mode }),

      // Utilities
      hasActiveFilters: () => {
        const state = get();
        return (
          state.searchQuery !== '' ||
          state.selectedCategories.length > 0 ||
          state.selectedWoodTypes.length > 0 ||
          state.priceRange.min !== DEFAULT_PRICE_RANGE.min ||
          state.priceRange.max !== DEFAULT_PRICE_RANGE.max ||
          state.inStockOnly
        );
      },

      getActiveFilterCount: () => {
        const state = get();
        let count = 0;

        if (state.searchQuery) count++;
        if (state.selectedCategories.length > 0) count += state.selectedCategories.length;
        if (state.selectedWoodTypes.length > 0) count += state.selectedWoodTypes.length;
        if (
          state.priceRange.min !== DEFAULT_PRICE_RANGE.min ||
          state.priceRange.max !== DEFAULT_PRICE_RANGE.max
        ) {
          count++;
        }
        if (state.inStockOnly) count++;

        return count;
      },

      resetFilters: () =>
        set({
          searchQuery: '',
          selectedCategories: [],
          selectedWoodTypes: [],
          priceRange: DEFAULT_PRICE_RANGE,
          inStockOnly: false,
          sortBy: 'newest',
        }),

      resetAllExceptView: () =>
        set((state) => ({
          searchQuery: '',
          selectedCategories: [],
          selectedWoodTypes: [],
          priceRange: DEFAULT_PRICE_RANGE,
          inStockOnly: false,
          sortBy: 'newest',
          viewMode: state.viewMode,
        })),
    }),
    {
      name: 'filter-storage',
      partialize: (state) => ({
        viewMode: state.viewMode,
      }),
    }
  )
);