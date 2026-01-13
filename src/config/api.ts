// API Configuration for Lomash Wood Application

// Base API URL
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

// API Version
export const API_VERSION = "v1";

// Request Timeout (in milliseconds)
export const API_TIMEOUT = 30000; // 30 seconds

// Retry Configuration
export const API_RETRY_CONFIG = {
  retries: 3,
  retryDelay: 1000, // 1 second
  retryCondition: (error: { response?: { status?: number } }) => {
    return (
      !error.response ||
      error.response.status === 408 ||
      error.response.status === 429 ||
      (error.response.status !== undefined && error.response.status >= 500)
    );
  },
};

// Rate Limiting
export const RATE_LIMIT = {
  maxRequests: 100,
  perMilliseconds: 60000, // 1 minute
};

// Cache Configuration
export const CACHE_CONFIG = {
  enabled: process.env.NODE_ENV === "production",
  ttl: 300, // 5 minutes in seconds
  maxSize: 100, // Maximum number of cached items
};

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
    verify: "/auth/verify",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    changePassword: "/auth/change-password",
    me: "/auth/me",
  },

  // Users
  users: {
    base: "/users",
    profile: "/users/profile",
    update: "/users/profile/update",
    delete: "/users/profile/delete",
    addresses: "/users/addresses",
    preferences: "/users/preferences",
    orders: "/users/orders",
    wishlist: "/users/wishlist",
  },

  // Products
  products: {
    base: "/products",
    search: "/products/search",
    featured: "/products/featured",
    trending: "/products/trending",
    newArrivals: "/products/new-arrivals",
    bestSellers: "/products/best-sellers",
    byCategory: (categoryId: string) => `/products/category/${categoryId}`,
    byId: (id: string) => `/products/${id}`,
    related: (id: string) => `/products/${id}/related`,
    reviews: (id: string) => `/products/${id}/reviews`,
    addReview: (id: string) => `/products/${id}/reviews`,
  },

  // Categories
  categories: {
    base: "/categories",
    tree: "/categories/tree",
    byId: (id: string) => `/categories/${id}`,
    products: (id: string) => `/categories/${id}/products`,
  },

  // Cart
  cart: {
    base: "/cart",
    add: "/cart/add",
    update: "/cart/update",
    remove: "/cart/remove",
    clear: "/cart/clear",
    count: "/cart/count",
  },

  // Wishlist
  wishlist: {
    base: "/wishlist",
    add: "/wishlist/add",
    remove: "/wishlist/remove",
    clear: "/wishlist/clear",
    check: (productId: string) => `/wishlist/check/${productId}`,
  },

  // Orders
  orders: {
    base: "/orders",
    create: "/orders/create",
    byId: (id: string) => `/orders/${id}`,
    cancel: (id: string) => `/orders/${id}/cancel`,
    track: (id: string) => `/orders/${id}/track`,
    invoice: (id: string) => `/orders/${id}/invoice`,
  },

  // Checkout
  checkout: {
    base: "/checkout",
    validate: "/checkout/validate",
    createOrder: "/checkout/create-order",
    applyCoupon: "/checkout/apply-coupon",
    removeCoupon: "/checkout/remove-coupon",
    calculateShipping: "/checkout/calculate-shipping",
  },

  // Payment
  payment: {
    base: "/payment",
    createIntent: "/payment/create-intent",
    confirm: "/payment/confirm",
    webhook: "/payment/webhook",
    methods: "/payment/methods",
  },

  // Blog
  blog: {
    posts: "/blog/posts",
    featured: "/blog/posts/featured",
    popular: "/blog/posts/popular",
    recent: "/blog/posts/recent",
    byId: (id: string) => `/blog/posts/${id}`,
    bySlug: (slug: string) => `/blog/posts/slug/${slug}`,
    byCategory: (categoryId: string) => `/blog/posts/category/${categoryId}`,
    byTag: (tag: string) => `/blog/posts/tag/${tag}`,
    comments: (postId: string) => `/blog/posts/${postId}/comments`,
    addComment: (postId: string) => `/blog/posts/${postId}/comments`,
    like: (postId: string) => `/blog/posts/${postId}/like`,
    categories: "/blog/categories",
    tags: "/blog/tags",
    archive: "/blog/archive",
  },

  // Showrooms
  showrooms: {
    base: "/showrooms",
    byId: (id: string) => `/showrooms/${id}`,
    nearby: "/showrooms/nearby",
    appointments: "/showrooms/appointments",
    createAppointment: "/showrooms/appointments/create",
    cancelAppointment: (id: string) => `/showrooms/appointments/${id}/cancel`,
    reviews: (id: string) => `/showrooms/${id}/reviews`,
    addReview: (id: string) => `/showrooms/${id}/reviews`,
  },

  // Contact
  contact: {
    base: "/contact",
    submit: "/contact/submit",
    callback: "/contact/callback",
  },

  // Newsletter
  newsletter: {
    subscribe: "/newsletter/subscribe",
    unsubscribe: "/newsletter/unsubscribe",
    verify: "/newsletter/verify",
  },

  // Search
  search: {
    base: "/search",
    suggestions: "/search/suggestions",
    autocomplete: "/search/autocomplete",
    popular: "/search/popular",
  },

  // Reviews
  reviews: {
    base: "/reviews",
    byProduct: (productId: string) => `/reviews/product/${productId}`,
    byUser: (userId: string) => `/reviews/user/${userId}`,
    helpful: (reviewId: string) => `/reviews/${reviewId}/helpful`,
  },

  // Upload
  upload: {
    image: "/upload/image",
    multiple: "/upload/multiple",
    delete: (fileId: string) => `/upload/${fileId}`,
  },

  // Analytics
  analytics: {
    track: "/analytics/track",
    pageView: "/analytics/page-view",
    event: "/analytics/event",
  },

  // Settings
  settings: {
    base: "/settings",
    general: "/settings/general",
    shipping: "/settings/shipping",
    payment: "/settings/payment",
    tax: "/settings/tax",
  },

  // Admin (if applicable)
  admin: {
    dashboard: "/admin/dashboard",
    products: {
      base: "/admin/products",
      create: "/admin/products/create",
      update: (id: string) => `/admin/products/${id}/update`,
      delete: (id: string) => `/admin/products/${id}/delete`,
      bulk: "/admin/products/bulk",
    },
    orders: {
      base: "/admin/orders",
      update: (id: string) => `/admin/orders/${id}/update`,
      stats: "/admin/orders/stats",
    },
    users: {
      base: "/admin/users",
      byId: (id: string) => `/admin/users/${id}`,
      block: (id: string) => `/admin/users/${id}/block`,
      unblock: (id: string) => `/admin/users/${id}/unblock`,
    },
    analytics: "/admin/analytics",
  },
} as const;

