"use client";

import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
  Calendar,
  Star,
  Share2,
  ExternalLink,
  CheckCircle2,
  Info,
  ChevronLeft,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,

} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";


import Link from "next/link";

export interface ShowroomDetailType {
  id: string;
  name: string;
  description?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  postcode: string;
  phone: string;
  alternatePhone?: string;
  email: string;
  website?: string;
  images?: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
    holidays?: string;
  };
  features: string[];
  services: string[];
  amenities?: string[];
  facilities?: string[];
  isOpen?: boolean;
  openToday: string;
  rating?: number;
  reviewCount?: number;
  manager?: {
    name: string;
    phone?: string;
    email?: string;
  };
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  parkingInfo?: string;
  publicTransport?: string;
  slug: string;
  team?: string[];
  kitchensOnDisplay?: string[];
  openingHours?: string;
  nearbyStores?: Array<{ name: string; distance: string }>;
}

interface ShowroomDetailProps {
  showroom: ShowroomDetailType;
  onBack?: () => void;
  showBackButton?: boolean;
  className?: string;
}

export default function ShowroomDetail({
  showroom,
  onBack,
  showBackButton = false,
  className,
}: ShowroomDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleGetDirections = () => {
    if (showroom.coordinates) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${showroom.coordinates.lat},${showroom.coordinates.lng}`;
      window.open(url, "_blank");
    } else {
      const address = encodeURIComponent(
        `${showroom.address}, ${showroom.city}, ${showroom.state} ${showroom.pincode}`
      );
      window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, "_blank");
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: showroom.name,
      text: `Check out ${showroom.name} - ${showroom.address}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied!",
        description: "Showroom link has been copied to clipboard.",
      });
      setIsShareDialogOpen(false);
    }
  };

  const handleBookAppointment = () => {
    window.location.href = `/book-appointment?showroom=${showroom.id}`;
  };

  const currentDayStatus = () => {
    const now = new Date();
    const day = now.getDay();
    
    if (day === 0) return { label: "Sunday", hours: showroom.hours.sunday };
    if (day === 6) return { label: "Saturday", hours: showroom.hours.saturday };
    return { label: "Today", hours: showroom.hours.weekdays };
  };

  const dayStatus = currentDayStatus();

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="space-y-4">
        {showBackButton && onBack && (
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ChevronLeft className="h-4 w-4" />
            Back to Showrooms
          </Button>
        )}

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">{showroom.name}</h1>
              {showroom.isOpen !== undefined && (
                <Badge variant={showroom.isOpen ? "default" : "secondary"}>
                  {showroom.isOpen ? "Open Now" : "Closed"}
                </Badge>
              )}
            </div>

            {showroom.rating && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < Math.floor(showroom.rating!)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{showroom.rating}</span>
                {showroom.reviewCount && (
                  <span className="text-sm text-muted-foreground">
                    ({showroom.reviewCount} reviews)
                  </span>
                )}
              </div>
            )}

            <p className="text-muted-foreground flex items-start gap-2">
              <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
              {showroom.address}, {showroom.city}, {showroom.state} {showroom.pincode}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={handleGetDirections} size="lg">
              <Navigation className="mr-2 h-4 w-4" />
              Get Directions
            </Button>
            <Button onClick={handleBookAppointment} variant="outline" size="lg">
              <Calendar className="mr-2 h-4 w-4" />
              Book Appointment
            </Button>
            <Button variant="outline" size="lg" onClick={() => setIsShareDialogOpen(true)}>
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      {showroom.images && showroom.images.length > 0 && (
        <Card className="overflow-hidden">
          <div className="relative h-96 bg-muted">
            <Image
              src={showroom.images[currentImageIndex]}
              alt={`${showroom.name} - Image ${currentImageIndex + 1}`}
              fill
              className="object-cover"
            />
          </div>
          {showroom.images.length > 1 && (
            <CardContent className="p-4">
              <div className="flex gap-2 overflow-x-auto">
                {showroom.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={cn(
                      "relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all",
                      currentImageIndex === index
                        ? "border-primary"
                        : "border-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <Image src={image} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </CardContent>
          )}
        </Card>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Description */}
              {showroom.description && (
                <Card>
                  <CardHeader>
                    <CardTitle>About This Showroom</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {showroom.description}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Features & Amenities */}
              <Card>
                <CardHeader>
                  <CardTitle>Features & Amenities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {showroom.features && showroom.features.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Showroom Features</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {showroom.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {showroom.amenities && showroom.amenities.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <h4 className="font-semibold mb-2">Amenities</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {showroom.amenities.map((amenity, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                              <span>{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Getting Here */}
              <Card>
                <CardHeader>
                  <CardTitle>Getting Here</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {showroom.parkingInfo && (
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Parking</p>
                        <p className="text-sm text-muted-foreground">{showroom.parkingInfo}</p>
                      </div>
                    </div>
                  )}

                  {showroom.publicTransport && (
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Public Transport</p>
                        <p className="text-sm text-muted-foreground">
                          {showroom.publicTransport}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="services" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Available Services</CardTitle>
                  <CardDescription>
                    Services offered at this showroom location
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {showroom.services.map((service, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg border bg-muted/50"
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="font-medium">{service}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Primary Phone</p>
                      <Link href={`tel:${showroom.phone}`} className="text-primary hover:underline">
                        {showroom.phone}
                      </Link>
                    </div>
                  </div>

                  {showroom.alternatePhone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Alternate Phone</p>
                        <Link
                          href={`tel:${showroom.alternatePhone}`}
                          className="text-primary hover:underline"
                        >
                          {showroom.alternatePhone}
                        </Link>
                      </div>
                    </div>
                  )}

                  <Separator />

                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <Link
                        href={`mailto:${showroom.email}`}
                        className="text-primary hover:underline"
                      >
                        {showroom.email}
                      </Link>
                    </div>
                  </div>

                  {showroom.website && (
                    <>
                      <Separator />
                      <div className="flex items-center gap-3">
                        <ExternalLink className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Website</p>
                          <Link
                            href={showroom.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {showroom.website}
                          </Link>
                        </div>
                      </div>
                    </>
                  )}

                  {showroom.manager && (
                    <>
                      <Separator />
                      <div>
                        <p className="text-sm font-medium mb-2">Showroom Manager</p>
                        <div className="space-y-2 pl-3">
                          <p className="text-sm">{showroom.manager.name}</p>
                          {showroom.manager.phone && (
                            <Link
                              href={`tel:${showroom.manager.phone}`}
                              className="text-sm text-primary hover:underline block"
                            >
                              {showroom.manager.phone}
                            </Link>
                          )}
                          {showroom.manager.email && (
                            <Link
                              href={`mailto:${showroom.manager.email}`}
                              className="text-sm text-primary hover:underline block"
                            >
                              {showroom.manager.email}
                            </Link>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - Quick Info */}
        <div className="space-y-6">
          {/* Operating Hours */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Opening Hours
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-sm font-medium">{dayStatus.label}</p>
                <p className="text-lg font-semibold text-primary">{dayStatus.hours}</p>
              </div>

              <Separator />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monday - Friday</span>
                  <span className="font-medium">{showroom.hours.weekdays}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saturday</span>
                  <span className="font-medium">{showroom.hours.saturday}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunday</span>
                  <span className="font-medium">{showroom.hours.sunday}</span>
                </div>
                {showroom.hours.holidays && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Public Holidays</span>
                    <span className="font-medium">{showroom.hours.holidays}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Map */}
          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* <ShowroomStaticMap showroom={showroom} height="250px" /> */}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" onClick={handleBookAppointment}>
                <Calendar className="mr-2 h-4 w-4" />
                Book Appointment
              </Button>
              <Button variant="outline" className="w-full" onClick={handleGetDirections}>
                <Navigation className="mr-2 h-4 w-4" />
                Get Directions
              </Button>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => window.location.href = `tel:${showroom.phone}`}
              >
                <Phone className="mr-2 h-4 w-4" />
                Call Showroom
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Share Dialog */}
      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Showroom</DialogTitle>
            <DialogDescription>Share this showroom with others</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Button className="w-full" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share Link
            </Button>
            {showroom.socialMedia && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Follow on Social Media</p>
                <div className="flex gap-2">
                  {showroom.socialMedia.facebook && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => window.open(showroom.socialMedia!.facebook, '_blank')}
                    >
                      Facebook
                    </Button>
                  )}
                  {showroom.socialMedia.instagram && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => window.open(showroom.socialMedia!.instagram, '_blank')}
                    >
                      Instagram
                    </Button>
                  )}
                  {showroom.socialMedia.twitter && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => window.open(showroom.socialMedia!.twitter, '_blank')}
                    >
                      Twitter
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}