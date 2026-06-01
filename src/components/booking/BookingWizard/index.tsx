"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import AppointmentType from "../Steps/AppointmentType";
import Confirmation from "../Steps/Confirmation";
import CustomerDetails from "../Steps/CustomerDetails";
import DateTimePicker from "../Steps/DateTimePicker";
import ServiceSelection from "../Steps/ServiceSelection";

import Navigation from "./Navigation";
import StepIndicator from "./StepIndicator";

import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { appointmentService } from "@/services/appointmentService";

const bookingSchema = z.object({
  appointmentType: z.string().min(1, "Please select an appointment type"),
  serviceType: z.array(z.string()).min(1, "Please select at least one service"),
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      "Please enter a valid email address"
    ),
  phone: z.string().trim().min(1, "Phone number is required"),
  fullAddress: z.string().trim().min(1, "Full address is required"),
  postcode: z.string().trim().min(1, "Postcode is required"),
  notes: z.string().trim().optional(),
  address: z.string().optional(),
  appointmentDate: z.any(),
  appointmentTime: z.string(),
  alternativeDate: z.string(),
  alternativeTime: z.string(),
  message: z.string(),
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
    case 3:  return ["firstName", "lastName", "email", "phone", "fullAddress", "postcode"];
    case 4:  return ["appointmentDate", "appointmentTime"];
    default: return [];
  }
}

const DEFAULT_VALUES: BookingFormData = {
  appointmentType: "",
  serviceType: [],
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  fullAddress: "",
  postcode: "",
  notes: "",
  address: "",
  appointmentDate: "",
  appointmentTime: "",
  alternativeDate: "",
  alternativeTime: "",
  message: "",
};

interface BookingWizardProps {
  className?: string;
  product?: string;
  category?: string;
}

export default function BookingWizard({ className, product: _product, category: _category }: BookingWizardProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const formContainerRef = useRef<HTMLDivElement>(null);

  const methods = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onChange",
  });

  useEffect(() => {
    if (formContainerRef.current) {
      formContainerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentStep]);

  const { mutate: submitBooking, isPending } = useMutation({
    mutationFn: async (data: BookingFormData) => {
      const rawData = data as BookingFormData & {
        selectedShowroom?: string;
        fullAddress?: string;
        notes?: string;
      };

      const serviceType = data.serviceType?.[0] || "kitchen";
      const appointmentType =
        data.appointmentType === "showroom-visit"
          ? "showroom"
          : data.appointmentType === "home-visit"
            ? "home"
            : data.appointmentType === "video-call"
              ? "online"
              : data.appointmentType;
      const appointmentDate = data.appointmentDate
        ? new Date(data.appointmentDate).toISOString().split("T")[0]
        : "";

      const slotDateTime = (() => {
        if (!appointmentDate || !data.appointmentTime) return "";
        const [hourText, minuteText = "0"] = data.appointmentTime.split(":");
        const hour = Number(hourText);
        const minute = Number(minuteText);
        if (Number.isNaN(hour) || Number.isNaN(minute)) return "";

        const dateObj = new Date(`${appointmentDate}T00:00:00`);
        dateObj.setHours(hour, minute, 0, 0);
        return dateObj.toISOString();
      })();

      const customerName = `${data.firstName || ""} ${data.lastName || ""}`.trim();
      const address = rawData.fullAddress || data.address || "";
      const notes = rawData.notes || data.message || "";
      const forKitchen = serviceType === "kitchen" || serviceType === "both";
      const forBedroom = serviceType === "bedroom" || serviceType === "both";

      const payload = {
        // Backend Prisma model fields
        type: appointmentType,
        forKitchen,
        forBedroom,
        customerName,
        customerEmail: data.email,
        customerPhone: data.phone,
        postcode: data.postcode,
        address,
        slot: slotDateTime,
        showroomId: rawData.selectedShowroom || undefined,
        notes,

        // Keep existing contract fields for compatibility
        appointmentType,
        serviceType,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        addressLegacy: data.address || "",
        zipCode: data.postcode || "",
        preferredDate: appointmentDate,
        timeSlot: data.appointmentTime,
        message: data.message || "",
        source: "website",
      };

      return appointmentService.createAppointment(payload as Parameters<typeof appointmentService.createAppointment>[0]);
    },

    onSuccess: (data) => {
      toast({
        title: "Booking Confirmed!",
        description: "We've sent a confirmation email to your inbox.",
      });
      router.push(`/book-appointment/success?ref=${data.appointment?.id || data.confirmationNumber}`);
    },
    onError: (error: Error) => {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error("[Booking] Error:", errorMsg);
      
      // Try to extract validation errors from the error message
      const hasValidationError = /Required|String must contain|Invalid input|Validation/i.test(errorMsg);
      
      let displayMsg = errorMsg || "Please try again or contact us for assistance.";
      
      if (hasValidationError) {
        displayMsg = `Validation Error: ${errorMsg.substring(0, 150)}`;
        if (displayMsg.length > 150) displayMsg += "...";
      }
      
      toast({
        title: "Booking Failed",
        description: displayMsg,
        variant: "error",
      });
    },
  });
  const handleNext = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await methods.trigger(fieldsToValidate, { shouldFocus: true });
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
      <div className={cn("space-y-6", className)} ref={formContainerRef}>
        <StepIndicator
          steps={STEPS}
          currentStep={currentStep}
          onStepClick={handleStepClick}
          isStepComplete={isStepComplete}
        />

        <Card>
          <CardContent className="pt-6">
            <CurrentStepComponent category={_category} />
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
          isCustomerDetailsStep={currentStep === 3}
        />
      </div>
    </FormProvider>
  );
}