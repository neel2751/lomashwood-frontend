import api from '@/lib/api';

import { analyticsService } from './analyticsService';

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  newsletter?: boolean;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  role: 'customer' | 'admin' | 'staff';
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface VerifyEmailData {
  token: string;
}

export interface ResendVerificationData {
  email: string;
}

const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'user';

class AuthService {

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', credentials);
      
      if (response.data) {
        this.setSession(response.data);
        analyticsService.setUserId(response.data.user.id);
        analyticsService.trackEvent({
          event: 'login',
          category: 'Auth',
          action: 'login',
          label: 'success',
        });
      }
      
      return response.data;
    } catch (error) {
      analyticsService.trackEvent({
        event: 'login',
        category: 'Auth',
        action: 'login',
        label: 'error',
      });
      throw error;
    }
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/register', data);
      
      if (response.data) {
        this.setSession(response.data);
        analyticsService.setUserId(response.data.user.id);
        analyticsService.trackEvent({
          event: 'sign_up',
          category: 'Auth',
          action: 'register',
          label: 'success',
        });
      }
      
      return response.data;
    } catch (error) {
      analyticsService.trackEvent({
        event: 'sign_up',
        category: 'Auth',
        action: 'register',
        label: 'error',
      });
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearSession();
      analyticsService.clearUserData();
      analyticsService.trackEvent({
        event: 'logout',
        category: 'Auth',
        action: 'logout',
        label: 'success',
      });
    }
  }

  async forgotPassword(data: ForgotPasswordData): Promise<{ message: string }> {
    try {
      const response = await api.post<{ message: string }>(
        '/auth/forgot-password',
        data
      );
      
      analyticsService.trackEvent({
        event: 'forgot_password',
        category: 'Auth',
        action: 'forgot_password',
        label: 'request_sent',
      });
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(data: ResetPasswordData): Promise<{ message: string }> {
    try {
      const response = await api.post<{ message: string }>(
        '/auth/reset-password',
        data
      );
      
      analyticsService.trackEvent({
        event: 'reset_password',
        category: 'Auth',
        action: 'reset_password',
        label: 'success',
      });
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async changePassword(data: ChangePasswordData): Promise<{ message: string }> {
    try {
      const response = await api.post<{ message: string }>(
        '/auth/change-password',
        data
      );
      
      analyticsService.trackEvent({
        event: 'change_password',
        category: 'Auth',
        action: 'change_password',
        label: 'success',
      });
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async verifyEmail(data: VerifyEmailData): Promise<{ message: string; user: User }> {
    try {
      const response = await api.post<{ message: string; user: User }>(
        '/auth/verify-email',
        data
      );

      if (response.data.user) {
        this.setUser(response.data.user);
      }
      
      analyticsService.trackEvent({
        event: 'verify_email',
        category: 'Auth',
        action: 'verify_email',
        label: 'success',
      });
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async resendVerification(data: ResendVerificationData): Promise<{ message: string }> {
    try {
      const response = await api.post<{ message: string }>(
        '/auth/resend-verification',
        data
      );
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async refreshToken(): Promise<AuthResponse> {
    try {
      const refreshToken = this.getRefreshToken();
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
      
      const response = await api.post<AuthResponse>('/auth/refresh', {
        refreshToken,
      });
      
      if (response.data) {
        this.setSession(response.data);
      }
      
      return response.data;
    } catch (error) {
      this.clearSession();
      throw error;
    }
  }

  async getCurrentUser(): Promise<User> {
    try {
      const response = await api.get<User>('/auth/me');
      
      if (response.data) {
        this.setUser(response.data);
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  getUser(): User | null {
    if (typeof window === 'undefined') return null;
    
    const userStr = localStorage.getItem(USER_KEY);
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }

  private setSession(data: AuthResponse): void {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  }

  setUser(user: User): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private clearSession(): void {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  async socialLogin(provider: 'google' | 'facebook', token: string): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>(`/auth/${provider}`, {
        token,
      });
      
      if (response.data) {
        this.setSession(response.data);
        analyticsService.setUserId(response.data.user.id);
        analyticsService.trackEvent({
          event: 'login',
          category: 'Auth',
          action: 'social_login',
          label: provider,
        });
      }
      
      return response.data;
    } catch (error) {
      analyticsService.trackEvent({
        event: 'login',
        category: 'Auth',
        action: 'social_login',
        label: `${provider}_error`,
      });
      throw error;
    }
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = payload.exp * 1000;
      
      return Date.now() >= expirationTime;
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return true;
    }
  }

  async validateSession(): Promise<boolean> {
    if (!this.isAuthenticated()) {
      return false;
    }
    
    if (this.isTokenExpired()) {
      try {
        await this.refreshToken();
        return true;
      } catch (error) {
        this.clearSession();
        return false;
      }
    }
    
    return true;
  }
}

export const authService = new AuthService();