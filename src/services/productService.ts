import { api } from "@/lib/axios";
import { API_ENDPOINTS } from "@/config/api";
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
  throw error;
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
      const { data } = await api.get(API_ENDPOINTS.products.base, { params });
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
      const { data } = await api.get(API_ENDPOINTS.products.byCategory("kitchen"), { params });
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
      const { data } = await api.get(API_ENDPOINTS.products.byCategory("bedroom"), { params });
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
      const { data } = await api.get(API_ENDPOINTS.products.byId(id));
      return data;
    } catch (error) {
      return handleError("getProductById", error);
    }
  },

  async getFeaturedProducts(category?: "kitchen" | "bedroom"): Promise<Product[]> {
    try {
      const { data } = await api.get(API_ENDPOINTS.products.featured, {
        params: { category, limit: 8 },
      });
      return data;
    } catch (error) {
      return handleError("getFeaturedProducts", error);
    }
  },

  async getPopularProducts(category?: "kitchen" | "bedroom"): Promise<Product[]> {
    try {
      const { data } = await api.get(API_ENDPOINTS.products.base, {
        params: { category, sort: "popular", limit: 8 },
      });
      return data;
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
      return data;
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
      return data;
    } catch (error) {
      return handleError("getRelatedProducts", error);
    }
  },


  async getCategories() {
    try {
      const { data } = await api.get(API_ENDPOINTS.products.categories);
      return data;
    } catch (error) {
      return handleError("getCategories", error);
    }
  },

  async getColours() {
    try {
      const { data } = await api.get(API_ENDPOINTS.products.colours);
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
      const { data } = await api.get(API_ENDPOINTS.products.base, {
        params: { category, colours: colourId },
      });
      return data;
    } catch (error) {
      return handleError("getProductsByColour", error);
    }
  },

  async getSizes() {
    try {
      const { data } = await api.get(API_ENDPOINTS.products.sizes);
      return data;
    } catch (error) {
      return handleError("getSizes", error);
    }
  },

  async getFinish() {
    try {
      const { data } = await api.get(API_ENDPOINTS.products.finish);
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
      const { data } = await api.get(API_ENDPOINTS.products.base, {
        params: { category, finish },
      });
      return data;
    } catch (error) {
      return handleError("getProductsByFinish", error);
    }
  },

  async getPackages() {
    try {
      const { data } = await api.get(API_ENDPOINTS.products.packages);
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
      const { data } = await api.get(API_ENDPOINTS.products.base, {
        params: { category, range: rangeName },
      });
      return data;
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
      return data;
    } catch (error) {
      return handleError("getProductsByStyle", error);
    }
  },
};