import type { DefaultOptions } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";

const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  },
};

export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});

export const QUERY_KEYS = {
  products: {
    all: ["products"] as const,
    lists: () => ["products", "list"] as const,
    list: (filters?: any) =>
      ["products", "list", filters] as const,
    details: () => ["products", "detail"] as const,
    detail: (id: string) => ["products", "detail", id] as const,
    featured: ["products", "featured"] as const,
    kitchen: (filters?: any) =>
      ["products", "kitchen", filters] as const,
    bedroom: (filters?: any) =>
      ["products", "bedroom", filters] as const,
  },

  colours: {
    all: ["colours"] as const,
  },

  showrooms: {
    all: ["showrooms"] as const,
    lists: () => [...QUERY_KEYS.showrooms.all, "list"] as const,
    list: (filters?: any) =>
      [...QUERY_KEYS.showrooms.lists(), filters] as const,
    details: () => [...QUERY_KEYS.showrooms.all, "detail"] as const,
    detail: (id: string) => [...QUERY_KEYS.showrooms.details(), id] as const,
  },

  sales: {
    all: ["sales"] as const,
    lists: () => [...QUERY_KEYS.sales.all, "list"] as const,
    list: (filters?: any) => [...QUERY_KEYS.sales.lists(), filters] as const,
  },

  packages: {
    all: ["packages"] as const,
    lists: () => [...QUERY_KEYS.packages.all, "list"] as const,
  },

  blog: {
    all: ["blog"] as const,
    lists: () => [...QUERY_KEYS.blog.all, "list"] as const,
    list: (filters?: any) => [...QUERY_KEYS.blog.lists(), filters] as const,
    details: () => [...QUERY_KEYS.blog.all, "detail"] as const,
    detail: (slug: string) => [...QUERY_KEYS.blog.details(), slug] as const,
  },

  heroSlider: {
    all: ["hero-slider"] as const,
  },

  finance: {
    all: ["finance"] as const,
  },

  mediaWall: {
    all: ["media-wall"] as const,
  },

  projects: {
    all: ["projects"] as const,
  },

  reviews: {
    all: ["reviews"] as const,
  },

  user: {
    current: ["user", "current"] as const,
    appointments: ["user", "appointments"] as const,
    orders: ["user", "orders"] as const,
    wishlist: ["user", "wishlist"] as const,
  },
} as const;