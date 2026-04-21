import { 
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  Mail,
  Phone,
  Download,
  Share2,
  Home,
  ChevronRight,
  User,
  MessageSquare
} from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { API_BASE_URL } from '@/config/api';


export const metadata: Metadata = {
  title: 'Appointment Confirmed | Lomash Wood',
  description: 'Your consultation appointment has been successfully booked. We look forward to meeting you.',
  robots: {
    index: false,
    follow: false,
  },
};

interface SuccessPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

interface BackendAppointment {
  id: string;
  type?: 'home' | 'online' | 'showroom' | string;
  forKitchen?: boolean;
  forBedroom?: boolean;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  postcode?: string;
  address?: string;
  slot?: string;
  status?: string;
  consultantName?: string | null;
  showroomName?: string | null;
  notes?: string | null;
}

function extractAppointment(payload: unknown): BackendAppointment | null {
  const source = payload as
    | { data?: unknown; appointment?: unknown }
    | undefined;

  const candidate =
    (source?.data as { appointment?: unknown } | undefined)?.appointment ||
    source?.appointment ||
    source?.data ||
    payload;

  if (!candidate || typeof candidate !== 'object') {
    return null;
  }

  return candidate as BackendAppointment;
}

async function fetchAppointmentById(id: string): Promise<BackendAppointment | null> {
  if (!id || id === 'Confirmation pending') {
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      return null;
    }

    const payload = await response.json();
    return extractAppointment(payload);
  } catch (error) {
    console.error('[Booking Success] Failed to fetch appointment details', error);
    return null;
  }
}

function formatAppointmentType(type?: string) {
  if (type === 'home') return 'Home Visit';
  if (type === 'online') return 'Online Consultation';
  if (type === 'showroom') return 'Showroom Visit';
  return 'Consultation';
}

function formatService(appointment: BackendAppointment | null) {
  if (!appointment) return 'As selected during booking';
  if (appointment.forKitchen && appointment.forBedroom) return 'Kitchen & Bedroom';
  if (appointment.forKitchen) return 'Kitchen';
  if (appointment.forBedroom) return 'Bedroom';
  return 'As selected during booking';
}

