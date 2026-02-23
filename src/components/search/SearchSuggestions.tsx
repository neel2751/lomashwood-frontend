import { Search, TrendingUp, Clock, X } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface SearchSuggestionsProps {
  query: string;
  suggestions: SearchSuggestion[];
  recentSearches: string[];
  trendingSearches: string[];
  onSelectSuggestion: (query: string) => void;
  onRemoveRecent: (query: string) => void;
  onClearRecent: () => void;
}

interface SearchSuggestion {
  id: string;
  title: string;
  category: 'product' | 'blog' | 'page';
  url: string;
  image?: string;
  subtitle?: string;
}

export default function SearchSuggestions({
  query,
  suggestions,
  recentSearches,
  trendingSearches,
  onSelectSuggestion,
  onRemoveRecent,
  onClearRecent,
}: SearchSuggestionsProps) {
  const hasResults = suggestions.length > 0;
  const showRecent = !query && recentSearches.length > 0;
  const showTrending = !query && trendingSearches.length > 0;

  const getCategoryBadge = (category: string) => {
    const variants: Record<string, { label: string; variant: 'default' | 'secondary' | 'outline' }> = {
      product: { label: 'Product', variant: 'default' },
      blog: { label: 'Blog', variant: 'secondary' },
      page: { label: 'Page', variant: 'outline' },
    };
    return variants[category] || variants.page;
  };

  return (
    <div className="py-2">
      {/* Search Suggestions */}
      {hasResults && (
        <div className="mb-4">
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Suggestions
          </div>
          <div className="space-y-1">
            {suggestions.map((suggestion) => {
              const categoryInfo = getCategoryBadge(suggestion.category);
              return (
                <Link
                  key={suggestion.id}
                  href={suggestion.url}
                  onClick={() => onSelectSuggestion(suggestion.title)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
                >
                  {suggestion.image ? (
                    <div className="flex-shrink-0 w-12 h-12 rounded-md bg-gray-100 overflow-hidden">
                      <img
                        src={suggestion.image}
                        alt={suggestion.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-gray-900 truncate group-hover:text-primary transition-colors">
                        {suggestion.title}
                      </p>
                      <Badge variant={categoryInfo.variant} className="text-xs">
                        {categoryInfo.label}
                      </Badge>
                    </div>
                    {suggestion.subtitle && (
                      <p className="text-xs text-gray-500 truncate">
                        {suggestion.subtitle}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Recent Searches */}
      {showRecent && (
        <div className="mb-4">
          <div className="px-4 py-2 flex items-center justify-between">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
              <Clock className="h-3.5 w-3.5" />
              Recent Searches
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearRecent}
              className="h-auto py-1 px-2 text-xs text-gray-500 hover:text-gray-700"
            >
              Clear All
            </Button>
          </div>
          <div className="space-y-1">
            {recentSearches.map((search, index) => (
              <div
                key={`recent-${index}`}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors group"
              >
                <Clock className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <button
                  onClick={() => onSelectSuggestion(search)}
                  className="flex-1 text-left text-sm text-gray-700 hover:text-gray-900 truncate"
                >
                  {search}
                </button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveRecent(search);
                  }}
                  className="opacity-0 group-hover:opacity-100 h-auto p-1 transition-opacity"
                >
                  <X className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600" />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trending Searches */}
      {showTrending && (
        <div>
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="h-3.5 w-3.5" />
            Trending Searches
          </div>
          <div className="space-y-1">
            {trendingSearches.map((search, index) => (
              <button
                key={`trending-${index}`}
                onClick={() => onSelectSuggestion(search)}
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors w-full text-left group"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                  {index + 1}
                </div>
                <span className="flex-1 text-sm text-gray-700 group-hover:text-gray-900 truncate">
                  {search}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {query && !hasResults && (
        <div className="px-4 py-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <p className="text-sm font-medium text-gray-900 mb-1">
            No results found
          </p>
          <p className="text-sm text-gray-500">
            Try searching for something else
          </p>
        </div>
      )}

      {/* Empty State */}
      {!query && !showRecent && !showTrending && (
        <div className="px-4 py-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <p className="text-sm font-medium text-gray-900 mb-1">
            Start typing to search
          </p>
          <p className="text-sm text-gray-500">
            Search for products, blogs, and more
          </p>
        </div>
      )}
    </div>
  );
}