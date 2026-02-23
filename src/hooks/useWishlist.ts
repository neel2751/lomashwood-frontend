import { useCallback } from 'react';
import toast from 'react-hot-toast';

import { useCartStore } from '@/stores/useCartStore';
import { useWishlistStore, type WishlistItem } from '@/stores/useWishlistStore';

export interface UseWishlistOptions {
  showToast?: boolean;
  autoOpenWishlist?: boolean;
}

export interface UseWishlistReturn {
  items: WishlistItem[];
  totalItems: number;
  isEmpty: boolean;

  isOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;
  toggleWishlist: () => void;

  addItem: (item: Omit<WishlistItem, 'addedAt'>) => void;
  removeItem: (id: string) => void;
  toggleItem: (item: Omit<WishlistItem, 'addedAt'>) => void;
  clearWishlist: () => void;
  isInWishlist: (id: string) => boolean;
  getItem: (id: string) => WishlistItem | undefined;

  moveToCart: (id: string) => void;
  moveAllToCart: () => void;

  getItemsByCategory: (category: string) => WishlistItem[];
  getSortedItems: (sortBy?: 'newest' | 'oldest' | 'price-asc' | 'price-desc') => WishlistItem[];
  getAvailableItems: () => WishlistItem[];
  getUnavailableItems: () => WishlistItem[];

  getTotalValue: () => number;
  getAveragePrice: () => number;
  getCategories: () => string[];
  hasAvailableItems: boolean;
  hasUnavailableItems: boolean;

  getShareableLink: () => string;
  exportToJson: () => string;
}

