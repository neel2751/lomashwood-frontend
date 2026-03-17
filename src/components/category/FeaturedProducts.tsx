"use client";

import { useQuery } from "@tanstack/react-query";
import { Sparkles } from "lucide-react";

import { ProductCard } from "@/components/products/ProductCard";
import { productService } from "@/services/productService";
import type { Product as ApiProduct } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  slug: string;
  image: string;
  images: string[];
  category: string;
  style: string;
  finish: string;
  priceRange: {
    min: number;
    max: number;
  };
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
}

const mapApiProductToCard = (product: ApiProduct): Product => ({
  id: product.id,
  name: product.title,
  slug: product.slug,
  image: product.images?.[0] || "/images/placeholder-product.jpg",
  images: product.images || [],
  category: product.category,
  style: product.style || product.rangeName || "",
  finish: product.finish || "",
  priceRange: {
    min: product.price || 0,
    max: product.price || 0,
  },
  rating: 0,
  reviewCount: 0,
  inStock: true,
  isFeatured: product.featured,
});

interface FeaturedProductsProps {
  category: "kitchen" | "bedroom" | "all";
  limit?: number;
  title?: string;
  description?: string;
  className?: string;
}

export default function FeaturedProducts({
  category,
  limit = 4,
  title = "Featured Products",
  description,
  className,
}: FeaturedProductsProps) {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["featuredProducts", category, limit],
    queryFn: async () => {
      const response = await productService.getProducts({
        page: 1,
        limit,
        sort: "newest",
        ...(category !== "all" ? { category } : {}),
        featured: true,
      } as any);

      const rows = response.data || [];
      const featuredRows = rows.filter((product) => product.featured);
      return (featuredRows.length > 0 ? featuredRows : rows)
        .slice(0, limit)
        .map(mapApiProductToCard);
    },
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <section className={cn("space-y-6", className)}>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-6 w-20" />
          </div>
          {description && <Skeleton className="h-4 w-96 max-w-full" />}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: limit }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-0">
                <Skeleton className="aspect-square w-full" />
                <div className="space-y-2 p-4">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-6 w-1/3" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
          <Badge variant="secondary" className="gap-1">
            <Sparkles className="h-3 w-3" />
            Featured
          </Badge>
        </div>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}