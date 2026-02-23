"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

interface Step {
  id: number;
  name: string;
}

interface StepIndicatorProps {
  steps: readonly Step[];
  currentStep: number;
  onStepClick?: (stepNumber: number) => void;
  isStepComplete: (step: number) => boolean;
  className?: string;
}

export default function StepIndicator({
  steps,
  currentStep,
  onStepClick,
  isStepComplete,
  className,
}: StepIndicatorProps) {
  const getStepStatus = (step: number): "complete" | "current" | "upcoming" => {
    if (step < currentStep) return "complete";
    if (step === currentStep) return "current";
    return "upcoming";
  };

  const isClickable = (step: number): boolean => {
    if (step === currentStep) return false;
    if (step < currentStep) return true;
    for (let i = currentStep; i < step; i++) {
      if (!isStepComplete(i)) return false;
    }
    return true;
  };

  return (
    <nav aria-label="Progress" className={className}>
      <ol
        role="list"
        className="divide-y divide-border overflow-hidden rounded-lg border md:flex md:divide-y-0"
      >
        {steps.map((step, stepIdx) => {
          const status = getStepStatus(step.id);
          const clickable = isClickable(step.id);

          return (
            <li
              key={step.id}
              className="relative md:flex md:flex-1"
            >
              <button
                type="button"
                onClick={() => clickable && onStepClick?.(step.id)}
                disabled={!clickable}
                className={cn(
                  "group flex w-full items-center",
                  clickable && "cursor-pointer hover:bg-muted/50",
                  !clickable && "cursor-not-allowed"
                )}
              >
                <span className="flex items-center px-6 py-4 text-sm font-medium">
                  <span
                    className={cn(
                      "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition-colors",
                      status === "complete" &&
                        "bg-primary text-primary-foreground",
                      status === "current" &&
                        "border-2 border-primary bg-background text-primary",
                      status === "upcoming" &&
                        "border-2 border-muted-foreground/25 bg-background text-muted-foreground"
                    )}
                  >
                    {status === "complete" ? (
                      <Check className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <span>{step.id}</span>
                    )}
                  </span>
                  <span
                    className={cn(
                      "ml-4 text-sm font-medium transition-colors",
                      status === "complete" && "text-foreground",
                      status === "current" && "text-primary",
                      status === "upcoming" && "text-muted-foreground"
                    )}
                  >
                    {step.name}
                  </span>
                </span>
              </button>

              {/* Connector Line - Desktop */}
              {stepIdx !== steps.length - 1 && (
                <>
                  {/* Mobile - Vertical Line */}
                  <div
                    className="absolute left-[2.75rem] top-10 -ml-px mt-0.5 h-full w-0.5 bg-border md:hidden"
                    aria-hidden="true"
                  />

                  {/* Desktop - Horizontal Line */}
                  <div
                    className="absolute right-0 top-0 hidden h-full w-5 md:block"
                    aria-hidden="true"
                  >
                    <svg
                      className="h-full w-full text-border"
                      viewBox="0 0 22 80"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0 -2L20 40L0 82"
                        vectorEffect="non-scaling-stroke"
                        stroke="currentcolor"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </>
              )}
            </li>
          );
        })}
      </ol>

      {/* Mobile Step Counter */}
      <div className="mt-4 text-center text-sm text-muted-foreground md:hidden">
        Step {currentStep} of {steps.length}
      </div>
    </nav>
  );
}