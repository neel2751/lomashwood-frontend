
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { WishlistButton } from '../ProductCard/WishlistButton';

interface Product {
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
  description?: string;
}

interface ListViewProps {
  products: Product[];
}

export function ListView({ products }: ListViewProps) {
  // const formatPrice = (price: number) => {
  //   return new Intl.NumberFormat('en-IN', {
  //     style: 'currency',
  //     currency: 'INR',
  //     maximumFractionDigits: 0,
  //   }).format(price);
  // };

  return (
    <div className="space-y-6">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {/* Image Section */}
              <div className="relative aspect-[4/3] md:aspect-auto md:h-full bg-gray-100">
                <Link href={`/product/${product.slug}`}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
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
              </div>

              {/* Content Section */}
              <div className="md:col-span-2 p-6">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      {/* Category & Style */}
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs capitalize">
                          {product.category}
                        </Badge>
                        <span className="text-sm text-gray-500">{product.style}</span>
                      </div>

                      {/* Product Name */}
                      <Link href={`/product/${product.slug}`}>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                      </Link>

                      {/* Finish */}
                      <p className="text-sm text-gray-600 mb-3">
                        Finish: <span className="font-medium">{product.finish}</span>
                      </p>
                    </div>

                    {/* Wishlist */}
                    <WishlistButton productId={product.id} />
                  </div>

                  {/* Description */}
                  {product.description && (
                    <p className="text-gray-600 leading-relaxed mb-4 line-clamp-2">
                      {product.description}
                    </p>
                  )}

                  {/* Rating */}
                  {product.rating && product.reviewCount && (
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${
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
                        ({product.reviewCount} reviews)
                      </span>
                    </div>
                  )}

                  {/* Colors */}
                  {product.colors && product.colors.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Available Colors:</p>
                      <div className="flex gap-2">
                        {product.colors.slice(0, 5).map((color, idx) => (
                          <div
                            key={idx}
                            className="w-8 h-8 rounded-full border-2 border-gray-200"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                        {product.colors.length > 5 && (
                          <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-gray-300 flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600">
                              +{product.colors.length - 5}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="mt-auto pt-4 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    {/* Price */}
                    {/* <div>
                      {product.price ? (
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-gray-900">
                            {formatPrice(product.price.from)}
                          </span>
                          {product.price.to && (
                            <span className="text-base text-gray-500">
                              - {formatPrice(product.price.to)}
                            </span>
                          )}
                          {product.isSale && product.discount && (
                            <Badge variant="destructive" className="ml-2">
                              Save {product.discount}%
                            </Badge>
                          )}
                        </div>
                      ) : (
                        <span className="text-lg text-gray-600 font-medium">
                          Price on Request
                        </span>
                      )}
                    </div> */}

                    {/* Action Buttons */}
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Button
              asChild
              className="flex-1"
              // disabled={!product.inStock}
            >
              <Link href={`/product/${product.slug}?category=${product.category}`}>
                View Details
              </Link>
            </Button>
                      <Button
              asChild
              variant="outline"
              size="icon"
              className='sm:hidden'
            >
              <Link href={`/book-appointment?product=${product.slug}&category=${product.category}`}>
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
                      <Button
                        asChild
                        variant="outline"
                        
                        disabled={!product.inStock}
                        className="flex-1 sm:flex-none hidden sm:inline-flex"
                      >
                        <Link href={`/book-appointment?product=${product.slug}&category=${product.category}`}>
                          Book Consultation
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}