/**
 * Analytics Utility for Lomash Wood
 * Handles tracking of user events, page views, and conversions
 * Supports Google Analytics 4, Meta Pixel, and custom events
 */

// Types
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  metadata?: Record<string, any>;
}

export interface PageViewEvent {
  page: string;
  title: string;
  referrer?: string;
}

export interface ProductEvent {
  product_id: string;
  product_name: string;
  product_category?: 'kitchen' | 'bedroom' | 'both';
  product_type?: string;
  price?: number;
  quantity?: number;
  currency?: string;
  color?: string;
  finish?: string;
  style?: string;
}

export interface ConversionEvent {
  transaction_id: string;
  value: number;
  currency: string;
  items: ProductEvent[];
  shipping?: number;
  tax?: number;
  coupon?: string;
}

export interface AppointmentEvent {
  appointment_id?: string;
  appointment_type: 'home-visit' | 'showroom-visit' | 'virtual';
  service_type: 'kitchen' | 'bedroom' | 'both';
  showroom_id?: string;
  date?: string;
  time_slot?: string;
}

export interface ShowroomEvent {
  showroom_id: string;
  showroom_name: string;
  location?: string;
  action: 'view' | 'get_directions' | 'call' | 'book';
}

export interface FormEvent {
  form_name: string;
  form_step?: number;
  total_steps?: number;
  lead_type?: 'brochure' | 'business' | 'contact' | 'quote';
}

/**
 * Initialize Google Analytics 4
 */
export const initGA = (measurementId: string): void => {
  if (typeof window === 'undefined' || !measurementId) return;

  try {
    // Load GA script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize dataLayer
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).gtag = function () {
      (window as any).dataLayer.push(arguments);
    };
    (window as any).gtag('js', new Date());
    (window as any).gtag('config', measurementId, {
      page_path: window.location.pathname,
      send_page_view: false,
      cookie_flags: 'SameSite=None;Secure',
    });

    console.log('✅ Google Analytics initialized');
  } catch (error) {
    console.error('❌ GA initialization failed:', error);
  }
};

/**
 * Initialize Meta Pixel
 */
export const initMetaPixel = (pixelId: string): void => {
  if (typeof window === 'undefined' || !pixelId) return;

  try {
    const w = window as any;
    const f = w;
    const b = document;
    const e = 'script';

    if (f.fbq) return;

    const n: any = (f.fbq = function () {
      if (n.callMethod) {
        n.callMethod.apply(n, arguments);
      } else {
        n.queue.push(arguments);
      }
    });

    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];

    const t = b.createElement(e) as HTMLScriptElement;
    t.async = true;
    t.src = 'https://connect.facebook.net/en_US/fbevents.js';
    
    const s = b.getElementsByTagName(e)[0];
    if (s && s.parentNode) {
      s.parentNode.insertBefore(t, s);
    }

    f.fbq('init', pixelId);
    f.fbq('track', 'PageView');

    console.log('✅ Meta Pixel initialized');
  } catch (error) {
    console.error('❌ Meta Pixel initialization failed:', error);
  }
};

/**
 * Track page view
 */
export const trackPageView = (event: PageViewEvent): void => {
  if (typeof window === 'undefined') return;

  try {
    const w = window as any;

    // Google Analytics 4
    if (w.gtag) {
      w.gtag('event', 'page_view', {
        page_title: event.title,
        page_location: window.location.href,
        page_path: event.page,
        page_referrer: event.referrer || document.referrer,
      });
    }

    // Meta Pixel
    if (w.fbq) {
      w.fbq('track', 'PageView');
    }

    // Development logging
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Page View:', event);
    }
  } catch (error) {
    console.error('Analytics Error:', error);
  }
};

/**
 * Track custom event
 */
export const trackEvent = (event: AnalyticsEvent): void => {
  if (typeof window === 'undefined') return;

  try {
    const w = window as any;

    // Google Analytics 4
    if (w.gtag) {
      w.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        ...event.metadata,
      });
    }

    // Meta Pixel
    if (w.fbq) {
      w.fbq('trackCustom', event.action, {
        category: event.category,
        label: event.label,
        value: event.value,
        ...event.metadata,
      });
    }

    // Development logging
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Event:', event);
    }
  } catch (error) {
    console.error('Analytics Error:', error);
  }
};

