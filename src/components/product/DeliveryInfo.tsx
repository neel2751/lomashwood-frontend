"use client";

import {
  Truck,
  Package,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  Info,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface DeliveryOption {
  id: string;
  name: string;
  description: string;
  estimatedDays: string;
  price: number;
  icon?: React.ReactNode;
}

interface DeliveryInfoProps {
  productId?: string;
  isCustom?: boolean;
  productionTime?: string;
  deliveryOptions?: DeliveryOption[];
  freeDeliveryThreshold?: number;
  availableRegions?: string[];
  restrictions?: string[];
  className?: string;
}

export default function DeliveryInfo({
  isCustom = false,
  productionTime = "4-6 weeks",
  deliveryOptions = [
    {
      id: "standard",
      name: "Standard Delivery",
      description: "Delivery to your address",
      estimatedDays: "2-3 working days",
      price: 0,
    },
    {
      id: "express",
      name: "Express Delivery",
      description: "Next day delivery",
      estimatedDays: "1 working day",
      price: 49.99,
    },
    {
      id: "installation",
      name: "Delivery & Installation",
      description: "Professional installation included",
      estimatedDays: "2-5 working days",
      price: 149.99,
    },
  ],
  freeDeliveryThreshold = 500,
  availableRegions = ["England", "Scotland", "Wales"],
  restrictions,
  className,
}: DeliveryInfoProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Delivery Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Delivery Timeline
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isCustom && (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                This is a made-to-order product. Production time is approximately{" "}
                <strong>{productionTime}</strong> before shipping.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-3">
            {isCustom && (
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Package className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Production</p>
                  <p className="text-sm text-muted-foreground">
                    Your custom order will be crafted within {productionTime}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Truck className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Delivery</p>
                <p className="text-sm text-muted-foreground">
                  Standard delivery takes 2-3 working days after production
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Installation (Optional)</p>
                <p className="text-sm text-muted-foreground">
                  Professional installation can be arranged at checkout
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delivery Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Delivery Options
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {deliveryOptions.map((option, index) => (
            <div key={option.id}>
              {index > 0 && <Separator className="my-4" />}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{option.name}</p>
                    {option.price === 0 && (
                      <Badge variant="secondary" className="text-xs">
                        Free
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {option.description}
                  </p>
                  <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{option.estimatedDays}</span>
                  </div>
                </div>
                <div className="text-right">
                  {option.price > 0 ? (
                    <p className="font-semibold">£{option.price.toFixed(2)}</p>
                  ) : (
                    <p className="font-semibold text-primary">Free</p>
                  )}
                </div>
              </div>
            </div>
          ))}

          {freeDeliveryThreshold && (
            <Alert className="mt-4">
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                Free standard delivery on orders over £{freeDeliveryThreshold}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Delivery Coverage */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Delivery Coverage
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="mb-2 text-sm font-medium">We deliver to:</p>
            <div className="flex flex-wrap gap-2">
              {availableRegions.map((region) => (
                <Badge key={region} variant="outline">
                  {region}
                </Badge>
              ))}
            </div>
          </div>

          {restrictions && restrictions.length > 0 && (
            <>
              <Separator />
              <Alert variant="error">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <p className="mb-2 font-medium">Delivery Restrictions:</p>
                  <ul className="list-inside list-disc space-y-1 text-sm">
                    {restrictions.map((restriction, index) => (
                      <li key={index}>{restriction}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            </>
          )}

          <div className="rounded-lg bg-muted p-4">
            <p className="mb-2 text-sm font-medium">
              Special Delivery Requirements?
            </p>
            <p className="text-sm text-muted-foreground">
              For deliveries to remote areas, upper floors without lift access,
              or other special requirements, please contact us for a custom quote.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Accordion */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="tracking" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span className="font-medium">How do I track my delivery?</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground">
            <div className="space-y-2 pt-2">
              <p>
                Once your order has been dispatched, you'll receive a tracking
                number via email and SMS.
              </p>
              <p>
                You can track your delivery in real-time through our delivery
                partner's website or app.
              </p>
              <p>
                For made-to-order items, we'll keep you updated on the production
                progress before dispatch.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="missed" className="border rounded-lg px-4 mt-2">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="font-medium">What if I miss my delivery?</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground">
            <div className="space-y-2 pt-2">
              <p>
                Our delivery partner will leave a card with instructions on how to
                rearrange delivery.
              </p>
              <p>
                You can usually reschedule online or by phone, choosing a new
                delivery slot that suits you.
              </p>
              <p>
                Alternatively, you can arrange to collect your order from a local
                depot.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="installation" className="border rounded-lg px-4 mt-2">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span className="font-medium">
                What's included in the installation service?
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground">
            <div className="space-y-2 pt-2">
              <p>
                Our professional installation service includes full assembly and
                installation of your furniture.
              </p>
              <p>
                The installation team will ensure everything is fitted correctly
                and to your satisfaction.
              </p>
              <p>
                All packaging materials will be removed and recycled responsibly.
              </p>
              <p className="font-medium text-foreground">
                Note: Installation does not include removal of existing furniture
                or modifications to your property.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="damage" className="border rounded-lg px-4 mt-2">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              <span className="font-medium">
                What if my delivery arrives damaged?
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground">
            <div className="space-y-2 pt-2">
              <p>
                Please inspect your delivery immediately upon arrival. If you notice
                any damage, note it on the delivery receipt.
              </p>
              <p>
                Contact our customer service team within 48 hours with photos of
                the damage.
              </p>
              <p>
                We'll arrange a replacement or collection free of charge. Your
                satisfaction is our priority.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Contact Information */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <p className="font-medium">Need help with your delivery?</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
              <Button variant="outline" className="gap-2" asChild>
                <a href="tel:+441234567890">
                  <Phone className="h-4 w-4" />
                  Call Us
                </a>
              </Button>
              <Button variant="outline" className="gap-2" asChild>
                <a href="mailto:delivery@lomashwood.com">
                  <Mail className="h-4 w-4" />
                  Email Support
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}