import { useCallback} from 'react';
import toast from 'react-hot-toast';

import { useCartStore, type CartItem } from '@/stores/useCartStore';
import { useWishlistStore } from '@/stores/useWishlistStore';

export interface UseCartOptions {
  showToast?: boolean;
  autoOpenCart?: boolean;
  maxQuantityPerItem?: number;
}

export interface CartSummary {
  subtotal: number;
  tax: number;
  taxRate: number;
  shipping: number;
  discount: number;
  total: number;
  totalItems: number;
  totalQuantity: number;
}

export interface CouponResult {
  isValid: boolean;
  discountAmount: number;
  discountPercentage?: number;
  message?: string;
}

export interface UseCartReturn {
  items: CartItem[];
  totalItems: number;
  totalQuantity: number;
  isEmpty: boolean;

  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
  getItem: (id: string) => CartItem | undefined;

  moveToWishlist: (id: string) => void;
  saveForLater: (id: string) => void;

  getSubtotal: () => number;
  getTax: (taxRate?: number) => number;
  getShipping: (items?: CartItem[]) => number;
  getTotal: (options?: { taxRate?: number; shippingCost?: number }) => number;
  getSummary: (options?: { taxRate?: number; shippingCost?: number }) => CartSummary;

  applyCoupon: (code: string) => Promise<CouponResult>;
  removeCoupon: () => void;
  currentDiscount: number;

  validateCart: () => {
    isValid: boolean;
    errors: Array<{ itemId: string; message: string }>;
  };
  validateItem: (id: string, quantity?: number) => {
    isValid: boolean;
    message?: string;
  };

  getItemCount: () => number;
  hasStockIssues: () => boolean;
  getOutOfStockItems: () => CartItem[];
  getLowStockItems: (threshold?: number) => CartItem[];
  canCheckout: boolean;
}

const DEFAULT_TAX_RATE = 0.18;
const DEFAULT_MAX_QUANTITY = 99;
const FREE_SHIPPING_THRESHOLD = 5000;
const STANDARD_SHIPPING_COST = 100;

