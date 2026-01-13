/**
 * Filter Helpers Utility
 * Helper functions for filtering and searching products/data
 */

/**
 * Product/Item interface for type safety
 */
export interface FilterableProduct {
  id: string;
  name: string;
  category?: string;
  subCategory?: string;
  price: number;
  originalPrice?: number;
  brand?: string;
  tags?: string[];
  rating?: number;
  inStock?: boolean;
  specifications?: Record<string, any>;
  [key: string]: any;
}

/**
 * Filter options interface
 */
export interface FilterOptions {
  categories?: string[];
  subCategories?: string[];
  brands?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  inStock?: boolean;
  tags?: string[];
  sortBy?: "price-asc" | "price-desc" | "name-asc" | "name-desc" | "rating-desc" | "newest";
  specifications?: Record<string, any>;
}

/**
 * Search options interface
 */
export interface SearchOptions {
  query: string;
  fields?: string[];
  fuzzy?: boolean;
  caseSensitive?: boolean;
}

/**
 * Filter products by multiple criteria
 */
export function filterProducts<T extends FilterableProduct>(
  products: T[],
  filters: FilterOptions
): T[] {
  let filtered = [...products];

  // Filter by categories
  if (filters.categories && filters.categories.length > 0) {
    filtered = filtered.filter(
      (product) =>
        product.category && filters.categories!.includes(product.category)
    );
  }

  // Filter by sub-categories
  if (filters.subCategories && filters.subCategories.length > 0) {
    filtered = filtered.filter(
      (product) =>
        product.subCategory &&
        filters.subCategories!.includes(product.subCategory)
    );
  }

  // Filter by brands
  if (filters.brands && filters.brands.length > 0) {
    filtered = filtered.filter(
      (product) => product.brand && filters.brands!.includes(product.brand)
    );
  }

  // Filter by price range
  if (filters.priceRange) {
    const { min, max } = filters.priceRange;
    filtered = filtered.filter(
      (product) => product.price >= min && product.price <= max
    );
  }

  // Filter by minimum rating
  if (filters.rating !== undefined) {
    filtered = filtered.filter(
      (product) => product.rating && product.rating >= filters.rating!
    );
  }

  // Filter by stock availability
  if (filters.inStock !== undefined) {
    filtered = filtered.filter(
      (product) => product.inStock === filters.inStock
    );
  }

  // Filter by tags
  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter((product) =>
      product.tags?.some((tag) => filters.tags!.includes(tag))
    );
  }

  // Filter by specifications
  if (filters.specifications) {
    filtered = filtered.filter((product) => {
      if (!product.specifications) return false;

      return Object.entries(filters.specifications!).every(([key, value]) => {
        const productValue = product.specifications![key];

        if (Array.isArray(value)) {
          return value.includes(productValue);
        }

        return productValue === value;
      });
    });
  }

  // Sort products
  if (filters.sortBy) {
    filtered = sortProducts(filtered, filters.sortBy);
  }

  return filtered;
}

/**
 * Sort products by specified criteria
 */
export function sortProducts<T extends FilterableProduct>(
  products: T[],
  sortBy: FilterOptions["sortBy"]
): T[] {
  const sorted = [...products];

  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);

    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);

    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));

    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));

    case "rating-desc":
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));

    case "newest":
      // Assumes products have a createdAt field
      return sorted.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });

    default:
      return sorted;
  }
}

/**
 * Search products by query string
 */
export function searchProducts<T extends FilterableProduct>(
  products: T[],
  options: SearchOptions
): T[] {
  const {
    query,
    fields = ["name", "category", "brand", "tags"],
    fuzzy = true,
    caseSensitive = false,
  } = options;

  if (!query || query.trim() === "") {
    return products;
  }

  const searchTerm = caseSensitive ? query : query.toLowerCase();

  return products.filter((product) => {
    return fields.some((field) => {
      const value = product[field];

      if (!value) return false;

      if (Array.isArray(value)) {
        return value.some((item: any) =>
          matchesSearch(String(item), searchTerm, fuzzy, caseSensitive)
        );
      }

      return matchesSearch(String(value), searchTerm, fuzzy, caseSensitive);
    });
  });
}

/**
 * Check if a value matches search term
 */
