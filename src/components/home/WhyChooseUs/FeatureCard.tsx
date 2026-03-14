"use client";

import type {
  LucideIcon} from "lucide-react";
import {
  BadgeCheck,
  Users,
  Award,
  Shield,
  Home,
  CreditCard
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
        "group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-lomash-gray-200 bg-white rounded-lg hover:border-lomash-primary/30 cursor-pointer",
        className
      )}
    >
      <CardContent className="p-6 bg-white group-hover:bg-gray-50 transition-colors">
        {/* Icon */}
        <div className="relative mb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-lomash-primary to-lomash-secondary flex items-center justify-center group-hover:scale-125 transition-all duration-300 shadow-lg group-hover:shadow-xl">
            <Icon className="h-6 w-6 text-white group-hover:rotate-12 transition-transform duration-300" />
          </div>
          
          {/* Decorative Circle - Media Wall Style */}
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-lomash-accent/20 group-hover:scale-175 transition-transform duration-300" />
        </div>

        {/* Title */}
        <h4 className="text-xl font-bold text-lomash-dark mb-3 group-hover:text-lomash-primary transition-colors duration-200">
          {feature.title}
        </h4>

        {/* Description */}
        <p className="text-sm text-lomash-gray-600 leading-relaxed group-hover:text-lomash-gray-700 transition-colors duration-200">
          {feature.description}
        </p>

        {/* Gradient Overlay Accent - Media Wall Style */}
        <div className="absolute inset-0 bg-gradient-to-br from-lomash-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />
      </CardContent>
    </Card>
  );
}