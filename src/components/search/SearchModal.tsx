import {
  Search,
  X,
  TrendingUp,
  Clock,
  ArrowRight,
  Loader2,
  Package,
  FileText,
  Layers,
  File,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useDebounce } from '@/hooks/useDebounce';
import { useSearch } from '@/hooks/useSearch';
import { cn } from '@/lib/utils';
import type { SearchSuggestion } from '@/stores/useSearchStore';

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const debouncedQuery = useDebounce(query, 300);

  const searchResult = useSearch();

  React.useEffect(() => {
    searchResult.setQuery(debouncedQuery);
  }, [debouncedQuery, searchResult]);

  const suggestions = searchResult?.suggestions || [];
  const recentSearches = (searchResult?.searchHistory || []) as Array<{ id: string; query: string; timestamp: number }>;
  const trendingSearches = searchResult?.popularSearches || [];
  const isLoading = searchResult?.isSearching || false;
  const addRecentSearch = searchResult?.addToHistory || (() => {});
  const clearRecentSearches = searchResult?.clearHistory || (() => {});

  React.useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
    }
  }, [open]);

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    addRecentSearch(searchQuery);
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    onOpenChange(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    const title = suggestion.text || '';
    addRecentSearch(title);
    router.push(`/search?q=${encodeURIComponent(title)}`);
    onOpenChange(false);
  };

  const handleQuickSearch = (searchTerm: string) => {
    setQuery(searchTerm);
    handleSearch(searchTerm);
  };

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'product':
        return <Package className="h-4 w-4" />;
      case 'category':
        return <Layers className="h-4 w-4" />;
      case 'blog':
        return <FileText className="h-4 w-4" />;
      case 'page':
        return <File className="h-4 w-4" />;
      default:
        return <Search className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'product':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'category':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'blog':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'page':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const hasResults = suggestions && suggestions.length > 0;
  const showEmptyState = debouncedQuery && !isLoading && !hasResults;
  const showInitialState = !debouncedQuery;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0 max-h-[85vh]">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="sr-only">Search</DialogTitle>
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                ref={inputRef}
                type="text"
                placeholder="Search for kitchens, bedrooms, inspiration..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 pr-10 h-14 text-base border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              {query && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleClear}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Clear search</span>
                </Button>
              )}
            </div>
          </form>
        </DialogHeader>

        <Separator />

        <ScrollArea className="max-h-[calc(85vh-80px)]">
          <div className="p-4">
            {isLoading && (
              <div className="py-12 text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground mb-3" />
                <p className="text-sm text-muted-foreground">Searching...</p>
              </div>
            )}

            {showInitialState && (
              <div className="space-y-6">
                {recentSearches && recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        <Clock className="h-4 w-4" />
                        <span>Recent Searches</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearRecentSearches}
                        className="h-auto p-0 text-xs hover:bg-transparent"
                      >
                        Clear all
                      </Button>
                    </div>
                    <div className="space-y-1">
                      {recentSearches.slice(0, 5).map((search) => (
                        <button
                          key={search.id}
                          onClick={() => handleQuickSearch(search.query)}
                          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent text-left transition-colors group"
                        >
                          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                            <Clock className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                          <span className="flex-1 truncate">{search.query}</span>
                          <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {trendingSearches && trendingSearches.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 text-sm font-semibold mb-4">
                      <TrendingUp className="h-4 w-4" />
                      <span>Trending Searches</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {trendingSearches.slice(0, 10).map((search: string, index: number) => (
                        <Badge
                          key={`trending-${index}`}
                          variant="secondary"
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors text-sm py-2 px-4"
                          onClick={() => handleQuickSearch(search)}
                        >
                          {search}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <div className="text-sm font-semibold mb-4">Quick Links</div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        router.push('/kitchen');
                        onOpenChange(false);
                      }}
                      className="flex items-center gap-3 p-3 rounded-lg border hover:border-primary hover:bg-primary/5 text-left transition-colors group"
                    >
                      <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-200 transition-colors">
                        <Package className="h-5 w-5 text-orange-700" />
                      </div>
                      <span className="text-sm font-medium">Kitchen Designs</span>
                    </button>
                    <button
                      onClick={() => {
                        router.push('/bedroom');
                        onOpenChange(false);
                      }}
                      className="flex items-center gap-3 p-3 rounded-lg border hover:border-primary hover:bg-primary/5 text-left transition-colors group"
                    >
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
                        <Package className="h-5 w-5 text-blue-700" />
                      </div>
                      <span className="text-sm font-medium">Bedroom Designs</span>
                    </button>
                    <button
                      onClick={() => {
                        router.push('/inspiration');
                        onOpenChange(false);
                      }}
                      className="flex items-center gap-3 p-3 rounded-lg border hover:border-primary hover:bg-primary/5 text-left transition-colors group"
                    >
                      <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-200 transition-colors">
                        <Layers className="h-5 w-5 text-purple-700" />
                      </div>
                      <span className="text-sm font-medium">Inspiration</span>
                    </button>
                    <button
                      onClick={() => {
                        router.push('/blog');
                        onOpenChange(false);
                      }}
                      className="flex items-center gap-3 p-3 rounded-lg border hover:border-primary hover:bg-primary/5 text-left transition-colors group"
                    >
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors">
                        <FileText className="h-5 w-5 text-green-700" />
                      </div>
                      <span className="text-sm font-medium">Blog & Tips</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {hasResults && (
              <div className="space-y-2">
                <div className="text-sm font-semibold mb-4">
                  Search Results for "{query}"
                </div>
                <div className="space-y-1">
                  {suggestions.map((suggestion: SearchSuggestion) => {
                    const displayTitle = suggestion.text || 'Untitled';
                    const displayImage = undefined; 
                    const displayDescription = undefined; 
                    
                    return (
                      <button
                        key={suggestion.id}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-accent text-left transition-colors group"
                      >
                        {displayImage ? (
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                            <img
                              src={displayImage}
                              alt={displayTitle}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                            {getTypeIcon(suggestion.type)}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-medium mb-1 line-clamp-1">
                            {displayTitle}
                          </div>
                          {displayDescription && (
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                              {displayDescription}
                            </p>
                          )}
                          <Badge
                            variant="secondary"
                            className={cn('text-xs', getTypeColor(suggestion.type))}
                          >
                            {getTypeIcon(suggestion.type)}
                            <span className="ml-1 capitalize">{suggestion.type}</span>
                          </Badge>
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                      </button>
                    );
                  })}
                </div>
                {suggestions.length >= 5 && (
                  <div className="pt-4">
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                      onClick={() => handleSearch(query)}
                    >
                      <span>View all results for "{query}"</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            )}

            {showEmptyState && (
              <div className="py-12 text-center">
                <div className="mb-4">
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2">No results found</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  We couldn't find anything matching "{query}".
                  <br />
                  Try searching with different keywords.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => handleQuickSearch('modern kitchen')}
                  >
                    modern kitchen
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => handleQuickSearch('bedroom wardrobe')}
                  >
                    bedroom wardrobe
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => handleQuickSearch('L-shaped kitchen')}
                  >
                    L-shaped kitchen
                  </Badge>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <Separator />

        <div className="p-4 bg-muted/50">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium">
                  ↵
                </kbd>
                to search
              </span>
              <span className="flex items-center gap-1">
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium">
                  ESC
                </kbd>
                to close
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}