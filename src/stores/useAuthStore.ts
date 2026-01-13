/**
 * Auth Store - Zustand
 * Manages authentication state and user session
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * User interface
 */
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  role: 'user' | 'admin';
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Auth tokens
 */
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

/**
 * Auth state interface
 */
interface AuthState {
  // State
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setUser: (user: User | null) => void;
  setTokens: (tokens: AuthTokens | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  login: (user: User, tokens: AuthTokens) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  clearError: () => void;
  refreshTokens: (tokens: AuthTokens) => void;
  isTokenExpired: () => boolean;
  hasRole: (role: User['role']) => boolean;
}

/**
 * Initial state
 */
const initialState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

/**
 * Create auth store with persistence
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      ...initialState,

      /**
       * Set user
       */
      setUser: (user) => {
        set({
          user,
          isAuthenticated: !!user,
        });
      },

      /**
       * Set tokens
       */
      setTokens: (tokens) => {
        set({ tokens });
      },

      /**
       * Set loading state
       */
      setLoading: (isLoading) => {
        set({ isLoading });
      },

      /**
       * Set error
       */
      setError: (error) => {
        set({ error });
      },

      /**
       * Login user
       */
      login: (user, tokens) => {
        set({
          user,
          tokens,
          isAuthenticated: true,
          error: null,
        });
      },

      /**
       * Logout user
       */
      logout: () => {
        set(initialState);
      },

      /**
       * Update user data
       */
      updateUser: (updates) => {
        const currentUser = get().user;
        if (!currentUser) return;

        set({
          user: {
            ...currentUser,
            ...updates,
            updatedAt: new Date().toISOString(),
          },
        });
      },

      /**
       * Clear error
       */
      clearError: () => {
        set({ error: null });
      },

      /**
       * Refresh tokens
       */
      refreshTokens: (tokens) => {
        set({ tokens });
      },

      /**
       * Check if token is expired
       */
      isTokenExpired: () => {
        const { tokens } = get();
        if (!tokens) return true;

        return Date.now() >= tokens.expiresAt;
      },

      /**
       * Check if user has specific role
       */
      hasRole: (role) => {
        const { user } = get();
        return user?.role === role;
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

/**
 * Selectors for optimal re-renders
 */
export const selectUser = (state: AuthState) => state.user;
export const selectIsAuthenticated = (state: AuthState) => state.isAuthenticated;
export const selectIsLoading = (state: AuthState) => state.isLoading;
export const selectError = (state: AuthState) => state.error;
export const selectTokens = (state: AuthState) => state.tokens;
export const selectUserRole = (state: AuthState) => state.user?.role;
export const selectIsAdmin = (state: AuthState) => state.user?.role === 'admin';

/**
 * Custom hooks for common use cases
 */

/**
 * Hook to get current user
 */
export const useUser = () => useAuthStore(selectUser);

/**
 * Hook to get authentication status
 */
export const useIsAuthenticated = () => useAuthStore(selectIsAuthenticated);

/**
 * Hook to get loading state
 */
export const useAuthLoading = () => useAuthStore(selectIsLoading);

/**
 * Hook to get error state
 */
export const useAuthError = () => useAuthStore(selectError);

/**
 * Hook to get user role
 */
export const useUserRole = () => useAuthStore(selectUserRole);

/**
 * Hook to check if user is admin
 */
export const useIsAdmin = () => useAuthStore(selectIsAdmin);

/**
 * Hook to get auth actions
 */
export const useAuthActions = () => {
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const updateUser = useAuthStore((state) => state.updateUser);
  const setLoading = useAuthStore((state) => state.setLoading);
  const setError = useAuthStore((state) => state.setError);
  const clearError = useAuthStore((state) => state.clearError);
  const refreshTokens = useAuthStore((state) => state.refreshTokens);

  return {
    login,
    logout,
    updateUser,
    setLoading,
    setError,
    clearError,
    refreshTokens,
  };
};

/**
 * Hook to check if token is expired
 */
export const useIsTokenExpired = () => {
  return useAuthStore((state) => state.isTokenExpired());
};

/**
 * Hook to check user role
 */
export const useHasRole = (role: User['role']) => {
  return useAuthStore((state) => state.hasRole(role));
};

/**
 * Utility function to get store state outside React components
 */
export const getAuthState = () => useAuthStore.getState();

/**
 * Utility function to check authentication outside React components
 */
export const isUserAuthenticated = () => {
  const state = getAuthState();
  return state.isAuthenticated && !state.isTokenExpired();
};

/**
 * Utility function to get access token
 */
export const getAccessToken = () => {
  const state = getAuthState();
  return state.tokens?.accessToken;
};

/**
 * Utility function to get refresh token
 */
export const getRefreshToken = () => {
  const state = getAuthState();
  return state.tokens?.refreshToken;
};

/**
 * Initialize auth state (call this in _app.tsx or layout)
 */
export const initializeAuth = () => {
  const state = getAuthState();
  
  // Check if token is expired on initialization
  if (state.isAuthenticated && state.isTokenExpired()) {
    // Token expired, logout user
    state.logout();
    return false;
  }
  
  return state.isAuthenticated;
};

/**
 * Type exports
 */
export type { AuthState };