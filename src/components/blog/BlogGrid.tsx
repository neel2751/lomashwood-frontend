"use client";

import { LayoutGrid, LayoutList, Search, SlidersHorizontal, X } from "lucide-react";
import { useState, useMemo } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

import type { BlogPost} from "./BlogCard";
import BlogCard, { BlogCardSkeleton } from "./BlogCard";

const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={cn(
      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
);

interface BlogGridProps {
  posts: BlogPost[];
  isLoading?: boolean;
  featuredPost?: BlogPost;
  showSearch?: boolean;
  showFilters?: boolean;
  showViewToggle?: boolean;
  defaultView?: "grid" | "list";
  postsPerPage?: number;
  onPostBookmark?: (postId: string) => void;
  onPostShare?: (post: BlogPost) => void;
  className?: string;
}

type SortOption = "newest" | "oldest" | "popular" | "title";

const sortOptions: Array<{ value: SortOption; label: string }> = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "popular", label: "Most Popular" },
  { value: "title", label: "Title (A-Z)" },
];

export default function BlogGrid({
  posts,
  isLoading = false,
  featuredPost,
  showSearch = true,
  showFilters = true,
  showViewToggle = true,
  defaultView = "grid",
  postsPerPage = 9,
  onPostBookmark,
  onPostShare,
  className,
}: BlogGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">(defaultView);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(posts.map((post) => post.category.name))
    ).sort();
    return ["all", ...uniqueCategories];
  }, [posts]);

  const filteredAndSortedPosts = useMemo(() => {
    let filtered = [...posts];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.author.name.toLowerCase().includes(query) ||
          post.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((post) => post.category.name === selectedCategory);
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        case "oldest":
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        case "popular":
          return (b.views || 0) - (a.views || 0);
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [posts, searchQuery, selectedCategory, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedPosts.length / postsPerPage);
  const paginatedPosts = filteredAndSortedPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("newest");
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery || selectedCategory !== "all" || sortBy !== "newest";

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Featured Post */}
      {featuredPost && !searchQuery && selectedCategory === "all" && currentPage === 1 && (
        <BlogCard
          post={featuredPost}
          variant="featured"
          onBookmark={onPostBookmark}
          onShare={onPostShare}
        />
      )}

      {/* Search and Filters */}
      {(showSearch || showFilters || showViewToggle) && (
        <div className="space-y-4">
          {/* Search Bar */}
          {showSearch && (
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles by title, content, author, or tags..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-9 pr-4"
              />
            </div>
          )}

          {/* Filters and View Toggle */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 w-full md:w-auto">
              {/* Mobile Filter Toggle */}
              {showFilters && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilterPanel(!showFilterPanel)}
                  className="lg:hidden"
                >
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="ml-2">
                      Active
                    </Badge>
                  )}
                </Button>
              )}

              {/* Filters - Desktop */}
              {showFilters && (
                <div
                  className={cn(
                    "flex flex-col sm:flex-row gap-2 w-full md:w-auto",
                    !showFilterPanel && "hidden lg:flex"
                  )}
                >
                  <select
                    value={selectedCategory}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setSelectedCategory(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="flex h-10 w-full sm:w-[180px] items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <option value="all">All Categories</option>
                    {categories
                      .filter((cat) => cat !== "all")
                      .map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value as SortOption)}
                    className="flex h-10 w-full sm:w-[180px] items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearFilters}
                      className="w-full sm:w-auto"
                    >
                      <X className="mr-2 h-4 w-4" />
                      Clear
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Results Count and View Toggle */}
            <div className="flex items-center justify-between w-full md:w-auto gap-4">
              <p className="text-sm text-muted-foreground">
                {filteredAndSortedPosts.length} article
                {filteredAndSortedPosts.length !== 1 ? "s" : ""} found
              </p>

              {showViewToggle && (
                <div className="flex items-center gap-1 border rounded-md p-1">
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className="h-8 w-8"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className="h-8 w-8"
                  >
                    <LayoutList className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  Search: {searchQuery}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => {
                      setSearchQuery("");
                      setCurrentPage(1);
                    }}
                  />
                </Badge>
              )}
              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  Category: {selectedCategory}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => {
                      setSelectedCategory("all");
                      setCurrentPage(1);
                    }}
                  />
                </Badge>
              )}
              {sortBy !== "newest" && (
                <Badge variant="secondary" className="gap-1">
                  Sort: {sortOptions.find((opt) => opt.value === sortBy)?.label}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setSortBy("newest")}
                  />
                </Badge>
              )}
            </div>
          )}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div
          className={cn(
            "grid gap-6",
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          )}
        >
          {Array.from({ length: postsPerPage }).map((_, i) => (
            <BlogCardSkeleton key={i} variant={viewMode === "grid" ? "default" : "horizontal"} />
          ))}
        </div>
      )}

      {/* Blog Posts Grid */}
      {!isLoading && paginatedPosts.length > 0 && (
        <div
          className={cn(
            "grid gap-6",
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          )}
        >
          {paginatedPosts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              variant={viewMode === "grid" ? "default" : "horizontal"}
              onBookmark={onPostBookmark}
              onShare={onPostShare}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && paginatedPosts.length === 0 && (
        <Card className="p-12">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-muted">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">No Articles Found</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                {hasActiveFilters
                  ? "No articles match your search criteria. Try adjusting your filters."
                  : "There are no articles available at the moment. Check back soon!"}
              </p>
            </div>
            {hasActiveFilters && (
              <Button onClick={handleClearFilters} variant="outline">
                Clear All Filters
              </Button>
            )}
          </div>
        </Card>
      )}

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum: number;
              
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(pageNum)}
                  className="w-10"
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}

      {/* Page Info */}
      {!isLoading && totalPages > 1 && (
        <p className="text-center text-sm text-muted-foreground">
          Page {currentPage} of {totalPages} • Showing {paginatedPosts.length} of{" "}
          {filteredAndSortedPosts.length} articles
        </p>
      )}
    </div>
  );
}

export function BlogGridSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Skeleton className="h-10 w-[180px]" />
            <Skeleton className="h-10 w-[180px]" />
          </div>
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <BlogCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}