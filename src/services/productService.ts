import { apiClient } from "@/lib/api";
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
      const response = await apiClient.products.getAll(params);
      return response;
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
      const response = await apiClient.products.getKitchens(params);
      return response;
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
      const response = await apiClient.products.getBedrooms(params);
      return response;
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
      const response = await apiClient.products.getById(id);
      return response.data;
    } catch (error) {
      return handleError("getProductById", error);
    }
  },

  async getFeaturedProducts(category?: "kitchen" | "bedroom"): Promise<Product[]> {
    try {
      const response = await apiClient.products.getAll({
        category,
        filters: { featured: true } as any,
        limit: 8,
      });
      return response.data;
    } catch (error) {
      return handleError("getFeaturedProducts", error);
    }
  },

  async getPopularProducts(category?: "kitchen" | "bedroom"): Promise<Product[]> {
    try {
      const response = await apiClient.products.getAll({
        category,
        sort: "popular",
        limit: 8,
      });
      return response.data;
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
      const response = await apiClient.products.getAll({
        category,
        filters: { search: query } as any,
      });
      return response.data;
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
      const product = await this.getProductById(productId);
      
      const response = await apiClient.products.getAll({
        category: product.category,
        filters: { style: product.style } as any,
        limit: limit + 1,
      });

      return response.data.filter((p) => p.id !== productId).slice(0, limit);
    } catch (error) {
      return handleError("getRelatedProducts", error);
    }
  },

  async getProductsByColour(colourId: string, category?: "kitchen" | "bedroom"): Promise<Product[]> {
    if (!colourId) {
      const error = new Error("Colour ID is required");
      console.error("[getProductsByColour] Validation Error:", error.message);
      throw error;
    }

    try {
      const response = await apiClient.products.getAll({
        category,
        filters: { colours: [colourId] } as any,
      });
      return response.data;
    } catch (error) {
      return handleError("getProductsByColour", error);
    }
  },

  async getProductsByRange(rangeName: string, category?: "kitchen" | "bedroom"): Promise<Product[]> {
    if (!rangeName) {
      const error = new Error("Range name is required");
      console.error("[getProductsByRange] Validation Error:", error.message);
      throw error;
    }

    try {
      const response = await apiClient.products.getAll({
        category,
        filters: { ranges: [rangeName] } as any,
      });
      return response.data;
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
      const response = await apiClient.products.getAll({
        category,
        filters: { styles: [style] } as any,
      });
      return response.data;
    } catch (error) {
      return handleError("getProductsByStyle", error);
    }
  },

  async getProductsByFinish(finish: string, category?: "kitchen" | "bedroom"): Promise<Product[]> {
    if (!finish) {
      const error = new Error("Finish is required");
      console.error("[getProductsByFinish] Validation Error:", error.message);
      throw error;
    }

    try {
      const response = await apiClient.products.getAll({
        category,
        filters: { finishes: [finish] } as any,
      });
      return response.data;
    } catch (error) {
      return handleError("getProductsByFinish", error);
    }
  },
};