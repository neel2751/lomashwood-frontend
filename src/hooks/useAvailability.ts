import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/config/api";
import { appointmentService } from "@/services/appointmentService";

export function useAppointmentSlots(params: {
  date: string;
  serviceType?: "kitchen" | "bedroom" | "both";
  showroomId?: string;
}) {
  return useQuery({
    queryKey: QUERY_KEYS.appointments.slots(params),
    queryFn: () => appointmentService.getTimeSlots(params),
    enabled: !!params.date,
  });
}

export function useAppointmentSlotsCount(params: {
  date: string;
  serviceType?: "kitchen" | "bedroom" | "both";
  showroomId?: string;
}) {
  return useQuery({
    queryKey: QUERY_KEYS.appointments.slotsCount(params),
    queryFn: () => appointmentService.getSlotsCount(params),
    enabled: !!params.date,
  });
}

export interface AvailabilityInfo {
  isAvailable: boolean;
  stock: number;
  isLowStock: boolean;
  isOutOfStock: boolean;
  restockDate?: string;
  estimatedRestockDays?: number;
  canBackorder: boolean;
  canNotify: boolean;
  maxQuantity: number;
  minQuantity: number;
}

export interface StockLocation {
  locationId: string;
  locationName: string;
  stock: number;
  isAvailable: boolean;
  distance?: number;
}

export interface NotificationRequest {
  productId: string;
  email: string;
  notifyOnRestock?: boolean;
  notifyOnPriceDrop?: boolean;
}

export interface UseAvailabilityOptions {
  productId: string;
  variantId?: string;
  quantity?: number;
  lowStockThreshold?: number;
  checkInterval?: number;
  enableLocationCheck?: boolean;
  userLocation?: {
    latitude: number;
    longitude: number;
  };
}

export interface UseAvailabilityReturn {
  availability: AvailabilityInfo;
  isLoading: boolean;
  isChecking: boolean;
  error: string | null;
  locations: StockLocation[];
  nearestLocation: StockLocation | null;
  canAddToCart: boolean;
  getMaxQuantityAllowed: (requestedQuantity: number) => number;
  validateQuantity: (quantity: number) => { isValid: boolean; message?: string };
  isNotificationRegistered: boolean;
  registerNotification: (email: string, options?: Partial<NotificationRequest>) => Promise<void>;
  unregisterNotification: () => Promise<void>;
  refresh: () => Promise<void>;
  checkAvailability: (quantity?: number) => Promise<boolean>;
  getAvailabilityMessage: () => string;
  getStockBadge: () => { text: string; variant: "success" | "warning" | "error" | "info" };
  getEstimatedDelivery: () => string | null;
}

const DEFAULT_LOW_STOCK_THRESHOLD = 5;
const DEFAULT_CHECK_INTERVAL = 60000;
const DEFAULT_MIN_QUANTITY = 1;

