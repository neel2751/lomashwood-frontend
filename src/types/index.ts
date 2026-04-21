export interface MediaWall {
  id: string;
  title: string;
  description: string;
  images: string[];
  backgroundImage: string;
}
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
export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  images?: string[];
  category: 'kitchen' | 'bedroom' | 'media-wall' | string;
  location?: string;
  completedAt?: string;
  style?: string;
  finish?: string;
  layout?: string;
  duration?: string;
}

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

export interface ProcessStep {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface ProductFilters {
  colours?: string[];
  styles?: string[];
  finishes?: string[];
  ranges?: string[];
  priceRange?: [number, number];
  category?: 'kitchen' | 'bedroom';
  search?: string;
}

export interface BrochureRequest {
  name: string;
  phone: string;
  email: string;
  postcode: string;
  address: string;
}

export interface BusinessInquiry {
  name: string;
  email: string;
  phone: string;
  businessType: string;
  message?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface Newsletter {
  email: string;
}

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

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

export interface Product {
  id: string;
  slug: string;
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

export interface Colour {
  id: string;
  name: string;
  hexCode: string;
}

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

export interface Package {
  id: string;
  title: string;
  description: string;
  image: string;
  price?: number;
  features: string[];
  popular?: boolean;
}

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

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: 'customer' | 'admin';
  createdAt: string;
}

export interface WishlistItem {
  id: string;
  productId: string;
  product?: Product;
  addedAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product?: Product;
  quantity: number;
  selectedColour?: Colour;
  addedAt: string;
}

export interface SearchResult {
  type: 'product' | 'blog' | 'page';
  id: string;
  title: string;
  description?: string;
  image?: string;
  url: string;
}

export interface NavLink {
  label: string;
  href: string;
  icon?: string;
  children?: NavLink[];
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  noindex?: boolean;
}

export interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  message?: string;
}

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export interface Breadcrumb {
  label: string;
  href: string;
}

export interface Stat {
  label: string;
  value: string | number;
  icon?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}