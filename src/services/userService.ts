import api from '@/lib/api';
import type {
  User,
  UserPreferences,
} from '@/types/user.types';

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  bio?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  occupation?: string;
  company?: string;
  website?: string;
}

export interface UserAddress {
  id: string;
  type: 'home' | 'work' | 'billing' | 'shipping' | 'other';
  isDefault: boolean;
  label?: string;
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  instructions?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserNotificationSettings {
  email: {
    marketing: boolean;
    productUpdates: boolean;
    orderUpdates: boolean;
    appointmentReminders: boolean;
    newsletter: boolean;
    promotions: boolean;
  };
  push: {
    enabled: boolean;
    orderUpdates: boolean;
    appointmentReminders: boolean;
    promotions: boolean;
  };
  sms: {
    enabled: boolean;
    orderUpdates: boolean;
    appointmentReminders: boolean;
  };
}

export interface UserStats {
  totalOrders: number;
  totalSpent: number;
  totalAppointments: number;
  totalReviews: number;
  memberSince: string;
  loyaltyPoints?: number;
  accountStatus: 'active' | 'inactive' | 'suspended';
  lastLogin?: string;
}
export const userService = {

  getProfile: async (): Promise<User> => {
    const response = await api.get<{ data: User }>('/api/user/profile');
    return response.data.data;
  },

  updateProfile: async (data: UpdateProfileRequest): Promise<User> => {
    const response = await api.put<{ data: User }>('/api/user/profile', data);
    return response.data.data;
  },

  updateProfilePicture: async (file: File): Promise<{
    url: string;
    message: string;
  }> => {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await api.post<{ url: string; message: string }>(
      '/api/user/profile/avatar',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  deleteProfilePicture: async (): Promise<{
    success: boolean;
    message: string;
  }> => {
    const response = await api.delete<{ success: boolean; message: string }>(
      '/api/user/profile/avatar'
    );
    return response.data;
  },

  getPreferences: async (): Promise<UserPreferences> => {
    const response = await api.get<{ data: UserPreferences }>(
      '/api/user/preferences'
    );
    return response.data.data;
  },


  updatePreferences: async (
    preferences: Partial<UserPreferences>
  ): Promise<UserPreferences> => {
    const response = await api.put<{ data: UserPreferences }>(
      '/api/user/preferences',
      preferences
    );
    return response.data.data;
  },

  getNotificationSettings: async (): Promise<UserNotificationSettings> => {
    const response = await api.get<{ data: UserNotificationSettings }>(
      '/api/user/notifications/settings'
    );
    return response.data.data;
  },

  updateNotificationSettings: async (
    settings: Partial<UserNotificationSettings>
  ): Promise<UserNotificationSettings> => {
    const response = await api.put<{ data: UserNotificationSettings }>(
      '/api/user/notifications/settings',
      settings
    );
    return response.data.data;
  },

  getAddresses: async (): Promise<UserAddress[]> => {
    const response = await api.get<{ data: UserAddress[] }>(
      '/api/user/addresses'
    );
    return response.data.data;
  },

  getAddressById: async (addressId: string): Promise<UserAddress> => {
    const response = await api.get<{ data: UserAddress }>(
      `/api/user/addresses/${addressId}`
    );
    return response.data.data;
  },

  addAddress: async (
    address: Omit<UserAddress, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<UserAddress> => {
    const response = await api.post<{ data: UserAddress }>(
      '/api/user/addresses',
      address
    );
    return response.data.data;
  },

  updateAddress: async (
    addressId: string,
    address: Partial<UserAddress>
  ): Promise<UserAddress> => {
    const response = await api.put<{ data: UserAddress }>(
      `/api/user/addresses/${addressId}`,
      address
    );
    return response.data.data;
  },

  deleteAddress: async (addressId: string): Promise<{
    success: boolean;
    message: string;
  }> => {
    const response = await api.delete<{ success: boolean; message: string }>(
      `/api/user/addresses/${addressId}`
    );
    return response.data;
  },

  setDefaultAddress: async (addressId: string): Promise<{
    success: boolean;
    message: string;
  }> => {
    const response = await api.post<{ success: boolean; message: string }>(
      `/api/user/addresses/${addressId}/set-default`
    );
    return response.data;
  },

  getStats: async (): Promise<UserStats> => {
    const response = await api.get<{ data: UserStats }>('/api/user/stats');
    return response.data.data;
  },

  getActivityLog: async (params?: {
    page?: number;
    limit?: number;
  }): Promise<{
    data: Array<{
      id: string;
      action: string;
      description: string;
      metadata?: Record<string, any>;
      createdAt: string;
    }>;
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }> => {
    const response = await api.get('/api/user/activity', { params });
    return response.data;
  },

  getNotifications: async (params?: {
    page?: number;
    limit?: number;
    unreadOnly?: boolean;
  }): Promise<{
    data: Array<{
      id: string;
      type: string;
      title: string;
      message: string;
      read: boolean;
      metadata?: Record<string, any>;
      createdAt: string;
    }>;
    meta: {
      total: number;
      unread: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }> => {
    const response = await api.get('/api/user/notifications', { params });
    return response.data;
  },

  markNotificationAsRead: async (notificationId: string): Promise<{
    success: boolean;
  }> => {
    const response = await api.put<{ success: boolean }>(
      `/api/user/notifications/${notificationId}/read`
    );
    return response.data;
  },

  markAllNotificationsAsRead: async (): Promise<{
    success: boolean;
    message: string;
  }> => {
    const response = await api.put<{ success: boolean; message: string }>(
      '/api/user/notifications/read-all'
    );
    return response.data;
  },

  deleteNotification: async (notificationId: string): Promise<{
    success: boolean;
  }> => {
    const response = await api.delete<{ success: boolean }>(
      `/api/user/notifications/${notificationId}`
    );
    return response.data;
  },

  clearAllNotifications: async (): Promise<{
    success: boolean;
    message: string;
  }> => {
    const response = await api.delete<{ success: boolean; message: string }>(
      '/api/user/notifications'
    );
    return response.data;
  },

  deleteAccount: async (password: string): Promise<{
    success: boolean;
    message: string;
  }> => {
    const response = await api.delete<{ success: boolean; message: string }>(
      '/api/user/account',
      {
        data: { password },
      }
    );
    return response.data;
  },

  exportUserData: async (): Promise<{
    downloadUrl: string;
    expiresAt: string;
  }> => {
    const response = await api.post<{
      downloadUrl: string;
      expiresAt: string;
    }>('/api/user/export');
    return response.data;
  },

  getPaymentMethods: async (): Promise<
    Array<{
      id: string;
      type: 'card' | 'bank';
      last4: string;
      brand?: string;
      expiryMonth?: number;
      expiryYear?: number;
      isDefault: boolean;
      createdAt: string;
    }>
  > => {
    const response = await api.get('/api/user/payment-methods');
    return response.data.data;
  },

  addPaymentMethod: async (data: {
    type: 'card' | 'bank';
    token: string;
    setAsDefault?: boolean;
  }): Promise<{
    id: string;
    message: string;
  }> => {
    const response = await api.post<{ id: string; message: string }>(
      '/api/user/payment-methods',
      data
    );
    return response.data;
  },

  deletePaymentMethod: async (methodId: string): Promise<{
    success: boolean;
    message: string;
  }> => {
    const response = await api.delete<{ success: boolean; message: string }>(
      `/api/user/payment-methods/${methodId}`
    );
    return response.data;
  },

  setDefaultPaymentMethod: async (methodId: string): Promise<{
    success: boolean;
    message: string;
  }> => {
    const response = await api.post<{ success: boolean; message: string }>(
      `/api/user/payment-methods/${methodId}/set-default`
    );
    return response.data;
  },

  subscribeToNewsletter: async (email: string): Promise<{
    success: boolean;
    message: string;
  }> => {
    const response = await api.post<{ success: boolean; message: string }>(
      '/api/user/newsletter/subscribe',
      { email }
    );
    return response.data;
  },

  unsubscribeFromNewsletter: async (): Promise<{
    success: boolean;
    message: string;
  }> => {
    const response = await api.post<{ success: boolean; message: string }>(
      '/api/user/newsletter/unsubscribe'
    );
    return response.data;
  },

  updateEmailPreferences: async (preferences: {
    marketing: boolean;
    productUpdates: boolean;
    orderUpdates: boolean;
    appointmentReminders: boolean;
  }): Promise<{
    success: boolean;
    message: string;
  }> => {
    const response = await api.put<{ success: boolean; message: string }>(
      '/api/user/email-preferences',
      preferences
    );
    return response.data;
  },

  verifyPhoneNumber: async (data: {
    phoneNumber: string;
    code: string;
  }): Promise<{
    success: boolean;
    message: string;
  }> => {
    const response = await api.post<{ success: boolean; message: string }>(
      '/api/user/verify-phone',
      data
    );
    return response.data;
  },

  sendPhoneVerificationCode: async (phoneNumber: string): Promise<{
    success: boolean;
    message: string;
  }> => {
    const response = await api.post<{ success: boolean; message: string }>(
      '/api/user/send-phone-code',
      { phoneNumber }
    );
    return response.data;
  },

  getReferralCode: async (): Promise<{
    code: string;
    referrals: number;
    earnings: number;
  }> => {
    const response = await api.get<{
      code: string;
      referrals: number;
      earnings: number;
    }>('/api/user/referral');
    return response.data;
  },

  getReferralHistory: async (params?: {
    page?: number;
    limit?: number;
  }): Promise<{
    data: Array<{
      id: string;
      name: string;
      email: string;
      status: 'pending' | 'completed';
      reward: number;
      createdAt: string;
    }>;
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }> => {
    const response = await api.get('/api/user/referral/history', { params });
    return response.data;
  },
};