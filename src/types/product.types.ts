// Product Base Types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  sku: string;
  category: ProductCategory;
  subcategory?: ProductSubcategory;
  images: ProductImage[];
  price: number;
  originalPrice?: number;
  discount?: number;
  discountPercentage?: number;
  inStock: boolean;
  stockQuantity?: number;
  minOrderQuantity?: number;
  maxOrderQuantity?: number;
  specifications: ProductSpecification[];
  dimensions?: ProductDimensions;
  weight?: ProductWeight;
  materials: string[];
  finishes: string[];
  colors: string[];
  tags: string[];
  featured?: boolean;
  newArrival?: boolean;
  bestSeller?: boolean;
  trending?: boolean;
  rating?: number;
  reviewCount?: number;
  reviews?: ProductReview[];
  relatedProducts?: string[];
  customizable?: boolean;
  customizationOptions?: CustomizationOption[];
  assemblyRequired?: boolean;
  warranty?: ProductWarranty;
  careInstructions?: string[];
  certifications?: string[];
  metadata?: ProductMetadata;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  status: ProductStatus;
}

// Product Category
export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  icon?: string;
  parent?: string | null;
  order?: number;
  productCount?: number;
  featured?: boolean;
  metadata?: {
    seoTitle?: string;
    seoDescription?: string;
    keywords?: string[];
  };
}

// Product Subcategory
export interface ProductSubcategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  categoryId: string;
  image?: string;
  order?: number;
  productCount?: number;
}

// Product Image
export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
  thumbnail?: string;
  order: number;
  isPrimary?: boolean;
  color?: string;
  variant?: string;
}

// Product Specification
export interface ProductSpecification {
  id: string;
  label: string;
  value: string;
  unit?: string;
  group?: string;
  order?: number;
  description?: string;
}

// Product Dimensions
export interface ProductDimensions {
  length: number;
  width: number;
  height: number;
  unit: "cm" | "inch" | "m" | "ft";
  depth?: number;
  diameter?: number;
  seatHeight?: number; // For chairs
  armrestHeight?: number; // For chairs
}

// Product Weight
export interface ProductWeight {
  value: number;
  unit: "kg" | "g" | "lb" | "oz";
  shippingWeight?: number;
  volumetricWeight?: number;
}

// Product Warranty
export interface ProductWarranty {
  duration: number;
  unit: "months" | "years";
  type: "manufacturer" | "seller" | "extended";
  description?: string;
  coverage?: string[];
  terms?: string;
}

// Product Status
export type ProductStatus = "draft" | "published" | "archived" | "out_of_stock" | "discontinued";

// Customization Option
export interface CustomizationOption {
  id: string;
  name: string;
  type: "color" | "size" | "material" | "finish" | "engraving" | "text";
  required: boolean;
  options: CustomizationValue[];
  description?: string;
  priceImpact?: "fixed" | "percentage";
  additionalCost?: number;
}

// Customization Value
export interface CustomizationValue {
  id: string;
  label: string;
  value: string;
  image?: string;
  available: boolean;
  additionalPrice?: number;
  hexColor?: string; // For color options
}

// Product Review
export interface ProductReview {
  id: string;
  productId: string;
  userId?: string;
  userName: string;
  userEmail: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  verified: boolean;
  helpful?: number;
  unhelpful?: number;
  recommended: boolean;
  purchaseDate?: string;
  createdAt: string;
  updatedAt?: string;
  status: "pending" | "approved" | "rejected";
  response?: ReviewResponse;
}

// Review Response (from seller/admin)
export interface ReviewResponse {
  text: string;
  responder: string;
  createdAt: string;
}

// Product Variant
export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  sku: string;
  price: number;
  originalPrice?: number;
  images: string[];
  attributes: VariantAttribute[];
  inStock: boolean;
  stockQuantity?: number;
  weight?: ProductWeight;
}

// Variant Attribute
export interface VariantAttribute {
  name: string;
  value: string;
}

// Product Metadata
export interface ProductMetadata {
  views?: number;
  favorites?: number;
  shareCount?: number;
  lastViewed?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  canonicalUrl?: string;
  structuredData?: Record<string, any>;
}

// Product Filter Options
export interface ProductFilters {
  category?: string[];
  subcategory?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  materials?: string[];
  colors?: string[];
  finishes?: string[];
  inStock?: boolean;
  rating?: number;
  featured?: boolean;
  newArrival?: boolean;
  bestSeller?: boolean;
  customizable?: boolean;
  search?: string;
}

// Product Sort Options
export type ProductSortOption =
  | "relevance"
  | "price-low"
  | "price-high"
  | "newest"
  | "oldest"
  | "popular"
  | "rating"
  | "name-asc"
  | "name-desc";

