import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Video,
  Home,
  Building2,
  Plus,
  Search,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const metadata: Metadata = {
  title: 'Appointments',
  description: 'View and manage your consultation appointments',
};

export default function AppointmentsPage() {
  const appointments = [
    {
      id: 'APT-001',
      type: 'Kitchen Consultation',
      category: 'Kitchen',
      mode: 'in-person',
      status: 'confirmed',
      date: '2024-01-28',
      time: '10:00 AM',
      duration: 60,
      location: {
        type: 'showroom',
        name: 'Lomash Wood - Ahmedabad Showroom',
        address: 'SG Highway, Ahmedabad',
        city: 'Ahmedabad',
      },
      consultant: {
        name: 'Rajesh Kumar',
        role: 'Senior Kitchen Designer',
        phone: '+91 98765 43210',
        email: 'rajesh@lomashwood.com',
        image: '/images/team/rajesh.jpg',
      },
      notes: 'Interested in modern modular kitchen with island',
      createdAt: '2024-01-15T10:30:00Z',
      services: ['Kitchen Design', '3D Visualization', 'Cost Estimation'],
    },
    {
      id: 'APT-002',
      type: 'Bedroom Consultation',
      category: 'Bedroom',
      mode: 'video',
      status: 'confirmed',
      date: '2024-01-30',
      time: '02:00 PM',
      duration: 45,
      location: {
        type: 'online',
        name: 'Video Call',
        meetingLink: 'https://meet.lomashwood.com/apt-002',
      },
      consultant: {
        name: 'Priya Sharma',
        role: 'Bedroom Design Specialist',
        phone: '+91 98765 43211',
        email: 'priya@lomashwood.com',
        image: '/images/team/priya.jpg',
      },
      notes: 'Looking for wardrobe with mirror and storage solutions',
      createdAt: '2024-01-18T14:20:00Z',
      services: ['Bedroom Design', 'Storage Solutions'],
    },
    {
      id: 'APT-003',
      type: 'Home Visit',
      category: 'Both',
      mode: 'home-visit',
      status: 'pending',
      date: '2024-02-02',
      time: '11:00 AM',
      duration: 90,
      location: {
        type: 'customer',
        name: 'Customer Location',
        address: '123 Main Street, Apt 4B',
        city: 'Ahmedabad',
      },
      consultant: {
        name: 'Amit Patel',
        role: 'Design Consultant',
        phone: '+91 98765 43212',
        email: 'amit@lomashwood.com',
        image: '/images/team/amit.jpg',
      },
      notes: 'Complete home interior - kitchen and bedroom',
      createdAt: '2024-01-20T09:15:00Z',
      services: ['Kitchen Design', 'Bedroom Design', 'Space Planning', 'Site Measurement'],
    },
    {
      id: 'APT-004',
      type: 'Follow-up Meeting',
      category: 'Kitchen',
      mode: 'in-person',
      status: 'completed',
      date: '2024-01-22',
      time: '03:00 PM',
      duration: 30,
      location: {
        type: 'showroom',
        name: 'Lomash Wood - Ahmedabad Showroom',
        address: 'SG Highway, Ahmedabad',
        city: 'Ahmedabad',
      },
      consultant: {
        name: 'Rajesh Kumar',
        role: 'Senior Kitchen Designer',
        phone: '+91 98765 43210',
        email: 'rajesh@lomashwood.com',
        image: '/images/team/rajesh.jpg',
      },
      notes: 'Review final design and quote',
      createdAt: '2024-01-10T11:00:00Z',
      services: ['Design Review', 'Quote Discussion'],
      feedback: {
        rating: 5,
        comment: 'Excellent service and detailed design explanation',
      },
    },
    {
      id: 'APT-005',
      type: 'Kitchen Consultation',
      category: 'Kitchen',
      mode: 'in-person',
      status: 'cancelled',
      date: '2024-01-25',
      time: '01:00 PM',
      duration: 60,
      location: {
        type: 'showroom',
        name: 'Lomash Wood - Ahmedabad Showroom',
        address: 'SG Highway, Ahmedabad',
        city: 'Ahmedabad',
      },
      consultant: {
        name: 'Rajesh Kumar',
        role: 'Senior Kitchen Designer',
        phone: '+91 98765 43210',
        email: 'rajesh@lomashwood.com',
        image: '/images/team/rajesh.jpg',
      },
      notes: 'Initial consultation for L-shaped kitchen',
      createdAt: '2024-01-12T15:30:00Z',
      services: ['Kitchen Design'],
      cancellationReason: 'Rescheduled to a later date',
      cancelledAt: '2024-01-23T10:00:00Z',
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    const colors = {
      confirmed: 'bg-green-100 text-green-800 border-green-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      completed: 'bg-blue-100 text-blue-800 border-blue-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'in-person':
        return <Building2 className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'home-visit':
        return <Home className="h-4 w-4" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  const upcomingAppointments = appointments.filter(
    apt => apt.status === 'confirmed' || apt.status === 'pending'
  );
  const pastAppointments = appointments.filter(
    apt => apt.status === 'completed' || apt.status === 'cancelled'
  );

  const totalAppointments = appointments.length;
  const confirmedCount = appointments.filter(apt => apt.status === 'confirmed').length;
  const completedCount = appointments.filter(apt => apt.status === 'completed').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            My Appointments
          </h1>
          <p className="text-gray-600">
            Manage your consultation appointments
          </p>
        </div>
        <Button asChild>
          <Link href="/book-appointment">
            <Plus className="h-4 w-4 mr-2" />
            Book New Appointment
          </Link>
        </Button>
      </div>

      <Separator />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Appointments</p>
                <p className="text-3xl font-bold">{totalAppointments}</p>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Upcoming</p>
                <p className="text-3xl font-bold text-green-600">{confirmedCount}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Completed</p>
                <p className="text-3xl font-bold text-blue-600">{completedCount}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search appointments..."
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="kitchen">Kitchen</SelectItem>
                  <SelectItem value="bedroom">Bedroom</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all-status">
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-status">All Status</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointments Tabs */}
      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="upcoming">
            Upcoming ({upcomingAppointments.length})
          </TabsTrigger>
          <TabsTrigger value="past">
            Past ({pastAppointments.length})
          </TabsTrigger>
        </TabsList>

        {/* Upcoming Appointments */}
        <TabsContent value="upcoming" className="space-y-4">
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map((appointment) => (
              <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Section - Date & Time */}
                    <div className="flex-shrink-0 lg:w-48">
                      <div className="p-4 bg-primary/5 rounded-lg text-center border border-primary/20">
                        <p className="text-sm text-gray-600 mb-1">Date</p>
                        <p className="text-lg font-bold text-primary mb-3">
                          {formatDate(appointment.date)}
                        </p>
                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-700">
                          <Clock className="h-4 w-4" />
                          <span>{appointment.time}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          {appointment.duration} minutes
                        </p>
                      </div>
                    </div>

                    {/* Middle Section - Details */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-semibold text-gray-900">
                              {appointment.type}
                            </h3>
                            <Badge className={`${getStatusColor(appointment.status)} border`}>
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              {getModeIcon(appointment.mode)}
                              <span className="capitalize">{appointment.mode.replace('-', ' ')}</span>
                            </div>
                            <Badge variant="secondary">{appointment.category}</Badge>
                          </div>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex items-start space-x-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900">{appointment.location.name}</p>
                          {appointment.location.address && (
                            <p className="text-gray-600">{appointment.location.address}</p>
                          )}
                          {appointment.mode === 'video' && appointment.location.meetingLink && (
                            <a
                              href={appointment.location.meetingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline mt-1 inline-block"
                            >
                              Join Video Call →
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Consultant */}
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-semibold text-primary">
                            {appointment.consultant.name.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900">{appointment.consultant.name}</p>
                          <p className="text-sm text-gray-600">{appointment.consultant.role}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost" asChild>
                            <a href={`tel:${appointment.consultant.phone}`}>
                              <Phone className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </div>

                      {/* Services */}
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Services:</p>
                        <div className="flex flex-wrap gap-2">
                          {appointment.services.map((service, idx) => (
                            <Badge key={idx} variant="outline">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Notes */}
                      {appointment.notes && (
                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <p className="text-sm text-yellow-900">
                            <span className="font-medium">Notes:</span> {appointment.notes}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Right Section - Actions */}
                    <div className="flex-shrink-0 lg:w-48 flex flex-col gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/my-account/appointments/${appointment.id}`}>
                          View Details
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12">
                <div className="text-center max-w-md mx-auto">
                  <div className="h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No Upcoming Appointments
                  </h3>
                  <p className="text-gray-600 mb-6">
                    You don't have any scheduled appointments at the moment
                  </p>
                  <Button asChild>
                    <Link href="/book-appointment">
                      <Plus className="h-4 w-4 mr-2" />
                      Book Your First Appointment
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Past Appointments */}
        <TabsContent value="past" className="space-y-4">
          {pastAppointments.length > 0 ? (
            pastAppointments.map((appointment) => (
              <Card key={appointment.id} className="hover:shadow-md transition-shadow opacity-90">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Date & Status */}
                    <div className="flex-shrink-0 lg:w-48">
                      <div className="p-4 bg-gray-50 rounded-lg text-center border">
                        <p className="text-sm text-gray-600 mb-1">Date</p>
                        <p className="text-lg font-bold text-gray-700 mb-3">
                          {formatDate(appointment.date)}
                        </p>
                        <Badge className={`${getStatusColor(appointment.status)} border w-full justify-center`}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </Badge>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {appointment.type}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <span>{appointment.time}</span>
                          <span>•</span>
                          <span>{appointment.duration} minutes</span>
                          <span>•</span>
                          <Badge variant="secondary">{appointment.category}</Badge>
                        </div>
                      </div>

                      <div className="text-sm text-gray-600">
                        <p className="font-medium text-gray-900">{appointment.consultant.name}</p>
                        <p>{appointment.consultant.role}</p>
                      </div>

                      {appointment.feedback && (
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-yellow-500">★</span>
                            <span className="font-medium text-green-900">
                              {appointment.feedback.rating}/5
                            </span>
                          </div>
                          <p className="text-sm text-green-800">{appointment.feedback.comment}</p>
                        </div>
                      )}

                      {appointment.cancellationReason && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-sm text-red-900">
                            <span className="font-medium">Cancelled:</span> {appointment.cancellationReason}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex-shrink-0 lg:w-48 flex flex-col gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/my-account/appointments/${appointment.id}`}>
                          View Details
                        </Link>
                      </Button>
                      {appointment.status === 'completed' && !appointment.feedback && (
                        <Button size="sm">
                          Leave Feedback
                        </Button>
                      )}
                      {appointment.status === 'completed' && (
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/book-appointment">
                            Book Again
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12">
                <div className="text-center max-w-md mx-auto">
                  <div className="h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No Past Appointments
                  </h3>
                  <p className="text-gray-600">
                    Your completed appointments will appear here
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}