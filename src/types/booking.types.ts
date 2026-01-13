// Booking Base Types
export interface Booking {
  id: string;
  bookingNumber: string;
  type: BookingType;
  status: BookingStatus;
  customer: BookingCustomer;
  contact: BookingContact;
  service?: ServiceBooking;
  consultation?: ConsultationBooking;
  siteVisit?: SiteVisitBooking;
  quotation?: QuotationBooking;
  appointmentDate: string;
  appointmentTime: string;
  duration?: number; // in minutes
  location?: BookingLocation;
  notes?: string;
  internalNotes?: string;
  attachments?: BookingAttachment[];
  createdAt: string;
  updatedAt: string;
  confirmedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  cancellationReason?: string;
  reminders?: BookingReminder[];
  history?: BookingHistory[];
  assignedTo?: string;
  assignedToName?: string;
  priority?: BookingPriority;
  source?: BookingSource;
  metadata?: BookingMetadata;
}

// Booking Type
export type BookingType =
  | "consultation"
  | "site-visit"
  | "measurement"
  | "installation"
  | "maintenance"
  | "quotation"
  | "design-consultation"
  | "product-demo"
  | "showroom-visit"
  | "custom-order"
  | "repair"
  | "general";

// Booking Status
export type BookingStatus =
  | "pending"
  | "confirmed"
  | "rescheduled"
  | "in-progress"
  | "completed"
  | "cancelled"
  | "no-show"
  | "awaiting-confirmation";

// Booking Priority
export type BookingPriority = "low" | "normal" | "high" | "urgent";

// Booking Source
export type BookingSource =
  | "website"
  | "phone"
  | "email"
  | "whatsapp"
  | "walk-in"
  | "referral"
  | "social-media"
  | "advertisement"
  | "other";

// Booking Customer
export interface BookingCustomer {
  id?: string;
  name: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  company?: string;
  customerType: "individual" | "business" | "contractor" | "interior-designer" | "architect";
  isExisting?: boolean;
  previousBookings?: number;
}

// Booking Contact
export interface BookingContact {
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  landmark?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  preferredContactMethod?: "phone" | "email" | "whatsapp" | "sms";
  bestTimeToContact?: string;
}

// Service Booking Details
export interface ServiceBooking {
  serviceType: ServiceType;
  serviceDescription: string;
  productCategory?: string;
  productIds?: string[];
  estimatedCost?: number;
  estimatedDuration?: number;
  requiresEquipment?: boolean;
  equipmentNeeded?: string[];
  specialRequirements?: string[];
  images?: string[];
}

// Service Type
export type ServiceType =
  | "installation"
  | "repair"
  | "maintenance"
  | "polishing"
  | "restoration"
  | "custom-fabrication"
  | "modification"
  | "assembly"
  | "disassembly"
  | "relocation";

// Consultation Booking Details
export interface ConsultationBooking {
  consultationType: ConsultationType;
  purpose: string;
  projectType?: ProjectType;
  projectScope?: string;
  budget?: BudgetRange;
  timeline?: string;
  preferredStyle?: string[];
  roomType?: string[];
  spaceSize?: SpaceSize;
  currentStage?: ProjectStage;
  referenceImages?: string[];
  requirements?: string[];
  questionnaire?: ConsultationQuestion[];
}

// Consultation Type
export type ConsultationType =
  | "initial"
  | "design"
  | "technical"
  | "material-selection"
  | "budget-planning"
  | "follow-up"
  | "final-review";

// Project Type
export type ProjectType =
  | "residential"
  | "commercial"
  | "hospitality"
  | "office"
  | "retail"
  | "restaurant"
  | "renovation"
  | "new-construction"
  | "furnishing"
  | "custom-furniture";

// Project Stage
export type ProjectStage =
  | "planning"
  | "design"
  | "procurement"
  | "execution"
  | "completion"
  | "not-started";

// Budget Range
export interface BudgetRange {
  min?: number;
  max?: number;
  currency: string;
  flexible?: boolean;
}

// Space Size
export interface SpaceSize {
  value: number;
  unit: "sqft" | "sqm";
  rooms?: number;
}

