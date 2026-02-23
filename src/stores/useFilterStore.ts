import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SortOption = 'newest' | 'oldest' | 'price-low' | 'price-high' | 'name-a-z' | 'name-z-a';

interface FilterState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clearSearchQuery: () => void;

  selectedCategories: string[];
  toggleCategory: (category: string) => void;
  setCategories: (categories: string[]) => void;
  clearCategories: () => void;

  selectedWoodTypes: string[];
  toggleWoodType: (woodType: string) => void;
  setWoodTypes: (woodTypes: string[]) => void;
  clearWoodTypes: () => void;

  priceRange: { min: number; max: number };
  setPriceRange: (range: { min: number; max: number }) => void;
  setMinPrice: (min: number) => void;
  setMaxPrice: (max: number) => void;
  resetPriceRange: () => void;

  inStockOnly: boolean;
  setInStockOnly: (value: boolean) => void;
  toggleInStockOnly: () => void;

  sortBy: SortOption;
  setSortBy: (sortBy: SortOption) => void;

  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;

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
      searchQuery: '',
      selectedCategories: [],
      selectedWoodTypes: [],
      priceRange: DEFAULT_PRICE_RANGE,
      inStockOnly: false,
      sortBy: 'newest',
      viewMode: 'grid',

      setSearchQuery: (query: string) => set({ searchQuery: query }),
      clearSearchQuery: () => set({ searchQuery: '' }),

      toggleCategory: (category: string) =>
        set((state) => ({
          selectedCategories: state.selectedCategories.includes(category)
            ? state.selectedCategories.filter((c) => c !== category)
            : [...state.selectedCategories, category],
        })),
      setCategories: (categories: string[]) => set({ selectedCategories: categories }),
      clearCategories: () => set({ selectedCategories: [] }),

      toggleWoodType: (woodType: string) =>
        set((state) => ({
          selectedWoodTypes: state.selectedWoodTypes.includes(woodType)
            ? state.selectedWoodTypes.filter((w) => w !== woodType)
            : [...state.selectedWoodTypes, woodType],
        })),
      setWoodTypes: (woodTypes: string[]) => set({ selectedWoodTypes: woodTypes }),
      clearWoodTypes: () => set({ selectedWoodTypes: [] }),

      setPriceRange: (range: { min: number; max: number }) => set({ priceRange: range }),
      setMinPrice: (min: number) =>
        set((state) => ({ priceRange: { ...state.priceRange, min } })),
      setMaxPrice: (max: number) =>
        set((state) => ({ priceRange: { ...state.priceRange, max } })),
      resetPriceRange: () => set({ priceRange: DEFAULT_PRICE_RANGE }),

      setInStockOnly: (value: boolean) => set({ inStockOnly: value }),
      toggleInStockOnly: () => set((state) => ({ inStockOnly: !state.inStockOnly })),

      setSortBy: (sortBy: SortOption) => set({ sortBy }),

      setViewMode: (mode: 'grid' | 'list') => set({ viewMode: mode }),

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