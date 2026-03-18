import type { AxiosInstance } from "axios";
import axios from "axios";

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

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://lomashwood-backend.vercel.app/api/v1",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const apiClient = {
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

    getCategories: (): Promise<ApiResponse<any>> =>
      api.get("/products/categories").then((res) => res.data),

    getColours: (): Promise<ApiResponse<Colour[]>> =>
      api.get("/products/colours").then((res) => res.data),

    getSizes: (): Promise<ApiResponse<any>> =>
      api.get("/products/sizes").then((res) => res.data),

    getFinish: (): Promise<ApiResponse<any>> =>
      api.get("/products/finish").then((res) => res.data),
  },

  colours: {
    getAll: (): Promise<ApiResponse<Colour[]>> =>
      api.get("/products/colours").then((res) => res.data),
  },

  showrooms: {
    getAll: (params?: any): Promise<ApiResponse<Showroom[]>> =>
      api.get("/showrooms", { params }).then((res) => res.data),

    getById: (id: string): Promise<ApiResponse<Showroom>> =>
      api.get(`/showrooms/${id}`).then((res) => res.data),
  },

  sales: {
    getAll: (params?: any): Promise<ApiResponse<Sale[]>> =>
      api.get("/sales", { params }).then((res) => res.data),

    getById: (id: string): Promise<ApiResponse<Sale>> =>
      api.get(`/sales/${id}`).then((res) => res.data),
  },

  packages: {
    getAll: (): Promise<ApiResponse<Package[]>> =>
      api.get("/products/packages").then((res) => res.data),
  },

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

  heroSlider: {
    getAll: (): Promise<ApiResponse<HeroSlide[]>> =>
      api.get("/hero").then((res) => res.data),
  },

  finance: {
    get: (): Promise<ApiResponse<Finance>> =>
      api.get("/finance").then((res) => res.data),
  },

  mediaWall: {
    get: (): Promise<ApiResponse<MediaWall>> =>
      api.get("/media-wall").then((res) => res.data),
  },

  projects: {
    getAll: (params?: any): Promise<ApiResponse<Project[]>> =>
      api.get("/projects", { params }).then((res) => res.data),
  },

  reviews: {
    getAll: (): Promise<ApiResponse<CustomerReview[]>> =>
      api.get("/reviews").then((res) => res.data),
  },

  appointments: {
    create: (data: Appointment): Promise<ApiResponse<Appointment>> =>
      api.post("/appointments", data).then((res) => res.data),

    getSlots: (params: {
      date: string;
      appointmentType: string;
      showroomId?: string;
    }): Promise<ApiResponse<any>> =>
      api.get("/appointments/slots", { params }).then((res) => res.data),

    getSlotsCount: (params: {
      date: string;
      appointmentType: string;
    }): Promise<ApiResponse<any>> =>
      api.get("/appointments/slots/count", { params }).then((res) => res.data),

    getById: (id: string): Promise<ApiResponse<Appointment>> =>
      api.get(`/appointments/${id}`).then((res) => res.data),

    update: (id: string, data: Partial<Appointment>): Promise<ApiResponse<Appointment>> =>
      api.put(`/appointments/${id}`, data).then((res) => res.data),

    delete: (id: string): Promise<ApiResponse<any>> =>
      api.delete(`/appointments/${id}`).then((res) => res.data),
  },

  brochure: {
    request: (data: BrochureRequest): Promise<ApiResponse<any>> =>
      api.post("/brochure", data).then((res) => res.data),
  },

  business: {
    submit: (data: BusinessInquiry): Promise<ApiResponse<any>> =>
      api.post("/business", data).then((res) => res.data),
  },

  contact: {
    submit: (data: any): Promise<ApiResponse<any>> =>
      api.post("/contact", data).then((res) => res.data),
  },

  newsletter: {
    subscribe: (email: string): Promise<ApiResponse<any>> =>
      api.post("/newsletter", { email }).then((res) => res.data),
  },
};

export default api;