export const useAvailability = (options: UseAvailabilityOptions): UseAvailabilityReturn => {
  const {
    productId,
    variantId,
    quantity = 1,
    lowStockThreshold = DEFAULT_LOW_STOCK_THRESHOLD,
    checkInterval = DEFAULT_CHECK_INTERVAL,
    enableLocationCheck = false,
  } = options;

  const [availability, setAvailability] = useState<AvailabilityInfo>({
    isAvailable: false,
    stock: 0,
    isLowStock: false,
    isOutOfStock: true,
    canBackorder: false,
    canNotify: true,
    maxQuantity: 0,
    minQuantity: DEFAULT_MIN_QUANTITY,
  });

  const [locations, setLocations] = useState<StockLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isNotificationRegistered, setIsNotificationRegistered] = useState(false);

  const fetchAvailability = useCallback(
    async (showLoading = true) => {
      try {
        if (showLoading) setIsLoading(true);
        else setIsChecking(true);
        setError(null);

        const params = new URLSearchParams({
          productId,
          ...(variantId && { variantId }),
          ...(quantity && { quantity: quantity.toString() }),
        });

        const response = await fetch(`/api/products/availability?${params}`);
        if (!response.ok) throw new Error("Failed to fetch availability");

        const data = await response.json();
        const isOutOfStock = data.stock <= 0;
        const isLowStock = !isOutOfStock && data.stock <= lowStockThreshold;
        const isAvailable = data.stock > 0 || data.canBackorder;

        setAvailability({
          isAvailable,
          stock: data.stock,
          isLowStock,
          isOutOfStock,
          restockDate: data.restockDate,
          estimatedRestockDays: data.estimatedRestockDays,
          canBackorder: data.canBackorder || false,
          canNotify: data.canNotify !== false,
          maxQuantity: data.maxQuantity || data.stock,
          minQuantity: data.minQuantity || DEFAULT_MIN_QUANTITY,
        });

        if (enableLocationCheck && data.locations) setLocations(data.locations);
        if (data.notificationRegistered) setIsNotificationRegistered(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to check availability");
        console.error("Error fetching availability:", err);
      } finally {
        setIsLoading(false);
        setIsChecking(false);
      }
    },
    [productId, variantId, quantity, lowStockThreshold, enableLocationCheck]
  );

  const refresh = useCallback(async () => {
    await fetchAvailability(false);
  }, [fetchAvailability]);

  const checkAvailability = useCallback(
    async (checkQuantity?: number): Promise<boolean> => {
      const qty = checkQuantity || quantity;
      if (availability.isOutOfStock && !availability.canBackorder) return false;
      if (qty > availability.stock && !availability.canBackorder) return false;
      if (qty < availability.minQuantity || qty > availability.maxQuantity) return false;
      return true;
    },
    [quantity, availability]
  );

  const getMaxQuantityAllowed = useCallback(
    (requestedQuantity: number): number => {
      if (availability.canBackorder) return Math.min(requestedQuantity, availability.maxQuantity);
      return Math.min(requestedQuantity, availability.stock, availability.maxQuantity);
    },
    [availability]
  );

  const validateQuantity = useCallback(
    (qty: number): { isValid: boolean; message?: string } => {
      if (qty < availability.minQuantity)
        return { isValid: false, message: `Minimum quantity is ${availability.minQuantity}` };
      if (qty > availability.maxQuantity)
        return { isValid: false, message: `Maximum quantity is ${availability.maxQuantity}` };
      if (!availability.canBackorder && qty > availability.stock)
        return { isValid: false, message: `Only ${availability.stock} items available in stock` };
      return { isValid: true };
    },
    [availability]
  );

  const registerNotification = useCallback(
    async (email: string, options: Partial<NotificationRequest> = {}) => {
      const response = await fetch("/api/products/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          variantId,
          email,
          notifyOnRestock: options.notifyOnRestock !== false,
          notifyOnPriceDrop: options.notifyOnPriceDrop || false,
        }),
      });
      if (!response.ok) throw new Error("Failed to register notification");
      setIsNotificationRegistered(true);
    },
    [productId, variantId]
  );

  const unregisterNotification = useCallback(async () => {
    const response = await fetch("/api/products/notify", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, variantId }),
    });
    if (!response.ok) throw new Error("Failed to unregister notification");
    setIsNotificationRegistered(false);
  }, [productId, variantId]);

  const getAvailabilityMessage = useCallback((): string => {
    if (availability.isOutOfStock) {
      if (availability.canBackorder) return "Out of stock - Available for backorder";
      if (availability.restockDate)
        return `Out of stock - Expected back on ${new Date(availability.restockDate).toLocaleDateString()}`;
      if (availability.estimatedRestockDays)
        return `Out of stock - Expected back in ${availability.estimatedRestockDays} days`;
      return "Currently out of stock";
    }
    if (availability.isLowStock) return `Only ${availability.stock} left in stock - Order soon`;
    if (availability.stock <= 10) return `${availability.stock} in stock`;
    return "In stock";
  }, [availability]);

  const getStockBadge = useCallback((): {
    text: string;
    variant: "success" | "warning" | "error" | "info";
  } => {
    if (availability.isOutOfStock) return { text: "Out of Stock", variant: "error" };
    if (availability.isLowStock) return { text: "Low Stock", variant: "warning" };
    return { text: "In Stock", variant: "success" };
  }, [availability]);

  const getEstimatedDelivery = useCallback((): string | null => {
    if (availability.isOutOfStock && !availability.canBackorder) return null;
    const today = new Date();
    const deliveryDate = new Date(today);
    if (availability.canBackorder && availability.estimatedRestockDays) {
      deliveryDate.setDate(today.getDate() + availability.estimatedRestockDays + 3);
    } else {
      deliveryDate.setDate(today.getDate() + 3);
    }
    return deliveryDate.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  }, [availability]);

  const nearestLocation =
    locations.length > 0
      ? locations.reduce((nearest, current) => {
          if (!nearest) return current;
          if (!current.distance || !nearest.distance) return nearest;
          return current.distance < nearest.distance ? current : nearest;
        }, locations[0])
      : null;

  const canAddToCart =
    availability.isAvailable && (availability.stock >= quantity || availability.canBackorder);

  useEffect(() => {
    fetchAvailability(true);
  }, [fetchAvailability]);

  useEffect(() => {
    if (!checkInterval || checkInterval <= 0) return;
    const intervalId = setInterval(() => refresh(), checkInterval);
    return () => clearInterval(intervalId);
  }, [checkInterval, refresh]);

  return {
    availability,
    isLoading,
    isChecking,
    error,
    locations,
    nearestLocation,
    canAddToCart,
    getMaxQuantityAllowed,
    validateQuantity,
    isNotificationRegistered,
    registerNotification,
    unregisterNotification,
    refresh,
    checkAvailability,
    getAvailabilityMessage,
    getStockBadge,
    getEstimatedDelivery,
  };
};