function formatSlotDate(slot?: string) {
  if (!slot) return 'Included in your confirmation email';
  const date = new Date(slot);
  if (Number.isNaN(date.getTime())) return 'Included in your confirmation email';
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function formatSlotTime(slot?: string) {
  if (!slot) return 'Included in your confirmation email';
  const date = new Date(slot);
  if (Number.isNaN(date.getTime())) return 'Included in your confirmation email';
  return date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getQueryValue(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  if (typeof value === 'string' && value.trim()) return value;
  return undefined;
}

export default async function BookingSuccessPage({ searchParams }: SuccessPageProps) {
  const resolvedSearchParams = await searchParams;
  const bookingId =
    getQueryValue(resolvedSearchParams.ref) ||
    getQueryValue(resolvedSearchParams.id) ||
    'Confirmation pending';
  const appointment = await fetchAppointmentById(bookingId);

  return (
    <div className="min-h-screen bg-background">
      {/* Success Header */}
      <div className="bg-gradient-to-br from-green-50 via-background to-primary/5 border-b">
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <div className="max-w-3xl mx-auto text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>

            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Appointment Confirmed!
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground mb-4">
              Thank you for booking with Lomash Wood. Your consultation has been successfully scheduled.
            </p>

            {/* Booking Reference */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-background border rounded-full">
              <span className="text-sm text-muted-foreground">Booking Reference:</span>
              <Badge variant="secondary" className="font-mono">
                {bookingId}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Appointment Details Card */}
          <AppointmentDetails bookingId={bookingId} appointment={appointment} />

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Add to Calendar */}
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Download className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Add to Calendar</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Save this appointment to your calendar so you don't forget.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      Google Calendar
                    </Button>
                    <Button variant="outline" size="sm">
                      iCal
                    </Button>
                    <Button variant="outline" size="sm">
                      Outlook
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Share Appointment */}
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Share2 className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Share Details</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Share this appointment with family or friends.
                  </p>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Appointment
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* What Happens Next */}
          <Card className="p-6 lg:p-8 mt-8">
            <h2 className="text-2xl font-semibold mb-6">What Happens Next?</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">1</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Confirmation Email</h3>
                  <p className="text-sm text-muted-foreground">
                    You'll receive a confirmation email with your appointment details and a calendar invite within the next few minutes.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">2</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Reminder Call</h3>
                  <p className="text-sm text-muted-foreground">
                    One of our team members will call you 24 hours before your appointment to confirm and answer any questions.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">3</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Your Consultation</h3>
                  <p className="text-sm text-muted-foreground">
                    Our expert designer will meet you at the scheduled time to discuss your project and bring your vision to life.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">4</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Personalized Quote</h3>
                  <p className="text-sm text-muted-foreground">
                    After the consultation, you'll receive a detailed quote tailored to your requirements within 48 hours.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Preparation Tips */}
          <Card className="p-6 lg:p-8 mt-8">
            <h2 className="text-2xl font-semibold mb-6">Preparing for Your Consultation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">What to Prepare</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Room measurements (if available)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Inspiration photos or Pinterest boards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Your budget range</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>List of must-have features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Any structural limitations</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Questions to Ask</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>What styles suit my space?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>What materials are recommended?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>How long is the installation process?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>What warranty options are available?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Are finance options available?</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Need to Make Changes */}
          <Card className="p-6 mt-8 bg-muted/50">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Need to Reschedule or Cancel?</h3>
                <p className="text-sm text-muted-foreground">
                  If you need to change your appointment, please contact us at least 24 hours in advance.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="outline" size="sm">
                  <Link href="tel:01708898755" className="flex items-center gap-2">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Us
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="mailto:contact@lomashwood.com" className="flex items-center gap-2">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Us
                  </Link>
                </Button>
              </div>
            </div>
          </Card>

          {/* Continue Exploring */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Continue Exploring
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link 
                href="/kitchen"
                className="group p-6 border rounded-lg hover:border-primary hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Home className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  Browse Kitchens
                </h3>
                <p className="text-sm text-muted-foreground">
                  Explore our kitchen design collection
                </p>
              </Link>

              <Link 
                href="/bedroom"
                className="group p-6 border rounded-lg hover:border-primary hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Home className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  Browse Bedrooms
                </h3>
                <p className="text-sm text-muted-foreground">
                  Discover bedroom furniture options
                </p>
              </Link>

              <Link 
                href="/inspiration"
                className="group p-6 border rounded-lg hover:border-primary hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  Get Inspired
                </h3>
                <p className="text-sm text-muted-foreground">
                  View our completed projects
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppointmentDetails({
  bookingId,
  appointment,
}: {
  bookingId: string;
  appointment: BackendAppointment | null;
}) {

  return (
    <Card className="p-6 lg:p-8">
      <h2 className="text-2xl font-semibold mb-6">Your Appointment Details</h2>
      
      <div className="space-y-6">
        <div className="rounded-lg border bg-muted/40 p-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <p className="text-sm text-muted-foreground">Confirmation Reference</p>
              <p className="font-semibold break-all">{bookingId}</p>
            </div>
            <Badge variant="secondary">{appointment?.status || 'Booked'}</Badge>
          </div>
        </div>

        {/* Appointment Type & Service */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <User className="h-4 w-4" />
              <span>Appointment Type</span>
            </div>
            <p className="font-semibold">{formatAppointmentType(appointment?.type)}</p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Home className="h-4 w-4" />
              <span>Service</span>
            </div>
            <p className="font-semibold">{formatService(appointment)}</p>
          </div>
        </div>

        <Separator />

        {/* Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Calendar className="h-4 w-4" />
              <span>Date</span>
            </div>
            <p className="font-semibold">{formatSlotDate(appointment?.slot)}</p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Clock className="h-4 w-4" />
              <span>Time</span>
            </div>
            <p className="font-semibold">{formatSlotTime(appointment?.slot)}</p>
          </div>
        </div>

        <Separator />

        {/* Location */}
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <MapPin className="h-4 w-4" />
            <span>Location</span>
          </div>
          <p className="font-semibold">
            {appointment?.showroomName
              ? `${appointment.showroomName}${appointment.address ? `, ${appointment.address}` : ''}`
              : appointment?.address
                ? `${appointment.address}${appointment.postcode ? `, ${appointment.postcode}` : ''}`
                : 'Based on your booking selection (home, online, or showroom)'}
          </p>
        </div>

        <Separator />

        {/* Contact Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </div>
            <p className="font-semibold">{appointment?.customerEmail || 'Sent to your submitted email address'}</p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Phone className="h-4 w-4" />
              <span>Phone</span>
            </div>
            <p className="font-semibold">{appointment?.customerPhone || 'We may call for confirmation if needed'}</p>
          </div>
        </div>

        <Separator />

        {/* Designer */}
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <User className="h-4 w-4" />
            <span>Assigned Consultant</span>
          </div>
          <p className="font-semibold">
            {appointment?.consultantName || 'A team member will be assigned before your appointment'}
          </p>
        </div>

        {appointment?.notes ? (
          <>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground mb-2">Notes</p>
              <p className="font-semibold">{appointment.notes}</p>
            </div>
          </>
        ) : null}
      </div>
    </Card>
  );
}