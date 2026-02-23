"use client";

import { LayoutGrid, LayoutList, SlidersHorizontal, X, Tag, TrendingUp, Clock } from "lucide-react";
import { useState, useMemo } from "react";

const SaleCard = ({ offer}: any) => (
  <div className="border rounded-lg p-4">
    <h3>{offer.title}</h3>
    <p>{offer.description}</p>
  </div>
);

export interface SaleOffer {
  id: string;
  title: string;
  description: string;
  category: string;
  discountType: string;
  discountValue: number;
  salePrice?: number;
  startDate: string;
  endDate: string;
  isActive?: boolean;
}

interface SaleGridProps {
  offers: SaleOffer[];
  isLoading?: boolean;
  featuredOffer?: SaleOffer;
  showFilters?: boolean;
  showViewToggle?: boolean;
  defaultView?: "grid" | "list";
  onAddToCart?: (offerId: string) => void;
  onToggleWishlist?: (offerId: string) => void;
  wishlistIds?: string[];
  className?: string;
}

type CategoryFilter = "all" | "kitchen" | "bedroom" | "both" | "accessories";
type DiscountFilter = "all" | "percentage" | "fixed" | "bundle";
type SortOption = "newest" | "ending-soon" | "discount-high" | "discount-low" | "price-low" | "price-high";

const categoryOptions: Array<{ value: CategoryFilter; label: string }> = [
  { value: "all", label: "All Categories" },
  { value: "kitchen", label: "Kitchen" },
  { value: "bedroom", label: "Bedroom" },
  { value: "both", label: "Kitchen & Bedroom" },
  { value: "accessories", label: "Accessories" },
];

const discountTypeOptions: Array<{ value: DiscountFilter; label: string }> = [
  { value: "all", label: "All Discounts" },
  { value: "percentage", label: "Percentage Off" },
  { value: "fixed", label: "Fixed Amount" },
  { value: "bundle", label: "Bundle Deals" },
];

