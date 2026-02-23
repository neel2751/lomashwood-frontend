import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Phone, User, Mail, MessageSquare, Edit, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PageLoader } from '@/components/shared/PageLoader';

import { formatDate } from '@/utils/formatters';
import { cn } from '@/lib/utils';

function Breadcrumb({ 
  items, 
  className 
}: { 
  items: { label: string; href: string }[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center space-x-2 text-sm", className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <div key={item.href} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 text-gray-400">/</span>
            )}
            {isLast ? (
              <span className="text-gray-900 font-medium">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}

const useAppointmentDetail = (_id: string) => ({
  data: {
    id: 'APT-001',
    status: 'confirmed',
    scheduledDate: new Date().toISOString(),
    scheduledTime: '10:00 AM',
    serviceType: 'Kitchen Design Consultation',
    location: {
      name: 'Showroom',
      address: '123 Main St',
    },
    notes: 'Initial consultation',
    services: ['Design Consultation', '3D Visualization'],
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
    },
    consultant: {
      name: 'Jane Smith',
      title: 'Design Expert',
      phone: '+1234567891',
    },
  },
  isLoading: false,
  isError: false,
});

interface AppointmentDetailPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: AppointmentDetailPageProps): Promise<Metadata> {
  return {
    title: `Appointment Details - ${params.id} | Lomash Wood`,
    description: 'View and manage your appointment details with Lomash Wood kitchen and bedroom design consultation.',
    robots: 'noindex, nofollow',
  };
}

function AppointmentDetailContent({ appointmentId }: { appointmentId: string }) {
  const { data: appointment, isLoading, isError } = useAppointmentDetail(appointmentId);

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError || !appointment) {
    notFound();
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'rescheduled':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const canReschedule = ['confirmed', 'pending'].includes(appointment.status.toLowerCase());
  const canCancel = ['confirmed', 'pending'].includes(appointment.status.toLowerCase());

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'My Account', href: '/my-account' },
          { label: 'Appointments', href: '/my-account/appointments' },
          { label: `Appointment #${appointment.id}`, href: `/appointments/${appointment.id}` },
        ]}
        className="mb-6"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Appointment Details
          </h1>
          <p className="text-gray-600">
            Appointment ID: <span className="font-medium">#{appointment.id}</span>
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          {canReschedule && (
            <Button variant="outline" className="w-full sm:w-auto">
              <Edit className="h-4 w-4 mr-2" />
              Reschedule
            </Button>
          )}
          {canCancel && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive" className="w-full sm:w-auto">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Cancel Appointment</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Are you sure you want to cancel this appointment? This action cannot be undone.
                  </p>
                  <div className="flex justify-end gap-3">
                    <Button variant="outline">Keep Appointment</Button>
                    <Button variant="destructive">Yes, Cancel</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Alert */}
          {appointment.status.toLowerCase() === 'cancelled' && (
            <Alert className="border-red-200 bg-red-50">
              <X className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                This appointment has been cancelled.
              </AlertDescription>
            </Alert>
          )}

          {/* Appointment Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Appointment Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700">Status</span>
                <Badge className={cn('font-medium', getStatusColor(appointment.status))}>
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </Badge>
              </div>

              <Separator />

              {/* Date and Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-700">Date</p>
                    <p className="text-gray-600">{formatDate(appointment.scheduledDate)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-700">Time</p>
                    <p className="text-gray-600">{appointment.scheduledTime}</p>
                  </div>
                </div>
              </div>

              {/* Service Type */}
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <div>
                  <p className="font-medium text-gray-700">Service Type</p>
                  <p className="text-gray-600">{appointment.serviceType}</p>
                </div>
              </div>

              {/* Location */}
              {appointment.location && (
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-700">Location</p>
                    <p className="text-gray-600">{appointment.location.name}</p>
                    <p className="text-sm text-gray-500">{appointment.location.address}</p>
                  </div>
                </div>
              )}

              {/* Notes */}
              {appointment.notes && (
                <div className="flex items-start gap-3">
                  <MessageSquare className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-700">Additional Notes</p>
                    <p className="text-gray-600">{appointment.notes}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Services Requested */}
          <Card>
            <CardHeader>
              <CardTitle>Services Requested</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {appointment.services.map((service: string, index: number) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span className="font-medium text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Customer Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-700">{appointment.customer.name}</p>
                  <p className="text-sm text-gray-500">Customer</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-700">{appointment.customer.email}</p>
                  <p className="text-sm text-gray-500">Email</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-700">{appointment.customer.phone}</p>
                  <p className="text-sm text-gray-500">Phone</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Consultant */}
          {appointment.consultant && (
            <Card>
              <CardHeader>
                <CardTitle>Your Consultant</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">{appointment.consultant.name}</p>
                    <p className="text-sm text-gray-500">{appointment.consultant.title}</p>
                    {appointment.consultant.phone && (
                      <p className="text-sm text-primary">{appointment.consultant.phone}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Phone className="h-4 w-4 mr-2" />
                Call Showroom
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Mail className="h-4 w-4 mr-2" />
                Send Message
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MapPin className="h-4 w-4 mr-2" />
                Get Directions
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function AppointmentDetailPage({ params }: AppointmentDetailPageProps) {
  return (
    <Suspense fallback={<PageLoader />}>
      <AppointmentDetailContent appointmentId={params.id} />
    </Suspense>
  );
}