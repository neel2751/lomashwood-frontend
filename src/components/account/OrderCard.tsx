"use client";

import {
  Package,
  Truck,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  Calendar,
  Download,
  Eye,
  MessageSquare,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export interface OrderItem {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
  variant?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "returned";
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: "paid" | "pending" | "failed";
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  };
  trackingNumber?: string;
  estimatedDelivery?: string;
  deliveredDate?: string;
  canCancel?: boolean;
  canReturn?: boolean;
  canReview?: boolean;
}

interface OrderCardProps {
  order: Order;
  variant?: "default" | "compact";
  onViewDetails?: (orderId: string) => void;
  onTrackOrder?: (orderId: string) => void;
  onCancelOrder?: (orderId: string) => void;
  onReturnOrder?: (orderId: string) => void;
  onDownloadInvoice?: (orderId: string) => void;
  onWriteReview?: (orderId: string) => void;
  onContactSupport?: (orderId: string) => void;
  className?: string;
}

const statusConfig = {
  pending: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-700",
    icon: Clock,
    description: "Order is being processed",
  },
  confirmed: {
    label: "Confirmed",
    color: "bg-blue-100 text-blue-700",
    icon: CheckCircle2,
    description: "Order confirmed",
  },
  processing: {
    label: "Processing",
    color: "bg-purple-100 text-purple-700",
    icon: Package,
    description: "Order is being prepared",
  },
  shipped: {
    label: "Shipped",
    color: "bg-indigo-100 text-indigo-700",
    icon: Truck,
    description: "Order is on the way",
  },
  delivered: {
    label: "Delivered",
    color: "bg-green-100 text-green-700",
    icon: CheckCircle2,
    description: "Order delivered successfully",
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-700",
    icon: XCircle,
    description: "Order was cancelled",
  },
  returned: {
    label: "Returned",
    color: "bg-orange-100 text-orange-700",
    icon: RotateCcw,
    description: "Order has been returned",
  },
};

