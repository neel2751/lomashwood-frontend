/**
 * URL Helpers Utility
 * Provides functions for URL manipulation, validation, and generation
 */

/**
 * Creates a slug from a string
 * @param text - The text to convert to a slug
 * @returns A URL-safe slug
 */
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Validates if a string is a valid URL
 * @param url - The URL to validate
 * @returns True if valid URL, false otherwise
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates if a string is a valid email
 * @param email - The email to validate
 * @returns True if valid email, false otherwise
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Builds a URL with query parameters
 * @param baseUrl - The base URL
 * @param params - Object containing query parameters
 * @returns URL with query string
 */
export function buildUrlWithParams(
  baseUrl: string,
  params: Record<string, string | number | boolean | null | undefined>
): string {
  const url = new URL(baseUrl, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      url.searchParams.append(key, String(value));
    }
  });
  
  return url.toString();
}

/**
 * Parses query parameters from a URL string or search params
 * @param search - URL search string or URLSearchParams
 * @returns Object with parsed parameters
 */
export function parseQueryParams(search: string | URLSearchParams): Record<string, string> {
  const params = typeof search === 'string' ? new URLSearchParams(search) : search;
  const result: Record<string, string> = {};
  
  params.forEach((value, key) => {
    result[key] = value;
  });
  
  return result;
}

/**
 * Updates a single query parameter in the URL
 * @param url - The URL to update
 * @param key - Parameter key
 * @param value - Parameter value
 * @returns Updated URL
 */
export function updateQueryParam(url: string, key: string, value: string | number | boolean): string {
  const urlObj = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
  urlObj.searchParams.set(key, String(value));
  return urlObj.toString();
}

/**
 * Removes a query parameter from the URL
 * @param url - The URL to update
 * @param key - Parameter key to remove
 * @returns Updated URL
 */
export function removeQueryParam(url: string, key: string): string {
  const urlObj = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
  urlObj.searchParams.delete(key);
  return urlObj.toString();
}

/**
 * Gets the current page URL (client-side only)
 * @returns Current URL or empty string on server
 */
export function getCurrentUrl(): string {
  if (typeof window === 'undefined') return '';
  return window.location.href;
}

/**
 * Gets the current pathname (client-side only)
 * @returns Current pathname or empty string on server
 */
export function getCurrentPathname(): string {
  if (typeof window === 'undefined') return '';
  return window.location.pathname;
}

/**
 * Extracts the domain from a URL
 * @param url - The URL to extract domain from
 * @returns Domain name
 */
export function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch {
    return '';
  }
}

/**
 * Checks if a URL is external (different domain)
 * @param url - The URL to check
 * @returns True if external, false if internal
 */
export function isExternalUrl(url: string): boolean {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return false; // Relative URL
  }
  
  if (typeof window === 'undefined') return false;
  
  try {
    const urlObj = new URL(url);
    return urlObj.hostname !== window.location.hostname;
  } catch {
    return false;
  }
}

/**
 * Generates a product URL
 * @param productId - Product ID
 * @param productName - Product name (optional, for SEO)
 * @returns Product URL path
 */
export function getProductUrl(productId: string, productName?: string): string {
  if (productName) {
    const slug = createSlug(productName);
    return `/products/${slug}-${productId}`;
  }
  return `/products/${productId}`;
}

/**
 * Generates a category URL
 * @param categorySlug - Category slug
 * @returns Category URL path
 */
export function getCategoryUrl(categorySlug: string): string {
  return `/category/${categorySlug}`;
}

/**
 * Generates a search URL with query
 * @param query - Search query
 * @param filters - Additional filters (optional)
 * @returns Search URL
 */
export function getSearchUrl(query: string, filters?: Record<string, string>): string {
  const params = new URLSearchParams({ q: query });
  
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      params.append(key, value);
    });
  }
  
  return `/search?${params.toString()}`;
}

/**
 * Generates a WhatsApp chat URL
 * @param phoneNumber - WhatsApp number (with country code)
 * @param message - Pre-filled message (optional)
 * @returns WhatsApp URL
 */
export function getWhatsAppUrl(phoneNumber: string, message?: string): string {
  // Remove any non-numeric characters
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  const baseUrl = 'https://wa.me/';
  
  if (message) {
    const encodedMessage = encodeURIComponent(message);
    return `${baseUrl}${cleanNumber}?text=${encodedMessage}`;
  }
  
  return `${baseUrl}${cleanNumber}`;
}

/**
 * Generates a phone call URL
 * @param phoneNumber - Phone number
 * @returns Tel URL
 */
