import { useState, useEffect, useCallback, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  images?: string[];
  category: string;
  woodType?: string;
  stock: number;
  inStock: boolean;
  rating?: number;
  reviewCount?: number;
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
    thickness?: number;
    unit?: string;
  };
  weight?: number;
  sku?: string;
  tags?: string[];
  featured?: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  createdAt?: string;
}

export interface ProductFilters {
  category?: string[];
  woodType?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  inStockOnly?: boolean;
  search?: string;
  tags?: string[];
  featured?: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
}

export interface SortOptions {
  sortBy:
    | 'newest'
    | 'oldest'
    | 'price-asc'
    | 'price-desc'
    | 'name-asc'
    | 'name-desc'
    | 'popular'
    | 'rating';
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasMore: boolean;
}

export interface UseInfiniteProductsOptions {
  initialLimit?: number;
  filters?: ProductFilters;
  sort?: SortOptions['sortBy'];
  enabled?: boolean;
  apiEndpoint?: string;
}

export interface UseInfiniteProductsReturn {
  // Data
  products: Product[];
  allProducts: Product[];
  
  // Pagination
  pagination: PaginationInfo;
  hasMore: boolean;
  
  // Loading States
  isLoading: boolean;
  isFetchingMore: boolean;
  isRefreshing: boolean;
  
  // Error State
  error: string | null;
  
  // Actions
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  reset: () => void;
  
  // Infinite Scroll Ref
  ref: (node?: Element | null) => void;
  inView: boolean;
  
  // Utilities
  isEmpty: boolean;
  canLoadMore: boolean;
}

const DEFAULT_LIMIT = 12;
const DEFAULT_API_ENDPOINT = '/api/products';

export const useInfiniteProducts = (
  options: UseInfiniteProductsOptions = {}
): UseInfiniteProductsReturn => {
  const {
    initialLimit = DEFAULT_LIMIT,
    filters = {},
    sort = 'newest',
    enabled = true,
    apiEndpoint = DEFAULT_API_ENDPOINT,
  } = options;

  // State
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: initialLimit,
    hasMore: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Intersection Observer for infinite scroll
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: '100px',
  });

  // Refs to track current request
  const abortControllerRef = useRef<AbortController | null>(null);
  const isLoadingMoreRef = useRef(false);

  // Build query parameters
  const buildQueryParams = useCallback(
    (page: number) => {
      const params = new URLSearchParams();

      params.append('page', page.toString());
      params.append('limit', initialLimit.toString());
      params.append('sort', sort);

      // Add filters
      if (filters.category && filters.category.length > 0) {
        params.append('category', filters.category.join(','));
      }

      if (filters.woodType && filters.woodType.length > 0) {
        params.append('woodType', filters.woodType.join(','));
      }

      if (filters.priceRange) {
        params.append('minPrice', filters.priceRange.min.toString());
        params.append('maxPrice', filters.priceRange.max.toString());
      }

      if (filters.inStockOnly) {
        params.append('inStock', 'true');
      }

      if (filters.search) {
        params.append('search', filters.search);
      }

      if (filters.tags && filters.tags.length > 0) {
        params.append('tags', filters.tags.join(','));
      }

      if (filters.featured) {
        params.append('featured', 'true');
      }

      if (filters.isNew) {
        params.append('isNew', 'true');
      }

      if (filters.isBestseller) {
        params.append('isBestseller', 'true');
      }

      return params.toString();
    },
    [filters, sort, initialLimit]
  );

  // Fetch products
  const fetchProducts = useCallback(
    async (page: number, append: boolean = false) => {
      try {
        // Cancel previous request
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }

        // Create new abort controller
        abortControllerRef.current = new AbortController();

        if (append) {
          setIsFetchingMore(true);
        } else {
          setIsLoading(true);
        }

        setError(null);

        const queryParams = buildQueryParams(page);
        const url = `${apiEndpoint}?${queryParams}`;

        const response = await fetch(url, {
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();

        // Update products
        setProducts((prev) => {
          if (append) {
            // Append new products, avoiding duplicates
            const existingIds = new Set(prev.map((p) => p.id));
            const newProducts = data.products.filter(
              (p: Product) => !existingIds.has(p.id)
            );
            return [...prev, ...newProducts];
          } else {
            return data.products;
          }
        });

        // Update pagination
        setPagination({
          currentPage: data.pagination.currentPage,
          totalPages: data.pagination.totalPages,
          totalItems: data.pagination.totalItems,
          itemsPerPage: data.pagination.itemsPerPage,
          hasMore: data.pagination.currentPage < data.pagination.totalPages,
        });
      } catch (err) {
        // Ignore abort errors
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }

        setError(
          err instanceof Error ? err.message : 'Failed to load products'
        );
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
        setIsFetchingMore(false);
        setIsRefreshing(false);
        isLoadingMoreRef.current = false;
      }
    },
    [apiEndpoint, buildQueryParams]
  );

  // Load more products
  const loadMore = useCallback(async () => {
    if (
      !pagination.hasMore ||
      isLoadingMoreRef.current ||
      isFetchingMore ||
      isLoading
    ) {
      return;
    }

    isLoadingMoreRef.current = true;
    await fetchProducts(pagination.currentPage + 1, true);
  }, [pagination, isFetchingMore, isLoading, fetchProducts]);

  // Refresh products (reset to page 1)
  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    setProducts([]);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
    await fetchProducts(1, false);
  }, [fetchProducts]);

  // Reset to initial state
  const reset = useCallback(() => {
    setProducts([]);
    setPagination({
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      itemsPerPage: initialLimit,
      hasMore: false,
    });
    setError(null);
    setIsLoading(true);
  }, [initialLimit]);

  // Initial load and when filters/sort change
  useEffect(() => {
    if (!enabled) return;

    reset();
    fetchProducts(1, false);

    // Cleanup
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [enabled, filters, sort, initialLimit]);

  // Infinite scroll - load more when in view
  useEffect(() => {
    if (inView && pagination.hasMore && !isFetchingMore && !isLoading) {
      loadMore();
    }
  }, [inView, pagination.hasMore, isFetchingMore, isLoading, loadMore]);

  return {
    // Data
    products,
    allProducts: products,

    // Pagination
    pagination,
    hasMore: pagination.hasMore,

    // Loading States
    isLoading,
    isFetchingMore,
    isRefreshing,

    // Error State
    error,

    // Actions
    loadMore,
    refresh,
    reset,

    // Infinite Scroll Ref
    ref,
    inView,

    // Utilities
    isEmpty: products.length === 0 && !isLoading,
    canLoadMore: pagination.hasMore && !isFetchingMore && !isLoading,
  };
};