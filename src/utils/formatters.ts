/**
 * Formatters Utility
 * Common formatting functions for Lomash Wood application
 */

/**
 * Format currency to Indian Rupee format
 */
export function formatCurrency(
  amount: number,
  options?: {
    showSymbol?: boolean;
    decimals?: number;
    locale?: string;
  }
): string {
  const {
    showSymbol = true,
    decimals = 2,
    locale = "en-IN",
  } = options || {};

  const formatted = new Intl.NumberFormat(locale, {
    style: showSymbol ? "currency" : "decimal",
    currency: "INR",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);

  return formatted;
}

/**
 * Format number to Indian numbering system (Lakhs/Crores)
 */
export function formatIndianNumber(num: number): string {
  const numStr = num.toString();
  const lastThree = numStr.substring(numStr.length - 3);
  const otherNumbers = numStr.substring(0, numStr.length - 3);
  
  if (otherNumbers !== "") {
    return (
      otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree
    );
  }
  
  return lastThree;
}

/**
 * Format phone number
 */
export function formatPhoneNumber(
  phone: string,
  format: "international" | "national" | "display" = "display"
): string {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, "");

  // Check if it's an Indian number
  const isIndian = cleaned.length === 10 || 
    (cleaned.length === 12 && cleaned.startsWith("91"));

  if (format === "international") {
    if (isIndian) {
      const number = cleaned.length === 10 ? cleaned : cleaned.slice(2);
      return `+91 ${number}`;
    }
    return `+${cleaned}`;
  }

  if (format === "national") {
    if (isIndian) {
      const number = cleaned.length === 10 ? cleaned : cleaned.slice(2);
      return number;
    }
    return cleaned;
  }

  // Display format: +91 98765 43210
  if (isIndian) {
    const number = cleaned.length === 10 ? cleaned : cleaned.slice(2);
    return `+91 ${number.slice(0, 5)} ${number.slice(5)}`;
  }

  // For other countries, basic formatting
  if (cleaned.length >= 10) {
    return `+${cleaned.slice(0, cleaned.length - 10)} ${cleaned.slice(-10)}`;
  }

  return phone;
}

/**
 * Format date to readable format
 */
export function formatDate(
  date: Date | string | number,
  format: "short" | "medium" | "long" | "full" | "time" | "datetime" = "medium"
): string {
  const dateObj = typeof date === "string" || typeof date === "number" 
    ? new Date(date) 
    : date;

  const optionsMap: Record<string, Intl.DateTimeFormatOptions> = {
    short: { day: "2-digit", month: "2-digit", year: "numeric" },
    medium: { day: "numeric", month: "short", year: "numeric" },
    long: { day: "numeric", month: "long", year: "numeric" },
    full: { weekday: "long", day: "numeric", month: "long", year: "numeric" },
    time: { hour: "2-digit", minute: "2-digit" },
    datetime: {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  };

  const options = optionsMap[format];

  return new Intl.DateTimeFormat("en-IN", options).format(dateObj);
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date | string | number): string {
  const dateObj = typeof date === "string" || typeof date === "number"
    ? new Date(date)
    : date;

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} ${diffInWeeks === 1 ? "week" : "weeks"} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} ${diffInMonths === 1 ? "month" : "months"} ago`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} ${diffInYears === 1 ? "year" : "years"} ago`;
}

/**
 * Format file size
 */
export function formatFileSize(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

/**
 * Format percentage
 */
export function formatPercentage(
  value: number,
  options?: {
    decimals?: number;
    showSign?: boolean;
  }
): string {
  const { decimals = 2, showSign = false } = options || {};
  
  const formatted = value.toFixed(decimals);
  const sign = showSign && value > 0 ? "+" : "";
  
  return `${sign}${formatted}%`;
}

/**
 * Format GST number
 */
export function formatGSTNumber(gst: string): string {
  // Remove any spaces or special characters
  const cleaned = gst.replace(/[^A-Z0-9]/g, "");
  
  if (cleaned.length !== 15) return gst;
  
  // Format: 22AAAAA0000A1Z5
  return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 7)} ${cleaned.slice(7, 11)} ${cleaned.slice(11, 12)} ${cleaned.slice(12, 14)} ${cleaned.slice(14, 15)}`;
}

/**
 * Format pincode
 */
export function formatPincode(pincode: string): string {
  const cleaned = pincode.replace(/\D/g, "");
  
  if (cleaned.length !== 6) return pincode;
  
  return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
}

/**
 * Format name to title case
 */
export function formatName(name: string): string {
  return name
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Format order ID
 */
export function formatOrderId(orderId: string | number): string {
  const id = orderId.toString();
  return `#${id.padStart(6, "0")}`;
}

