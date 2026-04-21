"use client";

import { Package, Ruler, Info, Check, AlertCircle } from "lucide-react";
import { useState } from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Product, ProductVariant } from "@/types/product.types";

import ColorSelector from "./ColorSelector";
import Description from "./Description";
import FinishSelector from "./FinishSelector";

import SizeCalculator from "./SizeCalculator";
import Title from "./Title";


interface ProductInfoProps {
  product: Product;
  onVariantChange?: (variant: ProductVariant) => void;
}

export default function ProductInfo({ product}: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedFinish, setSelectedFinish] = useState<string>("");
  // const [selectedSize, setSelectedSize] = useState({
  //   width: 0,
  //   height: 0,
  //   depth: 0,
  // });
  // const [calculatedPrice, setCalculatedPrice] = useState<number>(
  //   product.price || 0
  // );

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const handleFinishChange = (finish: string) => {
    setSelectedFinish(finish);
  };

  const handleSizeChange = (size: { width: number; height: number; depth: number }) => {
    console.log("Selected size:", size);
    // setSelectedSize(size);
    // const basePrice = product.price || 0;
    // const sizeMultiplier = (size.width * size.height * size.depth) / 1000;
    // const newPrice = basePrice + sizeMultiplier * 10;
    // setCalculatedPrice(newPrice);
  };

  const availableColors: string[] = selectedColor ? [selectedColor] : [];

  const availableFinishes: string[] = selectedFinish ? [selectedFinish] : [];

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

  const getSpecifications = () => {
    if (!product.specifications || !Array.isArray(product.specifications)) {
      return null;
    }

    const specsObject: Record<string, any> = {};
    product.specifications.forEach((spec: any) => {
      if (spec.key && spec.value) {
        specsObject[spec.key] = spec.value;
      }
    });

    return specsObject;
  };

  const specifications = getSpecifications();

  const getDimensions = () => {
    if (!specifications || !specifications.dimensions) return null;

    if (typeof specifications.dimensions === 'object') {
      return specifications.dimensions;
    }

    if (typeof specifications.dimensions === 'string') {
      return { width: 0, height: 0, depth: 0 };
    }
    
    return null;
  };

  const dimensions = getDimensions();

  // const getDiscount = () => {
  //   if (!product.discountPercentage) return undefined;
    
  //   return {
  //     type: 'percentage' as const,
  //     value: product.discountPercentage
  //   };
  // };

  const getStockQuantity = (): number | undefined => {
    if (typeof product.inStock === 'number') {
      return product.inStock;
    }

    return undefined;
  };

  const stockQuantity = getStockQuantity();

  return (
    <div className="space-y-6">
      {/* Product Title */}
      <Title
        name={product.name}
        category={getCategoryName()}
        sku={product.sku}
        inStock={product.inStock === true || (typeof product.inStock === 'number' && product.inStock > 0)}
      />

      {/* Product Badges */}
      <div className="flex flex-wrap gap-2">
        {product.tags && product.tags.map((tag: string) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
        {product.featured && (
          <Badge variant="default" className="bg-blue-600">
            New Arrival
          </Badge>
        )}
        {product.bestSeller && (
          <Badge variant="default" className="bg-purple-600">
            Bestseller
          </Badge>
        )}
        {product.discountPercentage && product.discountPercentage > 0 && (
          <Badge variant="destructive">
            Sale
          </Badge>
        )}
      </div>

      {/* Stock Alert */}
      {!product.inStock && (
        <Alert variant="error">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            This product is currently out of stock. Contact us for availability.
          </AlertDescription>
        </Alert>
      )}

      {product.inStock && stockQuantity && stockQuantity < 5 && (
        <Alert>
          <Info className="h-4 w-4 text-lomash-primary" />
          <AlertDescription>
            Only {stockQuantity} left in stock. Order soon!
          </AlertDescription>
        </Alert>
      )}

      <Separator />

      {/* Product Description */}
      <Description
        shortDescription={product.shortDescription}
        longDescription={product.description}
        features={product.featured ? ['Featured Product'] : undefined}
      />

      <Separator />

      {/* Color Selector */}
      {availableColors.length > 0 && (
        <ColorSelector
          colors={availableColors}
          selectedColor={selectedColor}
          onColorSelect={handleColorChange}
        />
      )}

      {/* Finish Selector */}
      {availableFinishes.length > 0 && (
        <FinishSelector
          finishes={availableFinishes}
          selectedFinish={selectedFinish}
          onFinishSelect={handleFinishChange}
        />
      )}

      <Separator />

      {/* Size Calculator */}
      {product.customizable && (
        <SizeCalculator
          minSize={{ width: 10, height: 10, depth: 10 }}
          maxSize={{ width: 500, height: 500, depth: 500 }}
          onSizeChange={handleSizeChange}
        />
      )}

      {/* Price Calculator */}
      {/* <PriceCalculator
        basePrice={product.price || 0}
        calculatedPrice={calculatedPrice}
        discount={getDiscount()}
        size={selectedSize}
        customizable={product.customizable}
      /> */}

      {/* Product Features Highlight */}
      {product.tags && product.tags.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Check className="h-5 w-5 text-green-600" />
              Key Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {product.tags.slice(0, 5).map((tag: string, index: number) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{tag}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Specifications Summary */}
      {specifications && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Package className="h-5 w-5" />
              Specifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {specifications.material && (
                <div>
                  <p className="text-xs text-muted-foreground">Material</p>
                  <p className="text-sm font-medium">{specifications.material}</p>
                </div>
              )}
              {dimensions && (
                <div>
                  <p className="text-xs text-muted-foreground">Dimensions</p>
                  <p className="text-sm font-medium">
                    {dimensions.width}W x{" "}
                    {dimensions.height}H x{" "}
                    {dimensions.depth}D cm
                  </p>
                </div>
              )}
              {specifications.warranty && (
                <div>
                  <p className="text-xs text-muted-foreground">Warranty</p>
                  <p className="text-sm font-medium">{specifications.warranty}</p>
                </div>
              )}
              {specifications.assembly && (
                <div>
                  <p className="text-xs text-muted-foreground">Assembly</p>
                  <p className="text-sm font-medium">{specifications.assembly}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Customization Info */}
      {product.customizable && (
        <Alert>
          <Ruler className="h-4 w-4" />
          <AlertDescription>
            This product can be customised to your exact requirements. Use the size
            calculator above to get an estimated price, or book a consultation for
            detailed planning.
          </AlertDescription>
        </Alert>
      )}

      {/* Delivery Information - Using a simple default message */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Package className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium">Delivery Information</p>
              <p className="text-sm text-muted-foreground mt-1">
                Contact us for delivery timeline and shipping options
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}