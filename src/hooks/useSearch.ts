import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchStore, type SearchResult, type SearchSuggestion } from '@/stores/useSearchStore';
import { useDebounce } from '@/hooks/useDebounce';

export interface UseSearchOptions {
  debounceDelay?: number;
  minQueryLength?: number;
  maxSuggestions?: number;
  autoSearch?: boolean;
  redirectOnSearch?: boolean;
  searchPath?: string;
}

export interface SearchFilters {
  type?: 'all' | 'products' | 'categories' | 'pages';
  categories?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
}

export interface UseSearchReturn {
  // Search Query
  query: string;
  setQuery: (query: string) => void;
  clearQuery: () => void;

  // Search Results
  results: SearchResult[];
  filteredResults: SearchResult[];
  totalResults: number;
  hasResults: boolean;

  // Suggestions
  suggestions: SearchSuggestion[];
  hasSuggestions: boolean;
  clearSuggestions: () => void;

  // Search State
  isSearching: boolean;
  hasSearched: boolean;
  error: string | null;

  // Search Actions
  performSearch: (searchQuery?: string) => Promise<void>;
  clearSearch: () => void;

  // History
  searchHistory: Array<{ id: string; query: string; timestamp: number }>;
  addToHistory: (query: string) => void;
  clearHistory: () => void;
  removeFromHistory: (id: string) => void;

  // Popular Searches
  popularSearches: string[];

  // Filters
  filters: SearchFilters;
  setFilter: (key: keyof SearchFilters, value: any) => void;
  clearFilters: () => void;

  // Utilities
  highlightMatch: (text: string) => string;
  getResultsByType: (type: SearchResult['type']) => SearchResult[];
  isEmpty: boolean;
}

const DEFAULT_DEBOUNCE_DELAY = 300;
const DEFAULT_MIN_QUERY_LENGTH = 2;
const DEFAULT_MAX_SUGGESTIONS = 5;
const DEFAULT_SEARCH_PATH = '/search';

