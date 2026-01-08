"use client";

import React from "react";
import {
  MessageCircle,
  PenTool,
  Hammer,
  CheckCircle,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProcessStepProps {
  step: {
    step: number;
    title: string;
    description: string;
    icon: string;
  };
  className?: string;
}

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  MessageCircle,
  PenTool,
  Hammer,
  CheckCircle,
};

export function ProcessStep({ step, className }: ProcessStepProps) {
  const Icon = iconMap[step.icon] || MessageCircle;

  return (
    <div
      className={cn(
        "relative group text-center",
        className
      )}
    >
      {/* Step Number Badge */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-lomash-primary text-white font-bold flex items-center justify-center text-lg shadow-lg z-10">
        {step.step}
      </div>

      {/* Card */}
      <div className="pt-8 pb-6 px-6 bg-lomash-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 h-full border-2 border-transparent hover:border-lomash-primary/20">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white flex items-center justify-center group-hover:bg-lomash-primary transition-all duration-300 shadow-md group-hover:scale-110">
          <Icon className="h-8 w-8 text-lomash-primary group-hover:text-white transition-colors" />
        </div>

        {/* Title */}
        <h4 className="text-xl font-bold text-lomash-dark mb-3 group-hover:text-lomash-primary transition-colors">
          {step.title}
        </h4>

        {/* Description */}
        <p className="text-sm text-lomash-gray-600 leading-relaxed">
          {step.description}
        </p>
      </div>

      {/* Mobile Connector Line */}
      {step.step < 4 && (
        <div className="flex md:hidden justify-center mt-6 mb-6">
          <div className="w-0.5 h-8 bg-lomash-primary/20" />
        </div>
      )}
    </div>
  );
}