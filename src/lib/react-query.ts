import { QueryClient, DefaultOptions } from "@tanstack/react-query";

const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  },
};

export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});

// Query keys for better organization
export const QUERY_KEYS = {
  // Products
  products: {
    all: ["products"] as const,
    lists: () => [...QUERY_KEYS.products.all, "list"] as const,
    list: (filters?: any) =>
      [...QUERY_KEYS.products.lists(), filters] as const,
    details: () => [...QUERY_KEYS.products.all, "detail"] as const,
    detail: (id: string) => [...QUERY_KEYS.products.details(), id] as const,
    kitchen: (filters?: any) =>
      [...QUERY_KEYS.products.all, "kitchen", filters] as const,
    bedroom: (filters?: any) =>
      [...QUERY_KEYS.products.all, "bedroom", filters] as const,
  },

  // Colours
  colours: {
    all: ["colours"] as const,
  },

  // Showrooms
  showrooms: {
    all: ["showrooms"] as const,
    lists: () => [...QUERY_KEYS.showrooms.all, "list"] as const,
    list: (filters?: any) =>
      [...QUERY_KEYS.showrooms.lists(), filters] as const,
    details: () => [...QUERY_KEYS.showrooms.all, "detail"] as const,
    detail: (id: string) => [...QUERY_KEYS.showrooms.details(), id] as const,
  },

  // Sales/Offers
  sales: {
    all: ["sales"] as const,
    lists: () => [...QUERY_KEYS.sales.all, "list"] as const,
    list: (filters?: any) => [...QUERY_KEYS.sales.lists(), filters] as const,
  },

  // Packages
  packages: {
    all: ["packages"] as const,
    lists: () => [...QUERY_KEYS.packages.all, "list"] as const,
  },

  // Blog
  blog: {
    all: ["blog"] as const,
    lists: () => [...QUERY_KEYS.blog.all, "list"] as const,
    list: (filters?: any) => [...QUERY_KEYS.blog.lists(), filters] as const,
    details: () => [...QUERY_KEYS.blog.all, "detail"] as const,
    detail: (slug: string) => [...QUERY_KEYS.blog.details(), slug] as const,
  },

  // Hero Slider
  heroSlider: {
    all: ["hero-slider"] as const,
  },

  // Finance
  finance: {
    all: ["finance"] as const,
  },

  // Media Wall
  mediaWall: {
    all: ["media-wall"] as const,
  },

  // Projects
  projects: {
    all: ["projects"] as const,
  },

  // Reviews
  reviews: {
    all: ["reviews"] as const,
  },

  // User/Account
  user: {
    current: ["user", "current"] as const,
    appointments: ["user", "appointments"] as const,
    orders: ["user", "orders"] as const,
    wishlist: ["user", "wishlist"] as const,
  },
} as const;