export const useSearch = (options: UseSearchOptions = {}): UseSearchReturn => {
  const {
    debounceDelay = DEFAULT_DEBOUNCE_DELAY,
    minQueryLength = DEFAULT_MIN_QUERY_LENGTH,
    maxSuggestions = DEFAULT_MAX_SUGGESTIONS,
    autoSearch = true,
    redirectOnSearch = false,
    searchPath = DEFAULT_SEARCH_PATH,
  } = options;

  const router = useRouter();

  // Get search store state and actions
  const {
    query,
    setQuery: setStoreQuery,
    clearQuery: clearStoreQuery,
    results,
    setResults,
    clearResults,
    suggestions,
    setSuggestions,
    clearSuggestions: clearStoreSuggestions,
    history,
    addToHistory: addToStoreHistory,
    removeFromHistory: removeFromStoreHistory,
    clearHistory: clearStoreHistory,
    popularSearches,
    isSearching,
    setSearching,
    hasSearched,
    setHasSearched,
    searchFilters,
    setSearchFilter,
    resetSearchFilters,
    getTotalResults,
    hasResults: storeHasResults,
    getFilteredResults,
  } = useSearchStore();

  // Local state
  const [error, setError] = useState<string | null>(null);

  // Debounced query for auto-search and suggestions
  const debouncedQuery = useDebounce(query, debounceDelay);

  // Abort controller ref for cancelling requests
  const abortControllerRef = useRef<AbortController | null>(null);

  // Set query
  const setQuery = useCallback(
    (newQuery: string) => {
      setStoreQuery(newQuery);
      setError(null);

      // Clear results if query is empty
      if (!newQuery.trim()) {
        clearResults();
        clearStoreSuggestions();
        setHasSearched(false);
      }
    },
    [setStoreQuery, clearResults, clearStoreSuggestions, setHasSearched]
  );

  // Clear query
  const clearQuery = useCallback(() => {
    clearStoreQuery();
    clearResults();
    clearStoreSuggestions();
    setHasSearched(false);
    setError(null);
  }, [clearStoreQuery, clearResults, clearStoreSuggestions, setHasSearched]);

  // Fetch suggestions
  const fetchSuggestions = useCallback(
    async (searchQuery: string) => {
      if (searchQuery.length < minQueryLength) {
        clearStoreSuggestions();
        return;
      }

      try {
        // Cancel previous request
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }

        abortControllerRef.current = new AbortController();

        const params = new URLSearchParams({
          q: searchQuery,
          limit: maxSuggestions.toString(),
        });

        const response = await fetch(`/api/search/suggestions?${params}`, {
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          throw new Error('Failed to fetch suggestions');
        }

        const data = await response.json();
        setSuggestions(data.suggestions || []);
      } catch (err) {
        // Ignore abort errors
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        console.error('Error fetching suggestions:', err);
      }
    },
    [minQueryLength, maxSuggestions, setSuggestions, clearStoreSuggestions]
  );

  // Perform search
  const performSearch = useCallback(
    async (searchQuery?: string) => {
      const queryToSearch = searchQuery || query;

      if (!queryToSearch.trim() || queryToSearch.length < minQueryLength) {
        return;
      }

      try {
        // Cancel previous request
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }

        abortControllerRef.current = new AbortController();

        setSearching(true);
        setError(null);
        clearStoreSuggestions();

        // Build search params
        const params = new URLSearchParams({
          q: queryToSearch,
        });

        // Add filters
        if (searchFilters.type && searchFilters.type !== 'all') {
          params.append('type', searchFilters.type);
        }

        if (searchFilters.categories && searchFilters.categories.length > 0) {
          params.append('categories', searchFilters.categories.join(','));
        }

        if (searchFilters.priceRange) {
          params.append('minPrice', searchFilters.priceRange.min.toString());
          params.append('maxPrice', searchFilters.priceRange.max.toString());
        }

        const response = await fetch(`/api/search?${params}`, {
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          throw new Error('Search failed');
        }

        const data = await response.json();

        setResults(data.results || []);
        setHasSearched(true);

        // Add to history
        addToStoreHistory(queryToSearch, data.results?.length || 0);

        // Redirect to search page if enabled
        if (redirectOnSearch && data.results?.length > 0) {
          router.push(`${searchPath}?q=${encodeURIComponent(queryToSearch)}`);
        }
      } catch (err) {
        // Ignore abort errors
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }

        setError(err instanceof Error ? err.message : 'Search failed');
        console.error('Search error:', err);
      } finally {
        setSearching(false);
      }
    },
    [
      query,
      minQueryLength,
      searchFilters,
      setSearching,
      setResults,
      setHasSearched,
      addToStoreHistory,
      clearStoreSuggestions,
      redirectOnSearch,
      router,
      searchPath,
    ]
  );

  // Clear search
  const clearSearch = useCallback(() => {
    clearQuery();
    resetSearchFilters();
  }, [clearQuery, resetSearchFilters]);

  // Add to history
  const addToHistory = useCallback(
    (searchQuery: string) => {
      addToStoreHistory(searchQuery);
    },
    [addToStoreHistory]
  );

  // Clear history
  const clearHistory = useCallback(() => {
    clearStoreHistory();
  }, [clearStoreHistory]);

  // Remove from history
  const removeFromHistory = useCallback(
    (id: string) => {
      removeFromStoreHistory(id);
    },
    [removeFromStoreHistory]
  );

  // Set filter
  const setFilter = useCallback(
    (key: keyof SearchFilters, value: any) => {
      setSearchFilter(key, value);
    },
    [setSearchFilter]
  );

  // Clear filters
  const clearFilters = useCallback(() => {
    resetSearchFilters();
  }, [resetSearchFilters]);

  // Highlight matching text
  const highlightMatch = useCallback(
    (text: string): string => {
      if (!query) return text;

      const regex = new RegExp(`(${query})`, 'gi');
      return text.replace(regex, '<mark>$1</mark>');
    },
    [query]
  );

  // Get results by type
  const getResultsByType = useCallback(
    (type: SearchResult['type']) => {
      return results.filter((result) => result.type === type);
    },
    [results]
  );

  // Auto-fetch suggestions when query changes (debounced)
  useEffect(() => {
    if (debouncedQuery && debouncedQuery.length >= minQueryLength) {
      fetchSuggestions(debouncedQuery);
    } else {
      clearStoreSuggestions();
    }
  }, [debouncedQuery, minQueryLength, fetchSuggestions, clearStoreSuggestions]);

  // Auto-search when query changes (debounced) if enabled
  useEffect(() => {
    if (
      autoSearch &&
      debouncedQuery &&
      debouncedQuery.length >= minQueryLength
    ) {
      performSearch(debouncedQuery);
    }
  }, [debouncedQuery, minQueryLength, autoSearch, performSearch]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Computed values
  const filteredResults = getFilteredResults();
  const totalResults = getTotalResults();
  const hasResults = storeHasResults();
  const hasSuggestions = suggestions.length > 0;
  const isEmpty = query.length === 0;

  return {
    // Search Query
    query,
    setQuery,
    clearQuery,

    // Search Results
    results,
    filteredResults,
    totalResults,
    hasResults,

    // Suggestions
    suggestions,
    hasSuggestions,
    clearSuggestions: clearStoreSuggestions,

    // Search State
    isSearching,
    hasSearched,
    error,

    // Search Actions
    performSearch,
    clearSearch,

    // History
    searchHistory: history,
    addToHistory,
    clearHistory,
    removeFromHistory,

    // Popular Searches
    popularSearches,

    // Filters
    filters: searchFilters,
    setFilter,
    clearFilters,

    // Utilities
    highlightMatch,
    getResultsByType,
    isEmpty,
  };
};