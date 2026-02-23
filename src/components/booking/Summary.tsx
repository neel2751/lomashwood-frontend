'use client';

import { format } from 'date-fns';
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
  ChefHat,
  Bed,
  Home,
  Video,
  Store,
  FileText,
  CheckCircle2,
  Edit,
  ArrowRight,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';


interface SummaryProps {
  data: {
    appointmentType?: string;
    service?: string;
    additionalServices?: string[];
    title?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    alternatePhone?: string;
    houseNumber?: string;
    street?: string;
    city?: string;
    postcode?: string;
    appointmentDate?: Date;
    appointmentTime?: string;
    notes?: string;
    contactPreferences?: string[];
    marketingConsent?: boolean;
    smsReminders?: boolean;
  };
  onEdit?: (section: string) => void;
  compact?: boolean;
  showActions?: boolean;
}

export default function Summary({
  data,
  onEdit,
  compact = false,
  showActions = true,
}: SummaryProps) {
  const {
    appointmentType,
    service,
    additionalServices = [],
    title,
    firstName,
    lastName,
    email,
    phone,
    alternatePhone,
    houseNumber,
    street,
    city,
    postcode,
    appointmentDate,
    appointmentTime,
    notes,
    contactPreferences = [],
    marketingConsent,
    smsReminders,
  } = data;

  const getAppointmentTypeLabel = () => {
    switch (appointmentType) {
      case 'showroom':
        return 'Showroom Visit';
      case 'home':
        return 'Home Visit';
      case 'virtual':
        return 'Virtual Consultation';
      default:
        return appointmentType;
    }
  };

  const getAppointmentTypeIcon = () => {
    switch (appointmentType) {
      case 'showroom':
        return <Store className="h-4 w-4" />;
      case 'home':
        return <Home className="h-4 w-4" />;
      case 'virtual':
        return <Video className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const getServiceLabel = () => {
    switch (service) {
      case 'kitchen':
        return 'Kitchen Only';
      case 'bedroom':
        return 'Bedroom Only';
      case 'both':
        return 'Kitchen & Bedroom';
      default:
        return service;
    }
  };

  const getServiceIcon = () => {
    switch (service) {
      case 'kitchen':
        return <ChefHat className="h-4 w-4" />;
      case 'bedroom':
        return <Bed className="h-4 w-4" />;
      case 'both':
        return <Home className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getAdditionalServicesLabels = () => {
    const labels: Record<string, string> = {
      space_planning: 'Space Planning',
      color_consultation: 'Color Consultation',
      measurements: 'Professional Measurements',
    };

    return additionalServices.map((id) => labels[id] || id);
  };

  if (compact) {
    return (
      <Card className="bg-gray-50">
        <CardContent className="p-4 space-y-3">
          {/* Appointment Info */}
          {appointmentType && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                {getAppointmentTypeIcon()}
                <span className="font-medium">{getAppointmentTypeLabel()}</span>
              </div>
              {service && (
                <Badge variant="secondary" className="gap-1">
                  {getServiceIcon()}
                  {getServiceLabel()}
                </Badge>
              )}
            </div>
          )}

          {/* Date & Time */}
          {appointmentDate && appointmentTime && (
            <>
              <Separator />
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>{format(appointmentDate, 'EEEE, MMMM d, yyyy')}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>{appointmentTime}</span>
                </div>
              </div>
            </>
          )}

          {/* Contact Info */}
          {firstName && lastName && (
            <>
              <Separator />
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <User className="h-4 w-4 text-gray-500" />
                  <span>
                    {title && `${title.charAt(0).toUpperCase() + title.slice(1)}. `}
                    {firstName} {lastName}
                  </span>
                </div>
                {email && (
                  <div className="flex items-center gap-2 text-gray-700 pl-6">
                    <span className="truncate">{email}</span>
                  </div>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Appointment Type & Service */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Appointment Details</CardTitle>
            {showActions && onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit('appointment')}
                className="gap-1 h-8 text-xs"
              >
                <Edit className="h-3 w-3" />
                Edit
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {appointmentType && (
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                {getAppointmentTypeIcon()}
              </div>
              <div>
                <p className="text-xs text-gray-600">Type</p>
                <p className="font-medium text-gray-900">
                  {getAppointmentTypeLabel()}
                </p>
              </div>
            </div>
          )}

          {service && (
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                {getServiceIcon()}
              </div>
              <div>
                <p className="text-xs text-gray-600">Service</p>
                <p className="font-medium text-gray-900">
                  {getServiceLabel()}
                </p>
              </div>
            </div>
          )}

          {additionalServices.length > 0 && (
            <div className="pt-2 border-t">
              <p className="text-xs text-gray-600 mb-2">Additional Services</p>
              <div className="flex flex-wrap gap-2">
                {getAdditionalServicesLabels().map((label, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {label}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Date & Time */}
      {appointmentDate && appointmentTime && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Date & Time</CardTitle>
              {showActions && onEdit && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit('datetime')}
                  className="gap-1 h-8 text-xs"
                >
                  <Edit className="h-3 w-3" />
                  Edit
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calendar className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Date</p>
                <p className="font-medium text-gray-900">
                  {format(appointmentDate, 'EEEE, MMMM d, yyyy')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Clock className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Time</p>
                <p className="font-medium text-gray-900">{appointmentTime}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Personal Information */}
      {firstName && lastName && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Personal Information</CardTitle>
              {showActions && onEdit && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit('details')}
                  className="gap-1 h-8 text-xs"
                >
                  <Edit className="h-3 w-3" />
                  Edit
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-600">Name</p>
                <p className="font-medium text-gray-900">
                  {title && `${title.charAt(0).toUpperCase() + title.slice(1)}. `}
                  {firstName} {lastName}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                <Mail className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-600">Email</p>
                <p className="font-medium text-gray-900 break-all">{email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                <Phone className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-600">Phone</p>
                <p className="font-medium text-gray-900">{phone}</p>
                {alternatePhone && (
                  <p className="text-sm text-gray-600 mt-1">
                    Alt: {alternatePhone}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Address */}
      {houseNumber && street && city && postcode && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Address</CardTitle>
              {showActions && onEdit && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit('details')}
                  className="gap-1 h-8 text-xs"
                >
                  <Edit className="h-3 w-3" />
                  Edit
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                <MapPin className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Full Address</p>
                <div className="space-y-0.5 text-sm text-gray-900">
                  <p>{houseNumber} {street}</p>
                  <p>{city}</p>
                  <p className="font-semibold">{postcode}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Additional Notes */}
      {notes && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Additional Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 p-3 rounded-lg">
              {notes}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Preferences */}
      {(contactPreferences.length > 0 || marketingConsent || smsReminders) && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {contactPreferences.length > 0 && (
              <div>
                <p className="text-xs text-gray-600 mb-2">
                  Preferred Contact Methods
                </p>
                <div className="flex flex-wrap gap-2">
                  {contactPreferences.map((pref) => (
                    <Badge key={pref} variant="outline" className="text-xs">
                      {pref.charAt(0).toUpperCase() + pref.slice(1)}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {(marketingConsent || smsReminders) && (
              <div className="space-y-2 pt-2 border-t">
                {marketingConsent && (
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>Marketing updates subscribed</span>
                  </div>
                )}
                {smsReminders && (
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>SMS reminders enabled</span>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Summary Card */}
      <Card className="border-2 border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-full shrink-0">
              <CheckCircle2 className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold text-gray-900">
                Appointment Summary
              </h4>
              <p className="text-sm text-gray-700">
                {appointmentType && getAppointmentTypeLabel()}
                {service && ` • ${getServiceLabel()}`}
              </p>
              {appointmentDate && appointmentTime && (
                <p className="text-sm text-gray-700">
                  {format(appointmentDate, 'MMM d, yyyy')} at {appointmentTime}
                </p>
              )}
              {showActions && (
                <Button
                  variant="link"
                  size="sm"
                  className="h-auto p-0 text-primary gap-1 mt-2"
                  onClick={() => onEdit && onEdit('review')}
                >
                  Review all details
                  <ArrowRight className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}