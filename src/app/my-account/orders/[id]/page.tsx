import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock,
  MapPin,
  Phone,
  Mail,
  Download,
  MessageSquare,
  XCircle,
  FileText
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

interface OrderDetailPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: OrderDetailPageProps): Promise<Metadata> {
  return {
    title: `Order ${params.id}`,
    description: `View details and track your order ${params.id}`,
  };
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const order = {
    id: params.id,
    orderNumber: params.id,
    date: '2024-01-20T10:30:00Z',
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: 'Credit Card',
    total: 125000,
    subtotal: 115000,
    tax: 5000,
    shipping: 5000,
    discount: 0,
    estimatedDelivery: '2024-02-05',
    trackingNumber: 'LW2024012000123',
    trackingUrl: 'https://tracking.example.com/LW2024012000123',
    items: [
      {
        id: '1',
        name: 'Modern Modular Kitchen - Premium Series',
        image: '/images/products/kitchen/modern-kitchen-1.jpg',
        category: 'Kitchen',
        color: 'White Oak',
        finish: 'Matte',
        quantity: 1,
        price: 85000,
        dimensions: '10ft x 8ft',
        sku: 'KIT-MOD-001',
      },
      {
        id: '2',
        name: 'Wardrobe with Sliding Doors',
        image: '/images/products/bedroom/wardrobe-1.jpg',
        category: 'Bedroom',
        color: 'Walnut Brown',
        finish: 'Glossy',
        quantity: 1,
        price: 30000,
        dimensions: '8ft x 7ft',
        sku: 'BED-WAR-001',
      },
    ],
    shippingAddress: {
      name: 'John Doe',
      phone: '+91 98765 43210',
      email: 'john.doe@example.com',
      street: '123 Main Street',
      apartment: 'Apt 4B',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '380001',
      country: 'India',
    },
    billingAddress: {
      name: 'John Doe',
      phone: '+91 98765 43210',
      email: 'john.doe@example.com',
      street: '123 Main Street',
      apartment: 'Apt 4B',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '380001',
      country: 'India',
    },
    timeline: [
      {
        status: 'Order Placed',
        date: '2024-01-20T10:30:00Z',
        description: 'Your order has been received and is being processed',
        completed: true,
      },
      {
        status: 'Payment Confirmed',
        date: '2024-01-20T10:35:00Z',
        description: 'Payment has been successfully processed',
        completed: true,
      },
      {
        status: 'In Production',
        date: '2024-01-22T09:00:00Z',
        description: 'Your custom furniture is being manufactured',
        completed: true,
      },
      {
        status: 'Quality Check',
        date: '2024-01-28T14:00:00Z',
        description: 'Quality inspection in progress',
        completed: false,
      },
      {
        status: 'Shipped',
        date: null,
        description: 'Order will be shipped soon',
        completed: false,
      },
      {
        status: 'Out for Delivery',
        date: null,
        description: 'Order is on its way to you',
        completed: false,
      },
      {
        status: 'Delivered',
        date: null,
        description: 'Order delivered successfully',
        completed: false,
      },
    ],
    notes: 'Please call 30 minutes before delivery. Building access code: 1234',
  };

