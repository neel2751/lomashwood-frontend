export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export function isValidIndianPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.length === 10) {
    return /^[6-9]\d{9}$/.test(cleaned);
  }
  
  if (cleaned.length === 12) {
    return /^91[6-9]\d{9}$/.test(cleaned);
  }
  
  return false;
}

export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, "");

  return cleaned.length >= 10 && cleaned.length <= 15;
}

export function isValidGST(gst: string): boolean {
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return gstRegex.test(gst.replace(/\s/g, "").toUpperCase());
}

export function isValidPAN(pan: string): boolean {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(pan.replace(/\s/g, "").toUpperCase());
}

export function isValidAadhaar(aadhaar: string): boolean {
  const cleaned = aadhaar.replace(/\D/g, "");
  return /^[2-9]\d{11}$/.test(cleaned);
}

export function isValidPincode(pincode: string): boolean {
  const cleaned = pincode.replace(/\D/g, "");
  return /^[1-9][0-9]{5}$/.test(cleaned);
}

export function isValidIFSC(ifsc: string): boolean {
  const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  return ifscRegex.test(ifsc.replace(/\s/g, "").toUpperCase());
}

export function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function validatePasswordStrength(password: string): {
  isValid: boolean;
  strength: "weak" | "medium" | "strong" | "very-strong";
  score: number;
  feedback: string[];
} {
  const feedback: string[] = [];
  let score = 0;

  if (password.length < 8) {
    feedback.push("Password must be at least 8 characters long");
  } else if (password.length >= 8) {
    score += 1;
  }

  if (password.length >= 12) {
    score += 1;
  }

  if (!/[A-Z]/.test(password)) {
    feedback.push("Add at least one uppercase letter");
  } else {
    score += 1;
  }

  if (!/[a-z]/.test(password)) {
    feedback.push("Add at least one lowercase letter");
  } else {
    score += 1;
  }

  if (!/\d/.test(password)) {
    feedback.push("Add at least one number");
  } else {
    score += 1;
  }

  if (!/[@$!%*?&#^()_\-+=\[\]{}|\\:;"'<>,.\/~`]/.test(password)) {
    feedback.push("Add at least one special character");
  } else {
    score += 1;
  }

  if (/(.)\1{2,}/.test(password)) {
    feedback.push("Avoid repeated characters");
    score -= 1;
  }

  if (/^(?:123|abc|qwerty)/i.test(password)) {
    feedback.push("Avoid common patterns");
    score -= 1;
  }

  let strength: "weak" | "medium" | "strong" | "very-strong";
  if (score <= 2) {
    strength = "weak";
  } else if (score <= 4) {
    strength = "medium";
  } else if (score <= 5) {
    strength = "strong";
  } else {
    strength = "very-strong";
  }

  const isValid = score >= 5 && password.length >= 8;

  return {
    isValid,
    strength,
    score: Math.max(0, Math.min(6, score)),
    feedback,
  };
}

export function isValidCreditCard(cardNumber: string): boolean {
  const cleaned = cardNumber.replace(/\D/g, "");

  if (cleaned.length < 13 || cleaned.length > 19) {
    return false;
  }

  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

export function isValidCVV(cvv: string): boolean {
  return /^\d{3,4}$/.test(cvv);
}

export function isValidFileType(
  file: File,
  allowedTypes: string[]
): boolean {
  return allowedTypes.includes(file.type);
}

export function isValidFileSize(
  file: File,
  maxSizeInMB: number
): boolean {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return file.size <= maxSizeInBytes;
}

export async function validateImageDimensions(
  file: File,
  options: {
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
  }
): Promise<{ isValid: boolean; width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      const { width, height } = img;
      URL.revokeObjectURL(url);

      const isValid =
        (!options.minWidth || width >= options.minWidth) &&
        (!options.maxWidth || width <= options.maxWidth) &&
        (!options.minHeight || height >= options.minHeight) &&
        (!options.maxHeight || height <= options.maxHeight);

      resolve({ isValid, width, height });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({ isValid: false, width: 0, height: 0 });
    };

    img.src = url;
  });
}

export function isDateInPast(date: Date | string): boolean {
  const checkDate = typeof date === "string" ? new Date(date) : date;
  return checkDate < new Date();
}

export function isDateInFuture(date: Date | string): boolean {
  const checkDate = typeof date === "string" ? new Date(date) : date;
  return checkDate > new Date();
}

export function isValidAge(
  birthDate: Date | string,
  minimumAge: number = 18
): boolean {
  const birth = typeof birthDate === "string" ? new Date(birthDate) : birthDate;
  const today = new Date();
  const age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birth.getDate())
  ) {
    return age - 1 >= minimumAge;
  }

  return age >= minimumAge;
}

export function isAlphabetic(str: string): boolean {
  return /^[A-Za-z\s]+$/.test(str);
}

export function isAlphanumeric(str: string): boolean {
  return /^[A-Za-z0-9]+$/.test(str);
}

export function isNumeric(str: string): boolean {
  return /^\d+$/.test(str);
}

export function hasMinLength(str: string, minLength: number): boolean {
  return str.length >= minLength;
}

export function hasMaxLength(str: string, maxLength: number): boolean {
  return str.length <= maxLength;
}

export function isWithinLengthRange(
  str: string,
  minLength: number,
  maxLength: number
): boolean {
  return str.length >= minLength && str.length <= maxLength;
}

export function isValidQuantity(quantity: number): boolean {
  return Number.isInteger(quantity) && quantity > 0;
}

export function isValidPrice(price: number): boolean {
  return typeof price === "number" && price > 0 && isFinite(price);
}

export function isValidDiscount(discount: number): boolean {
  return (
    typeof discount === "number" &&
    discount >= 0 &&
    discount <= 100
  );
}

export function isValidCoordinates(lat: number, lng: number): boolean {
  return (
    typeof lat === "number" &&
    typeof lng === "number" &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180
  );
}

export function isValidIPv4(ip: string): boolean {
  const ipv4Regex =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipv4Regex.test(ip);
}

export function isValidHexColor(color: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

export function isValidTimeFormat(time: string): boolean {
  return /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);
}

export function sanitizeString(str: string): string {
  return str
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .trim();
}

export function isValidUsername(username: string): boolean {
  return /^[a-zA-Z0-9_-]{3,20}$/.test(username);
}

export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

export function containsHTML(str: string): boolean {
  return /<[^>]*>/g.test(str);
}

export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
}

export function hasMinItems<T>(arr: T[], minItems: number): boolean {
  return Array.isArray(arr) && arr.length >= minItems;
}

export function hasMaxItems<T>(arr: T[], maxItems: number): boolean {
  return Array.isArray(arr) && arr.length <= maxItems;
}

export function isValidRating(
  rating: number,
  minRating: number = 1,
  maxRating: number = 5
): boolean {
  return (
    typeof rating === "number" &&
    rating >= minRating &&
    rating <= maxRating
  );
}