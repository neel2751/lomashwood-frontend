import { useState, useEffect, useCallback } from 'react';

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
  // Availability Info
  availability: AvailabilityInfo;
  
  // Loading States
  isLoading: boolean;
  isChecking: boolean;
  
  // Error State
  error: string | null;
  
  // Stock Locations
  locations: StockLocation[];
  nearestLocation: StockLocation | null;
  
  // Quantity Management
  canAddToCart: boolean;
  getMaxQuantityAllowed: (requestedQuantity: number) => number;
  validateQuantity: (quantity: number) => {
    isValid: boolean;
    message?: string;
  };
  
  // Notifications
  isNotificationRegistered: boolean;
  registerNotification: (email: string, options?: Partial<NotificationRequest>) => Promise<void>;
  unregisterNotification: () => Promise<void>;
  
  // Actions
  refresh: () => Promise<void>;
  checkAvailability: (quantity?: number) => Promise<boolean>;
  
  // Utilities
  getAvailabilityMessage: () => string;
  getStockBadge: () => {
    text: string;
    variant: 'success' | 'warning' | 'error' | 'info';
  };
  getEstimatedDelivery: () => string | null;
}

const DEFAULT_LOW_STOCK_THRESHOLD = 5;
const DEFAULT_CHECK_INTERVAL = 60000; // 1 minute
const DEFAULT_MIN_QUANTITY = 1;

