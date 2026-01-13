import { z } from "zod";

// Common validation rules
const phoneRegex = /^(\+91|91)?[6-9]\d{9}$/;
const pincodeRegex = /^[1-9][0-9]{5}$/;
const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

// Contact Form Validation
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .toLowerCase(),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must not exceed 15 digits")
    .regex(phoneRegex, "Please enter a valid Indian phone number")
    .optional()
    .or(z.literal("")),
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters")
    .max(200, "Subject must not exceed 200 characters")
    .optional(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must not exceed 1000 characters"),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Quote Request Validation
export const quoteRequestSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  email: z.string().email("Please enter a valid email address").toLowerCase(),
  phone: z
    .string()
    .regex(phoneRegex, "Please enter a valid Indian phone number")
    .min(10, "Phone number is required"),
  company: z
    .string()
    .max(200, "Company name must not exceed 200 characters")
    .optional()
    .or(z.literal("")),
  productType: z
    .string()
    .min(1, "Please select a product type")
    .max(100, "Product type must not exceed 100 characters"),
  quantity: z
    .number()
    .int("Quantity must be a whole number")
    .positive("Quantity must be positive")
    .min(1, "Minimum quantity is 1")
    .max(10000, "Maximum quantity is 10000")
    .optional(),
  specifications: z
    .string()
    .max(2000, "Specifications must not exceed 2000 characters")
    .optional()
    .or(z.literal("")),
  deliveryDate: z.string().optional(),
  address: z
    .string()
    .max(500, "Address must not exceed 500 characters")
    .optional()
    .or(z.literal("")),
  city: z
    .string()
    .max(100, "City name must not exceed 100 characters")
    .optional()
    .or(z.literal("")),
  state: z
    .string()
    .max(100, "State name must not exceed 100 characters")
    .optional()
    .or(z.literal("")),
  pincode: z
    .string()
    .regex(pincodeRegex, "Please enter a valid 6-digit pincode")
    .optional()
    .or(z.literal("")),
  additionalNotes: z
    .string()
    .max(1000, "Additional notes must not exceed 1000 characters")
    .optional()
    .or(z.literal("")),
});

export type QuoteRequestData = z.infer<typeof quoteRequestSchema>;

// Newsletter Subscription Validation
export const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .toLowerCase(),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters")
    .optional()
    .or(z.literal("")),
});

export type NewsletterData = z.infer<typeof newsletterSchema>;

// Product Review Validation
export const productReviewSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  email: z.string().email("Please enter a valid email address").toLowerCase(),
  rating: z
    .number()
    .int("Rating must be a whole number")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must not exceed 5"),
  title: z
    .string()
    .min(5, "Review title must be at least 5 characters")
    .max(100, "Review title must not exceed 100 characters"),
  comment: z
    .string()
    .min(10, "Review must be at least 10 characters")
    .max(1000, "Review must not exceed 1000 characters"),
  recommend: z.boolean(),
});

export type ProductReviewData = z.infer<typeof productReviewSchema>;

// Address Validation
export const addressSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must not exceed 100 characters"),
  phone: z.string().regex(phoneRegex, "Please enter a valid Indian phone number"),
  email: z.string().email("Please enter a valid email address").toLowerCase().optional(),
  addressLine1: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address must not exceed 200 characters"),
  addressLine2: z
    .string()
    .max(200, "Address must not exceed 200 characters")
    .optional()
    .or(z.literal("")),
  landmark: z
    .string()
    .max(100, "Landmark must not exceed 100 characters")
    .optional()
    .or(z.literal("")),
  city: z
    .string()
    .min(2, "City name must be at least 2 characters")
    .max(100, "City name must not exceed 100 characters"),
  state: z
    .string()
    .min(2, "State name must be at least 2 characters")
    .max(100, "State name must not exceed 100 characters"),
  pincode: z.string().regex(pincodeRegex, "Please enter a valid 6-digit pincode"),
  country: z.string().default("India"),
  isDefault: z.boolean().optional().default(false),
  addressType: z.enum(["home", "office", "other"]).optional().default("home"),
});

export type AddressData = z.infer<typeof addressSchema>;

