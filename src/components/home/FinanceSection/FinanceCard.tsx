"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FinanceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function FinanceCard({
  icon: Icon,
  title,
  description,
  className,
}: FinanceCardProps) {
  return (
    <Card
      className={cn(
        "group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-lomash-gray-200",
        className
      )}
    >
      <CardContent className="p-6">
        {/* Icon */}
        <div className="w-14 h-14 rounded-xl bg-lomash-primary/10 flex items-center justify-center mb-4 group-hover:bg-lomash-primary transition-all duration-300 group-hover:scale-110">
          <Icon className="h-7 w-7 text-lomash-primary group-hover:text-white transition-colors" />
        </div>

        {/* Title */}
        <h4 className="font-semibold text-lg text-lomash-dark mb-2 group-hover:text-lomash-primary transition-colors">
          {title}
        </h4>

        {/* Description */}
        <p className="text-sm text-lomash-gray-600 leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}