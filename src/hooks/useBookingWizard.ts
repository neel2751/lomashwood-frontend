import { useState, useCallback, useMemo } from 'react';

export interface WizardStep {
  id: string;
  label: string;
  description?: string;
  isOptional?: boolean;
  isCompleted?: boolean;
  isValid?: boolean;
}

export interface BookingDetails {
  // Customer Information
  customer: {
    name: string;
    email: string;
    phone: string;
    company?: string;
  };

  // Product/Service Details
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    specifications?: Record<string, any>;
  }>;

  // Delivery Information
  delivery: {
    type: 'pickup' | 'delivery' | 'shipping';
    address?: {
      line1: string;
      line2?: string;
      city: string;
      state: string;
      pincode: string;
      country: string;
    };
    scheduledDate?: string;
    scheduledTime?: string;
    instructions?: string;
  };

  // Custom Requirements
  customRequirements?: {
    dimensions?: {
      length?: number;
      width?: number;
      height?: number;
      thickness?: number;
      unit?: string;
    };
    woodType?: string;
    finish?: string;
    quantity?: number;
    additionalNotes?: string;
  };

  // Payment Information
  payment: {
    method?: 'cod' | 'online' | 'bank-transfer' | 'cheque';
    status?: 'pending' | 'completed' | 'failed';
    transactionId?: string;
  };

  // Additional Information
  additionalInfo?: {
    purpose?: string;
    industry?: string;
    budget?: number;
    timeline?: string;
    notes?: string;
  };
}

export interface ValidationErrors {
  [stepId: string]: {
    [field: string]: string;
  };
}

export interface UseBookingWizardOptions {
  steps?: WizardStep[];
  initialData?: Partial<BookingDetails>;
  onStepChange?: (currentStep: number, stepId: string) => void;
  onComplete?: (data: BookingDetails) => Promise<void> | void;
  validateStep?: (stepId: string, data: Partial<BookingDetails>) => ValidationErrors[string] | null;
}

export interface UseBookingWizardReturn {
  // Steps
  steps: WizardStep[];
  currentStep: number;
  currentStepId: string;
  currentStepData: WizardStep;
  totalSteps: number;

  // Navigation
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  canGoNext: boolean;
  canGoPrev: boolean;
  isFirstStep: boolean;
  isLastStep: boolean;

  // Data Management
  bookingData: Partial<BookingDetails>;
  updateStepData: <K extends keyof BookingDetails>(
    section: K,
    data: Partial<BookingDetails[K]>
  ) => void;
  setBookingData: (data: Partial<BookingDetails>) => void;
  resetWizard: () => void;

  // Validation
  errors: ValidationErrors;
  validateCurrentStep: () => boolean;
  clearErrors: (stepId?: string) => void;

  // Completion
  completeWizard: () => Promise<void>;
  isCompleting: boolean;
  completionError: string | null;

  // Progress
  progress: number;
  completedSteps: number;

  // Utilities
  isStepCompleted: (stepId: string) => boolean;
  isStepValid: (stepId: string) => boolean;
  markStepAsCompleted: (stepId: string) => void;
  markStepAsIncomplete: (stepId: string) => void;
}

const DEFAULT_STEPS: WizardStep[] = [
  {
    id: 'customer',
    label: 'Customer Information',
    description: 'Provide your contact details',
  },
  {
    id: 'items',
    label: 'Select Products',
    description: 'Choose items for your order',
  },
  {
    id: 'delivery',
    label: 'Delivery Details',
    description: 'Shipping and delivery information',
  },
  {
    id: 'requirements',
    label: 'Custom Requirements',
    description: 'Specify any custom requirements',
    isOptional: true,
  },
  {
    id: 'payment',
    label: 'Payment Method',
    description: 'Choose your payment option',
  },
  {
    id: 'review',
    label: 'Review & Confirm',
    description: 'Review your order before submitting',
  },
];

