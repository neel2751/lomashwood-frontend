"use client";

import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  MessageSquare,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Video,
  Building,
  Edit,
  Trash2,
  FileText,
  Navigation,
} from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export interface Appointment {
  id: string;
  type: "consultation" | "measurement" | "installation" | "follow-up";
  status: "scheduled" | "confirmed" | "completed" | "cancelled" | "rescheduled";
  title: string;
  description?: string;
  date: string;
  time: string;
  duration: number;
  location?: {
    type: "showroom" | "customer-site" | "online";
    address?: string;
    name?: string;
    coordinates?: { lat: number; lng: number };
  };
  consultant?: {
    name: string;
    role: string;
    avatar?: string;
    phone?: string;
    email?: string;
  };
  notes?: string;
  meetingLink?: string;
  canReschedule?: boolean;
  canCancel?: boolean;
  confirmationRequired?: boolean;
}

interface AppointmentCardProps {
  appointment: Appointment;
  variant?: "default" | "compact";
  onReschedule?: (appointmentId: string) => void;
  onCancel?: (appointmentId: string) => void;
  onConfirm?: (appointmentId: string) => void;
  onViewDetails?: (appointmentId: string) => void;
  onGetDirections?: (appointmentId: string) => void;
  onContactConsultant?: (appointmentId: string) => void;
  className?: string;
}

const statusConfig = {
  scheduled: {
    label: "Scheduled",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    icon: Calendar,
  },
  confirmed: {
    label: "Confirmed",
    color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    icon: CheckCircle2,
  },
  completed: {
    label: "Completed",
    color: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    icon: CheckCircle2,
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    icon: XCircle,
  },
  rescheduled: {
    label: "Rescheduled",
    color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
    icon: AlertCircle,
  },
};

const typeConfig = {
  consultation: {
    label: "Consultation",
    icon: MessageSquare,
    color: "text-blue-600",
  },
  measurement: {
    label: "Measurement",
    icon: FileText,
    color: "text-purple-600",
  },
  installation: {
    label: "Installation",
    icon: Building,
    color: "text-green-600",
  },
  "follow-up": {
    label: "Follow-up",
    icon: CheckCircle2,
    color: "text-orange-600",
  },
};

