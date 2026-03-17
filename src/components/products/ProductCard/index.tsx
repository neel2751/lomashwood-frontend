'use client';

import { Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';


import { QuickView } from './QuickView';
import { WishlistButton } from './WishlistButton';

interface ProductCardProps {
  product: {
    id: string;
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
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const productIdentifier = product.slug || product.id;
  const styleLabel = typeof product.style === 'string' ? product.style.trim() : '';
  const finishLabel = typeof product.finish === 'string' ? product.finish.trim() : '';

  // const formatPrice = (price: number) => {
  //   return new Intl.NumberFormat('en-IN', {
  //     style: 'currency',
  //     currency: 'INR',
  //     maximumFractionDigits: 0,
  //   }).format(price);
  // };

  return (
    <>
      <Card className="group h-full overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <Link href={`/product/${productIdentifier}`}>
            <Image
              src={imageError ? '/images/placeholder-product.jpg' : product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => setImageError(true)}
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <Badge className="bg-blue-500 hover:bg-blue-600 text-white">
                New
              </Badge>
            )}
            {product.isSale && product.discount && (
              <Badge className="bg-red-500 hover:bg-red-600 text-white">
                {product.discount}% OFF
              </Badge>
            )}
            {!product.inStock && (
              <Badge variant="secondary" className="bg-gray-500 hover:bg-gray-600 text-white">
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Actions Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <Button
              size="icon"
              variant="secondary"
              className="bg-white hover:bg-gray-100 text-gray-900"
              onClick={() => setIsQuickViewOpen(true)}
            >
              <Eye className="w-5 h-5" />
            </Button>
            <WishlistButton productId={product.id} />
          </div>

          {/* Color Options Preview */}
          {product.colors && product.colors.length > 0 && (
            <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-xs font-medium text-gray-700">Colors:</span>
              <div className="flex gap-1.5">
                {product.colors.slice(0, 4).map((color, index) => (
                  <div
                    key={index}
                    className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
                {product.colors.length > 4 && (
                  <div className="w-5 h-5 rounded-full bg-gray-200 border-2 border-white shadow-sm flex items-center justify-center">
                    <span className="text-[10px] font-medium text-gray-600">
                      +{product.colors.length - 4}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <CardContent className="p-4">
          {/* Category & Style */}
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="text-xs capitalize">
              {product.category}
            </Badge>
            {styleLabel && styleLabel !== '0' && (
              <span className="text-xs text-gray-500">{styleLabel}</span>
            )}
          </div>

          {/* Product Name */}
          <Link href={`/product/${productIdentifier}?category=${product.category}`} className="block">
            <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Finish */}
          {finishLabel && finishLabel !== '0' && (
            <p className="text-sm text-gray-600 mb-3">
              Finish: <span className="font-medium">{finishLabel}</span>
            </p>
          )}

          {/* Rating */}
          {/* {product.rating && product.reviewCount && (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating ?? 0)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600">
                ({product.reviewCount})
              </span>
            </div>
          )} */}

          {/* Price */}
          {/* <div className="flex items-center justify-between mb-4">
            <div>
              {product.price ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-lg md:text-xl font-bold text-gray-900">
                    {formatPrice(product.price.from)}
                    {product.price.to && (
                      <span className="text-sm font-normal text-gray-500">
                        {' - '}
                        {formatPrice(product.price.to)}
                      </span>
                    )}
                  </span>
                  {product.isSale && product.discount && (
                    <span className="text-sm text-red-500 font-medium">
                      Save {product.discount}%
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-base text-gray-600 font-medium">
                  Price on Request
                </span>
              )}
            </div>
          </div> */}

          {/* CTA Buttons */}
          <div className="flex gap-2">
            <Button
              asChild
              className="flex-1"
              // disabled={!product.inStock}
            >
              <Link href={`/product/${productIdentifier}?category=${product.category}`}>
                View Details
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="icon"
            >
              <Link href={`/book-appointment?product=${productIdentifier}&category=${product.category}`}>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick View Modal */}
      {isQuickViewOpen && (
        <QuickView
          product={product}
          isOpen={isQuickViewOpen}
          onClose={() => setIsQuickViewOpen(false)}
        />
      )}
    </>
  );
}