export default function OrderCard({
  order,
  variant = "default",
  onViewDetails,
  onTrackOrder,
  onCancelOrder,
  onReturnOrder,
  onDownloadInvoice,
  onWriteReview,
  onContactSupport,
  className = "",
}: OrderCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showAddressCollapsed, setShowAddressCollapsed] = useState(false);

  const statusInfo = statusConfig[order.status];
  const StatusIcon = statusInfo.icon;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const getStatusProgress = () => {
    switch (order.status) {
      case "pending":
        return 10;
      case "confirmed":
        return 25;
      case "processing":
        return 50;
      case "shipped":
        return 75;
      case "delivered":
        return 100;
      default:
        return 0;
    }
  };

  const handleCancelOrder = () => {
    onCancelOrder?.(order.id);
    setShowCancelDialog(false);
  };

  if (variant === "compact") {
    return (
      <div className={`bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow ${className}`}>
        <div className="p-4">
          <div className="flex items-start gap-4">
            {/* First Item Image */}
            <div className="relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={order.items[0].image}
                alt={order.items[0].name}
                fill
                className="object-cover"
              />
              {order.items.length > 1 && (
                <span className="absolute bottom-1 right-1 inline-flex items-center justify-center h-5 min-w-5 px-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                  +{order.items.length - 1}
                </span>
              )}
            </div>

            {/* Order Info */}
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <Link
                    href={`/account/orders/${order.id}`}
                    className="font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-1"
                  >
                    {order.items[0].name}
                  </Link>
                  <p className="text-sm text-gray-600">
                    Order #{order.orderNumber}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded ${statusInfo.color}`}>
                  {statusInfo.label}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{formatDate(order.date)}</span>
                <span className="font-semibold text-gray-900">₹{order.totalAmount.toLocaleString()}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => onViewDetails?.(order.id)}
                  className="px-3 py-1.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  View Details
                </button>
                {order.trackingNumber && (
                  <button
                    onClick={() => onTrackOrder?.(order.id)}
                    className="px-3 py-1.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Track
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">Order #{order.orderNumber}</h3>
              <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded ${statusInfo.color}`}>
                <StatusIcon className="h-3 w-3" />
                {statusInfo.label}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(order.date)}</span>
              </div>
              {order.estimatedDelivery && order.status !== "delivered" && (
                <div className="flex items-center gap-1">
                  <Truck className="h-3 w-3" />
                  <span>Est. {formatDate(order.estimatedDelivery)}</span>
                </div>
              )}
              {order.deliveredDate && (
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-green-600" />
                  <span>Delivered {formatDate(order.deliveredDate)}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onDownloadInvoice && (
              <button
                onClick={() => onDownloadInvoice(order.id)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Download Invoice"
              >
                <Download className="h-4 w-4 text-gray-700" />
              </button>
            )}
            {onContactSupport && (
              <button
                onClick={() => onContactSupport(order.id)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Contact Support"
              >
                <MessageSquare className="h-4 w-4 text-gray-700" />
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        {order.status !== "cancelled" && order.status !== "returned" && (
          <div className="mt-4 space-y-2">
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${getStatusProgress()}%` }}
              />
            </div>
            <p className="text-xs text-gray-600">{statusInfo.description}</p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Order Items */}
        <div className="space-y-3">
          {order.items.slice(0, isExpanded ? undefined : 2).map((item) => (
            <div key={item.id} className="flex items-start gap-4">
              <div className="relative h-16 w-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <Link
                  href={`/products/${item.id}`}
                  className="font-medium text-gray-900 hover:text-blue-600 transition-colors line-clamp-1"
                >
                  {item.name}
                </Link>
                {item.variant && (
                  <p className="text-sm text-gray-600">{item.variant}</p>
                )}
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm text-gray-600">
                    Qty: {item.quantity}
                  </span>
                  <span className="font-semibold text-gray-900">₹{item.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}

          {order.items.length > 2 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center justify-center gap-2 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  Show {order.items.length - 2} More Items
                </>
              )}
            </button>
          )}
        </div>

        <div className="border-t border-gray-200" />

        {/* Order Summary */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Payment Method</span>
            <span className="font-medium text-gray-900">{order.paymentMethod}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Payment Status</span>
            <span
              className={`px-2 py-1 text-xs font-medium rounded ${
                order.paymentStatus === "paid"
                  ? "bg-green-100 text-green-700"
                  : order.paymentStatus === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {order.paymentStatus}
            </span>
          </div>
          <div className="flex items-center justify-between font-semibold text-gray-900">
            <span>Total Amount</span>
            <span className="text-lg">₹{order.totalAmount.toLocaleString()}</span>
          </div>
        </div>

        {/* Shipping Address */}
        <div>
          <button
            onClick={() => setShowAddressCollapsed(!showAddressCollapsed)}
            className="w-full flex items-center justify-between py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Shipping Address</span>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${showAddressCollapsed ? 'rotate-180' : ''}`} />
          </button>
          {showAddressCollapsed && (
            <div className="mt-2 p-4 rounded-lg bg-gray-50 text-sm">
              <div className="space-y-1">
                <p className="font-medium text-gray-900">{order.shippingAddress.name}</p>
                <p className="text-gray-600">{order.shippingAddress.address}</p>
                <p className="text-gray-600">
                  {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
                  {order.shippingAddress.pincode}
                </p>
                <p className="text-gray-600">Phone: {order.shippingAddress.phone}</p>
              </div>
            </div>
          )}
        </div>

        {/* Tracking Number */}
        {order.trackingNumber && (
          <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-900">Tracking Number</p>
                <p className="font-mono text-sm text-gray-700">{order.trackingNumber}</p>
              </div>
              {onTrackOrder && (
                <button
                  onClick={() => onTrackOrder(order.id)}
                  className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-white transition-colors"
                >
                  <Truck className="h-4 w-4" />
                  Track Order
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-200">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2 w-full">
            {onViewDetails && (
              <button
                onClick={() => onViewDetails(order.id)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Eye className="h-4 w-4" />
                View Details
              </button>
            )}

            {order.canReview && onWriteReview && (
              <button
                onClick={() => onWriteReview(order.id)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Star className="h-4 w-4" />
                Write Review
              </button>
            )}

            {order.canReturn && onReturnOrder && (
              <button
                onClick={() => onReturnOrder(order.id)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
                Return Order
              </button>
            )}

            {order.canCancel && onCancelOrder && (
              <button
                onClick={() => setShowCancelDialog(true)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                <XCircle className="h-4 w-4" />
                Cancel Order
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Cancel Dialog */}
      {showCancelDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Cancel Order</h2>
              <p className="text-sm text-gray-600 mt-1">
                Are you sure you want to cancel this order? This action cannot be undone.
              </p>
            </div>
            <div className="p-6">
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 mb-1">Order #{order.orderNumber}</p>
                    <p className="text-sm text-gray-600">
                      Total Amount: ₹{order.totalAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowCancelDialog(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Keep Order
              </button>
              <button
                onClick={handleCancelOrder}
                className="flex-1 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export function OrderCardSkeleton({ variant = "default" }: { variant?: "default" | "compact" }) {
  if (variant === "compact") {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-4">
          <div className="flex items-start gap-4 animate-pulse">
            <div className="h-20 w-20 rounded-lg bg-gray-200" />
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="flex gap-2">
                <div className="h-8 bg-gray-200 rounded w-24" />
                <div className="h-8 bg-gray-200 rounded w-24" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200 space-y-4 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
        <div className="h-2 bg-gray-200 rounded w-full" />
      </div>
      <div className="p-6 space-y-4 animate-pulse">
        <div className="space-y-3">
          <div className="flex gap-4">
            <div className="h-16 w-16 rounded-lg bg-gray-200" />
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 border-t border-gray-200">
        <div className="h-10 bg-gray-200 rounded w-full animate-pulse" />
      </div>
    </div>
  );
}