export const useBookingWizard = (
  options: UseBookingWizardOptions = {}
): UseBookingWizardReturn => {
  const {
    steps: customSteps,
    initialData = {},
    onStepChange,
    onComplete,
    validateStep,
  } = options;

  // State
  const [steps, setSteps] = useState<WizardStep[]>(
    customSteps || DEFAULT_STEPS.map((step) => ({
      ...step,
      isCompleted: false,
      isValid: false,
    }))
  );
  const [currentStep, setCurrentStep] = useState(0);
  const [bookingData, setBookingDataState] = useState<Partial<BookingDetails>>(initialData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isCompleting, setIsCompleting] = useState(false);
  const [completionError, setCompletionError] = useState<string | null>(null);

  // Current step data
  const currentStepData = useMemo(() => steps[currentStep], [steps, currentStep]);
  const currentStepId = currentStepData.id;
  const totalSteps = steps.length;

  // Navigation flags
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;
  const canGoPrev = currentStep > 0;
  const canGoNext = currentStep < totalSteps - 1;

  // Calculate progress
  const completedSteps = useMemo(() => {
    return steps.filter((step) => step.isCompleted).length;
  }, [steps]);

  const progress = useMemo(() => {
    return Math.round((completedSteps / totalSteps) * 100);
  }, [completedSteps, totalSteps]);

  // Validate current step
  const validateCurrentStep = useCallback((): boolean => {
    if (!validateStep) return true;

    const stepId = currentStepData.id;
    const stepErrors = validateStep(stepId, bookingData);

    if (stepErrors && Object.keys(stepErrors).length > 0) {
      setErrors((prev) => ({
        ...prev,
        [stepId]: stepErrors,
      }));
      return false;
    }

    // Clear errors for this step
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[stepId];
      return newErrors;
    });

    return true;
  }, [currentStepData, bookingData, validateStep]);

  // Clear errors
  const clearErrors = useCallback((stepId?: string) => {
    if (stepId) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[stepId];
        return newErrors;
      });
    } else {
      setErrors({});
    }
  }, []);

  // Update step completion status
  const updateStepStatus = useCallback((stepId: string, isCompleted: boolean, isValid: boolean) => {
    setSteps((prev) =>
      prev.map((step) =>
        step.id === stepId ? { ...step, isCompleted, isValid } : step
      )
    );
  }, []);

  // Mark step as completed
  const markStepAsCompleted = useCallback((stepId: string) => {
    updateStepStatus(stepId, true, true);
  }, [updateStepStatus]);

  // Mark step as incomplete
  const markStepAsIncomplete = useCallback((stepId: string) => {
    updateStepStatus(stepId, false, false);
  }, [updateStepStatus]);

  // Check if step is completed
  const isStepCompleted = useCallback(
    (stepId: string) => {
      const step = steps.find((s) => s.id === stepId);
      return step?.isCompleted || false;
    },
    [steps]
  );

  // Check if step is valid
  const isStepValid = useCallback(
    (stepId: string) => {
      const step = steps.find((s) => s.id === stepId);
      return step?.isValid || false;
    },
    [steps]
  );

  // Next step
  const nextStep = useCallback(() => {
    if (!canGoNext) return;

    // Validate current step before proceeding
    const isValid = validateCurrentStep();
    
    if (!isValid && !currentStepData.isOptional) {
      return;
    }

    // Mark current step as completed if valid
    if (isValid) {
      markStepAsCompleted(currentStepId);
    }

    const nextStepIndex = currentStep + 1;
    setCurrentStep(nextStepIndex);

    if (onStepChange) {
      onStepChange(nextStepIndex, steps[nextStepIndex].id);
    }
  }, [
    canGoNext,
    currentStep,
    currentStepId,
    currentStepData,
    steps,
    validateCurrentStep,
    markStepAsCompleted,
    onStepChange,
  ]);

  // Previous step
  const prevStep = useCallback(() => {
    if (!canGoPrev) return;

    const prevStepIndex = currentStep - 1;
    setCurrentStep(prevStepIndex);

    if (onStepChange) {
      onStepChange(prevStepIndex, steps[prevStepIndex].id);
    }
  }, [canGoPrev, currentStep, steps, onStepChange]);

  // Go to specific step
  const goToStep = useCallback(
    (step: number) => {
      if (step < 0 || step >= totalSteps) return;

      // Only allow going to completed steps or next incomplete step
      const targetStep = steps[step];
      const canNavigate =
        step <= currentStep || // Going back
        (step === currentStep + 1 && isStepCompleted(currentStepId)); // Going to next if current is completed

      if (!canNavigate) return;

      setCurrentStep(step);

      if (onStepChange) {
        onStepChange(step, targetStep.id);
      }
    },
    [totalSteps, steps, currentStep, currentStepId, isStepCompleted, onStepChange]
  );

  // Update step data
  const updateStepData = useCallback(
    <K extends keyof BookingDetails>(
      section: K,
      data: Partial<BookingDetails[K]>
    ) => {
      setBookingDataState((prev) => ({
        ...prev,
        [section]: {
          ...(prev[section] as any),
          ...data,
        },
      }));
    },
    []
  );

  // Set booking data
  const setBookingData = useCallback((data: Partial<BookingDetails>) => {
    setBookingDataState(data);
  }, []);

  // Reset wizard
  const resetWizard = useCallback(() => {
    setCurrentStep(0);
    setBookingDataState(initialData);
    setErrors({});
    setCompletionError(null);
    setSteps((prev) =>
      prev.map((step) => ({
        ...step,
        isCompleted: false,
        isValid: false,
      }))
    );
  }, [initialData]);

  // Complete wizard
  const completeWizard = useCallback(async () => {
    try {
      setIsCompleting(true);
      setCompletionError(null);

      // Validate all steps
      const allStepsValid = steps.every((step) => {
        if (step.isOptional) return true;
        if (!validateStep) return true;
        
        const stepErrors = validateStep(step.id, bookingData);
        return !stepErrors || Object.keys(stepErrors).length === 0;
      });

      if (!allStepsValid) {
        throw new Error('Please complete all required steps');
      }

      // Call onComplete callback
      if (onComplete) {
        await onComplete(bookingData as BookingDetails);
      }

      // Mark all steps as completed
      setSteps((prev) =>
        prev.map((step) => ({
          ...step,
          isCompleted: true,
          isValid: true,
        }))
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to complete booking';
      setCompletionError(errorMessage);
      throw error;
    } finally {
      setIsCompleting(false);
    }
  }, [steps, bookingData, validateStep, onComplete]);

  return {
    // Steps
    steps,
    currentStep,
    currentStepId,
    currentStepData,
    totalSteps,

    // Navigation
    nextStep,
    prevStep,
    goToStep,
    canGoNext,
    canGoPrev,
    isFirstStep,
    isLastStep,

    // Data Management
    bookingData,
    updateStepData,
    setBookingData,
    resetWizard,

    // Validation
    errors,
    validateCurrentStep,
    clearErrors,

    // Completion
    completeWizard,
    isCompleting,
    completionError,

    // Progress
    progress,
    completedSteps,

    // Utilities
    isStepCompleted,
    isStepValid,
    markStepAsCompleted,
    markStepAsIncomplete,
  };
};