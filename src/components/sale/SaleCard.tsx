"use client";

import {
  Calendar,
  Clock,
  Info,
  ShoppingCart,
  Heart,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export interface SaleOffer {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  category: "kitchen" | "bedroom" | "both" | "accessories";
  discountType: "percentage" | "fixed" | "bundle";
  discountValue: number;
  originalPrice?: number;
  salePrice?: number;
  startDate: string;
  endDate: string;
  terms?: string[];
  conditions?: string;
  featured?: boolean;
  limited?: boolean;
  stockCount?: number;
  maxStock?: number;
  minPurchase?: number;
  tags?: string[];
  isActive?: boolean;
}

interface SaleCardProps {
  offer: SaleOffer;
  variant?: "default" | "featured" | "compact" | "horizontal";
  showTerms?: boolean;
  showCountdown?: boolean;
  onAddToCart?: (offerId: string) => void;
  onToggleWishlist?: (offerId: string) => void;
  isInWishlist?: boolean;
  className?: string;
}

function calculateTimeRemaining(endDate: string) {
  const now = new Date().getTime();
  const end = new Date(endDate).getTime();
  const diff = end - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, expired: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    expired: false,
  };
}

const SimpleProgress = ({
  value,
  className,
}: {
  value: number;
  className?: string;
}) => (
  <div
    className={cn(
      "w-full bg-secondary rounded-full overflow-hidden",
      className
    )}
  >
    <div
      className="h-full bg-primary transition-all duration-300"
      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
    />
  </div>
);

