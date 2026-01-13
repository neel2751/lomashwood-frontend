import { z } from "zod";

// ============================================================================
// VALIDATION PATTERNS
// ============================================================================

const phoneRegex = /^[6-9]\d{9}$/; // Indian phone number format
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

// ============================================================================
// AUTHENTICATION SCHEMAS
// ============================================================================

// Login Schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;

// Register Schema
export const registerSchema = z
  .object({
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
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(
        passwordRegex,
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    acceptTerms: z
      .boolean()
      .refine((val) => val === true, {
        message: "You must accept the terms and conditions",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;

// ============================================================================
// PASSWORD RECOVERY SCHEMAS
// ============================================================================

// Forgot Password Schema
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .toLowerCase(),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

// Reset Password Schema
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(
        passwordRegex,
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    token: z.string().min(1, "Reset token is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

// Change Password Schema (for authenticated users)
export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Current password is required")
      .min(8, "Password must be at least 8 characters"),
    newPassword: z
      .string()
      .min(1, "New password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(
        passwordRegex,
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
      ),
    confirmNewPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

// ============================================================================
// EMAIL VERIFICATION SCHEMAS
// ============================================================================

// Email Verification Schema
export const verifyEmailSchema = z.object({
  token: z.string().min(1, "Verification token is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .toLowerCase(),
});

export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;

// Resend Verification Email Schema
export const resendVerificationSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .toLowerCase(),
});

export type ResendVerificationInput = z.infer<typeof resendVerificationSchema>;

// ============================================================================
// OTP SCHEMAS
// ============================================================================

// OTP Verification Schema
export const otpVerificationSchema = z.object({
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(phoneRegex, "Please enter a valid 10-digit phone number")
    .length(10, "Phone number must be exactly 10 digits"),
  otp: z
    .string()
    .min(1, "OTP is required")
    .length(6, "OTP must be 6 digits")
    .regex(/^\d{6}$/, "OTP must contain only numbers"),
});

export type OTPVerificationInput = z.infer<typeof otpVerificationSchema>;

// Request OTP Schema
export const requestOTPSchema = z.object({
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(phoneRegex, "Please enter a valid 10-digit phone number")
    .length(10, "Phone number must be exactly 10 digits"),
});

export type RequestOTPInput = z.infer<typeof requestOTPSchema>;

// ============================================================================
// SOCIAL LOGIN SCHEMAS
// ============================================================================

// Social Login Schema
export const socialLoginSchema = z.object({
  provider: z.enum(["google", "facebook", "apple"], {
    required_error: "Provider is required",
  }),
  token: z.string().min(1, "Authentication token is required"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .toLowerCase()
    .optional(),
  name: z.string().optional(),
  avatar: z.string().url("Invalid avatar URL").optional(),
});

export type SocialLoginInput = z.infer<typeof socialLoginSchema>;

// ============================================================================
// ACCOUNT UPDATE SCHEMAS
// ============================================================================

// Update Email Schema
export const updateEmailSchema = z.object({
  newEmail: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .toLowerCase(),
  password: z.string().min(1, "Password is required for email change"),
});

export type UpdateEmailInput = z.infer<typeof updateEmailSchema>;

// Update Phone Schema
export const updatePhoneSchema = z.object({
  newPhone: z
    .string()
    .min(1, "Phone number is required")
    .regex(phoneRegex, "Please enter a valid 10-digit phone number")
    .length(10, "Phone number must be exactly 10 digits"),
  password: z.string().min(1, "Password is required for phone change"),
});

export type UpdatePhoneInput = z.infer<typeof updatePhoneSchema>;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Validate password strength and get detailed feedback
 * @param password - Password to validate
 * @returns Object with strength details, score, and level
 * 
 * @example
 * const result = validatePasswordStrength("MyPass123!");
 * console.log(result.level); // "strong"
 * console.log(result.isValid); // true
 */
export const validatePasswordStrength = (password: string) => {
  const strength = {
    hasMinLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[@$!%*?&#]/.test(password),
  };

  const score = Object.values(strength).filter(Boolean).length;

  return {
    ...strength,
    score,
    isValid: score === 5,
    level:
      score <= 2 ? "weak" : score === 3 ? "medium" : score === 4 ? "good" : "strong",
  };
};

/**
 * Sanitize user input by trimming whitespace from string values
 * @param input - Object with form data
 * @returns Sanitized object with trimmed strings
 * 
 * @example
 * const cleaned = sanitizeAuthInput({ email: "  test@example.com  " });
 * console.log(cleaned.email); // "test@example.com"
 */
export const sanitizeAuthInput = <T extends Record<string, any>>(input: T): T => {
  const sanitized = {} as Record<string, any>;
  
  // Trim string values
  Object.keys(input).forEach((key) => {
    if (typeof input[key] === "string") {
      sanitized[key] = (input[key] as string).trim();
    } else {
      sanitized[key] = input[key];
    }
  });

  return sanitized as T;
};

/**
 * Check if an email is in a valid format (additional validation beyond schema)
 * @param email - Email address to validate
 * @returns true if valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Check if a phone number is valid Indian format
 * @param phone - Phone number to validate
 * @returns true if valid, false otherwise
 */
export const isValidIndianPhone = (phone: string): boolean => {
  return phoneRegex.test(phone);
};

/**
 * Get password validation errors as an array of messages
 * @param password - Password to validate
 * @returns Array of error messages, empty if valid
 */
export const getPasswordErrors = (password: string): string[] => {
  const errors: string[] = [];
  const strength = validatePasswordStrength(password);

  if (!strength.hasMinLength) errors.push("At least 8 characters");
  if (!strength.hasUpperCase) errors.push("One uppercase letter");
  if (!strength.hasLowerCase) errors.push("One lowercase letter");
  if (!strength.hasNumber) errors.push("One number");
  if (!strength.hasSpecialChar) errors.push("One special character (@$!%*?&#)");

  return errors;
};