"use client";

import { Navigation, MapPin, Car, Train, Bike, Footprints, ExternalLink } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface Coordinates {
  lat: number;
  lng: number;
}

interface DirectionsButtonProps {
  address: string;
  coordinates?: Coordinates;
  showroomName?: string;
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showIcon?: boolean;
  showDropdown?: boolean;
  children?: React.ReactNode;
}

type TravelMode = "driving" | "transit" | "bicycling" | "walking";

const travelModes: Array<{
  value: TravelMode;
  label: string;
  icon: React.ElementType;
  description: string;
}> = [
  {
    value: "driving",
    label: "Driving",
    icon: Car,
    description: "Get driving directions",
  },
  {
    value: "transit",
    label: "Transit",
    icon: Train,
    description: "Public transportation",
  },
  {
    value: "bicycling",
    label: "Bicycling",
    icon: Bike,
    description: "Bike-friendly route",
  },
  {
    value: "walking",
    label: "Walking",
    icon: Footprints,
    description: "Pedestrian route",
  },
];

const mapServices = [
  {
    name: "Google Maps",
    value: "google",
    icon: MapPin,
  },
  {
    name: "Apple Maps",
    value: "apple",
    icon: MapPin,
  },
  {
    name: "Waze",
    value: "waze",
    icon: Navigation,
  },
];

export default function DirectionsButton({
  address,
  coordinates,
  showroomName,
  variant = "default",
  size = "default",
  className,
  showIcon = true,
  showDropdown = false,
  children,
}: DirectionsButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getGoogleMapsUrl = (travelMode?: TravelMode) => {
    const baseUrl = "https://www.google.com/maps/dir/?api=1";
    
    if (coordinates) {
      const destination = `${coordinates.lat},${coordinates.lng}`;
      const modeParam = travelMode ? `&travelmode=${travelMode}` : "";
      return `${baseUrl}&destination=${destination}${modeParam}`;
    } else {
      const destination = encodeURIComponent(address);
      const modeParam = travelMode ? `&travelmode=${travelMode}` : "";
      return `${baseUrl}&destination=${destination}${modeParam}`;
    }
  };

  const getAppleMapsUrl = () => {
    if (coordinates) {
      return `http://maps.apple.com/?daddr=${coordinates.lat},${coordinates.lng}`;
    } else {
      const destination = encodeURIComponent(address);
      return `http://maps.apple.com/?daddr=${destination}`;
    }
  };

  const getWazeUrl = () => {
    if (coordinates) {
      return `https://waze.com/ul?ll=${coordinates.lat},${coordinates.lng}&navigate=yes`;
    } else {
      const destination = encodeURIComponent(address);
      return `https://waze.com/ul?q=${destination}&navigate=yes`;
    }
  };

  const openDirections = (service: string, travelMode?: TravelMode) => {
    let url = "";

    switch (service) {
      case "google":
        url = getGoogleMapsUrl(travelMode);
        break;
      case "apple":
        url = getAppleMapsUrl();
        break;
      case "waze":
        url = getWazeUrl();
        break;
    }

    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
      setIsDialogOpen(false);
    }
  };

  const handleQuickDirection = () => {
    if (showDropdown) {
      setIsDialogOpen(true);
    } else {
      openDirections("google", "driving");
    }
  };

  if (!showDropdown) {
    return (
      <Button
        variant={variant}
        size={size}
        onClick={handleQuickDirection}
        className={className}
      >
        {showIcon && <Navigation className={cn("h-4 w-4", children && "mr-2")} />}
        {children || "Get Directions"}
      </Button>
    );
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={variant} size={size} className={className}>
            {showIcon && <Navigation className={cn("h-4 w-4", children && "mr-2")} />}
            {children || "Get Directions"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Choose Navigation App</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          {mapServices.map((service) => (
            <DropdownMenuItem
              key={service.value}
              onClick={() => openDirections(service.value)}
              className="cursor-pointer"
            >
              <service.icon className="mr-2 h-4 w-4" />
              {service.name}
              <ExternalLink className="ml-auto h-3 w-3 opacity-50" />
            </DropdownMenuItem>
          ))}

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => setIsDialogOpen(true)}
            className="cursor-pointer"
          >
            <MapPin className="mr-2 h-4 w-4" />
            More Options
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Advanced Directions Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Get Directions</DialogTitle>
            <DialogDescription>
              {showroomName && <span className="font-medium">{showroomName}</span>}
              {showroomName && <br />}
              {address}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Travel Modes */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold">Choose Travel Mode</h4>
                <Badge variant="secondary" className="text-xs">
                  Google Maps
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {travelModes.map((mode) => {
                  const Icon = mode.icon;
                  return (
                    <Button
                      key={mode.value}
                      variant="outline"
                      onClick={() => openDirections("google", mode.value)}
                      className="h-auto flex-col items-start p-3 gap-2"
                    >
                      <div className="flex items-center gap-2 w-full">
                        <Icon className="h-4 w-4" />
                        <span className="font-medium text-sm">{mode.label}</span>
                      </div>
                      <span className="text-xs text-muted-foreground text-left">
                        {mode.description}
                      </span>
                    </Button>
                  );
                })}
              </div>
            </div>

            <Separator />

            {/* Map Services */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Other Navigation Apps</h4>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  onClick={() => openDirections("apple")}
                  className="w-full justify-start"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Open in Apple Maps
                  <ExternalLink className="ml-auto h-3 w-3 opacity-50" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => openDirections("waze")}
                  className="w-full justify-start"
                >
                  <Navigation className="mr-2 h-4 w-4" />
                  Open in Waze
                  <ExternalLink className="ml-auto h-3 w-3 opacity-50" />
                </Button>
              </div>
            </div>

            <Separator />

            {/* Address Copy */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Address</h4>
              <div className="flex items-start gap-2 p-3 rounded-lg bg-muted text-sm">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5 text-muted-foreground" />
                <p className="flex-1">{address}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(address);
                }}
                className="w-full"
              >
                Copy Address
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function DirectionsButtonCompact({
  address,
  coordinates,
  className,
}: {
  address: string;
  coordinates?: Coordinates;
  className?: string;
}) {
  const handleClick = () => {
    const url = coordinates
      ? `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`
      : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
    
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleClick}
      className={className}
      title="Get Directions"
    >
      <Navigation className="h-4 w-4" />
    </Button>
  );
}

export function DirectionsLink({
  address,
  coordinates,
  className,
  children,
}: {
  address: string;
  coordinates?: Coordinates;
  showroomName?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const url = coordinates
    ? `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`
    : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1 text-primary hover:underline",
        className
      )}
    >
      <Navigation className="h-3 w-3" />
      {children || "Get Directions"}
    </a>
  );
}