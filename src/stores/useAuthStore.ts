import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
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

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

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

const initialState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setUser: (user) => {
        set({
          user,
          isAuthenticated: !!user,
        });
      },

      setTokens: (tokens) => {
        set({ tokens });
      },

      setLoading: (isLoading) => {
        set({ isLoading });
      },

      setError: (error) => {
        set({ error });
      },

      login: (user, tokens) => {
        set({
          user,
          tokens,
          isAuthenticated: true,
          error: null,
        });
      },

      logout: () => {
        set(initialState);
      },

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

      clearError: () => {
        set({ error: null });
      },

      refreshTokens: (tokens) => {
        set({ tokens });
      },

      isTokenExpired: () => {
        const { tokens } = get();
        if (!tokens) return true;

        return Date.now() >= tokens.expiresAt;
      },

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

export const selectUser = (state: AuthState) => state.user;
export const selectIsAuthenticated = (state: AuthState) => state.isAuthenticated;
export const selectIsLoading = (state: AuthState) => state.isLoading;
export const selectError = (state: AuthState) => state.error;
export const selectTokens = (state: AuthState) => state.tokens;
export const selectUserRole = (state: AuthState) => state.user?.role;
export const selectIsAdmin = (state: AuthState) => state.user?.role === 'admin';

export const useUser = () => useAuthStore(selectUser);

export const useIsAuthenticated = () => useAuthStore(selectIsAuthenticated);

export const useAuthLoading = () => useAuthStore(selectIsLoading);

export const useAuthError = () => useAuthStore(selectError);

export const useUserRole = () => useAuthStore(selectUserRole);

export const useIsAdmin = () => useAuthStore(selectIsAdmin);

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

export const useIsTokenExpired = () => {
  return useAuthStore((state) => state.isTokenExpired());
};

export const useHasRole = (role: User['role']) => {
  return useAuthStore((state) => state.hasRole(role));
};

export const getAuthState = () => useAuthStore.getState();

export const isUserAuthenticated = () => {
  const state = getAuthState();
  return state.isAuthenticated && !state.isTokenExpired();
};

export const getAccessToken = () => {
  const state = getAuthState();
  return state.tokens?.accessToken;
};

export const getRefreshToken = () => {
  const state = getAuthState();
  return state.tokens?.refreshToken;
};

export const initializeAuth = () => {
  const state = getAuthState();

  if (state.isAuthenticated && state.isTokenExpired()) {
    state.logout();
    return false;
  }
  
  return state.isAuthenticated;
};

export type { AuthState };