import { api } from "@/lib/axios";
import { API_ENDPOINTS } from "@/config/api";
import type {
  Appointment,
  AppointmentFormData,
  TimeSlot,
  AvailabilityResponse,
  AppointmentStats,
} from "@/types/booking.types";

type ApiEnvelope<T> = T | { data: T };

const extractData = <T>(payload: ApiEnvelope<T>): T => {
  if (payload && typeof payload === "object" && "data" in payload) {
    return payload.data as T;
  }
  return payload as T;
};

const mapAppointmentType = (value?: string) => {
  if (value === "showroom-visit" || value === "showroom") return "showroom";
  if (value === "home-visit" || value === "home") return "home";
  if (value === "video-call" || value === "virtual" || value === "online") return "online";
  return value;
};

const buildSlotsParams = (params: {
  date: string;
  serviceType?: "kitchen" | "bedroom" | "both";
  showroomId?: string;
}) => ({
  date: params.date,
  serviceType: params.serviceType,
  appointmentType: mapAppointmentType(params.serviceType),
  showroomId: params.showroomId,
});

export const appointmentService = {

  async getAvailability(params: {
    date: string;
    serviceType?: "kitchen" | "bedroom" | "both";
    showroomId?: string;
  }): Promise<AvailabilityResponse> {
    const { data } = await api.get(API_ENDPOINTS.appointments.slots, {
      params: buildSlotsParams(params),
    });
    const slots = extractData<any[]>(data);

    return {
      date: params.date,
      availableSlots: slots.map((slot) => ({
        id: slot.id,
        time: slot.time,
        startTime: slot.time,
        endTime: slot.time,
        available: !!slot.available,
      })),
      totalSlots: slots.length,
      availableCount: slots.filter((slot) => slot.available).length,
      showroomId: params.showroomId,
    };
  },

  async getAvailableDates(params: {
    year: number;
    month: number;
    serviceType?: "kitchen" | "bedroom" | "both";
    showroomId?: string;
  }): Promise<string[]> {
    const { data } = await api.get(API_ENDPOINTS.appointments.slots, {
      params: {
        year: params.year,
        month: params.month,
        serviceType: params.serviceType,
        appointmentType: mapAppointmentType(params.serviceType),
        showroomId: params.showroomId,
      },
    });
    return extractData<string[]>(data);
  },

  async getTimeSlots(params: {
    date: string;
    serviceType?: "kitchen" | "bedroom" | "both";
    showroomId?: string;
  }): Promise<TimeSlot[]> {
    const { data } = await api.get(API_ENDPOINTS.appointments.slots, {
      params: buildSlotsParams(params),
    });
    const slots = extractData<any[]>(data);

    return slots.map((slot) => ({
      id: slot.id,
      time: slot.time,
      startTime: slot.time,
      endTime: slot.time,
      available: !!slot.available,
    }));
  },

  async getSlotsCount(params: {
    date: string;
    serviceType?: "kitchen" | "bedroom" | "both";
    showroomId?: string;
  }): Promise<{ count: number }> {
    const { data } = await api.get(API_ENDPOINTS.appointments.slotsCount, {
      params: buildSlotsParams(params),
    });
    const countData = extractData<any>(data);
    return {
      count:
        countData?.count ??
        countData?.availableSlots ??
        0,
    };
  },

  async createAppointment(formData: AppointmentFormData): Promise<{
    appointment: Appointment;
    confirmationNumber: string;
  }> {
    const { data } = await api.post(API_ENDPOINTS.appointments.create, formData);
    const payload = extractData<any>(data);
    return {
      appointment: payload?.appointment ?? payload,
      confirmationNumber:
        payload?.confirmationNumber ??
        payload?.appointment?.confirmationNumber ??
        payload?.id ??
        "",
    };
  },

  async getAppointmentById(id: string): Promise<Appointment> {
    const { data } = await api.get(`${API_ENDPOINTS.appointments.create}/${id}`);
    return data;
  },

  async getUserAppointments(params?: {
    status?: "pending" | "confirmed" | "completed" | "cancelled";
    page?: number;
    limit?: number;
  }) {
    const { data } = await api.get(`${API_ENDPOINTS.appointments.create}/my-appointments`, { params });
    return data;
  },

  async updateAppointment(id: string, formData: Partial<AppointmentFormData>): Promise<Appointment> {
    const { data } = await api.patch(`${API_ENDPOINTS.appointments.create}/${id}`, formData);
    return data;
  },

  async cancelAppointment(id: string, reason?: string) {
    const { data } = await api.post(`${API_ENDPOINTS.appointments.create}/${id}/cancel`, { reason });
    return data;
  },

  async rescheduleAppointment(
    id: string,
    rescheduleData: {
      date: string;
      timeSlot: string;
      reason?: string;
    }
  ): Promise<Appointment> {
    const { data } = await api.post(
      `${API_ENDPOINTS.appointments.create}/${id}/reschedule`,
      rescheduleData
    );
    return data;
  },

  async confirmAppointment(id: string): Promise<Appointment> {
    const { data } = await api.post(`${API_ENDPOINTS.appointments.create}/${id}/confirm`);
    return data;
  },

  async addNotes(id: string, notes: string) {
    const { data } = await api.post(`${API_ENDPOINTS.appointments.create}/${id}/notes`, { notes });
    return data;
  },

  async uploadFiles(id: string, files: File[]) {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    const { data } = await api.post(
      `${API_ENDPOINTS.appointments.create}/${id}/upload`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return data;
  },

  async getAppointmentStats(): Promise<AppointmentStats> {
    const { data } = await api.get(`${API_ENDPOINTS.appointments.create}/stats`);
    return data;
  },

  async sendReminder(id: string) {
    const { data } = await api.post(`${API_ENDPOINTS.appointments.create}/${id}/remind`);
    return data;
  },

  async getAppointmentByConfirmation(confirmationNumber: string): Promise<Appointment> {
    const { data } = await api.get(`${API_ENDPOINTS.appointments.create}/confirmation`, {
      params: { number: confirmationNumber },
    });
    return data;
  },

  async checkSlotAvailability(params: {
    date: string;
    timeSlot: string;
    showroomId?: string;
  }) {
    const { data } = await api.post(
      `${API_ENDPOINTS.appointments.create}/check-availability`,
      params
    );
    return data;
  },
};