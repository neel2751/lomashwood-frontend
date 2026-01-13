import { z } from "zod";

// Common validation patterns
const phoneRegex = /^[6-9]\d{9}$/;
const pincodeRegex = /^[1-9][0-9]{5}$/;

// Contact Subjects/Topics
export const contactSubjects = [
  "general_inquiry",
  "product_inquiry",
  "order_status",
  "customization_request",
  "technical_support",
  "complaint",
  "feedback",
  "partnership",
  "media_inquiry",
  "career_inquiry",
  "other",
] as const;

// Contact Priorities
export const contactPriorities = ["low", "medium", "high", "urgent"] as const;

// Preferred Contact Methods
export const contactMethods = ["email", "phone", "whatsapp", "any"] as const;

// General Contact Form Schema
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .toLowerCase(),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(phoneRegex, "Please enter a valid 10-digit phone number")
    .length(10, "Phone number must be exactly 10 digits"),
  subject: z.enum(contactSubjects, {
    required_error: "Please select a subject",
  }),
  message: z
    .string()
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must not exceed 1000 characters"),
  preferredContactMethod: z.enum(contactMethods).default("email"),
  preferredContactTime: z
    .enum(["morning", "afternoon", "evening", "anytime"])
    .default("anytime"),
  attachments: z
    .array(
      z.object({
        name: z.string(),
        url: z.string().url("Invalid file URL"),
        size: z.number().max(5 * 1024 * 1024, "File size must not exceed 5MB"),
        type: z.string(),
      })
    )
    .max(3, "Maximum 3 attachments allowed")
    .optional(),
  agreeToPrivacyPolicy: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy",
  }),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

// Product Inquiry Schema
export const productInquirySchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .toLowerCase(),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(phoneRegex, "Please enter a valid 10-digit phone number")
    .length(10, "Phone number must be exactly 10 digits"),
  productCategory: z.enum(["kitchen", "bedroom", "both"], {
    required_error: "Please select a product category",
  }),
  productName: z.string().max(100, "Product name too long").optional(),
  budgetRange: z
    .object({
      min: z.number().min(0, "Minimum budget cannot be negative"),
      max: z.number().min(0, "Maximum budget cannot be negative"),
    })
    .refine(
      (data) => data.min <= data.max,
      { message: "Minimum budget must be less than or equal to maximum budget" }
    )
    .optional(),
  requirements: z
    .string()
    .min(10, "Please provide more details (at least 10 characters)")
    .max(500, "Requirements must not exceed 500 characters"),
  timeframe: z.enum(["immediate", "1_month", "3_months", "6_months", "planning"], {
    required_error: "Please select a timeframe",
  }),
  location: z.object({
    city: z.string().min(1, "City is required"),
    pincode: z
      .string()
      .regex(pincodeRegex, "Please enter a valid 6-digit pincode")
      .optional(),
  }),
  preferredContactMethod: z.enum(contactMethods).default("email"),
});

export type ProductInquiryInput = z.infer<typeof productInquirySchema>;

// Customization Request Schema
export const customizationRequestSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .toLowerCase(),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(phoneRegex, "Please enter a valid 10-digit phone number")
    .length(10, "Phone number must be exactly 10 digits"),
  baseProductId: z.string().optional(),
  category: z.enum(["kitchen", "bedroom"]),
  customizationType: z.enum([
    "dimensions",
    "color",
    "material",
    "design",
    "features",
    "complete_custom",
  ], {
    required_error: "Please select customization type",
  }),
  dimensions: z
    .object({
      length: z.number().positive("Length must be positive"),
      width: z.number().positive("Width must be positive"),
      height: z.number().positive("Height must be positive"),
      unit: z.enum(["mm", "cm", "m", "inches", "feet"]).default("feet"),
    })
    .optional(),
  preferredColors: z.array(z.string()).max(5, "Maximum 5 colors allowed").optional(),
  preferredMaterial: z
    .string()
    .max(100, "Material description too long")
    .optional(),
  designPreferences: z
    .string()
    .max(1000, "Design preferences must not exceed 1000 characters")
    .optional(),
  referenceImages: z
    .array(z.string().url("Invalid image URL"))
    .max(5, "Maximum 5 reference images allowed")
    .optional(),
  floorPlan: z.string().url("Invalid floor plan URL").optional(),
  budget: z.number().min(0, "Budget cannot be negative").optional(),
  additionalNotes: z
    .string()
    .max(500, "Additional notes must not exceed 500 characters")
    .optional(),
});

