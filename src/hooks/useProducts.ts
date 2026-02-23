import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/lib/react-query";
import { productService } from "@/services/productService";
import type { ProductFilters } from "@/types";

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

export function useProduct(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.products.detail(id),
    queryFn: () => productService.getProductById(id),
    enabled: !!id,
  });
}

export function useFeaturedProducts(category?: "kitchen" | "bedroom") {
  return useQuery({
    queryKey: [...QUERY_KEYS.products.all, "featured", category],
    queryFn: () => productService.getFeaturedProducts(category),
  });
}

export function usePopularProducts(category?: "kitchen" | "bedroom") {
  return useQuery({
    queryKey: [...QUERY_KEYS.products.all, "popular", category],
    queryFn: () => productService.getPopularProducts(category),
  });
}

export function useSearchProducts(query: string, category?: "kitchen" | "bedroom") {
  return useQuery({
    queryKey: [...QUERY_KEYS.products.all, "search", query, category],
    queryFn: () => productService.searchProducts(query, category),
    enabled: query.length > 2,
  });
}

export function useRelatedProducts(productId: string, limit?: number) {
  return useQuery({
    queryKey: [...QUERY_KEYS.products.all, "related", productId, limit],
    queryFn: () => productService.getRelatedProducts(productId, limit),
    enabled: !!productId,
  });
}

export function useProductsByColour(colourId: string, category?: "kitchen" | "bedroom") {
  return useQuery({
    queryKey: [...QUERY_KEYS.products.all, "colour", colourId, category],
    queryFn: () => productService.getProductsByColour(colourId, category),
    enabled: !!colourId,
  });
}

export function useProductsByRange(rangeName: string, category?: "kitchen" | "bedroom") {
  return useQuery({
    queryKey: [...QUERY_KEYS.products.all, "range", rangeName, category],
    queryFn: () => productService.getProductsByRange(rangeName, category),
    enabled: !!rangeName,
  });
}

export function useProductsByStyle(style: string, category?: "kitchen" | "bedroom") {
  return useQuery({
    queryKey: [...QUERY_KEYS.products.all, "style", style, category],
    queryFn: () => productService.getProductsByStyle(style, category),
    enabled: !!style,
  });
}

export function useProductsByFinish(finish: string, category?: "kitchen" | "bedroom") {
  return useQuery({
    queryKey: [...QUERY_KEYS.products.all, "finish", finish, category],
    queryFn: () => productService.getProductsByFinish(finish, category),
    enabled: !!finish,
  });
}