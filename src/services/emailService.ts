import api from '@/lib/api';

import { analyticsService } from './analyticsService';

export interface EmailRecipient {
  email: string;
  name?: string;
}

export interface EmailAttachment {
  filename: string;
  content: string | Buffer;
  contentType?: string;
  encoding?: string;
}

export interface BaseEmailData {
  to: EmailRecipient | EmailRecipient[];
  subject: string;
  cc?: EmailRecipient[];
  bcc?: EmailRecipient[];
  replyTo?: string;
  attachments?: EmailAttachment[];
}

export interface ContactEmailData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  preferredContact?: 'email' | 'phone';
  preferredTime?: string;
}

export interface BrochureRequestData {
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  postalCode?: string;
  brochureType: string;
  sendPhysical?: boolean;
}

export interface BusinessEnquiryData {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  businessType: string;
  message: string;
  website?: string;
  estimatedVolume?: string;
}

export interface AppointmentConfirmationData {
  customerName: string;
  customerEmail: string;
  appointmentType: string;
  service: string;
  date: string;
  time: string;
  showroom?: string;
  showroomAddress?: string;
  specialRequests?: string;
  appointmentId: string;
}

export interface QuoteRequestData {
  customerName: string;
  customerEmail: string;
  phone: string;
  productName: string;
  productId: string;
  specifications?: Record<string, any>;
  quantity?: number;
  message?: string;
}

export interface NewsletterSubscriptionData {
  email: string;
  name?: string;
  preferences?: string[];
}

export interface OrderConfirmationData {
  customerName: string;
  customerEmail: string;
  orderId: string;
  orderDate: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shippingAddress: string;
  estimatedDelivery: string;
}

export interface PasswordResetData {
  email: string;
  resetToken: string;
  resetUrl: string;
  expiresIn: string;
}

export interface EmailVerificationData {
  email: string;
  name: string;
  verificationToken: string;
  verificationUrl: string;
}

export interface EmailResponse {
  success: boolean;
  messageId?: string;
  message: string;
}

class EmailService {

  async sendContactEmail(data: ContactEmailData): Promise<EmailResponse> {
    try {
      const response = await api.post<EmailResponse>('/api/contact', {
        type: 'contact',
        data,
      });

      if (response.data.success) {
        analyticsService.trackFormSubmit('contact_form', true);
      }

      return response.data;
    } catch (error) {
      analyticsService.trackFormSubmit('contact_form', false);
      throw error;
    }
  }

  async sendBrochureRequest(data: BrochureRequestData): Promise<EmailResponse> {
    try {
      const response = await api.post<EmailResponse>('/api/contact', {
        type: 'brochure_request',
        data,
      });

      if (response.data.success) {
        analyticsService.trackFormSubmit('brochure_request', true);
        analyticsService.trackBrochureDownload(data.brochureType);
      }

      return response.data;
    } catch (error) {
      analyticsService.trackFormSubmit('brochure_request', false);
      throw error;
    }
  }

  async sendBusinessEnquiry(data: BusinessEnquiryData): Promise<EmailResponse> {
    try {
      const response = await api.post<EmailResponse>('/api/contact', {
        type: 'business_enquiry',
        data,
      });

      if (response.data.success) {
        analyticsService.trackFormSubmit('business_enquiry', true);
      }

      return response.data;
    } catch (error) {
      analyticsService.trackFormSubmit('business_enquiry', false);
      throw error;
    }
  }

