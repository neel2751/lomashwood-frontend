import axios, { AxiosInstance } from "axios";
import type {
  Product,
  Showroom,
  Sale,
  Package,
  BlogPost,
  HeroSlide,
  Finance,
  MediaWall,
  Project,
  CustomerReview,
  Colour,
  Appointment,
  BrochureRequest,
  BusinessInquiry,
  ApiResponse,
  PaginatedResponse,
} from "@/types";

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// API Client
export const apiClient = {
  // Products
  products: {
    getAll: (params?: {
      category?: "kitchen" | "bedroom";
      filters?: any;
      page?: number;
      limit?: number;
      sort?: string;
    }): Promise<PaginatedResponse<Product>> =>
      api.get("/products", { params }).then((res) => res.data),

    getById: (id: string): Promise<ApiResponse<Product>> =>
      api.get(`/products/${id}`).then((res) => res.data),

    getKitchens: (params?: any): Promise<PaginatedResponse<Product>> =>
      api
        .get("/products", { params: { ...params, category: "kitchen" } })
        .then((res) => res.data),

    getBedrooms: (params?: any): Promise<PaginatedResponse<Product>> =>
      api
        .get("/products", { params: { ...params, category: "bedroom" } })
        .then((res) => res.data),
  },

  // Colours
  colours: {
    getAll: (): Promise<ApiResponse<Colour[]>> =>
      api.get("/colours").then((res) => res.data),
  },

  // Showrooms
  showrooms: {
    getAll: (params?: any): Promise<ApiResponse<Showroom[]>> =>
      api.get("/showrooms", { params }).then((res) => res.data),

    getById: (id: string): Promise<ApiResponse<Showroom>> =>
      api.get(`/showrooms/${id}`).then((res) => res.data),
  },

  // Sales/Offers
  sales: {
    getAll: (params?: any): Promise<ApiResponse<Sale[]>> =>
      api.get("/sales", { params }).then((res) => res.data),

    getById: (id: string): Promise<ApiResponse<Sale>> =>
      api.get(`/sales/${id}`).then((res) => res.data),
  },

  // Packages
  packages: {
    getAll: (): Promise<ApiResponse<Package[]>> =>
      api.get("/packages").then((res) => res.data),
  },

  // Blog
  blog: {
    getAll: (params?: {
      category?: string;
      page?: number;
      limit?: number;
    }): Promise<PaginatedResponse<BlogPost>> =>
      api.get("/blog", { params }).then((res) => res.data),

    getBySlug: (slug: string): Promise<ApiResponse<BlogPost>> =>
      api.get(`/blog/${slug}`).then((res) => res.data),
  },

  // Hero Slider
  heroSlider: {
    getAll: (): Promise<ApiResponse<HeroSlide[]>> =>
      api.get("/hero-slider").then((res) => res.data),
  },

  // Finance
  finance: {
    get: (): Promise<ApiResponse<Finance>> =>
      api.get("/finance").then((res) => res.data),
  },

  // Media Wall
  mediaWall: {
    get: (): Promise<ApiResponse<MediaWall>> =>
      api.get("/media-wall").then((res) => res.data),
  },

  // Projects
  projects: {
    getAll: (params?: any): Promise<ApiResponse<Project[]>> =>
      api.get("/projects", { params }).then((res) => res.data),
  },

  // Reviews
  reviews: {
    getAll: (): Promise<ApiResponse<CustomerReview[]>> =>
      api.get("/reviews").then((res) => res.data),
  },

  // Appointments
  appointments: {
    create: (data: Appointment): Promise<ApiResponse<Appointment>> =>
      api.post("/appointments", data).then((res) => res.data),

    getAvailability: (params: {
      date: string;
      type: string;
    }): Promise<ApiResponse<string[]>> =>
      api.get("/appointments/availability", { params }).then((res) => res.data),
  },

  // Brochure Request
  brochure: {
    request: (data: BrochureRequest): Promise<ApiResponse<any>> =>
      api.post("/brochure", data).then((res) => res.data),
  },

  // Business Inquiry
  business: {
    submit: (data: BusinessInquiry): Promise<ApiResponse<any>> =>
      api.post("/business", data).then((res) => res.data),
  },

  // Contact
  contact: {
    submit: (data: any): Promise<ApiResponse<any>> =>
      api.post("/contact", data).then((res) => res.data),
  },

  // Newsletter
  newsletter: {
    subscribe: (email: string): Promise<ApiResponse<any>> =>
      api.post("/newsletter", { email }).then((res) => res.data),
  },
};

export default api;