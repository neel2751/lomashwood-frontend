export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, ''); 
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

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

export function parseQueryParams(search: string | URLSearchParams): Record<string, string> {
  const params = typeof search === 'string' ? new URLSearchParams(search) : search;
  const result: Record<string, string> = {};
  
  params.forEach((value, key) => {
    result[key] = value;
  });
  
  return result;
}

export function updateQueryParam(url: string, key: string, value: string | number | boolean): string {
  const urlObj = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
  urlObj.searchParams.set(key, String(value));
  return urlObj.toString();
}

export function removeQueryParam(url: string, key: string): string {
  const urlObj = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
  urlObj.searchParams.delete(key);
  return urlObj.toString();
}

export function getCurrentUrl(): string {
  if (typeof window === 'undefined') return '';
  return window.location.href;
}

export function getCurrentPathname(): string {
  if (typeof window === 'undefined') return '';
  return window.location.pathname;
}

export function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch {
    return '';
  }
}

export function isExternalUrl(url: string): boolean {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return false;
  }
  
  if (typeof window === 'undefined') return false;
  
  try {
    const urlObj = new URL(url);
    return urlObj.hostname !== window.location.hostname;
  } catch {
    return false;
  }
}

export function getProductUrl(productId: string, productName?: string): string {
  if (productName) {
    const slug = createSlug(productName);
    return `/products/${slug}-${productId}`;
  }
  return `/products/${productId}`;
}

export function getCategoryUrl(categorySlug: string): string {
  return `/category/${categorySlug}`;
}

export function getSearchUrl(query: string, filters?: Record<string, string>): string {
  const params = new URLSearchParams({ q: query });
  
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      params.append(key, value);
    });
  }
  
  return `/search?${params.toString()}`;
}

export function getWhatsAppUrl(phoneNumber: string, message?: string): string {
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  const baseUrl = 'https://wa.me/';
  
  if (message) {
    const encodedMessage = encodeURIComponent(message);
    return `${baseUrl}${cleanNumber}?text=${encodedMessage}`;
  }
  
  return `${baseUrl}${cleanNumber}`;
}

export function getPhoneUrl(phoneNumber: string): string {
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  return `tel:${cleanNumber}`;
}

export function getEmailUrl(email: string, subject?: string, body?: string): string {
  const params = new URLSearchParams();
  
  if (subject) params.append('subject', subject);
  if (body) params.append('body', body);
  
  const queryString = params.toString();
  return `mailto:${email}${queryString ? `?${queryString}` : ''}`;
}

export const socialShare = {

  facebook: (url: string): string => {
    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  },

  twitter: (url: string, text?: string): string => {
    const params = new URLSearchParams({ url });
    if (text) params.append('text', text);
    return `https://twitter.com/intent/tweet?${params.toString()}`;
  },

  linkedin: (url: string): string => {
    return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  },

  pinterest: (url: string, media?: string, description?: string): string => {
    const params = new URLSearchParams({ url });
    if (media) params.append('media', media);
    if (description) params.append('description', description);
    return `https://pinterest.com/pin/create/button/?${params.toString()}`;
  },

  whatsapp: (text: string): string => {
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  },
};

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
export function sanitizeUrl(url: string): string {
  const dangerousProtocols = ['javascript:', 'data:', 'vbscript:'];
  const lowerUrl = url.toLowerCase().trim();
  
  for (const protocol of dangerousProtocols) {
    if (lowerUrl.startsWith(protocol)) {
      return '';
    }
  }
  
  return url;
}

export function getFileExtension(url: string): string {
  try {
    const pathname = new URL(url).pathname;
    const match = pathname.match(/\.([^.]+)$/);
    return match ? match[1].toLowerCase() : '';
  } catch {
    return '';
  }
}

export function isImageUrl(url: string): boolean {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'avif'];
  const extension = getFileExtension(url);
  return imageExtensions.includes(extension);
}

export function getCanonicalUrl(url: string): string {
  try {
    const urlObj = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
    return `${urlObj.origin}${urlObj.pathname}`;
  } catch {
    return url;
  }
}

export const routes = {
  home: '/',

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
