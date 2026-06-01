'use client';

import { GridView } from './GridView';
import { ListView } from './ListView';

interface Product {
  id: string;
  title: string;
  slug: string;
  name: string;
  category: string;
  style: string;
  finish: string;
  image: string;
  images?: string[];
  price?: {
    from: number;
    to?: number;
  };
  colors?: string[];
  inStock: boolean;
  isNew?: boolean;
  isSale?: boolean;
  discount?: number;
  rating?: number;
  reviewCount?: number;
  description?: string;
}

interface ProductGridProps {
  products: Product[];
  viewMode?: 'grid' | 'list';
  isLoading?: boolean;
}

export default function ProductGrid({ 
  products, 
  viewMode = 'grid',
  isLoading = false 
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[4/3] bg-gray-200 rounded-lg mb-4" />
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mb-4">
          <svg
            className="mx-auto h-16 w-16 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No Products Found
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
        </p>
      </div>
    );
  }

  return (
    <>
      {viewMode === 'grid' ? (
        <GridView products={products} />
      ) : (
        <ListView products={products} />
      )}
    </>
  );
}