/**
 * Track product view
 */
export const trackProductView = (product: ProductEvent): void => {
  const w = window as any;

  trackEvent({
    action: 'view_item',
    category: 'ecommerce',
    label: product.product_name,
    value: product.price,
    metadata: {
      items: [
        {
          item_id: product.product_id,
          item_name: product.product_name,
          item_category: product.product_category,
          item_category2: product.product_type,
          price: product.price,
          quantity: product.quantity || 1,
          currency: product.currency || 'INR',
          item_variant: product.color,
        },
      ],
    },
  });

  // Meta Pixel specific tracking
  if (w.fbq) {
    w.fbq('track', 'ViewContent', {
      content_ids: [product.product_id],
      content_name: product.product_name,
      content_category: product.product_category,
      content_type: 'product',
      value: product.price,
      currency: product.currency || 'INR',
    });
  }
};

/**
 * Track add to wishlist
 */
export const trackAddToWishlist = (product: ProductEvent): void => {
  const w = window as any;

  trackEvent({
    action: 'add_to_wishlist',
    category: 'ecommerce',
    label: product.product_name,
    value: product.price,
    metadata: {
      items: [
        {
          item_id: product.product_id,
          item_name: product.product_name,
          item_category: product.product_category,
          price: product.price,
          currency: product.currency || 'INR',
        },
      ],
    },
  });

  // Meta Pixel
  if (w.fbq) {
    w.fbq('track', 'AddToWishlist', {
      content_ids: [product.product_id],
      content_name: product.product_name,
      value: product.price,
      currency: product.currency || 'INR',
    });
  }
};

/**
 * Track product comparison
 */
export const trackProductComparison = (products: ProductEvent[]): void => {
  trackEvent({
    action: 'compare_products',
    category: 'ecommerce',
    label: 'Product Comparison',
    metadata: {
      product_count: products.length,
      product_ids: products.map((p) => p.product_id),
      items: products.map((p) => ({
        item_id: p.product_id,
        item_name: p.product_name,
        item_category: p.product_category,
      })),
    },
  });
};

/**
 * Track appointment booking - Start
 */
export const trackAppointmentStart = (appointment: AppointmentEvent): void => {
  const w = window as any;

  trackEvent({
    action: 'begin_appointment_booking',
    category: 'appointment',
    label: appointment.appointment_type,
    metadata: {
      appointment_type: appointment.appointment_type,
      service_type: appointment.service_type,
      showroom_id: appointment.showroom_id,
    },
  });

  // Meta Pixel
  if (w.fbq) {
    w.fbq('track', 'InitiateCheckout', {
      content_category: 'appointment',
      value: 0,
      currency: 'INR',
    });
  }
};

/**
 * Track appointment booking - Complete
 */
export const trackAppointmentComplete = (appointment: AppointmentEvent): void => {
  const w = window as any;

  trackEvent({
    action: 'appointment_booked',
    category: 'appointment',
    label: appointment.appointment_type,
    metadata: {
      appointment_id: appointment.appointment_id,
      appointment_type: appointment.appointment_type,
      service_type: appointment.service_type,
      showroom_id: appointment.showroom_id,
      date: appointment.date,
      time_slot: appointment.time_slot,
    },
  });

  // Meta Pixel
  if (w.fbq) {
    w.fbq('track', 'Schedule', {
      content_category: 'appointment',
      appointment_type: appointment.appointment_type,
      service_type: appointment.service_type,
    });
  }
};

/**
 * Track quote request
 */
export const trackQuoteRequest = (product: ProductEvent): void => {
  const w = window as any;

  trackEvent({
    action: 'request_quote',
    category: 'lead',
    label: product.product_name,
    value: product.price,
    metadata: {
      product_id: product.product_id,
      product_name: product.product_name,
      product_category: product.product_category,
      estimated_value: product.price,
    },
  });

  // Meta Pixel
  if (w.fbq) {
    w.fbq('track', 'Lead', {
      content_name: 'Quote Request',
      content_category: product.product_category,
      value: product.price,
      currency: 'INR',
    });
  }
};

