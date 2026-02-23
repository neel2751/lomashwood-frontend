import { Search, X, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/useDebounce';
import { useSearch } from '@/hooks/useSearch';
import { cn } from '@/lib/utils';
import type { SearchSuggestion as StoreSearchSuggestion } from '@/stores/useSearchStore';

interface SearchSuggestion extends StoreSearchSuggestion {
  id: string;
  text: string;
  type: 'product' | 'category' | 'wood-type' | 'keyword';
  count?: number;
  category?: string;
}

interface GlobalSearchProps {
  onResultClick?: () => void;
  showTrending?: boolean;
  showRecent?: boolean;
  placeholder?: string;
  className?: string;
}

export default function GlobalSearch({
  onResultClick,
  showTrending = true,
  showRecent = true,
  placeholder = 'Search for kitchens, bedrooms, inspiration...',
  className,
}: GlobalSearchProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState('');
  const [isFocused, setIsFocused] = React.useState(false);
  const [showResults, setShowResults] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const resultsRef = React.useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebounce(query, 300);

  const searchResult = useSearch();

  React.useEffect(() => {
    searchResult.setQuery(debouncedQuery);
  }, [debouncedQuery, searchResult]);

  const suggestions = (searchResult?.suggestions || []) as SearchSuggestion[];
  const recentSearches = searchResult?.searchHistory || [];
  const trendingSearches = searchResult?.popularSearches || [];
  const isLoading = searchResult?.isSearching || false;
  const addRecentSearch = searchResult?.addToHistory || (() => {});
  const clearRecentSearches = searchResult?.clearHistory || (() => {});

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    addRecentSearch(searchQuery);
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    setQuery('');
    setShowResults(false);
    if (onResultClick) onResultClick();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const handleSuggestionClick = (suggestionText: string) => {
    addRecentSearch(suggestionText);
    router.push(`/search?q=${encodeURIComponent(suggestionText)}`);
    setQuery('');
    setShowResults(false);
    if (onResultClick) onResultClick();
  };

  const handleQuickSearch = (searchTerm: string) => {
    setQuery(searchTerm);
    handleSearch(searchTerm);
  };

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  React.useEffect(() => {
    if (debouncedQuery && isFocused) {
      setShowResults(true);
    }
  }, [debouncedQuery, isFocused]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'product':
        return 'bg-blue-100 text-blue-700';
      case 'category':
        return 'bg-purple-100 text-purple-700';
      case 'blog':
        return 'bg-green-100 text-green-700';
      case 'page':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const hasResults = suggestions && suggestions.length > 0;
  const showEmptyState = debouncedQuery && !isLoading && !hasResults;
  const showInitialState = !debouncedQuery && (showTrending || showRecent);

  return (
    <div className={cn('relative w-full', className)}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              setIsFocused(true);
              setShowResults(true);
            }}
            className="pl-10 pr-10 h-12"
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleClear}
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>
      </form>

      {showResults && (isFocused || query) && (
        <div
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-lg shadow-lg max-h-[500px] overflow-y-auto z-50"
        >
          {isLoading && (
            <div className="p-8 text-center">
              <div className="inline-flex items-center gap-2 text-muted-foreground">
                <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span>Searching...</span>
              </div>
            </div>
          )}

          {showInitialState && (
            <div className="p-4 space-y-6">
              {showRecent && recentSearches && recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Clock className="h-4 w-4" />
                      <span>Recent Searches</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearRecentSearches}
                      className="h-auto p-0 text-xs"
                    >
                      Clear all
                    </Button>
                  </div>
                  <div className="space-y-1">
                    {recentSearches.slice(0, 5).map((search, index: number) => (
                      <button
                        key={search.id || index}
                        onClick={() => handleQuickSearch(search.query)}
                        className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-accent text-left transition-colors"
                      >
                        <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm flex-1 truncate">{search.query}</span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {showTrending && trendingSearches && trendingSearches.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-sm font-medium mb-3">
                    <TrendingUp className="h-4 w-4" />
                    <span>Trending Searches</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {trendingSearches.slice(0, 8).map((search: string, index: number) => (
                      <Badge
                        key={`trending-${index}`}
                        variant="secondary"
                        className="cursor-pointer hover:bg-secondary/80 transition-colors"
                        onClick={() => handleQuickSearch(search)}
                      >
                        {search}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {hasResults && (
            <div className="p-2">
              <div className="text-xs font-medium text-muted-foreground px-3 py-2">
                Search Results
              </div>
              <div className="space-y-1">
                {suggestions.map((suggestion: SearchSuggestion) => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion.text)}
                    className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-accent text-left transition-colors group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">
                        {suggestion.text}
                      </div>
                      {suggestion.category && (
                        <div className="text-xs text-muted-foreground">
                          {suggestion.category}
                        </div>
                      )}
                      <Badge
                        variant="secondary"
                        className={cn('mt-1 text-xs', getTypeColor(suggestion.type))}
                      >
                        {suggestion.type}
                        {suggestion.count && ` (${suggestion.count})`}
                      </Badge>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
              {suggestions.length >= 5 && (
                <div className="mt-2 pt-2 border-t">
                  <Button
                    variant="ghost"
                    className="w-full justify-between"
                    onClick={() => handleSearch(query)}
                  >
                    <span>View all results</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          )}

          {showEmptyState && (
            <div className="p-8 text-center">
              <div className="mb-2">
                <Search className="h-12 w-12 text-muted-foreground/50 mx-auto" />
              </div>
              <h3 className="font-medium mb-1">No results found</h3>
              <p className="text-sm text-muted-foreground">
                Try searching for different keywords
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}