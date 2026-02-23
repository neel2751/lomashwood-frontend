"use client";

import { Home, Video, MapPin } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const appointmentTypes = [
  {
    value: "home-visit",
    label: "Home Visit",
    description: "Our designer will visit your home for measurements and consultation",
    icon: Home,
    features: [
      "Free home visit",
      "Accurate measurements",
      "Personalized design advice",
      "See samples in your space",
    ],
  },
  {
    value: "video-call",
    label: "Video Consultation",
    description: "Connect with our design team via video call from anywhere",
    icon: Video,
    features: [
      "Convenient online meeting",
      "Share photos and measurements",
      "Virtual design preview",
      "Flexible scheduling",
    ],
  },
  {
    value: "showroom-visit",
    label: "Showroom Visit",
    description: "Visit our showroom to see products and meet our design team",
    icon: MapPin,
    features: [
      "See products in person",
      "Touch and feel materials",
      "Expert guidance on-site",
      "Compare different options",
    ],
  },
] as const;

export default function AppointmentType() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const selectedType = watch("appointmentType");

  const handleTypeSelect = (value: string) => {
    setValue("appointmentType", value, { shouldValidate: true });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Choose Appointment Type</h2>
        <p className="text-muted-foreground">
          Select how you'd like to connect with our design team
        </p>
      </div>

      <div className="space-y-4">
        <input type="hidden" {...register("appointmentType")} />

        <div className="grid gap-4 md:grid-cols-3">
          {appointmentTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = selectedType === type.value;

            return (
              <button
                key={type.value}
                type="button"
                onClick={() => handleTypeSelect(type.value)}
                className="text-left"
              >
                <Card
                  className={cn(
                    "w-full transition-all hover:border-primary cursor-pointer",
                    isSelected &&
                      "border-primary bg-primary/5 ring-2 ring-primary/20"
                  )}
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div
                          className={cn(
                            "inline-flex h-12 w-12 items-center justify-center rounded-lg transition-colors",
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          )}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{type.label}</h3>
                          <p className="text-sm text-muted-foreground">
                            {type.description}
                          </p>
                        </div>
                      </div>

                      <ul className="space-y-2 text-sm">
                        {type.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 text-muted-foreground"
                          >
                            <span
                              className={cn(
                                "flex h-1.5 w-1.5 rounded-full",
                                isSelected
                                  ? "bg-primary"
                                  : "bg-muted-foreground"
                              )}
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </button>
            );
          })}
        </div>

        {errors.appointmentType && (
          <p className="text-sm font-medium text-destructive">
            {errors.appointmentType.message as string}
          </p>
        )}
      </div>

      {selectedType && (
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm text-muted-foreground">
            {selectedType === "home-visit" && (
              <>
                Our design consultant will visit your home at your preferred time.
                Please ensure accurate address details in the next step.
              </>
            )}
            {selectedType === "video-call" && (
              <>
                You'll receive a video call link via email. Please have your
                measurements and any inspiration photos ready.
              </>
            )}
            {selectedType === "showroom-visit" && (
              <>
                Visit our showroom to explore our full range of products. You can
                select your preferred showroom location in the next steps.
              </>
            )}
          </p>
        </div>
      )}
    </div>
  );
}