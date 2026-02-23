import type { Dispatch, SetStateAction } from "react";
import { useState, useEffect, useCallback } from "react";

type SetValue<T> = Dispatch<SetStateAction<T>>;

export interface UseLocalStorageOptions<T> {
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
  syncData?: boolean;
  initializeWithValue?: boolean;
}

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

  const readValue = useCallback((): T => {
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

  const setValue: SetValue<T> = useCallback(
    (value) => {
      if (typeof window === "undefined") {
        console.warn(
          `Tried setting localStorage key "${key}" even though environment is not a client`
        );
        return;
      }

      try {
        const newValue = value instanceof Function ? value(storedValue) : value;

        window.localStorage.setItem(key, serializer(newValue));

        setStoredValue(newValue);

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

  useEffect(() => {
    if (!syncData || typeof window === "undefined") return;

    const handleStorageChange = (e: StorageEvent | CustomEvent) => {
      if ("key" in e) {
        if (e.key !== key || e.storageArea !== window.localStorage) return;

        try {
          const newValue = e.newValue ? deserializer(e.newValue) : initialValue;
          setStoredValue(newValue);
        } catch (error) {
          console.warn(`Error syncing localStorage key "${key}":`, error);
        }
      } else {
        const { key: eventKey, value } = (e as CustomEvent).detail;
        if (eventKey === key) {
          setStoredValue(value ?? initialValue);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange as EventListener);

    window.addEventListener("local-storage", handleStorageChange as EventListener);

    return () => {
      window.removeEventListener("storage", handleStorageChange as EventListener);
      window.removeEventListener("local-storage", handleStorageChange as EventListener);
    };
  }, [key, initialValue, deserializer, syncData]);

  return [storedValue, setValue, removeValue];
}

export function useLocalStorageObject<T extends Record<string, any>>(
  key: string,
  initialValue: T
) {
  return useLocalStorage<T>(key, initialValue);
}

export function useLocalStorageArray<T>(
  key: string,
  initialValue: T[] = []
) {
  return useLocalStorage<T[]>(key, initialValue);
}

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

    window.addEventListener("storage", calculateQuota);
    window.addEventListener("local-storage", calculateQuota);

    return () => {
      window.removeEventListener("storage", calculateQuota);
      window.removeEventListener("local-storage", calculateQuota);
    };
  }, []);

  return quota;
}

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