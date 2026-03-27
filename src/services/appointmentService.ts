import { api } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/api.endpoints";
import type {
  Appointment,
  AppointmentFormData,
  TimeSlot,
  AvailabilityResponse,
  AppointmentStats,
} from "@/types/booking.types";

type ApiEnvelope<T> = T | { data: T };

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
    const { data } = await api.get(API_ENDPOINTS.appointments.slots, { params });
    return data;
  },

  async getAvailableDates(params: {
    year: number;
    month: number;
    serviceType?: "kitchen" | "bedroom" | "both";
    showroomId?: string;
  }): Promise<string[]> {
    const { data } = await api.get(API_ENDPOINTS.appointments.slots, { params });
    return data;
  },

  async getTimeSlots(params: {
    date: string;
    serviceType?: "kitchen" | "bedroom" | "both";
    showroomId?: string;
  }): Promise<TimeSlot[]> {
    const { data } = await api.get(API_ENDPOINTS.appointments.slots, { params });
    return data;
  },

  async getSlotsCount(params: {
    date: string;
    serviceType?: "kitchen" | "bedroom" | "both";
    showroomId?: string;
  }): Promise<{ count: number }> {
    const { data } = await api.get(API_ENDPOINTS.appointments.slotsCount, { params });
    return data;
  },

  async createAppointment(formData: AppointmentFormData): Promise<{
    appointment: Appointment;
    confirmationNumber: string;
  }> {
    const { data } = await api.post(API_ENDPOINTS.appointments.create, formData);
    return data;
  },

  async getAppointmentById(id: string): Promise<Appointment> {
    const { data } = await api.get(`/appointments/${id}`);
    return data;
  },

  async getUserAppointments(params?: {
    status?: "pending" | "confirmed" | "completed" | "cancelled";
    page?: number;
    limit?: number;
  }) {
    const { data } = await api.get('/appointments/my-appointments', { params });
    return data;
  },

  async updateAppointment(id: string, formData: Partial<AppointmentFormData>): Promise<Appointment> {
    const { data } = await api.patch(`/appointments/${id}`, formData);
    return data;
  },

  async cancelAppointment(id: string, reason?: string) {
    const { data } = await api.post(`/appointments/${id}/cancel`, { reason });
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
    const { data } = await api.post(`/appointments/${id}/reschedule`, rescheduleData);
    return data;
  },

  async confirmAppointment(id: string): Promise<Appointment> {
    const { data } = await api.post(`/appointments/${id}/confirm`);
    return data;
  },

  async addNotes(id: string, notes: string) {
    const { data } = await api.post(`/appointments/${id}/notes`, { notes });
    return data;
  },

  async uploadFiles(id: string, files: File[]) {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    const { data } = await api.post(`/appointments/${id}/upload`, formData, { headers: { "Content-Type": "multipart/form-data" } });
    return data;
  },

  async getAppointmentStats(): Promise<AppointmentStats> {
    const { data } = await api.get('/appointments/stats');
    return data;
  },

  async sendReminder(id: string) {
    const { data } = await api.post(`/appointments/${id}/remind`);
    return data;
  },

  async getAppointmentByConfirmation(confirmationNumber: string): Promise<Appointment> {
    const { data } = await api.get('/appointments/confirmation', { params: { number: confirmationNumber } });
    return data;
  },

  async checkSlotAvailability(params: {
    date: string;
    timeSlot: string;
    showroomId?: string;
  }) {
    const { data } = await api.post('/appointments/check-availability', params);
    return data;
  },
};