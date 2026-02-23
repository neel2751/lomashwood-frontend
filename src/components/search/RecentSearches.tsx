import { Clock, X, TrendingUp } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface RecentSearchesProps {
  searches: string[];
  onSelectSearch: (query: string) => void;
  onRemoveSearch: (query: string) => void;
  onClearAll: () => void;
  maxItems?: number;
}

export default function RecentSearches({
  searches,
  onSelectSearch,
  onRemoveSearch,
  onClearAll,
  maxItems = 10,
}: RecentSearchesProps) {
  const displaySearches = searches.slice(0, maxItems);

  if (searches.length === 0) {
    return null;
  }

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-500" />
          <h3 className="text-sm font-semibold text-gray-900">
            Recent Searches
          </h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="h-auto py-1 px-2 text-xs text-gray-500 hover:text-gray-700"
        >
          Clear All
        </Button>
      </div>

      <div className="space-y-1">
        {displaySearches.map((search, index) => (
          <div
            key={`recent-${index}-${search}`}
            className="flex items-center gap-2 rounded-md hover:bg-gray-50 transition-colors group"
          >
            <button
              onClick={() => onSelectSearch(search)}
              className="flex-1 flex items-center gap-3 px-2 py-2 text-left"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                <Clock className="h-4 w-4 text-gray-400" />
              </div>
              <span className="text-sm text-gray-700 group-hover:text-gray-900 truncate">
                {search}
              </span>
            </button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onRemoveSearch(search);
              }}
              className="opacity-0 group-hover:opacity-100 h-auto p-2 transition-opacity flex-shrink-0"
            >
              <X className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600" />
              <span className="sr-only">Remove {search}</span>
            </Button>
          </div>
        ))}
      </div>

      {searches.length > maxItems && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Showing {maxItems} of {searches.length} recent searches
          </p>
        </div>
      )}
    </Card>
  );
}

export function RecentSearchesList({
  searches,
  onSelectSearch,
  onRemoveSearch,
  layout = 'vertical',
}: {
  searches: string[];
  onSelectSearch: (query: string) => void;
  onRemoveSearch: (query: string) => void;
  layout?: 'vertical' | 'horizontal';
}) {
  if (searches.length === 0) {
    return null;
  }

  if (layout === 'horizontal') {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        {searches.slice(0, 5).map((search, index) => (
          <button
            key={`chip-${index}-${search}`}
            onClick={() => onSelectSearch(search)}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors group"
          >
            <Clock className="h-3 w-3 text-gray-400" />
            <span className="text-sm text-gray-700">{search}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemoveSearch(search);
              }}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-3 w-3 text-gray-500 hover:text-gray-700" />
            </button>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {searches.map((search, index) => (
        <div
          key={`list-${index}-${search}`}
          className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors group"
        >
          <Clock className="h-4 w-4 text-gray-400 flex-shrink-0" />
          <button
            onClick={() => onSelectSearch(search)}
            className="flex-1 text-left text-sm text-gray-700 hover:text-gray-900 truncate"
          >
            {search}
          </button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onRemoveSearch(search);
            }}
            className="opacity-0 group-hover:opacity-100 h-auto p-1 transition-opacity"
          >
            <X className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600" />
            <span className="sr-only">Remove</span>
          </Button>
        </div>
      ))}
    </div>
  );
}

export function PopularSearches({
  searches,
  onSelectSearch,
}: {
  searches: Array<{ query: string; count: number }>;
  onSelectSearch: (query: string) => void;
}) {
  if (searches.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-gray-500" />
        <h3 className="text-sm font-semibold text-gray-900">
          Popular Searches
        </h3>
      </div>

      <div className="space-y-1">
        {searches.map((item, index) => (
          <button
            key={`popular-${index}-${item.query}`}
            onClick={() => onSelectSearch(item.query)}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-md hover:bg-gray-50 transition-colors group"
          >
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-semibold text-primary">
                {index + 1}
              </span>
            </div>
            <span className="flex-1 text-left text-sm text-gray-700 group-hover:text-gray-900 truncate">
              {item.query}
            </span>
            <span className="text-xs text-gray-400">
              {item.count.toLocaleString()}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}