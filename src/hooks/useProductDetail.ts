import { useState, useEffect, useCallback } from 'react';

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  price?: number;
  stock?: number;
  image?: string;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface ProductReview {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title?: string;
  comment: string;
  images?: string[];
  helpful: number;
  verified: boolean;
  createdAt: string;
}

export interface RelatedProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  rating?: number;
  inStock: boolean;
}

export interface ProductDetail {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  originalPrice?: number;
  discount?: number;

  image: string;
  images: string[];

  category: string;
  categorySlug?: string;
  subCategory?: string;
  woodType?: string;

  stock: number;
  inStock: boolean;
  lowStockThreshold?: number;
  restockDate?: string;

  rating: number;
  reviewCount: number;
  reviews?: ProductReview[];

  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
    thickness?: number;
    unit?: string;
  };
  weight?: number;
  weightUnit?: string;
  specifications?: ProductSpecification[];

  sku: string;
  brand?: string;
  manufacturer?: string;
  countryOfOrigin?: string;
  material?: string;
  finish?: string;
  grade?: string;

  tags?: string[];
  features?: string[];
  warranty?: string;
  careInstructions?: string;

  featured?: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  isOnSale?: boolean;

  variants?: ProductVariant[];
  hasVariants?: boolean;

  relatedProducts?: RelatedProduct[];
  similarProducts?: RelatedProduct[];

  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];

  createdAt: string;
  updatedAt: string;
}

export interface UseProductDetailOptions {
  productId?: string;
  productSlug?: string;
  fetchRelated?: boolean;
  fetchReviews?: boolean;
  apiEndpoint?: string;
}

export interface UseProductDetailReturn {
  product: ProductDetail | null;

  isLoading: boolean;
  isRefreshing: boolean;

  error: string | null;

  refresh: () => Promise<void>;
  updateProduct: (updates: Partial<ProductDetail>) => void;

  loadReviews: (page?: number) => Promise<void>;
  isLoadingReviews: boolean;
  reviewsPage: number;
  hasMoreReviews: boolean;

  selectedVariant: ProductVariant | null;
  selectVariant: (variantId: string) => void;

  isAvailable: boolean;
  isLowStock: boolean;
  hasDiscount: boolean;
  discountPercentage: number;
  effectivePrice: number;
}

const DEFAULT_API_ENDPOINT = '/api/products';

export const useProductDetail = (
  options: UseProductDetailOptions
): UseProductDetailReturn => {
  const {
    productId,
    productSlug,
    fetchRelated = true,
    fetchReviews = true,
    apiEndpoint = DEFAULT_API_ENDPOINT,
  } = options;

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [reviewsPage, setReviewsPage] = useState(1);
  const [hasMoreReviews, setHasMoreReviews] = useState(false);

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);

  const buildApiUrl = useCallback(() => {
    if (!productId && !productSlug) {
      throw new Error('Either productId or productSlug must be provided');
    }

    const identifier = productSlug || productId;
    const params = new URLSearchParams();

    if (fetchRelated) {
      params.append('includeRelated', 'true');
    }

    if (fetchReviews) {
      params.append('includeReviews', 'true');
    }

    const queryString = params.toString();
    return `${apiEndpoint}/${identifier}${queryString ? `?${queryString}` : ''}`;
  }, [productId, productSlug, fetchRelated, fetchReviews, apiEndpoint]);

  const fetchProduct = useCallback(
    async (isRefresh = false) => {
      try {
        if (isRefresh) {
          setIsRefreshing(true);
        } else {
          setIsLoading(true);
        }
        
        setError(null);

        const url = buildApiUrl();
        const response = await fetch(url);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Product not found');
          }
          throw new Error('Failed to fetch product details');
        }

        const data = await response.json();
        setProduct(data.product);

        if (data.product.variants && data.product.variants.length > 0) {
          setSelectedVariant(data.product.variants[0]);
        }

        if (data.product.reviews) {
          setHasMoreReviews(data.hasMoreReviews || false);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to load product';
        setError(errorMessage);
        console.error('Error fetching product:', err);
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [buildApiUrl]
  );

  const refresh = useCallback(async () => {
    await fetchProduct(true);
  }, [fetchProduct]);

  const updateProduct = useCallback((updates: Partial<ProductDetail>) => {
    setProduct((prev) => {
      if (!prev) return null;
      return { ...prev, ...updates };
    });
  }, []);

  const loadReviews = useCallback(
    async (page = reviewsPage + 1) => {
      if (!product || !hasMoreReviews) return;

      try {
        setIsLoadingReviews(true);

        const url = `${apiEndpoint}/${product.id}/reviews?page=${page}&limit=10`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Failed to load reviews');
        }

        const data = await response.json();

        setProduct((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            reviews: [...(prev.reviews || []), ...data.reviews],
          };
        });

        setReviewsPage(page);
        setHasMoreReviews(data.hasMoreReviews || false);
      } catch (err) {
        console.error('Error loading reviews:', err);
      } finally {
        setIsLoadingReviews(false);
      }
    },
    [product, reviewsPage, hasMoreReviews, apiEndpoint]
  );

  const selectVariant = useCallback(
    (variantId: string) => {
      if (!product?.variants) return;

      const variant = product.variants.find((v) => v.id === variantId);
      if (variant) {
        setSelectedVariant(variant);
      }
    },
    [product]
  );

  useEffect(() => {
    if (productId || productSlug) {
      fetchProduct(false);
    }
  }, [productId, productSlug, fetchProduct]);

  const isAvailable = product ? product.inStock && product.stock > 0 : false;
  
  const isLowStock = product
    ? product.inStock &&
      product.stock > 0 &&
      product.stock <= (product.lowStockThreshold || 5)
    : false;

  const hasDiscount = product
    ? Boolean(product.originalPrice && product.originalPrice > product.price)
    : false;

  const discountPercentage = product && product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const effectivePrice = selectedVariant?.price || product?.price || 0;

  return {
    product,

    isLoading,
    isRefreshing,

    error,

    refresh,
    updateProduct,

    loadReviews,
    isLoadingReviews,
    reviewsPage,
    hasMoreReviews,

    selectedVariant,
    selectVariant,

    isAvailable,
    isLowStock,
    hasDiscount,
    discountPercentage,
    effectivePrice,
  };
};