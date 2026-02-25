"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useForm} from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/types/product.types";
import { formatCurrency } from "@/utils/formatters";
import Link from "next/link";

const quoteSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9+\s()-]+$/, "Invalid phone number format"),
  message: z.string().optional(),
  preferredContact: z.enum(["email", "phone", "both"]).default("both"),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

interface RequestQuoteProps {
  product: Product;
  selectedVariant?: {
    color?: string;
    finish?: string;
    price?: number;
  };
}

export default function RequestQuote({
  product,
  selectedVariant,
}: RequestQuoteProps) {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      preferredContact: "both",
    },
  });

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);

    try {
      const quoteRequest = {
        ...data,
        productId: product.id,
        productName: product.name,
        category: product.category,
        selectedColor: selectedVariant?.color,
        selectedFinish: selectedVariant?.finish,
        estimatedPrice: selectedVariant?.price || product.price,
        timestamp: new Date().toISOString(),
      };

      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quoteRequest),
      });

      if (!response.ok) {
        throw new Error("Failed to submit quote request");
      }

      toast({
        title: "Quote Request Sent!",
        description:
          "We've received your request and will get back to you within 24 hours.",
      });

      form.reset();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error submitting quote request:", error);
      toast({
        title: "Error",
        description:
          "Failed to submit quote request. Please try again or contact us directly.",
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getImageUrl = () => {
    const firstImage = product.images?.[0];
    if (typeof firstImage === 'string') {
      return firstImage;
    }
    return firstImage?.url || '';
  };

  const getCategoryName = () => {
    if (typeof product.category === 'string') {
      return product.category;
    }
    return product.category?.name || product.category?.slug || '';
  };

  return (
    <>
      {/* Request Quote Button */}
      <Button
        type="button"
        variant="outline"
        size="lg"
        className="w-full text-base font-semibold"
        onClick={() => setIsDialogOpen(true)}
      >
        <FileText className="h-5 w-5 mr-2" />
        Request a Quote
      </Button>

      {/* Quote Request Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Request a Quote</DialogTitle>
            <DialogDescription>
              Fill in your details and we'll send you a detailed quote within 24
              hours.
            </DialogDescription>
          </DialogHeader>

          {/* Product Summary */}
          <div className="p-4 bg-gray-50 rounded-lg border space-y-2">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm truncate">{product.name}</h4>
                <p className="text-xs text-muted-foreground">
                  {getCategoryName()}
                </p>
              </div>
              {product.images?.[0] && (
                <img
                  src={getImageUrl()}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded border"
                />
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {selectedVariant?.color && (
                <div>
                  <span className="text-muted-foreground">Color:</span>{" "}
                  <span className="font-medium">{selectedVariant.color}</span>
                </div>
              )}
              {selectedVariant?.finish && (
                <div>
                  <span className="text-muted-foreground">Finish:</span>{" "}
                  <span className="font-medium">{selectedVariant.finish}</span>
                </div>
              )}
            </div>

            <div className="pt-2 border-t">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Estimated Price:
                </span>
                <span className="font-semibold text-primary">
                  {formatCurrency(
                    selectedVariant?.price || product.price || 0
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Quote Request Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Field */}
              <FormField
                control={form.control as any}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control as any}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Field */}
              <FormField
                control={form.control as any}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="+91 98765 43210"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Message Field */}
              <FormField
                control={form.control as any}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Requirements (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your requirements, space dimensions, or any specific customizations..."
                        rows={4}
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Preferred Contact Method */}
              <FormField
                control={form.control as any}
                name="preferredContact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Contact Method</FormLabel>
                    <FormControl>
                      <div className="flex gap-3">
                        {[
                          { value: "email" as const, label: "Email" },
                          { value: "phone" as const, label: "Phone" },
                          { value: "both" as const, label: "Both" },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              type="radio"
                              value={option.value}
                              checked={field.value === option.value}
                              onChange={field.onChange}
                              disabled={isSubmitting}
                              className="cursor-pointer"
                            />
                            <span className="text-sm">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Form Actions */}
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsDialogOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Request
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>

          {/* Footer Note */}
          <div className="text-xs text-muted-foreground text-center pt-2 border-t">
            By submitting this form, you agree to our{" "}
            <Link href="/privacy-policy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            .
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}