export default function SaleCard({
  offer,
  variant = "default",
  showTerms = true,
  showCountdown = true,
  onAddToCart,
  onToggleWishlist,
  isInWishlist = false,
  className,
}: SaleCardProps) {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [timeRemaining] = useState(() => calculateTimeRemaining(offer.endDate));

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(dateString));
  };

  const getDiscountBadge = () => {
    if (offer.discountType === "percentage") return `${offer.discountValue}% OFF`;
    if (offer.discountType === "fixed") return `₹${offer.discountValue} OFF`;
    return "Bundle Deal";
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "kitchen":
        return "bg-blue-100 text-blue-700";
      case "bedroom":
        return "bg-purple-100 text-purple-700";
      case "both":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const stockPercentage =
    offer.maxStock && offer.maxStock > 0
      ? ((offer.stockCount ?? 0) / offer.maxStock) * 100
      : 100;

  if (variant === "compact") {
    return (
      <Card
        className={cn(
          "overflow-hidden hover:shadow-md transition-shadow",
          className
        )}
      >
        <Link href={`/sale/${offer.slug}`}>
          <div className="p-4 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <Badge variant="destructive" className="flex-shrink-0">
                {getDiscountBadge()}
              </Badge>
              {offer.featured && (
                <Badge variant="secondary" className="flex-shrink-0">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
              )}
            </div>

            <h3 className="font-semibold leading-tight line-clamp-2">
              {offer.title}
            </h3>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>
                  {timeRemaining.expired
                    ? "Expired"
                    : `${timeRemaining.days}d ${timeRemaining.hours}h left`}
                </span>
              </div>
              {offer.limited && (
                <Badge variant="outline" className="text-xs">
                  Limited Stock
                </Badge>
              )}
            </div>
          </div>
        </Link>
      </Card>
    );
  }

  if (variant === "horizontal") {
    return (
      <Card
        className={cn(
          "overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer",
          className
        )}
      >
        <Link href={`/sale/${offer.slug}`}>
          <div className="flex flex-col sm:flex-row">
            <div className="relative h-48 sm:h-auto sm:w-64 flex-shrink-0 overflow-hidden bg-muted">
              <Image
                src={offer.image}
                alt={offer.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <Badge
                variant="destructive"
                className="absolute top-3 left-3 text-lg font-bold px-3 py-1"
              >
                {getDiscountBadge()}
              </Badge>
              {offer.featured && (
                <Badge variant="secondary" className="absolute top-3 right-3">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
              )}
            </div>

            <div className="flex-1 flex flex-col p-6">
              <div className="space-y-3 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                    {offer.title}
                  </h3>
                  <Badge className={getCategoryColor(offer.category)}>
                    {offer.category === "both"
                      ? "Kitchen & Bedroom"
                      : offer.category}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {offer.description}
                </p>

                {offer.salePrice != null && offer.originalPrice != null && (
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-destructive">
                      ₹{offer.salePrice.toLocaleString()}
                    </span>
                    <span className="text-lg line-through text-muted-foreground">
                      ₹{offer.originalPrice.toLocaleString()}
                    </span>
                  </div>
                )}

                {showCountdown && !timeRemaining.expired && (
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-destructive" />
                    <span className="font-medium">
                      Ends in {timeRemaining.days}d {timeRemaining.hours}h{" "}
                      {timeRemaining.minutes}m
                    </span>
                  </div>
                )}

                {offer.limited && offer.maxStock != null && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        Only {offer.stockCount ?? 0} left!
                      </span>
                      <span className="font-medium">
                        {stockPercentage.toFixed(0)}%
                      </span>
                    </div>
                    <SimpleProgress value={stockPercentage} className="h-2" />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 mt-4">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    onAddToCart?.(offer.id);
                  }}
                  className="flex-1"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  View Offer
                </Button>
                {showTerms && (offer.terms?.length ?? 0) > 0 && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsTermsOpen(true);
                    }}
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Link>
      </Card>
    );
  }

  if (variant === "featured") {
    return (
      <Card
        className={cn(
          "overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer border-2 border-primary",
          className
        )}
      >
        <Link href={`/sale/${offer.slug}`}>
          <div className="relative h-80 md:h-96 overflow-hidden bg-muted">
            <Image
              src={offer.image}
              alt={offer.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
              <Badge
                variant="destructive"
                className="text-2xl font-bold px-4 py-2 shadow-lg"
              >
                {getDiscountBadge()}
              </Badge>
              <Badge variant="secondary" className="shadow-lg">
                <Sparkles className="h-4 w-4 mr-1" />
                Featured Deal
              </Badge>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <Badge className={cn("mb-2", getCategoryColor(offer.category))}>
                {offer.category === "both"
                  ? "Kitchen & Bedroom"
                  : offer.category}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                {offer.title}
              </h2>
              <p className="text-white/90 mb-4 line-clamp-2">
                {offer.description}
              </p>

              {offer.salePrice != null && offer.originalPrice != null && (
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-3xl font-bold">
                    ₹{offer.salePrice.toLocaleString()}
                  </span>
                  <span className="text-xl line-through text-white/60">
                    ₹{offer.originalPrice.toLocaleString()}
                  </span>
                </div>
              )}

              {showCountdown && !timeRemaining.expired && (
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5" />
                  <span className="text-lg font-medium">
                    {timeRemaining.days}d {timeRemaining.hours}h{" "}
                    {timeRemaining.minutes}m remaining
                  </span>
                </div>
              )}

              <Button size="lg" className="w-full sm:w-auto">
                Claim This Offer
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </Link>
      </Card>
    );
  }

  return (
    <>
      <Card
        className={cn(
          "overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer",
          offer.isActive === false && "opacity-60",
          className
        )}
      >
        <Link href={`/sale/${offer.slug}`}>
          <div className="relative h-56 overflow-hidden bg-muted">
            <Image
              src={offer.image}
              alt={offer.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <Badge
              variant="destructive"
              className="absolute top-3 left-3 text-lg font-bold px-3 py-1"
            >
              {getDiscountBadge()}
            </Badge>
            {offer.featured && (
              <Badge variant="secondary" className="absolute top-3 right-3">
                <Sparkles className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
            {offer.isActive === false && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  Offer Ended
                </Badge>
              </div>
            )}
          </div>

          <CardHeader className="space-y-3">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2 flex-1">
                {offer.title}
              </h3>
              <Badge className={getCategoryColor(offer.category)}>
                {offer.category}
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">
              {offer.description}
            </p>

            {offer.salePrice != null && offer.originalPrice != null && (
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-destructive">
                  ₹{offer.salePrice.toLocaleString()}
                </span>
                <span className="text-base line-through text-muted-foreground">
                  ₹{offer.originalPrice.toLocaleString()}
                </span>
                <Badge variant="outline" className="ml-auto">
                  Save ₹
                  {(offer.originalPrice - offer.salePrice).toLocaleString()}
                </Badge>
              </div>
            )}

            {showCountdown && offer.isActive !== false && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-destructive" />
                  <span className="font-medium">
                    {timeRemaining.expired ? (
                      "Offer Expired"
                    ) : (
                      <>
                        Ends in {timeRemaining.days}d {timeRemaining.hours}h{" "}
                        {timeRemaining.minutes}m
                      </>
                    )}
                  </span>
                </div>
              </div>
            )}

            {offer.limited && offer.maxStock != null && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-destructive">
                    Hurry! Only {offer.stockCount ?? 0} left
                  </span>
                  <span className="text-muted-foreground">
                    {stockPercentage.toFixed(0)}% claimed
                  </span>
                </div>
                <SimpleProgress value={stockPercentage} className="h-2" />
              </div>
            )}

            {(offer.tags?.length ?? 0) > 0 && (
              <div className="flex flex-wrap gap-1">
                {offer.tags!.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </CardHeader>

          <CardFooter className="flex flex-col gap-2">
            <div className="flex gap-2 w-full">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  onAddToCart?.(offer.id);
                }}
                disabled={offer.isActive === false}
                className="flex-1"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                View Offer
              </Button>
              {onToggleWishlist && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={(e) => {
                    e.preventDefault();
                    onToggleWishlist(offer.id);
                  }}
                  disabled={offer.isActive === false}
                >
                  <Heart
                    className={cn(
                      "h-4 w-4",
                      isInWishlist && "fill-current text-destructive"
                    )}
                  />
                </Button>
              )}
            </div>

            {showTerms && (offer.terms?.length ?? 0) > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  setIsTermsOpen(true);
                }}
                className="w-full gap-2"
              >
                <Info className="h-3 w-3" />
                View Terms & Conditions
              </Button>
            )}
          </CardFooter>
        </Link>
      </Card>

      {/* ── Terms Dialog ── */}
      {(offer.terms?.length ?? 0) > 0 && (
        <Dialog open={isTermsOpen} onOpenChange={setIsTermsOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{offer.title}</DialogTitle>
              <DialogDescription>Terms & Conditions</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Valid from {formatDate(offer.startDate)} to{" "}
                    {formatDate(offer.endDate)}
                  </span>
                </div>
                {offer.minPurchase != null && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <AlertCircle className="h-4 w-4" />
                    <span>
                      Minimum purchase: ₹
                      {offer.minPurchase.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              <Separator />

              <ul className="space-y-2">
                {offer.terms!.map((term, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{term}</span>
                  </li>
                ))}
              </ul>

              {offer.conditions != null && (
                <>
                  <Separator />
                  <p className="text-xs text-muted-foreground">
                    {offer.conditions}
                  </p>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}