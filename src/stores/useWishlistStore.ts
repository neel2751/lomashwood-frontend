import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  category?: string;
  wood_type?: string;
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
    thickness?: number;
  };
  stock?: number;
  inStock?: boolean;
  addedAt: number; // Timestamp when item was added
}

interface WishlistStore {
  items: WishlistItem[];
  isOpen: boolean;

  // Wishlist Actions
  addItem: (item: Omit<WishlistItem, 'addedAt'>) => void;
  removeItem: (id: string) => void;
  toggleItem: (item: Omit<WishlistItem, 'addedAt'>) => void;
  clearWishlist: () => void;
  moveToCart?: (id: string) => void;

  // Wishlist UI Actions
  openWishlist: () => void;
  closeWishlist: () => void;
  toggleWishlist: () => void;

  // Computed Values
  getTotalItems: () => number;
  getItemById: (id: string) => WishlistItem | undefined;
  isItemInWishlist: (id: string) => boolean;
  getItemsByCategory: (category: string) => WishlistItem[];
  getSortedItems: (sortBy?: 'newest' | 'oldest' | 'price-asc' | 'price-desc') => WishlistItem[];
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      // Add item to wishlist
      addItem: (item) => {
        const existingItem = get().items.find((i) => i.id === item.id);

        if (!existingItem) {
          set({
            items: [...get().items, { ...item, addedAt: Date.now() }],
          });
        }
      },

      // Remove item from wishlist
      removeItem: (id) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        });
      },

      // Toggle item in wishlist (add if not present, remove if present)
      toggleItem: (item) => {
        const existingItem = get().items.find((i) => i.id === item.id);

        if (existingItem) {
          get().removeItem(item.id);
        } else {
          get().addItem(item);
        }
      },

      // Clear all items from wishlist
      clearWishlist: () => {
        set({ items: [] });
      },

      // Move item to cart (optional - can be implemented with cart integration)
      moveToCart: (id) => {
        // This can be implemented when integrating with cart
        // For now, just remove from wishlist
        get().removeItem(id);
      },

      // Open wishlist sidebar/modal
      openWishlist: () => {
        set({ isOpen: true });
      },

      // Close wishlist sidebar/modal
      closeWishlist: () => {
        set({ isOpen: false });
      },

      // Toggle wishlist sidebar/modal
      toggleWishlist: () => {
        set({ isOpen: !get().isOpen });
      },

      // Get total number of items in wishlist
      getTotalItems: () => {
        return get().items.length;
      },

      // Get item by ID
      getItemById: (id) => {
        return get().items.find((item) => item.id === id);
      },

      // Check if item is in wishlist
      isItemInWishlist: (id) => {
        return get().items.some((item) => item.id === id);
      },

      // Get items by category
      getItemsByCategory: (category) => {
        return get().items.filter((item) => item.category === category);
      },

      // Get sorted items
      getSortedItems: (sortBy = 'newest') => {
        const items = [...get().items];

        switch (sortBy) {
          case 'newest':
            return items.sort((a, b) => b.addedAt - a.addedAt);
          case 'oldest':
            return items.sort((a, b) => a.addedAt - b.addedAt);
          case 'price-asc':
            return items.sort((a, b) => a.price - b.price);
          case 'price-desc':
            return items.sort((a, b) => b.price - a.price);
          default:
            return items;
        }
      },
    }),
    {
      name: 'lomash-wishlist-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
);