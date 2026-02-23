"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  TruckIcon,
  Calendar,
  Search,
  Eye,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: "pending" | "confirmed" | "in-progress" | "completed" | "cancelled";
  total: number;
  items: {
    id: string;
    name: string;
    category: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  estimatedDelivery?: string;
  trackingNumber?: string;
}

const statusConfig = {
  pending: {
    icon: Clock,
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  confirmed: {
    icon: CheckCircle,
    label: "Confirmed",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  "in-progress": {
    icon: TruckIcon,
    label: "In Progress",
    color: "bg-purple-100 text-purple-800 border-purple-200",
  },
  completed: {
    icon: CheckCircle,
    label: "Completed",
    color: "bg-green-100 text-green-800 border-green-200",
  },
  cancelled: {
    icon: XCircle,
    label: "Cancelled",
    color: "bg-red-100 text-red-800 border-red-200",
  },
};

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const { data: orders, isLoading, error } = useQuery<Order[]>({
    queryKey: ["orders", sortBy, filterStatus],
    queryFn: async () => {
      const response = await fetch(
        `/api/my-account/orders?sort=${sortBy}&status=${filterStatus}`
      );
      if (!response.ok) throw new Error("Failed to fetch orders");
      return response.json();
    },
  });

  const filteredOrders = orders?.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesStatus =
      filterStatus === "all" || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const ordersByStatus = {
    all: orders?.length || 0,
    pending: orders?.filter((o) => o.status === "pending").length || 0,
    confirmed: orders?.filter((o) => o.status === "confirmed").length || 0,
    "in-progress":
      orders?.filter((o) => o.status === "in-progress").length || 0,
    completed: orders?.filter((o) => o.status === "completed").length || 0,
    cancelled: orders?.filter((o) => o.status === "cancelled").length || 0,
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="error">
          <AlertDescription>
            Failed to load orders. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
        <p className="text-gray-600">
          Track and manage your orders from Lomash Wood
        </p>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by order number or product name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="highest">Highest Amount</SelectItem>
              <SelectItem value="lowest">Lowest Amount</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Status Tabs */}
        <Tabs
          value={filterStatus}
          onValueChange={setFilterStatus}
          className="w-full"
        >
          <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto">
            <TabsTrigger value="all">
              All ({ordersByStatus.all})
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending ({ordersByStatus.pending})
            </TabsTrigger>
            <TabsTrigger value="confirmed">
              Confirmed ({ordersByStatus.confirmed})
            </TabsTrigger>
            <TabsTrigger value="in-progress">
              In Progress ({ordersByStatus["in-progress"]})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({ordersByStatus.completed})
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              Cancelled ({ordersByStatus.cancelled})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Orders List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-4 w-1/4 mt-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-24 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredOrders && filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No orders found
              </h3>
              <p className="text-gray-600 mb-6">
                {searchQuery || filterStatus !== "all"
                  ? "Try adjusting your filters or search query"
                  : "You haven't placed any orders yet"}
              </p>
              <Button asChild>
                <Link href="/kitchen">Start Shopping</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function OrderCard({ order }: { order: Order }) {
  const StatusIcon = statusConfig[order.status].icon;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <CardTitle className="text-lg">
                Order #{order.orderNumber}
              </CardTitle>
              <Badge
                variant="outline"
                className={statusConfig[order.status].color}
              >
                <StatusIcon className="h-3 w-3 mr-1" />
                {statusConfig[order.status].label}
              </Badge>
            </div>
            <CardDescription className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(order.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              {order.estimatedDelivery && (
                <span className="flex items-center gap-1">
                  <TruckIcon className="h-3 w-3" />
                  Est. Delivery:{" "}
                  {new Date(order.estimatedDelivery).toLocaleDateString()}
                </span>
              )}
            </CardDescription>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="text-lg font-bold text-gray-900">
                ₹{order.total.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="pt-6">
        {/* Order Items */}
        <div className="space-y-3 mb-6">
          {order.items.slice(0, 2).map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-md bg-gray-100 flex-shrink-0">
                {/* Product image placeholder */}
                <div className="h-full w-full flex items-center justify-center text-gray-400">
                  <Package className="h-6 w-6" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">
                  {item.name}
                </p>
                <p className="text-sm text-gray-600">
                  {item.category} • Qty: {item.quantity}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  ₹{item.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
          {order.items.length > 2 && (
            <p className="text-sm text-gray-600 pl-20">
              +{order.items.length - 2} more item(s)
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild variant="default" className="flex-1">
            <Link href={`/my-account/orders/${order.id}`}>
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Link>
          </Button>

          {order.trackingNumber && (
            <Button variant="outline" className="flex-1">
              <TruckIcon className="h-4 w-4 mr-2" />
              Track Order
            </Button>
          )}

          {order.status === "completed" && (
            <Button variant="outline" className="flex-1">
              Reorder
            </Button>
          )}

          {order.status === "pending" && (
            <Button variant="outline" className="flex-1 text-red-600 border-red-200 hover:bg-red-50">
              Cancel Order
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}