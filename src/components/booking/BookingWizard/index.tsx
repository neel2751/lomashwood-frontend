"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

import AppointmentType from "../Steps/AppointmentType";
import Confirmation from "../Steps/Confirmation";
import CustomerDetails from "../Steps/CustomerDetails";
import DateTimePicker from "../Steps/DateTimePicker";
import ServiceSelection from "../Steps/ServiceSelection";

import Navigation from "./Navigation";
import StepIndicator from "./StepIndicator";

const bookingSchema = z.object({
  appointmentType:   z.string(),
  serviceType:       z.array(z.string()),
  firstName:         z.string(),
  lastName:          z.string(),
  email:             z.string().email(),
  phone:             z.string(),
  postcode:          z.string(),
  address:           z.string(),
  appointmentDate:   z.any(),
  appointmentTime:   z.string(),
  alternativeDate:   z.string(),
  alternativeTime:   z.string(),
  message:           z.string(),
  marketingConsent:  z.boolean(),
  type:              z.string(),
  name:              z.string(),
  customerType:      z.string(),
  agreeToTerms:      z.boolean(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;

const STEPS = [
  { id: 1, name: "Appointment Type", component: AppointmentType },
  { id: 2, name: "Service Selection", component: ServiceSelection },
  { id: 3, name: "Your Details",      component: CustomerDetails },
  { id: 4, name: "Date & Time",       component: DateTimePicker },
  { id: 5, name: "Confirmation",      component: Confirmation },
] as const;

function getFieldsForStep(step: number): (keyof BookingFormData)[] {
  switch (step) {
    case 1:  return ["appointmentType"];
    case 2:  return ["serviceType"];
    case 3:  return ["firstName", "lastName", "email", "phone", "postcode"];
    case 4:  return ["appointmentDate", "appointmentTime"];
    default: return [];
  }
}

const DEFAULT_VALUES: BookingFormData = {
  appointmentType:  "",
  serviceType:      [],
  firstName:        "",
  lastName:         "",
  email:            "",
  phone:            "",
  postcode:         "",
  address:          "",
  appointmentDate:  "",
  appointmentTime:  "",
  alternativeDate:  "",
  alternativeTime:  "",
  message:          "",
  marketingConsent: false,
  type:             "",
  name:             "",
  customerType:     "",
  agreeToTerms:     false,
};

interface BookingWizardProps {
  className?: string;
  product?: string;
  category?: string;
}

export default function BookingWizard({ className, product, category }: BookingWizardProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);

  const methods = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onChange",
  });

  const { mutate: submitBooking, isPending } = useMutation({
    mutationFn: async (data: BookingFormData) => {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, product, category }),
      });
      if (!response.ok) throw new Error("Failed to submit booking");
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Booking Confirmed!",
        description: "We've sent a confirmation email to your inbox.",
      });
      router.push(`/book-appointment/success?ref=${data.id}`);
    },
    onError: (error: Error) => {
      toast({
        title: "Booking Failed",
        description: error.message || "Please try again or contact us for assistance.",
        variant: "error",
      });
    },
  });

  const handleNext = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await methods.trigger(fieldsToValidate);
    if (isValid) {
      if (currentStep === STEPS.length) {
        submitBooking(methods.getValues());
      } else {
        setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
      }
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleStepClick = async (stepNumber: number) => {
    if (stepNumber < currentStep) {
      setCurrentStep(stepNumber);
      return;
    }
    let canProceed = true;
    for (let i = currentStep; i < stepNumber; i++) {
      const isValid = await methods.trigger(getFieldsForStep(i));
      if (!isValid) { canProceed = false; break; }
    }
    if (canProceed) setCurrentStep(stepNumber);
  };

  const isStepComplete = (step: number): boolean => {
    const fields = getFieldsForStep(step);
    const values = methods.getValues();
    return fields.every((field) => {
      const value = values[field];
      if (Array.isArray(value)) return value.length > 0;
      return value !== undefined && value !== "" && value !== null;
    });
  };

  const CurrentStepComponent = STEPS[currentStep - 1]?.component;
  if (!CurrentStepComponent) return null;

  return (
    <FormProvider {...methods}>
      <div className={cn("space-y-6", className)}>
        <StepIndicator
          steps={STEPS}
          currentStep={currentStep}
          onStepClick={handleStepClick}
          isStepComplete={isStepComplete}
        />

        <Card>
          <CardContent className="pt-6">
            <CurrentStepComponent category={category} />
          </CardContent>
        </Card>

        <Navigation
          currentStep={currentStep}
          totalSteps={STEPS.length}
          onNext={handleNext}
          onBack={handleBack}
          isNextDisabled={!isStepComplete(currentStep) || isPending}
          isLoading={isPending}
          nextButtonText={currentStep === STEPS.length ? "Confirm Booking" : "Continue"}
        />
      </div>
    </FormProvider>
  );
}