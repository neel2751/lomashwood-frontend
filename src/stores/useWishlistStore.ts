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
  addedAt: number;
}

interface WishlistStore {
  items: WishlistItem[];
  isOpen: boolean;

  addItem: (item: Omit<WishlistItem, 'addedAt'>) => void;
  removeItem: (id: string) => void;
  toggleItem: (item: Omit<WishlistItem, 'addedAt'>) => void;
  clearWishlist: () => void;
  moveToCart?: (id: string) => void;

  openWishlist: () => void;
  closeWishlist: () => void;
  toggleWishlist: () => void;

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

      addItem: (item) => {
        const existingItem = get().items.find((i) => i.id === item.id);

        if (!existingItem) {
          set({
            items: [...get().items, { ...item, addedAt: Date.now() }],
          });
        }
      },

      removeItem: (id) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        });
      },

      toggleItem: (item) => {
        const existingItem = get().items.find((i) => i.id === item.id);

        if (existingItem) {
          get().removeItem(item.id);
        } else {
          get().addItem(item);
        }
      },

      clearWishlist: () => {
        set({ items: [] });
      },

      moveToCart: (id) => {

        get().removeItem(id);
      },

      openWishlist: () => {
        set({ isOpen: true });
      },

      closeWishlist: () => {
        set({ isOpen: false });
      },

      toggleWishlist: () => {
        set({ isOpen: !get().isOpen });
      },

      getTotalItems: () => {
        return get().items.length;
      },

      getItemById: (id) => {
        return get().items.find((item) => item.id === id);
      },

      isItemInWishlist: (id) => {
        return get().items.some((item) => item.id === id);
      },

      getItemsByCategory: (category) => {
        return get().items.filter((item) => item.category === category);
      },

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