  async sendAppointmentConfirmation(
    data: AppointmentConfirmationData
  ): Promise<EmailResponse> {
    try {
      const response = await api.post<EmailResponse>('/api/contact', {
        type: 'appointment_confirmation',
        data,
      });

      if (response.data.success) {
        analyticsService.trackEvent({
          event: 'appointment_confirmation_sent',
          category: 'Email',
          action: 'send',
          label: 'appointment_confirmation',
        });
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async sendAppointmentReminder(
    data: AppointmentConfirmationData
  ): Promise<EmailResponse> {
    try {
      const response = await api.post<EmailResponse>('/api/contact', {
        type: 'appointment_reminder',
        data,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async sendQuoteRequest(data: QuoteRequestData): Promise<EmailResponse> {
    try {
      const response = await api.post<EmailResponse>('/api/contact', {
        type: 'quote_request',
        data,
      });

      if (response.data.success) {
        analyticsService.trackFormSubmit('quote_request', true, {
          product_id: data.productId,
          product_name: data.productName,
        });
      }

      return response.data;
    } catch (error) {
      analyticsService.trackFormSubmit('quote_request', false);
      throw error;
    }
  }

  async subscribeNewsletter(data: NewsletterSubscriptionData): Promise<EmailResponse> {
    try {
      const response = await api.post<EmailResponse>('/api/newsletter', {
        type: 'subscribe',
        data,
      });

      if (response.data.success) {
        analyticsService.trackNewsletterSignup(true);
      }

      return response.data;
    } catch (error) {
      analyticsService.trackNewsletterSignup(false);
      throw error;
    }
  }

  async unsubscribeNewsletter(email: string, token?: string): Promise<EmailResponse> {
    try {
      const response = await api.post<EmailResponse>('/api/newsletter', {
        type: 'unsubscribe',
        data: { email, token },
      });

      if (response.data.success) {
        analyticsService.trackEvent({
          event: 'newsletter_unsubscribe',
          category: 'Email',
          action: 'unsubscribe',
          label: 'newsletter',
        });
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async sendOrderConfirmation(data: OrderConfirmationData): Promise<EmailResponse> {
    try {
      const response = await api.post<EmailResponse>('/api/contact', {
        type: 'order_confirmation',
        data,
      });

      if (response.data.success) {
        analyticsService.trackEvent({
          event: 'order_confirmation_sent',
          category: 'Email',
          action: 'send',
          label: 'order_confirmation',
          value: data.total,
        });
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async sendPasswordResetEmail(data: PasswordResetData): Promise<EmailResponse> {
    try {
      const response = await api.post<EmailResponse>('/api/contact', {
        type: 'password_reset',
        data,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async sendEmailVerification(data: EmailVerificationData): Promise<EmailResponse> {
    try {
      const response = await api.post<EmailResponse>('/api/contact', {
        type: 'email_verification',
        data,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async sendWelcomeEmail(email: string, name: string): Promise<EmailResponse> {
    try {
      const response = await api.post<EmailResponse>('/api/contact', {
        type: 'welcome',
        data: { email, name },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async sendCustomEmail(
    emailData: BaseEmailData & { template?: string; templateData?: Record<string, any> }
  ): Promise<EmailResponse> {
    try {
      const response = await api.post<EmailResponse>('/api/contact', {
        type: 'custom',
        data: emailData,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async sendBulkEmail(
    recipients: EmailRecipient[],
    subject: string,
    template: string,
    templateData: Record<string, any>
  ): Promise<EmailResponse> {
    try {
      const response = await api.post<EmailResponse>('/api/contact', {
        type: 'bulk',
        data: {
          recipients,
          subject,
          template,
          templateData,
        },
      });

      if (response.data.success) {
        analyticsService.trackEvent({
          event: 'bulk_email_sent',
          category: 'Email',
          action: 'send_bulk',
          label: template,
          value: recipients.length,
        });
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async sendReviewRequest(
    customerEmail: string,
    customerName: string,
    orderId: string,
    productName: string
  ): Promise<EmailResponse> {
    try {
      const response = await api.post<EmailResponse>('/api/contact', {
        type: 'review_request',
        data: {
          email: customerEmail,
          name: customerName,
          orderId,
          productName,
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async sendAbandonmentReminder(
    email: string,
    name: string,
    abandonmentType: 'cart' | 'booking' | 'quote',
    data: Record<string, any>
  ): Promise<EmailResponse> {
    try {
      const response = await api.post<EmailResponse>('/api/contact', {
        type: 'abandonment_reminder',
        data: {
          email,
          name,
          abandonmentType,
          ...data,
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async sendPromotionalEmail(
    email: string,
    name: string,
    promotionType: string,
    promotionData: Record<string, any>
  ): Promise<EmailResponse> {
    try {
      const response = await api.post<EmailResponse>('/api/contact', {
        type: 'promotional',
        data: {
          email,
          name,
          promotionType,
          ...promotionData,
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validateEmails(emails: string[]): { valid: string[]; invalid: string[] } {
    const valid: string[] = [];
    const invalid: string[] = [];

    emails.forEach((email) => {
      if (this.validateEmail(email)) {
        valid.push(email);
      } else {
        invalid.push(email);
      }
    });

    return { valid, invalid };
  }
}

export const emailService = new EmailService();