export type CustomizationRequestInput = z.infer<typeof customizationRequestSchema>;

// Complaint/Issue Schema
export const complaintSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .toLowerCase(),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(phoneRegex, "Please enter a valid 10-digit phone number")
    .length(10, "Phone number must be exactly 10 digits"),
  orderId: z.string().optional(),
  appointmentId: z.string().optional(),
  complaintType: z.enum([
    "product_quality",
    "delivery_delay",
    "installation_issue",
    "customer_service",
    "billing_issue",
    "warranty_claim",
    "damaged_product",
    "missing_parts",
    "other",
  ], {
    required_error: "Please select complaint type",
  }),
  priority: z.enum(contactPriorities).default("medium"),
  issueDescription: z
    .string()
    .min(1, "Issue description is required")
    .min(20, "Please provide more details (at least 20 characters)")
    .max(1000, "Description must not exceed 1000 characters"),
  expectedResolution: z
    .string()
    .max(500, "Expected resolution must not exceed 500 characters")
    .optional(),
  incidentDate: z.string().optional(),
  supportingDocuments: z
    .array(z.string().url("Invalid document URL"))
    .max(5, "Maximum 5 documents allowed")
    .optional(),
  urgentCallback: z.boolean().default(false),
});

export type ComplaintInput = z.infer<typeof complaintSchema>;

// Partnership Inquiry Schema
export const partnershipInquirySchema = z.object({
  companyName: z
    .string()
    .min(1, "Company name is required")
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must not exceed 100 characters"),
  contactPersonName: z
    .string()
    .min(1, "Contact person name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),
  designation: z
    .string()
    .min(1, "Designation is required")
    .max(50, "Designation must not exceed 50 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .toLowerCase(),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(phoneRegex, "Please enter a valid 10-digit phone number")
    .length(10, "Phone number must be exactly 10 digits"),
  companyWebsite: z.string().url("Please enter a valid website URL").optional(),
  partnershipType: z.enum([
    "dealer",
    "distributor",
    "franchise",
    "architect_designer",
    "builder_contractor",
    "supplier",
    "other",
  ], {
    required_error: "Please select partnership type",
  }),
  businessType: z.enum([
    "retail",
    "wholesale",
    "manufacturing",
    "service",
    "other",
  ]).optional(),
  yearsInBusiness: z
    .number()
    .min(0, "Years in business cannot be negative")
    .max(100, "Invalid years in business")
    .optional(),
  annualTurnover: z
    .enum([
      "below_10_lakhs",
      "10_50_lakhs",
      "50_lakhs_1_crore",
      "1_5_crores",
      "above_5_crores",
    ])
    .optional(),
  serviceAreas: z.array(z.string()).min(1, "At least one service area required").optional(),
  proposalDetails: z
    .string()
    .min(20, "Please provide more details (at least 20 characters)")
    .max(1000, "Proposal must not exceed 1000 characters"),
  existingPortfolio: z.string().url("Invalid portfolio URL").optional(),
});

export type PartnershipInquiryInput = z.infer<typeof partnershipInquirySchema>;

// Feedback Schema
export const feedbackSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name too long").optional(),
  email: z
    .string()
    .email("Please enter a valid email address")
    .toLowerCase()
    .optional(),
  feedbackType: z.enum([
    "product_feedback",
    "service_feedback",
    "website_feedback",
    "showroom_feedback",
    "general_feedback",
  ], {
    required_error: "Please select feedback type",
  }),
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must not exceed 5"),
  message: z
    .string()
    .min(1, "Feedback message is required")
    .min(10, "Please provide more details (at least 10 characters)")
    .max(1000, "Message must not exceed 1000 characters"),
  suggestions: z
    .string()
    .max(500, "Suggestions must not exceed 500 characters")
    .optional(),
  anonymous: z.boolean().default(false),
});

