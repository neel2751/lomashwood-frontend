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

const DEFAULT_API_ENDPOINT =
  `${process.env.NEXT_PUBLIC_API_URL || 'https://lomashwood-backend.vercel.app/api/v1'}/products`;

const mapApiProductToDetail = (rawProduct: any): ProductDetail => ({
  id: rawProduct.id,
  name: rawProduct.title || rawProduct.name || '',
  slug: rawProduct.slug || rawProduct.id,
  description: rawProduct.description || '',
  shortDescription: rawProduct.shortDescription,
  price: rawProduct.price || 0,
  originalPrice: rawProduct.originalPrice,
  discount: rawProduct.discount,
  image: rawProduct.images?.[0] || rawProduct.image || '/images/placeholder-product.jpg',
  images: rawProduct.images || (rawProduct.image ? [rawProduct.image] : []),
  category: rawProduct.category || '',
  categorySlug: rawProduct.categorySlug,
  subCategory: rawProduct.subCategory,
  woodType: rawProduct.woodType,
  stock: typeof rawProduct.stock === 'number' ? rawProduct.stock : 1,
  inStock: rawProduct.inStock ?? true,
  lowStockThreshold: rawProduct.lowStockThreshold,
  restockDate: rawProduct.restockDate,
  rating: rawProduct.rating ?? 0,
  reviewCount: rawProduct.reviewCount ?? 0,
  reviews: rawProduct.reviews,
  dimensions: rawProduct.dimensions,
  weight: rawProduct.weight,
  weightUnit: rawProduct.weightUnit,
  specifications: rawProduct.specifications,
  sku: rawProduct.sku || rawProduct.id,
  brand: rawProduct.brand,
  manufacturer: rawProduct.manufacturer,
  countryOfOrigin: rawProduct.countryOfOrigin,
  material: rawProduct.material,
  finish: rawProduct.finish,
  grade: rawProduct.grade,
  tags: rawProduct.tags,
  features: rawProduct.features,
  warranty: rawProduct.warranty,
  careInstructions: rawProduct.careInstructions,
  featured: rawProduct.featured,
  isNew: rawProduct.isNew,
  isBestseller: rawProduct.isBestseller,
  isOnSale: rawProduct.isOnSale,
  variants: rawProduct.variants,
  hasVariants: rawProduct.hasVariants,
  relatedProducts: rawProduct.relatedProducts,
  similarProducts: rawProduct.similarProducts,
  metaTitle: rawProduct.metaTitle,
  metaDescription: rawProduct.metaDescription,
  metaKeywords: rawProduct.metaKeywords,
  createdAt: rawProduct.createdAt || new Date().toISOString(),
  updatedAt: rawProduct.updatedAt || rawProduct.createdAt || new Date().toISOString(),
});

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

        const payload = await response.json();
        const rawProduct = payload?.data?.product ?? payload?.data ?? payload?.product ?? payload;
        const mappedProduct = mapApiProductToDetail(rawProduct);
        setProduct(mappedProduct);

        if (mappedProduct.variants && mappedProduct.variants.length > 0) {
          setSelectedVariant(mappedProduct.variants[0]);
        }

        if (mappedProduct.reviews) {
          setHasMoreReviews(payload?.hasMoreReviews || false);
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