/**
 * Track showroom interaction
 */
export const trackShowroomInteraction = (showroom: ShowroomEvent): void => {
  trackEvent({
    action: `showroom_${showroom.action}`,
    category: 'showroom',
    label: showroom.showroom_name,
    metadata: {
      showroom_id: showroom.showroom_id,
      showroom_name: showroom.showroom_name,
      location: showroom.location,
      action: showroom.action,
    },
  });
};

/**
 * Track search
 */
export const trackSearch = (searchTerm: string, results?: number): void => {
  const w = window as any;

  trackEvent({
    action: 'search',
    category: 'engagement',
    label: searchTerm,
    value: results,
    metadata: {
      search_term: searchTerm,
      result_count: results,
    },
  });

  // Meta Pixel
  if (w.fbq) {
    w.fbq('track', 'Search', {
      search_string: searchTerm,
    });
  }
};

/**
 * Track filter usage
 */
export const trackFilterUsage = (
  filterType: string,
  filterValue: string,
  category: 'kitchen' | 'bedroom'
): void => {
  trackEvent({
    action: 'apply_filter',
    category: 'product_discovery',
    label: `${filterType}: ${filterValue}`,
    metadata: {
      filter_type: filterType,
      filter_value: filterValue,
      product_category: category,
    },
  });
};

/**
 * Track form submission - Start
 */
export const trackFormStart = (form: FormEvent): void => {
  trackEvent({
    action: 'form_start',
    category: 'lead',
    label: form.form_name,
    metadata: {
      form_name: form.form_name,
      form_step: form.form_step,
      total_steps: form.total_steps,
      lead_type: form.lead_type,
    },
  });
};

/**
 * Track form submission - Complete
 */
export const trackFormSubmit = (form: FormEvent): void => {
  const w = window as any;

  trackEvent({
    action: 'form_submit',
    category: 'lead',
    label: form.form_name,
    metadata: {
      form_name: form.form_name,
      lead_type: form.lead_type,
    },
  });

  // Meta Pixel
  if (w.fbq) {
    w.fbq('track', 'Lead', {
      content_name: form.form_name,
      content_category: form.lead_type,
    });
  }
};

/**
 * Track brochure download
 */
export const trackBrochureDownload = (brochureType: string): void => {
  const w = window as any;

  trackEvent({
    action: 'download_brochure',
    category: 'lead',
    label: brochureType,
    metadata: {
      brochure_type: brochureType,
    },
  });

  // Meta Pixel
  if (w.fbq) {
    w.fbq('track', 'Lead', {
      content_name: 'Brochure Download',
      content_category: brochureType,
    });
  }
};

/**
 * Track newsletter subscription
 */
export const trackNewsletterSignup = (location: string): void => {
  const w = window as any;

  trackEvent({
    action: 'newsletter_signup',
    category: 'lead',
    label: location,
    metadata: {
      signup_location: location,
    },
  });

  // Meta Pixel
  if (w.fbq) {
    w.fbq('track', 'CompleteRegistration', {
      content_name: 'Newsletter',
      status: 'subscribed',
    });
  }
};

/**
 * Track finance calculator usage
 */
export const trackFinanceCalculator = (amount: number, tenure: number, emi: number): void => {
  trackEvent({
    action: 'calculate_emi',
    category: 'finance',
    label: 'EMI Calculator',
    value: amount,
    metadata: {
      loan_amount: amount,
      tenure_months: tenure,
      monthly_emi: emi,
    },
  });
};

/**
 * Track CTA click
 */
export const trackCTAClick = (ctaName: string, location: string): void => {
  trackEvent({
    action: 'cta_click',
    category: 'engagement',
    label: ctaName,
    metadata: {
      cta_name: ctaName,
      cta_location: location,
    },
  });
};

/**
 * Track button click
 */
export const trackButtonClick = (buttonName: string, location?: string): void => {
  trackEvent({
    action: 'button_click',
    category: 'engagement',
    label: buttonName,
    metadata: {
      button_name: buttonName,
      location,
    },
  });
};

/**
 * Track video interaction
 */