export const useAvailability = (
  options: UseAvailabilityOptions
): UseAvailabilityReturn => {
  const {
    productId,
    variantId,
    quantity = 1,
    lowStockThreshold = DEFAULT_LOW_STOCK_THRESHOLD,
    checkInterval = DEFAULT_CHECK_INTERVAL,
    enableLocationCheck = false,
  } = options;

  // State
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

  // Fetch availability from API
  const fetchAvailability = useCallback(
    async (showLoading = true) => {
      try {
        if (showLoading) {
          setIsLoading(true);
        } else {
          setIsChecking(true);
        }
        
        setError(null);

        const params = new URLSearchParams({
          productId,
          ...(variantId && { variantId }),
          ...(quantity && { quantity: quantity.toString() }),
        });

        const response = await fetch(`/api/products/availability?${params}`);

        if (!response.ok) {
          throw new Error('Failed to fetch availability');
        }

        const data = await response.json();

        // Calculate availability info
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

        // Set locations if enabled
        if (enableLocationCheck && data.locations) {
          setLocations(data.locations);
        }

        // Check if notification is already registered
        if (data.notificationRegistered) {
          setIsNotificationRegistered(true);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to check availability'
        );
        console.error('Error fetching availability:', err);
      } finally {
        setIsLoading(false);
        setIsChecking(false);
      }
    },
    [productId, variantId, quantity, lowStockThreshold, enableLocationCheck]
  );

  // Refresh availability
  const refresh = useCallback(async () => {
    await fetchAvailability(false);
  }, [fetchAvailability]);

  // Check availability for specific quantity
  const checkAvailability = useCallback(
    async (checkQuantity?: number): Promise<boolean> => {
      const qty = checkQuantity || quantity;
      
      if (availability.isOutOfStock && !availability.canBackorder) {
        return false;
      }

      if (qty > availability.stock && !availability.canBackorder) {
        return false;
      }

      if (qty < availability.minQuantity || qty > availability.maxQuantity) {
        return false;
      }

      return true;
    },
    [quantity, availability]
  );

  // Get max quantity allowed
  const getMaxQuantityAllowed = useCallback(
    (requestedQuantity: number): number => {
      if (availability.canBackorder) {
        return Math.min(requestedQuantity, availability.maxQuantity);
      }

      return Math.min(requestedQuantity, availability.stock, availability.maxQuantity);
    },
    [availability]
  );

  // Validate quantity
  const validateQuantity = useCallback(
    (qty: number): { isValid: boolean; message?: string } => {
      if (qty < availability.minQuantity) {
        return {
          isValid: false,
          message: `Minimum quantity is ${availability.minQuantity}`,
        };
      }

      if (qty > availability.maxQuantity) {
        return {
          isValid: false,
          message: `Maximum quantity is ${availability.maxQuantity}`,
        };
      }

      if (!availability.canBackorder && qty > availability.stock) {
        return {
          isValid: false,
          message: `Only ${availability.stock} items available in stock`,
        };
      }

      return { isValid: true };
    },
    [availability]
  );

  // Register for stock notification
  const registerNotification = useCallback(
    async (
      email: string,
      options: Partial<NotificationRequest> = {}
    ) => {
      try {
        const response = await fetch('/api/products/notify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId,
            variantId,
            email,
            notifyOnRestock: options.notifyOnRestock !== false,
            notifyOnPriceDrop: options.notifyOnPriceDrop || false,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to register notification');
        }

        setIsNotificationRegistered(true);
      } catch (err) {
        throw err;
      }
    },
    [productId, variantId]
  );

  // Unregister notification
  const unregisterNotification = useCallback(async () => {
    try {
      const response = await fetch('/api/products/notify', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          variantId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to unregister notification');
      }

      setIsNotificationRegistered(false);
    } catch (err) {
      throw err;
    }
  }, [productId, variantId]);

  // Get availability message
  const getAvailabilityMessage = useCallback((): string => {
    if (availability.isOutOfStock) {
      if (availability.canBackorder) {
        return 'Out of stock - Available for backorder';
      }
      
      if (availability.restockDate) {
        return `Out of stock - Expected back on ${new Date(
          availability.restockDate
        ).toLocaleDateString()}`;
      }

      if (availability.estimatedRestockDays) {
        return `Out of stock - Expected back in ${availability.estimatedRestockDays} days`;
      }

      return 'Currently out of stock';
    }

    if (availability.isLowStock) {
      return `Only ${availability.stock} left in stock - Order soon`;
    }

    if (availability.stock <= 10) {
      return `${availability.stock} in stock`;
    }

    return 'In stock';
  }, [availability]);

  // Get stock badge
  const getStockBadge = useCallback((): {
    text: string;
    variant: 'success' | 'warning' | 'error' | 'info';
  } => {
    if (availability.isOutOfStock) {
      return { text: 'Out of Stock', variant: 'error' };
    }

    if (availability.isLowStock) {
      return { text: 'Low Stock', variant: 'warning' };
    }

    return { text: 'In Stock', variant: 'success' };
  }, [availability]);

  // Get estimated delivery
  const getEstimatedDelivery = useCallback((): string | null => {
    if (availability.isOutOfStock && !availability.canBackorder) {
      return null;
    }

    // Calculate delivery date (this is a simple example)
    const today = new Date();
    const deliveryDate = new Date(today);
    
    if (availability.canBackorder && availability.estimatedRestockDays) {
      deliveryDate.setDate(today.getDate() + availability.estimatedRestockDays + 3);
    } else {
      deliveryDate.setDate(today.getDate() + 3); // Standard 3-day delivery
    }

    return deliveryDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  }, [availability]);

  // Find nearest location
  const nearestLocation = locations.length > 0
    ? locations.reduce((nearest, current) => {
        if (!nearest) return current;
        if (!current.distance || !nearest.distance) return nearest;
        return current.distance < nearest.distance ? current : nearest;
      }, locations[0])
    : null;

  // Can add to cart
  const canAddToCart = availability.isAvailable && (
    availability.stock >= quantity || availability.canBackorder
  );

  // Initial fetch
  useEffect(() => {
    fetchAvailability(true);
  }, [fetchAvailability]);

  // Auto-refresh availability at intervals
  useEffect(() => {
    if (!checkInterval || checkInterval <= 0) return;

    const intervalId = setInterval(() => {
      refresh();
    }, checkInterval);

    return () => clearInterval(intervalId);
  }, [checkInterval, refresh]);

  return {
    // Availability Info
    availability,

    // Loading States
    isLoading,
    isChecking,

    // Error State
    error,

    // Stock Locations
    locations,
    nearestLocation,

    // Quantity Management
    canAddToCart,
    getMaxQuantityAllowed,
    validateQuantity,

    // Notifications
    isNotificationRegistered,
    registerNotification,
    unregisterNotification,

    // Actions
    refresh,
    checkAvailability,

    // Utilities
    getAvailabilityMessage,
    getStockBadge,
    getEstimatedDelivery,
  };
};