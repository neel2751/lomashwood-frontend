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
  MessageSquare,
  RotateCcw,
  AlertCircle,
  Star,
  ChevronLeft,
  CreditCard,
  Phone,
  Mail,
  FileText,
  Printer,
  Share2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface OrderItem {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
  variant?: string;
  sku?: string;
}

interface TrackingEvent {
  id: string;
  status: string;
  description: string;
  location?: string;
  timestamp: string;
}

interface OrderDetail {
  id: string;
  orderNumber: string;
  date: string;
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "returned";
  items: OrderItem[];

  subtotal: number;
  tax: number;
  shippingCost: number;
  discount?: number;
  totalAmount: number;

  paymentMethod: string;
  paymentStatus: "paid" | "pending" | "failed";
  transactionId?: string;

  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
    email?: string;
  };
  
  billingAddress?: {
    name: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };

  trackingNumber?: string;
  trackingUrl?: string;
  estimatedDelivery?: string;
  deliveredDate?: string;
  trackingEvents?: TrackingEvent[];

  canCancel?: boolean;
  canReturn?: boolean;
  canReview?: boolean;

  notes?: string;
  invoiceUrl?: string;
}

interface OrderDetailProps {
  order: OrderDetail;
  onBack?: () => void;
  onCancelOrder?: (orderId: string) => void;
  onReturnOrder?: (orderId: string) => void;
  onDownloadInvoice?: (orderId: string) => void;
  onPrintInvoice?: (orderId: string) => void;
  onWriteReview?: (itemId: string) => void;
  onContactSupport?: (orderId: string) => void;
  className?: string;
}

const statusConfig = {
  pending: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-700",
    icon: Clock,
  },
  confirmed: {
    label: "Confirmed",
    color: "bg-blue-100 text-blue-700",
    icon: CheckCircle2,
  },
  processing: {
    label: "Processing",
    color: "bg-purple-100 text-purple-700",
    icon: Package,
  },
  shipped: {
    label: "Shipped",
    color: "bg-indigo-100 text-indigo-700",
    icon: Truck,
  },
  delivered: {
    label: "Delivered",
    color: "bg-green-100 text-green-700",
    icon: CheckCircle2,
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-700",
    icon: XCircle,
  },
  returned: {
    label: "Returned",
    color: "bg-orange-100 text-orange-700",
    icon: RotateCcw,
  },
};

const orderSteps = [
  { id: "confirmed", label: "Order Confirmed" },
  { id: "processing", label: "Processing" },
  { id: "shipped", label: "Shipped" },
  { id: "delivered", label: "Delivered" },
];