function matchesSearch(
  value: string,
  searchTerm: string,
  fuzzy: boolean,
  caseSensitive: boolean
): boolean {
  const compareValue = caseSensitive ? value : value.toLowerCase();

  if (!fuzzy) {
    return compareValue.includes(searchTerm);
  }

  // Fuzzy search: allow characters to be missing between matched characters
  let searchIndex = 0;
  for (let i = 0; i < compareValue.length && searchIndex < searchTerm.length; i++) {
    if (compareValue[i] === searchTerm[searchIndex]) {
      searchIndex++;
    }
  }

  return searchIndex === searchTerm.length;
}

/**
 * Get unique values for a specific field
 */
export function getUniqueValues<T extends FilterableProduct>(
  products: T[],
  field: keyof T
): string[] {
  const values = products
    .map((product) => product[field])
    .filter((value) => value !== undefined && value !== null);

  const uniqueValues = new Set<string>();

  values.forEach((value) => {
    if (Array.isArray(value)) {
      value.forEach((item: any) => uniqueValues.add(String(item)));
    } else {
      uniqueValues.add(String(value));
    }
  });

  return Array.from(uniqueValues).sort();
}

/**
 * Get price range from products
 */
export function getPriceRange<T extends FilterableProduct>(products: T[]): {
  min: number;
  max: number;
} {
  if (products.length === 0) {
    return { min: 0, max: 0 };
  }

  const prices = products.map((p) => p.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}

/**
 * Get rating distribution
 */
export function getRatingDistribution<T extends FilterableProduct>(
  products: T[]
): Record<number, number> {
  const distribution: Record<number, number> = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  products.forEach((product) => {
    if (product.rating) {
      const rating = Math.floor(product.rating);
      if (rating >= 1 && rating <= 5) {
        distribution[rating]++;
      }
    }
  });

  return distribution;
}

/**
 * Filter by price ranges (predefined buckets)
 */
export function filterByPriceBucket<T extends FilterableProduct>(
  products: T[],
  bucket: "under-500" | "500-1000" | "1000-2000" | "2000-5000" | "above-5000"
): T[] {
  const ranges: Record<typeof bucket, [number, number]> = {
    "under-500": [0, 500],
    "500-1000": [500, 1000],
    "1000-2000": [1000, 2000],
    "2000-5000": [2000, 5000],
    "above-5000": [5000, Infinity],
  };

  const [min, max] = ranges[bucket];
  return products.filter((p) => p.price >= min && p.price < max);
}

/**
 * Filter by discount percentage
 */
export function filterByDiscount<T extends FilterableProduct>(
  products: T[],
  minDiscountPercentage: number
): T[] {
  return products.filter((product) => {
    if (!product.originalPrice || !product.price) return false;
    
    const discount =
      ((product.originalPrice - product.price) / product.originalPrice) * 100;
    
    return discount >= minDiscountPercentage;
  });
}

/**
 * Get products with active discounts
 */
export function getDiscountedProducts<T extends FilterableProduct>(
  products: T[]
): T[] {
  return products.filter(
    (product) =>
      product.originalPrice &&
      product.price &&
      product.originalPrice > product.price
  );
}

/**
 * Paginate products
 */
export function paginateProducts<T>(
  products: T[],
  page: number,
  itemsPerPage: number
): {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
} {
  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const items = products.slice(startIndex, endIndex);

  return {
    items,
    currentPage,
    totalPages,
    totalItems,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
}

/**
 * Get active filters count
 */
export function getActiveFiltersCount(filters: FilterOptions): number {
  let count = 0;

  if (filters.categories && filters.categories.length > 0) count++;
  if (filters.subCategories && filters.subCategories.length > 0) count++;
  if (filters.brands && filters.brands.length > 0) count++;
  if (filters.priceRange) count++;
  if (filters.rating !== undefined) count++;
  if (filters.inStock !== undefined) count++;
  if (filters.tags && filters.tags.length > 0) count++;
  if (filters.specifications && Object.keys(filters.specifications).length > 0) {
    count += Object.keys(filters.specifications).length;
  }

  return count;
}

/**
 * Clear all filters
 */
export function clearFilters(): FilterOptions {
  return {};
}

/**
 * Remove specific filter
 */
export function removeFilter(
  filters: FilterOptions,
  filterKey: keyof FilterOptions
): FilterOptions {
  const newFilters = { ...filters };
  delete newFilters[filterKey];
  return newFilters;
}

/**
 * Get facets (filter options with counts)
 */
export function getFacets<T extends FilterableProduct>(
  products: T[]
): {
  categories: Record<string, number>;
  brands: Record<string, number>;
  priceRanges: Record<string, number>;
  ratings: Record<number, number>;
} {
  const facets = {
    categories: {} as Record<string, number>,
    brands: {} as Record<string, number>,
    priceRanges: {
      "under-500": 0,
      "500-1000": 0,
      "1000-2000": 0,
      "2000-5000": 0,
      "above-5000": 0,
    },
    ratings: {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    },
  };

  products.forEach((product) => {
    // Count categories
    if (product.category) {
      facets.categories[product.category] =
        (facets.categories[product.category] || 0) + 1;
    }

    // Count brands
    if (product.brand) {
      facets.brands[product.brand] = (facets.brands[product.brand] || 0) + 1;
    }

    // Count price ranges
    if (product.price < 500) facets.priceRanges["under-500"]++;
    else if (product.price < 1000) facets.priceRanges["500-1000"]++;
    else if (product.price < 2000) facets.priceRanges["1000-2000"]++;
    else if (product.price < 5000) facets.priceRanges["2000-5000"]++;
    else facets.priceRanges["above-5000"]++;

    // Count ratings
    if (product.rating) {
      const rating = Math.floor(product.rating);
      if (rating >= 1 && rating <= 5) {
        facets.ratings[rating as 1 | 2 | 3 | 4 | 5]++;
      }
    }
  });

  return facets;
}

/**
 * Build filter query string for URL
 */
export function buildFilterQueryString(filters: FilterOptions): string {
  const params = new URLSearchParams();

  if (filters.categories && filters.categories.length > 0) {
    params.set("categories", filters.categories.join(","));
  }

  if (filters.subCategories && filters.subCategories.length > 0) {
    params.set("subCategories", filters.subCategories.join(","));
  }

  if (filters.brands && filters.brands.length > 0) {
    params.set("brands", filters.brands.join(","));
  }

  if (filters.priceRange) {
    params.set("minPrice", filters.priceRange.min.toString());
    params.set("maxPrice", filters.priceRange.max.toString());
  }

  if (filters.rating !== undefined) {
    params.set("rating", filters.rating.toString());
  }

  if (filters.inStock !== undefined) {
    params.set("inStock", filters.inStock.toString());
  }

  if (filters.tags && filters.tags.length > 0) {
    params.set("tags", filters.tags.join(","));
  }

  if (filters.sortBy) {
    params.set("sortBy", filters.sortBy);
  }

  return params.toString();
}

/**
 * Parse filter query string from URL
 */
export function parseFilterQueryString(queryString: string): FilterOptions {
  const params = new URLSearchParams(queryString);
  const filters: FilterOptions = {};

  const categories = params.get("categories");
  if (categories) {
    filters.categories = categories.split(",");
  }

  const subCategories = params.get("subCategories");
  if (subCategories) {
    filters.subCategories = subCategories.split(",");
  }

  const brands = params.get("brands");
  if (brands) {
    filters.brands = brands.split(",");
  }

  const minPrice = params.get("minPrice");
  const maxPrice = params.get("maxPrice");
  if (minPrice && maxPrice) {
    filters.priceRange = {
      min: parseFloat(minPrice),
      max: parseFloat(maxPrice),
    };
  }

  const rating = params.get("rating");
  if (rating) {
    filters.rating = parseFloat(rating);
  }

  const inStock = params.get("inStock");
  if (inStock) {
    filters.inStock = inStock === "true";
  }

  const tags = params.get("tags");
  if (tags) {
    filters.tags = tags.split(",");
  }

  const sortBy = params.get("sortBy");
  if (sortBy) {
    filters.sortBy = sortBy as FilterOptions["sortBy"];
  }

  return filters;
}

/**
 * Get recommended filters based on current selection
 */
export function getRecommendedFilters<T extends FilterableProduct>(
  products: T[],
  currentFilters: FilterOptions
): Partial<FilterOptions> {
  // Get most common values in filtered results
  const recommendations: Partial<FilterOptions> = {};

  // Recommend popular brands
  const brandCounts = products.reduce((acc, product) => {
    if (product.brand) {
      acc[product.brand] = (acc[product.brand] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const topBrands = Object.entries(brandCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([brand]) => brand);

  if (topBrands.length > 0 && !currentFilters.brands) {
    recommendations.brands = topBrands;
  }

  // Recommend price range based on distribution
  const priceRange = getPriceRange(products);
  if (!currentFilters.priceRange && products.length > 0) {
    recommendations.priceRange = priceRange;
  }

  return recommendations;
}