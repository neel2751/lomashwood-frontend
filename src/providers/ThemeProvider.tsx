"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  actualTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "lomash-wood-theme",
  enableSystem = true,
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [actualTheme, setActualTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // Get system theme preference
  const getSystemTheme = (): "light" | "dark" => {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  // Resolve actual theme based on theme setting
  const resolveTheme = (themeValue: Theme): "light" | "dark" => {
    if (themeValue === "system") {
      return enableSystem ? getSystemTheme() : "light";
    }
    return themeValue;
  };

  // Apply theme to document
  const applyTheme = (themeValue: "light" | "dark") => {
    const root = window.document.documentElement;

    if (disableTransitionOnChange) {
      root.classList.add("theme-transitioning");
    }

    root.classList.remove("light", "dark");
    root.classList.add(themeValue);
    root.style.colorScheme = themeValue;

    if (disableTransitionOnChange) {
      setTimeout(() => {
        root.classList.remove("theme-transitioning");
      }, 0);
    }
  };

  // Set theme and persist to storage
  const setTheme = (newTheme: Theme) => {
    try {
      localStorage.setItem(storageKey, newTheme);
      setThemeState(newTheme);
      const resolved = resolveTheme(newTheme);
      setActualTheme(resolved);
      applyTheme(resolved);
    } catch (error) {
      console.error("Failed to set theme:", error);
    }
  };

  // Toggle between light and dark
  const toggleTheme = () => {
    const newTheme = actualTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  // Initialize theme on mount
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem(storageKey) as Theme | null;
      const initialTheme = storedTheme || defaultTheme;
      const resolved = resolveTheme(initialTheme);

      setThemeState(initialTheme);
      setActualTheme(resolved);
      applyTheme(resolved);
    } catch (error) {
      console.error("Failed to initialize theme:", error);
      const resolved = resolveTheme(defaultTheme);
      setActualTheme(resolved);
      applyTheme(resolved);
    }
    setMounted(true);
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    if (!enableSystem || theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      const newSystemTheme = mediaQuery.matches ? "dark" : "light";
      setActualTheme(newSystemTheme);
      applyTheme(newSystemTheme);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
    // Legacy browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [theme, enableSystem]);

  // Prevent flash of unstyled content
  if (!mounted) {
    return (
      <div style={{ visibility: "hidden" }} suppressHydrationWarning>
        {children}
      </div>
    );
  }

  const value: ThemeContextType = {
    theme,
    actualTheme,
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook to use theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// Script to prevent flash of unstyled content (inject in document head)
export function ThemeScript({
  storageKey = "lomash-wood-theme",
  defaultTheme = "system",
}: {
  storageKey?: string;
  defaultTheme?: Theme;
}) {
  const themeScript = `
    (function() {
      try {
        var storageKey = '${storageKey}';
        var defaultTheme = '${defaultTheme}';
        var theme = localStorage.getItem(storageKey) || defaultTheme;
        var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        var actualTheme = theme === 'system' ? systemTheme : theme;
        
        document.documentElement.classList.add(actualTheme);
        document.documentElement.style.colorScheme = actualTheme;
      } catch (e) {
        console.error('Theme initialization error:', e);
      }
    })();
  `;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: themeScript }}
      suppressHydrationWarning
    />
  );
}

// Theme toggle button component
export function ThemeToggle() {
  const { actualTheme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-lomash-gray-200 bg-white text-lomash-dark transition-colors hover:bg-lomash-gray-50 focus:outline-none focus:ring-2 focus:ring-lomash-primary focus:ring-offset-2 dark:border-lomash-gray-700 dark:bg-lomash-gray-800 dark:text-white dark:hover:bg-lomash-gray-700"
      aria-label="Toggle theme"
      title={`Switch to ${actualTheme === "light" ? "dark" : "light"} mode`}
    >
      {/* Sun icon for light mode */}
      <svg
        className={`absolute h-5 w-5 transition-all ${
          actualTheme === "light"
            ? "rotate-0 scale-100 opacity-100"
            : "rotate-90 scale-0 opacity-0"
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>

      {/* Moon icon for dark mode */}
      <svg
        className={`absolute h-5 w-5 transition-all ${
          actualTheme === "dark"
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0"
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </button>
  );
}

// Theme selector component with all options
export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  const themes: { value: Theme; label: string; icon: ReactNode }[] = [
    {
      value: "light",
      label: "Light",
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
    {
      value: "dark",
      label: "Dark",
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      ),
    },
    {
      value: "system",
      label: "System",
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex items-center gap-2 rounded-lg border border-lomash-gray-200 bg-white p-1 dark:border-lomash-gray-700 dark:bg-lomash-gray-800">
      {themes.map((themeOption) => (
        <button
          key={themeOption.value}
          onClick={() => setTheme(themeOption.value)}
          className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
            theme === themeOption.value
              ? "bg-lomash-primary text-white"
              : "text-lomash-gray-700 hover:bg-lomash-gray-100 dark:text-lomash-gray-300 dark:hover:bg-lomash-gray-700"
          }`}
          aria-label={`Set theme to ${themeOption.label}`}
          title={`Set theme to ${themeOption.label}`}
        >
          {themeOption.icon}
          <span>{themeOption.label}</span>
        </button>
      ))}
    </div>
  );
}

export default ThemeProvider;