import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  title?: string;
  duration?: number;
  timestamp: number;
}

export interface ModalState {
  isOpen: boolean;
  type: 
    | 'quick-view' 
    | 'auth' 
    | 'contact' 
    | 'quote' 
    | 'confirm'
    | 'image-viewer'
    | null;
  data?: any;
}

interface UIStore {
  // Mobile Menu
  isMobileMenuOpen: boolean;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;

  // Search Bar
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;

  // Sidebar/Filters
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;

  // Modal
  modal: ModalState;
  openModal: (type: ModalState['type'], data?: any) => void;
  closeModal: () => void;

  // Loading States
  isLoading: boolean;
  loadingMessage: string;
  setLoading: (isLoading: boolean, message?: string) => void;

  // Page Loading (for route transitions)
  isPageLoading: boolean;
  setPageLoading: (isLoading: boolean) => void;

  // Notifications/Toasts
  notifications: Notification[];
  addNotification: (
    type: NotificationType,
    message: string,
    title?: string,
    duration?: number
  ) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;

  // Scroll State
  isScrolled: boolean;
  setScrolled: (isScrolled: boolean) => void;
  scrollDirection: 'up' | 'down' | null;
  setScrollDirection: (direction: 'up' | 'down' | null) => void;

  // Theme (if implementing dark mode)
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleTheme: () => void;

  // Product Quick View
  quickViewProductId: string | null;
  openQuickView: (productId: string) => void;
  closeQuickView: () => void;

  // Comparison Mode
  isComparisonMode: boolean;
  comparisonItems: string[];
  toggleComparisonMode: () => void;
  addToComparison: (productId: string) => void;
  removeFromComparison: (productId: string) => void;
  clearComparison: () => void;

  // Global Actions
  closeAll: () => void;
  resetUI: () => void;
}

const initialState = {
  isMobileMenuOpen: false,
  isSearchOpen: false,
  isSidebarOpen: false,
  modal: {
    isOpen: false,
    type: null,
    data: undefined,
  } as ModalState,
  isLoading: false,
  loadingMessage: '',
  isPageLoading: false,
  notifications: [],
  isScrolled: false,
  scrollDirection: null,
  theme: 'light' as const,
  quickViewProductId: null,
  isComparisonMode: false,
  comparisonItems: [],
};

export const useUIStore = create<UIStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Mobile Menu Actions
      openMobileMenu: () => set({ isMobileMenuOpen: true }),
      closeMobileMenu: () => set({ isMobileMenuOpen: false }),
      toggleMobileMenu: () => set({ isMobileMenuOpen: !get().isMobileMenuOpen }),

      // Search Bar Actions
      openSearch: () => set({ isSearchOpen: true }),
      closeSearch: () => set({ isSearchOpen: false }),
      toggleSearch: () => set({ isSearchOpen: !get().isSearchOpen }),

      // Sidebar Actions
      openSidebar: () => set({ isSidebarOpen: true }),
      closeSidebar: () => set({ isSidebarOpen: false }),
      toggleSidebar: () => set({ isSidebarOpen: !get().isSidebarOpen }),

      // Modal Actions
      openModal: (type, data) => {
        set({
          modal: {
            isOpen: true,
            type,
            data,
          },
        });
      },
      closeModal: () => {
        set({
          modal: {
            isOpen: false,
            type: null,
            data: undefined,
          },
        });
      },

      // Loading Actions
      setLoading: (isLoading, message = '') => {
        set({ isLoading, loadingMessage: message });
      },

      setPageLoading: (isLoading) => {
        set({ isPageLoading: isLoading });
      },

      // Notification Actions
      addNotification: (type, message, title, duration = 5000) => {
        const id = `notification-${Date.now()}-${Math.random()}`;
        const notification: Notification = {
          id,
          type,
          message,
          title,
          duration,
          timestamp: Date.now(),
        };

        set({
          notifications: [...get().notifications, notification],
        });

        // Auto remove after duration
        if (duration > 0) {
          setTimeout(() => {
            get().removeNotification(id);
          }, duration);
        }
      },

      removeNotification: (id) => {
        set({
          notifications: get().notifications.filter((n) => n.id !== id),
        });
      },

      clearNotifications: () => {
        set({ notifications: [] });
      },

      // Scroll Actions
      setScrolled: (isScrolled) => {
        set({ isScrolled });
      },

      setScrollDirection: (direction) => {
        set({ scrollDirection: direction });
      },

      // Theme Actions
      setTheme: (theme) => {
        set({ theme });
      },

      toggleTheme: () => {
        const currentTheme = get().theme;
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        set({ theme: newTheme });
      },

      // Quick View Actions
      openQuickView: (productId) => {
        set({ quickViewProductId: productId });
        get().openModal('quick-view', { productId });
      },

      closeQuickView: () => {
        set({ quickViewProductId: null });
        get().closeModal();
      },

      // Comparison Actions
      toggleComparisonMode: () => {
        const isComparisonMode = !get().isComparisonMode;
        set({ isComparisonMode });
        
        // Clear comparison items when disabling comparison mode
        if (!isComparisonMode) {
          set({ comparisonItems: [] });
        }
      },

      addToComparison: (productId) => {
        const items = get().comparisonItems;
        
        // Limit to max 4 items for comparison
        if (items.length >= 4) {
          get().addNotification(
            'warning',
            'You can compare up to 4 products at a time',
            'Comparison Limit'
          );
          return;
        }

        if (!items.includes(productId)) {
          set({ comparisonItems: [...items, productId] });
        }
      },

      removeFromComparison: (productId) => {
        set({
          comparisonItems: get().comparisonItems.filter((id) => id !== productId),
        });
      },

      clearComparison: () => {
        set({ comparisonItems: [] });
      },

      // Global Actions
      closeAll: () => {
        set({
          isMobileMenuOpen: false,
          isSearchOpen: false,
          isSidebarOpen: false,
          modal: {
            isOpen: false,
            type: null,
            data: undefined,
          },
        });
      },

      resetUI: () => {
        set({
          ...initialState,
          theme: get().theme, // Keep theme preference
        });
      },
    }),
    {
      name: 'lomash-ui-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme,
        isComparisonMode: state.isComparisonMode,
        comparisonItems: state.comparisonItems,
      }),
    }
  )
);