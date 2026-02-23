"use client";

import {
  Heart,
  ShoppingCart,
  X,
  Share2,
  Tag,
  TrendingDown,
  AlertCircle,
  LayoutGrid,
  LayoutList,
} from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating?: number;
  reviewCount?: number;
  inStock: boolean;
  addedDate: string;
  category?: string;
  tags?: string[];
}

interface WishlistGridProps {
  items: WishlistItem[];
  onRemove: (itemId: string) => void;
  onAddToCart: (itemId: string) => void;
  onShare?: (itemId: string) => void;
  onClearAll?: () => void;
  showFilters?: boolean;
  className?: string;
}

type SortOption = "recent" | "price-low" | "price-high" | "name" | "discount";
type ViewMode = "grid" | "list";

export default function WishlistGrid({
  items,
  onRemove,
  onAddToCart,
  onShare,
  onClearAll,
  showFilters = true,
  className,
}: WishlistGridProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showStockFilter, setShowStockFilter] = useState(false);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const { toast } = useToast();

  const processedItems = items
    .filter((item) => (showStockFilter ? item.inStock : true))
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        case "discount":
          return (b.discount || 0) - (a.discount || 0);
        default:
          return 0;
      }
    });

  const handleSelectAll = () => {
    if (selectedItems.length === processedItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(processedItems.map((item) => item.id));
    }
  };

  const handleToggleSelect = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const handleRemoveSelected = () => {
    selectedItems.forEach((id) => onRemove(id));
    setSelectedItems([]);
    toast({
      title: "Items removed",
      description: `${selectedItems.length} items removed from wishlist`,
    });
  };

  const handleAddSelectedToCart = () => {
    selectedItems.forEach((id) => onAddToCart(id));
    toast({
      title: "Added to cart",
      description: `${selectedItems.length} items added to cart`,
    });
  };

  const handleClearAll = () => {
    onClearAll?.();
    setShowClearDialog(false);
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  if (items.length === 0) {
    return (
      <Card className={className}>
        <CardContent className="p-12">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-muted">
                <Heart className="h-12 w-12 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Your Wishlist is Empty</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Save items you love to your wishlist and shop them later
              </p>
            </div>
            <Button>Browse Products</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header & Controls */}
      <div className="space-y-4">
        {/* Title & Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">My Wishlist</h2>
            <p className="text-muted-foreground">
              {processedItems.length} {processedItems.length === 1 ? "item" : "items"}
            </p>
          </div>

          {onClearAll && items.length > 0 && (
            <Dialog open={showClearDialog} onOpenChange={setShowClearDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <X className="mr-2 h-4 w-4" />
                  Clear All
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Clear Wishlist</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to remove all items from your wishlist? This action
                    cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowClearDialog(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleClearAll} className="flex-1">
                    Clear All
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Filters & Sort */}
        {showFilters && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="stock-filter"
                  checked={showStockFilter}
                  onCheckedChange={(checked: boolean) => setShowStockFilter(checked)}
                />
                <label
                  htmlFor="stock-filter"
                  className="text-sm cursor-pointer whitespace-nowrap"
                >
                  In Stock Only
                </label>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="flex h-10 w-[180px] items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="recent">Recently Added</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
                <option value="discount">Highest Discount</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <LayoutList className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Bulk Actions */}
        {selectedItems.length > 0 && (
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Checkbox
                  checked={selectedItems.length === processedItems.length}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm font-medium">
                  {selectedItems.length} selected
                </span>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddSelectedToCart}
                  className="flex-1 sm:flex-initial"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleRemoveSelected}
                  className="flex-1 sm:flex-initial"
                >
                  <X className="mr-2 h-4 w-4" />
                  Remove
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Items Grid/List */}
      <div
        className={cn(
          "grid gap-6",
          viewMode === "grid"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : "grid-cols-1"
        )}
      >
        {processedItems.map((item) => (
          <Card
            key={item.id}
            className={cn(
              "overflow-hidden hover:shadow-lg transition-shadow group",
              !item.inStock && "opacity-75"
            )}
          >
            <div className="relative">
              {/* Selection Checkbox */}
              <div className="absolute top-3 left-3 z-10">
                <Checkbox
                  checked={selectedItems.includes(item.id)}
                  onCheckedChange={() => handleToggleSelect(item.id)}
                  className="bg-background"
                />
              </div>

              {/* Remove Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemove(item.id)}
                className="absolute top-3 right-3 z-10 bg-background/80 hover:bg-background"
              >
                <X className="h-4 w-4" />
              </Button>

              {/* Discount Badge */}
              {item.discount && item.discount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute top-14 left-3 z-10 gap-1"
                >
                  <TrendingDown className="h-3 w-3" />
                  {item.discount}% OFF
                </Badge>
              )}

              {/* Product Image */}
              <a
                href={`/products/${item.productId}`}
                className="relative block aspect-square bg-muted overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {!item.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="secondary" className="text-sm">
                      Out of Stock
                    </Badge>
                  </div>
                )}
              </a>
            </div>

            <CardContent className="p-4 space-y-3">
              {/* Category */}
              {item.category && (
                <Badge variant="outline" className="text-xs">
                  {item.category}
                </Badge>
              )}

              {/* Product Name */}
              <a
                href={`/products/${item.productId}`}
                className="font-semibold hover:text-primary transition-colors line-clamp-2 block"
              >
                {item.name}
              </a>

              {/* Rating */}
              {item.rating && (
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={cn(
                          "text-xs",
                          i < Math.floor(item.rating!)
                            ? "text-yellow-400"
                            : "text-muted-foreground"
                        )}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  {item.reviewCount && (
                    <span className="text-muted-foreground">({item.reviewCount})</span>
                  )}
                </div>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold">₹{item.price.toLocaleString()}</span>
                {item.originalPrice && item.originalPrice > item.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    ₹{item.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Added Date */}
              <p className="text-xs text-muted-foreground">
                Added {formatDate(item.addedDate)}
              </p>

              {/* Tags */}
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      <Tag className="h-2 w-2 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>

            <CardFooter className="p-4 pt-0 flex gap-2">
              <Button
                onClick={() => onAddToCart(item.id)}
                disabled={!item.inStock}
                className="flex-1"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                {item.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
              {onShare && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onShare(item.id)}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Empty Filtered State */}
      {processedItems.length === 0 && items.length > 0 && (
        <Card>
          <CardContent className="p-12">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-4 rounded-full bg-muted">
                  <AlertCircle className="h-8 w-8 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">No Items Found</h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your filters to see more items
                </p>
              </div>
              <Button variant="outline" onClick={() => setShowStockFilter(false)}>
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export function WishlistItemSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square bg-muted animate-pulse" />
      <CardContent className="p-4 space-y-3 animate-pulse">
        <div className="h-4 bg-muted rounded w-1/3" />
        <div className="h-5 bg-muted rounded w-full" />
        <div className="h-4 bg-muted rounded w-2/3" />
        <div className="h-6 bg-muted rounded w-1/2" />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="h-10 bg-muted rounded w-full animate-pulse" />
      </CardFooter>
    </Card>
  );
}

export function WishlistGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <WishlistItemSkeleton key={i} />
      ))}
    </div>
  );
}