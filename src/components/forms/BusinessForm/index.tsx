"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Download, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

const brochureRequestSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "First name can only contain letters"),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Last name can only contain letters"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be less than 15 digits")
    .regex(
      /^[\d\s\-+()]+$/,
      "Phone number can only contain digits, spaces, and +-()"
    ),

  postcode: z
    .string()
    .min(1, "Postcode is required")
    .min(4, "Postcode must be at least 4 characters")
    .max(10, "Postcode must be less than 10 characters")
    .regex(/^[a-zA-Z0-9\s]+$/, "Please enter a valid postcode"),

  interest: z.enum(["kitchen", "bedroom", "both"], {
    required_error: "Please select your area of interest",
  }),

  marketingConsent: z.boolean().default(false),
});

type BrochureFormData = z.infer<typeof brochureRequestSchema>;

interface BrochureFormProps {
  onSuccess?: () => void;
  defaultInterest?: "kitchen" | "bedroom" | "both";
  className?: string;
}

export default function BrochureForm({
  onSuccess,
  defaultInterest = "both",
  className = "",
}: BrochureFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<BrochureFormData>({
    resolver: zodResolver(brochureRequestSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      postcode: "",
      interest: defaultInterest,
      marketingConsent: false,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: BrochureFormData) => {
      const response = await fetch("/api/brochure", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to request brochure");
      }

      return response.json();
    },
    onSuccess: () => {
      setIsSuccess(true);
      toast({
        title: "Request Successful!",
        description: "Your brochure will be sent to your email shortly.",
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
        title: "Request Failed",
        description: error.message || "Please try again later.",
        variant: "error",
      });
    },
  });

  const onSubmit: SubmitHandler<BrochureFormData> = (data) => {
    mutation.mutate(data);
  };

  if (isSuccess) {
    return (
      <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
        <div className="rounded-full bg-green-100 p-3 mb-4">
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          Request Received!
        </h3>
        <p className="text-gray-600 text-center max-w-md">
          Thank you for your interest. Your brochure will be sent to your email
          within the next few minutes.
        </p>
        <p className="text-sm text-gray-500 mt-4">
          Check your inbox and spam folder.
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Download Our Brochure
        </h2>
        <p className="text-gray-600">
          Fill in your details below and we'll send you our latest brochure
          featuring our complete kitchen and bedroom collections.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control as any}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    First Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John"
                      {...field}
                      disabled={mutation.isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control as any}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Last Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Doe"
                      {...field}
                      disabled={mutation.isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Email Field */}
          <FormField
            control={form.control as any}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email Address <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john.doe@example.com"
                    {...field}
                    disabled={mutation.isPending}
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
                <FormLabel>
                  Phone Number <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="+91 98765 43210"
                    {...field}
                    disabled={mutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Postcode Field */}
          <FormField
            control={form.control as any}
            name="postcode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Postcode <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="380054"
                    {...field}
                    disabled={mutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Interest Field */}
          <FormField
            control={form.control as any}
            name="interest"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  I'm Interested In <span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={mutation.isPending}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your interest" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="kitchen">Kitchen</SelectItem>
                    <SelectItem value="bedroom">Bedroom</SelectItem>
                    <SelectItem value="both">Both Kitchen & Bedroom</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Marketing Consent */}
          <FormField
            control={form.control as any}
            name="marketingConsent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={mutation.isPending}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-normal cursor-pointer">
                    I would like to receive marketing communications from Lomash
                    Wood about products, services, and special offers.
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          {/* Privacy Notice */}
          <div className="text-xs text-gray-500 bg-gray-50 p-4 rounded-md">
            <p className="mb-2">
              By submitting this form, you agree to our{" "}
              <a
                href="/privacy-policy"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="/terms-conditions"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms & Conditions
              </a>
            </p>

            <p>
              We respect your privacy and will never share your information with
              third parties. You can unsubscribe at any time.
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Sending Request...
              </>
            ) : (
              <>
                <Download className="mr-2 h-5 w-5" />
                Request Brochure
              </>
            )}
          </Button>

          {/* Success Message */}
          {mutation.isSuccess && (
            <div className="rounded-md bg-green-50 p-4 border border-green-200">
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                <p className="text-sm text-green-800">
                  Request submitted successfully! Check your email.
                </p>
              </div>
            </div>
          )}
        </form>
      </Form>

      {/* Additional Information */}
      <div className="mt-8 pt-8 border-t">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          What You'll Receive
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-gray-600">
              Complete kitchen and bedroom collections with prices
            </span>
          </li>
          <li className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-gray-600">
              Design inspiration and style guides
            </span>
          </li>
          <li className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-gray-600">
              Information about our finance options
            </span>
          </li>
          <li className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-gray-600">
              Details of our showroom locations
            </span>
          </li>
          <li className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-gray-600">
              Special offers and package deals
            </span>
          </li>
        </ul>
      </div>

      {/* Help Section */}
      <div className="mt-6 rounded-lg bg-blue-50 p-6 border border-blue-100">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">
          Need Help?
        </h4>
        <p className="text-sm text-gray-600 mb-3">
          Our friendly team is here to answer any questions you may have.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" size="sm" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="tel:01708898755">Call: 01708 898 755</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}