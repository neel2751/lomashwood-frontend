import api from '@/lib/api';
import type { Product } from '@/types';

export interface SearchResult {
  id: string;
  type: 'product' | 'blog' | 'project' | 'showroom';
  title: string;
  description: string;
  url: string;
  image?: string;
  relevance: number;
}

export interface SearchResults {
  data: SearchResult[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    query: string;
  };
}

export interface SearchSuggestions {
  products: string[];
  blogs: string[];
  categories: string[];
  tags: string[];
}

export interface SearchFilters {
  contentTypes?: ('products' | 'blogs' | 'projects' | 'showrooms')[];
  category?: string;
  tags?: string[];
  dateFrom?: string;
  dateTo?: string;
  priceRange?: {
    min?: number;
    max?: number;
  };
  sortBy?: string;
  page?: number;
  limit?: number;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  category: string;
  tags: string[];
  featuredImage?: string;
  publishedAt: string;
  updatedAt: string;
  readTime: number;
  views: number;
  likes: number;
}

export interface SearchHistory {
  id: string;
  query: string;
  filters?: Record<string, any>;
  resultsCount: number;
  createdAt: string;
}

export const searchService = {

  globalSearch: async (
    query: string,
    filters?: SearchFilters
  ): Promise<SearchResults> => {
    const response = await api.get<SearchResults>('/api/search', {
      params: { q: query, ...filters },
    });
    return response.data;
  },

  searchProducts: async (
    query: string,
    filters?: {
      category?: 'kitchen' | 'bedroom';
      style?: string[];
      color?: string[];
      finish?: string[];
      minPrice?: number;
      maxPrice?: number;
      sortBy?: 'relevance' | 'price_asc' | 'price_desc' | 'newest' | 'popular';
      page?: number;
      limit?: number;
    }
  ): Promise<{
    data: Product[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }> => {
    const response = await api.get('/api/search/products', {
      params: { q: query, ...filters },
    });
    return response.data;
  },

  searchBlogs: async (
    query: string,
    filters?: {
      category?: string;
      tag?: string;
      page?: number;
      limit?: number;
    }
  ): Promise<{
    data: Blog[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }> => {
    const response = await api.get('/api/search/blog', {
      params: { q: query, ...filters },
    });
    return response.data;
  },

  getSuggestions: async (query: string): Promise<SearchSuggestions> => {
    const response = await api.get<SearchSuggestions>('/api/search/suggestions', {
      params: { q: query },
    });
    return response.data;
  },

  getPopularSearches: async (limit: number = 10): Promise<
    Array<{
      term: string;
      count: number;
    }>
  > => {
    const response = await api.get('/api/search/popular', {
      params: { limit },
    });
    return response.data.data;
  },

  getTrendingSearches: async (limit: number = 10): Promise<
    Array<{
      term: string;
      trend: 'up' | 'down' | 'stable';
      count: number;
    }>
  > => {
    const response = await api.get('/api/search/trending', {
      params: { limit },
    });
    return response.data.data;
  },

  getSearchHistory: async (params?: {
    page?: number;
    limit?: number;
  }): Promise<{
    data: SearchHistory[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }> => {
    const response = await api.get('/api/search/history', { params });
    return response.data;
  },

  saveSearchHistory: async (data: {
    query: string;
    filters?: Record<string, any>;
    resultsCount: number;
  }): Promise<{ success: boolean }> => {
    const response = await api.post<{ success: boolean }>(
      '/api/search/history',
      data
    );
    return response.data;
  },

  clearSearchHistory: async (): Promise<{
    success: boolean;
    message: string;
  }> => {
    const response = await api.delete<{ success: boolean; message: string }>(
      '/api/search/history'
    );
    return response.data;
  },

  deleteSearchHistory: async (searchId: string): Promise<{
    success: boolean;
  }> => {
    const response = await api.delete<{ success: boolean }>(
      `/api/search/history/${searchId}`
    );
    return response.data;
  },

  getRecentSearches: async (limit: number = 5): Promise<string[]> => {
    const response = await api.get<{ data: string[] }>('/api/search/recent', {
      params: { limit },
    });
    return response.data.data;
  },

  advancedSearch: async (filters: {
    query?: string;
    contentTypes?: ('products' | 'blogs' | 'projects' | 'showrooms')[];
    category?: string;
    tags?: string[];
    dateFrom?: string;
    dateTo?: string;
    priceRange?: {
      min?: number;
      max?: number;
    };
    sortBy?:
      | 'relevance'
      | 'date_desc'
      | 'date_asc'
      | 'price_asc'
      | 'price_desc'
      | 'alphabetical';
    page?: number;
    limit?: number;
  }): Promise<SearchResults> => {
    const response = await api.post<SearchResults>(
      '/api/search/advanced',
      filters
    );
    return response.data;
  },

  searchByImage: async (image: File): Promise<{
    data: Product[];
    confidence: number;
    meta: {
      total: number;
    };
  }> => {
    const formData = new FormData();
    formData.append('image', image);

    const response = await api.post('/api/search/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  searchSimilarProducts: async (
    productId: string,
    limit: number = 6
  ): Promise<Product[]> => {
    const response = await api.get<{ data: Product[] }>(
      `/api/search/similar/${productId}`,
      {
        params: { limit },
      }
    );
    return response.data.data;
  },

  searchByColor: async (
    colorHex: string,
    category?: 'kitchen' | 'bedroom'
  ): Promise<{
    data: Product[];
    meta: {
      total: number;
    };
  }> => {
    const response = await api.get('/api/search/color', {
      params: { color: colorHex, category },
    });
    return response.data;
  },

  searchShowrooms: async (filters: {
    query?: string;
    location?: string;
    latitude?: number;
    longitude?: number;
    radius?: number;
    services?: string[];
  }): Promise<{
    data: Array<{
      id: string;
      name: string;
      address: string;
      city: string;
      distance?: number;
      services: string[];
    }>;
    meta: {
      total: number;
    };
  }> => {
    const response = await api.get('/api/search/showrooms', {
      params: filters,
    });
    return response.data;
  },

  getSearchFilters: async (
    contentType: 'products' | 'blogs'
  ): Promise<{
    categories: Array<{ value: string; label: string; count: number }>;
    styles?: Array<{ value: string; label: string; count: number }>;
    colors?: Array<{ value: string; label: string; count: number }>;
    finishes?: Array<{ value: string; label: string; count: number }>;
    tags?: Array<{ value: string; label: string; count: number }>;
    priceRange?: {
      min: number;
      max: number;
    };
  }> => {
    const response = await api.get(`/api/search/filters/${contentType}`);
    return response.data.data;
  },

  trackSearch: async (data: {
    query: string;
    resultsCount: number;
    filters?: Record<string, any>;
    clickedResults?: string[];
  }): Promise<{ success: boolean }> => {
    const response = await api.post<{ success: boolean }>(
      '/api/search/track',
      data
    );
    return response.data;
  },

  getSearchAnalytics: async (params?: {
    startDate?: string;
    endDate?: string;
  }): Promise<{
    totalSearches: number;
    topSearches: Array<{ term: string; count: number }>;
    zeroResultSearches: Array<{ term: string; count: number }>;
    avgResultsPerSearch: number;
    clickThroughRate: number;
  }> => {
    const response = await api.get('/api/search/analytics', { params });
    return response.data;
  },

  getDidYouMean: async (query: string): Promise<{
    suggestion: string | null;
    confidence: number;
  }> => {
    const response = await api.get('/api/search/did-you-mean', {
      params: { q: query },
    });
    return response.data;
  },

  searchByVoice: async (audioBlob: Blob): Promise<{
    transcript: string;
    confidence: number;
    results?: SearchResults;
  }> => {
    const formData = new FormData();
    formData.append('audio', audioBlob);

    const response = await api.post('/api/search/voice', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getSavedSearches: async (): Promise<
    Array<{
      id: string;
      name: string;
      query: string;
      filters: Record<string, any>;
      notificationsEnabled: boolean;
      createdAt: string;
    }>
  > => {
    const response = await api.get('/api/search/saved');
    return response.data.data;
  },

  saveSearch: async (data: {
    name: string;
    query: string;
    filters?: Record<string, any>;
    notificationsEnabled?: boolean;
  }): Promise<{
    id: string;
    message: string;
  }> => {
    const response = await api.post<{ id: string; message: string }>(
      '/api/search/saved',
      data
    );
    return response.data;
  },

  updateSavedSearch: async (
    searchId: string,
    data: {
      name?: string;
      query?: string;
      filters?: Record<string, any>;
      notificationsEnabled?: boolean;
    }
  ): Promise<{ success: boolean; message: string }> => {
    const response = await api.put<{ success: boolean; message: string }>(
      `/api/search/saved/${searchId}`,
      data
    );
    return response.data;
  },

  deleteSavedSearch: async (searchId: string): Promise<{
    success: boolean;
    message: string;
  }> => {
    const response = await api.delete<{ success: boolean; message: string }>(
      `/api/search/saved/${searchId}`
    );
    return response.data;
  },

  executeSavedSearch: async (searchId: string): Promise<SearchResults> => {
    const response = await api.get<SearchResults>(
      `/api/search/saved/${searchId}/execute`
    );
    return response.data;
  },
};