// Request Headers
export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

// Authentication Header
export const getAuthHeader = (token: string) => ({
  Authorization: `Bearer ${token}`,
});

// API Error Messages
export const API_ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your internet connection.",
  TIMEOUT_ERROR: "Request timeout. Please try again.",
  UNAUTHORIZED: "Unauthorized access. Please login again.",
  FORBIDDEN: "You don't have permission to access this resource.",
  NOT_FOUND: "The requested resource was not found.",
  VALIDATION_ERROR: "Please check your input and try again.",
  SERVER_ERROR: "Something went wrong. Please try again later.",
  RATE_LIMIT_EXCEEDED: "Too many requests. Please try again later.",
  UNKNOWN_ERROR: "An unexpected error occurred.",
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const;

// Pagination Defaults
export const PAGINATION_DEFAULTS = {
  page: 1,
  limit: 20,
  maxLimit: 100,
} as const;

// Sort Options
export const SORT_OPTIONS = {
  products: {
    NEWEST: "newest",
    OLDEST: "oldest",
    PRICE_LOW: "price_low",
    PRICE_HIGH: "price_high",
    NAME_ASC: "name_asc",
    NAME_DESC: "name_desc",
    POPULAR: "popular",
    RATING_HIGH: "rating_high",
  },
  orders: {
    NEWEST: "newest",
    OLDEST: "oldest",
    AMOUNT_HIGH: "amount_high",
    AMOUNT_LOW: "amount_low",
  },
  blog: {
    LATEST: "latest",
    OLDEST: "oldest",
    MOST_VIEWED: "most_viewed",
    MOST_LIKED: "most_liked",
  },
} as const;

