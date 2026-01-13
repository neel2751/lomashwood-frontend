import type { ImageLoaderProps } from "next/image";

// Image optimization configuration
export const imageConfig = {
  cloudinaryCloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "",
  defaultQuality: 80,
  formats: ["avif", "webp", "jpg"],
  sizes: {
    thumbnail: 150,
    small: 300,
    medium: 600,
    large: 1200,
    xlarge: 1920,
    full: 2400,
  },
};

// Cloudinary image loader
export function cloudinaryLoader({ src, width, quality }: ImageLoaderProps): string {
  const cloudName = imageConfig.cloudinaryCloudName;

  // If no cloud name configured, return original source
  if (!cloudName) {
    return src;
  }

  // Handle external URLs (return as-is)
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  // Remove leading slash if present
  const imagePath = src.startsWith("/") ? src.slice(1) : src;

  // Build Cloudinary URL with transformations
  const transformations = [
    `w_${width}`,
    `q_${quality || imageConfig.defaultQuality}`,
    "f_auto", // Auto format detection
    "c_limit", // Limit to specified dimensions without cropping
  ].join(",");

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${imagePath}`;
}

// Default Next.js image loader
export function defaultLoader({ src, width, quality }: ImageLoaderProps): string {
  // Handle external URLs
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  // Build Next.js default image URL with query parameters
  const params = new URLSearchParams();
  params.set("url", src);
  params.set("w", width.toString());
  params.set("q", (quality || imageConfig.defaultQuality).toString());

  return `/_next/image?${params.toString()}`;
}

// Custom loader with Cloudinary fallback
export function customImageLoader({ src, width, quality }: ImageLoaderProps): string {
  // Use Cloudinary if configured
  if (imageConfig.cloudinaryCloudName) {
    return cloudinaryLoader({ src, width, quality });
  }

  // Fallback to default Next.js loader
  return defaultLoader({ src, width, quality });
}

// Generate responsive image srcset
export function generateSrcSet(src: string, sizes: number[]): string {
  return sizes
    .map((size) => {
      const url = customImageLoader({
        src,
        width: size,
        quality: imageConfig.defaultQuality,
      });
      return `${url} ${size}w`;
    })
    .join(", ");
}

// Get optimized image URL with specific size
export function getOptimizedImageUrl(
  src: string,
  size: keyof typeof imageConfig.sizes = "medium",
  quality?: number
): string {
  const width = imageConfig.sizes[size];
  return customImageLoader({
    src,
    width,
    quality: quality || imageConfig.defaultQuality,
  });
}

// Generate blur placeholder data URL
export function generateBlurDataURL(width = 10, height = 10): string {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="#f3f4f6"/>
    </svg>
  `;

  const base64 = Buffer.from(svg).toString("base64");
  return `data:image/svg+xml;base64,${base64}`;
}

// Generate shimmer placeholder (animated loading effect)
export function generateShimmerDataURL(width = 700, height = 475): string {
  const shimmer = `
    <svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#f3f4f6" offset="20%" />
          <stop stop-color="#e5e7eb" offset="50%" />
          <stop stop-color="#f3f4f6" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="#f3f4f6" />
      <rect id="r" width="${width}" height="${height}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${width}" to="${width}" dur="1s" repeatCount="indefinite"  />
    </svg>
  `;

  const base64 = Buffer.from(shimmer).toString("base64");
  return `data:image/svg+xml;base64,${base64}`;
}

// Image URL validator
export function isValidImageUrl(url: string): boolean {
  if (!url) return false;

  // Check for valid URL format
  try {
    new URL(url);
  } catch {
    // If not a valid URL, check if it's a valid path
    if (!url.startsWith("/")) return false;
  }

  // Check for valid image extensions
  const validExtensions = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif", ".svg"];
  const hasValidExtension = validExtensions.some((ext) => url.toLowerCase().endsWith(ext));

  return hasValidExtension;
}

// Get image dimensions from URL (Cloudinary specific)
export function getImageDimensions(src: string): { width?: number; height?: number } {
  // Extract dimensions from Cloudinary URL if present
  const dimensionMatch = src.match(/w_(\d+).*h_(\d+)|h_(\d+).*w_(\d+)/);

  if (dimensionMatch) {
    const width = parseInt(dimensionMatch[1] || dimensionMatch[4] || "0");
    const height = parseInt(dimensionMatch[2] || dimensionMatch[3] || "0");
    return { width, height };
  }

  return {};
}

