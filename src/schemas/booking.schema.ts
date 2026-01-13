import { z } from "zod";

// Common validation patterns
const phoneRegex = /^[6-9]\d{9}$/;
const pincodeRegex = /^[1-9][0-9]{5}$/;

// Appointment Types
export const appointmentTypes = ["showroom", "home", "virtual"] as const;
export const appointmentStatuses = ["pending", "confirmed", "completed", "cancelled", "rescheduled"] as const;

// Time slot format (HH:MM AM/PM)
const timeSlotRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i;

// Base Appointment Schema
export const baseAppointmentSchema = z.object({
  type: z.enum(appointmentTypes, {
    required_error: "Please select an appointment type",
  }),
  customerName: z
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
  date: z
    .string()
    .min(1, "Please select a date")
    .refine(
      (date) => {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
      },
      { message: "Date cannot be in the past" }
    ),
  time: z
    .string()
    .min(1, "Please select a time slot")
    .regex(timeSlotRegex, "Invalid time format"),
  notes: z
    .string()
    .max(500, "Notes must not exceed 500 characters")
    .optional(),
});

// Showroom Appointment Schema
export const showroomAppointmentSchema = baseAppointmentSchema.extend({
  type: z.literal("showroom"),
  showroomId: z.string().min(1, "Please select a showroom"),
  preferredDesigner: z.string().optional(),
  interestedIn: z
    .array(z.enum(["kitchen", "bedroom", "both"]))
    .min(1, "Please select at least one interest area"),
});

export type ShowroomAppointmentInput = z.infer<typeof showroomAppointmentSchema>;

// Home Visit Appointment Schema
export const homeAppointmentSchema = baseAppointmentSchema.extend({
  type: z.literal("home"),
  address: z.object({
    street: z
      .string()
      .min(1, "Street address is required")
      .min(5, "Street address must be at least 5 characters")
      .max(100, "Street address must not exceed 100 characters"),
    city: z
      .string()
      .min(1, "City is required")
      .min(2, "City must be at least 2 characters")
      .max(50, "City must not exceed 50 characters"),
    state: z
      .string()
      .min(1, "State is required")
      .min(2, "State must be at least 2 characters")
      .max(50, "State must not exceed 50 characters"),
    pincode: z
      .string()
      .min(1, "Pincode is required")
      .regex(pincodeRegex, "Please enter a valid 6-digit pincode"),
    landmark: z.string().max(100, "Landmark must not exceed 100 characters").optional(),
  }),
  propertyType: z.enum(["apartment", "independent_house", "villa", "other"], {
    required_error: "Please select property type",
  }),
  serviceRequired: z
    .array(z.enum(["kitchen", "bedroom", "wardrobe", "consultation", "other"]))
    .min(1, "Please select at least one service"),
  projectStage: z.enum(["planning", "under_construction", "ready_to_move", "renovation"], {
    required_error: "Please select project stage",
  }),
});

export type HomeAppointmentInput = z.infer<typeof homeAppointmentSchema>;

// Virtual Appointment Schema
export const virtualAppointmentSchema = baseAppointmentSchema.extend({
  type: z.literal("virtual"),
  preferredPlatform: z.enum(["zoom", "google_meet", "whatsapp", "phone"], {
    required_error: "Please select preferred platform",
  }),
  discussionTopics: z
    .array(
      z.enum([
        "kitchen_design",
        "bedroom_design",
        "pricing",
        "materials",
        "timeline",
        "customization",
        "other",
      ])
    )
    .min(1, "Please select at least one topic"),
  hasFloorPlan: z.boolean().default(false),
  hasReferenceImages: z.boolean().default(false),
});

export type VirtualAppointmentInput = z.infer<typeof virtualAppointmentSchema>;

// Combined Appointment Schema (discriminated union)
export const appointmentSchema = z.discriminatedUnion("type", [
  showroomAppointmentSchema,
  homeAppointmentSchema,
  virtualAppointmentSchema,
]);

export type AppointmentInput = z.infer<typeof appointmentSchema>;

// Reschedule Appointment Schema
export const rescheduleAppointmentSchema = z.object({
  appointmentId: z.string().min(1, "Appointment ID is required"),
  newDate: z
    .string()
    .min(1, "Please select a new date")
    .refine(
      (date) => {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
      },
      { message: "Date cannot be in the past" }
    ),
  newTime: z
    .string()
    .min(1, "Please select a new time slot")
    .regex(timeSlotRegex, "Invalid time format"),
  reason: z
    .string()
    .min(10, "Please provide a reason (at least 10 characters)")
    .max(200, "Reason must not exceed 200 characters"),
});

