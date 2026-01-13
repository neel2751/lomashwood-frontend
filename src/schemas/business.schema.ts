import { z } from "zod";

/**
 * Business Inquiry Schema
 * Validates form data for B2B inquiries, partnerships, and dealer applications
 */
export const businessInquirySchema = z.object({
  // Basic Information
  contactPerson: z
    .string()
    .min(2, "Contact person name must be at least 2 characters")
    .max(100, "Contact person name must be less than 100 characters")
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
    ),

  alternatePhone: z
    .string()
    .regex(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      "Please enter a valid phone number"
    )
    .optional()
    .or(z.literal("")),

  // Company Information
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(200, "Company name must be less than 200 characters"),

  companyWebsite: z
    .string()
    .url("Please enter a valid website URL")
    .optional()
    .or(z.literal("")),

  businessType: z.enum([
    "distributor",
    "dealer",
    "retailer",
    "contractor",
    "architect",
    "interior_designer",
    "furniture_manufacturer",
    "construction_company",
    "real_estate_developer",
    "other",
  ]),

  businessAge: z.enum([
    "startup",
    "1-3_years",
    "3-5_years",
    "5-10_years",
    "10+_years",
  ]),

  gstNumber: z
    .string()
    .regex(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
      "Please enter a valid GST number"
    )
    .optional()
    .or(z.literal("")),

  // Location Information
  city: z
    .string()
    .min(2, "City name must be at least 2 characters")
    .max(100, "City name must be less than 100 characters"),

  state: z
    .string()
    .min(2, "State name must be at least 2 characters")
    .max(100, "State name must be less than 100 characters"),

  pincode: z
    .string()
    .regex(/^[1-9][0-9]{5}$/, "Please enter a valid 6-digit pincode"),

  address: z
    .string()
    .min(10, "Address must be at least 10 characters")
    .max(500, "Address must be less than 500 characters"),

  // Business Details
  interestedProducts: z
    .array(z.string())
    .min(1, "Please select at least one product category"),

  estimatedMonthlyVolume: z.enum([
    "less_than_100",
    "100-500",
    "500-1000",
    "1000-5000",
    "5000+",
  ]),

  currentSuppliers: z
    .string()
    .max(500, "Current suppliers information must be less than 500 characters")
    .optional()
    .or(z.literal("")),

  // Requirements
  specificRequirements: z
    .string()
    .max(2000, "Requirements must be less than 2000 characters")
    .optional()
    .or(z.literal("")),

  preferredContactTime: z
    .enum(["morning", "afternoon", "evening", "anytime"])
    .default("anytime"),

  // Agreements
  termsAccepted: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),

  dataConsent: z.boolean().default(true),
});

/**
 * Dealer Application Schema
 * Extended schema for dealer/distributor applications
 */
export const dealerApplicationSchema = businessInquirySchema.extend({
  // Additional dealer-specific fields
  businessLicenseNumber: z
    .string()
    .min(5, "Business license number must be at least 5 characters")
    .optional()
    .or(z.literal("")),

  warehousingCapacity: z.enum([
    "none",
    "small",
    "medium",
    "large",
    "very_large",
  ]),

  deliveryFleet: z.enum([
    "none",
    "own_vehicles",
    "third_party",
    "both",
  ]),

  salesTeamSize: z
    .number()
    .int()
    .min(0, "Sales team size cannot be negative")
    .max(1000, "Please enter a valid team size"),

  showroomArea: z
    .number()
    .min(0, "Showroom area cannot be negative")
    .optional(),

  existingBrands: z
    .string()
    .max(500, "Existing brands information must be less than 500 characters")
    .optional()
    .or(z.literal("")),

  yearsInWoodIndustry: z
    .number()
    .int()
    .min(0, "Years of experience cannot be negative")
    .max(100, "Please enter a valid number of years"),

  references: z
    .string()
    .max(1000, "References must be less than 1000 characters")
    .optional()
    .or(z.literal("")),
});

/**
 * Quick Business Inquiry Schema
 * Simplified version for quick contact forms
 */
