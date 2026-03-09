"use client";

import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  isNextDisabled?: boolean;
  isLoading?: boolean;
  nextButtonText?: string;
  backButtonText?: string;
  isCustomerDetailsStep?: boolean;
  className?: string;
}

export default function Navigation({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  isNextDisabled = false,
  isLoading = false,
  nextButtonText = "Continue",
  backButtonText = "Back",
  isCustomerDetailsStep = false,
  className,
}: NavigationProps) {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  // On "Your Details" step, button is NEVER disabled — validation errors show on click instead
  const isButtonDisabled = isCustomerDetailsStep
    ? isLoading
    : isNextDisabled || isLoading;

  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      {/* Back Button */}
      <Button
        type="button"
        variant="outline"
        onClick={onBack}
        disabled={isFirstStep || isLoading}
        className={cn("gap-2", isFirstStep && "invisible")}
      >
        <ArrowLeft className="h-4 w-4" />
        {backButtonText}
      </Button>

      {/* Next/Submit Button */}
      <Button
        type="button"
        onClick={onNext}
        disabled={isButtonDisabled}
        className="ml-auto gap-2 text-lg font-medium"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {isLastStep ? "Submitting..." : "Processing..."}
          </>
        ) : (
          <>
            {nextButtonText}
            {!isLastStep && <ArrowRight className="h-5 w-5" />}
          </>
        )}
      </Button>
    </div>
  );
}