import { useState, useEffect, useCallback, Dispatch, SetStateAction } from "react";

type SetValue<T> = Dispatch<SetStateAction<T>>;

export interface UseLocalStorageOptions<T> {
  /** Serializer function (default: JSON.stringify) */
  serializer?: (value: T) => string;
  /** Deserializer function (default: JSON.parse) */
  deserializer?: (value: string) => T;
  /** Sync state across tabs/windows */
  syncData?: boolean;
  /** Initial value if key doesn't exist */
  initializeWithValue?: boolean;
}

/**
 * Custom hook to persist state in localStorage with SSR support
 * @param key - localStorage key
 * @param initialValue - Initial value if key doesn't exist
 * @param options - Configuration options
 * @returns Tuple of [value, setValue, removeValue]
 * 
 * @example
 * const [name, setName, removeName] = useLocalStorage("username", "Guest");
 * const [settings, setSettings] = useLocalStorage("settings", { theme: "light" });
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: UseLocalStorageOptions<T> = {}
): [T, SetValue<T>, () => void] {
  const {
    serializer = JSON.stringify,
    deserializer = JSON.parse,
    syncData = true,
    initializeWithValue = true,
  } = options;

  // Get initial value from localStorage or use provided initial value
  const readValue = useCallback((): T => {
    // Prevent build error "window is undefined" during SSR
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? deserializer(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue, deserializer]);

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (initializeWithValue) {
      return readValue();
    }
    return initialValue;
  });

  // Return a wrapped version of useState's setter function that persists to localStorage
  const setValue: SetValue<T> = useCallback(
    (value) => {
      // Prevent build error "window is undefined" during SSR
      if (typeof window === "undefined") {
        console.warn(
          `Tried setting localStorage key "${key}" even though environment is not a client`
        );
        return;
      }

      try {
        // Allow value to be a function so we have the same API as useState
        const newValue = value instanceof Function ? value(storedValue) : value;

        // Save to localStorage
        window.localStorage.setItem(key, serializer(newValue));

        // Save state
        setStoredValue(newValue);

        // Dispatch custom event so other tabs/windows can sync
        if (syncData) {
          window.dispatchEvent(
            new CustomEvent("local-storage", {
              detail: { key, value: newValue },
            })
          );
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue, serializer, syncData]
  );

  // Remove value from localStorage
  const removeValue = useCallback(() => {
    if (typeof window === "undefined") {
      console.warn(
        `Tried removing localStorage key "${key}" even though environment is not a client`
      );
      return;
    }

    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);

      if (syncData) {
        window.dispatchEvent(
          new CustomEvent("local-storage", {
            detail: { key, value: null },
          })
        );
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue, syncData]);

  useEffect(() => {
    if (!initializeWithValue) {
      setStoredValue(readValue());
    }
  }, [initializeWithValue, readValue]);

  // Sync state across tabs/windows
  useEffect(() => {
    if (!syncData || typeof window === "undefined") return;

    const handleStorageChange = (e: StorageEvent | CustomEvent) => {
      if ("key" in e) {
        // Native storage event (from other tabs)
        if (e.key !== key || e.storageArea !== window.localStorage) return;

        try {
          const newValue = e.newValue ? deserializer(e.newValue) : initialValue;
          setStoredValue(newValue);
        } catch (error) {
          console.warn(`Error syncing localStorage key "${key}":`, error);
        }
      } else {
        // Custom event (from same tab)
        const { key: eventKey, value } = (e as CustomEvent).detail;
        if (eventKey === key) {
          setStoredValue(value ?? initialValue);
        }
      }
    };

    // Listen for changes in other tabs
    window.addEventListener("storage", handleStorageChange as EventListener);
    
    // Listen for changes in same tab
    window.addEventListener("local-storage", handleStorageChange as EventListener);

    return () => {
      window.removeEventListener("storage", handleStorageChange as EventListener);
      window.removeEventListener("local-storage", handleStorageChange as EventListener);
    };
  }, [key, initialValue, deserializer, syncData]);

  return [storedValue, setValue, removeValue];
}

/**
 * Hook for storing objects in localStorage with type safety
 * @param key - localStorage key
 * @param initialValue - Initial object value
 * @returns Tuple of [value, setValue, removeValue]
 * 
 * @example
 * const [user, setUser, removeUser] = useLocalStorageObject("user", { name: "", email: "" });
 */
export function useLocalStorageObject<T extends Record<string, any>>(
  key: string,
  initialValue: T
) {
  return useLocalStorage<T>(key, initialValue);
}

