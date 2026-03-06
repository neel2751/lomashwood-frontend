import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  role: 'customer' | 'admin' | 'vendor';
  createdAt: string;
  emailVerified?: boolean;
  addresses?: Address[];
  preferences?: UserPreferences;
}

export interface Address {
  id: string;
  type: 'billing' | 'shipping';
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
}

export interface UserPreferences {
  newsletter: boolean;
  notifications: {
    email: boolean;
    sms: boolean;
    orderUpdates: boolean;
    promotions: boolean;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  acceptTerms: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface UseAuthReturn extends AuthState {

  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;

  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;

  refreshUser: () => Promise<void>;
  deleteAccount: () => Promise<void>;

  addAddress: (address: Omit<Address, 'id'>) => Promise<void>;
  updateAddress: (id: string, address: Partial<Address>) => Promise<void>;
  deleteAddress: (id: string) => Promise<void>;
  setDefaultAddress: (id: string) => Promise<void>;

  updatePreferences: (preferences: Partial<UserPreferences>) => Promise<void>;

  clearError: () => void;
  checkAuth: () => Promise<boolean>;
}

export const useAuth = (): UseAuthReturn => {
  const router = useRouter();
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = useCallback(async (): Promise<boolean> => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));

      const token = localStorage.getItem('auth_token');
      
      if (!token) {
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
        return false;
      }

      const response = await fetch('/api/auth/verify', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Token verification failed');
      }

      const data = await response.json();

      setState({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return true;
    } catch (error) {
      localStorage.removeItem('auth_token');
      
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });

      return false;
    }
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();

      localStorage.setItem('auth_token', data.token);
      
      if (credentials.rememberMe) {
        localStorage.setItem('remember_me', 'true');
      }

      setState({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      router.push('/my-account');
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed',
      }));
      throw error;
    }
  }, [router]);

  const register = useCallback(async (data: RegisterData) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const responseData = await response.json();

      localStorage.setItem('auth_token', responseData.token);

      setState({
        user: responseData.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      router.push('/my-account');
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Registration failed',
      }));
      throw error;
    }
  }, [router]);

  const logout = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));

      const token = localStorage.getItem('auth_token');
      if (token) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('remember_me');

      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });

      router.push('/');
    }
  }, [router]);

  const updateProfile = useCallback(async (data: Partial<User>) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Profile update failed');
      }

      const responseData = await response.json();

      setState((prev) => ({
        ...prev,
        user: responseData.user,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Profile update failed',
      }));
      throw error;
    }
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to send reset email');
      }

      setState((prev) => ({ ...prev, isLoading: false }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Password reset failed',
      }));
      throw error;
    }
  }, []);

  const resetPassword = useCallback(async (token: string, newPassword: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password: newPassword }),
      });

      if (!response.ok) {
        throw new Error('Password reset failed');
      }

      setState((prev) => ({ ...prev, isLoading: false }));
      router.push('/login');
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Password reset failed',
      }));
      throw error;
    }
  }, [router]);

  const changePassword = useCallback(
    async (currentPassword: string, newPassword: string) => {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));

        const token = localStorage.getItem('auth_token');
        const response = await fetch('/api/auth/change-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ currentPassword, newPassword }),
        });

        if (!response.ok) {
          throw new Error('Password change failed');
        }

        setState((prev) => ({ ...prev, isLoading: false }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Password change failed',
        }));
        throw error;
      }
    },
    []
  );

  const refreshUser = useCallback(async () => {
    await checkAuth();
  }, [checkAuth]);

  const deleteAccount = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/auth/delete-account', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Account deletion failed');
      }

      localStorage.removeItem('auth_token');
      localStorage.removeItem('remember_me');

      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });

      router.push('/');
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Account deletion failed',
      }));
      throw error;
    }
  }, [router]);

  const addAddress = useCallback(async (address: Omit<Address, 'id'>) => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/auth/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(address),
      });

      if (!response.ok) {
        throw new Error('Failed to add address');
      }

      await refreshUser();
    } catch (error) {
      throw error;
    }
  }, [refreshUser]);

  const updateAddress = useCallback(
    async (id: string, address: Partial<Address>) => {
      try {
        const token = localStorage.getItem('auth_token');
        const response = await fetch(`/api/auth/addresses/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(address),
        });

        if (!response.ok) {
          throw new Error('Failed to update address');
        }

        await refreshUser();
      } catch (error) {
        throw error;
      }
    },
    [refreshUser]
  );

  const deleteAddress = useCallback(
    async (id: string) => {
      try {
        const token = localStorage.getItem('auth_token');
        const response = await fetch(`/api/auth/addresses/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete address');
        }

        await refreshUser();
      } catch (error) {
        throw error;
      }
    },
    [refreshUser]
  );

  const setDefaultAddress = useCallback(
    async (id: string) => {
      try {
        const token = localStorage.getItem('auth_token');
        const response = await fetch(`/api/auth/addresses/${id}/default`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to set default address');
        }

        await refreshUser();
      } catch (error) {
        throw error;
      }
    },
    [refreshUser]
  );

  const updatePreferences = useCallback(
    async (preferences: Partial<UserPreferences>) => {
      try {
        const token = localStorage.getItem('auth_token');
        const response = await fetch('/api/auth/preferences', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(preferences),
        });

        if (!response.ok) {
          throw new Error('Failed to update preferences');
        }

        await refreshUser();
      } catch (error) {
        throw error;
      }
    },
    [refreshUser]
  );

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    login,
    register,
    logout,
    updateProfile,
    forgotPassword,
    resetPassword,
    changePassword,
    refreshUser,
    deleteAccount,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    updatePreferences,
    clearError,
    checkAuth,
  };
};