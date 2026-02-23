"use client";

import {
  Ruler,
  Palette,
  Package,
  Hammer,
  CheckCircle2,
  Info,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface Specification {
  label: string;
  value: string;
  icon?: React.ReactNode;
  tooltip?: string;
}

interface SpecificationGroup {
  title: string;
  icon: React.ReactNode;
  specs: Specification[];
}

interface Feature {
  name: string;
  description?: string;
}

interface ProductSpecsProps {
  dimensions?: {
    width?: string;
    height?: string;
    depth?: string;
    unit?: string;
  };
  material?: string;
  finish?: string[];
  colors?: string[];
  weight?: string;
  warranty?: string;
  installation?: string;
  careInstructions?: string[];
  features?: Feature[];
  customSpecs?: SpecificationGroup[];
  className?: string;
}

export default function ProductSpecs({
  dimensions,
  material,
  finish,
  colors,
  weight,
  warranty,
  installation,
  careInstructions,
  features,
  customSpecs,
  className,
}: ProductSpecsProps) {
  const specificationGroups: SpecificationGroup[] = [];

  // Dimensions
  if (dimensions) {
    const dimensionSpecs: Specification[] = [];
    if (dimensions.width) {
      dimensionSpecs.push({
        label: "Width",
        value: `${dimensions.width}${dimensions.unit || "mm"}`,
      });
    }
    if (dimensions.height) {
      dimensionSpecs.push({
        label: "Height",
        value: `${dimensions.height}${dimensions.unit || "mm"}`,
      });
    }
    if (dimensions.depth) {
      dimensionSpecs.push({
        label: "Depth",
        value: `${dimensions.depth}${dimensions.unit || "mm"}`,
      });
    }

    if (dimensionSpecs.length > 0) {
      specificationGroups.push({
        title: "Dimensions",
        icon: <Ruler className="h-5 w-5" />,
        specs: dimensionSpecs,
      });
    }
  }

  const materialSpecs: Specification[] = [];
  if (material) {
    materialSpecs.push({
      label: "Material",
      value: material,
    });
  }
  if (finish && finish.length > 0) {
    materialSpecs.push({
      label: "Available Finishes",
      value: finish.join(", "),
    });
  }
  if (colors && colors.length > 0) {
    materialSpecs.push({
      label: "Available Colors",
      value: `${colors.length} options`,
      tooltip: colors.join(", "),
    });
  }

  if (materialSpecs.length > 0) {
    specificationGroups.push({
      title: "Materials & Finish",
      icon: <Palette className="h-5 w-5" />,
      specs: materialSpecs,
    });
  }

  const detailSpecs: Specification[] = [];
  if (weight) {
    detailSpecs.push({
      label: "Weight",
      value: weight,
    });
  }
  if (warranty) {
    detailSpecs.push({
      label: "Warranty",
      value: warranty,
    });
  }
  if (installation) {
    detailSpecs.push({
      label: "Installation",
      value: installation,
    });
  }

  if (detailSpecs.length > 0) {
    specificationGroups.push({
      title: "Product Details",
      icon: <Package className="h-5 w-5" />,
      specs: detailSpecs,
    });
  }

  if (customSpecs && customSpecs.length > 0) {
    specificationGroups.push(...customSpecs);
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Specifications Table */}
      {specificationGroups.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              Product Specifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {specificationGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                {groupIndex > 0 && <Separator className="my-4" />}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 font-semibold text-foreground">
                    {group.icon}
                    <span>{group.title}</span>
                  </div>
                  <div className="space-y-2">
                    {group.specs.map((spec, specIndex) => (
                      <div
                        key={specIndex}
                        className="flex items-start justify-between gap-4 py-2"
                      >
                        <div className="flex items-center gap-2">
                          {spec.icon}
                          <span className="text-sm text-muted-foreground">
                            {spec.label}
                          </span>
                          {spec.tooltip && (
                            <span
                              className="relative group"
                              title={spec.tooltip}
                            >
                              <Info className="h-3 w-3 cursor-help text-muted-foreground" />
                            </span>
                          )}
                        </div>
                        <span className="text-sm font-medium">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Features */}
      {features && features.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Key Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <div className="flex-1">
                    <p className="font-medium">{feature.name}</p>
                    {feature.description && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Care Instructions */}
      {careInstructions && careInstructions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hammer className="h-5 w-5" />
              Care & Maintenance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {careInstructions.map((instruction, index) => (
                <li key={index} className="flex items-start gap-3 text-sm">
                  <span className="mt-1 flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  <span className="text-muted-foreground">{instruction}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Additional Information Accordion */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="shipping" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span className="font-medium">Shipping Information</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground">
            <div className="space-y-2 pt-2">
              <p>
                This product is made to order and typically ships within 4-6
                weeks.
              </p>
              <p>
                Delivery and installation services are available. Contact us for
                a quote.
              </p>
              <p>
                Free delivery for orders over £500 within 50 miles of our
                showrooms.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="returns" className="border rounded-lg px-4 mt-2">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              <span className="font-medium">Returns & Warranty</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground">
            <div className="space-y-2 pt-2">
              <p>
                All our products come with a manufacturer's warranty. Please
                refer to warranty documentation for specific terms.
              </p>
              <p>
                Custom-made items cannot be returned unless faulty or not as
                described.
              </p>
              <p>
                Contact our customer service team within 48 hours of delivery
                for any issues.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="customization"
          className="border rounded-lg px-4 mt-2"
        >
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span className="font-medium">Customization Options</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground">
            <div className="space-y-2 pt-2">
              <p>
                This product can be customized to your exact requirements.
              </p>
              <p>
                Choose from our range of colors, finishes, and size options.
              </p>
              <p>
                Book a free consultation to discuss your specific needs with our
                design experts.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}