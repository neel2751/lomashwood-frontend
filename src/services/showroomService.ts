import { api } from "@/lib/axios";
import { API_ENDPOINTS } from "@/config/api";
import type {
  Showroom,
  ShowroomSearchParams,
  ShowroomReview,
  ShowroomFilter,
} from "@/types/showroom.types";
import type { ApiResponse, PaginatedResponse } from "@/types/api.types";

type ApiEnvelope<T> = T | { data: T };

const extractData = <T>(payload: ApiEnvelope<T>): T => {
  if (payload && typeof payload === "object" && "data" in payload) {
    return payload.data as T;
  }
  return payload as T;
};

export interface ShowroomDetail extends Showroom {
  description: string;
  long_description?: string;
  operating_hours: {
    [key: string]: {
      open: string;
      close: string;
      is_closed?: boolean;
    };
  };
  amenities: string[];
  staff: Array<{
    id: string;
    name: string;
    role: string;
    photo?: string;
    bio?: string;
  }>;
  services: string[];
  parking_info?: string;
  public_transport?: string;
  accessibility?: string[];
  gallery_images?: string[];
}

export interface ShowroomAvailability {
  showroom_id: string;
  date: string;
  available: boolean;
  slots: Array<{
    time: string;
    available: boolean;
    capacity: number;
    booked: number;
  }>;
}

export interface ShowroomTimeslot {
  id: string;
  time: string;
  start_time: string;
  end_time: string;
  available: boolean;
  capacity: number;
  booked: number;
  service_type?: "kitchen" | "bedroom" | "both";
}

export interface ShowroomBooking {
  id: string;
  showroom_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  date: string;
  timeslot: string;
  service_type: "kitchen" | "bedroom" | "both";
  number_of_guests?: number;
  special_requests?: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  created_at: string;
  updated_at?: string;
}

export interface ShowroomDirection {
  showroom_id: string;
  distance: number;
  duration: number;
  steps: Array<{
    instruction: string;
    distance: number;
    duration: number;
  }>;
  route_polyline?: string;
  traffic_info?: {
    current_delay: number;
    typical_delay: number;
  };
}

