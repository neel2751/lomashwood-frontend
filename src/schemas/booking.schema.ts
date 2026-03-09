import { z } from "zod";

export const customerDetailsSchema = z.object({
  title: z.string({ required_error: "This field is required" }).min(1, "This field is required"),
  firstName: z.string({ required_error: "This field is required" }).min(1, "This field is required"),
  lastName: z.string({ required_error: "This field is required" }).min(1, "This field is required"),

  // Email is OPTIONAL
  email: z
    .string()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),

  phone: z
    .string({ required_error: "This field is required" })
    .min(10, "Please enter a valid phone number"),

  alternatePhone: z.string().optional(),

  fullAddress: z
    .string({ required_error: "This field is required" })
    .min(5, "Please enter your full address"),

  postcode: z
    .string({ required_error: "This field is required" })
    .min(3, "Please enter a valid postcode"),

  notes: z.string().max(500, "Maximum 500 characters").optional(),
  contactPreferences: z.array(z.string()).optional(),
  marketingConsent: z.boolean().optional(),

  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
});

export type CustomerDetailsFormData = z.infer<typeof customerDetailsSchema>;