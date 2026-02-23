"use client";

import { Tag, X, Search, TrendingUp, Hash, ChevronDown } from "lucide-react";
import { useState, useMemo } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface TagData {
  id: string;
  name: string;
  slug: string;
  count: number;
  trending?: boolean;
}

interface TagCloudProps {
  tags: TagData[];
  selectedTags: string[];
  onTagSelect: (tagId: string) => void;
  onTagRemove?: (tagId: string) => void;
  variant?: "default" | "compact" | "card" | "list";
  maxTags?: number;
  showSearch?: boolean;
  showCount?: boolean;
  showTrending?: boolean;
  multiSelect?: boolean;
  minFontSize?: number;
  maxFontSize?: number;
  sortBy?: "name" | "count" | "trending";
  className?: string;
}

type SortOption = "name" | "count" | "trending";

function Input({ 
  className, 
  ...props 
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

function ScrollArea({ 
  className, 
  children 
}: { 
  className?: string; 
  children: React.ReactNode;
}) {
  return (
    <div className={cn("overflow-auto", className)}>
      {children}
    </div>
  );
}

function Select({ 
  children 
}: { 
  value: string; 
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      {children}
    </div>
  );
}

function SelectTrigger({ 
  className, 
  children 
}: { 
  className?: string; 
  children: React.ReactNode;
}) {
  return (
    <button
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  );
}

function SelectValue() {
  return null;
}

function SelectContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover text-popover-foreground shadow-md">
      {children}
    </div>
  );
}

function SelectItem({ 
  children 
}: { 
  value: string; 
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground">
      {children}
    </div>
  );
}