/**
 * Hook for storing arrays in localStorage
 * @param key - localStorage key
 * @param initialValue - Initial array value
 * @returns Tuple of [value, setValue, removeValue]
 * 
 * @example
 * const [todos, setTodos, removeTodos] = useLocalStorageArray("todos", []);
 */
export function useLocalStorageArray<T>(
  key: string,
  initialValue: T[] = []
) {
  return useLocalStorage<T[]>(key, initialValue);
}

/**
 * Hook for storing boolean in localStorage
 * @param key - localStorage key
 * @param initialValue - Initial boolean value
 * @returns Tuple of [value, toggle, setValue, removeValue]
 * 
 * @example
 * const [isDarkMode, toggleDarkMode, setDarkMode, removeDarkMode] = useLocalStorageBoolean("darkMode", false);
 */
export function useLocalStorageBoolean(
  key: string,
  initialValue: boolean = false
) {
  const [value, setValue, removeValue] = useLocalStorage<boolean>(key, initialValue);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, [setValue]);

  return [value, toggle, setValue, removeValue] as const;
}

/**
 * Hook for storing numbers in localStorage
 * @param key - localStorage key
 * @param initialValue - Initial number value
 * @returns Tuple of [value, setValue, increment, decrement, removeValue]
 * 
 * @example
 * const [count, setCount, increment, decrement, removeCount] = useLocalStorageNumber("count", 0);
 */
export function useLocalStorageNumber(
  key: string,
  initialValue: number = 0
) {
  const [value, setValue, removeValue] = useLocalStorage<number>(key, initialValue);

  const increment = useCallback((amount: number = 1) => {
    setValue((prev) => prev + amount);
  }, [setValue]);

  const decrement = useCallback((amount: number = 1) => {
    setValue((prev) => prev - amount);
  }, [setValue]);

  return [value, setValue, increment, decrement, removeValue] as const;
}

/**
 * Hook for tracking localStorage usage and quota
 * @returns Object with usage stats
 * 
 * @example
 * const { used, available, percentage } = useLocalStorageQuota();
 */
export function useLocalStorageQuota() {
  const [quota, setQuota] = useState({
    used: 0,
    available: 0,
    total: 0,
    percentage: 0,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const calculateQuota = () => {
      try {
        let used = 0;
        for (const key in localStorage) {
          if (localStorage.hasOwnProperty(key)) {
            used += localStorage[key].length + key.length;
          }
        }

        // Most browsers have 5MB limit (5 * 1024 * 1024 bytes)
        const total = 5 * 1024 * 1024;
        const available = total - used;
        const percentage = (used / total) * 100;

        setQuota({
          used,
          available,
          total,
          percentage: Math.min(percentage, 100),
        });
      } catch (error) {
        console.warn("Error calculating localStorage quota:", error);
      }
    };

    calculateQuota();

    // Recalculate on storage changes
    window.addEventListener("storage", calculateQuota);
    window.addEventListener("local-storage", calculateQuota);

    return () => {
      window.removeEventListener("storage", calculateQuota);
      window.removeEventListener("local-storage", calculateQuota);
    };
  }, []);

  return quota;
}

/**
 * Hook to clear all localStorage items (with optional prefix filter)
 * @param prefix - Optional prefix to filter keys
 * @returns Function to clear localStorage
 * 
 * @example
 * const clearStorage = useClearLocalStorage();
 * const clearUserData = useClearLocalStorage("user:");
 */
export function useClearLocalStorage(prefix?: string) {
  return useCallback(() => {
    if (typeof window === "undefined") return;

    try {
      if (prefix) {
        const keys = Object.keys(localStorage);
        keys.forEach((key) => {
          if (key.startsWith(prefix)) {
            localStorage.removeItem(key);
          }
        });
      } else {
        localStorage.clear();
      }

      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      console.warn("Error clearing localStorage:", error);
    }
  }, [prefix]);
}

/**
 * Hook to check if a key exists in localStorage
 * @param key - localStorage key to check
 * @returns Boolean indicating if key exists
 * 
 * @example
 * const hasUserData = useLocalStorageExists("user");
 */
export function useLocalStorageExists(key: string): boolean {
  const [exists, setExists] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkExists = () => {
      setExists(window.localStorage.getItem(key) !== null);
    };

    checkExists();

    window.addEventListener("storage", checkExists);
    window.addEventListener("local-storage", checkExists);

    return () => {
      window.removeEventListener("storage", checkExists);
      window.removeEventListener("local-storage", checkExists);
    };
  }, [key]);

  return exists;
}