export const useCart = (options: UseCartOptions = {}): UseCartReturn => {
  const {
    showToast = true,
    autoOpenCart = false,
    maxQuantityPerItem = DEFAULT_MAX_QUANTITY,
  } = options;

  const {
    items,
    isOpen,
    addItem: addToCartStore,
    removeItem: removeFromCartStore,
    updateQuantity: updateQuantityStore,
    clearCart: clearCartStore,
    openCart: openCartStore,
    closeCart: closeCartStore,
    toggleCart: toggleCartStore,
    getTotalItems,
    getTotalPrice,
    getItemById,
    isItemInCart,
  } = useCartStore();

  const { addItem: addToWishlist } = useWishlistStore();

  const currentDiscount = 0;

  const addItem = useCallback(
    (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
      const quantity = item.quantity || 1;
      const existingItem = getItemById(item.id);

      if (item.stock !== undefined) {
        const newQuantity = existingItem
          ? existingItem.quantity + quantity
          : quantity;

        if (newQuantity > item.stock) {
          if (showToast) {
            toast.error(
              `Cannot add more. Only ${item.stock} items available in stock`
            );
          }
          return;
        }
      }

      if (existingItem && existingItem.quantity + quantity > maxQuantityPerItem) {
        if (showToast) {
          toast.error(`Maximum ${maxQuantityPerItem} items allowed per product`);
        }
        return;
      }

      addToCartStore(item);

      if (showToast) {
        toast.success(`${item.name} added to cart`, {
          icon: '🛒',
          duration: 2000,
        });
      }

      if (autoOpenCart) {
        openCartStore();
      }
    },
    [
      addToCartStore,
      getItemById,
      showToast,
      autoOpenCart,
      openCartStore,
      maxQuantityPerItem,
    ]
  );

  const removeItem = useCallback(
    (id: string) => {
      const item = getItemById(id);
      removeFromCartStore(id);

      if (showToast && item) {
        toast.success(`${item.name} removed from cart`, {
          duration: 2000,
        });
      }
    },
    [removeFromCartStore, getItemById, showToast]
  );

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      const item = getItemById(id);

      if (!item) return;

      if (quantity < 1) {
        removeItem(id);
        return;
      }

      if (quantity > maxQuantityPerItem) {
        if (showToast) {
          toast.error(`Maximum ${maxQuantityPerItem} items allowed`);
        }
        return;
      }

      if (item.stock !== undefined && quantity > item.stock) {
        if (showToast) {
          toast.error(`Only ${item.stock} items available in stock`);
        }
        return;
      }

      updateQuantityStore(id, quantity);
    },
    [getItemById, updateQuantityStore, removeItem, maxQuantityPerItem, showToast]
  );

  const incrementQuantity = useCallback(
    (id: string) => {
      const item = getItemById(id);
      if (item) {
        updateQuantity(id, item.quantity + 1);
      }
    },
    [getItemById, updateQuantity]
  );

  const decrementQuantity = useCallback(
    (id: string) => {
      const item = getItemById(id);
      if (item) {
        updateQuantity(id, item.quantity - 1);
      }
    },
    [getItemById, updateQuantity]
  );

  const clearCart = useCallback(() => {
    const itemCount = getTotalItems();
    clearCartStore();

    if (showToast) {
      toast.success(`Cleared ${itemCount} items from cart`, {
        duration: 2000,
      });
    }
  }, [clearCartStore, getTotalItems, showToast]);

  const moveToWishlist = useCallback(
    (id: string) => {
      const item = getItemById(id);

      if (!item) {
        if (showToast) {
          toast.error('Item not found in cart');
        }
        return;
      }

      addToWishlist({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.category,
        wood_type: item.wood_type,
        dimensions: item.dimensions,
        stock: item.stock,
        inStock: (item.stock || 0) > 0,
      });

      removeFromCartStore(id);

      if (showToast) {
        toast.success(`${item.name} moved to wishlist`, {
          icon: '♥',
          duration: 2000,
        });
      }
    },
    [getItemById, addToWishlist, removeFromCartStore, showToast]
  );

  const saveForLater = useCallback(
    (id: string) => {
      moveToWishlist(id);
    },
    [moveToWishlist]
  );

  const getSubtotal = useCallback(() => {
    return getTotalPrice();
  }, [getTotalPrice]);

  const getTax = useCallback(
    (taxRate: number = DEFAULT_TAX_RATE) => {
      return Math.round(getSubtotal() * taxRate);
    },
    [getSubtotal]
  );

  const getShipping = useCallback(
    (cartItems: CartItem[] = items) => {
      const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      if (subtotal >= FREE_SHIPPING_THRESHOLD) {
        return 0;
      }

      return STANDARD_SHIPPING_COST;
    },
    [items]
  );

  const getTotal = useCallback(
    (options: { taxRate?: number; shippingCost?: number } = {}) => {
      const subtotal = getSubtotal();
      const tax = getTax(options.taxRate);
      const shipping = options.shippingCost ?? getShipping();
      const discount = currentDiscount;

      return subtotal + tax + shipping - discount;
    },
    [getSubtotal, getTax, getShipping, currentDiscount]
  );

  const getSummary = useCallback(
    (options: { taxRate?: number; shippingCost?: number } = {}): CartSummary => {
      const taxRate = options.taxRate ?? DEFAULT_TAX_RATE;
      const subtotal = getSubtotal();
      const tax = getTax(taxRate);
      const shipping = options.shippingCost ?? getShipping();
      const discount = currentDiscount;
      const total = getTotal(options);

      return {
        subtotal,
        tax,
        taxRate,
        shipping,
        discount,
        total,
        totalItems: getTotalItems(),
        totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
      };
    },
    [getSubtotal, getTax, getShipping, getTotal, getTotalItems, items, currentDiscount]
  );

  const applyCoupon = useCallback(
    async (code: string): Promise<CouponResult> => {
      try {
        const response = await fetch('/api/cart/apply-coupon', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code,
            cartTotal: getSubtotal(),
            items,
          }),
        });

        if (!response.ok) {
          throw new Error('Invalid coupon code');
        }

        const data = await response.json();

        if (showToast) {
          toast.success(
            `Coupon applied! You saved ₹${data.discountAmount}`,
            {
              icon: '🎉',
              duration: 3000,
            }
          );
        }

        return {
          isValid: true,
          discountAmount: data.discountAmount,
          discountPercentage: data.discountPercentage,
          message: data.message,
        };
      } catch (error) {
        if (showToast) {
          toast.error('Invalid or expired coupon code');
        }

        return {
          isValid: false,
          discountAmount: 0,
          message: error instanceof Error ? error.message : 'Invalid coupon',
        };
      }
    },
    [getSubtotal, items, showToast]
  );

  const removeCoupon = useCallback(() => {
    if (showToast) {
      toast.success('Coupon removed');
    }
  }, [showToast]);

  const validateCart = useCallback(() => {
    const errors: Array<{ itemId: string; message: string }> = [];

    items.forEach((item) => {
      if (item.stock !== undefined && item.quantity > item.stock) {
        errors.push({
          itemId: item.id,
          message: `Only ${item.stock} items available for ${item.name}`,
        });
      }

      if (item.stock === 0) {
        errors.push({
          itemId: item.id,
          message: `${item.name} is out of stock`,
        });
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
    };
  }, [items]);

  const validateItem = useCallback(
    (id: string, quantity?: number) => {
      const item = getItemById(id);

      if (!item) {
        return {
          isValid: false,
          message: 'Item not found in cart',
        };
      }

      const qty = quantity ?? item.quantity;

      if (qty < 1) {
        return {
          isValid: false,
          message: 'Quantity must be at least 1',
        };
      }

      if (qty > maxQuantityPerItem) {
        return {
          isValid: false,
          message: `Maximum ${maxQuantityPerItem} items allowed`,
        };
      }

      if (item.stock !== undefined && qty > item.stock) {
        return {
          isValid: false,
          message: `Only ${item.stock} items available`,
        };
      }

      return {
        isValid: true,
      };
    },
    [getItemById, maxQuantityPerItem]
  );

  const getOutOfStockItems = useCallback(() => {
    return items.filter((item) => item.stock === 0);
  }, [items]);

  const getLowStockItems = useCallback(
    (threshold: number = 5) => {
      return items.filter(
        (item) => item.stock !== undefined && item.stock > 0 && item.stock <= threshold
      );
    },
    [items]
  );

  const hasStockIssues = useCallback(() => {
    return items.some(
      (item) =>
        item.stock === 0 || (item.stock !== undefined && item.quantity > item.stock)
    );
  }, [items]);

  const totalItems = getTotalItems();
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const isEmpty = totalItems === 0;
  const canCheckout = !isEmpty && !hasStockIssues();

  return {
    items,
    totalItems,
    totalQuantity,
    isEmpty,

    isOpen,
    openCart: openCartStore,
    closeCart: closeCartStore,
    toggleCart: toggleCartStore,

    addItem,
    removeItem,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    isInCart: isItemInCart,
    getItem: getItemById,

    moveToWishlist,
    saveForLater,

    getSubtotal,
    getTax,
    getShipping,
    getTotal,
    getSummary,

    applyCoupon,
    removeCoupon,
    currentDiscount,

    validateCart,
    validateItem,

    getItemCount: getTotalItems,
    hasStockIssues,
    getOutOfStockItems,
    getLowStockItems,
    canCheckout,
  };
};