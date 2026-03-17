import { api } from "@/lib/axios";
import { API_BASE_URL, API_ENDPOINTS } from "@/config/api";
import type { Product, ProductFilters, PaginatedResponse } from "@/types";
import axios from "axios";

type ApiEnvelope<T> = T | { data: T };

// Helper function for better error logging
const handleError = (functionName: string, error: unknown) => {
  if (axios.isAxiosError(error)) {
    console.error(`[${functionName}] API Error:`, {
      status: error.response?.status,
      statusText: error.response?.statusText,
      message: error.message,
      url: error.config?.url,
      method: error.config?.method,
      data: error.response?.data,
    });
  } else if (error instanceof Error) {
    console.error(`[${functionName}] Error:`, {
      message: error.message,
      stack: error.stack,
    });
  } else {
    console.error(`[${functionName}] Unknown Error:`, error);
  }
  throw error;
};

const extractData = <T>(payload: ApiEnvelope<T>): T => {
  if (payload && typeof payload === "object" && "data" in payload) {
    return payload.data as T;
  }
  return payload as T;
};

const toPaginatedProducts = (
  payload: any,
  requestedPage = 1,
  requestedLimit = 12
): PaginatedResponse<Product> => {
  if (payload?.data?.products && payload?.data?.pagination) {
    return {
      success: payload.success ?? true,
      data: payload.data.products,
      pagination: {
        page: payload.data.pagination.page,
        limit: payload.data.pagination.limit,
        total: payload.data.pagination.total,
        totalPages: payload.data.pagination.totalPages,
        hasMore: payload.data.pagination.hasNext ?? payload.data.pagination.hasMore ?? false,
      },
    };
  }

  const data = Array.isArray(payload?.data) ? payload.data : [];
  const total = payload?.total ?? data.length;
  const page = payload?.page ?? requestedPage;
  const limit = payload?.limit ?? requestedLimit;
  const totalPages = payload?.totalPages ?? Math.max(1, Math.ceil(total / limit));

  return {
    success: true,
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasMore: page < totalPages,
    },
  };
};

const getPublicApiOrigin = (): string => {
  const configured = (process.env.NEXT_PUBLIC_API_URL || API_BASE_URL).replace(/\/$/, "");
  if (configured.endsWith("/api/v1")) {
    return configured.slice(0, -7);
  }
  if (configured.endsWith("/api")) {
    return configured.slice(0, -4);
  }
  return configured;
};

const toAbsoluteImageUrl = (input?: string): string => {
  if (!input) return "/images/placeholder-product.jpg";
  if (input.startsWith("http://") || input.startsWith("https://")) return input;
  if (input.startsWith("/")) {
    return `${getPublicApiOrigin()}${input}`;
  }
  return input;
};

const mapFeaturedProduct = (row: any): Product => ({
  id: row?.id,
  slug: row?.slug || row?.id,
  title: row?.title || row?.name || "Untitled Product",
  description: row?.description || "",
  images: Array.isArray(row?.images) && row.images.length > 0
    ? row.images.map((img: string) => toAbsoluteImageUrl(img))
    : ["/images/placeholder-product.jpg"],
  price: typeof row?.price === "number" ? row.price : undefined,
  category: row?.category === "bedroom" ? "bedroom" : "kitchen",
  rangeName: row?.rangeName || row?.style || "",
  colours: Array.isArray(row?.colours) ? row.colours : [],
  style: row?.style || "",
  finish: row?.finish || "",
  createdAt: row?.createdAt || new Date().toISOString(),
  updatedAt: row?.updatedAt,
  featured: Boolean(row?.featured),
  popular: Boolean(row?.popular ?? row?.isPopular),
});