export const trackVideoPlay = (videoTitle: string, videoUrl?: string): void => {
  trackEvent({
    action: 'video_start',
    category: 'engagement',
    label: videoTitle,
    metadata: {
      video_title: videoTitle,
      video_url: videoUrl,
    },
  });
};

/**
 * Track image gallery interaction
 */
export const trackGalleryView = (galleryName: string, imageIndex: number): void => {
  trackEvent({
    action: 'view_gallery',
    category: 'engagement',
    label: galleryName,
    value: imageIndex,
    metadata: {
      gallery_name: galleryName,
      image_index: imageIndex,
    },
  });
};

/**
 * Track scroll depth
 */
export const trackScrollDepth = (percentage: number, page: string): void => {
  trackEvent({
    action: 'scroll',
    category: 'engagement',
    label: `${percentage}% - ${page}`,
    value: percentage,
    metadata: {
      scroll_depth: percentage,
      page_path: page,
    },
  });
};

/**
 * Track time on page
 */
export const trackTimeOnPage = (seconds: number, page: string): void => {
  trackEvent({
    action: 'time_on_page',
    category: 'engagement',
    label: page,
    value: seconds,
    metadata: {
      time_seconds: seconds,
      page_path: page,
    },
  });
};

/**
 * Track outbound link click
 */
export const trackOutboundLink = (url: string, label?: string): void => {
  try {
    trackEvent({
      action: 'outbound_click',
      category: 'navigation',
      label: label || url,
      metadata: {
        url,
        link_domain: new URL(url).hostname,
      },
    });
  } catch (error) {
    console.error('Invalid URL:', url);
  }
};

/**
 * Track social share
 */
export const trackSocialShare = (
  platform: 'facebook' | 'twitter' | 'whatsapp' | 'linkedin' | 'email',
  contentType: string,
  contentId?: string
): void => {
  trackEvent({
    action: 'share',
    category: 'social',
    label: platform,
    metadata: {
      platform,
      content_type: contentType,
      content_id: contentId,
    },
  });
};

/**
 * Track 404 page
 */
export const track404 = (page: string, referrer?: string): void => {
  trackEvent({
    action: 'page_not_found',
    category: 'error',
    label: page,
    metadata: {
      page_path: page,
      referrer,
    },
  });
};

/**
 * Track error
 */
export const trackError = (errorMessage: string, errorType: string, page?: string): void => {
  trackEvent({
    action: 'error',
    category: 'error',
    label: errorType,
    metadata: {
      error_message: errorMessage,
      error_type: errorType,
      page_path: page || (typeof window !== 'undefined' ? window.location.pathname : ''),
    },
  });
};

/**
 * Track user login
 */
export const trackLogin = (method: 'email' | 'google' | 'facebook'): void => {
  const w = window as any;

  trackEvent({
    action: 'login',
    category: 'user',
    label: method,
    metadata: {
      method,
    },
  });

  // Meta Pixel
  if (w.fbq) {
    w.fbq('track', 'CompleteRegistration', {
      content_name: 'Login',
      status: 'completed',
    });
  }
};

/**
 * Track user registration
 */
export const trackRegistration = (method: 'email' | 'google' | 'facebook'): void => {
  const w = window as any;

  trackEvent({
    action: 'sign_up',
    category: 'user',
    label: method,
    metadata: {
      method,
    },
  });

  // Meta Pixel
  if (w.fbq) {
    w.fbq('track', 'CompleteRegistration', {
      content_name: 'New Account',
      status: 'completed',
    });
  }
};

/**
 * Set user properties (for logged-in users)
 */
export const setUserProperties = (userId: string, properties?: Record<string, any>): void => {
  if (typeof window === 'undefined') return;

  try {
    const w = window as any;
    if (w.gtag) {
      w.gtag('set', 'user_properties', {
        user_id: userId,
        ...properties,
      });
    }
  } catch (error) {
    console.error('Analytics Error:', error);
  }
};

/**
 * Clear user properties (on logout)
 */
export const clearUserProperties = (): void => {
  if (typeof window === 'undefined') return;

  try {
    const w = window as any;
    if (w.gtag) {
      w.gtag('set', 'user_properties', {
        user_id: null,
      });
    }
  } catch (error) {
    console.error('Analytics Error:', error);
  }
};