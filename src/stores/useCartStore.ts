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
  
  // Cart Actions
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  
  // Cart UI Actions
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  
  // Computed Values
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

      // Add item to cart or update quantity if already exists
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

      // Remove item from cart
      removeItem: (id) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        });
      },

      // Update item quantity
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

      // Clear all items from cart
      clearCart: () => {
        set({ items: [] });
      },

      // Open cart sidebar/modal
      openCart: () => {
        set({ isOpen: true });
      },

      // Close cart sidebar/modal
      closeCart: () => {
        set({ isOpen: false });
      },

      // Toggle cart sidebar/modal
      toggleCart: () => {
        set({ isOpen: !get().isOpen });
      },

      // Get total number of items in cart
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      // Get total price of all items in cart
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      // Get item by ID
      getItemById: (id) => {
        return get().items.find((item) => item.id === id);
      },

      // Check if item is in cart
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