"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

import type {
  User,
  AuthUser,
  LoginCredentials,
  RegisterData,
} from "@/types/user.types";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
  storageKey?: string;
  tokenKey?: string;
  apiUrl?: string;
}

export function AuthProvider({
  children,
  storageKey = "lomash-wood-auth",
  tokenKey = "lomash-wood-token",
  apiUrl = process.env.NEXT_PUBLIC_API_URL || "/api",
}: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const isAuthenticated = !!user && !!token;

  const saveAuthData = useCallback(
    (authData: AuthUser) => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(authData.user));
        localStorage.setItem(tokenKey, authData.token);
        setUser(authData.user);
        setToken(authData.token);
      } catch (error) {
        console.error("Failed to save auth data:", error);
      }
    },
    [storageKey, tokenKey]
  );

  const clearAuthData = useCallback(() => {
    try {
      localStorage.removeItem(storageKey);
      localStorage.removeItem(tokenKey);
      setUser(null);
      setToken(null);
    } catch (error) {
      console.error("Failed to clear auth data:", error);
    }
  }, [storageKey, tokenKey]);

  const loadAuthData = useCallback(() => {
    try {
      const storedUser = localStorage.getItem(storageKey);
      const storedToken = localStorage.getItem(tokenKey);

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }
    } catch (error) {
      console.error("Failed to load auth data:", error);
      clearAuthData();
    } finally {
      setIsLoading(false);
    }
  }, [storageKey, tokenKey, clearAuthData]);

  useEffect(() => {
    loadAuthData();
  }, [loadAuthData]);

  useEffect(() => {
    if (token && !isLoading) {
      verifyAndRefreshUser();
    }
  }, [token, isLoading]);

  const verifyAndRefreshUser = async () => {
    try {
      const response = await fetch(`${apiUrl}/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Token verification failed");
      }

      const data = await response.json();
      if (data.success && data.data) {
        setUser(data.data);
        localStorage.setItem(storageKey, JSON.stringify(data.data));
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      clearAuthData();
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);

      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (!data.success || !data.data) {
        throw new Error("Invalid response format");
      }

      const authData: AuthUser = {
        user: data.data.user,
        token: data.data.token,
        refreshToken: data.data.refreshToken,
      };

      saveAuthData(authData);
      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setIsLoading(true);

      const response = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Registration failed");
      }

      if (!responseData.success || !responseData.data) {
        throw new Error("Invalid response format");
      }

      const authData: AuthUser = {
        user: responseData.data.user,
        token: responseData.data.token,
        refreshToken: responseData.data.refreshToken,
      };

      saveAuthData(authData);
      router.push("/");
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);

      if (token) {
        await fetch(`${apiUrl}/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }).catch((error) => {
          console.error("Logout API call failed:", error);
        });
      }

      clearAuthData();
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = useCallback(
    (updatedUser: User) => {
      try {
        setUser(updatedUser);
        localStorage.setItem(storageKey, JSON.stringify(updatedUser));
      } catch (error) {
        console.error("Failed to update user:", error);
      }
    },
    [storageKey]
  );

  const refreshToken = async () => {
    try {
      const response = await fetch(`${apiUrl}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Token refresh failed");
      }

      if (data.success && data.data?.token) {
        localStorage.setItem(tokenKey, data.data.token);
        setToken(data.data.token);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Token refresh error:", error);
      clearAuthData();
      throw error;
    }
  };

  useEffect(() => {
    if (!token || !isAuthenticated) return;

    const refreshInterval = setInterval(
      () => {
        refreshToken().catch((error) => {
          console.error("Auto token refresh failed:", error);
        });
      },
      50 * 60 * 1000
    );

    return () => clearInterval(refreshInterval);
  }, [token, isAuthenticated]);

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateUser,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function useRequireAuth(redirectUrl = "/login") {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectUrl);
    }
  }, [isAuthenticated, isLoading, redirectUrl, router]);

  return { isAuthenticated, isLoading };
}

export function useRedirectIfAuthenticated(redirectUrl = "/") {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push(redirectUrl);
    }
  }, [isAuthenticated, isLoading, redirectUrl, router]);

  return { isAuthenticated, isLoading };
}

export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  redirectUrl = "/login"
) {
  return function ProtectedRoute(props: P) {
    const { isAuthenticated, isLoading } = useRequireAuth(redirectUrl);

    if (isLoading) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-lomash-primary border-t-transparent" />
        </div>
      );
    }

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
}

export function withGuest<P extends object>(
  Component: React.ComponentType<P>,
  redirectUrl = "/"
) {
  return function GuestRoute(props: P) {
    const { isAuthenticated, isLoading } = useRedirectIfAuthenticated(redirectUrl);

    if (isLoading) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-lomash-primary border-t-transparent" />
        </div>
      );
    }

    if (isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
}

export function RequireAuth({
  children,
  fallback,
  redirectUrl = "/login",
}: {
  children: ReactNode;
  fallback?: ReactNode;
  redirectUrl?: string;
}) {
  const { isAuthenticated, isLoading } = useRequireAuth(redirectUrl);

  if (isLoading) {
    return (
      fallback || (
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-lomash-primary border-t-transparent" />
        </div>
      )
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

export function GuestOnly({
  children,
  fallback,
  redirectUrl = "/",
}: {
  children: ReactNode;
  fallback?: ReactNode;
  redirectUrl?: string;
}) {
  const { isAuthenticated, isLoading } = useRedirectIfAuthenticated(redirectUrl);

  if (isLoading) {
    return (
      fallback || (
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-lomash-primary border-t-transparent" />
        </div>
      )
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

export default AuthProvider;