export type FeedbackInput = z.infer<typeof feedbackSchema>;

// Callback Request Schema
export const callbackRequestSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(phoneRegex, "Please enter a valid 10-digit phone number")
    .length(10, "Phone number must be exactly 10 digits"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .toLowerCase()
    .optional(),
  preferredDate: z.string().min(1, "Please select a preferred date"),
  preferredTime: z.enum(["morning", "afternoon", "evening"], {
    required_error: "Please select preferred time",
  }),
  purpose: z.enum([
    "product_inquiry",
    "appointment_booking",
    "quotation",
    "complaint",
    "general",
  ]),
  notes: z
    .string()
    .max(200, "Notes must not exceed 200 characters")
    .optional(),
});

export type CallbackRequestInput = z.infer<typeof callbackRequestSchema>;

// Newsletter Subscription Schema
export const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .toLowerCase(),
  name: z.string().max(50, "Name too long").optional(),
  interests: z
    .array(z.enum(["kitchen", "bedroom", "offers", "design_tips", "new_products"]))
    .optional(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to receive newsletters",
  }),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

// Career Inquiry Schema
export const careerInquirySchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .toLowerCase(),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(phoneRegex, "Please enter a valid 10-digit phone number")
    .length(10, "Phone number must be exactly 10 digits"),
  position: z
    .string()
    .min(1, "Position is required")
    .max(100, "Position name too long"),
  department: z.enum([
    "design",
    "sales",
    "production",
    "installation",
    "customer_service",
    "marketing",
    "hr",
    "other",
  ]).optional(),
  experience: z
    .number()
    .min(0, "Experience cannot be negative")
    .max(50, "Invalid experience"),
  currentLocation: z
    .string()
    .min(1, "Current location is required")
    .max(100, "Location too long"),
  resume: z.string().url("Please upload a valid resume file"),
  coverLetter: z
    .string()
    .max(1000, "Cover letter must not exceed 1000 characters")
    .optional(),
  portfolio: z.string().url("Invalid portfolio URL").optional(),
  availableToJoin: z.enum(["immediate", "15_days", "1_month", "negotiable"]),
  expectedSalary: z
    .number()
    .min(0, "Salary cannot be negative")
    .optional(),
});

export type CareerInquiryInput = z.infer<typeof careerInquirySchema>;

// Helper function to sanitize contact input (FIXED)
export const sanitizeContactInput = <T extends Record<string, any>>(input: T): T => {
  const sanitized = { ...input } as Record<string, any>;
  
  Object.keys(sanitized).forEach((key) => {
    if (typeof sanitized[key] === "string") {
      sanitized[key] = sanitized[key].trim();
    }
  });

  return sanitized as T;
};

// Helper function to format phone number
export const formatPhoneNumber = (phone: string): string => {
  // Format: +91-XXXXX-XXXXX
  return `+91-${phone.slice(0, 5)}-${phone.slice(5)}`;
};

// Helper function to validate file upload
export const validateFileUpload = (
  file: File,
  maxSizeMB: number = 5,
  allowedTypes: string[] = ["image/jpeg", "image/png", "application/pdf"]
): { valid: boolean; error?: string } => {
  const maxSize = maxSizeMB * 1024 * 1024;

  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File size must not exceed ${maxSizeMB}MB`,
    };
  }

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type not allowed. Allowed types: ${allowedTypes.join(", ")}`,
    };
  }

  return { valid: true };
};

// Helper function to generate auto-reply message
export const generateAutoReplyMessage = (name: string, subject: string): string => {
  return `Dear ${name},

Thank you for contacting Lomash Wood. We have received your inquiry regarding "${subject}".

Our team will review your message and get back to you within 24 hours.

If you need immediate assistance, please call us at +91-XXXXXXXXXX or visit our nearest showroom.

Best regards,
Lomash Wood Team`;
};