const sortOptions: Array<{ value: SortOption; label: string }> = [
  { value: "newest", label: "Newest First" },
  { value: "ending-soon", label: "Ending Soon" },
  { value: "discount-high", label: "Highest Discount" },
  { value: "discount-low", label: "Lowest Discount" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

const statusTabs = [
  { value: "all", label: "All Offers", icon: Tag },
  { value: "active", label: "Active", icon: TrendingUp },
  { value: "ending-soon", label: "Ending Soon", icon: Clock },
];

export default function SaleGrid({
  offers,
  isLoading = false,
  featuredOffer,
  showFilters = true,
  showViewToggle = true,
  defaultView = "grid",
  onAddToCart,
  onToggleWishlist,
  wishlistIds = [],
  className = "",
}: SaleGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">(defaultView);
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [discountFilter, setDiscountFilter] = useState<DiscountFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const calculateTimeRemaining = (endDate: string) => {
    const now = new Date().getTime();
    const end = new Date(endDate).getTime();
    return end - now;
  };

  const filteredAndSortedOffers = useMemo(() => {
    let filtered = [...offers];

    if (categoryFilter !== "all") {
      filtered = filtered.filter((offer) => offer.category === categoryFilter);
    }

    if (discountFilter !== "all") {
      filtered = filtered.filter((offer) => offer.discountType === discountFilter);
    }

    if (statusFilter === "active") {
      filtered = filtered.filter((offer) => offer.isActive !== false);
    } else if (statusFilter === "ending-soon") {
      filtered = filtered.filter((offer) => {
        const timeLeft = calculateTimeRemaining(offer.endDate);
        return timeLeft > 0 && timeLeft < 7 * 24 * 60 * 60 * 1000;
      });
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        case "ending-soon":
          return calculateTimeRemaining(a.endDate) - calculateTimeRemaining(b.endDate);
        case "discount-high":
          return b.discountValue - a.discountValue;
        case "discount-low":
          return a.discountValue - b.discountValue;
        case "price-low":
          return (a.salePrice || 0) - (b.salePrice || 0);
        case "price-high":
          return (b.salePrice || 0) - (a.salePrice || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [offers, categoryFilter, discountFilter, statusFilter, sortBy]);

  const handleClearFilters = () => {
    setCategoryFilter("all");
    setDiscountFilter("all");
    setSortBy("newest");
    setStatusFilter("all");
  };

  const hasActiveFilters =
    categoryFilter !== "all" ||
    discountFilter !== "all" ||
    sortBy !== "newest" ||
    statusFilter !== "all";

  const activeOffers = offers.filter((offer) => offer.isActive !== false);
  const endingSoonOffers = offers.filter((offer) => {
    const timeLeft = calculateTimeRemaining(offer.endDate);
    return timeLeft > 0 && timeLeft < 7 * 24 * 60 * 60 * 1000;
  });

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Featured Offer */}
      {featuredOffer && statusFilter === "all" && !hasActiveFilters && (
        <SaleCard
          offer={featuredOffer}
          variant="featured"
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          isInWishlist={wishlistIds.includes(featuredOffer.id)}
        />
      )}

      {/* Status Tabs */}
      <div className="bg-white border rounded-lg p-1">
        <div className="grid grid-cols-3 gap-1">
          {statusTabs.map((tab) => {
            const Icon = tab.icon;
            let count = offers.length;
            if (tab.value === "active") count = activeOffers.length;
            if (tab.value === "ending-soon") count = endingSoonOffers.length;

            return (
              <button
                key={tab.value}
                onClick={() => setStatusFilter(tab.value)}
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  statusFilter === tab.value
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-700">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filters and Controls */}
      {showFilters && (
        <div className="space-y-4">
          {/* Mobile Filter Toggle */}
          <div className="flex items-center justify-between lg:hidden">
            <p className="text-sm text-gray-600">
              {filteredAndSortedOffers.length} offer{filteredAndSortedOffers.length !== 1 ? "s" : ""} found
            </p>
            <button
              onClick={() => setShowFilterPanel(!showFilterPanel)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <span className="ml-2 inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-700">
                  Active
                </span>
              )}
            </button>
          </div>

          {/* Filter Panel */}
          <div className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 ${!showFilterPanel ? "hidden lg:grid" : ""}`}>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as CategoryFilter)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={discountFilter}
              onChange={(e) => setDiscountFilter(e.target.value as DiscountFilter)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {discountTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <X className="mr-2 h-4 w-4" />
                Clear Filters
              </button>
            )}
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-600">Active filters:</span>
              {categoryFilter !== "all" && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-200 text-sm">
                  Category: {categoryOptions.find((o) => o.value === categoryFilter)?.label}
                  <X
                    className="h-3 w-3 cursor-pointer hover:text-red-600"
                    onClick={() => setCategoryFilter("all")}
                  />
                </span>
              )}
              {discountFilter !== "all" && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-200 text-sm">
                  Discount: {discountTypeOptions.find((o) => o.value === discountFilter)?.label}
                  <X
                    className="h-3 w-3 cursor-pointer hover:text-red-600"
                    onClick={() => setDiscountFilter("all")}
                  />
                </span>
              )}
              {sortBy !== "newest" && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-200 text-sm">
                  Sort: {sortOptions.find((o) => o.value === sortBy)?.label}
                  <X
                    className="h-3 w-3 cursor-pointer hover:text-red-600"
                    onClick={() => setSortBy("newest")}
                  />
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* View Toggle and Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 hidden lg:block">
          {filteredAndSortedOffers.length} offer{filteredAndSortedOffers.length !== 1 ? "s" : ""} found
        </p>
        {showViewToggle && (
          <div className="flex items-center gap-1 border rounded-md p-1 ml-auto">
            <button
              onClick={() => setViewMode("grid")}
              className={`h-8 w-8 flex items-center justify-center rounded ${
                viewMode === "grid" ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`h-8 w-8 flex items-center justify-center rounded ${
                viewMode === "list" ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
            >
              <LayoutList className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border rounded-lg overflow-hidden animate-pulse">
              <div className="h-56 bg-gray-200" />
              <div className="p-6 space-y-3">
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
                <div className="h-10 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Offers Grid */}
      {!isLoading && filteredAndSortedOffers.length > 0 && (
        <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
          {filteredAndSortedOffers.map((offer) => (
            <SaleCard
              key={offer.id}
              offer={offer}
              variant={viewMode === "grid" ? "default" : "horizontal"}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isInWishlist={wishlistIds.includes(offer.id)}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredAndSortedOffers.length === 0 && (
        <div className="border rounded-lg p-12">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-gray-100">
                <Tag className="h-8 w-8 text-gray-400" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">No Offers Found</h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                {hasActiveFilters
                  ? "No offers match your filter criteria. Try adjusting your filters."
                  : "There are no active offers at the moment. Check back soon for great deals!"}
              </p>
            </div>
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </div>
      )}

      {/* Info Banner */}
      {!isLoading && filteredAndSortedOffers.length > 0 && (
        <div className="border border-blue-200 rounded-lg p-6 bg-blue-50">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-shrink-0">
              <div className="p-3 rounded-full bg-blue-100">
                <Tag className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="flex-1 space-y-1">
              <h3 className="font-semibold">Limited Time Offers</h3>
              <p className="text-sm text-gray-600">
                Don't miss out on these exclusive deals. Terms and conditions apply. Contact us for
                more details or to book a consultation.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <button
                onClick={() => window.location.href = '/book-appointment'}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Book Consultation
              </button>
              <button
                onClick={() => window.location.href = '/contact'}
                className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function SaleGridSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-96 bg-gray-200 rounded-lg animate-pulse" />
      <div className="flex items-center gap-4">
        <div className="h-10 flex-1 bg-gray-200 rounded animate-pulse" />
        <div className="h-10 flex-1 bg-gray-200 rounded animate-pulse" />
        <div className="h-10 flex-1 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border rounded-lg overflow-hidden">
            <div className="h-56 bg-gray-200 animate-pulse" />
            <div className="p-6 space-y-3">
              <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
              <div className="h-10 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}