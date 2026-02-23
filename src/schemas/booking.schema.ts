export type WizardAppointmentType = "home_measurement" | "online" | "showroom";
export type WizardServiceType = "kitchen" | "bedroom" | "both";

export interface WizardCustomerDetails {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address?: string;
  postcode?: string;
  notes?: string;
}

export interface WizardTimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface BookingWizardState {
  step: number;
  appointmentType: WizardAppointmentType | null;
  services: WizardServiceType | null;
  customerDetails: WizardCustomerDetails;
  selectedDate: Date | null;
  selectedSlot: WizardTimeSlot | null;
  showroomId?: string;
}

export interface BookingSubmitPayload {
  appointmentType: WizardAppointmentType;
  services: WizardServiceType;
  customerDetails: WizardCustomerDetails;
  date: string;
  timeSlot: string;
  showroomId?: string;
}

export interface BookingSubmitResponse {
  success: boolean;
  bookingId: string;
  message: string;
}
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
  duration?: number;
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

export type AppointmentType = "kitchen" | "bedroom" | "both";
export type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface TimeSlot {
  id: string;
  time: string;
  startTime: string;
  endTime: string;
  available: boolean;
  capacity?: number;
  bookedSlots?: number;
}

export interface AvailabilityResponse {
  date: string;
  availableSlots: TimeSlot[];
  totalSlots: number;
  availableCount: number;
  showroomId?: string;
}

export interface AppointmentFormData {
  appointmentType: AppointmentType;
  serviceType: AppointmentType;
  specificServices?: string[];
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  notes?: string;
  preferredDate: string;
  timeSlot: string;
  alternativeDate?: string;
  alternativeTimeSlot?: string;
  showroomId?: string;
  source?: string;
  referralCode?: string;
  marketingConsent?: boolean;
}

export interface Appointment {
  id: string;
  confirmationNumber: string;
  userId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  appointmentType: AppointmentType;
  serviceType: AppointmentType;
  specificServices?: string[];
  appointmentDate: string;
  timeSlot: string;
  startTime: string;
  endTime: string;
  duration: number;
  status: AppointmentStatus;
  showroomId?: string;
  showroomName?: string;
  isHomeVisit?: boolean;
  notes?: string;
  internalNotes?: string;
  attachments?: string[];
  source?: string;
  referralCode?: string;
  marketingConsent?: boolean;
  createdAt: string;
  updatedAt: string;
  confirmedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  cancellationReason?: string;
  assignedTo?: string;
  assignedStaffName?: string;
  followUpRequired?: boolean;
  followUpDate?: string;
  followUpNotes?: string;
  rating?: number;
  feedback?: string;
}

export interface BookingWizardStep {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
  isActive: boolean;
}

export interface AvailableDateResponse {
  year: number;
  month: number;
  dates: string[];
}

export interface AppointmentListResponse {
  appointments: Appointment[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

export interface AppointmentStats {
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
  upcoming: Appointment[];
  recent: Appointment[];
}

export interface RescheduleData {
  date: string;
  timeSlot: string;
  reason?: string;
}

export interface CancelData {
  reason?: string;
  feedback?: string;
}

export interface AppointmentNote {
  id: string;
  appointmentId: string;
  note: string;
  createdBy: string;
  createdByName?: string;
  isInternal: boolean;
  createdAt: string;
}

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

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "rescheduled"
  | "in-progress"
  | "completed"
  | "cancelled"
  | "no-show"
  | "awaiting-confirmation";

export type BookingPriority = "low" | "normal" | "high" | "urgent";

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

export type ConsultationType =
  | "initial"
  | "design"
  | "technical"
  | "material-selection"
  | "budget-planning"
  | "follow-up"
  | "final-review";

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

export type ProjectStage =
  | "planning"
  | "design"
  | "procurement"
  | "execution"
  | "completion"
  | "not-started";

export interface BudgetRange {
  min?: number;
  max?: number;
  currency: string;
  flexible?: boolean;
}

export interface SpaceSize {
  value: number;
  unit: "sqft" | "sqm";
  rooms?: number;
}

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

export type SiteVisitPurpose =
  | "measurement"
  | "inspection"
  | "installation"
  | "delivery"
  | "assessment"
  | "consultation"
  | "survey"
  | "follow-up";

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

export interface MeasurementRequest {
  room: string;
  purpose: string;
  notes?: string;
}

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

export interface BookingReminder {
  id: string;
  type: "email" | "sms" | "whatsapp" | "push";
  scheduledAt: string;
  sentAt?: string;
  status: "pending" | "sent" | "failed";
  message?: string;
}

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

export interface BookingMetadata {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referrer?: string;
  device?: string;
  browser?: string;
  ip?: string;
}

export interface ConsultationQuestion {
  question: string;
  answer: string;
  category?: string;
}

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

export interface BookingAvailability {
  date: string;
  slots: BookingSlot[];
  totalSlots: number;
  availableSlots: number;
  isHoliday?: boolean;
  holidayName?: string;
}

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

export interface BookingRescheduleRequest {
  bookingId: string;
  newDate: string;
  newTime: string;
  reason: string;
  requestedBy: "customer" | "admin";
}

export interface BookingCancellationRequest {
  bookingId: string;
  reason: string;
  cancelledBy: "customer" | "admin";
  refundRequired?: boolean;
  feedback?: string;
}

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

export type BookingSortOption =
  | "date-asc"
  | "date-desc"
  | "created-asc"
  | "created-desc"
  | "priority"
  | "status"
  | "customer-name";

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

export interface BookingCalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay?: boolean;
  color?: string;
  booking: Booking;
}

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

export interface StaffAvailability {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  available: boolean;
}

export interface BookingSettings {
  workingHours: {
    start: string;
    end: string;
  };
  workingDays: number[];
  slotDuration: number;
  bufferTime?: number;
  advanceBookingDays: number;
  maxBookingsPerDay?: number;
  allowSameDayBooking: boolean;
  requireApproval: boolean;
  autoConfirm: boolean;
  reminderTiming: {
    email?: number;
    sms?: number;
    whatsapp?: number;
  };
  cancellationPolicy: {
    allowCustomerCancellation: boolean;
    cancellationDeadline: number;
    refundPolicy?: string;
  };
  holidays: Holiday[];
}

export interface Holiday {
  date: string;
  name: string;
  type?: "public" | "company";
  recurring?: boolean;
}

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

export type { Booking as default };