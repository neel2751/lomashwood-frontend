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
  products: Product[];
  allProducts: Product[];

  pagination: PaginationInfo;
  hasMore: boolean;

  isLoading: boolean;
  isFetchingMore: boolean;
  isRefreshing: boolean;

  error: string | null;

  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  reset: () => void;

  ref: (node?: Element | null) => void;
  inView: boolean;

  isEmpty: boolean;
  canLoadMore: boolean;
}

const DEFAULT_LIMIT = 12;
const DEFAULT_API_ENDPOINT =
  `${process.env.NEXT_PUBLIC_API_URL || 'https://lomashwood-backend.vercel.app/api/v1'}/products`;

const mapApiProduct = (raw: any): Product => ({
  id: raw.id,
  name: raw.title || raw.name || '',
  slug: raw.slug || raw.id,
  description: raw.description || '',
  price: raw.price || 0,
  originalPrice: raw.originalPrice,
  discount: raw.discount,
  image: raw.images?.[0] || raw.image || '/images/placeholder-product.jpg',
  images: raw.images || (raw.image ? [raw.image] : []),
  category: raw.category || '',
  woodType: raw.woodType,
  stock: typeof raw.stock === 'number' ? raw.stock : 1,
  inStock: raw.inStock ?? true,
  rating: raw.rating,
  reviewCount: raw.reviewCount,
  dimensions: raw.dimensions,
  weight: raw.weight,
  sku: raw.sku,
  tags: raw.tags,
  featured: raw.featured,
  isNew: raw.isNew,
  isBestseller: raw.isBestseller,
  createdAt: raw.createdAt,
});

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

  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: '100px',
  });

  const abortControllerRef = useRef<AbortController | null>(null);
  const isLoadingMoreRef = useRef(false);

  const buildQueryParams = useCallback(
    (page: number) => {
      const params = new URLSearchParams();

      params.append('page', page.toString());
      params.append('limit', initialLimit.toString());
      params.append('sort', sort);

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

  const fetchProducts = useCallback(
    async (page: number, append: boolean = false) => {
      try {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }

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

        const payload = await response.json();
        const productRows = payload?.data?.products ?? payload?.data ?? payload?.products ?? [];
        const paginationData = payload?.data?.pagination ?? payload?.pagination;
        const mappedProducts = (productRows as any[]).map(mapApiProduct);

        setProducts((prev) => {
          if (append) {
            const existingIds = new Set(prev.map((p) => p.id));
            const newProducts = mappedProducts.filter(
              (p: Product) => !existingIds.has(p.id)
            );
            return [...prev, ...newProducts];
          } else {
            return mappedProducts;
          }
        });

        const currentPage = paginationData?.currentPage ?? paginationData?.page ?? page;
        const totalPages = paginationData?.totalPages ?? 1;
        const totalItems = paginationData?.totalItems ?? paginationData?.total ?? mappedProducts.length;
        const itemsPerPage = paginationData?.itemsPerPage ?? paginationData?.limit ?? initialLimit;

        setPagination({
          currentPage,
          totalPages,
          totalItems,
          itemsPerPage,
          hasMore: currentPage < totalPages,
        });
      } catch (err) {
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

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    setProducts([]);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
    await fetchProducts(1, false);
  }, [fetchProducts]);

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

  useEffect(() => {
    if (!enabled) return;

    reset();
    fetchProducts(1, false);

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [enabled, filters, sort, initialLimit]);

  useEffect(() => {
    if (inView && pagination.hasMore && !isFetchingMore && !isLoading) {
      loadMore();
    }
  }, [inView, pagination.hasMore, isFetchingMore, isLoading, loadMore]);

  return {
    products,
    allProducts: products,

    pagination,
    hasMore: pagination.hasMore,

    isLoading,
    isFetchingMore,
    isRefreshing,

    error,

    loadMore,
    refresh,
    reset,

    ref,
    inView,

    isEmpty: products.length === 0 && !isLoading,
    canLoadMore: pagination.hasMore && !isFetchingMore && !isLoading,
  };
};