// Site Visit Booking Details
export interface SiteVisitBooking {
  visitPurpose: SiteVisitPurpose;
  propertyType: PropertyType;
  accessInstructions?: string;
  parkingAvailable?: boolean;
  securityRequirements?: string;
  keyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  measurements?: MeasurementRequest[];
  specialAccess?: string;
  petPresent?: boolean;
  occupancyStatus?: "occupied" | "vacant" | "under-construction";
}

// Site Visit Purpose
export type SiteVisitPurpose =
  | "measurement"
  | "inspection"
  | "installation"
  | "delivery"
  | "assessment"
  | "consultation"
  | "survey"
  | "follow-up";

// Property Type
export type PropertyType =
  | "apartment"
  | "villa"
  | "bungalow"
  | "office"
  | "shop"
  | "restaurant"
  | "hotel"
  | "showroom"
  | "warehouse"
  | "factory"
  | "other";

// Measurement Request
export interface MeasurementRequest {
  room: string;
  purpose: string;
  notes?: string;
}

// Quotation Booking Details
export interface QuotationBooking {
  projectDescription: string;
  productCategories: string[];
  quantity?: number;
  specifications?: string;
  deliveryLocation?: string;
  expectedDeliveryDate?: string;
  urgency: "standard" | "urgent" | "flexible";
  competitorQuotes?: boolean;
  decisionTimeline?: string;
  budgetConstraints?: string;
}

// Booking Location
export interface BookingLocation {
  type: "customer-location" | "showroom" | "office" | "warehouse" | "online";
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  landmark?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  travelDistance?: number;
  travelTime?: number;
  showroomId?: string;
  showroomName?: string;
}

// Booking Attachment
export interface BookingAttachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: string;
  uploadedBy?: string;
  description?: string;
}

// Booking Reminder
export interface BookingReminder {
  id: string;
  type: "email" | "sms" | "whatsapp" | "push";
  scheduledAt: string;
  sentAt?: string;
  status: "pending" | "sent" | "failed";
  message?: string;
}

// Booking History
export interface BookingHistory {
  id: string;
  action: BookingAction;
  description: string;
  performedBy: string;
  performedByName?: string;
  timestamp: string;
  previousValue?: any;
  newValue?: any;
  metadata?: Record<string, any>;
}

// Booking Action
export type BookingAction =
  | "created"
  | "confirmed"
  | "rescheduled"
  | "cancelled"
  | "completed"
  | "assigned"
  | "updated"
  | "commented"
  | "reminder-sent"
  | "no-show"
  | "follow-up-required";

// Booking Metadata
export interface BookingMetadata {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referrer?: string;
  device?: string;
  browser?: string;
  ip?: string;
}

// Consultation Question (for questionnaire)
export interface ConsultationQuestion {
  question: string;
  answer: string;
  category?: string;
}

// Booking Slot
export interface BookingSlot {
  date: string;
  startTime: string;
  endTime: string;
  available: boolean;
  capacity?: number;
  booked?: number;
  duration: number;
  assignedStaff?: string[];
}

// Booking Availability
export interface BookingAvailability {
  date: string;
  slots: BookingSlot[];
  totalSlots: number;
  availableSlots: number;
  isHoliday?: boolean;
  holidayName?: string;
}

// Booking Form Data
export interface BookingFormData {
  type: BookingType;
  name: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  company?: string;
  customerType: "individual" | "business" | "contractor" | "interior-designer" | "architect";
  preferredDate: string;
  preferredTime: string;
  alternateDate?: string;
  alternateTime?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  landmark?: string;
  message?: string;
  requirements?: string;
  budget?: BudgetRange;
  projectType?: ProjectType;
  serviceType?: ServiceType;
  urgency?: BookingPriority;
  preferredContactMethod?: "phone" | "email" | "whatsapp";
  bestTimeToContact?: string;
  agreeToTerms: boolean;
}

// Booking Confirmation
export interface BookingConfirmation {
  bookingId: string;
  bookingNumber: string;
  status: BookingStatus;
  message: string;
  confirmationEmail?: boolean;
  confirmationSMS?: boolean;
  appointmentDetails: {
    date: string;
    time: string;
    duration?: number;
    location?: string;
  };
  contactPerson?: {
    name: string;
    phone: string;
    email?: string;
  };
  instructions?: string[];
  cancellationPolicy?: string;
}

