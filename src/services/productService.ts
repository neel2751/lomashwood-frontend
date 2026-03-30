import { api } from "@/lib/axios";
import type { Product, ProductFilters, PaginatedResponse } from "@/types";
import axios from "axios";

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

  if (error instanceof Error) {
    throw error;
  }

  const safeMessage =
    typeof error === "string"
      ? error
      : `Unexpected error in ${functionName}`;

  throw new Error(safeMessage);
};

const extractProducts = (payload: unknown): Product[] => {
  if (Array.isArray(payload)) return payload as Product[];

  if (payload && typeof payload === "object") {
    const candidate = payload as {
      products?: unknown;
      data?: unknown;
    };

    if (Array.isArray(candidate.products)) {
      return candidate.products as Product[];
    }

    if (Array.isArray(candidate.data)) {
      return candidate.data as Product[];
    }

    if (candidate.data && typeof candidate.data === "object") {
      const nestedData = candidate.data as { products?: unknown };
      if (Array.isArray(nestedData.products)) {
        return nestedData.products as Product[];
      }
    }
  }

  return [];
};

const normalizeProductFlags = (product: Product): Product => {
  const productWithFlags = product as Product & {
    isFeatured?: boolean;
    isPopular?: boolean;
  };

  return {
    ...productWithFlags,
    featured: productWithFlags.featured ?? productWithFlags.isFeatured,
    popular: productWithFlags.popular ?? productWithFlags.isPopular,
  };
};

export const productService = {

  async getProducts(params?: {
    category?: "kitchen" | "bedroom";
    filters?: ProductFilters;
    page?: number;
    limit?: number;
    sort?: string;
  }): Promise<PaginatedResponse<Product>> {
    try {
      const { data } = await api.get('/products', { params });
      return data;
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
      const { data } = await api.get('/products', { params: { ...params, category: "kitchen" } });
      return data;
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
      const { data } = await api.get('/products', { params: { ...params, category: "bedroom" } });
      return data;
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
      const { data } = await api.get(`/products/${id}`);
      return data;
    } catch (error) {
      return handleError("getProductById", error);
    }
  },

  async getFeaturedProducts(category?: "kitchen" | "bedroom", featured: boolean = true): Promise<Product[]> {
    try {
      const proxyUrl = `/api/featured-products?category=${encodeURIComponent(category ?? "kitchen")}`;
      const proxyRes = await fetch(proxyUrl, { method: "GET", cache: "no-store" });

      if (proxyRes.ok) {
        const proxyPayload = await proxyRes.json();
        const proxyRows = extractProducts(proxyPayload).map(normalizeProductFlags);
        if (proxyRows.length > 0) {
          return proxyRows;
        }
      }

      const configuredBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
      const publicBase = "https://lomashwood-backend.vercel.app/api/v1";

      const directBaseCandidates = [
        configuredBase?.endsWith("/api/v1")
          ? configuredBase
          : configuredBase?.endsWith("/api")
            ? `${configuredBase}/v1`
            : configuredBase
              ? `${configuredBase}/api/v1`
              : undefined,
        publicBase,
      ].filter((value): value is string => Boolean(value));

      for (const base of Array.from(new Set(directBaseCandidates))) {
        const directUrl = `${base}/products?category=${encodeURIComponent(category ?? "kitchen")}&featured=${String(featured)}&limit=8`;
        const directRes = await fetch(directUrl, { method: "GET", cache: "no-store" });
        if (!directRes.ok) {
          continue;
        }

        const directPayload = await directRes.json();
        const directRows = extractProducts(directPayload).map(normalizeProductFlags);
        if (directRows.length > 0) {
          return directRows;
        }
      }

      return [];
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("[getFeaturedProducts] API Error:", {
          status: error.response?.status,
          message: error.message,
          url: error.config?.url,
        });
      } else if (error instanceof Error) {
        console.error("[getFeaturedProducts] Error:", {
          message: error.message,
        });
      } else {
        console.error("[getFeaturedProducts] Unknown Error:", error);
      }

      return [];
    }
  },

  async getPopularProducts(category?: "kitchen" | "bedroom"): Promise<Product[]> {
    try {
      const { data } = await api.get('/products', {
        params: { category, sort: "popular", limit: 8 },
      });
      return data.products || [];
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
      const { data } = await api.get('/products', {
        params: { query, category },
      });
      return data.products || [];
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
      const { data } = await api.get(`/products/${productId}/related`, {
        params: { limit },
      });
      return data.products || [];
    } catch (error) {
      return handleError("getRelatedProducts", error);
    }
  },


  async getCategories() {
    try {
      const { data } = await api.get('/products/categories');
      return data;
    } catch (error) {
      return handleError("getCategories", error);
    }
  },

  async getColours() {
    try {
      const { data } = await api.get('/products/colours');
      return data;
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
      const { data } = await api.get('/products', {
        params: { category, colours: colourId },
      });
      return data.products || [];
    } catch (error) {
      return handleError("getProductsByColour", error);
    }
  },

  async getSizes() {
    try {
      const { data } = await api.get('/products/sizes');
      return data;
    } catch (error) {
      return handleError("getSizes", error);
    }
  },

  async getFinish() {
    try {
      const { data } = await api.get('/products/finish');
      return data;
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
      const { data } = await api.get('/products', {
        params: { category, finish },
      });
      return data.products || [];
    } catch (error) {
      return handleError("getProductsByFinish", error);
    }
  },

  async getPackages() {
    try {
      const { data } = await api.get('/products/packages');
      return data;
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
      const { data } = await api.get('/products', {
        params: { category, range: rangeName },
      });
      return data.products || [];
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
      const { data } = await api.get('/products', {
        params: { category, style },
      });
      return data.products || [];
    } catch (error) {
      return handleError("getProductsByStyle", error);
    }
  },
};