export type RescheduleAppointmentInput = z.infer<typeof rescheduleAppointmentSchema>;

// Cancel Appointment Schema
export const cancelAppointmentSchema = z.object({
  appointmentId: z.string().min(1, "Appointment ID is required"),
  reason: z.enum(
    [
      "schedule_conflict",
      "changed_mind",
      "found_alternative",
      "emergency",
      "other",
    ],
    {
      required_error: "Please select a cancellation reason",
    }
  ),
  feedback: z
    .string()
    .max(300, "Feedback must not exceed 300 characters")
    .optional(),
});

export type CancelAppointmentInput = z.infer<typeof cancelAppointmentSchema>;

// Check Availability Schema
export const checkAvailabilitySchema = z.object({
  date: z.string().min(1, "Date is required"),
  showroomId: z.string().optional(),
  type: z.enum(appointmentTypes).optional(),
});

export type CheckAvailabilityInput = z.infer<typeof checkAvailabilitySchema>;

// Appointment Feedback Schema
export const appointmentFeedbackSchema = z.object({
  appointmentId: z.string().min(1, "Appointment ID is required"),
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must not exceed 5"),
  experience: z.enum(["excellent", "good", "average", "poor"], {
    required_error: "Please rate your experience",
  }),
  designerRating: z
    .number()
    .min(1, "Designer rating must be at least 1")
    .max(5, "Designer rating must not exceed 5")
    .optional(),
  comments: z
    .string()
    .min(10, "Please provide detailed feedback (at least 10 characters)")
    .max(500, "Comments must not exceed 500 characters"),
  wouldRecommend: z.boolean(),
  followUpRequired: z.boolean().default(false),
});

export type AppointmentFeedbackInput = z.infer<typeof appointmentFeedbackSchema>;

// Bulk Appointment Booking Schema (for businesses)
export const bulkAppointmentSchema = z.object({
  companyName: z
    .string()
    .min(1, "Company name is required")
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must not exceed 100 characters"),
  contactPerson: z
    .string()
    .min(1, "Contact person name is required")
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
  numberOfAppointments: z
    .number()
    .min(5, "Minimum 5 appointments required for bulk booking")
    .max(50, "Maximum 50 appointments allowed"),
  preferredDates: z
    .array(z.string())
    .min(1, "Please select at least one preferred date")
    .max(5, "Maximum 5 preferred dates allowed"),
  serviceType: z.enum(["kitchen", "bedroom", "both"]),
  additionalRequirements: z
    .string()
    .max(500, "Requirements must not exceed 500 characters")
    .optional(),
});

export type BulkAppointmentInput = z.infer<typeof bulkAppointmentSchema>;

// Helper function to validate business hours
export const isWithinBusinessHours = (time: string): boolean => {
  const match = time.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i);
  if (!match) return false;

  let hours = parseInt(match[1]);
  const minutes = parseInt(match[2]);
  const period = match[3].toUpperCase();

  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  // Business hours: 10:00 AM to 7:00 PM
  const totalMinutes = hours * 60 + minutes;
  const openTime = 10 * 60; // 10:00 AM
  const closeTime = 19 * 60; // 7:00 PM

  return totalMinutes >= openTime && totalMinutes <= closeTime;
};

// Helper function to check if date is a working day
export const isWorkingDay = (date: string): boolean => {
  const day = new Date(date).getDay();
  // Assuming closed on Sundays (0) and working Monday-Saturday (1-6)
  return day !== 0;
};


// Helper function to format appointment data
export const formatAppointmentData = (data: AppointmentInput): AppointmentInput => {
  const formatted: AppointmentInput = {
    ...data,
    customerName: data.customerName.trim(),
    email: data.email.toLowerCase().trim(),
    phone: data.phone.trim(),
    notes: data.notes?.trim(),
  };

  if (formatted.type === "home") {
    formatted.address = {
      ...formatted.address,
      street: formatted.address.street.trim(),
      city: formatted.address.city.trim(),
      state: formatted.address.state.trim(),
      pincode: formatted.address.pincode.trim(),
      landmark: formatted.address.landmark?.trim(),
    };
  }


  return formatted;
};

// Helper function to generate available time slots
export const generateTimeSlots = (
  startHour: number = 10,
  endHour: number = 19,
  intervalMinutes: number = 30
): string[] => {
  const slots: string[] = [];
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += intervalMinutes) {
      const period = hour >= 12 ? "PM" : "AM";
      const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      const displayMinute = minute.toString().padStart(2, "0");
      slots.push(`${displayHour}:${displayMinute} ${period}`);
    }
  }
  
  return slots;
};