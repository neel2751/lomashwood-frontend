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
  isMobileMenuOpen: boolean;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;

  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;

  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;

  modal: ModalState;
  openModal: (type: ModalState['type'], data?: any) => void;
  closeModal: () => void;

  isLoading: boolean;
  loadingMessage: string;
  setLoading: (isLoading: boolean, message?: string) => void;

  isPageLoading: boolean;
  setPageLoading: (isLoading: boolean) => void;

  notifications: Notification[];
  addNotification: (
    type: NotificationType,
    message: string,
    title?: string,
    duration?: number
  ) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;

  isScrolled: boolean;
  setScrolled: (isScrolled: boolean) => void;
  scrollDirection: 'up' | 'down' | null;
  setScrollDirection: (direction: 'up' | 'down' | null) => void;

  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleTheme: () => void;

  quickViewProductId: string | null;
  openQuickView: (productId: string) => void;
  closeQuickView: () => void;

  isComparisonMode: boolean;
  comparisonItems: string[];
  toggleComparisonMode: () => void;
  addToComparison: (productId: string) => void;
  removeFromComparison: (productId: string) => void;
  clearComparison: () => void;

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

      openMobileMenu: () => set({ isMobileMenuOpen: true }),
      closeMobileMenu: () => set({ isMobileMenuOpen: false }),
      toggleMobileMenu: () => set({ isMobileMenuOpen: !get().isMobileMenuOpen }),

      openSearch: () => set({ isSearchOpen: true }),
      closeSearch: () => set({ isSearchOpen: false }),
      toggleSearch: () => set({ isSearchOpen: !get().isSearchOpen }),

      openSidebar: () => set({ isSidebarOpen: true }),
      closeSidebar: () => set({ isSidebarOpen: false }),
      toggleSidebar: () => set({ isSidebarOpen: !get().isSidebarOpen }),

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

      setLoading: (isLoading, message = '') => {
        set({ isLoading, loadingMessage: message });
      },

      setPageLoading: (isLoading) => {
        set({ isPageLoading: isLoading });
      },

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

      setScrolled: (isScrolled) => {
        set({ isScrolled });
      },

      setScrollDirection: (direction) => {
        set({ scrollDirection: direction });
      },

      setTheme: (theme) => {
        set({ theme });
      },

      toggleTheme: () => {
        const currentTheme = get().theme;
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        set({ theme: newTheme });
      },

      openQuickView: (productId) => {
        set({ quickViewProductId: productId });
        get().openModal('quick-view', { productId });
      },

      closeQuickView: () => {
        set({ quickViewProductId: null });
        get().closeModal();
      },

      toggleComparisonMode: () => {
        const isComparisonMode = !get().isComparisonMode;
        set({ isComparisonMode });

        if (!isComparisonMode) {
          set({ comparisonItems: [] });
        }
      },

      addToComparison: (productId) => {
        const items = get().comparisonItems;

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
          theme: get().theme,
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