// Booking Reschedule Request
export interface BookingRescheduleRequest {
  bookingId: string;
  newDate: string;
  newTime: string;
  reason: string;
  requestedBy: "customer" | "admin";
}

// Booking Cancellation Request
export interface BookingCancellationRequest {
  bookingId: string;
  reason: string;
  cancelledBy: "customer" | "admin";
  refundRequired?: boolean;
  feedback?: string;
}

// Booking Filter Options
export interface BookingFilters {
  status?: BookingStatus[];
  type?: BookingType[];
  priority?: BookingPriority[];
  dateFrom?: string;
  dateTo?: string;
  assignedTo?: string[];
  customerType?: string[];
  source?: BookingSource[];
  search?: string;
}

// Booking Sort Options
export type BookingSortOption =
  | "date-asc"
  | "date-desc"
  | "created-asc"
  | "created-desc"
  | "priority"
  | "status"
  | "customer-name";

// Booking List Response
export interface BookingListResponse {
  bookings: Booking[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasMore: boolean;
  };
  summary?: BookingSummary;
}

// Booking Summary
export interface BookingSummary {
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
  noShow: number;
  todayBookings: number;
  upcomingBookings: number;
}

// Booking Calendar Event
export interface BookingCalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay?: boolean;
  color?: string;
  booking: Booking;
}

// Staff Member (for assignment)
export interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  expertise?: string[];
  availability?: StaffAvailability[];
  currentBookings?: number;
  rating?: number;
}

// Staff Availability
export interface StaffAvailability {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string;
  endTime: string;
  available: boolean;
}

// Booking Settings
export interface BookingSettings {
  workingHours: {
    start: string;
    end: string;
  };
  workingDays: number[]; // 0-6 (Sunday-Saturday)
  slotDuration: number; // in minutes
  bufferTime?: number; // in minutes between bookings
  advanceBookingDays: number;
  maxBookingsPerDay?: number;
  allowSameDayBooking: boolean;
  requireApproval: boolean;
  autoConfirm: boolean;
  reminderTiming: {
    email?: number; // hours before
    sms?: number;
    whatsapp?: number;
  };
  cancellationPolicy: {
    allowCustomerCancellation: boolean;
    cancellationDeadline: number; // hours before
    refundPolicy?: string;
  };
  holidays: Holiday[];
}

// Holiday
export interface Holiday {
  date: string;
  name: string;
  type?: "public" | "company";
  recurring?: boolean;
}

// Booking Statistics
export interface BookingStatistics {
  period: {
    start: string;
    end: string;
  };
  totalBookings: number;
  confirmedBookings: number;
  cancelledBookings: number;
  completedBookings: number;
  noShowRate: number;
  averageDuration: number;
  bookingsByType: Record<BookingType, number>;
  bookingsBySource: Record<BookingSource, number>;
  bookingsByStatus: Record<BookingStatus, number>;
  peakHours: Array<{ hour: number; count: number }>;
  peakDays: Array<{ day: string; count: number }>;
  conversionRate: number;
}

// Booking Notification
export interface BookingNotification {
  id: string;
  bookingId: string;
  type: "confirmation" | "reminder" | "cancellation" | "reschedule" | "completed" | "follow-up";
  recipient: {
    name: string;
    email?: string;
    phone?: string;
  };
  channel: "email" | "sms" | "whatsapp" | "push";
  subject?: string;
  message: string;
  scheduledAt?: string;
  sentAt?: string;
  status: "pending" | "sent" | "failed" | "cancelled";
  error?: string;
}

// Booking Report
export interface BookingReport {
  reportType: "daily" | "weekly" | "monthly" | "custom";
  period: {
    start: string;
    end: string;
  };
  summary: BookingSummary;
  statistics: BookingStatistics;
  topCustomers?: Array<{
    name: string;
    bookings: number;
    revenue?: number;
  }>;
  staffPerformance?: Array<{
    staffId: string;
    name: string;
    bookings: number;
    completionRate: number;
    rating: number;
  }>;
}

// Export all types
export type {
  Booking as default,
};