import { useEffect, useCallback, useRef } from "react";
import type { UseFormReturn, FieldValues, Path } from "react-hook-form";

import { useLocalStorage } from "./useLocalStorage";

export interface UseFormPersistOptions<T extends FieldValues> {
  storageKey: string;

  exclude?: Array<Path<T>>;

  include?: Array<Path<T>>;

  ttl?: number;

  persistOnChange?: boolean;

  debounceMs?: number;

  onRestore?: (data: Partial<T>) => void;

  onSave?: (data: Partial<T>) => void;

  clearOnSubmit?: boolean;

  validate?: (data: Partial<T>) => boolean;
}

interface PersistedFormData<T> {
  data: Partial<T>;
  timestamp: number;
}

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

  const filterFields = useCallback(
    (data: Partial<T>): Partial<T> => {
      const filtered: Partial<T> = {};

      for (const key in data) {
        const fieldName = key as unknown as Path<T>;

        if (include && include.length > 0) {
          if (include.includes(fieldName)) {
            filtered[key] = data[key];
          }
          continue;
        }

        if (!exclude.includes(fieldName)) {
          filtered[key] = data[key];
        }
      }

      return filtered;
    },
    [include, exclude]
  );

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

  useEffect(() => {
    if (hasRestoredRef.current || !persistedData) return;

    if (isDataValid(persistedData)) {
      const { data } = persistedData;

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

  useEffect(() => {
    if (clearOnSubmit && formState.isSubmitSuccessful) {
      removePersistedData();
    }
  }, [clearOnSubmit, formState.isSubmitSuccessful, removePersistedData]);

  const save = useCallback(() => {
    const currentData = form.getValues();
    saveToStorage(currentData as Partial<T>);
  }, [form, saveToStorage]);

  const clearStorage = useCallback(() => {
    removePersistedData();
  }, [removePersistedData]);

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