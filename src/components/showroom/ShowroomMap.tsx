"use client";

import { MapPin, Navigation, Maximize2, Minimize2, Loader2, AlertCircle } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import type { Showroom } from "@/types/showrooms.types";

interface ShowroomMapProps {
  showrooms: Showroom[];
  selectedShowroomId?: string;
  onShowroomSelect?: (showroom: Showroom) => void;
  height?: string;
  showControls?: boolean;
  showUserLocation?: boolean;
  className?: string;
  mapboxToken?: string;
  googleMapsKey?: string;
}

export default function ShowroomMap({
  showrooms,
  // selectedShowroomId,
  onShowroomSelect,
  height = "500px",
  showControls = true,
  showUserLocation = true,
  className,
  googleMapsKey,
}: ShowroomMapProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedShowroom, setSelectedShowroom] = useState<Showroom | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const infoWindowRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if ((window as any).google?.maps) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsKey || "Google_Maps_API_Key"}`;
    script.async = true;
    script.defer = true;
    script.onload = () => setIsLoaded(true);
    script.onerror = () => setIsError(true);
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [googleMapsKey]);

  useEffect(() => {
    if (!showUserLocation) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
  }, [showUserLocation]);

  const initializeMap = useCallback(() => {
    if (!isLoaded || !mapRef.current || !(window as any).google?.maps) return;

    const google = (window as any).google;

    const validShowrooms = showrooms.filter((s) => s.coordinates);
    if (validShowrooms.length === 0) {
      setIsError(true);
      return;
    }

    const bounds = new google.maps.LatLngBounds();
    validShowrooms.forEach((showroom) => {
      if (showroom.coordinates) {
        bounds.extend(
          new google.maps.LatLng(showroom.coordinates.lat, showroom.coordinates.lng)
        );
      }
    });

    const map = new google.maps.Map(mapRef.current, {
      zoom: 12,
      center: bounds.getCenter(),
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: false,
      zoomControl: showControls,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }],
        },
      ],
    });

    mapInstanceRef.current = map;

    map.fitBounds(bounds);


    const infoWindow = new google.maps.InfoWindow();
    infoWindowRef.current = infoWindow;

    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    validShowrooms.forEach((showroom) => {
      if (!showroom.coordinates) return;

      const marker = new google.maps.Marker({
        position: { lat: showroom.coordinates.lat, lng: showroom.coordinates.lng },
        map,
        title: showroom.name,
       icon: {
    url: "/logo.jpg", // Path to your logo (in the public folder)
    scaledSize: new google.maps.Size(40, 40), // Adjust width and height in pixels
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(20, 20), // Centers the icon on the coordinate
  },
        animation: showroom.slug === selectedShowroom?.slug ? google.maps.Animation.BOUNCE : null,
      });

      marker.addListener("click", () => {
        const content = `
          <div style="padding: 8px; max-width: 250px;">
            <h3 style="font-size: 16px; font-weight: 600; margin: 0 0 8px 0;">${showroom.name}</h3>
            <p style="font-size: 14px; color: #666; margin: 0 0 8px 0;">${showroom.address}, ${showroom.city}</p>
            <p style="font-size: 14px; color: #666; margin: 0 0 8px 0;">
              <strong>Phone:</strong> <a href="tel:${showroom.phone}" style="color: #2563eb;">${showroom.phone}</a>
            </p>
            <div style="display: flex; gap: 8px; margin-top: 12px;">
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=${showroom.coordinates?.lat},${showroom.coordinates?.lng}"
                target="_blank"
                style="flex: 1; padding: 6px 12px; background: #2563eb; color: white; text-decoration: none; border-radius: 4px; text-align: center; font-size: 14px;"
              >
                Directions
              </a>
            </div>
          </div>
        `;

        infoWindow.setContent(content);
        infoWindow.open(map, marker);
        setSelectedShowroom(showroom);
        onShowroomSelect?.(showroom);
      });

      markersRef.current.push(marker);
    });

    if (userLocation) {
      new google.maps.Marker({
        position: userLocation,
        map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: "#10b981",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 2,
        },
        title: "Your Location",
      });
    }
  }, [isLoaded, showrooms, selectedShowroom, userLocation, showControls, onShowroomSelect]);

  useEffect(() => {
    initializeMap();
  }, [initializeMap]);

  useEffect(() => {
  if (!isLoaded || !mapInstanceRef.current || !(window as any).google?.maps) return;

  markersRef.current.forEach((marker, index) => {
    const validShowrooms = showrooms.filter((s) => s.coordinates);
    const showroom = validShowrooms[index];
    if (!showroom) return;

    const isSelected = showroom.slug === selectedShowroom?.slug;
    
    // FIX: Use your logo here too, instead of the path: CIRCLE
    marker.setIcon({
      url: "/map.png", // Same logo as initializeMap
      scaledSize: new (window as any).google.maps.Size(isSelected ? 50 : 40, isSelected ? 50 : 40),
      origin: new (window as any).google.maps.Point(0, 0),
      anchor: new (window as any).google.maps.Point(isSelected ? 25 : 20, isSelected ? 25 : 20),
    });

    marker.setAnimation(isSelected ? (window as any).google.maps.Animation.BOUNCE : null);

    if (isSelected && showroom.coordinates) {
      mapInstanceRef.current.panTo({
        lat: showroom.coordinates.lat,
        lng: showroom.coordinates.lng,
      });
    }
  });
}, [selectedShowroom, showrooms, isLoaded]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const centerOnUserLocation = () => {
    if (userLocation && mapInstanceRef.current) {
      mapInstanceRef.current.panTo(userLocation);
      mapInstanceRef.current.setZoom(12);
    }
  };

  if (!isLoaded && !isError) {
    return (
      <Card className={cn("overflow-hidden", className)} style={{ height }}>
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center space-y-3">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="text-sm text-muted-foreground">Loading map...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className={cn("overflow-hidden", className)} style={{ height }}>
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center space-y-3 max-w-md">
            <div className="flex justify-center">
              <div className="p-3 rounded-full bg-destructive/10">
                <AlertCircle className="h-8 w-8 text-destructive" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold">Unable to Load Map</h3>
              <p className="text-sm text-muted-foreground">
                There was an error loading the map. Please try again later or contact support.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div
      className={cn(
        "relative rounded-lg overflow-hidden border bg-card",
        isFullscreen && "fixed inset-0 z-50 rounded-none",
        className
      )}
      style={{ height: isFullscreen ? "100vh" : height }}
    >
      {/* Map Container */}
      <div ref={mapRef} className="w-full h-full" />

      {/* Controls */}
      {showControls && (
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {/* Fullscreen Toggle */}
          <Button
            size="icon"
            variant="secondary"
            onClick={toggleFullscreen}
            className="shadow-md"
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>

          {/* Center on User Location */}
          {userLocation && (
            <Button
              size="icon"
              variant="secondary"
              onClick={centerOnUserLocation}
              className="shadow-md"
            >
              <Navigation className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}

      {/* Selected Showroom Info */}
      {selectedShowroom && (
        <Card className="absolute bottom-4 left-4 right-4 md:left-4 md:right-auto md:w-80 shadow-lg">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1 flex-1">
                  <h3 className="font-semibold leading-tight">
                    {selectedShowroom.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedShowroom.address}, {selectedShowroom.city}
                  </p>
                </div>
                {selectedShowroom.openToday !== undefined && (
                  <Badge variant={selectedShowroom.openToday.includes("Open") ? "default" : "secondary"}>
                    {selectedShowroom.openToday.includes("Open") ? "Open" : "Closed"}
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <a
                  href={`tel:${selectedShowroom.phone}`}
                  className="text-primary hover:underline"
                >
                  {selectedShowroom.phone}
                </a>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    if (selectedShowroom.coordinates) {
                      window.open(
                        `https://www.google.com/maps/dir/?api=1&destination=${selectedShowroom.coordinates.lat},${selectedShowroom.coordinates.lng}`,
                        "_blank"
                      );
                    }
                  }}
                  className="flex-1"
                >
                  <Navigation className="mr-2 h-4 w-4" />
                  Directions
                </Button>
                <Button
                  size="sm"
                  variant="default"
                  onClick={() => onShowroomSelect?.(selectedShowroom)}
                  className="flex-1"
                >
                  View Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Legend */}
      <Card className="absolute top-4 left-4 shadow-md">
        <CardContent className="p-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-red-500 border-2 border-white" />
              <span className="text-muted-foreground">Showrooms</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-blue-600 border-2 border-white" />
              <span className="text-muted-foreground">Selected</span>
            </div>
            {userLocation && (
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-green-500 border-2 border-white" />
                <span className="text-muted-foreground">Your Location</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function ShowroomStaticMap({
  showroom,
  height = "300px",
  className,
}: {
  showroom: Showroom;
  height?: string;
  className?: string;
}) {
  const mapUrl = showroom.coordinates
    ? `https://maps.googleapis.com/maps/api/staticmap?center=${showroom.coordinates.lat},${showroom.coordinates.lng}&zoom=15&size=600x400&markers=color:red%7C${showroom.coordinates.lat},${showroom.coordinates.lng}&key=YOUR_GOOGLE_MAPS_KEY`
    : null;

  if (!mapUrl) {
    return (
      <Card className={cn("overflow-hidden", className)} style={{ height }}>
        <CardContent className="flex items-center justify-center h-full bg-muted">
          <div className="text-center space-y-2">
            <MapPin className="h-8 w-8 mx-auto text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Map unavailable</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={cn("relative rounded-lg overflow-hidden", className)} style={{ height }}>
      <img src={mapUrl} alt={`Map of ${showroom.name}`} className="w-full h-full object-cover" />
      <a
        href={`https://www.google.com/maps/dir/?api=1&destination=${showroom.coordinates?.lat},${showroom.coordinates?.lng}`}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity"
      >
        <Button size="lg" variant="secondary">
          <Navigation className="mr-2 h-5 w-5" />
          Open in Google Maps
        </Button>
      </a>
    </div>
  );
}