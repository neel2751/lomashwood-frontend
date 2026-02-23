import { Metadata } from 'next';
import Link from 'next/link';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  Calendar, 
  BookMarked, 
  Settings,
  Package,
  Clock,
  MapPin
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'My Account - Lomash Wood',
  description: 'Manage your Lomash Wood account, orders, appointments, and saved designs',
};

export default function MyAccountPage() {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    memberSince: 'January 2024',
  };

  const stats = {
    orders: 3,
    appointments: 2,
    wishlist: 8,
    savedDesigns: 5,
  };

  const recentOrders = [
    {
      id: 'ORD-001',
      date: '2024-01-20',
      status: 'Processing',
      total: '₹1,25,000',
      items: 2,
    },
    {
      id: 'ORD-002',
      date: '2024-01-15',
      status: 'Delivered',
      total: '₹85,000',
      items: 1,
    },
  ];

  const upcomingAppointments = [
    {
      id: 'APT-001',
      type: 'Kitchen Consultation',
      date: '2024-01-28',
      time: '10:00 AM',
      location: 'Ahmedabad Showroom',
      status: 'Confirmed',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          My Account
        </h1>
        <p className="text-gray-600">
          Manage your account and view your activity
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar - User Info */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">{user.name}</CardTitle>
                  <CardDescription>Member since {user.memberSince}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="text-sm font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Phone</p>
                <p className="text-sm font-medium">{user.phone}</p>
              </div>
              <Separator />
              <Button variant="outline" className="w-full" asChild>
                <Link href="/my-account/profile">
                  <User className="h-4 w-4 mr-2" />
                  Edit Profile
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link 
                href="/my-account/orders"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <ShoppingBag className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium">My Orders</span>
                </div>
                <Badge variant="secondary">{stats.orders}</Badge>
              </Link>

              <Link 
                href="/my-account/appointments"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium">Appointments</span>
                </div>
                <Badge variant="secondary">{stats.appointments}</Badge>
              </Link>

              <Link 
                href="/my-account/wishlist"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Heart className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium">Wishlist</span>
                </div>
                <Badge variant="secondary">{stats.wishlist}</Badge>
              </Link>

              <Link 
                href="/my-account/saved-designs"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <BookMarked className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium">Saved Designs</span>
                </div>
                <Badge variant="secondary">{stats.savedDesigns}</Badge>
              </Link>

              <Link 
                href="/my-account/settings"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Settings className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium">Settings</span>
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <ShoppingBag className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{stats.orders}</p>
                  <p className="text-sm text-gray-600">Orders</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{stats.appointments}</p>
                  <p className="text-sm text-gray-600">Appointments</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{stats.wishlist}</p>
                  <p className="text-sm text-gray-600">Wishlist</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <BookMarked className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{stats.savedDesigns}</p>
                  <p className="text-sm text-gray-600">Designs</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Appointments */}
          {upcomingAppointments.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/my-account/appointments">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div 
                    key={appointment.id}
                    className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold">{appointment.type}</h4>
                        <Badge variant="default">{appointment.status}</Badge>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>{appointment.location}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/my-account/appointments/${appointment.id}`}>
                        View
                      </Link>
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/my-account/orders">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <div 
                    key={order.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Package className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="font-semibold">{order.id}</p>
                          <Badge 
                            variant={order.status === 'Delivered' ? 'default' : 'secondary'}
                          >
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          {order.items} {order.items === 1 ? 'item' : 'items'} • {order.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold mb-1">{order.total}</p>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/my-account/orders/${order.id}`}>
                          View
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-4">No orders yet</p>
                  <Button asChild>
                    <Link href="/kitchen">Start Shopping</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto py-4" asChild>
                  <Link href="/book-appointment" className="flex flex-col items-center space-y-2">
                    <Calendar className="h-8 w-8" />
                    <span>Book Appointment</span>
                  </Link>
                </Button>

                <Button variant="outline" className="h-auto py-4" asChild>
                  <Link href="/kitchen" className="flex flex-col items-center space-y-2">
                    <ShoppingBag className="h-8 w-8" />
                    <span>Browse Products</span>
                  </Link>
                </Button>

                <Button variant="outline" className="h-auto py-4" asChild>
                  <Link href="/showrooms" className="flex flex-col items-center space-y-2">
                    <MapPin className="h-8 w-8" />
                    <span>Find Showroom</span>
                  </Link>
                </Button>

                <Button variant="outline" className="h-auto py-4" asChild>
                  <Link href="/contact" className="flex flex-col items-center space-y-2">
                    <User className="h-8 w-8" />
                    <span>Contact Support</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}