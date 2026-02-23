import {
  Package,
  FileText,
  Layers,
  File,
  ArrowRight,
  Calendar,
  Tag,
  Eye,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { formatDate } from '@/utils/formatters';

interface SearchResult {
  id: string;
  title: string;
  type: 'product' | 'category' | 'blog' | 'page';
  url: string;
  image?: string;
  description?: string;
  excerpt?: string;
  price?: number;
  category?: string;
  tags?: string[];
  date?: string;
  author?: string;
  views?: number;
}

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
  totalResults?: number;
  isLoading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  className?: string;
}

export default function SearchResults({
  results,
  query,
  totalResults,
  isLoading,
  onLoadMore,
  hasMore,
  className,
}: SearchResultsProps) {
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
        return null;
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

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={index} className="bg-yellow-200 text-foreground font-medium">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  if (!results || results.length === 0) {
    return (
      <div className={cn('text-center py-12', className)}>
        <div className="mb-4">
          <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Package className="h-10 w-10 text-muted-foreground" />
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2">No results found</h3>
        <p className="text-muted-foreground mb-6">
          We couldn't find anything matching "{query}".
          <br />
          Try adjusting your search or browse our categories.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button asChild variant="outline">
            <Link href="/kitchen">Browse Kitchens</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/bedroom">Browse Bedrooms</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/inspiration">Get Inspired</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Search Results</h2>
          {totalResults !== undefined && (
            <p className="text-muted-foreground mt-1">
              Found {totalResults} {totalResults === 1 ? 'result' : 'results'} for "
              {query}"
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-4">
        {results.map((result) => (
          <Link key={result.id} href={result.url}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row gap-4 p-4">
                  {result.image && (
                    <div className="relative w-full sm:w-48 h-48 sm:h-32 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={result.image}
                        alt={result.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1">
                        <Badge
                          variant="secondary"
                          className={cn('mb-2', getTypeColor(result.type))}
                        >
                          {getTypeIcon(result.type)}
                          <span className="ml-1 capitalize">{result.type}</span>
                        </Badge>
                        <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                          {highlightText(result.title, query)}
                        </h3>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </div>

                    {result.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {highlightText(result.description, query)}
                      </p>
                    )}

                    {result.excerpt && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {highlightText(result.excerpt, query)}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      {result.category && (
                        <div className="flex items-center gap-1">
                          <Tag className="h-3.5 w-3.5" />
                          <span>{result.category}</span>
                        </div>
                      )}

                      {result.date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{formatDate(result.date)}</span>
                        </div>
                      )}

                      {result.author && (
                        <div className="flex items-center gap-1">
                          <span>By {result.author}</span>
                        </div>
                      )}

                      {result.views !== undefined && (
                        <div className="flex items-center gap-1">
                          <Eye className="h-3.5 w-3.5" />
                          <span>{result.views.toLocaleString()} views</span>
                        </div>
                      )}

                      {result.price !== undefined && (
                        <div className="flex items-center gap-1 text-foreground font-semibold">
                          <span>₹{result.price.toLocaleString('en-IN')}</span>
                        </div>
                      )}
                    </div>

                    {result.tags && result.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {result.tags.slice(0, 4).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {result.tags.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{result.tags.length - 4} more
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {hasMore && onLoadMore && (
        <div className="flex justify-center pt-4">
          <Button
            variant="outline"
            size="lg"
            onClick={onLoadMore}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                Loading...
              </>
            ) : (
              'Load More Results'
            )}
          </Button>
        </div>
      )}

      {isLoading && !hasMore && (
        <div className="flex justify-center py-8">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>Loading results...</span>
          </div>
        </div>
      )}

      <Separator className="my-8" />

      <div className="bg-muted/50 rounded-lg p-6">
        <h3 className="font-semibold mb-4">Didn't find what you were looking for?</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <Button asChild variant="outline" className="justify-start">
            <Link href="/book-appointment">
              <Calendar className="mr-2 h-4 w-4" />
              Book a Free Consultation
            </Link>
          </Button>
          <Button asChild variant="outline" className="justify-start">
            <Link href="/contact">
              <FileText className="mr-2 h-4 w-4" />
              Contact Our Experts
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}