export const useWishlist = (
  options: UseWishlistOptions = {}
): UseWishlistReturn => {
  const { showToast = true, autoOpenWishlist = false } = options;

  const {
    items,
    isOpen,
    addItem: addToWishlistStore,
    removeItem: removeFromWishlistStore,
    toggleItem: toggleItemStore,
    clearWishlist: clearWishlistStore,
    openWishlist: openWishlistStore,
    closeWishlist: closeWishlistStore,
    toggleWishlist: toggleWishlistStore,
    getTotalItems,
    getItemById,
    isItemInWishlist,
    getItemsByCategory: getItemsByCategoryStore,
    getSortedItems: getSortedItemsStore,
  } = useWishlistStore();

  const { addItem: addToCart } = useCartStore();

  const addItem = useCallback(
    (item: Omit<WishlistItem, 'addedAt'>) => {
      addToWishlistStore(item);

      if (showToast) {
        toast.success(`${item.name} added to wishlist`, {
          icon: '♥',
          duration: 2000,
        });
      }

      if (autoOpenWishlist) {
        openWishlistStore();
      }
    },
    [addToWishlistStore, showToast, autoOpenWishlist, openWishlistStore]
  );

  const removeItem = useCallback(
    (id: string) => {
      const item = getItemById(id);
      removeFromWishlistStore(id);

      if (showToast && item) {
        toast.success(`${item.name} removed from wishlist`, {
          duration: 2000,
        });
      }
    },
    [removeFromWishlistStore, getItemById, showToast]
  );

  const toggleItem = useCallback(
    (item: Omit<WishlistItem, 'addedAt'>) => {
      const isCurrentlyInWishlist = isItemInWishlist(item.id);
      toggleItemStore(item);

      if (showToast) {
        if (isCurrentlyInWishlist) {
          toast.success(`${item.name} removed from wishlist`, {
            duration: 2000,
          });
        } else {
          toast.success(`${item.name} added to wishlist`, {
            icon: '♥',
            duration: 2000,
          });
        }
      }

      if (!isCurrentlyInWishlist && autoOpenWishlist) {
        openWishlistStore();
      }
    },
    [
      toggleItemStore,
      isItemInWishlist,
      showToast,
      autoOpenWishlist,
      openWishlistStore,
    ]
  );

  const clearWishlist = useCallback(() => {
    const itemCount = getTotalItems();
    clearWishlistStore();

    if (showToast) {
      toast.success(`Cleared ${itemCount} items from wishlist`, {
        duration: 2000,
      });
    }
  }, [clearWishlistStore, getTotalItems, showToast]);

  const moveToCart = useCallback(
    (id: string) => {
      const item = getItemById(id);
      
      if (!item) {
        if (showToast) {
          toast.error('Item not found in wishlist');
        }
        return;
      }

      if (!item.inStock) {
        if (showToast) {
          toast.error(`${item.name} is currently out of stock`);
        }
        return;
      }

      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.category,
        wood_type: item.wood_type,
        dimensions: item.dimensions,
        stock: item.stock,
      });

      removeFromWishlistStore(id);

      if (showToast) {
        toast.success(`${item.name} moved to cart`, {
          icon: '🛒',
          duration: 2000,
        });
      }
    },
    [getItemById, addToCart, removeFromWishlistStore, showToast]
  );

  const moveAllToCart = useCallback(() => {
    const availableItems = items.filter((item) => item.inStock);

    if (availableItems.length === 0) {
      if (showToast) {
        toast.error('No items available to move to cart');
      }
      return;
    }

    availableItems.forEach((item) => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.category,
        wood_type: item.wood_type,
        dimensions: item.dimensions,
        stock: item.stock,
      });

      removeFromWishlistStore(item.id);
    });

    if (showToast) {
      toast.success(`Moved ${availableItems.length} items to cart`, {
        icon: '🛒',
        duration: 2000,
      });
    }
  }, [items, addToCart, removeFromWishlistStore, showToast]);

  const getItemsByCategory = useCallback(
    (category: string) => {
      return getItemsByCategoryStore(category);
    },
    [getItemsByCategoryStore]
  );

  const getSortedItems = useCallback(
    (sortBy?: 'newest' | 'oldest' | 'price-asc' | 'price-desc') => {
      return getSortedItemsStore(sortBy);
    },
    [getSortedItemsStore]
  );

  const getAvailableItems = useCallback(() => {
    return items.filter((item) => item.inStock);
  }, [items]);

  const getUnavailableItems = useCallback(() => {
    return items.filter((item) => !item.inStock);
  }, [items]);

  const getTotalValue = useCallback(() => {
    return items.reduce((total, item) => total + item.price, 0);
  }, [items]);

  const getAveragePrice = useCallback(() => {
    if (items.length === 0) return 0;
    return getTotalValue() / items.length;
  }, [items, getTotalValue]);

  const getCategories = useCallback(() => {
    const categories = items
      .map((item) => item.category)
      .filter((category): category is string => Boolean(category));
    return Array.from(new Set(categories));
  }, [items]);

  const getShareableLink = useCallback(() => {
    if (typeof window === 'undefined') return '';
    
    const itemIds = items.map((item) => item.id).join(',');
    const baseUrl = window.location.origin;
    return `${baseUrl}/wishlist/share?items=${itemIds}`;
  }, [items]);

  const exportToJson = useCallback(() => {
    return JSON.stringify(
      {
        items,
        totalItems: items.length,
        totalValue: getTotalValue(),
        exportedAt: new Date().toISOString(),
      },
      null,
      2
    );
  }, [items, getTotalValue]);

  const totalItems = getTotalItems();
  const isEmpty = totalItems === 0;
  const hasAvailableItems = items.some((item) => item.inStock);
  const hasUnavailableItems = items.some((item) => !item.inStock);

  return {

    items,
    totalItems,
    isEmpty,

    isOpen,
    openWishlist: openWishlistStore,
    closeWishlist: closeWishlistStore,
    toggleWishlist: toggleWishlistStore,

    addItem,
    removeItem,
    toggleItem,
    clearWishlist,
    isInWishlist: isItemInWishlist,
    getItem: getItemById,

    moveToCart,
    moveAllToCart,

    getItemsByCategory,
    getSortedItems,
    getAvailableItems,
    getUnavailableItems,

    getTotalValue,
    getAveragePrice,
    getCategories,
    hasAvailableItems,
    hasUnavailableItems,

    getShareableLink,
    exportToJson,
  };
};