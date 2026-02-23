import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
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
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;

  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;

  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemById: (id: string) => CartItem | undefined;
  isItemInCart: (id: string) => boolean;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        const existingItem = get().items.find((i) => i.id === item.id);
        
        if (existingItem) {
          set({
            items: get().items.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + (item.quantity || 1) }
                : i
            ),
          });
        } else {
          set({
            items: [...get().items, { ...item, quantity: item.quantity || 1 }],
          });
        }
      },

      removeItem: (id) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      toggleCart: () => {
        set({ isOpen: !get().isOpen });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getItemById: (id) => {
        return get().items.find((item) => item.id === id);
      },

      isItemInCart: (id) => {
        return get().items.some((item) => item.id === id);
      },
    }),
    {
      name: 'lomash-cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
);