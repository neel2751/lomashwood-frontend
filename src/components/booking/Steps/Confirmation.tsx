'use client';

import { format } from 'date-fns';
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
  Home,
  Building2,
  FileText,
  CheckCircle2,
  AlertCircle,
  ChefHat,
  Bed,
  Video,
  Store,
  Pencil,
} from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

interface SummaryItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | React.ReactNode;
  badge?: string;
}

const SummaryItem = ({ icon, label, value, badge }: SummaryItemProps) => (
  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
    <div className="p-2 bg-white rounded-lg shadow-sm shrink-0">{icon}</div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
      <div className="flex items-center gap-2 flex-wrap">
        <p className="text-base font-semibold text-gray-900 break-words">{value}</p>
        {badge && (
          <Badge variant="secondary" className="shrink-0">
            {badge}
          </Badge>
        )}
      </div>
    </div>
  </div>
);

interface ConfirmationProps {
  onEdit?: (step: number) => void;
}

export default function Confirmation({ onEdit }: ConfirmationProps) {
  const { watch, setValue } = useFormContext();

  const appointmentType = watch('appointmentType');
  const service = watch('service');
  const additionalServices = watch('additionalServices') || [];
  const title = watch('title');
  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const email = watch('email');
  const phone = watch('phone');
  const alternatePhone = watch('alternatePhone');
  const houseNumber = watch('houseNumber');
  const street = watch('street');
  const city = watch('city');
  const postcode = watch('postcode');
  const appointmentDate = watch('appointmentDate');
  const appointmentTime = watch('appointmentTime');
  const notes = watch('notes');
  const contactPreferences = watch('contactPreferences') || [];
  const marketingConsent = watch('marketingConsent');
  const smsReminders = watch('smsReminders');

  const getAppointmentTypeLabel = () => {
    switch (appointmentType) {
      case 'showroom': return 'Showroom Visit';
      case 'home': return 'Home Visit';
      case 'virtual': return 'Virtual Consultation';
      default: return appointmentType;
    }
  };

  const getServiceLabel = () => {
    switch (service) {
      case 'kitchen': return 'Kitchen Only';
      case 'bedroom': return 'Bedroom Only';
      case 'both': return 'Kitchen & Bedroom';
      default: return service;
    }
  };

  const getAdditionalServicesLabel = () => {
    if (additionalServices.length === 0) return 'None selected';
    const labels: Record<string, string> = {
      space_planning: 'Space Planning',
      color_consultation: 'Color Consultation',
      measurements: 'Professional Measurements',
    };
    return additionalServices.map((id: string) => labels[id] || id).join(', ');
  };

  const getAppointmentTypeIcon = () => {
    switch (appointmentType) {
      case 'showroom': return <Store className="h-5 w-5 text-primary" />;
      case 'home': return <Home className="h-5 w-5 text-primary" />;
      case 'virtual': return <Video className="h-5 w-5 text-primary" />;
      default: return <Calendar className="h-5 w-5 text-primary" />;
    }
  };

  const getServiceIcon = () => {
    switch (service) {
      case 'kitchen': return <ChefHat className="h-5 w-5 text-primary" />;
      case 'bedroom': return <Bed className="h-5 w-5 text-primary" />;
      case 'both': return <Home className="h-5 w-5 text-primary" />;
      default: return <Building2 className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Review Your Appointment</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Please review all the details below carefully before confirming your appointment
        </p>
      </div>

      {/* Appointment Details */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Appointment Details</CardTitle>
            {onEdit && (
              <Button variant="ghost" size="sm" onClick={() => onEdit(0)} className="gap-2">
                <Pencil className="h-4 w-4" /> Edit
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <SummaryItem icon={getAppointmentTypeIcon()} label="Appointment Type" value={getAppointmentTypeLabel()} />
          <SummaryItem icon={getServiceIcon()} label="Service" value={getServiceLabel()} />
          {additionalServices.length > 0 && (
            <SummaryItem
              icon={<FileText className="h-5 w-5 text-primary" />}
              label="Additional Services"
              value={getAdditionalServicesLabel()}
              badge={`+${additionalServices.length}`}
            />
          )}
        </CardContent>
      </Card>

      {/* Date & Time */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Date & Time</CardTitle>
            {onEdit && (
              <Button variant="ghost" size="sm" onClick={() => onEdit(3)} className="gap-2">
                <Pencil className="h-4 w-4" /> Edit
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <SummaryItem
            icon={<Calendar className="h-5 w-5 text-primary" />}
            label="Date"
            value={appointmentDate ? format(appointmentDate, 'EEEE, MMMM d, yyyy') : 'Not selected'}
          />
          <SummaryItem
            icon={<Clock className="h-5 w-5 text-primary" />}
            label="Time"
            value={appointmentTime || 'Not selected'}
          />
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Personal Information</CardTitle>
            {onEdit && (
              <Button variant="ghost" size="sm" onClick={() => onEdit(2)} className="gap-2">
                <Pencil className="h-4 w-4" /> Edit
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <SummaryItem
            icon={<User className="h-5 w-5 text-primary" />}
            label="Name"
            value={`${title ? title.charAt(0).toUpperCase() + title.slice(1) + '.' : ''} ${firstName} ${lastName}`}
          />
          <SummaryItem icon={<Mail className="h-5 w-5 text-primary" />} label="Email" value={email} />
          <SummaryItem
            icon={<Phone className="h-5 w-5 text-primary" />}
            label="Phone"
            value={
              <div className="space-y-1">
                <div>{phone}</div>
                {alternatePhone && <div className="text-sm text-gray-600">Alt: {alternatePhone}</div>}
              </div>
            }
          />
        </CardContent>
      </Card>

      {/* Address */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Address</CardTitle>
            {onEdit && (
              <Button variant="ghost" size="sm" onClick={() => onEdit(2)} className="gap-2">
                <Pencil className="h-4 w-4" /> Edit
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <SummaryItem
            icon={<MapPin className="h-5 w-5 text-primary" />}
            label="Full Address"
            value={
              <div className="space-y-0.5">
                <div>{houseNumber} {street}</div>
                <div>{city}</div>
                <div className="font-bold">{postcode}</div>
              </div>
            }
          />
        </CardContent>
      </Card>

      {notes && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Additional Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700 whitespace-pre-wrap">{notes}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Preferences */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Contact Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {contactPreferences.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-600">Preferred contact methods:</span>
              {contactPreferences.map((pref: string) => (
                <Badge key={pref} variant="secondary">
                  {pref.charAt(0).toUpperCase() + pref.slice(1)}
                </Badge>
              ))}
            </div>
          )}
          <Separator />
          <div className="space-y-3">
            {marketingConsent && (
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span>Subscribed to marketing updates</span>
              </div>
            )}
            {smsReminders && (
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span>SMS appointment reminders enabled</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* SMS Reminders */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Checkbox
              id="smsReminders"
              checked={smsReminders}
              onCheckedChange={(checked) =>
                setValue('smsReminders', checked, { shouldValidate: true })
              }
            />
            <div className="space-y-1 flex-1">
              <label htmlFor="smsReminders" className="cursor-pointer font-medium text-sm">
                Send me SMS appointment reminders
              </label>
              <p className="text-sm text-gray-600">
                Receive a text message reminder 24 hours before your appointment
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong className="block mb-1">Important:</strong>
          <ul className="space-y-1 text-sm list-disc list-inside">
            <li>Please arrive 5 minutes before your scheduled time</li>
            <li>You will receive a confirmation email within 24 hours</li>
            <li>To reschedule or cancel, please contact us at least 24 hours in advance</li>
            {appointmentType === 'home' && (
              <li>Please ensure someone over 18 is present at the property</li>
            )}
            {appointmentType === 'showroom' && (
              <li>Bring any inspiration photos or measurements if available</li>
            )}
          </ul>
        </AlertDescription>
      </Alert>

      <Card className="border-2 border-primary">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-full shrink-0">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 text-lg">Ready to Confirm?</h3>
              <p className="text-gray-600">
                By clicking "Confirm Appointment" below, you agree that all the information
                provided is accurate and you accept our{' '}
                <a href="/terms-conditions" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                  Terms & Conditions
                </a>
                .
              </p>
              <div className="flex items-center gap-2 pt-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  Expected appointment duration: 45-60 minutes
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">What to Expect</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                step: 1,
                title: 'Confirmation Email',
                desc: "You'll receive an email confirmation with appointment details and a calendar invite",
              },
              {
                step: 2,
                title: 'Preparation',
                desc: 'Our team will review your requirements and prepare for your consultation',
              },
              {
                step: 3,
                title: 'Reminder',
                desc: "We'll send you a reminder 24 hours before your appointment",
              },
              {
                step: 4,
                title: 'Consultation',
                desc: 'Meet with our expert designer to discuss your dream kitchen or bedroom',
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm shrink-0">
                  {step}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">{title}</h4>
                  <p className="text-sm text-gray-600">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}