"use client";

import { Heart, Share2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product.types";

import BookConsultation from "./BookConsultation";
import RequestQuote from "./RequestQuote";
import ShareButton from "./ShareButton";

interface ProductActionsProps {
  product: Product;
  selectedVariant?: {
    color?: string;
    finish?: string;
    price?: number;
  };
}

export default function ProductActions({
  product,
  selectedVariant,
}: ProductActionsProps) {
  const { toast } = useToast();
  const { addItem, removeItem, isInWishlist } = useWishlist();
  const [isShareOpen, setIsShareOpen] = useState(false);

  const isWishlisted = isInWishlist(product.id);

  const handleWishlistToggle = async () => {
    try {
      if (isWishlisted) {
        await removeItem(product.id);
        toast({
          title: "Removed from wishlist",
          description: `${product.name} has been removed from your wishlist.`,
        });
      } else {
        const firstImage = product.images?.[0];
        const imageUrl = typeof firstImage === 'string' 
          ? firstImage 
          : firstImage?.url || '';

        const wishlistItem = {
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          image: imageUrl,
          category: typeof product.category === 'string' 
            ? product.category 
            : product.category?.name || '',
          inStock: product.inStock,
        };
        
        await addItem(wishlistItem);
        toast({
          title: "Added to wishlist",
          description: `${product.name} has been added to your wishlist.`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update wishlist. Please try again.",
        variant: "error",
      });
    }
  };

  const categoryString = typeof product.category === 'string' 
    ? product.category 
    : product.category?.name || '';

  const warrantyText = product.warranty
    ? typeof product.warranty === 'string'
      ? product.warranty
      : product.warranty?.duration
      ? `${product.warranty.duration} ${product.warranty.type || 'Warranty'}`
      : null
    : null;

  const estimatedDays = 7;
  const freeDelivery = product.price && product.price > 5000; //

  return (
    <div className="space-y-4">
      {/* Primary Actions Card */}
      <Card className="border-2">
        <CardContent className="p-6 space-y-4">
          {/* Book Consultation Button */}
          <BookConsultation
            productId={product.id}
            productName={product.name}
            category={categoryString}
            selectedColor={selectedVariant?.color}
            selectedFinish={selectedVariant?.finish}
          />

          {/* Request Quote Button */}
          <RequestQuote
            product={product}
            selectedVariant={selectedVariant}
          />

          <Separator />

          {/* Secondary Actions */}
          <div className="grid grid-cols-2 gap-3">
            {/* Add to Wishlist */}
            <Button
              type="button"
              variant="outline"
              onClick={handleWishlistToggle}
              className={cn(
                "w-full",
                isWishlisted && "border-red-500 text-red-500 hover:text-red-600"
              )}
            >
              <Heart
                className={cn(
                  "h-4 w-4 mr-2",
                  isWishlisted && "fill-red-500"
                )}
              />
              {isWishlisted ? "Saved" : "Save"}
            </Button>

            {/* Share Button */}
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsShareOpen(true)}
              className="w-full"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <div className="space-y-3 text-sm">
        {/* Availability */}
        {product.inStock ? (
          <div className="flex items-center gap-2 text-green-600">
            <div className="w-2 h-2 rounded-full bg-green-600" />
            <span>In Stock & Ready to Order</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-orange-600">
            <div className="w-2 h-2 rounded-full bg-orange-600" />
            <span>Contact us for availability</span>
          </div>
        )}

        {/* Delivery Time */}
        <div className="flex items-center gap-2 text-muted-foreground">
          <svg
            className="w-4 h-4"
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
          <span>
            Estimated delivery: {estimatedDays} days
          </span>
        </div>

        {/* Free Delivery */}
        {freeDelivery && (
          <div className="flex items-center gap-2 text-green-600">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Free Delivery Available</span>
          </div>
        )}

        {/* Warranty */}
        {warrantyText && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span>{warrantyText}</span>
          </div>
        )}
      </div>

      {/* Help Text */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-900">
          <strong>Need Help?</strong> Our design experts are available to assist you
          with product selection, customization, and any questions you may have.
        </p>
      </div>

      {/* Share Dialog */}
      <ShareButton
        product={product}
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />
    </div>
  );
}