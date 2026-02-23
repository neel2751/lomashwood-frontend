"use client";

import { IndianRupee, TrendingDown, Info } from "lucide-react";
import { useMemo } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/utils/formatters";

interface PriceCalculatorProps {
  basePrice: number;
  calculatedPrice?: number;
  discount?: {
    type: "percentage" | "fixed";
    value: number;
  };
  size?: {
    width: number;
    height: number;
    depth: number;
  };
  customizable?: boolean;
}

export default function PriceCalculator({
  basePrice,
  calculatedPrice,
  discount,
  size,
  customizable = false,
}: PriceCalculatorProps) {
  const { finalPrice, discountAmount, savingsPercentage } = useMemo(() => {
    const price = calculatedPrice || basePrice;
    let discountAmt = 0;

    if (discount) {
      if (discount.type === "percentage") {
        discountAmt = (price * discount.value) / 100;
      } else {
        discountAmt = discount.value;
      }
    }

    const final = price - discountAmt;
    const savingsPercent = price > 0 ? ((discountAmt / price) * 100).toFixed(0) : "0";

    return {
      finalPrice: final,
      discountAmount: discountAmt,
      savingsPercentage: savingsPercent,
    };
  }, [basePrice, calculatedPrice, discount]);

  const gst = useMemo(() => {
    const gstRate = 0.18;
    return finalPrice * gstRate;
  }, [finalPrice]);

  const totalPrice = useMemo(() => {
    return finalPrice + gst;
  }, [finalPrice, gst]);

  const hasSizeCalculation = size && (size.width > 0 || size.height > 0 || size.depth > 0);

  return (
    <Card className="border-2 shadow-sm">
      <CardContent className="p-6 space-y-4">
        {/* Price Header */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              {customizable && hasSizeCalculation
                ? "Estimated Price"
                : "Product Price"}
            </span>
            {customizable && (
              <div className="relative group">
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                {/* CSS-based tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 max-w-xs w-max">
                  Final price may vary based on exact measurements and customization options. Book a consultation for accurate pricing.
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                </div>
              </div>
            )}
          </div>

          {/* Original Price (if discount exists) */}
          {discount && discountAmount > 0 && (
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg text-muted-foreground line-through">
                {formatCurrency(calculatedPrice || basePrice)}
              </span>
              <Badge variant="destructive" className="text-xs">
                {savingsPercentage}% OFF
              </Badge>
            </div>
          )}

          {/* Final Price */}
          <div className="flex items-baseline gap-2">
            <IndianRupee className="h-6 w-6 text-primary" />
            <span className="text-4xl font-bold text-gray-900">
              {finalPrice.toLocaleString("en-IN", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </span>
          </div>

          {/* Savings Amount */}
          {discount && discountAmount > 0 && (
            <div className="flex items-center gap-1.5 mt-2 text-green-600">
              <TrendingDown className="h-4 w-4" />
              <span className="text-sm font-medium">
                You save {formatCurrency(discountAmount)}
              </span>
            </div>
          )}
        </div>

        <Separator />

        {/* Price Breakdown */}
        <div className="space-y-2 text-sm">
          {/* Base Price */}
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Base Price</span>
            <span className="font-medium">{formatCurrency(basePrice)}</span>
          </div>

          {/* Size Calculation */}
          {hasSizeCalculation && calculatedPrice && calculatedPrice !== basePrice && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Size Adjustment
                {size && (
                  <span className="text-xs ml-1">
                    ({size.width}×{size.height}×{size.depth}cm)
                  </span>
                )}
              </span>
              <span className="font-medium text-green-600">
                +{formatCurrency(calculatedPrice - basePrice)}
              </span>
            </div>
          )}

          {/* Discount */}
          {discount && discountAmount > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Discount ({discount.type === "percentage" ? `${discount.value}%` : "Fixed"})
              </span>
              <span className="font-medium text-red-600">
                -{formatCurrency(discountAmount)}
              </span>
            </div>
          )}

          <Separator />

          {/* Subtotal */}
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-semibold">{formatCurrency(finalPrice)}</span>
          </div>

          {/* GST */}
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">GST (18%)</span>
            <span className="font-medium">{formatCurrency(gst)}</span>
          </div>

          <Separator className="bg-gray-300" />

          {/* Total */}
          <div className="flex items-center justify-between pt-1">
            <span className="font-semibold text-base">Total Amount</span>
            <span className="font-bold text-lg text-primary">
              {formatCurrency(totalPrice)}
            </span>
          </div>
        </div>

        {/* Additional Info */}
        {customizable && (
          <div className="pt-2">
            <p className="text-xs text-muted-foreground">
              * This is an estimated price. Final pricing will be confirmed after our design
              consultation and precise measurements.
            </p>
          </div>
        )}

        {/* Payment Options */}
        <div className="pt-2">
          <p className="text-xs text-muted-foreground">
            EMI options available starting from{" "}
            <span className="font-medium text-foreground">
              {formatCurrency(totalPrice / 12)}/month
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}