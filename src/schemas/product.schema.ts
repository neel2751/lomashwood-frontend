import { z } from "zod";

// Product Categories
export const productCategories = ["kitchen", "bedroom"] as const;
export const productStatuses = ["active", "draft", "archived", "out_of_stock"] as const;

// Kitchen Subcategories
export const kitchenSubcategories = [
  "modular_kitchen",
  "straight_kitchen",
  "l_shaped_kitchen",
  "u_shaped_kitchen",
  "parallel_kitchen",
  "island_kitchen",
  "open_kitchen",
] as const;

// Bedroom Subcategories
export const bedroomSubcategories = [
  "wardrobe",
  "bed",
  "bedside_table",
  "dresser",
  "chest_of_drawers",
  "complete_bedroom_set",
] as const;

// Styles
export const productStyles = [
  "modern",
  "contemporary",
  "traditional",
  "minimalist",
  "rustic",
  "industrial",
  "scandinavian",
] as const;

// Finishes
export const productFinishes = [
  "matte",
  "glossy",
  "textured",
  "wood_grain",
  "laminate",
  "acrylic",
  "veneer",
  "lacquered",
] as const;

// Materials
export const materials = [
  "plywood",
  "mdf",
  "hdhmr",
  "particle_board",
  "solid_wood",
  "marine_plywood",
  "block_board",
] as const;

// Product Filter Schema
export const productFilterSchema = z.object({
  category: z.enum(productCategories).optional(),
  subcategory: z.string().optional(),
  colors: z.array(z.string()).optional(),
  finishes: z.array(z.enum(productFinishes)).optional(),
  styles: z.array(z.enum(productStyles)).optional(),
  materials: z.array(z.enum(materials)).optional(),
  priceRange: z
    .object({
      min: z.number().min(0, "Minimum price cannot be negative").optional(),
      max: z.number().min(0, "Maximum price cannot be negative").optional(),
    })
    .refine(
      (data) => {
        if (data.min !== undefined && data.max !== undefined) {
          return data.min <= data.max;
        }
        return true;
      },
      { message: "Minimum price must be less than or equal to maximum price" }
    )
    .optional(),
  inStock: z.boolean().optional(),
  featured: z.boolean().optional(),
  search: z.string().max(100, "Search query too long").optional(),
  sortBy: z
    .enum(["price_asc", "price_desc", "newest", "popular", "rating"])
    .default("newest"),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(12),
});

export type ProductFilterInput = z.infer<typeof productFilterSchema>;

// Product Dimensions Schema
export const dimensionsSchema = z.object({
  length: z.number().positive("Length must be positive"),
  width: z.number().positive("Width must be positive"),
  height: z.number().positive("Height must be positive"),
  unit: z.enum(["mm", "cm", "m", "inches", "feet"]).default("mm"),
});

// Product Specification Schema
export const specificationSchema = z.object({
  material: z.enum(materials, {
    required_error: "Material is required",
  }),
  finish: z.enum(productFinishes, {
    required_error: "Finish is required",
  }),
  style: z.enum(productStyles, {
    required_error: "Style is required",
  }),
  dimensions: dimensionsSchema.optional(),
  weight: z
    .object({
      value: z.number().positive("Weight must be positive"),
      unit: z.enum(["kg", "lbs"]).default("kg"),
    })
    .optional(),
  thickness: z
    .object({
      value: z.number().positive("Thickness must be positive"),
      unit: z.enum(["mm", "cm", "inches"]).default("mm"),
    })
    .optional(),
  warranty: z
    .object({
      period: z.number().positive("Warranty period must be positive"),
      unit: z.enum(["months", "years"]).default("years"),
      details: z.string().max(500, "Warranty details too long").optional(),
    })
    .optional(),
  certifications: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  assemblyRequired: z.boolean().default(false),
  customizable: z.boolean().default(true),
});

export type SpecificationInput = z.infer<typeof specificationSchema>;

// Product Image Schema
export const productImageSchema = z.object({
  url: z.string().url("Invalid image URL"),
  alt: z.string().min(1, "Image alt text is required"),
  isPrimary: z.boolean().default(false),
  order: z.number().min(0).optional(),
});

// Color Option Schema
export const colorOptionSchema = z.object({
  name: z.string().min(1, "Color name is required"),
  code: z.string().min(1, "Color code is required"),
  hex: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color code"),
  image: z.string().url("Invalid image URL").optional(),
  available: z.boolean().default(true),
  priceModifier: z.number().default(0), // Additional cost for this color
});

export type ColorOptionInput = z.infer<typeof colorOptionSchema>;

// Product Pricing Schema
export const pricingSchema = z.object({
  basePrice: z.number().positive("Base price must be positive"),
  currency: z.enum(["INR", "USD"]).default("INR"),
  discountPercentage: z
    .number()
    .min(0, "Discount cannot be negative")
    .max(100, "Discount cannot exceed 100%")
    .optional(),
  discountedPrice: z.number().positive("Discounted price must be positive").optional(),
  taxPercentage: z
    .number()
    .min(0, "Tax cannot be negative")
    .max(100, "Tax cannot exceed 100%")
    .default(18), // GST in India
  pricePerSqFt: z.number().positive().optional(), // For modular items
  minimumOrderQuantity: z.number().min(1).default(1),
  bulkPricing: z
    .array(
      z.object({
        minQuantity: z.number().min(1),
        pricePerUnit: z.number().positive(),
      })
    )
    .optional(),
});

export type PricingInput = z.infer<typeof pricingSchema>;