// Query Keys for React Query
export const QUERY_KEYS = {
  auth: {
    me: ["auth", "me"],
    session: ["auth", "session"],
  },
  users: {
    profile: ["users", "profile"],
    addresses: ["users", "addresses"],
    orders: ["users", "orders"],
    wishlist: ["users", "wishlist"],
  },
  products: {
    all: ["products"],
    list: (params: unknown) => ["products", "list", params],
    detail: (id: string) => ["products", "detail", id],
    featured: ["products", "featured"],
    trending: ["products", "trending"],
    newArrivals: ["products", "new-arrivals"],
    bestSellers: ["products", "best-sellers"],
    search: (query: string) => ["products", "search", query],
    category: (categoryId: string) => ["products", "category", categoryId],
    related: (id: string) => ["products", "related", id],
    reviews: (id: string) => ["products", "reviews", id],
  },
  categories: {
    all: ["categories"],
    tree: ["categories", "tree"],
    detail: (id: string) => ["categories", "detail", id],
  },
  cart: {
    items: ["cart", "items"],
    count: ["cart", "count"],
  },
  wishlist: {
    items: ["wishlist", "items"],
    check: (productId: string) => ["wishlist", "check", productId],
  },
  orders: {
    all: ["orders"],
    list: (params: unknown) => ["orders", "list", params],
    detail: (id: string) => ["orders", "detail", id],
  },
  blog: {
    posts: (params: unknown) => ["blog", "posts", params],
    detail: (id: string) => ["blog", "post", id],
    slug: (slug: string) => ["blog", "slug", slug],
    categories: ["blog", "categories"],
    tags: ["blog", "tags"],
    featured: ["blog", "featured"],
    popular: ["blog", "popular"],
    recent: ["blog", "recent"],
  },
  showrooms: {
    all: ["showrooms"],
    detail: (id: string) => ["showrooms", "detail", id],
    nearby: (coords: unknown) => ["showrooms", "nearby", coords],
    appointments: ["showrooms", "appointments"],
  },
  search: {
    query: (q: string) => ["search", q],
    suggestions: (q: string) => ["search", "suggestions", q],
  },
} as const;

// Stale Time Configuration (in milliseconds)
export const STALE_TIME = {
  INSTANT: 0, // Always refetch
  SHORT: 30000, // 30 seconds
  MEDIUM: 300000, // 5 minutes
  LONG: 600000, // 10 minutes
  VERY_LONG: 3600000, // 1 hour
  INFINITY: Infinity, // Never refetch automatically
} as const;

// Cache Time Configuration (in milliseconds)
export const CACHE_TIME = {
  SHORT: 300000, // 5 minutes
  MEDIUM: 600000, // 10 minutes
  LONG: 1800000, // 30 minutes
  VERY_LONG: 3600000, // 1 hour
  DAY: 86400000, // 24 hours
} as const;

// API Client Configuration
export const API_CLIENT_CONFIG = {
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: DEFAULT_HEADERS,
  withCredentials: true,
  validateStatus: (status: number) => status >= 200 && status < 300,
} as const;

// File Upload Configuration
export const UPLOAD_CONFIG = {
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedImageTypes: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
  allowedDocumentTypes: ["application/pdf"],
  maxFiles: 10,
} as const;

// Helper function to build URL with query params
export function buildUrl(
  endpoint: string,
  params?: Record<string, string | number | boolean | undefined>
): string {
  if (!params || Object.keys(params).length === 0) {
    return endpoint;
  }

  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `${endpoint}?${queryString}` : endpoint;
}

// Helper function to get full API URL
export function getFullUrl(endpoint: string): string {
  return `${API_BASE_URL}${endpoint}`;
}

// Helper function to handle API errors
export function getErrorMessage(error: unknown): string {
  if (typeof error === "string") return error;
  
  if (error && typeof error === "object" && "response" in error) {
    const response = (error as { response?: { data?: { message?: string; error?: string }; status?: number } }).response;
    
    if (response?.data?.message) {
      return response.data.message;
    }
    
    if (response?.data?.error) {
      return response.data.error;
    }
    
    if (response?.status !== undefined) {
      switch (response.status) {
        case HTTP_STATUS.UNAUTHORIZED:
          return API_ERROR_MESSAGES.UNAUTHORIZED;
        case HTTP_STATUS.FORBIDDEN:
          return API_ERROR_MESSAGES.FORBIDDEN;
        case HTTP_STATUS.NOT_FOUND:
          return API_ERROR_MESSAGES.NOT_FOUND;
        case HTTP_STATUS.TOO_MANY_REQUESTS:
          return API_ERROR_MESSAGES.RATE_LIMIT_EXCEEDED;
        case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        case HTTP_STATUS.BAD_GATEWAY:
        case HTTP_STATUS.SERVICE_UNAVAILABLE:
          return API_ERROR_MESSAGES.SERVER_ERROR;
        default:
          return API_ERROR_MESSAGES.UNKNOWN_ERROR;
      }
    }
  }
  
  if (error && typeof error === "object" && "message" in error) {
    return String((error as { message: string }).message);
  }
  
  return API_ERROR_MESSAGES.UNKNOWN_ERROR;
}

export default {
  API_BASE_URL,
  API_VERSION,
  API_ENDPOINTS,
  DEFAULT_HEADERS,
  getAuthHeader,
  API_ERROR_MESSAGES,
  HTTP_STATUS,
  PAGINATION_DEFAULTS,
  SORT_OPTIONS,
  QUERY_KEYS,
  STALE_TIME,
  CACHE_TIME,
  API_CLIENT_CONFIG,
  UPLOAD_CONFIG,
  buildUrl,
  getFullUrl,
  getErrorMessage,
};