export default function TagCloud({
  tags,
  selectedTags,
  onTagSelect,
  onTagRemove,
  variant = "default",
  maxTags = 50,
  showSearch = true,
  showCount = true,
  showTrending = true,
  minFontSize = 0.875,
  maxFontSize = 1.5,
  sortBy = "count",
  className,
}: TagCloudProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSort, setCurrentSort] = useState<SortOption>(sortBy);

  const calculateFontSize = (count: number, minCount: number, maxCount: number) => {
    if (maxCount === minCount) return minFontSize;
    const ratio = (count - minCount) / (maxCount - minCount);
    return minFontSize + ratio * (maxFontSize - minFontSize);
  };

  const processedTags = useMemo(() => {
    let filtered = [...tags];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((tag) =>
        tag.name.toLowerCase().includes(query)
      );
    }

    filtered.sort((a, b) => {
      switch (currentSort) {
        case "name":
          return a.name.localeCompare(b.name);
        case "count":
          return b.count - a.count;
        case "trending":
          if (a.trending && !b.trending) return -1;
          if (!a.trending && b.trending) return 1;
          return b.count - a.count;
        default:
          return 0;
      }
    });

    return filtered.slice(0, maxTags);
  }, [tags, searchQuery, currentSort, maxTags]);

  const minCount = Math.min(...processedTags.map((t) => t.count));
  const maxCount = Math.max(...processedTags.map((t) => t.count));

  const isSelected = (tagId: string) => selectedTags.includes(tagId);

  const handleTagClick = (tagId: string) => {
    if (isSelected(tagId)) {
      onTagRemove?.(tagId);
    } else {
      onTagSelect(tagId);
    }
  };

  const handleClearAll = () => {
    selectedTags.forEach((tagId) => onTagRemove?.(tagId));
  };

  if (variant === "list") {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="h-5 w-5" />
            Popular Tags
          </CardTitle>
          {showSearch && (
            <div className="relative mt-2">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tags..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          )}
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-2">
              {processedTags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => handleTagClick(tag.id)}
                  className={cn(
                    "w-full flex items-center justify-between p-2 rounded-md hover:bg-accent transition-colors text-left group",
                    isSelected(tag.id) && "bg-accent"
                  )}
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <Tag className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="font-medium truncate">{tag.name}</span>
                    {tag.trending && showTrending && (
                      <TrendingUp className="h-3 w-3 text-primary flex-shrink-0" />
                    )}
                  </div>
                  {showCount && (
                    <Badge variant="secondary" className="flex-shrink-0">
                      {tag.count}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </ScrollArea>
          {selectedTags.length > 0 && (
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Selected Tags</span>
                <Button variant="ghost" size="sm" onClick={handleClearAll}>
                  Clear All
                </Button>
              </div>
              <div className="flex flex-wrap gap-1">
                {selectedTags.map((tagId) => {
                  const tag = tags.find((t) => t.id === tagId);
                  if (!tag) return null;
                  return (
                    <Badge key={tagId} variant="secondary" className="gap-1">
                      {tag.name}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          onTagRemove?.(tagId);
                        }}
                      />
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  if (variant === "card") {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Tags
          </CardTitle>
          <CardDescription>Click on tags to filter articles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {showSearch && (
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tags..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          )}

          <div className="flex items-center gap-2">
            <Select value={currentSort} onValueChange={(value) => setCurrentSort(value as SortOption)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="count">Most Popular</SelectItem>
                <SelectItem value="name">Alphabetical</SelectItem>
                {showTrending && <SelectItem value="trending">Trending</SelectItem>}
              </SelectContent>
            </Select>
            {selectedTags.length > 0 && (
              <Button variant="outline" size="sm" onClick={handleClearAll}>
                <X className="h-3 w-3 mr-1" />
                Clear ({selectedTags.length})
              </Button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {processedTags.map((tag) => {
              const fontSize = calculateFontSize(tag.count, minCount, maxCount);
              return (
                <Badge
                  key={tag.id}
                  variant={isSelected(tag.id) ? "default" : "outline"}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  style={{ fontSize: `${fontSize}rem` }}
                  onClick={() => handleTagClick(tag.id)}
                >
                  {tag.trending && showTrending && (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  )}
                  {tag.name}
                  {showCount && <span className="ml-1">({tag.count})</span>}
                </Badge>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === "compact") {
    return (
      <div className={cn("space-y-3", className)}>
        {showSearch && (
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tags..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          {processedTags.map((tag) => (
            <Badge
              key={tag.id}
              variant={isSelected(tag.id) ? "default" : "secondary"}
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => handleTagClick(tag.id)}
            >
              {tag.trending && showTrending && (
                <TrendingUp className="h-3 w-3 mr-1" />
              )}
              {tag.name}
              {showCount && <span className="ml-1">({tag.count})</span>}
            </Badge>
          ))}
        </div>
        {selectedTags.length > 0 && (
          <Button variant="ghost" size="sm" onClick={handleClearAll}>
            <X className="h-3 w-3 mr-1" />
            Clear Selection ({selectedTags.length})
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {showSearch && (
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tags..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {processedTags.length} tag{processedTags.length !== 1 ? "s" : ""}
        </p>
        <div className="flex items-center gap-2">
          <Select value={currentSort} onValueChange={(value) => setCurrentSort(value as SortOption)}>
            <SelectTrigger className="w-[140px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="count">Most Popular</SelectItem>
              <SelectItem value="name">Alphabetical</SelectItem>
              {showTrending && <SelectItem value="trending">Trending</SelectItem>}
            </SelectContent>
          </Select>
          {selectedTags.length > 0 && (
            <Button variant="outline" size="sm" onClick={handleClearAll}>
              <X className="h-3 w-3 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 items-center justify-center py-4">
        {processedTags.map((tag) => {
          const fontSize = calculateFontSize(tag.count, minCount, maxCount);
          return (
            <button
              key={tag.id}
              onClick={() => handleTagClick(tag.id)}
              className={cn(
                "inline-flex items-center gap-1 font-medium transition-all hover:text-primary",
                isSelected(tag.id) ? "text-primary" : "text-muted-foreground hover:scale-110"
              )}
              style={{ fontSize: `${fontSize}rem` }}
            >
              {tag.trending && showTrending && (
                <TrendingUp className="h-3 w-3 text-primary" />
              )}
              {tag.name}
              {showCount && (
                <span className="text-xs opacity-60">({tag.count})</span>
              )}
            </button>
          );
        })}
      </div>

      {selectedTags.length > 0 && (
        <div className="pt-4 border-t">
          <p className="text-sm font-medium mb-2">Selected Tags:</p>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tagId) => {
              const tag = tags.find((t) => t.id === tagId);
              if (!tag) return null;
              return (
                <Badge key={tagId} variant="default" className="gap-1">
                  {tag.name}
                  <X
                    className="h-3 w-3 cursor-pointer hover:opacity-80"
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      onTagRemove?.(tagId);
                    }}
                  />
                </Badge>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function TagList({
  tags,
  onTagClick,
  showCount = true,
  className,
}: {
  tags: TagData[];
  onTagClick?: (tag: TagData) => void;
  showCount?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((tag) => (
        <Badge
          key={tag.id}
          variant="outline"
          className={cn(
            "transition-colors",
            onTagClick && "cursor-pointer hover:bg-accent"
          )}
          onClick={() => onTagClick?.(tag)}
        >
          <Tag className="h-3 w-3 mr-1" />
          {tag.name}
          {showCount && <span className="ml-1">({tag.count})</span>}
        </Badge>
      ))}
    </div>
  );
}

export function TrendingTags({
  tags,
  limit = 5,
  onTagClick,
  className,
}: {
  tags: TagData[];
  limit?: number;
  onTagClick?: (tag: TagData) => void;
  className?: string;
}) {
  const trendingTags = tags
    .filter((tag) => tag.trending)
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);

  if (trendingTags.length === 0) return null;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="h-5 w-5 text-primary" />
          Trending Tags
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {trendingTags.map((tag, index) => (
            <button
              key={tag.id}
              onClick={() => onTagClick?.(tag)}
              className="w-full flex items-center justify-between p-2 rounded-md hover:bg-accent transition-colors text-left group"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-muted-foreground w-6">
                  #{index + 1}
                </span>
                <span className="font-medium">{tag.name}</span>
              </div>
              <Badge variant="secondary">{tag.count}</Badge>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}