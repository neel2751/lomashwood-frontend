"use client";

import { Ruler, RotateCcw, Info } from "lucide-react";
import { useState, useEffect } from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface Size {
  width: number;
  height: number;
  depth: number;
}

interface SizeCalculatorProps {
  minSize?: Size;
  maxSize?: Size;
  onSizeChange: (size: Size) => void;
  defaultSize?: Size;
}

export default function SizeCalculator({
  minSize = { width: 60, height: 60, depth: 30 },
  maxSize = { width: 400, height: 300, depth: 100 },
  onSizeChange,
  defaultSize,
}: SizeCalculatorProps) {
  const [size, setSize] = useState<Size>(
    defaultSize || {
      width: minSize.width,
      height: minSize.height,
      depth: minSize.depth,
    }
  );

  const [errors, setErrors] = useState<Partial<Record<keyof Size, string>>>({});

  const validateSize = (dimension: keyof Size, value: number): string | null => {
    const min = minSize[dimension];
    const max = maxSize[dimension];

    if (isNaN(value) || value === 0) {
      return "Please enter a valid number";
    }

    if (value < min) {
      return `Minimum ${dimension} is ${min}cm`;
    }

    if (value > max) {
      return `Maximum ${dimension} is ${max}cm`;
    }

    return null;
  };

  const handleSizeChange = (dimension: keyof Size, value: string) => {
    const numValue = parseFloat(value) || 0;
    const error = validateSize(dimension, numValue);

    setErrors((prev) => ({
      ...prev,
      [dimension]: error || undefined,
    }));

    const newSize = {
      ...size,
      [dimension]: numValue,
    };

    setSize(newSize);
  };

  useEffect(() => {
    const hasErrors = Object.values(errors).some((error) => error);
    if (!hasErrors && (size.width > 0 || size.height > 0 || size.depth > 0)) {
      onSizeChange(size);
    }
  }, [size, errors, onSizeChange]);

  const handleReset = () => {
    const resetSize = defaultSize || {
      width: minSize.width,
      height: minSize.height,
      depth: minSize.depth,
    };
    setSize(resetSize);
    setErrors({});
  };

  const area = (size.width * size.height) / 10000; 
  const volume = (size.width * size.height * size.depth) / 1000000; 

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Ruler className="h-5 w-5" />
          Custom Size Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Size Alert */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription className="text-xs">
            Enter your desired dimensions. All measurements are in centimeters (cm).
          </AlertDescription>
        </Alert>

        {/* Width Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="width" className="text-sm font-medium block">
              Width (cm)
            </label>
            <div className="relative group">
              <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
              {/* CSS-based tooltip */}
              <div className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                Range: {minSize.width}cm - {maxSize.width}cm
                <div className="absolute top-full right-2 border-4 border-transparent border-t-gray-900" />
              </div>
            </div>
          </div>
          <Input
            id="width"
            type="number"
            min={minSize.width}
            max={maxSize.width}
            step="1"
            value={size.width || ""}
            onChange={(e) => handleSizeChange("width", e.target.value)}
            className={errors.width ? "border-red-500" : ""}
            placeholder={`${minSize.width} - ${maxSize.width}`}
          />
          {errors.width && (
            <p className="text-xs text-red-500">{errors.width}</p>
          )}
        </div>

        {/* Height Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="height" className="text-sm font-medium block">
              Height (cm)
            </label>
            <div className="relative group">
              <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
              {/* CSS-based tooltip */}
              <div className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                Range: {minSize.height}cm - {maxSize.height}cm
                <div className="absolute top-full right-2 border-4 border-transparent border-t-gray-900" />
              </div>
            </div>
          </div>
          <Input
            id="height"
            type="number"
            min={minSize.height}
            max={maxSize.height}
            step="1"
            value={size.height || ""}
            onChange={(e) => handleSizeChange("height", e.target.value)}
            className={errors.height ? "border-red-500" : ""}
            placeholder={`${minSize.height} - ${maxSize.height}`}
          />
          {errors.height && (
            <p className="text-xs text-red-500">{errors.height}</p>
          )}
        </div>

        {/* Depth Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="depth" className="text-sm font-medium block">
              Depth (cm)
            </label>
            <div className="relative group">
              <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
              {/* CSS-based tooltip */}
              <div className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                Range: {minSize.depth}cm - {maxSize.depth}cm
                <div className="absolute top-full right-2 border-4 border-transparent border-t-gray-900" />
              </div>
            </div>
          </div>
          <Input
            id="depth"
            type="number"
            min={minSize.depth}
            max={maxSize.depth}
            step="1"
            value={size.depth || ""}
            onChange={(e) => handleSizeChange("depth", e.target.value)}
            className={errors.depth ? "border-red-500" : ""}
            placeholder={`${minSize.depth} - ${maxSize.depth}`}
          />
          {errors.depth && (
            <p className="text-xs text-red-500">{errors.depth}</p>
          )}
        </div>

        {/* Size Summary */}
        {size.width > 0 && size.height > 0 && size.depth > 0 && (
          <div className="pt-2 space-y-2 border-t">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground text-xs">Total Area</p>
                <p className="font-semibold">{area.toFixed(2)} m²</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Total Volume</p>
                <p className="font-semibold">{volume.toFixed(3)} m³</p>
              </div>
            </div>
            <div className="pt-2">
              <p className="text-xs text-muted-foreground">
                Dimensions: {size.width}W × {size.height}H × {size.depth}D cm
              </p>
            </div>
          </div>
        )}

        {/* Reset Button */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="w-full"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset to Default
        </Button>

        {/* Additional Info */}
        <Alert variant="default" className="bg-blue-50 border-blue-200">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-xs text-blue-900">
            Our team will verify these measurements during the consultation to ensure
            perfect fit and finish.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}