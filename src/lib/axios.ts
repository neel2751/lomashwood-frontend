import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosError } from "axios";

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";
const API_TIMEOUT = 30000; // 30 seconds

// Create axios instance with default config
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add timestamp to prevent caching
    if (config.method === "get") {
      config.params = {
        ...config.params,
        _t: Date.now(),
      };
    }

    // Log request in development
    if (process.env.NODE_ENV === "development") {
      console.log("📤 API Request:", {
        method: config.method?.toUpperCase(),
        url: config.url,
        params: config.params,
        data: config.data,
      });
    }

    return config;
  },
  (error: AxiosError) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Log response in development
    if (process.env.NODE_ENV === "development") {
      console.log("✅ API Response:", {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }

    return response;
  },
  (error: AxiosError) => {
    // Handle different error types
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const message = (error.response.data as { message?: string })?.message || error.message;

      console.error("❌ API Error:", {
        status,
        message,
        url: error.config?.url,
      });

      // Handle specific status codes
      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          if (typeof window !== "undefined") {
            localStorage.removeItem("auth_token");
            // Optionally redirect to login page
            // window.location.href = '/login';
          }
          break;

        case 403:
          // Forbidden
          console.error("Access forbidden");
          break;

        case 404:
          // Not found
          console.error("Resource not found");
          break;

        case 422:
          // Validation error
          console.error("Validation error:", error.response.data);
          break;

        case 429:
          // Too many requests
          console.error("Rate limit exceeded");
          break;

        case 500:
        case 502:
        case 503:
        case 504:
          // Server errors
          console.error("Server error");
          break;

        default:
          console.error("Unexpected error");
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error("❌ Network Error:", {
        message: "No response received from server",
        url: error.config?.url,
      });
    } else {
      // Something happened in setting up the request
      console.error("❌ Request Setup Error:", error.message);
    }

    return Promise.reject(error);
  }
);

// Helper functions for common HTTP methods
export const api = {
  get: <T = any>(url: string, config?: AxiosRequestConfig) => 
    axiosInstance.get<T>(url, config),

  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    axiosInstance.post<T>(url, data, config),

  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    axiosInstance.put<T>(url, data, config),

  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    axiosInstance.patch<T>(url, data, config),

  delete: <T = any>(url: string, config?: AxiosRequestConfig) =>
    axiosInstance.delete<T>(url, config),
};

// Export configured axios instance
export default axiosInstance;

// Type definitions for common API responses
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status?: number;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
}

// Utility function to handle API errors
export const handleApiError = (error: AxiosError<ApiError>): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  if (error.response?.status === 401) {
    return "Unauthorized. Please log in again.";
  }

  if (error.response?.status === 403) {
    return "You don't have permission to perform this action.";
  }

  if (error.response?.status === 404) {
    return "The requested resource was not found.";
  }

  if (error.response?.status === 422) {
    return "Please check your input and try again.";
  }

  if (error.response?.status === 429) {
    return "Too many requests. Please try again later.";
  }

  if (error.response?.status && error.response.status >= 500) {
    return "Server error. Please try again later.";
  }

  if (error.request) {
    return "Network error. Please check your internet connection.";
  }

  return "An unexpected error occurred. Please try again.";
};

// Utility function to extract validation errors
export const getValidationErrors = (error: AxiosError<ApiError>): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (error.response?.data?.errors) {
    Object.entries(error.response.data.errors).forEach(([field, messages]) => {
      errors[field] = Array.isArray(messages) ? messages[0] : messages;
    });
  }

  return errors;
};

// Utility function to check if error is a network error
export const isNetworkError = (error: AxiosError): boolean => {
  return !error.response && !!error.request;
};

// Utility function to check if error is a server error
export const isServerError = (error: AxiosError): boolean => {
  return !!error.response && error.response.status >= 500;
};