  if (!order) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      processing: 'bg-blue-100 text-blue-800 border-blue-200',
      shipped: 'bg-purple-100 text-purple-800 border-purple-200',
      delivered: 'bg-green-100 text-green-800 border-green-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200',
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  const getPaymentStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      paid: 'bg-green-100 text-green-800 border-green-200',
      failed: 'bg-red-100 text-red-800 border-red-200',
      refunded: 'bg-gray-100 text-gray-800 border-gray-200',
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  const completedSteps = order.timeline.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / order.timeline.length) * 100;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-4">
        <Link href="/my-account/orders">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Orders
        </Link>
      </Button>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Order #{order.orderNumber}
          </h1>
          <p className="text-gray-600">
            Placed on {formatDate(order.date)} at {formatTime(order.date)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge className={`${getStatusColor(order.status)} border`}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Badge>
          <Badge className={`${getPaymentStatusColor(order.paymentStatus)} border`}>
            {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
          </Badge>
        </div>
      </div>

      <Separator />

      {/* Order Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Truck className="h-5 w-5" />
            <span>Order Status</span>
          </CardTitle>
          <CardDescription>
            Track your order progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-gray-600">
                {completedSteps} of {order.timeline.length} steps completed
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          <div className="space-y-4">
            {order.timeline.map((step, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {step.completed ? (
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                    {step.status}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {step.description}
                  </p>
                  {step.date && (
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(step.date)} at {formatTime(step.date)}
                    </p>
                  )}
                </div>
                {index < order.timeline.length - 1 && (
                  <div className="absolute left-5 top-10 w-0.5 h-full bg-gray-200" 
                       style={{ marginTop: '2.5rem' }} />
                )}
              </div>
            ))}
          </div>

          {order.trackingNumber && (
            <div className="mt-6 pt-6 border-t">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tracking Number</p>
                  <p className="font-mono font-medium">{order.trackingNumber}</p>
                </div>
                <Button variant="outline" asChild>
                  <a href={order.trackingUrl} target="_blank" rel="noopener noreferrer">
                    <Truck className="h-4 w-4 mr-2" />
                    Track Shipment
                  </a>
                </Button>
              </div>
            </div>
          )}

          {order.estimatedDelivery && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900">Estimated Delivery</p>
                  <p className="text-sm text-blue-700 mt-1">
                    {formatDate(order.estimatedDelivery)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5" />
            <span>Order Items</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row gap-4 pb-4 border-b last:border-b-0 last:pb-0">
                <div className="h-24 w-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 mb-1">{item.name}</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>SKU: {item.sku}</p>
                    <p>Color: {item.color} | Finish: {item.finish}</p>
                    <p>Dimensions: {item.dimensions}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
                <div className="text-right sm:text-left flex-shrink-0">
                  <p className="font-semibold text-gray-900">
                    {formatCurrency(item.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Shipping Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Shipping Address</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p className="font-medium text-gray-900">{order.shippingAddress.name}</p>
              <p className="text-gray-600">
                {order.shippingAddress.street}
                {order.shippingAddress.apartment && `, ${order.shippingAddress.apartment}`}
              </p>
              <p className="text-gray-600">
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}
              </p>
              <p className="text-gray-600">{order.shippingAddress.country}</p>
              <Separator className="my-3" />
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone className="h-4 w-4" />
                <span>{order.shippingAddress.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Mail className="h-4 w-4" />
                <span>{order.shippingAddress.email}</span>
              </div>
            </div>

            {order.notes && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-xs font-medium text-yellow-900 mb-1">Delivery Notes</p>
                <p className="text-sm text-yellow-800">{order.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Billing Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Billing Address</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p className="font-medium text-gray-900">{order.billingAddress.name}</p>
              <p className="text-gray-600">
                {order.billingAddress.street}
                {order.billingAddress.apartment && `, ${order.billingAddress.apartment}`}
              </p>
              <p className="text-gray-600">
                {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.pincode}
              </p>
              <p className="text-gray-600">{order.billingAddress.country}</p>
              <Separator className="my-3" />
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone className="h-4 w-4" />
                <span>{order.billingAddress.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Mail className="h-4 w-4" />
                <span>{order.billingAddress.email}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">{formatCurrency(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">{formatCurrency(order.shipping)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax (GST)</span>
              <span className="font-medium">{formatCurrency(order.tax)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount</span>
                <span className="font-medium">-{formatCurrency(order.discount)}</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="font-bold text-lg">{formatCurrency(order.total)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Payment Method</span>
              <span className="font-medium">{order.paymentMethod}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
          <CardDescription>
            Contact us if you have any questions about your order
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Download Invoice
            </Button>
            <Button variant="outline" className="flex-1" asChild>
              <Link href="/contact">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Support
              </Link>
            </Button>
            {order.status !== 'cancelled' && order.status !== 'delivered' && (
              <Button variant="outline" className="flex-1 text-red-600 border-red-200 hover:bg-red-50">
                <XCircle className="h-4 w-4 mr-2" />
                Cancel Order
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}