// Search Validation
export const searchSchema = z.object({
  query: z
    .string()
    .min(1, "Search query is required")
    .max(200, "Search query must not exceed 200 characters")
    .trim(),
  category: z.string().optional(),
  minPrice: z.number().min(0, "Minimum price must be 0 or greater").optional(),
  maxPrice: z.number().min(0, "Maximum price must be 0 or greater").optional(),
  sortBy: z.enum(["relevance", "price-low", "price-high", "newest", "popular"]).optional(),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
});

export type SearchData = z.infer<typeof searchSchema>;

// Business Inquiry Validation
export const businessInquirySchema = z.object({
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(200, "Company name must not exceed 200 characters"),
  contactPerson: z
    .string()
    .min(2, "Contact person name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  email: z.string().email("Please enter a valid email address").toLowerCase(),
  phone: z.string().regex(phoneRegex, "Please enter a valid Indian phone number"),
  website: z
    .string()
    .url("Please enter a valid website URL")
    .optional()
    .or(z.literal("")),
  businessType: z
    .string()
    .min(1, "Please select a business type")
    .max(100, "Business type must not exceed 100 characters"),
  gstNumber: z
    .string()
    .regex(gstRegex, "Please enter a valid GST number")
    .optional()
    .or(z.literal("")),
  estimatedOrderValue: z
    .string()
    .max(50, "Estimated order value must not exceed 50 characters")
    .optional()
    .or(z.literal("")),
  requirements: z
    .string()
    .min(20, "Requirements must be at least 20 characters")
    .max(2000, "Requirements must not exceed 2000 characters"),
  preferredContactMethod: z.enum(["email", "phone", "whatsapp"]).optional().default("email"),
});

export type BusinessInquiryData = z.infer<typeof businessInquirySchema>;

// Bulk Order Validation
export const bulkOrderSchema = z.object({
  companyName: z.string().min(2, "Company name is required").max(200),
  contactPerson: z.string().min(2, "Contact person name is required").max(100),
  email: z.string().email("Please enter a valid email address").toLowerCase(),
  phone: z.string().regex(phoneRegex, "Please enter a valid Indian phone number"),
  productCategory: z.string().min(1, "Please select a product category"),
  quantity: z
    .number()
    .int()
    .min(50, "Minimum quantity for bulk orders is 50")
    .max(100000, "Maximum quantity is 100000"),
  deliveryLocation: z.string().min(5, "Delivery location is required").max(500),
  expectedDeliveryDate: z.string().optional(),
  specifications: z.string().max(5000, "Specifications must not exceed 5000 characters").optional(),
  gstNumber: z
    .string()
    .regex(gstRegex, "Please enter a valid GST number")
    .optional()
    .or(z.literal("")),
  panNumber: z
    .string()
    .regex(panRegex, "Please enter a valid PAN number")
    .optional()
    .or(z.literal("")),
});

export type BulkOrderData = z.infer<typeof bulkOrderSchema>;

// Custom Order Validation
export const customOrderSchema = z.object({
  name: z.string().min(2, "Name is required").max(100),
  email: z.string().email("Please enter a valid email address").toLowerCase(),
  phone: z.string().regex(phoneRegex, "Please enter a valid Indian phone number"),
  productType: z.string().min(1, "Please specify the product type"),
  dimensions: z.object({
    length: z.number().positive("Length must be positive").optional(),
    width: z.number().positive("Width must be positive").optional(),
    height: z.number().positive("Height must be positive").optional(),
    unit: z.enum(["inches", "feet", "cm", "meters"]).default("inches"),
  }).optional(),
  material: z.string().max(100, "Material must not exceed 100 characters").optional(),
  finish: z.string().max(100, "Finish must not exceed 100 characters").optional(),
  color: z.string().max(50, "Color must not exceed 50 characters").optional(),
  quantity: z.number().int().positive("Quantity must be positive").min(1).max(1000),
  budget: z.string().max(50, "Budget must not exceed 50 characters").optional(),
  designDescription: z
    .string()
    .min(20, "Please provide detailed design description")
    .max(3000, "Design description must not exceed 3000 characters"),
  referenceImages: z.array(z.string()).max(5, "Maximum 5 reference images allowed").optional(),
  urgency: z.enum(["standard", "urgent", "rush"]).default("standard"),
  additionalRequirements: z.string().max(1000).optional(),
});

export type CustomOrderData = z.infer<typeof customOrderSchema>;

// Feedback Validation
export const feedbackSchema = z.object({
  name: z
    .string()
    .min(2, "Name is required")
    .max(100, "Name must not exceed 100 characters")
    .optional(),
  email: z.string().email("Please enter a valid email address").toLowerCase(),
  category: z.enum([
    "product",
    "service",
    "website",
    "delivery",
    "support",
    "suggestion",
    "complaint",
    "other",
  ]),
  rating: z.number().int().min(1, "Rating must be at least 1").max(5, "Rating must not exceed 5"),
  subject: z.string().min(3, "Subject is required").max(200),
  feedback: z
    .string()
    .min(10, "Feedback must be at least 10 characters")
    .max(2000, "Feedback must not exceed 2000 characters"),
  attachments: z.array(z.string()).max(3, "Maximum 3 attachments allowed").optional(),
});

export type FeedbackData = z.infer<typeof feedbackSchema>;

// Waitlist/Notify Me Validation
export const notifyMeSchema = z.object({
  email: z.string().email("Please enter a valid email address").toLowerCase(),
  productId: z.string().min(1, "Product ID is required"),
  phone: z
    .string()
    .regex(phoneRegex, "Please enter a valid Indian phone number")
    .optional()
    .or(z.literal("")),
  notifyBy: z.enum(["email", "sms", "both"]).default("email"),
});

export type NotifyMeData = z.infer<typeof notifyMeSchema>;

// Career Application Validation
export const careerApplicationSchema = z.object({
  fullName: z.string().min(2, "Full name is required").max(100),
  email: z.string().email("Please enter a valid email address").toLowerCase(),
  phone: z.string().regex(phoneRegex, "Please enter a valid Indian phone number"),
  position: z.string().min(1, "Please select a position"),
  experience: z.number().min(0, "Experience cannot be negative").max(50),
  currentCompany: z.string().max(200).optional().or(z.literal("")),
  currentSalary: z.string().max(50).optional().or(z.literal("")),
  expectedSalary: z.string().max(50).optional().or(z.literal("")),
  noticePeriod: z.string().max(50).optional().or(z.literal("")),
  qualification: z.string().max(200),
  skills: z.string().max(500),
  linkedinProfile: z
    .string()
    .url("Please enter a valid LinkedIn URL")
    .optional()
    .or(z.literal("")),
  portfolio: z.string().url("Please enter a valid portfolio URL").optional().or(z.literal("")),
  resumeUrl: z.string().url("Resume URL is required"),
  coverLetter: z.string().max(2000).optional().or(z.literal("")),
});

export type CareerApplicationData = z.infer<typeof careerApplicationSchema>;

// Validation helper functions
export function validateEmail(email: string): boolean {
  return z.string().email().safeParse(email).success;
}

export function validatePhone(phone: string): boolean {
  return phoneRegex.test(phone);
}

export function validatePincode(pincode: string): boolean {
  return pincodeRegex.test(pincode);
}

export function validateGST(gst: string): boolean {
  return gstRegex.test(gst);
}

export function validatePAN(pan: string): boolean {
  return panRegex.test(pan);
}

// Sanitization helpers
export function sanitizeString(input: string): string {
  return input.trim().replace(/\s+/g, " ");
}

export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

export function sanitizePhone(phone: string): string {
  return phone.replace(/\D/g, ""); // Remove all non-digit characters
}

// Format helpers
export function formatPhone(phone: string): string {
  const cleaned = sanitizePhone(phone);
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return cleaned;
}

export function formatPincode(pincode: string): string {
  return pincode.replace(/\D/g, "").slice(0, 6);
}

// Custom error messages
export const errorMessages = {
  required: "This field is required",
  invalidEmail: "Please enter a valid email address",
  invalidPhone: "Please enter a valid phone number",
  invalidPincode: "Please enter a valid 6-digit pincode",
  invalidGST: "Please enter a valid GST number",
  invalidPAN: "Please enter a valid PAN number",
  minLength: (min: number) => `Must be at least ${min} characters`,
  maxLength: (max: number) => `Must not exceed ${max} characters`,
  minValue: (min: number) => `Must be at least ${min}`,
  maxValue: (max: number) => `Must not exceed ${max}`,
  network: "Network error. Please try again",
  server: "Server error. Please try again later",
  unknown: "An unexpected error occurred",
};