// Responsive image sizes configuration
export const responsiveImageSizes = {
  // Product images
  productThumbnail: {
    sizes: "(max-width: 640px) 150px, (max-width: 768px) 200px, 250px",
    width: 250,
    height: 250,
  },
  productCard: {
    sizes: "(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 300px",
    width: 600,
    height: 600,
  },
  productDetail: {
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px",
    width: 1200,
    height: 1200,
  },
  productGallery: {
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px",
    width: 1920,
    height: 1080,
  },

  // Hero images
  heroDesktop: {
    sizes: "100vw",
    width: 1920,
    height: 1080,
  },
  heroMobile: {
    sizes: "100vw",
    width: 768,
    height: 1024,
  },

  // Banner images
  banner: {
    sizes: "100vw",
    width: 1920,
    height: 600,
  },
  bannerMobile: {
    sizes: "100vw",
    width: 768,
    height: 400,
  },

  // Category images
  category: {
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px",
    width: 800,
    height: 600,
  },

  // Blog images
  blogThumbnail: {
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px",
    width: 800,
    height: 450,
  },
  blogHero: {
    sizes: "100vw",
    width: 1920,
    height: 1080,
  },

  // Avatar/Profile images
  avatar: {
    sizes: "48px",
    width: 96,
    height: 96,
  },
  avatarLarge: {
    sizes: "128px",
    width: 256,
    height: 256,
  },

  // Logo
  logo: {
    sizes: "(max-width: 640px) 120px, 180px",
    width: 360,
    height: 120,
  },
};

// Image priority helper
export function shouldPrioritizeImage(index: number, totalImages: number): boolean {
  // Prioritize first 3 images or first 20% of images (whichever is greater)
  const priorityCount = Math.max(3, Math.ceil(totalImages * 0.2));
  return index < priorityCount;
}

// Image loading strategy helper
export function getImageLoadingStrategy(
  index: number,
  isAboveFold: boolean = false
): "eager" | "lazy" {
  // Load eagerly if above the fold or first few images
  if (isAboveFold || index < 3) {
    return "eager";
  }
  return "lazy";
}

// Placeholder configuration
export const placeholderConfig = {
  blur: {
    blurDataURL: generateBlurDataURL(),
    placeholder: "blur" as const,
  },
  shimmer: {
    blurDataURL: generateShimmerDataURL(),
    placeholder: "blur" as const,
  },
  empty: {
    placeholder: "empty" as const,
  },
};

// Get placeholder based on image type
export function getPlaceholderConfig(type: "product" | "hero" | "thumbnail" | "default" = "default") {
  switch (type) {
    case "product":
    case "hero":
      return placeholderConfig.shimmer;
    case "thumbnail":
      return placeholderConfig.blur;
    default:
      return placeholderConfig.empty;
  }
}

// Image format helper
export function getImageFormat(src: string): string | null {
  const extension = src.split(".").pop()?.toLowerCase();
  return extension || null;
}

// Check if browser supports format
export function supportsImageFormat(format: string): boolean {
  if (typeof window === "undefined") return false;

  const formats: Record<string, string> = {
    avif: "image/avif",
    webp: "image/webp",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
  };

  const mimeType = formats[format.toLowerCase()];
  if (!mimeType) return false;

  const canvas = document.createElement("canvas");
  return canvas.toDataURL(mimeType).indexOf(`data:${mimeType}`) === 0;
}

// Generate image alt text from filename
export function generateAltText(filename: string, prefix?: string): string {
  const name = filename
    .split("/")
    .pop()
    ?.replace(/\.(jpg|jpeg|png|webp|avif|gif)$/i, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return prefix ? `${prefix} - ${name}` : name || "Image";
}

// Image optimization tips for developers
export const imageOptimizationTips = {
  // Use appropriate sizes for different viewports
  // Always provide width and height to prevent layout shift
  // Use priority prop for above-the-fold images
  // Use lazy loading for below-the-fold images
  // Provide appropriate alt text for accessibility
  // Use placeholder for better perceived performance
  // Consider using different images for mobile vs desktop
  // Optimize images before uploading (use tools like ImageOptim, Squoosh)
  // Use modern formats (AVIF, WebP) with fallbacks
  // Implement responsive images with srcset
};

export default customImageLoader;