export function getPhoneUrl(phoneNumber: string): string {
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  return `tel:${cleanNumber}`;
}

/**
 * Generates an email URL
 * @param email - Email address
 * @param subject - Email subject (optional)
 * @param body - Email body (optional)
 * @returns Mailto URL
 */
export function getEmailUrl(email: string, subject?: string, body?: string): string {
  const params = new URLSearchParams();
  
  if (subject) params.append('subject', subject);
  if (body) params.append('body', body);
  
  const queryString = params.toString();
  return `mailto:${email}${queryString ? `?${queryString}` : ''}`;
}

/**
 * Generates social sharing URLs
 */
export const socialShare = {
  /**
   * Facebook share URL
   * @param url - URL to share
   * @returns Facebook share URL
   */
  facebook: (url: string): string => {
    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  },

  /**
   * Twitter share URL
   * @param url - URL to share
   * @param text - Tweet text (optional)
   * @returns Twitter share URL
   */
  twitter: (url: string, text?: string): string => {
    const params = new URLSearchParams({ url });
    if (text) params.append('text', text);
    return `https://twitter.com/intent/tweet?${params.toString()}`;
  },

  /**
   * LinkedIn share URL
   * @param url - URL to share
   * @returns LinkedIn share URL
   */
  linkedin: (url: string): string => {
    return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  },

  /**
   * Pinterest share URL
   * @param url - URL to share
   * @param media - Image URL (optional)
   * @param description - Pin description (optional)
   * @returns Pinterest share URL
   */
  pinterest: (url: string, media?: string, description?: string): string => {
    const params = new URLSearchParams({ url });
    if (media) params.append('media', media);
    if (description) params.append('description', description);
    return `https://pinterest.com/pin/create/button/?${params.toString()}`;
  },

  /**
   * WhatsApp share URL
   * @param text - Text to share (can include URL)
   * @returns WhatsApp share URL
   */
  whatsapp: (text: string): string => {
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  },
};

/**
 * Adds UTM parameters to a URL for tracking
 * @param url - Base URL
 * @param utmParams - UTM parameters
 * @returns URL with UTM parameters
 */
export function addUtmParams(
  url: string,
  utmParams: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
  }
): string {
  const urlObj = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
  
  if (utmParams.source) urlObj.searchParams.set('utm_source', utmParams.source);
  if (utmParams.medium) urlObj.searchParams.set('utm_medium', utmParams.medium);
  if (utmParams.campaign) urlObj.searchParams.set('utm_campaign', utmParams.campaign);
  if (utmParams.term) urlObj.searchParams.set('utm_term', utmParams.term);
  if (utmParams.content) urlObj.searchParams.set('utm_content', utmParams.content);
  
  return urlObj.toString();
}

/**
 * Sanitizes a URL to prevent XSS attacks
 * @param url - URL to sanitize
 * @returns Sanitized URL or empty string if invalid
 */
export function sanitizeUrl(url: string): string {
  // Check for javascript: protocol and other dangerous protocols
  const dangerousProtocols = ['javascript:', 'data:', 'vbscript:'];
  const lowerUrl = url.toLowerCase().trim();
  
  for (const protocol of dangerousProtocols) {
    if (lowerUrl.startsWith(protocol)) {
      return '';
    }
  }
  
  return url;
}

/**
 * Gets the file extension from a URL
 * @param url - URL to extract extension from
 * @returns File extension or empty string
 */
export function getFileExtension(url: string): string {
  try {
    const pathname = new URL(url).pathname;
    const match = pathname.match(/\.([^.]+)$/);
    return match ? match[1].toLowerCase() : '';
  } catch {
    return '';
  }
}

/**
 * Checks if URL points to an image
 * @param url - URL to check
 * @returns True if image URL
 */
export function isImageUrl(url: string): boolean {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'avif'];
  const extension = getFileExtension(url);
  return imageExtensions.includes(extension);
}

/**
 * Generates a canonical URL (removes query params and hash)
 * @param url - URL to canonicalize
 * @returns Canonical URL
 */
export function getCanonicalUrl(url: string): string {
  try {
    const urlObj = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
    return `${urlObj.origin}${urlObj.pathname}`;
  } catch {
    return url;
  }
}

/**
 * Route constants for the application
 */
export const routes = {
  home: '/',
  about: '/about',
  contact: '/contact',
  products: '/products',
  categories: '/categories',
  search: '/search',
  cart: '/cart',
  checkout: '/checkout',
  account: '/account',
  orders: '/account/orders',
  wishlist: '/account/wishlist',
} as const;

export type Route = (typeof routes)[keyof typeof routes];