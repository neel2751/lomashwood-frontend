interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  data?: Record<string, any>;
}

interface PageViewData {
  path: string;
  title: string;
  referrer?: string;
}

interface ProductViewData {
  productId: string;
  productName: string;
  category: string;
  price: number;
  variant?: string;
}

interface BookingData {
  appointmentType: string;
  service: string;
  showroom?: string;
  date?: string;
  value?: number;
}

interface SearchData {
  query: string;
  resultsCount: number;
  filters?: Record<string, any>;
}

interface UserInteractionData {
  element: string;
  action: string;
  context?: string;
}

class AnalyticsService {
  private isInitialized = false;
  private isDevelopment = process.env.NODE_ENV === 'development';

  initialize(): void {
    if (this.isInitialized) return;

    if (typeof window !== 'undefined' && window.gtag) {
      this.isInitialized = true;
      this.log('Analytics initialized');
    }
  }

  trackPageView(data: PageViewData): void {
    if (!this.isInitialized && !this.isDevelopment) return;

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: data.path,
        page_title: data.title,
        page_referrer: data.referrer || document.referrer,
      });
    }

    this.log('Page View', data);
  }

  trackEvent(event: AnalyticsEvent): void {
    if (!this.isInitialized && !this.isDevelopment) return;

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        ...event.data,
      });
    }

    this.log('Event', event);
  }

  trackProductView(data: ProductViewData): void {
    this.trackEvent({
      event: 'view_item',
      category: 'Product',
      action: 'view',
      label: data.productName,
      value: data.price,
      data: {
        item_id: data.productId,
        item_name: data.productName,
        item_category: data.category,
        item_variant: data.variant,
        price: data.price,
      },
    });
  }

  trackProductListView(category: string, products: ProductViewData[]): void {
    if (!this.isInitialized && !this.isDevelopment) return;

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'view_item_list', {
        item_list_name: category,
        items: products.map((product, index) => ({
          item_id: product.productId,
          item_name: product.productName,
          item_category: product.category,
          price: product.price,
          index,
        })),
      });
    }

    this.log('Product List View', { category, count: products.length });
  }

  trackProductClick(data: ProductViewData, position?: number): void {
    this.trackEvent({
      event: 'select_item',
      category: 'Product',
      action: 'click',
      label: data.productName,
      data: {
        item_id: data.productId,
        item_name: data.productName,
        item_category: data.category,
        price: data.price,
        index: position,
      },
    });
  }

  trackWishlist(action: 'add' | 'remove', data: ProductViewData): void {
    this.trackEvent({
      event: action === 'add' ? 'add_to_wishlist' : 'remove_from_wishlist',
      category: 'Wishlist',
      action,
      label: data.productName,
      data: {
        item_id: data.productId,
        item_name: data.productName,
        item_category: data.category,
        price: data.price,
      },
    });
  }

  trackBookingStart(data: BookingData): void {
    this.trackEvent({
      event: 'begin_booking',
      category: 'Booking',
      action: 'start',
      label: data.appointmentType,
      data: {
        appointment_type: data.appointmentType,
        service: data.service,
        showroom: data.showroom,
      },
    });
  }

  trackBookingStep(step: number, stepName: string, data?: BookingData): void {
    this.trackEvent({
      event: 'booking_progress',
      category: 'Booking',
      action: `step_${step}`,
      label: stepName,
      data: {
        step,
        step_name: stepName,
        ...data,
      },
    });
  }

  trackBookingComplete(data: BookingData): void {
    this.trackEvent({
      event: 'booking_complete',
      category: 'Booking',
      action: 'complete',
      label: data.appointmentType,
      value: data.value,
      data: {
        appointment_type: data.appointmentType,
        service: data.service,
        showroom: data.showroom,
        date: data.date,
      },
    });
  }

  trackSearch(data: SearchData): void {
    this.trackEvent({
      event: 'search',
      category: 'Search',
      action: 'query',
      label: data.query,
      value: data.resultsCount,
      data: {
        search_term: data.query,
        results_count: data.resultsCount,
        filters: data.filters,
      },
    });
  }

  trackFilterApplied(filterType: string, filterValue: string | string[]): void {
    this.trackEvent({
      event: 'filter_applied',
      category: 'Filter',
      action: 'apply',
      label: filterType,
      data: {
        filter_type: filterType,
        filter_value: filterValue,
      },
    });
  }

  trackFormSubmit(formName: string, success: boolean, data?: Record<string, any>): void {
    this.trackEvent({
      event: 'form_submit',
      category: 'Form',
      action: success ? 'success' : 'error',
      label: formName,
      data: {
        form_name: formName,
        success,
        ...data,
      },
    });
  }

  trackBrochureDownload(brochureName: string): void {
    this.trackEvent({
      event: 'download',
      category: 'Content',
      action: 'brochure_download',
      label: brochureName,
    });
  }

  trackNewsletterSignup(success: boolean): void {
    this.trackEvent({
      event: 'newsletter_signup',
      category: 'Engagement',
      action: success ? 'success' : 'error',
      label: 'Newsletter',
    });
  }

  trackSocialShare(platform: string, contentType: string, contentId?: string): void {
    this.trackEvent({
      event: 'share',
      category: 'Social',
      action: 'share',
      label: platform,
      data: {
        platform,
        content_type: contentType,
        content_id: contentId,
      },
    });
  }

  trackUserInteraction(data: UserInteractionData): void {
    this.trackEvent({
      event: 'user_interaction',
      category: 'Interaction',
      action: data.action,
      label: data.element,
      data: {
        element: data.element,
        context: data.context,
      },
    });
  }

  
  trackScrollDepth(percentage: number, page: string): void {
    this.trackEvent({
      event: 'scroll_depth',
      category: 'Engagement',
      action: 'scroll',
      label: page,
      value: percentage,
      data: {
        scroll_percentage: percentage,
      },
    });
  }

  trackVideoPlay(videoId: string, videoName: string): void {
    this.trackEvent({
      event: 'video_start',
      category: 'Video',
      action: 'play',
      label: videoName,
      data: {
        video_id: videoId,
        video_name: videoName,
      },
    });
  }

  trackVideoComplete(videoId: string, videoName: string): void {
    this.trackEvent({
      event: 'video_complete',
      category: 'Video',
      action: 'complete',
      label: videoName,
      data: {
        video_id: videoId,
        video_name: videoName,
      },
    });
  }

  trackError(error: Error, context?: string): void {
    this.trackEvent({
      event: 'exception',
      category: 'Error',
      action: 'error_occurred',
      label: error.message,
      data: {
        error_message: error.message,
        error_stack: error.stack,
        context,
        description: error.message,
        fatal: false,
      },
    });
  }

  trackTiming(category: string, variable: string, value: number, label?: string): void {
    if (!this.isInitialized && !this.isDevelopment) return;

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'timing_complete', {
        name: variable,
        value,
        event_category: category,
        event_label: label,
      });
    }

    this.log('Timing', { category, variable, value, label });
  }

  setUserProperties(properties: Record<string, any>): void {
    if (!this.isInitialized && !this.isDevelopment) return;

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('set', 'user_properties', properties);
    }

    this.log('User Properties', properties);
  }

  setUserId(userId: string): void {
    if (!this.isInitialized && !this.isDevelopment) return;

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '', {
        user_id: userId,
      });
    }

    this.log('User ID Set', userId);
  }

  clearUserData(): void {
    if (!this.isInitialized && !this.isDevelopment) return;

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '', {
        user_id: null,
      });
    }

    this.log('User Data Cleared');
  }

  private log(eventType: string, data?: any): void {
    if (this.isDevelopment) {
      console.log(`[Analytics] ${eventType}:`, data);
    }
  }
}

export const analyticsService = new AnalyticsService();

export type {
  AnalyticsEvent,
  PageViewData,
  ProductViewData,
  BookingData,
  SearchData,
  UserInteractionData,
};

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
  }
}