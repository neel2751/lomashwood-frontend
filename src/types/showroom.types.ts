export interface Showroom {
  id: string;
  name: string;
  description: string;
  address: ShowroomAddress;
  contact: ShowroomContact;
  hours: ShowroomHours[];
  images: string[];
  thumbnail?: string;
  features: string[];
  status: ShowroomStatus;
  rating?: number;
  reviewCount?: number;
  coordinates?: Coordinates;
  createdAt: Date;
  updatedAt: Date;
}

export interface ShowroomAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  landmark?: string;
}

export interface ShowroomContact {
  phone: string[];
  email: string;
  whatsapp?: string;
  website?: string;
}

export interface ShowroomHours {
  day: DayOfWeek;
  open: string;
  close: string;
  isClosed?: boolean;
}

export enum DayOfWeek {
  MONDAY = "monday",
  TUESDAY = "tuesday",
  WEDNESDAY = "wednesday",
  THURSDAY = "thursday",
  FRIDAY = "friday",
  SATURDAY = "saturday",
  SUNDAY = "sunday",
}

export enum ShowroomStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  UNDER_RENOVATION = "under_renovation",
  TEMPORARILY_CLOSED = "temporarily_closed",
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface ShowroomReview {
  id: string;
  showroomId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  images?: string[];
  helpful: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ShowroomProduct {
  id: string;
  showroomId: string;
  productId: string;
  productName: string;
  productImage?: string;
  category: string;
  isAvailable: boolean;
  displayOrder?: number;
  featured?: boolean;
}

export interface ShowroomAppointment {
  id: string;
  showroomId: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  appointmentDate: Date;
  timeSlot: string;
  status: AppointmentStatus;
  notes?: string;
  productInterest?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export enum AppointmentStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  CANCELLED = "cancelled",
  COMPLETED = "completed",
  NO_SHOW = "no_show",
}

export interface ShowroomVisit {
  id: string;
  showroomId: string;
  userId?: string;
  visitDate: Date;
  duration?: number; // in minutes
  productsViewed?: string[];
  inquiryMade: boolean;
  notes?: string;
}

export interface ShowroomStats {
  showroomId: string;
  totalVisits: number;
  totalAppointments: number;
  averageRating: number;
  totalReviews: number;
  popularProducts: ShowroomProduct[];
  peakHours: {
    day: DayOfWeek;
    hour: number;
    visitCount: number;
  }[];
}

export interface ShowroomFilter {
  city?: string;
  state?: string;
  status?: ShowroomStatus;
  minRating?: number;
  hasAvailableProducts?: boolean;
  features?: string[];
}

export interface ShowroomSearchParams {
  query?: string;
  filter?: ShowroomFilter;
  sort?: ShowroomSortOption;
  page?: number;
  limit?: number;
}

export enum ShowroomSortOption {
  NAME_ASC = "name_asc",
  NAME_DESC = "name_desc",
  RATING_HIGH = "rating_high",
  RATING_LOW = "rating_low",
  DISTANCE = "distance",
  NEWEST = "newest",
}

export interface ShowroomDistance {
  showroom: Showroom;
  distance: number; // in kilometers
  duration?: string; // estimated travel time
}

export interface CreateShowroomData {
  name: string;
  description: string;
  address: ShowroomAddress;
  contact: ShowroomContact;
  hours: ShowroomHours[];
  images?: string[];
  features?: string[];
  coordinates?: Coordinates;
}

export interface UpdateShowroomData {
  name?: string;
  description?: string;
  address?: ShowroomAddress;
  contact?: ShowroomContact;
  hours?: ShowroomHours[];
  images?: string[];
  features?: string[];
  status?: ShowroomStatus;
  coordinates?: Coordinates;
}

export interface BookAppointmentData {
  showroomId: string;
  appointmentDate: Date;
  timeSlot: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  notes?: string;
  productInterest?: string[];
}

export interface CreateReviewData {
  showroomId: string;
  rating: number;
  comment: string;
  images?: string[];
}

export type ShowroomCardData = Pick<
  Showroom,
  "id" | "name" | "thumbnail" | "address" | "contact" | "rating" | "reviewCount"
>;

export type ShowroomListItem = Pick<
  Showroom,
  "id" | "name" | "address" | "contact" | "status" | "rating"
>;