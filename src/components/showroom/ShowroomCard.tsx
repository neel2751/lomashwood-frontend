"use client";

import { MapPin, Phone, Navigation, Mail, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import { Showroom as ShowroomType } from "@/types/showrooms.types";

interface Showroom extends Omit<ShowroomType, "openingHours"> {
  rating?: number;
  reviewCount?: number;
}

interface ShowroomCardProps {
  showroom: Showroom;
  onClick?: () => void;
  viewMode?: "grid" | "list";
  showImage?: boolean;
  showDistance?: boolean;
  className?: string;
}

export default function ShowroomCard({
  showroom,
  onClick,
  viewMode = "grid",
  showImage = true,
  showDistance = true,
  className,
}: ShowroomCardProps) {
  const handleGetDirections = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (showroom.coordinates) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${showroom.coordinates.lat},${showroom.coordinates.lng}`;
      window.open(url, "_blank");
    } else {
      const address = encodeURIComponent(
        `${showroom.address}, ${showroom.city}, ${showroom.postcode}`
      );
      window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, "_blank");
    }
  };

  const handleCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `tel:${showroom.phone}`;
  };

  if (viewMode === "grid") {
    return (
      <Card
        className={cn(
          "overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group",
          className
        )}
        onClick={onClick}
      >
        {/* Image */}
        {showImage && showroom.image && (
          <div className="relative h-48 w-full overflow-hidden bg-muted">
            <Image
              src={showroom.image}
              alt={showroom.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            {showroom.openToday !== undefined && (
              <Badge className="absolute top-3 right-3">
                {showroom.openToday}
              </Badge>
            )}
            {showDistance && showroom.distance !== undefined && (
              <Badge variant="secondary" className="absolute top-3 left-3">
                {showroom.distance < 1
                  ? `${(showroom.distance * 1000).toFixed(0)}m away`
                  : `${showroom.distance.toFixed(1)}km away`}
              </Badge>
            )}
          </div>
        )}

        <CardHeader className="pb-3">
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-xl tracking-tight group-hover:text-primary transition-colors">
                {showroom.name}
              </h3>
              {showroom.rating && (
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{showroom.rating}</span>
                  {showroom.reviewCount && (
                    <span className="text-xs text-muted-foreground">
                      ({showroom.reviewCount})
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-start gap-2 text-base text-foreground">
              <MapPin className="h-4 w-4 flex-shrink-0 mt-1 text-muted-foreground" />
              <p className="line-clamp-2">
                {showroom.address}, {showroom.city}, {showroom.postcode}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-3 pb-4">
          {/* Phone */}
          <div className="flex items-center gap-2 text-base text-foreground">
            <Phone className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
            <Link
              href={`tel:${showroom.phone}`}
              onClick={handleCall}
              className="hover:underline"
            >
              {showroom.phone}
            </Link>
          </div>

          {/* Features */}
          {showroom.facilities && showroom.facilities.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-2">
              {showroom.facilities.slice(0, 3).map((feature, index) => (
                <Badge key={index} variant="outline" className="text-xs text-muted-foreground">
                  {feature}
                </Badge>
              ))}
              {showroom.facilities.length > 3 && (
                <Badge variant="outline" className="text-xs text-muted-foreground">
                  +{showroom.facilities.length - 3} more
                </Badge>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="pt-0 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleGetDirections}
            className="flex-1"
          >
            <Navigation className="mr-2 h-4 w-4" />
            Directions
          </Button>
          <Button
            asChild
            variant="default"
            size="sm"
            className="flex-1"
          >
            <Link href={`/showrooms/${showroom.slug}`} className="flex items-center justify-center gap-1">
              <span>Book Showroom Appointment</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group",
        className
      )}
      onClick={onClick}
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        {showImage && showroom.image && (
          <div className="relative h-48 sm:h-auto sm:w-64 flex-shrink-0 overflow-hidden bg-muted">
            <Image
              src={showroom.image}
              alt={showroom.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            {showroom.openToday !== undefined && (
              <Badge
                variant={showroom.openToday.includes("Open") ? "default" : "secondary"}
                className="absolute top-3 right-3"
              >
                {showroom.openToday.includes("Open") ? "Open Now" : "Closed"}
              </Badge>
            )}
            {showDistance && showroom.distance !== undefined && (
              <Badge variant="secondary" className="absolute top-3 left-3">
                {showroom.distance < 1
                  ? `${(showroom.distance * 1000).toFixed(0)}m away`
                  : `${showroom.distance.toFixed(1)}km away`}
              </Badge>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <h3 className="font-semibold text-xl leading-tight group-hover:text-primary transition-colors">
                  {showroom.name}
                </h3>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <p>
                    {showroom.address}, {showroom.city}, {showroom.postcode}
                  </p>
                </div>
              </div>
              {showroom.rating && (
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{showroom.rating}</span>
                  {showroom.reviewCount && (
                    <span className="text-xs text-muted-foreground">
                      ({showroom.reviewCount})
                    </span>
                  )}
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="flex-1 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                {/* Phone */}
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <Link
                    href={`tel:${showroom.phone}`}
                    onClick={handleCall}
                    className="text-primary hover:underline"
                  >
                    {showroom.phone}
                  </Link>
                </div>

                {/* Email */}
                {showroom.email && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <Link
                      href={`mailto:${showroom.email}`}
                      className="text-primary hover:underline truncate"
                    >
                      {showroom.email}
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Features */}
            {showroom.facilities && showroom.facilities.length > 0 && (
              <>
                <Separator className="my-4" />
                <div className="flex flex-wrap gap-1">
                  {showroom.facilities.map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </>
            )}
          </CardContent>

          <CardFooter className="pt-0 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleGetDirections}
              className="flex-1 sm:flex-initial"
            >
              <Navigation className="mr-2 h-4 w-4" />
              Get Directions
            </Button>
            <Button
              asChild
              variant="default"
              size="sm"
              className="flex-1 sm:flex-initial"
            >
              <Link href={`/showrooms/${showroom.slug}`} className="flex items-center justify-center gap-1">
                <span>Book Showroom Appointment</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}

export function ShowroomCardCompact({
  showroom,
  onClick,
  className,
}: {
  showroom: Showroom;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "p-4 hover:shadow-md transition-shadow cursor-pointer group",
        className
      )}
      onClick={onClick}
    >
      <div className="space-y-3">
        <div className="space-y-1">
          <h4 className="font-semibold leading-tight group-hover:text-primary transition-colors">
            {showroom.name}
          </h4>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {showroom.city}, {showroom.postcode}
          </p>
        </div>

        {showroom.distance !== undefined && (
          <Badge variant="secondary" className="text-xs">
            {showroom.distance < 1
              ? `${(showroom.distance * 1000).toFixed(0)}m away`
              : `${showroom.distance.toFixed(1)}km away`}
          </Badge>
        )}

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = `tel:${showroom.phone}`;
            }}
            className="flex-1"
          >
            <Phone className="h-3 w-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              if (showroom.coordinates) {
                window.open(
                  `https://www.google.com/maps/dir/?api=1&destination=${showroom.coordinates.lat},${showroom.coordinates.lng}`,
                  "_blank"
                );
              }
            }}
            className="flex-1"
          >
            <Navigation className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </Card>
  );
}