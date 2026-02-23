"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  Heart,
  Package,
  Settings,
  User,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";

interface DashboardStats {
  totalOrders: number;
  activeAppointments: number;
  wishlistItems: number;
  savedDesigns: number;
}

interface RecentOrder {
  id: string;
  orderNumber: string;
  date: string;
  status: "pending" | "processing" | "completed" | "cancelled";
  total: number;
  items: number;
}

interface UpcomingAppointment {
  id: string;
  type: string;
  date: string;
  time: string;
  location: string;
  status: "confirmed" | "pending" | "cancelled";
}

const mockStats: DashboardStats = {
  totalOrders: 5,
  activeAppointments: 2,
  wishlistItems: 8,
  savedDesigns: 3,
};

const mockRecentOrders: RecentOrder[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-001",
    date: "Jan 25, 2024",
    status: "processing",
    total: 125000,
    items: 3,
  },
  {
    id: "2",
    orderNumber: "ORD-2024-002",
    date: "Jan 20, 2024",
    status: "completed",
    total: 85000,
    items: 2,
  },
  {
    id: "3",
    orderNumber: "ORD-2024-003",
    date: "Jan 15, 2024",
    status: "pending",
    total: 150000,
    items: 4,
  },
];

const mockUpcomingAppointments: UpcomingAppointment[] = [
  {
    id: "1",
    type: "Home Measurement",
    date: "Feb 5, 2024",
    time: "10:00 AM",
    location: "Customer Home - Ahmedabad",
    status: "confirmed",
  },
  {
    id: "2",
    type: "Showroom Visit",
    date: "Feb 8, 2024",
    time: "2:30 PM",
    location: "Lomash Wood Showroom - SG Highway",
    status: "pending",
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (authLoading) {
    return <DashboardSkeleton />;
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<
      string,
      "default" | "secondary" | "destructive" | "outline"
    > = {
      pending: "secondary",
      processing: "default",
      completed: "outline",
      cancelled: "destructive",
      confirmed: "default",
    };

    return (
      <Badge variant={variants[status] || "default"} className="capitalize">
        {status}
      </Badge>
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "processing":
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-lg">
                {user.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user.name?.split(" ")[0] || "User"}!
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your orders, appointments, and account settings
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Orders"
            value={mockStats.totalOrders}
            icon={<Package className="h-5 w-5" />}
            loading={isLoading}
            href="/my-account/orders"
          />
          <StatsCard
            title="Appointments"
            value={mockStats.activeAppointments}
            icon={<Calendar className="h-5 w-5" />}
            loading={isLoading}
            href="/my-account/appointments"
          />
          <StatsCard
            title="Wishlist"
            value={mockStats.wishlistItems}
            icon={<Heart className="h-5 w-5" />}
            loading={isLoading}
            href="/my-account/wishlist"
          />
          <StatsCard
            title="Saved Designs"
            value={mockStats.savedDesigns}
            icon={<FileText className="h-5 w-5" />}
            loading={isLoading}
            href="/my-account/saved-designs"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Orders */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-semibold">
                  Recent Orders
                </CardTitle>
                <Link href="/my-account/orders">
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-20 w-full" />
                    ))}
                  </div>
                ) : mockRecentOrders.length > 0 ? (
                  <div className="space-y-4">
                    {mockRecentOrders.map((order) => (
                      <Link
                        key={order.id}
                        href={`/my-account/orders/${order.id}`}
                        className="block"
                      >
                        <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center gap-4">
                            {getStatusIcon(order.status)}
                            <div>
                              <p className="font-semibold text-gray-900">
                                Order #{order.orderNumber}
                              </p>
                              <p className="text-sm text-gray-600">
                                {order.items} items • {order.date}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">
                              ₹{order.total.toLocaleString()}
                            </p>
                            {getStatusBadge(order.status)}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">No orders yet</p>
                    <Link href="/kitchen">
                      <Button variant="link" className="mt-2">
                        Start Shopping
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Appointments */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-semibold">
                  Upcoming Appointments
                </CardTitle>
                <Link href="/my-account/appointments">
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2].map((i) => (
                      <Skeleton key={i} className="h-24 w-full" />
                    ))}
                  </div>
                ) : mockUpcomingAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {mockUpcomingAppointments.map((appointment) => (
                      <Link
                        key={appointment.id}
                        href={`/my-account/appointments/${appointment.id}`}
                        className="block"
                      >
                        <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-5 w-5 text-primary" />
                              <p className="font-semibold text-gray-900">
                                {appointment.type}
                              </p>
                            </div>
                            {getStatusBadge(appointment.status)}
                          </div>
                          <div className="ml-7 space-y-1 text-sm text-gray-600">
                            <p>
                              📅 {appointment.date} at {appointment.time}
                            </p>
                            <p>📍 {appointment.location}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">No upcoming appointments</p>
                    <Link href="/book-appointment">
                      <Button variant="link" className="mt-2">
                        Book an Appointment
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/book-appointment" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Appointment
                  </Button>
                </Link>
                <Link href="/my-account/profile" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </Link>
                <Link href="/my-account/wishlist" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Heart className="mr-2 h-4 w-4" />
                    View Wishlist
                  </Button>
                </Link>
                <Link href="/my-account/settings" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Account Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Account Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-900">{user.email}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Member Since</p>
                  <p className="font-medium text-gray-900">
                    {new Date(user.createdAt || Date.now()).toLocaleDateString(
                      "en-IN",
                      {
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>
                <div className="pt-4 border-t">
                  <Link href="/my-account/profile">
                    <Button variant="link" className="p-0 h-auto">
                      Update Account Details →
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Need Help */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-700">
                  Our team is here to assist you with any questions or concerns.
                </p>
                <Link href="/contact">
                  <Button className="w-full">Contact Support</Button>
                </Link>
                <Link href="/showrooms">
                  <Button variant="outline" className="w-full">
                    Find a Showroom
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatsCard({
  title,
  value,
  icon,
  loading,
  href,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  loading: boolean;
  href: string;
}) {
  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Link href={href}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{title}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-full text-primary">
              {icon}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-96" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <Skeleton className="h-64 w-full" />
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <Skeleton className="h-48 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}