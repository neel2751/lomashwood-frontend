"use client";

import { Star, MapPin, CheckCircle2, Calendar } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  service: "Kitchen" | "Bedroom" | "Both";
  avatar?: string;
  verified: boolean;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-IN", {
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getServiceColor = (service: string) => {
    switch (service) {
      case "Kitchen":
        return "bg-blue-500/10 text-blue-700 border-blue-200";
      case "Bedroom":
        return "bg-purple-500/10 text-purple-700 border-purple-200";
      case "Both":
        return "bg-green-500/10 text-green-700 border-green-200";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-primary/10">
              <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {getInitials(testimonial.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-base">
                  {testimonial.name}
                </h4>
                {testimonial.verified && (
                  <CheckCircle2 className="h-4 w-4 text-green-600 fill-green-100" />
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>{testimonial.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={cn(
                "h-4 w-4 transition-transform group-hover:scale-110",
                star <= testimonial.rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground"
              )}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">
            ({testimonial.rating}.0)
          </span>
        </div>

        {/* Comment */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-4">
          "{testimonial.comment}"
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Badge
            variant="outline"
            className={cn("text-xs", getServiceColor(testimonial.service))}
          >
            {testimonial.service}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(testimonial.date)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}