// Product List Response
export interface ProductListResponse {
  products: Product[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasMore: boolean;
  };
  filters?: {
    categories: FilterOption[];
    materials: FilterOption[];
    colors: FilterOption[];
    finishes: FilterOption[];
    priceRange: {
      min: number;
      max: number;
    };
  };
  sort?: ProductSortOption;
}

// Filter Option
export interface FilterOption {
  value: string;
  label: string;
  count: number;
}

// Product Card Props (for UI components)
export interface ProductCardProps {
  product: Product;
  variant?: "default" | "compact" | "grid" | "list";
  showQuickView?: boolean;
  showWishlist?: boolean;
  showCompare?: boolean;
  showRating?: boolean;
  showBadges?: boolean;
  priority?: boolean;
  className?: string;
}

// Product Search Result
export interface ProductSearchResult {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  category: string;
  inStock: boolean;
  rating?: number;
}

// Bulk Pricing
export interface BulkPricing {
  minQuantity: number;
  maxQuantity?: number;
  price: number;
  discountPercentage?: number;
}

// Product with Bulk Pricing
export interface ProductWithBulkPricing extends Product {
  bulkPricing?: BulkPricing[];
}

// Product Inquiry
export interface ProductInquiry {
  productId: string;
  productName: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  quantity?: number;
  message: string;
  specifications?: string;
  createdAt: string;
}

// Product Availability
export interface ProductAvailability {
  inStock: boolean;
  quantity?: number;
  restockDate?: string;
  allowBackorder?: boolean;
  estimatedDelivery?: {
    min: number;
    max: number;
    unit: "days" | "weeks";
  };
  shippingLocations?: string[];
}

// Product Price
export interface ProductPrice {
  base: number;
  sale?: number;
  discount?: number;
  discountPercentage?: number;
  currency: string;
  tax?: number;
  taxPercentage?: number;
  final: number;
  formatted: string;
}

// Product Gallery
export interface ProductGallery {
  images: ProductImage[];
  videos?: ProductVideo[];
  has360View?: boolean;
  view360Url?: string;
}

// Product Video
export interface ProductVideo {
  id: string;
  url: string;
  thumbnail: string;
  title?: string;
  duration?: number;
  type: "youtube" | "vimeo" | "direct";
}

// Product Comparison
export interface ProductComparison {
  products: Product[];
  attributes: ComparisonAttribute[];
}

// Comparison Attribute
export interface ComparisonAttribute {
  name: string;
  values: (string | number | boolean)[];
}

// Wishlist Item
export interface WishlistItem {
  id: string;
  productId: string;
  product?: Product;
  addedAt: string;
  note?: string;
}

// Recently Viewed Product
export interface RecentlyViewedProduct {
  productId: string;
  product?: Product;
  viewedAt: string;
}

// Product Stock Alert
export interface ProductStockAlert {
  id: string;
  productId: string;
  email: string;
  phone?: string;
  notifyBy: "email" | "sms" | "both";
  createdAt: string;
  notified?: boolean;
  notifiedAt?: string;
}

// Product FAQ
export interface ProductFAQ {
  id: string;
  question: string;
  answer: string;
  order?: number;
  helpful?: number;
  unhelpful?: number;
}

// Product Badge
export type ProductBadge =
  | "new"
  | "sale"
  | "featured"
  | "best-seller"
  | "trending"
  | "out-of-stock"
  | "low-stock"
  | "eco-friendly"
  | "handcrafted"
  | "premium"
  | "custom";

// Product Quick View Data
export interface ProductQuickView {
  id: string;
  name: string;
  images: ProductImage[];
  price: number;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  shortDescription?: string;
  inStock: boolean;
  variants?: ProductVariant[];
  customizationOptions?: CustomizationOption[];
}

// Product Create/Update Input
export interface ProductInput {
  name: string;
  slug?: string;
  description: string;
  shortDescription?: string;
  sku: string;
  categoryId: string;
  subcategoryId?: string;
  images: Omit<ProductImage, "id">[];
  price: number;
  originalPrice?: number;
  stockQuantity?: number;
  specifications: Omit<ProductSpecification, "id">[];
  dimensions?: ProductDimensions;
  weight?: ProductWeight;
  materials: string[];
  finishes: string[];
  colors: string[];
  tags: string[];
  featured?: boolean;
  customizable?: boolean;
  customizationOptions?: Omit<CustomizationOption, "id">[];
  warranty?: ProductWarranty;
  careInstructions?: string[];
  status: ProductStatus;
}

// Product Analytics
export interface ProductAnalytics {
  productId: string;
  views: number;
  uniqueViews: number;
  addToCart: number;
  purchases: number;
  revenue: number;
  averageRating: number;
  reviewCount: number;
  wishlistCount: number;
  shareCount: number;
  conversionRate: number;
  period: {
    start: string;
    end: string;
  };
}

// Export all types
export type {
  Product as default,
};