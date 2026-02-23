"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Mail, CheckCircle2, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to receive newsletters",
  }),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

interface NewsletterFormProps {
  variant?: "default" | "inline" | "footer";
  showBenefits?: boolean;
  onSuccess?: () => void;
  className?: string;
}

export default function NewsletterForm({
  variant = "default",
  showBenefits = false,
  onSuccess,
  className = "",
}: NewsletterFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
      consent: false,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: NewsletterFormData) => {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to subscribe to newsletter");
      }

      return response.json();
    },
    onSuccess: (_data) => {
      setIsSuccess(true);
      toast({
        title: "Successfully Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });

      if (onSuccess) {
        onSuccess();
      }

      setTimeout(() => {
        form.reset();
        setIsSuccess(false);
      }, 3000);
    },
    onError: (error: Error) => {
      toast({
        title: "Subscription Failed",
        description: error.message || "Please try again later.",
        variant: "error",
      });
    },
  });

  const onSubmit = (data: NewsletterFormData) => {
    mutation.mutate(data);
  };

  if (variant === "inline") {
    return (
      <div className={className}>
        {isSuccess ? (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle2 className="h-5 w-5" />
            <span className="text-sm font-medium">Successfully subscribed!</span>
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex items-center gap-2"
            >
              <FormField
                control={form.control as any}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                        disabled={mutation.isPending}
                        className="h-10"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                size="sm"
                disabled={mutation.isPending}
                className="h-10"
              >
                {mutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Subscribe"
                )}
              </Button>
            </form>
          </Form>
        )}
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <div className={className}>
        {isSuccess ? (
          <div className="flex items-center gap-2 text-green-600 p-3 bg-green-50 rounded-md">
            <CheckCircle2 className="h-5 w-5" />
            <span className="text-sm font-medium">
              Thanks for subscribing!
            </span>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control as any}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input
                          type="email"
                          placeholder="Your email address"
                          {...field}
                          disabled={mutation.isPending}
                          className="flex-1"
                        />
                        <Button
                          type="submit"
                          disabled={mutation.isPending}
                          size="icon"
                        >
                          {mutation.isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Mail className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control as any}
                name="consent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={mutation.isPending}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <label className="text-xs text-gray-400 cursor-pointer">
                        I agree to receive marketing emails
                      </label>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      {isSuccess ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="rounded-full bg-green-100 p-3 mb-4">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Welcome to Our Newsletter!
          </h3>
          <p className="text-gray-600 text-center max-w-md">
            Thank you for subscribing. You'll receive our latest updates,
            exclusive offers, and design inspiration straight to your inbox.
          </p>
        </div>
      ) : (
        <>
          {showBenefits && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Gift className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Subscribe to Our Newsletter
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Join thousands of subscribers and get exclusive access to:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Early access to new collections and sale events</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Exclusive subscriber-only discounts and offers</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Design tips and inspiration from our experts</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Latest trends in kitchen and bedroom design</span>
                </li>
              </ul>
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control as any}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          type="email"
                          placeholder="Enter your email address"
                          {...field}
                          disabled={mutation.isPending}
                          className="pl-10 h-12"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control as any}
                name="consent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={mutation.isPending}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <label className="text-sm text-gray-600 cursor-pointer">
                        I agree to receive marketing communications from Lomash
                        Wood. You can unsubscribe at any time. {" "}
                        
                          href="/privacy-policy"
                          className="text-primary hover:underline"
                          target="_blank"
                        
                          Privacy Policy
                      </label>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-5 w-5" />
                    Subscribe Now
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-gray-500">
                We respect your privacy. No spam, unsubscribe anytime.
              </p>
            </form>
          </Form>

          {showBenefits && (
            <div className="mt-6 pt-6 border-t">
              <div className="flex items-center justify-center gap-8 text-center">
                <div>
                  <p className="text-2xl font-bold text-gray-900">50K+</p>
                  <p className="text-xs text-gray-600">Subscribers</p>
                </div>
                <div className="h-12 w-px bg-gray-200" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">Weekly</p>
                  <p className="text-xs text-gray-600">Updates</p>
                </div>
                <div className="h-12 w-px bg-gray-200" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">4.9★</p>
                  <p className="text-xs text-gray-600">Rated Content</p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}