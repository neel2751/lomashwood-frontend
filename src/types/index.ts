// Media Wall Types
export interface MediaWall {
  id: string;
  title: string;
  description: string;
  images: string[];
  backgroundImage: string;
}

// Home Page Slider Types
export interface HeroSlide {
  id: string;
  image?: string;
  video?: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  order?: number;
}

// Project Types
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'kitchen' | 'bedroom' | 'media-wall';
  location?: string;
  completedAt?: string;
}

// Review Types
export interface CustomerReview {
  id: string;
  name: string;
  description: string;
  rating: number;
  media?: string;
  mediaType?: 'image' | 'video';
  location?: string;
  date?: string;
  verified?: boolean;
}

// Process Step Types
export interface ProcessStep {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: string;
}

// Filter Types
export interface ProductFilters {
  colours?: string[];
  styles?: string[];
  finishes?: string[];
  ranges?: string[];
  priceRange?: [number, number];
  category?: 'kitchen' | 'bedroom';
  search?: string;
}

// Brochure Request Types
export interface BrochureRequest {
  name: string;
  phone: string;
  email: string;
  postcode: string;
  address: string;
}

// Business Inquiry Types
export interface BusinessInquiry {
  name: string;
  email: string;
  phone: string;
  businessType: string;
  message?: string;
}

// Contact Form Types
export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

// Newsletter Types
export interface Newsletter {
  email: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

// Error Types
export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

// Product Types
export interface Product {
  id: string;
  title: string;
  description: string;
  images: string[];
  price?: number;
  category: 'kitchen' | 'bedroom';
  rangeName: string;
  colours: Colour[];
  sizes?: ProductSize[];
  style?: string;
  finish?: string;
  createdAt: string;
  updatedAt?: string;
  featured?: boolean;
  popular?: boolean;
}

export interface ProductSize {
  id: string;
  image: string;
  title: string;
  description: string;
}

// Colour Types
export interface Colour {
  id: string;
  name: string;
  hexCode: string;
}

// Showroom Types
export interface Showroom {
  id: string;
  name: string;
  address: string;
  image: string;
  email: string;
  phone: string;
  openingHours: OpeningHours[];
  mapLink: string;
  latitude?: number;
  longitude?: number;
}

export interface OpeningHours {
  day: string;
  hours: string;
  isOpen: boolean;
}

// Sale Types
export interface Sale {
  id: string;
  title: string;
  description: string;
  image: string;
  products: string[];
  categories: ('kitchen' | 'bedroom')[];
  termsAndConditions: string;
  validUntil?: string;
  discount?: number;
  featured?: boolean;
}

// Package Types
export interface Package {
  id: string;
  title: string;
  description: string;
  image: string;
  price?: number;
  features: string[];
  popular?: boolean;
}

// Appointment Types
export interface Appointment {
  id?: string;
  type: 'home' | 'online' | 'showroom';
  services: ('kitchen' | 'bedroom')[];
  customerDetails: CustomerDetails;
  dateTime: string;
  showroomId?: string;
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  email: string;
  postcode: string;
  address: string;
}

// Blog Types
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: Author;
  publishedAt: string;
  category: string;
  tags: string[];
  readTime?: number;
  featured?: boolean;
}

export interface Author {
  name: string;
  avatar?: string;
  bio?: string;
}

// Finance Types
export interface Finance {
  id: string;
  title: string;
  description: string;
  content: string;
  features?: string[];
  interestRate?: number;
  minAmount?: number;
  maxAmount?: number;
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: 'customer' | 'admin';
  createdAt: string;
}

// Wishlist Types
export interface WishlistItem {
  id: string;
  productId: string;
  product?: Product;
  addedAt: string;
}

// Cart Types
export interface CartItem {
  id: string;
  productId: string;
  product?: Product;
  quantity: number;
  selectedColour?: Colour;
  addedAt: string;
}

// Search Types
export interface SearchResult {
  type: 'product' | 'blog' | 'page';
  id: string;
  title: string;
  description?: string;
  image?: string;
  url: string;
}

// Navigation Types
export interface NavLink {
  label: string;
  href: string;
  icon?: string;
  children?: NavLink[];
}

// SEO Types
export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  noindex?: boolean;
}

// Form State Types
export interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  message?: string;
}

// Table Types (for admin)
export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}

// Modal Types
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

// Breadcrumb Types
export interface Breadcrumb {
  label: string;
  href: string;
}

// Stat Types
export interface Stat {
  label: string;
  value: string | number;
  icon?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}