export default function AppointmentCard({
  appointment,
  variant = "default",
  onReschedule,
  onCancel,
  onConfirm,
  onViewDetails,
  onGetDirections,
  onContactConsultant,
  className,
}: AppointmentCardProps) {
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const { toast } = useToast();

  const statusInfo = statusConfig[appointment.status];
  const typeInfo = typeConfig[appointment.type];
  const StatusIcon = statusInfo.icon;
  const TypeIcon = typeInfo.icon;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const getRelativeTime = () => {
    const appointmentDate = new Date(`${appointment.date}T${appointment.time}`);
    const now = new Date();
    const diffMs = appointmentDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Past";
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays < 7) return `In ${diffDays} days`;
    return formatDate(appointment.date);
  };

  const handleCancel = () => {
    onCancel?.(appointment.id);
    setShowCancelDialog(false);
    toast({
      title: "Appointment cancelled",
      description: "Your appointment has been cancelled successfully.",
    });
  };

  const handleConfirm = () => {
    onConfirm?.(appointment.id);
    toast({
      title: "Appointment confirmed",
      description: "Your appointment has been confirmed.",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (variant === "compact") {
    return (
      <Card className={cn("overflow-hidden hover:shadow-md transition-shadow", className)}>
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            {/* Date/Time */}
            <div className="flex flex-col items-center p-3 rounded-lg bg-primary/10 text-primary">
              <span className="text-2xl font-bold">
                {new Date(appointment.date).getDate()}
              </span>
              <span className="text-xs uppercase">
                {new Date(appointment.date).toLocaleString("en-US", { month: "short" })}
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold line-clamp-1">{appointment.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {appointment.time} • {appointment.duration} min
                  </p>
                </div>
                <Badge className={statusInfo.color}>{statusInfo.label}</Badge>
              </div>

              {appointment.location && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span className="line-clamp-1">
                    {appointment.location.name || appointment.location.address}
                  </span>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewDetails?.(appointment.id)}
                >
                  View Details
                </Button>
                {appointment.canReschedule && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onReschedule?.(appointment.id)}
                  >
                    Reschedule
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={typeInfo.color}>
                <TypeIcon className="h-3 w-3 mr-1" />
                {typeInfo.label}
              </Badge>
              <Badge className={statusInfo.color}>
                <StatusIcon className="h-3 w-3 mr-1" />
                {statusInfo.label}
              </Badge>
            </div>
            <h3 className="text-xl font-bold">{appointment.title}</h3>
            {appointment.description && (
              <p className="text-sm text-muted-foreground">{appointment.description}</p>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <span className="sr-only">More options</span>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                >
                  <path
                    d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z"
                    fill="currentColor"
                  />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {onViewDetails && (
                <DropdownMenuItem onClick={() => onViewDetails(appointment.id)}>
                  <FileText className="mr-2 h-4 w-4" />
                  View Details
                </DropdownMenuItem>
              )}
              {appointment.canReschedule && onReschedule && (
                <DropdownMenuItem onClick={() => onReschedule(appointment.id)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Reschedule
                </DropdownMenuItem>
              )}
              {appointment.canCancel && onCancel && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => setShowCancelDialog(true)}
                    className="text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Cancel Appointment
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Date & Time */}
        <div className="p-4 rounded-lg bg-muted/50 border space-y-3">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-semibold">{formatDate(appointment.date)}</p>
              <p className="text-sm text-muted-foreground">{getRelativeTime()}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-semibold">
                {appointment.time} ({appointment.duration} minutes)
              </p>
            </div>
          </div>
        </div>

        {/* Location */}
        {appointment.location && (
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              {appointment.location.type === "online" ? (
                <Video className="h-5 w-5 text-muted-foreground mt-0.5" />
              ) : (
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              )}
              <div className="flex-1 space-y-1">
                <p className="font-medium">
                  {appointment.location.type === "online"
                    ? "Online Meeting"
                    : appointment.location.name || "Location"}
                </p>
                {appointment.location.address && (
                  <p className="text-sm text-muted-foreground">
                    {appointment.location.address}
                  </p>
                )}
                {appointment.location.type === "online" && appointment.meetingLink && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="mt-2"
                  >
                    <a
                      href={appointment.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Video className="mr-2 h-4 w-4" />
                      Join Meeting
                    </a>
                  </Button>
                )}
              </div>
              {appointment.location.type !== "online" && onGetDirections && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onGetDirections(appointment.id)}
                >
                  <Navigation className="mr-2 h-4 w-4" />
                  Directions
                </Button>
              )}
            </div>
          </div>
        )}

        <Separator />

        {/* Consultant */}
        {appointment.consultant && (
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={appointment.consultant.avatar} />
                <AvatarFallback>
                  {getInitials(appointment.consultant.name)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="font-semibold">{appointment.consultant.name}</p>
                <p className="text-sm text-muted-foreground">
                  {appointment.consultant.role}
                </p>
                {appointment.consultant.phone && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {appointment.consultant.phone}
                  </p>
                )}
              </div>
            </div>
            {onContactConsultant && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onContactConsultant(appointment.id)}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Contact
              </Button>
            )}
          </div>
        )}

        {/* Notes */}
        {appointment.notes && (
          <>
            <Separator />
            <div className="space-y-2">
              <p className="text-sm font-medium">Notes</p>
              <p className="text-sm text-muted-foreground">{appointment.notes}</p>
            </div>
          </>
        )}

        {/* Confirmation Required */}
        {appointment.confirmationRequired && appointment.status === "scheduled" && (
          <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-2 flex-1">
                <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
                  Confirmation Required
                </p>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  Please confirm your attendance for this appointment.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-wrap gap-2">
        {appointment.confirmationRequired && appointment.status === "scheduled" && onConfirm && (
          <Button onClick={handleConfirm} className="flex-1">
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Confirm Appointment
          </Button>
        )}

        {appointment.canReschedule && onReschedule && (
          <Button
            variant="outline"
            onClick={() => onReschedule(appointment.id)}
            className="flex-1"
          >
            <Edit className="mr-2 h-4 w-4" />
            Reschedule
          </Button>
        )}

        {appointment.canCancel && onCancel && (
          <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex-1">
                <XCircle className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cancel Appointment</DialogTitle>
                <DialogDescription>
                  Are you sure you want to cancel this appointment? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <div className="p-4 rounded-lg bg-muted/50 border">
                <div className="space-y-2">
                  <p className="font-medium">{appointment.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(appointment.date)} at {appointment.time}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowCancelDialog(false)}
                  className="flex-1"
                >
                  Keep Appointment
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleCancel}
                  className="flex-1"
                >
                  Yes, Cancel
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardFooter>
    </Card>
  );
}

export function AppointmentCardSkeleton({ variant = "default" }: { variant?: "default" | "compact" }) {
  if (variant === "compact") {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-start gap-4 animate-pulse">
            <div className="w-16 h-16 rounded-lg bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/2" />
              <div className="h-4 bg-muted rounded w-full" />
              <div className="flex gap-2">
                <div className="h-8 bg-muted rounded w-24" />
                <div className="h-8 bg-muted rounded w-24" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="space-y-4 animate-pulse">
        <div className="flex justify-between">
          <div className="space-y-2">
            <div className="h-6 bg-muted rounded w-32" />
            <div className="h-8 bg-muted rounded w-64" />
          </div>
          <div className="h-8 w-8 bg-muted rounded" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4 animate-pulse">
        <div className="h-24 bg-muted rounded" />
        <div className="h-20 bg-muted rounded" />
        <div className="h-16 bg-muted rounded" />
      </CardContent>
      <CardFooter>
        <div className="h-10 bg-muted rounded w-full animate-pulse" />
      </CardFooter>
    </Card>
  );
}