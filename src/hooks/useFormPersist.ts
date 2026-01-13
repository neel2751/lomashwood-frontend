import { useEffect, useCallback, useRef } from "react";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { useLocalStorage } from "./useLocalStorage";

export interface UseFormPersistOptions<T extends FieldValues> {
  /** Storage key for the form data */
  storageKey: string;
  /** Fields to exclude from persistence */
  exclude?: Array<Path<T>>;
  /** Fields to include (if specified, only these will be persisted) */
  include?: Array<Path<T>>;
  /** Time to live in milliseconds (auto-clear after this time) */
  ttl?: number;
  /** Whether to persist on every change (default: true) */
  persistOnChange?: boolean;
  /** Debounce delay in milliseconds (default: 300) */
  debounceMs?: number;
  /** Callback when data is restored from storage */
  onRestore?: (data: Partial<T>) => void;
  /** Callback when data is saved to storage */
  onSave?: (data: Partial<T>) => void;
  /** Whether to clear storage on successful form submission */
  clearOnSubmit?: boolean;
  /** Custom validation before restoring data */
  validate?: (data: Partial<T>) => boolean;
}

interface PersistedFormData<T> {
  data: Partial<T>;
  timestamp: number;
}

/**
 * Hook to persist react-hook-form data to localStorage
 * @param form - React Hook Form instance
 * @param options - Configuration options
 * 
 * @example
 * const form = useForm();
 * const { clearStorage } = useFormPersist(form, {
 *   storageKey: "contact-form",
 *   exclude: ["password"],
 *   ttl: 1000 * 60 * 60 * 24, // 24 hours
 * });
 */