export interface ShowroomNearby extends Showroom {
  distance: number;
  duration?: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export const showroomService = {

  getShowrooms: async (
    params?: ShowroomSearchParams
  ): Promise<ApiResponse<PaginatedResponse<Showroom>>> => {
    const response = await api.get<any>(
      API_ENDPOINTS.showrooms.base,
      { params }
    );
    const payload = response.data;
    const list = extractData<Showroom[]>(payload);
    const total = payload?.total ?? list.length;
    const page = params?.page ?? 1;
    const limit = params?.limit ?? (list.length || 1);
    const totalPages = Math.max(1, Math.ceil(total / limit));

    return {
      data: {
        success: true,
        data: list,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      },
      message: "Showrooms fetched successfully",
      success: true,
    };
  },

  getShowroomById: async (id: string): Promise<ApiResponse<ShowroomDetail>> => {
    const response = await api.get<any>(API_ENDPOINTS.showrooms.byId(id));
    return {
      data: extractData<ShowroomDetail>(response.data),
      message: "Showroom detail fetched successfully",
      success: true,
    };
  },

  searchShowrooms: async (query: string): Promise<ApiResponse<Showroom[]>> => {
    const response = await api.get<Showroom[]>(`${API_ENDPOINTS.showrooms.base}/search`, {
      params: { q: query },
    });
    return { data: response.data, message: "Showrooms search completed", success: true };
  },

  getNearbyShowrooms: async (
    latitude: number,
    longitude: number,
    radius?: number
  ): Promise<ApiResponse<ShowroomNearby[]>> => {
    const response = await api.get<ShowroomNearby[]>(API_ENDPOINTS.showrooms.nearby, {
      params: { lat: latitude, lng: longitude, radius: radius || 50 },
    });
    return { data: response.data, message: "Nearby showrooms fetched successfully", success: true };
  },

  getShowroomAvailability: async (
    showroomId: string,
    date: string
  ): Promise<ApiResponse<ShowroomAvailability>> => {
    const response = await api.get<ShowroomAvailability>(
      `${API_ENDPOINTS.showrooms.byId(showroomId)}/availability`,
      { params: { date } }
    );
    return { data: response.data, message: "Showroom availability fetched successfully", success: true };
  },

  getAvailableTimeSlots: async (
    showroomId: string,
    date: string,
    serviceType?: "kitchen" | "bedroom" | "both"
  ): Promise<ApiResponse<ShowroomTimeslot[]>> => {
    const response = await api.get<ShowroomTimeslot[]>(
      `${API_ENDPOINTS.showrooms.byId(showroomId)}/timeslots`,
      { params: { date, service_type: serviceType } }
    );
    return { data: response.data, message: "Available timeslots fetched successfully", success: true };
  },

  bookShowroomAppointment: async (
    showroomId: string,
    bookingData: Omit<ShowroomBooking, "id" | "showroom_id" | "status" | "created_at">
  ): Promise<ApiResponse<ShowroomBooking>> => {
    const response = await api.post<ShowroomBooking>(
      `${API_ENDPOINTS.showrooms.byId(showroomId)}/book`,
      bookingData
    );
    return { data: response.data, message: "Showroom appointment booked successfully", success: true };
  },

  getShowroomReviews: async (
    showroomId: string,
    page = 1,
    limit = 10
  ): Promise<ApiResponse<PaginatedResponse<ShowroomReview>>> => {
    const response = await api.get<PaginatedResponse<ShowroomReview>>(
      API_ENDPOINTS.showrooms.reviews(showroomId),
      { params: { page, limit } }
    );
    return { data: response.data, message: "Showroom reviews fetched successfully", success: true };
  },

  submitShowroomReview: async (
    showroomId: string,
    reviewData: Omit<ShowroomReview, "id" | "showroom_id" | "created_at" | "updated_at">
  ): Promise<ApiResponse<ShowroomReview>> => {
    const response = await api.post<ShowroomReview>(
      API_ENDPOINTS.showrooms.addReview(showroomId),
      reviewData
    );
    return { data: response.data, message: "Review submitted successfully", success: true };
  },

  getDirections: async (
    showroomId: string,
    origin: { latitude: number; longitude: number }
  ): Promise<ApiResponse<ShowroomDirection>> => {
    const response = await api.get<ShowroomDirection>(
      `${API_ENDPOINTS.showrooms.byId(showroomId)}/directions`,
      { params: { origin_lat: origin.latitude, origin_lng: origin.longitude } }
    );
    return { data: response.data, message: "Directions fetched successfully", success: true };
  },

  getOperatingHours: async (
    showroomId: string
  ): Promise<ApiResponse<ShowroomDetail["operating_hours"]>> => {
    const response = await api.get<ShowroomDetail["operating_hours"]>(
      `${API_ENDPOINTS.showrooms.byId(showroomId)}/hours`
    );
    return { data: response.data, message: "Operating hours fetched successfully", success: true };
  },

  isShowroomOpen: async (
    showroomId: string
  ): Promise<ApiResponse<{ is_open: boolean; next_opening?: string }>> => {
    const response = await api.get<{ is_open: boolean; next_opening?: string }>(
      `${API_ENDPOINTS.showrooms.byId(showroomId)}/status`
    );
    return { data: response.data, message: "Showroom status fetched successfully", success: true };
  },

  getShowroomAmenities: async (
    showroomId: string
  ): Promise<ApiResponse<ShowroomDetail["amenities"]>> => {
    const response = await api.get<ShowroomDetail["amenities"]>(
      `${API_ENDPOINTS.showrooms.byId(showroomId)}/amenities`
    );
    return { data: response.data, message: "Showroom amenities fetched successfully", success: true };
  },

  getShowroomGallery: async (showroomId: string): Promise<ApiResponse<string[]>> => {
    const response = await api.get<string[]>(
      `${API_ENDPOINTS.showrooms.byId(showroomId)}/gallery`
    );
    return { data: response.data, message: "Showroom gallery fetched successfully", success: true };
  },

  getShowroomStaff: async (
    showroomId: string
  ): Promise<ApiResponse<ShowroomDetail["staff"]>> => {
    const response = await api.get<ShowroomDetail["staff"]>(
      `${API_ENDPOINTS.showrooms.byId(showroomId)}/staff`
    );
    return { data: response.data, message: "Showroom staff fetched successfully", success: true };
  },

  getShowroomFilters: async (): Promise<ApiResponse<ShowroomFilter>> => {
    const response = await api.get<ShowroomFilter>(`${API_ENDPOINTS.showrooms.base}/filters`);
    return { data: response.data, message: "Showroom filters fetched successfully", success: true };
  },

  subscribeToShowroom: async (
    showroomId: string,
    email: string
  ): Promise<ApiResponse<{ subscribed: boolean }>> => {
    const response = await api.post<{ subscribed: boolean }>(
      `${API_ENDPOINTS.showrooms.byId(showroomId)}/subscribe`,
      { email }
    );
    return { data: response.data, message: "Subscribed to showroom updates successfully", success: true };
  },

  reportShowroomIssue: async (
    showroomId: string,
    issueData: {
      type: "incorrect_info" | "closed" | "wrong_location" | "other";
      description: string;
      reporter_email?: string;
    }
  ): Promise<ApiResponse<{ reported: boolean }>> => {
    const response = await api.post<{ reported: boolean }>(
      `${API_ENDPOINTS.showrooms.byId(showroomId)}/report`,
      issueData
    );
    return { data: response.data, message: "Issue reported successfully", success: true };
  },

  getShowroomsByCity: async (city: string): Promise<ApiResponse<Showroom[]>> => {
    const response = await api.get<Showroom[]>(`${API_ENDPOINTS.showrooms.base}/city`, {
      params: { city },
    });
    return { data: response.data, message: "Showrooms by city fetched successfully", success: true };
  },

  getFeaturedShowrooms: async (): Promise<ApiResponse<Showroom[]>> => {
    const response = await api.get<Showroom[]>(`${API_ENDPOINTS.showrooms.base}/featured`);
    return { data: response.data, message: "Featured showrooms fetched successfully", success: true };
  },

  getShowroomStats: async (
    showroomId: string
  ): Promise<ApiResponse<{
    total_visits: number;
    total_appointments: number;
    average_rating: number;
    total_reviews: number;
  }>> => {
    const response = await api.get<{
      total_visits: number;
      total_appointments: number;
      average_rating: number;
      total_reviews: number;
    }>(`${API_ENDPOINTS.showrooms.byId(showroomId)}/stats`);
    return { data: response.data, message: "Showroom stats fetched successfully", success: true };
  },

  cancelShowroomAppointment: async (
    showroomId: string,
    appointmentId: string,
    reason?: string
  ): Promise<ApiResponse<{ cancelled: boolean }>> => {
    const response = await api.post<{ cancelled: boolean }>(
      API_ENDPOINTS.showrooms.cancelAppointment(appointmentId),
      { reason, showroomId }
    );
    return { data: response.data, message: "Appointment cancelled successfully", success: true };
  },

  rescheduleShowroomAppointment: async (
    showroomId: string,
    appointmentId: string,
    newDate: string,
    newTimeslot: string
  ): Promise<ApiResponse<ShowroomBooking>> => {
    const response = await api.patch<ShowroomBooking>(
      `${API_ENDPOINTS.showrooms.byId(showroomId)}/appointments/${appointmentId}/reschedule`,
      { date: newDate, timeslot: newTimeslot }
    );
    return { data: response.data, message: "Appointment rescheduled successfully", success: true };
  },

  getShowroomEvents: async (
    showroomId: string
  ): Promise<ApiResponse<Array<{
    id: string;
    title: string;
    description: string;
    date: string;
    start_time: string;
    end_time: string;
    capacity: number;
    registered: number;
    image?: string;
  }>>> => {
    const response = await api.get<Array<{
      id: string;
      title: string;
      description: string;
      date: string;
      start_time: string;
      end_time: string;
      capacity: number;
      registered: number;
      image?: string;
    }>>(`${API_ENDPOINTS.showrooms.byId(showroomId)}/events`);
    return { data: response.data, message: "Showroom events fetched successfully", success: true };
  },

  registerForEvent: async (
    showroomId: string,
    eventId: string,
    userData: { name: string; email: string; phone: string; guests?: number }
  ): Promise<ApiResponse<{ registered: boolean; confirmation_code: string }>> => {
    const response = await api.post<{ registered: boolean; confirmation_code: string }>(
      `${API_ENDPOINTS.showrooms.byId(showroomId)}/events/${eventId}/register`,
      userData
    );
    return { data: response.data, message: "Registered for event successfully", success: true };
  },
};

export default showroomService;