export default function OrderDetail({
  order,
  onBack,
  onCancelOrder,
  onReturnOrder,
  onDownloadInvoice,
  onPrintInvoice,
  onWriteReview,
  onContactSupport,
  className = "",
}: OrderDetailProps) {
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [activeTab, setActiveTab] = useState<"items" | "tracking" | "details">("items");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const statusInfo = statusConfig[order.status];
  const StatusIcon = statusInfo.icon;

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getCurrentStepIndex = () => {
    const statusToStep: Record<string, number> = {
      pending: -1,
      confirmed: 0,
      processing: 1,
      shipped: 2,
      delivered: 3,
    };
    return statusToStep[order.status] ?? -1;
  };

  const handleCancelOrder = () => {
    onCancelOrder?.(order.id);
    setShowCancelDialog(false);
  };

  const handleShare = () => {
    const text = `Order #${order.orderNumber} - ₹${order.totalAmount.toLocaleString()}`;
    if (navigator.share) {
      navigator.share({ title: "Order Details", text });
    } else {
      navigator.clipboard.writeText(text);
      showToastMessage("Order details copied to clipboard!");
    }
  };

  const currentStepIndex = getCurrentStepIndex();

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>
          )}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Order Details</h1>
            <p className="text-gray-600">Order #{order.orderNumber}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Share2 className="h-4 w-4 text-gray-700" />
          </button>
          {onPrintInvoice && (
            <button
              onClick={() => onPrintInvoice(order.id)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Printer className="h-4 w-4 text-gray-700" />
            </button>
          )}
          {onDownloadInvoice && (
            <button
              onClick={() => onDownloadInvoice(order.id)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="h-4 w-4" />
              Invoice
            </button>
          )}
        </div>
      </div>

      {/* Status Card */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded ${statusInfo.color}`}>
                  <StatusIcon className="h-3 w-3" />
                  {statusInfo.label}
                </span>
                <span className="px-2 py-1 border border-gray-300 text-gray-700 text-xs font-medium rounded">
                  {order.paymentStatus === "paid" ? "Paid" : "Payment Pending"}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>Ordered {formatDate(order.date)}</span>
                </div>
                {order.deliveredDate && (
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-green-600" />
                    <span>Delivered {formatDate(order.deliveredDate)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Order Progress */}
        {order.status !== "cancelled" && order.status !== "returned" && (
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center relative">
                {/* Progress Line */}
                <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200" />
                <div
                  className="absolute top-5 left-0 h-0.5 bg-blue-600 transition-all duration-500"
                  style={{
                    width: `${(currentStepIndex / (orderSteps.length - 1)) * 100}%`,
                  }}
                />
                
                {orderSteps.map((step, index) => (
                  <div key={step.id} className="flex flex-col items-center flex-1 relative z-10">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                        index <= currentStepIndex
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "bg-white border-gray-300 text-gray-600"
                      }`}
                    >
                      {index < currentStepIndex ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <span className="text-sm font-semibold">{index + 1}</span>
                      )}
                    </div>
                    <span className="text-xs text-center mt-2 hidden sm:block text-gray-700">
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
              {order.estimatedDelivery && order.status !== "delivered" && (
                <p className="text-sm text-center text-gray-600">
                  Estimated delivery: {formatDate(order.estimatedDelivery)}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Main Content Tabs */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab("items")}
              className={`flex-1 px-4 py-3 font-medium transition-colors ${
                activeTab === "items"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Items
            </button>
            <button
              onClick={() => setActiveTab("tracking")}
              className={`flex-1 px-4 py-3 font-medium transition-colors ${
                activeTab === "tracking"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Tracking
            </button>
            <button
              onClick={() => setActiveTab("details")}
              className={`flex-1 px-4 py-3 font-medium transition-colors ${
                activeTab === "details"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Details
            </button>
          </div>
        </div>

        {/* Items Tab */}
        {activeTab === "items" && (
          <div className="p-6 space-y-4">
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Order Items ({order.items.length})</h3>
              </div>
              <div className="p-6 space-y-4">
                {order.items.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex items-start gap-4">
                      <div className="relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
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
                          className="font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        {item.variant && (
                          <p className="text-sm text-gray-600 mt-1">{item.variant}</p>
                        )}
                        {item.sku && (
                          <p className="text-xs text-gray-600 mt-1">SKU: {item.sku}</p>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm text-gray-600">
                            Qty: {item.quantity}
                          </span>
                          <span className="font-semibold text-gray-900">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      {order.canReview && onWriteReview && (
                        <button
                          onClick={() => onWriteReview(item.id)}
                          className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <Star className="h-4 w-4" />
                          Review
                        </button>
                      )}
                    </div>
                    {index < order.items.length - 1 && (
                      <div className="border-t border-gray-200 mt-4" />
                    )}
                  </div>
                ))}

                {/* Order Summary */}
                <div className="space-y-2 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">₹{order.subtotal.toLocaleString()}</span>
                  </div>
                  {order.discount && order.discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span>-₹{order.discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900">
                      {order.shippingCost === 0
                        ? "FREE"
                        : `₹${order.shippingCost.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="text-gray-900">₹{order.tax.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-gray-200 my-2" />
                  <div className="flex justify-between font-semibold text-lg">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">₹{order.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tracking Tab */}
        {activeTab === "tracking" && (
          <div className="p-6 space-y-4">
            {order.trackingNumber ? (
              <div className="bg-white rounded-xl border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Tracking Information</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-900">Tracking Number</p>
                        <p className="font-mono text-lg text-gray-900">{order.trackingNumber}</p>
                      </div>
                      {order.trackingUrl && (
                        <a
                          href={order.trackingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Truck className="h-4 w-4" />
                          Track Package
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Tracking Timeline */}
                  {order.trackingEvents && order.trackingEvents.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900">Tracking History</h3>
                      <div className="space-y-4">
                        {order.trackingEvents.map((event, index) => (
                          <div key={event.id} className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div
                                className={`w-3 h-3 rounded-full border-2 ${
                                  index === 0
                                    ? "bg-blue-600 border-blue-600"
                                    : "bg-gray-200 border-gray-400"
                                }`}
                              />
                              {index < order.trackingEvents!.length - 1 && (
                                <div className="w-0.5 h-full bg-gray-200 flex-1 mt-1" />
                              )}
                            </div>
                            <div className="flex-1 pb-4">
                              <div className="flex items-start justify-between gap-4">
                                <div className="space-y-1">
                                  <p className="font-medium text-gray-900">{event.status}</p>
                                  <p className="text-sm text-gray-600">
                                    {event.description}
                                  </p>
                                  {event.location && (
                                    <p className="text-sm text-gray-600 flex items-center gap-1">
                                      <MapPin className="h-3 w-3" />
                                      {event.location}
                                    </p>
                                  )}
                                </div>
                                <span className="text-sm text-gray-600 whitespace-nowrap">
                                  {formatDate(event.timestamp)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200">
                <div className="p-12">
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="p-4 rounded-full bg-gray-100">
                        <Package className="h-8 w-8 text-gray-500" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-gray-900">No Tracking Information</h3>
                      <p className="text-sm text-gray-600">
                        Tracking information will be available once your order is shipped
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Details Tab */}
        {activeTab === "details" && (
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Shipping Address */}
              <div className="bg-white rounded-xl border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Shipping Address
                  </h3>
                </div>
                <div className="p-6 space-y-2 text-sm">
                  <p className="font-medium text-gray-900">{order.shippingAddress.name}</p>
                  <p className="text-gray-600">{order.shippingAddress.address}</p>
                  <p className="text-gray-600">
                    {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
                    {order.shippingAddress.pincode}
                  </p>
                  <div className="border-t border-gray-200 my-2" />
                  <div className="space-y-1">
                    <p className="flex items-center gap-2 text-gray-900">
                      <Phone className="h-4 w-4" />
                      {order.shippingAddress.phone}
                    </p>
                    {order.shippingAddress.email && (
                      <p className="flex items-center gap-2 text-gray-900">
                        <Mail className="h-4 w-4" />
                        {order.shippingAddress.email}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              {order.billingAddress && (
                <div className="bg-white rounded-xl border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Billing Address
                    </h3>
                  </div>
                  <div className="p-6 space-y-2 text-sm">
                    <p className="font-medium text-gray-900">{order.billingAddress.name}</p>
                    <p className="text-gray-600">{order.billingAddress.address}</p>
                    <p className="text-gray-600">
                      {order.billingAddress.city}, {order.billingAddress.state} -{" "}
                      {order.billingAddress.pincode}
                    </p>
                  </div>
                </div>
              )}

              {/* Payment Information */}
              <div className="bg-white rounded-xl border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Information
                  </h3>
                </div>
                <div className="p-6 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method</span>
                    <span className="font-medium text-gray-900">{order.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
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
                  {order.transactionId && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transaction ID</span>
                      <span className="font-mono text-xs text-gray-900">{order.transactionId}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Notes */}
              {order.notes && (
                <div className="bg-white rounded-xl border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" />
                      Order Notes
                    </h3>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-gray-600">{order.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6">
          <div className="flex flex-wrap gap-3">
            {order.canReturn && onReturnOrder && (
              <button
                onClick={() => onReturnOrder(order.id)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
                Return Order
              </button>
            )}

            {onContactSupport && (
              <button
                onClick={() => onContactSupport(order.id)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                <MessageSquare className="h-4 w-4" />
                Contact Support
              </button>
            )}

            {order.canCancel && onCancelOrder && (
              <button
                onClick={() => setShowCancelDialog(true)}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
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

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}