export const productService = {

  async getProducts(params?: {
    category?: "kitchen" | "bedroom";
    filters?: ProductFilters;
    page?: number;
    limit?: number;
    sort?: string;
  }): Promise<PaginatedResponse<Product>> {
    try {
      const { data } = await api.get(API_ENDPOINTS.products.base, { params });
      return toPaginatedProducts(data, params?.page, params?.limit);
    } catch (error) {
      return handleError("getProducts", error);
    }
  },

  async getKitchens(params?: {
    filters?: ProductFilters;
    page?: number;
    limit?: number;
    sort?: string;
  }): Promise<PaginatedResponse<Product>> {
    try {
      const { data } = await api.get(API_ENDPOINTS.products.byCategory("kitchen"), { params });
      return toPaginatedProducts(data, params?.page, params?.limit);
    } catch (error) {
      return handleError("getKitchens", error);
    }
  },

  async getBedrooms(params?: {
    filters?: ProductFilters;
    page?: number;
    limit?: number;
    sort?: string;
  }): Promise<PaginatedResponse<Product>> {
    try {
      const { data } = await api.get(API_ENDPOINTS.products.byCategory("bedroom"), { params });
      return toPaginatedProducts(data, params?.page, params?.limit);
    } catch (error) {
      return handleError("getBedrooms", error);
    }
  },

  async getProductById(id: string): Promise<Product> {
    if (!id) {
      const error = new Error("Product ID is required");
      console.error("[getProductById] Validation Error:", error.message);
      throw error;
    }
    try {
      const { data } = await api.get(API_ENDPOINTS.products.byId(id));
      return extractData<Product>(data);
    } catch (error) {
      return handleError("getProductById", error);
    }
  },

  async getFeaturedProducts(category?: "kitchen" | "bedroom"): Promise<Product[]> {
    try {
      if (typeof window !== "undefined") {
        const query = new URLSearchParams();
        if (category) query.set("category", category);

        const response = await fetch(`/api/featured-products?${query.toString()}`, {
          method: "GET",
          headers: { Accept: "application/json" },
        });

        if (!response.ok) {
          return [];
        }

        const payload = await response.json();
        const rows: any[] = Array.isArray(payload?.data) ? payload.data : [];
        return rows.map(mapFeaturedProduct);
      }

      const categoryPart = category ? `category=${encodeURIComponent(category)}&` : "";
      const { data } = await api.get(`${API_ENDPOINTS.products.base}?${categoryPart}featured&limit=8`);

      const rows: any[] = Array.isArray(data?.data?.products)
        ? data.data.products
        : Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data)
            ? data
            : [];

      if (rows.length > 0) {
        return rows.map(mapFeaturedProduct);
      }

      const { data: fallbackData } = await api.get(API_ENDPOINTS.products.base, {
        params: { category, limit: 50 },
      });

      const fallbackRows: any[] = Array.isArray(fallbackData?.data?.products)
        ? fallbackData.data.products
        : Array.isArray(fallbackData?.data)
          ? fallbackData.data
          : Array.isArray(fallbackData)
            ? fallbackData
            : [];

      return fallbackRows
        .filter((row) => Boolean(row?.featured))
        .slice(0, 8)
        .map(mapFeaturedProduct);
    } catch (error) {
      if (axios.isAxiosError(error) && !error.response) {
        console.warn("[getFeaturedProducts] Network unavailable, returning empty list");
        return [];
      }
      return [];
    }
  },

  async getPopularProducts(category?: "kitchen" | "bedroom"): Promise<Product[]> {
    try {
      const { data } = await api.get(API_ENDPOINTS.products.base, {
        params: { category, sort: "popular", limit: 8 },
      });
      return extractData<Product[]>(data);
    } catch (error) {
      return handleError("getPopularProducts", error);
    }
  },

  async searchProducts(query: string, category?: "kitchen" | "bedroom"): Promise<Product[]> {
    if (!query || query.trim().length === 0) {
      console.warn("[searchProducts] Search query is empty");
      return [];
    }
    try {
      const { data } = await api.get(API_ENDPOINTS.products.search, {
        params: { query, category },
      });
      return extractData<Product[]>(data);
    } catch (error) {
      return handleError("searchProducts", error);
    }
  },

  async getRelatedProducts(productId: string, limit: number = 4): Promise<Product[]> {
    if (!productId) {
      const error = new Error("Product ID is required");
      console.error("[getRelatedProducts] Validation Error:", error.message);
      throw error;
    }
    try {
      const { data } = await api.get(API_ENDPOINTS.products.related(productId), {
        params: { limit },
      });
      return extractData<Product[]>(data);
    } catch (error) {
      return handleError("getRelatedProducts", error);
    }
  },


  async getCategories() {
    try {
      const { data } = await api.get(API_ENDPOINTS.products.categories);
      return extractData(data);
    } catch (error) {
      return handleError("getCategories", error);
    }
  },

  async getColours() {
    try {
      const { data } = await api.get(API_ENDPOINTS.products.colours);
      return extractData(data);
    } catch (error) {
      return handleError("getColours", error);
    }
  },

  async getProductsByColour(colourId: string, category?: "kitchen" | "bedroom"): Promise<Product[]> {
    if (!colourId) {
      const error = new Error("Colour ID is required");
      console.error("[getProductsByColour] Validation Error:", error.message);
      throw error;
    }
    try {
      const { data } = await api.get(API_ENDPOINTS.products.base, {
        params: { category, colours: colourId },
      });
      return extractData<Product[]>(data);
    } catch (error) {
      return handleError("getProductsByColour", error);
    }
  },

  async getSizes() {
    try {
      const { data } = await api.get(API_ENDPOINTS.products.sizes);
      return extractData(data);
    } catch (error) {
      return handleError("getSizes", error);
    }
  },

  async getFinish() {
    try {
      const { data } = await api.get(API_ENDPOINTS.products.finish);
      return extractData(data);
    } catch (error) {
      return handleError("getFinish", error);
    }
  },

  async getProductsByFinish(finish: string, category?: "kitchen" | "bedroom"): Promise<Product[]> {
    if (!finish) {
      const error = new Error("Finish is required");
      console.error("[getProductsByFinish] Validation Error:", error.message);
      throw error;
    }
    try {
      const { data } = await api.get(API_ENDPOINTS.products.base, {
        params: { category, finish },
      });
      return extractData<Product[]>(data);
    } catch (error) {
      return handleError("getProductsByFinish", error);
    }
  },

  async getPackages() {
    try {
      const { data } = await api.get(API_ENDPOINTS.products.packages);
      return extractData(data);
    } catch (error) {
      return handleError("getPackages", error);
    }
  },

  async getProductsByRange(rangeName: string, category?: "kitchen" | "bedroom"): Promise<Product[]> {
    if (!rangeName) {
      const error = new Error("Range name is required");
      console.error("[getProductsByRange] Validation Error:", error.message);
      throw error;
    }
    try {
      const { data } = await api.get(API_ENDPOINTS.products.base, {
        params: { category, range: rangeName },
      });
      return extractData<Product[]>(data);
    } catch (error) {
      return handleError("getProductsByRange", error);
    }
  },

  async getProductsByStyle(style: string, category?: "kitchen" | "bedroom"): Promise<Product[]> {
    if (!style) {
      const error = new Error("Style is required");
      console.error("[getProductsByStyle] Validation Error:", error.message);
      throw error;
    }
    try {
      const { data } = await api.get(API_ENDPOINTS.products.base, {
        params: { category, style },
      });
      return extractData<Product[]>(data);
    } catch (error) {
      return handleError("getProductsByStyle", error);
    }
  },
};