export const quickBusinessInquirySchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),

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
    ),

  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(200, "Company name must be less than 200 characters"),

  businessType: z.enum([
    "distributor",
    "dealer",
    "retailer",
    "contractor",
    "other",
  ]),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),

  termsAccepted: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
});

/**
 * Type exports for TypeScript
 */
export type BusinessInquiryInput = z.infer<typeof businessInquirySchema>;
export type DealerApplicationInput = z.infer<typeof dealerApplicationSchema>;
export type QuickBusinessInquiryInput = z.infer<typeof quickBusinessInquirySchema>;

/**
 * Business Type Options
 */
export const businessTypeOptions = [
  { value: "distributor", label: "Distributor" },
  { value: "dealer", label: "Dealer" },
  { value: "retailer", label: "Retailer" },
  { value: "contractor", label: "Contractor" },
  { value: "architect", label: "Architect" },
  { value: "interior_designer", label: "Interior Designer" },
  { value: "furniture_manufacturer", label: "Furniture Manufacturer" },
  { value: "construction_company", label: "Construction Company" },
  { value: "real_estate_developer", label: "Real Estate Developer" },
  { value: "other", label: "Other" },
] as const;

/**
 * Business Age Options
 */
export const businessAgeOptions = [
  { value: "startup", label: "Startup (Less than 1 year)" },
  { value: "1-3_years", label: "1-3 Years" },
  { value: "3-5_years", label: "3-5 Years" },
  { value: "5-10_years", label: "5-10 Years" },
  { value: "10+_years", label: "10+ Years" },
] as const;

/**
 * Monthly Volume Options
 */
export const monthlyVolumeOptions = [
  { value: "less_than_100", label: "Less than 100 sheets" },
  { value: "100-500", label: "100-500 sheets" },
  { value: "500-1000", label: "500-1,000 sheets" },
  { value: "1000-5000", label: "1,000-5,000 sheets" },
  { value: "5000+", label: "5,000+ sheets" },
] as const;

/**
 * Warehousing Capacity Options
 */
export const warehousingCapacityOptions = [
  { value: "none", label: "No Warehouse" },
  { value: "small", label: "Small (< 1,000 sq ft)" },
  { value: "medium", label: "Medium (1,000-5,000 sq ft)" },
  { value: "large", label: "Large (5,000-10,000 sq ft)" },
  { value: "very_large", label: "Very Large (> 10,000 sq ft)" },
] as const;

/**
 * Delivery Fleet Options
 */
export const deliveryFleetOptions = [
  { value: "none", label: "No Delivery Fleet" },
  { value: "own_vehicles", label: "Own Vehicles" },
  { value: "third_party", label: "Third Party Logistics" },
  { value: "both", label: "Both Own and Third Party" },
] as const;

/**
 * Preferred Contact Time Options
 */
export const contactTimeOptions = [
  { value: "morning", label: "Morning (9 AM - 12 PM)" },
  { value: "afternoon", label: "Afternoon (12 PM - 5 PM)" },
  { value: "evening", label: "Evening (5 PM - 8 PM)" },
  { value: "anytime", label: "Anytime" },
] as const;

/**
 * Default form values
 */
export const defaultBusinessInquiryValues: Partial<BusinessInquiryInput> = {
  contactPerson: "",
  email: "",
  phone: "",
  alternatePhone: "",
  companyName: "",
  companyWebsite: "",
  city: "",
  state: "",
  pincode: "",
  address: "",
  interestedProducts: [],
  currentSuppliers: "",
  specificRequirements: "",
  preferredContactTime: "anytime",
  termsAccepted: false,
  dataConsent: true,
};

export const defaultDealerApplicationValues: Partial<DealerApplicationInput> = {
  ...defaultBusinessInquiryValues,
  businessLicenseNumber: "",
  salesTeamSize: 0,
  showroomArea: 0,
  existingBrands: "",
  yearsInWoodIndustry: 0,
  references: "",
};

export const defaultQuickBusinessInquiryValues: Partial<QuickBusinessInquiryInput> = {
  name: "",
  email: "",
  phone: "",
  companyName: "",
  message: "",
  termsAccepted: false,
};