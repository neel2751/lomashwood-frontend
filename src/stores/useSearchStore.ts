import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface SearchSuggestion {
  id: string;
  text: string;
  type: 'product' | 'category' | 'wood-type' | 'keyword';
  count?: number;
  category?: string;
}

export interface SearchResult {
  id: string;
  title: string;
  type: 'product' | 'category' | 'page';
  url: string;
  image?: string;
  price?: number;
  category?: string;
  description?: string;
}

export interface SearchHistory {
  id: string;
  query: string;
  timestamp: number;
  results?: number;
}

interface SearchStore {
  // Search Query
  query: string;
  setQuery: (query: string) => void;
  clearQuery: () => void;

  // Search Results
  results: SearchResult[];
  setResults: (results: SearchResult[]) => void;
  clearResults: () => void;

  // Search Suggestions
  suggestions: SearchSuggestion[];
  setSuggestions: (suggestions: SearchSuggestion[]) => void;
  clearSuggestions: () => void;

  // Search History
  history: SearchHistory[];
  addToHistory: (query: string, resultsCount?: number) => void;
  removeFromHistory: (id: string) => void;
  clearHistory: () => void;
  getRecentSearches: (limit?: number) => SearchHistory[];

  // Popular/Trending Searches
  popularSearches: string[];
  setPopularSearches: (searches: string[]) => void;

  // Search State
  isSearching: boolean;
  setSearching: (isSearching: boolean) => void;
  
  hasSearched: boolean;
  setHasSearched: (hasSearched: boolean) => void;

  // Search Filters (within search)
  searchFilters: {
    type: 'all' | 'products' | 'categories' | 'pages';
    priceRange?: { min: number; max: number };
    categories?: string[];
  };
  setSearchFilter: (key: string, value: any) => void;
  resetSearchFilters: () => void;

  // Recent Views (for suggestions)
  recentViews: SearchResult[];
  addToRecentViews: (item: SearchResult) => void;
  clearRecentViews: () => void;
  getRecentViews: (limit?: number) => SearchResult[];

  // Search Actions
  performSearch: (query: string) => void;
  resetSearch: () => void;

  // Computed Values
  getTotalResults: () => number;
  hasResults: () => boolean;
  getFilteredResults: (type?: SearchResult['type']) => SearchResult[];
  getMostRecentSearch: () => SearchHistory | null;
}

const MAX_HISTORY_ITEMS = 10;
const MAX_RECENT_VIEWS = 8;

const initialState = {
  query: '',
  results: [],
  suggestions: [],
  history: [],
  popularSearches: [
    'Teak Wood',
    'Oak Planks',
    'Pine Boards',
    'Mahogany',
    'Plywood',
    'Rosewood',
  ],
  isSearching: false,
  hasSearched: false,
  searchFilters: {
    type: 'all' as const,
  },
  recentViews: [],
};

export const useSearchStore = create<SearchStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Query Actions
      setQuery: (query) => {
        set({ query });
      },

      clearQuery: () => {
        set({ query: '' });
      },

      // Results Actions
      setResults: (results) => {
        set({ results, hasSearched: true });
      },

      clearResults: () => {
        set({ results: [] });
      },

      // Suggestions Actions
      setSuggestions: (suggestions) => {
        set({ suggestions });
      },

      clearSuggestions: () => {
        set({ suggestions: [] });
      },

      // History Actions
      addToHistory: (query, resultsCount) => {
        const trimmedQuery = query.trim();
        
        if (!trimmedQuery) return;

        const history = get().history;
        
        // Remove duplicate if exists
        const filteredHistory = history.filter(
          (item) => item.query.toLowerCase() !== trimmedQuery.toLowerCase()
        );

        const newHistoryItem: SearchHistory = {
          id: `search-${Date.now()}`,
          query: trimmedQuery,
          timestamp: Date.now(),
          results: resultsCount,
        };

        // Add to beginning and limit to MAX_HISTORY_ITEMS
        const newHistory = [newHistoryItem, ...filteredHistory].slice(
          0,
          MAX_HISTORY_ITEMS
        );

        set({ history: newHistory });
      },

      removeFromHistory: (id) => {
        set({
          history: get().history.filter((item) => item.id !== id),
        });
      },

      clearHistory: () => {
        set({ history: [] });
      },

      getRecentSearches: (limit = 5) => {
        return get().history.slice(0, limit);
      },

      // Popular Searches Actions
      setPopularSearches: (searches) => {
        set({ popularSearches: searches });
      },

      // Search State Actions
      setSearching: (isSearching) => {
        set({ isSearching });
      },

      setHasSearched: (hasSearched) => {
        set({ hasSearched });
      },

      // Search Filters Actions
      setSearchFilter: (key, value) => {
        set({
          searchFilters: {
            ...get().searchFilters,
            [key]: value,
          },
        });
      },

      resetSearchFilters: () => {
        set({
          searchFilters: {
            type: 'all',
          },
        });
      },

      // Recent Views Actions
      addToRecentViews: (item) => {
        const recentViews = get().recentViews;
        
        // Remove duplicate if exists
        const filteredViews = recentViews.filter((view) => view.id !== item.id);

        // Add to beginning and limit to MAX_RECENT_VIEWS
        const newRecentViews = [item, ...filteredViews].slice(
          0,
          MAX_RECENT_VIEWS
        );

        set({ recentViews: newRecentViews });
      },

      clearRecentViews: () => {
        set({ recentViews: [] });
      },

      getRecentViews: (limit = 4) => {
        return get().recentViews.slice(0, limit);
      },

      // Main Search Actions
      performSearch: (query) => {
        const trimmedQuery = query.trim();
        
        if (!trimmedQuery) {
          get().clearResults();
          get().setHasSearched(false);
          return;
        }

        set({ 
          query: trimmedQuery,
          isSearching: true,
        });

        // This is where you would call your search API
        // For now, we just update the state
        // The actual API call should be done in the component or service
      },

      resetSearch: () => {
        set({
          query: '',
          results: [],
          suggestions: [],
          isSearching: false,
          hasSearched: false,
          searchFilters: {
            type: 'all',
          },
        });
      },

      // Computed Values
      getTotalResults: () => {
        return get().results.length;
      },

      hasResults: () => {
        return get().results.length > 0;
      },

      getFilteredResults: (type) => {
        const results = get().results;
        const filterType = type || get().searchFilters.type;

        if (filterType === 'all') {
          return results;
        }

        return results.filter((result) => {
          if (filterType === 'products') return result.type === 'product';
          if (filterType === 'categories') return result.type === 'category';
          if (filterType === 'pages') return result.type === 'page';
          return true;
        });
      },

      getMostRecentSearch: () => {
        const history = get().history;
        return history.length > 0 ? history[0] : null;
      },
    }),
    {
      name: 'lomash-search-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        history: state.history,
        popularSearches: state.popularSearches,
        recentViews: state.recentViews,
      }),
    }
  )
);