export function useFormPersist<T extends FieldValues>(
  form: UseFormReturn<T>,
  options: UseFormPersistOptions<T>
) {
  const {
    storageKey,
    exclude = [],
    include,
    ttl,
    persistOnChange = true,
    debounceMs = 300,
    onRestore,
    onSave,
    clearOnSubmit = true,
    validate,
  } = options;

  const { watch, reset, formState } = form;
  const debounceTimeoutRef = useRef<NodeJS.Timeout>();
  const hasRestoredRef = useRef(false);

  const [persistedData, setPersistedData, removePersistedData] =
    useLocalStorage<PersistedFormData<T> | null>(
      storageKey,
      null,
      { syncData: false }
    );

  // Filter fields based on include/exclude options
  const filterFields = useCallback(
    (data: Partial<T>): Partial<T> => {
      const filtered: Partial<T> = {};

      for (const key in data) {
        // Cast key to Path<T> for comparison
        const fieldName = key as unknown as Path<T>;

        // If include is specified, only include those fields
        if (include && include.length > 0) {
          if (include.includes(fieldName)) {
            filtered[key] = data[key];
          }
          continue;
        }

        // Otherwise, exclude specified fields
        if (!exclude.includes(fieldName)) {
          filtered[key] = data[key];
        }
      }

      return filtered;
    },
    [include, exclude]
  );

  // Check if persisted data is still valid (TTL check)
  const isDataValid = useCallback(
    (data: PersistedFormData<T> | null): boolean => {
      if (!data) return false;
      if (!ttl) return true;

      const now = Date.now();
      const age = now - data.timestamp;
      return age < ttl;
    },
    [ttl]
  );

  // Restore form data from localStorage on mount
  useEffect(() => {
    if (hasRestoredRef.current || !persistedData) return;

    if (isDataValid(persistedData)) {
      const { data } = persistedData;

      // Validate data before restoring if validator provided
      if (validate && !validate(data)) {
        removePersistedData();
        return;
      }

      const filteredData = filterFields(data);

      if (Object.keys(filteredData).length > 0) {
        reset(filteredData as T, {
          keepDefaultValues: true,
          keepDirtyValues: false,
        });

        onRestore?.(filteredData);
      }
    } else {
      // Clear expired data
      removePersistedData();
    }

    hasRestoredRef.current = true;
  }, [
    persistedData,
    isDataValid,
    validate,
    filterFields,
    reset,
    onRestore,
    removePersistedData,
  ]);

  // Save form data to localStorage
  const saveToStorage = useCallback(
    (data: Partial<T>) => {
      const filteredData = filterFields(data);

      if (Object.keys(filteredData).length === 0) return;

      const persistData: PersistedFormData<T> = {
        data: filteredData,
        timestamp: Date.now(),
      };

      setPersistedData(persistData);
      onSave?.(filteredData);
    },
    [filterFields, setPersistedData, onSave]
  );

  // Watch form changes and persist with debounce
  useEffect(() => {
    if (!persistOnChange || !hasRestoredRef.current) return;

    const subscription = watch((formData) => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = setTimeout(() => {
        saveToStorage(formData as Partial<T>);
      }, debounceMs);
    });

    return () => {
      subscription.unsubscribe();
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [watch, saveToStorage, persistOnChange, debounceMs]);

  // Clear storage on successful submit
  useEffect(() => {
    if (clearOnSubmit && formState.isSubmitSuccessful) {
      removePersistedData();
    }
  }, [clearOnSubmit, formState.isSubmitSuccessful, removePersistedData]);

  // Manual save function
  const save = useCallback(() => {
    const currentData = form.getValues();
    saveToStorage(currentData as Partial<T>);
  }, [form, saveToStorage]);

  // Clear storage manually
  const clearStorage = useCallback(() => {
    removePersistedData();
  }, [removePersistedData]);

  // Check if there's persisted data available
  const hasPersistedData = useCallback(() => {
    return persistedData !== null && isDataValid(persistedData);
  }, [persistedData, isDataValid]);

  return {
    save,
    clearStorage,
    hasPersistedData: hasPersistedData(),
    persistedAt: persistedData?.timestamp,
  };
}

/**
 * Hook to persist form data across multiple steps
 * @param form - React Hook Form instance
 * @param options - Configuration options with step tracking
 * 
 * @example
 * const { goToStep, currentStep, clearStorage } = useFormPersistMultiStep(form, {
 *   storageKey: "checkout-form",
 *   totalSteps: 3,
 * });
 */
export function useFormPersistMultiStep<T extends FieldValues>(
  form: UseFormReturn<T>,
  options: UseFormPersistOptions<T> & {
    totalSteps: number;
    onStepChange?: (step: number) => void;
  }
) {
  const { totalSteps, onStepChange, ...restOptions } = options;

  const [currentStep, setCurrentStep] = useLocalStorage(
    `${options.storageKey}-step`,
    0
  );

  const persist = useFormPersist(form, restOptions);

  const goToStep = useCallback(
    (step: number) => {
      if (step >= 0 && step < totalSteps) {
        setCurrentStep(step);
        onStepChange?.(step);
      }
    },
    [totalSteps, setCurrentStep, onStepChange]
  );

  const nextStep = useCallback(() => {
    goToStep(currentStep + 1);
  }, [currentStep, goToStep]);

  const prevStep = useCallback(() => {
    goToStep(currentStep - 1);
  }, [currentStep, goToStep]);

  const resetSteps = useCallback(() => {
    setCurrentStep(0);
  }, [setCurrentStep]);

  return {
    ...persist,
    currentStep,
    goToStep,
    nextStep,
    prevStep,
    resetSteps,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === totalSteps - 1,
    progress: ((currentStep + 1) / totalSteps) * 100,
  };
}

/**
 * Hook to show a warning when user tries to leave with unsaved changes
 * @param form - React Hook Form instance
 * @param enabled - Whether the warning is enabled
 * @param message - Custom warning message
 * 
 * @example
 * useFormUnsavedWarning(form, form.formState.isDirty);
 */
export function useFormUnsavedWarning<T extends FieldValues>(
  form: UseFormReturn<T>,
  enabled: boolean = true,
  message: string = "You have unsaved changes. Are you sure you want to leave?"
) {
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (form.formState.isDirty) {
        e.preventDefault();
        e.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [enabled, form.formState.isDirty, message]);
}

/**
 * Hook to auto-save form draft at regular intervals
 * @param form - React Hook Form instance
 * @param options - Configuration options
 * 
 * @example
 * const { lastSaved, isSaving } = useFormAutoSave(form, {
 *   storageKey: "blog-post-draft",
 *   interval: 30000, // Save every 30 seconds
 * });
 */
export function useFormAutoSave<T extends FieldValues>(
  form: UseFormReturn<T>,
  options: UseFormPersistOptions<T> & {
    interval?: number;
    onAutoSave?: () => void;
  }
) {
  const { interval = 30000, onAutoSave, ...restOptions } = options;
  const [isSaving, setIsSaving] = useLocalStorage(
    `${options.storageKey}-saving`,
    false
  );
  const [lastSaved, setLastSaved] = useLocalStorage<number | null>(
    `${options.storageKey}-last-saved`,
    null
  );

  const { save } = useFormPersist(form, {
    ...restOptions,
    persistOnChange: false,
    onSave: (data) => {
      setLastSaved(Date.now());
      restOptions.onSave?.(data);
    },
  });

  useEffect(() => {
    if (!interval || interval <= 0) return;

    const autoSaveInterval = setInterval(() => {
      if (form.formState.isDirty) {
        setIsSaving(true);
        save();
        onAutoSave?.();
        setTimeout(() => setIsSaving(false), 500);
      }
    }, interval);

    return () => clearInterval(autoSaveInterval);
  }, [interval, form.formState.isDirty, save, onAutoSave, setIsSaving]);

  return {
    isSaving,
    lastSaved,
    lastSavedText: lastSaved
      ? new Date(lastSaved).toLocaleString()
      : "Never",
  };
}

/**
 * Get formatted time since last save
 * @param timestamp - Last save timestamp
 * @returns Formatted string like "2 minutes ago"
 */
export function getTimeSinceLastSave(timestamp: number | null): string {
  if (!timestamp) return "Never";

  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  if (seconds > 5) return `${seconds} seconds ago`;
  return "Just now";
}