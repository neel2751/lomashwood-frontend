"use client";

import React from "react";
import {
  BadgeCheck,
  Users,
  Award,
  Shield,
  Home,
  CreditCard,
  LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  feature: {
    title: string;
    description: string;
    icon: string;
  };
  className?: string;
}

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  BadgeCheck,
  Users,
  Award,
  Shield,
  Home,
  CreditCard,
};

export function FeatureCard({ feature, className }: FeatureCardProps) {
  const Icon = iconMap[feature.icon] || BadgeCheck;

  return (
    <Card
      className={cn(
        "group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-lomash-gray-200 bg-white",
        className
      )}
    >
      <CardContent className="p-6">
        {/* Icon */}
        <div className="relative mb-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-lomash-primary to-lomash-secondary flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
            <Icon className="h-8 w-8 text-white" />
          </div>
          
          {/* Decorative Circle */}
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-lomash-accent/20 group-hover:scale-150 transition-transform duration-300" />
        </div>

        {/* Title */}
        <h4 className="text-xl font-bold text-lomash-dark mb-3 group-hover:text-lomash-primary transition-colors">
          {feature.title}
        </h4>

        {/* Description */}
        <p className="text-sm text-lomash-gray-600 leading-relaxed">
          {feature.description}
        </p>
      </CardContent>
    </Card>
  );
}