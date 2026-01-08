import { apiClient } from "@/lib/api";
import type { Product, ProductFilters, PaginatedResponse } from "@/types";

export const productService = {
  /**
   * Get all products with optional filters
   */
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
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  /**
   * Get kitchen products
   */
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
      console.error("Error fetching kitchens:", error);
      throw error;
    }
  },

  /**
   * Get bedroom products
   */
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
      console.error("Error fetching bedrooms:", error);
      throw error;
    }
  },

  /**
   * Get product by ID
   */
  async getProductById(id: string): Promise<Product> {
    try {
      const response = await apiClient.products.getById(id);
      return response.data;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  },

  /**
   * Get featured products
   */
  async getFeaturedProducts(category?: "kitchen" | "bedroom"): Promise<Product[]> {
    try {
      const response = await apiClient.products.getAll({
        category,
        filters: { featured: true } as any,
        limit: 8,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching featured products:", error);
      throw error;
    }
  },

  /**
   * Get popular products
   */
  async getPopularProducts(category?: "kitchen" | "bedroom"): Promise<Product[]> {
    try {
      const response = await apiClient.products.getAll({
        category,
        sort: "popular",
        limit: 8,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching popular products:", error);
      throw error;
    }
  },

  /**
   * Search products
   */
  async searchProducts(query: string, category?: "kitchen" | "bedroom"): Promise<Product[]> {
    try {
      const response = await apiClient.products.getAll({
        category,
        filters: { search: query } as any,
      });
      return response.data;
    } catch (error) {
      console.error("Error searching products:", error);
      throw error;
    }
  },

  /**
   * Get related products
   */
  async getRelatedProducts(productId: string, limit: number = 4): Promise<Product[]> {
    try {
      // First get the product to know its category and style
      const product = await this.getProductById(productId);
      
      const response = await apiClient.products.getAll({
        category: product.category,
        filters: { style: product.style } as any,
        limit: limit + 1,
      });
      
      // Filter out the current product
      return response.data.filter((p) => p.id !== productId).slice(0, limit);
    } catch (error) {
      console.error("Error fetching related products:", error);
      throw error;
    }
  },

  /**
   * Get products by colour
   */
  async getProductsByColour(colourId: string, category?: "kitchen" | "bedroom"): Promise<Product[]> {
    try {
      const response = await apiClient.products.getAll({
        category,
        filters: { colours: [colourId] } as any,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching products by colour:", error);
      throw error;
    }
  },

  /**
   * Get products by range
   */
  async getProductsByRange(rangeName: string, category?: "kitchen" | "bedroom"): Promise<Product[]> {
    try {
      const response = await apiClient.products.getAll({
        category,
        filters: { ranges: [rangeName] } as any,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching products by range:", error);
      throw error;
    }
  },

  /**
   * Get products by style
   */
  async getProductsByStyle(style: string, category?: "kitchen" | "bedroom"): Promise<Product[]> {
    try {
      const response = await apiClient.products.getAll({
        category,
        filters: { styles: [style] } as any,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching products by style:", error);
      throw error;
    }
  },

  /**
   * Get products by finish
   */
  async getProductsByFinish(finish: string, category?: "kitchen" | "bedroom"): Promise<Product[]> {
    try {
      const response = await apiClient.products.getAll({
        category,
        filters: { finishes: [finish] } as any,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching products by finish:", error);
      throw error;
    }
  },
};