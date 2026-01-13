import { z } from "zod";

/**
 * User Registration Schema
 * Validates user signup/registration data
 */
export const userRegistrationSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name must be less than 50 characters")
      .regex(/^[a-zA-Z\s]+$/, "First name can only contain letters and spaces"),

    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name must be less than 50 characters")
      .regex(/^[a-zA-Z\s]+$/, "Last name can only contain letters and spaces"),

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

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password must be less than 100 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),

    confirmPassword: z.string(),

    userType: z.enum(["individual", "business"]).default("individual"),

    acceptTerms: z
      .boolean()
      .refine((val) => val === true, {
        message: "You must accept the terms and conditions",
      }),

    marketingConsent: z.boolean().default(false),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

/**
 * User Login Schema
 * Validates user login credentials
 */
export const userLoginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .toLowerCase()
    .trim(),

  password: z
    .string()
    .min(1, "Password is required"),

  rememberMe: z.boolean().default(false),
});

/**
 * User Profile Update Schema
 * Validates user profile information updates
 */
export const userProfileUpdateSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "First name can only contain letters and spaces"),

  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Last name can only contain letters and spaces"),

  phone: z
    .string()
    .regex(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      "Please enter a valid phone number"
    ),

  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
    .optional()
    .or(z.literal("")),

  gender: z
    .enum(["male", "female", "other", "prefer_not_to_say"])
    .optional(),

  profilePicture: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),

  bio: z
    .string()
    .max(500, "Bio must be less than 500 characters")
    .optional()
    .or(z.literal("")),
});

/**
 * User Address Schema
 * Validates shipping/billing address information
 */
export const userAddressSchema = z.object({
  addressType: z.enum(["shipping", "billing", "both"]).default("shipping"),

  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be less than 100 characters"),

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

  addressLine1: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address must be less than 200 characters"),

  addressLine2: z
    .string()
    .max(200, "Address must be less than 200 characters")
    .optional()
    .or(z.literal("")),

  landmark: z
    .string()
    .max(100, "Landmark must be less than 100 characters")
    .optional()
    .or(z.literal("")),

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

  country: z.string().default("India"),

  isDefault: z.boolean().default(false),

  gstNumber: z
    .string()
    .regex(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
      "Please enter a valid GST number"
    )
    .optional()
    .or(z.literal("")),
});

/**
 * Password Change Schema
 * Validates password change requests
 */
export const passwordChangeSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Current password is required"),

    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password must be less than 100 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),

    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

/**
 * Password Reset Request Schema
 * Validates forgot password email request
 */
export const passwordResetRequestSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .toLowerCase()
    .trim(),
});

/**
 * Password Reset Schema
 * Validates password reset with token
 */
export const passwordResetSchema = z
  .object({
    token: z.string().min(1, "Reset token is required"),

    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password must be less than 100 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),

    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

/**
 * Email Update Schema
 * Validates email change requests
 */
export const emailUpdateSchema = z.object({
  newEmail: z
    .string()
    .email("Please enter a valid email address")
    .toLowerCase()
    .trim(),

  password: z
    .string()
    .min(1, "Password is required to change email"),
});

/**
 * User Preferences Schema
 * Validates user preference settings
 */
export const userPreferencesSchema = z.object({
  emailNotifications: z.boolean().default(true),
  smsNotifications: z.boolean().default(false),
  orderUpdates: z.boolean().default(true),
  promotionalEmails: z.boolean().default(true),
  newsletter: z.boolean().default(false),
  language: z.enum(["en", "hi", "gu"]).default("en"),
  currency: z.enum(["INR", "USD"]).default("INR"),
});

/**
 * Type exports for TypeScript
 */
export type UserRegistrationInput = z.infer<typeof userRegistrationSchema>;
export type UserLoginInput = z.infer<typeof userLoginSchema>;
export type UserProfileUpdateInput = z.infer<typeof userProfileUpdateSchema>;
export type UserAddressInput = z.infer<typeof userAddressSchema>;
export type PasswordChangeInput = z.infer<typeof passwordChangeSchema>;
export type PasswordResetRequestInput = z.infer<typeof passwordResetRequestSchema>;
export type PasswordResetInput = z.infer<typeof passwordResetSchema>;
export type EmailUpdateInput = z.infer<typeof emailUpdateSchema>;
export type UserPreferencesInput = z.infer<typeof userPreferencesSchema>;

/**
 * Gender Options
 */
export const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
] as const;

/**
 * Language Options
 */
export const languageOptions = [
  { value: "en", label: "English" },
  { value: "hi", label: "Hindi" },
  { value: "gu", label: "Gujarati" },
] as const;

/**
 * Address Type Options
 */
export const addressTypeOptions = [
  { value: "shipping", label: "Shipping Address" },
  { value: "billing", label: "Billing Address" },
  { value: "both", label: "Shipping & Billing" },
] as const;

/**
 * Default form values
 */
export const defaultUserRegistrationValues: Partial<UserRegistrationInput> = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  userType: "individual",
  acceptTerms: false,
  marketingConsent: false,
};

export const defaultUserLoginValues: Partial<UserLoginInput> = {
  email: "",
  password: "",
  rememberMe: false,
};

export const defaultUserProfileValues: Partial<UserProfileUpdateInput> = {
  firstName: "",
  lastName: "",
  phone: "",
  dateOfBirth: "",
  bio: "",
  profilePicture: "",
};

export const defaultUserAddressValues: Partial<UserAddressInput> = {
  addressType: "shipping",
  fullName: "",
  phone: "",
  alternatePhone: "",
  addressLine1: "",
  addressLine2: "",
  landmark: "",
  city: "",
  state: "",
  pincode: "",
  country: "India",
  isDefault: false,
  gstNumber: "",
};

export const defaultPasswordChangeValues: Partial<PasswordChangeInput> = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

export const defaultUserPreferencesValues: Partial<UserPreferencesInput> = {
  emailNotifications: true,
  smsNotifications: false,
  orderUpdates: true,
  promotionalEmails: true,
  newsletter: false,
  language: "en",
  currency: "INR",
};