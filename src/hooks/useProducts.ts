import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { productService } from "@/services/productService";
import { QUERY_KEYS } from "@/lib/react-query";
import type { ProductFilters } from "@/types";

/**
 * Get all products with filters
 */
export function useProducts(params?: {
  category?: "kitchen" | "bedroom";
  filters?: ProductFilters;
  page?: number;
  limit?: number;
  sort?: string;
}) {
  return useQuery({
    queryKey: QUERY_KEYS.products.list(params),
    queryFn: () => productService.getProducts(params),
  });
}

/**
 * Get infinite products (for infinite scroll)
 */
export function useInfiniteProducts(params?: {
  category?: "kitchen" | "bedroom";
  filters?: ProductFilters;
  limit?: number;
  sort?: string;
}) {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.products.list(params),
    queryFn: ({ pageParam = 1 }) =>
      productService.getProducts({
        ...params,
        page: pageParam,
      }),
    getNextPageParam: (lastPage) => {
      const { page, hasMore } = lastPage.pagination;
      return hasMore ? page + 1 : undefined;
    },
    initialPageParam: 1,
  });
}

/**
 * Get kitchen products
 */
export function useKitchens(params?: {
  filters?: ProductFilters;
  page?: number;
  limit?: number;
  sort?: string;
}) {
  return useQuery({
    queryKey: QUERY_KEYS.products.kitchen(params),
    queryFn: () => productService.getKitchens(params),
  });
}

/**
 * Get infinite kitchen products
 */
export function useInfiniteKitchens(params?: {
  filters?: ProductFilters;
  limit?: number;
  sort?: string;
}) {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.products.kitchen(params),
    queryFn: ({ pageParam = 1 }) =>
      productService.getKitchens({
        ...params,
        page: pageParam,
      }),
    getNextPageParam: (lastPage) => {
      const { page, hasMore } = lastPage.pagination;
      return hasMore ? page + 1 : undefined;
    },
    initialPageParam: 1,
  });
}

/**
 * Get bedroom products
 */
export function useBedrooms(params?: {
  filters?: ProductFilters;
  page?: number;
  limit?: number;
  sort?: string;
}) {
  return useQuery({
    queryKey: QUERY_KEYS.products.bedroom(params),
    queryFn: () => productService.getBedrooms(params),
  });
}

/**
 * Get infinite bedroom products
 */
export function useInfiniteBedrooms(params?: {
  filters?: ProductFilters;
  limit?: number;
  sort?: string;
}) {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.products.bedroom(params),
    queryFn: ({ pageParam = 1 }) =>
      productService.getBedrooms({
        ...params,
        page: pageParam,
      }),
    getNextPageParam: (lastPage) => {
      const { page, hasMore } = lastPage.pagination;
      return hasMore ? page + 1 : undefined;
    },
    initialPageParam: 1,
  });
}

/**
 * Get product by ID
 */
export function useProduct(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.products.detail(id),
    queryFn: () => productService.getProductById(id),
    enabled: !!id,
  });
}

/**
 * Get featured products
 */
export function useFeaturedProducts(category?: "kitchen" | "bedroom") {
  return useQuery({
    queryKey: [...QUERY_KEYS.products.all, "featured", category],
    queryFn: () => productService.getFeaturedProducts(category),
  });
}

/**
 * Get popular products
 */
export function usePopularProducts(category?: "kitchen" | "bedroom") {
  return useQuery({
    queryKey: [...QUERY_KEYS.products.all, "popular", category],
    queryFn: () => productService.getPopularProducts(category),
  });
}

/**
 * Search products
 */
export function useSearchProducts(query: string, category?: "kitchen" | "bedroom") {
  return useQuery({
    queryKey: [...QUERY_KEYS.products.all, "search", query, category],
    queryFn: () => productService.searchProducts(query, category),
    enabled: query.length > 2,
  });
}

/**
 * Get related products
 */
export function useRelatedProducts(productId: string, limit?: number) {
  return useQuery({
    queryKey: [...QUERY_KEYS.products.all, "related", productId, limit],
    queryFn: () => productService.getRelatedProducts(productId, limit),
    enabled: !!productId,
  });
}

/**
 * Get products by colour
 */
export function useProductsByColour(colourId: string, category?: "kitchen" | "bedroom") {
  return useQuery({
    queryKey: [...QUERY_KEYS.products.all, "colour", colourId, category],
    queryFn: () => productService.getProductsByColour(colourId, category),
    enabled: !!colourId,
  });
}

/**
 * Get products by range
 */
export function useProductsByRange(rangeName: string, category?: "kitchen" | "bedroom") {
  return useQuery({
    queryKey: [...QUERY_KEYS.products.all, "range", rangeName, category],
    queryFn: () => productService.getProductsByRange(rangeName, category),
    enabled: !!rangeName,
  });
}

/**
 * Get products by style
 */
export function useProductsByStyle(style: string, category?: "kitchen" | "bedroom") {
  return useQuery({
    queryKey: [...QUERY_KEYS.products.all, "style", style, category],
    queryFn: () => productService.getProductsByStyle(style, category),
    enabled: !!style,
  });
}

/**
 * Get products by finish
 */
export function useProductsByFinish(finish: string, category?: "kitchen" | "bedroom") {
  return useQuery({
    queryKey: [...QUERY_KEYS.products.all, "finish", finish, category],
    queryFn: () => productService.getProductsByFinish(finish, category),
    enabled: !!finish,
  });
}