/**
 * Format product SKU
 */
export function formatSKU(sku: string): string {
  return sku.toUpperCase();
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(
  text: string,
  maxLength: number,
  addEllipsis: boolean = true
): string {
  if (text.length <= maxLength) return text;
  
  const truncated = text.slice(0, maxLength);
  return addEllipsis ? `${truncated}...` : truncated;
}

/**
 * Format address to single line
 */
export function formatAddress(address: {
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
}): string {
  const parts = [
    address.addressLine1,
    address.addressLine2,
    address.landmark,
    address.city,
    address.state,
    address.pincode,
  ].filter(Boolean);

  return parts.join(", ");
}

/**
 * Format dimensions
 */
export function formatDimensions(
  length: number,
  width: number,
  height?: number,
  unit: string = "mm"
): string {
  if (height) {
    return `${length} × ${width} × ${height} ${unit}`;
  }
  return `${length} × ${width} ${unit}`;
}

/**
 * Format weight
 */
export function formatWeight(
  weight: number,
  unit: "kg" | "g" | "ton" = "kg"
): string {
  return `${weight} ${unit}`;
}

/**
 * Format quantity with unit
 */
export function formatQuantity(
  quantity: number,
  unit: string,
  showUnit: boolean = true
): string {
  const formatted = formatIndianNumber(quantity);
  return showUnit ? `${formatted} ${unit}` : formatted;
}

/**
 * Format discount
 */
export function formatDiscount(
  originalPrice: number,
  discountedPrice: number
): string {
  const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
  return formatPercentage(discount, { decimals: 0 });
}

/**
 * Slugify text (for URLs)
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Capitalize first letter
 */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Format credit card number (masked)
 */
export function formatCreditCard(cardNumber: string, mask: boolean = true): string {
  const cleaned = cardNumber.replace(/\D/g, "");
  
  if (mask && cleaned.length >= 12) {
    const lastFour = cleaned.slice(-4);
    const masked = "*".repeat(cleaned.length - 4);
    return `${masked.match(/.{1,4}/g)?.join(" ")} ${lastFour}`;
  }
  
  return cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
}

/**
 * Format rating
 */
export function formatRating(rating: number, maxRating: number = 5): string {
  return `${rating.toFixed(1)}/${maxRating}`;
}

/**
 * Format inventory status
 */
export function formatInventoryStatus(quantity: number): {
  status: "in-stock" | "low-stock" | "out-of-stock";
  label: string;
  color: string;
} {
  if (quantity === 0) {
    return {
      status: "out-of-stock",
      label: "Out of Stock",
      color: "red",
    };
  }
  
  if (quantity <= 10) {
    return {
      status: "low-stock",
      label: `Only ${quantity} left`,
      color: "orange",
    };
  }
  
  return {
    status: "in-stock",
    label: "In Stock",
    color: "green",
  };
}

/**
 * Format delivery estimate
 */
export function formatDeliveryEstimate(days: number): string {
  if (days === 0) return "Same day delivery";
  if (days === 1) return "Delivered by tomorrow";
  
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + days);
  
  return `Delivered by ${formatDate(deliveryDate, "medium")}`;
}

/**
 * Format business hours
 */
export function formatBusinessHours(
  openTime: string,
  closeTime: string,
  format24hr: boolean = false
): string {
  if (format24hr) {
    return `${openTime} - ${closeTime}`;
  }
  
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const hour12 = hours % 12 || 12;
    return `${hour12}:${minutes.toString().padStart(2, "0")} ${period}`;
  };
  
  return `${formatTime(openTime)} - ${formatTime(closeTime)}`;
}