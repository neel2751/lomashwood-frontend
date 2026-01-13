import { z } from "zod";

/**
 * Brochure Request Schema
 * Validates form data for brochure download requests
 */
export const brochureRequestSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),

  email: z
    .string()
    .email("Please enter a valid email address")
    .toLowerCase()
    .trim(),

  phone: z
    .string()
    .regex(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      "Please enter a valid phone number"
    )
    .optional()
    .or(z.literal("")),

  company: z
    .string()
    .max(200, "Company name must be less than 200 characters")
    .optional()
    .or(z.literal("")),

  industry: z
    .enum([
      "construction",
      "interior_design",
      "architecture",
      "furniture_manufacturing",
      "real_estate",
      "hospitality",
      "retail",
      "other",
    ])
    .optional(),

  message: z
    .string()
    .max(1000, "Message must be less than 1000 characters")
    .optional()
    .or(z.literal("")),

  interestedProducts: z
    .array(z.string())
    .optional()
    .default([]),

  marketingConsent: z.boolean().default(false),

  termsAccepted: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
});

/**
 * Quick Brochure Request Schema (Simplified version)
 * For quick download modals with minimal fields
 */
export const quickBrochureRequestSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .toLowerCase()
    .trim(),

  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),

  termsAccepted: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
});

/**
 * Brochure Type Enum
 */
export const brochureTypeSchema = z.enum([
  "general_catalog",
  "plywood_catalog",
  "blockboard_catalog",
  "flush_door_catalog",
  "product_specific",
  "price_list",
]);

/**
 * Type exports for TypeScript
 */
export type BrochureRequestInput = z.infer<typeof brochureRequestSchema>;
export type QuickBrochureRequestInput = z.infer<typeof quickBrochureRequestSchema>;
export type BrochureType = z.infer<typeof brochureTypeSchema>;

/**
 * Industry options for dropdown
 */
export const industryOptions = [
  { value: "construction", label: "Construction" },
  { value: "interior_design", label: "Interior Design" },
  { value: "architecture", label: "Architecture" },
  { value: "furniture_manufacturing", label: "Furniture Manufacturing" },
  { value: "real_estate", label: "Real Estate" },
  { value: "hospitality", label: "Hospitality" },
  { value: "retail", label: "Retail" },
  { value: "other", label: "Other" },
] as const;

/**
 * Default form values
 */
export const defaultBrochureFormValues: Partial<BrochureRequestInput> = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
  interestedProducts: [],
  marketingConsent: false,
  termsAccepted: false,
};

export const defaultQuickBrochureFormValues: Partial<QuickBrochureRequestInput> = {
  name: "",
  email: "",
  termsAccepted: false,
};