// Create Product Schema
export const createProductSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .min(3, "Product name must be at least 3 characters")
    .max(100, "Product name must not exceed 100 characters"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format")
    .max(100, "Slug too long"),
  category: z.enum(productCategories, {
    required_error: "Category is required",
  }),
  subcategory: z.string().min(1, "Subcategory is required"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(20, "Description must be at least 20 characters")
    .max(2000, "Description must not exceed 2000 characters"),
  shortDescription: z
    .string()
    .max(200, "Short description must not exceed 200 characters")
    .optional(),
  pricing: pricingSchema,
  specifications: specificationSchema,
  images: z
    .array(productImageSchema)
    .min(1, "At least one image is required")
    .max(10, "Maximum 10 images allowed"),
  colors: z
    .array(colorOptionSchema)
    .min(1, "At least one color option is required")
    .max(20, "Maximum 20 color options allowed"),
  tags: z.array(z.string()).max(10, "Maximum 10 tags allowed").optional(),
  metaTitle: z.string().max(60, "Meta title too long").optional(),
  metaDescription: z.string().max(160, "Meta description too long").optional(),
  featured: z.boolean().default(false),
  status: z.enum(productStatuses).default("draft"),
  stockQuantity: z.number().min(0, "Stock cannot be negative").default(0),
  allowBackorder: z.boolean().default(false),
  estimatedDeliveryDays: z
    .number()
    .min(1, "Delivery days must be at least 1")
    .max(365, "Delivery days too long")
    .optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;

// Update Product Schema (partial of create)
export const updateProductSchema = createProductSchema.partial();

export type UpdateProductInput = z.infer<typeof updateProductSchema>;

// Product Review Schema
export const productReviewSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must not exceed 5"),
  title: z
    .string()
    .min(1, "Review title is required")
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must not exceed 100 characters"),
  comment: z
    .string()
    .min(1, "Review comment is required")
    .min(10, "Comment must be at least 10 characters")
    .max(1000, "Comment must not exceed 1000 characters"),
  pros: z.array(z.string()).max(5, "Maximum 5 pros allowed").optional(),
  cons: z.array(z.string()).max(5, "Maximum 5 cons allowed").optional(),
  wouldRecommend: z.boolean(),
  images: z
    .array(z.string().url("Invalid image URL"))
    .max(5, "Maximum 5 images allowed")
    .optional(),
  verifiedPurchase: z.boolean().default(false),
});

export type ProductReviewInput = z.infer<typeof productReviewSchema>;

// Quote Request Schema
export const quoteRequestSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  customerName: z
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
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit phone number")
    .length(10, "Phone number must be exactly 10 digits"),
  selectedColor: z.string().min(1, "Please select a color"),
  selectedFinish: z.enum(productFinishes, {
    required_error: "Please select a finish",
  }),
  dimensions: dimensionsSchema.optional(),
  quantity: z.number().min(1, "Quantity must be at least 1").default(1),
  customizations: z
    .string()
    .max(500, "Customization details must not exceed 500 characters")
    .optional(),
  preferredDeliveryDate: z.string().optional(),
  projectDetails: z
    .string()
    .max(1000, "Project details must not exceed 1000 characters")
    .optional(),
  budgetRange: z
    .object({
      min: z.number().min(0),
      max: z.number().min(0),
    })
    .optional(),
});

export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;

// Product Comparison Schema
export const productComparisonSchema = z.object({
  productIds: z
    .array(z.string())
    .min(2, "At least 2 products required for comparison")
    .max(4, "Maximum 4 products can be compared"),
});

export type ProductComparisonInput = z.infer<typeof productComparisonSchema>;

// Wishlist Schema
export const wishlistSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  selectedColor: z.string().optional(),
  selectedFinish: z.enum(productFinishes).optional(),
  notes: z.string().max(200, "Notes must not exceed 200 characters").optional(),
});

export type WishlistInput = z.infer<typeof wishlistSchema>;

// Product Availability Check Schema
export const availabilityCheckSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  pincode: z
    .string()
    .min(1, "Pincode is required")
    .regex(/^[1-9][0-9]{5}$/, "Please enter a valid 6-digit pincode"),
  quantity: z.number().min(1, "Quantity must be at least 1").default(1),
});

export type AvailabilityCheckInput = z.infer<typeof availabilityCheckSchema>;

// Helper function to calculate discounted price
export const calculateDiscountedPrice = (
  basePrice: number,
  discountPercentage?: number
): number => {
  if (!discountPercentage || discountPercentage <= 0) return basePrice;
  return Math.round(basePrice - (basePrice * discountPercentage) / 100);
};

// Helper function to calculate final price with tax
export const calculateFinalPrice = (
  price: number,
  taxPercentage: number = 18
): number => {
  return Math.round(price + (price * taxPercentage) / 100);
};

// Helper function to generate product slug
export const generateProductSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

// Helper function to validate product availability
export const validateProductAvailability = (
  stockQuantity: number,
  requestedQuantity: number,
  allowBackorder: boolean = false
): { available: boolean; message?: string } => {
  if (stockQuantity >= requestedQuantity) {
    return { available: true };
  }

  if (allowBackorder) {
    return {
      available: true,
      message: `Only ${stockQuantity} items in stock. Remaining ${
        requestedQuantity - stockQuantity
      } will be on backorder.`,
    };
  }

  return {
    available: false,
    message: `Only ${stockQuantity} items available. Please reduce quantity.`,
  };
};

// Helper function to format price in INR
export const formatPrice = (price: number, currency: "INR" | "USD" = "INR"): string => {
  if (currency === "INR") {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  }
  
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};