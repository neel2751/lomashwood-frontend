import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosError } from "axios";
import { API_BASE_URL, API_TIMEOUT } from "@/config/api";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.method === "get") {
      config.params = {
        ...config.params,
        _t: Date.now(),
      };
    }

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

axiosInstance.interceptors.response.use(
  (response) => {
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
    if (error.response) {
      const status = error.response.status;
      const errorData = error.response.data as Record<string, any> | string;
      let message = error.message;
      
      if (typeof errorData === 'object' && errorData !== null) {
        message = errorData.message || errorData.msg || JSON.stringify(errorData) || error.message;
      } else if (typeof errorData === 'string') {
        message = errorData;
      }

      console.error("❌ API Error:", {
        status,
        message,
        data: errorData,
        url: error.config?.url,
      });

      // Create a custom error that preserves the message
      const customError = new Error(message);
      customError.name = `APIError_${status}`;
      
      switch (status) {
        case 401:
          if (typeof window !== "undefined") {
            localStorage.removeItem("auth_token");
          }
          break;
        case 403:
          console.error("Access forbidden");
          break;
        case 404:
          console.error("Resource not found");
          break;
        case 422:
          const validationData = error.response.data as Record<string, any> | null;
          const validationErrors = validationData?.errors || validationData?.message || "Validation failed";
          console.error("Validation error:", validationErrors);
          break;
        case 500:
        case 502:
        case 503:
        case 504:
          console.error("Server error");
          break;
        default:
          console.error("Unexpected error");
      }

      return Promise.reject(customError);
    } else if (error.request) {
      console.error("❌ Network Error:", {
        message: "No response received from server",
        url: error.config?.url,
      });
      const networkError = new Error("No response received from server. Please check your connection.");
      return Promise.reject(networkError);
    } else {
      console.error("❌ Request Setup Error:", error.message);
      const setupError = new Error(error.message || "Request setup failed");
      return Promise.reject(setupError);
    }
  }
);

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

export default axiosInstance;

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

export const handleApiError = (error: AxiosError<ApiError>): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.response?.status === 401) return "Unauthorized. Please log in again.";
  if (error.response?.status === 403) return "You don't have permission to perform this action.";
  if (error.response?.status === 404) return "The requested resource was not found.";
  if (error.response?.status === 422) return "Please check your input and try again.";
  if (error.response?.status === 429) return "Too many requests. Please try again later.";
  if (error.response?.status && error.response.status >= 500) return "Server error. Please try again later.";
  if (error.request) return "Network error. Please check your internet connection.";
  return "An unexpected error occurred. Please try again.";
};

export const getValidationErrors = (error: AxiosError<ApiError>): Record<string, string> => {
  const errors: Record<string, string> = {};
  if (error.response?.data?.errors) {
    Object.entries(error.response.data.errors).forEach(([field, messages]) => {
      errors[field] = Array.isArray(messages) ? messages[0] : messages;
    });
  }
  return errors;
};

export const isNetworkError = (error: AxiosError): boolean => {
  return !error.response && !!error.request;
};

export const isServerError = (error: AxiosError): boolean => {
  return !!error.response && error.response.status >= 500;
};