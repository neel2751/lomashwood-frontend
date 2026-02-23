"use client";

import {
  Copy,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  MessageCircle,
  Check,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/types/product.types";

interface ShareButtonProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareButton({ product, isOpen, onClose }: ShareButtonProps) {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);

  const productUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/product/${product.id}`
      : "";

  const shareText = `Check out ${product.name} on Lomash Wood`;
  const shareDescription = product.shortDescription || product.description || "";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(productUrl);
      setIsCopied(true);
      toast({
        title: "Link Copied!",
        description: "Product link has been copied to clipboard.",
      });

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
      toast({
        title: "Error",
        description: "Failed to copy link. Please try again.",
        variant: "error",
      });
    }
  };

  const shareOptions = [
    {
      name: "Facebook",
      icon: Facebook,
      color: "bg-blue-600 hover:bg-blue-700",
      onClick: () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          productUrl
        )}`;
        window.open(url, "_blank", "width=600,height=400");
      },
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "bg-sky-500 hover:bg-sky-600",
      onClick: () => {
        const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          productUrl
        )}&text=${encodeURIComponent(shareText)}`;
        window.open(url, "_blank", "width=600,height=400");
      },
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "bg-blue-700 hover:bg-blue-800",
      onClick: () => {
        const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          productUrl
        )}`;
        window.open(url, "_blank", "width=600,height=400");
      },
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "bg-green-600 hover:bg-green-700",
      onClick: () => {
        const url = `https://wa.me/?text=${encodeURIComponent(
          `${shareText} - ${productUrl}`
        )}`;
        window.open(url, "_blank");
      },
    },
    {
      name: "Email",
      icon: Mail,
      color: "bg-gray-600 hover:bg-gray-700",
      onClick: () => {
        const subject = encodeURIComponent(shareText);
        const body = encodeURIComponent(
          `I found this amazing product on Lomash Wood:\n\n${product.name}\n${shareDescription}\n\nCheck it out here: ${productUrl}`
        );
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
      },
    },
  ];

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: shareDescription,
          url: productUrl,
        });
      } catch (error) {
        console.log("Share cancelled or failed:", error);
      }
    }
  };

  const getFirstImageUrl = (): string | undefined => {
    if (!product.images || product.images.length === 0) return undefined;
    
    const firstImage = product.images[0];
    if (typeof firstImage === 'object' && firstImage !== null && 'url' in firstImage) {
      return firstImage.url;
    }
    if (typeof firstImage === 'string') {
      return firstImage;
    }
    return undefined;
  };

  const getCategoryName = (): string => {
    if (!product.category) return '';

    if (typeof product.category === 'object' && product.category !== null && 'name' in product.category) {
      return product.category.name;
    }
    if (typeof product.category === 'string') {
      return product.category;
    }
    return '';
  };

  const firstImageUrl = getFirstImageUrl();
  const categoryName = getCategoryName();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share This Product</DialogTitle>
          <DialogDescription>
            Share {product.name} with your friends and family
          </DialogDescription>
        </DialogHeader>

        {/* Product Preview */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
          {firstImageUrl && (
            <img
              src={firstImageUrl}
              alt={product.name}
              className="w-16 h-16 object-cover rounded"
            />
          )}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm truncate">{product.name}</h4>
            <p className="text-xs text-muted-foreground truncate">
              {categoryName}
            </p>
          </div>
        </div>

        {/* Copy Link Section */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Copy Link</label>
          <div className="flex gap-2">
            <Input
              value={productUrl}
              readOnly
              className="flex-1 text-sm"
              onClick={(e) => e.currentTarget.select()}
            />
            <Button
              type="button"
              size="sm"
              onClick={handleCopyLink}
              className="flex-shrink-0"
            >
              {isCopied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Social Share Options */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Share on Social Media</label>
          <div className="grid grid-cols-5 gap-3">
            {shareOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.name}
                  type="button"
                  onClick={option.onClick}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg text-white transition-colors ${option.color}`}
                  aria-label={`Share on ${option.name}`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{option.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Native Share Button (Mobile) */}
        {typeof navigator !== "undefined" && "share" in navigator && (
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleNativeShare}
          >
            More Sharing Options
          </Button>
        )}

        {/* Close Button */}
        <Button
          type="button"
          variant="secondary"
          className="w-full"
          onClick={onClose}
        >
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}