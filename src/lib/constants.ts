// Site Information
export const SITE_NAME = "Lomash Wood";
export const SITE_DESCRIPTION = "Lomash Wood compares prices and promotions to ensure you'll always find a beautiful kitchen at our best possible price";
export const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
export const SITE_EMAIL = "info@lomashwood.com";
export const SITE_PHONE = "+91 1234567890";

// Navigation Links - Main Navbar (from PDF)
export const MAIN_NAV_LINKS = [
  {
    label: "Bedroom",
    href: "/bedroom",
  },
  {
    label: "Kitchen",
    href: "/kitchen",
  },
  {
    label: "Offers",
    href: "/sale",
  },
  {
    label: "Find a Showroom",
    href: "/showrooms",
  },
  {
    label: "Finance",
    href: "/finance",
  },
  {
    label: "Inspiration & Guide",
    href: "/inspiration",
  },
] as const;

// Hamburger Menu Links (from PDF)
export const HAMBURGER_MENU_LINKS = [
  {
    label: "Inspiration",
    href: "/inspiration",
  },
  {
    label: "Our Blog",
    href: "/blog",
  },
  {
    label: "Download Brochure",
    href: "/brochure",
  },
] as const;

// Footer Links
export const FOOTER_LINKS = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Process", href: "/our-process" },
    { label: "Why Choose Us", href: "/why-choose-us" },
    { label: "Contact Us", href: "/contact" },
  ],
  products: [
    { label: "Kitchen Collection", href: "/kitchen" },
    { label: "Bedroom Collection", href: "/bedroom" },
    { label: "Media Wall", href: "/media-wall" },
    { label: "Offers", href: "/sale" },
  ],
  support: [
    { label: "Book Consultation", href: "/book-appointment" },
    { label: "Finance Options", href: "/finance" },
    { label: "Find Showroom", href: "/showrooms" },
    { label: "Download Brochure", href: "/brochure" },
  ],
  legal: [
    { label: "Terms & Conditions", href: "/terms-conditions" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Cookies", href: "/cookies" },
  ],
} as const;

// Social Media Links
export const SOCIAL_LINKS = {
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "#",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#",
  twitter: process.env.NEXT_PUBLIC_TWITTER_URL || "#",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "#",
} as const;

// Appointment Types
export const APPOINTMENT_TYPES = [
  {
    id: "home",
    label: "Home Measurement",
    description: "We'll visit your home to take precise measurements",
    icon: "Home",
  },
  {
    id: "online",
    label: "Online Consultation",
    description: "Connect with our experts via video call",
    icon: "Video",
  },
  {
    id: "showroom",
    label: "Showroom Visit",
    description: "Visit our showroom to see our products",
    icon: "Store",
  },
] as const;

// Business Types
export const BUSINESS_TYPES = [
  "Interior Designer",
  "Architect",
  "Builder",
  "Property Developer",
  "Contractor",
  "Real Estate Agent",
  "Other",
] as const;

// Product Categories
export const PRODUCT_CATEGORIES = ["kitchen", "bedroom"] as const;

// Product Styles (from PDF)
export const PRODUCT_STYLES = [
  "Shaker",
  "Modern",
  "Classic",
  "Contemporary",
  "Traditional",
  "Minimalist",
] as const;

// Product Finishes (from PDF)
export const PRODUCT_FINISHES = [
  "Matt",
  "Gloss",
  "Satin",
  "Wood Grain",
  "High Gloss",
  "Textured",
] as const;

// Product Ranges (from PDF)
export const PRODUCT_RANGES = [
  "Lomash Signature",
  "Lomash Prime",
  "Lomash Ultimate",
  "Lomash Classic",
  "Lomash Modern",
] as const;

// Sort Options (from PDF)
export const SORT_OPTIONS = [
  { label: "Most Popular", value: "popular" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Name: A to Z", value: "name_asc" },
  { label: "Name: Z to A", value: "name_desc" },
] as const;

// Our Process Steps (4 steps as per SRS)
export const PROCESS_STEPS = [
  {
    step: 1,
    title: "Free Consultation",
    description: "Book a free consultation with our design experts to discuss your vision",
    icon: "MessageCircle",
  },
  {
    step: 2,
    title: "Design & Planning",
    description: "We create a customized design that perfectly fits your space and style",
    icon: "PenTool",
  },
  {
    step: 3,
    title: "Manufacturing",
    description: "Your kitchen or bedroom is crafted with precision using premium materials",
    icon: "Hammer",
  },
  {
    step: 4,
    title: "Installation",
    description: "Professional installation by our experienced team, ensuring perfect results",
    icon: "CheckCircle",
  },
] as const;

// Why Choose Us Features
export const WHY_CHOOSE_US_FEATURES = [
  {
    title: "Best Price Guarantee",
    description: "We compare prices to ensure you get the best deal",
    icon: "BadgeCheck",
  },
  {
    title: "Expert Design Team",
    description: "Experienced designers to bring your vision to life",
    icon: "Users",
  },
  {
    title: "Premium Quality",
    description: "High-quality materials and craftsmanship",
    icon: "Award",
  },
  {
    title: "10-Year Warranty",
    description: "Comprehensive warranty on all our products",
    icon: "Shield",
  },
  {
    title: "Free Home Consultation",
    description: "Complimentary design consultation at your home",
    icon: "Home",
  },
  {
    title: "Flexible Finance Options",
    description: "Affordable payment plans to suit your budget",
    icon: "CreditCard",
  },
] as const;

// Pagination
export const ITEMS_PER_PAGE = 12;
export const INFINITE_SCROLL_LIMIT = 12;

// File Upload
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

// Form Validation
export const PHONE_REGEX = /^[\d\s\-\+\(\)]+$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const POSTCODE_REGEX = /^[A-Z0-9\s-]{3,10}$/i;

// Date & Time
export const BUSINESS_HOURS = {
  monday: "9:00 AM - 6:00 PM",
  tuesday: "9:00 AM - 6:00 PM",
  wednesday: "9:00 AM - 6:00 PM",
  thursday: "9:00 AM - 6:00 PM",
  friday: "9:00 AM - 6:00 PM",
  saturday: "10:00 AM - 5:00 PM",
  sunday: "Closed",
} as const;

export const TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
] as const;

// API Endpoints
export const API_ENDPOINTS = {
  products: "/api/products",
  productDetail: (id: string) => `/api/products/${id}`,
  appointments: "/api/appointments",
  showrooms: "/api/showrooms",
  blog: "/api/blog",
  brochure: "/api/brochure",
  contact: "/api/contact",
  newsletter: "/api/newsletter",
  business: "/api/business",
} as const;

// Cache Keys
export const CACHE_KEYS = {
  products: "products",
  kitchens: "kitchens",
  bedrooms: "bedrooms",
  showrooms: "showrooms",
  blog: "blog",
  colours: "colours",
} as const;

// Cache Times (in seconds)
export const CACHE_TIME = {
  short: 60, // 1 minute
  medium: 300, // 5 minutes
  long: 3600, // 1 hour
  day: 86400, // 24 hours
} as const;

// SEO
export const DEFAULT_OG_IMAGE = "/images/og-image.jpg";
export const TWITTER_HANDLE = "@lomashwood";

// Google Analytics
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Feature Flags
export const FEATURES = {
  enableBooking: process.env.NEXT_PUBLIC_ENABLE_BOOKING === "true",
  enableOnlineConsultation: process.env.NEXT_PUBLIC_ENABLE_ONLINE_CONSULTATION === "true",
  enablePriceCalculator: process.env.NEXT_PUBLIC_ENABLE_PRICE_CALCULATOR === "true",
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  generic: "Something went wrong. Please try again.",
  network: "Network error. Please check your connection.",
  notFound: "The requested resource was not found.",
  unauthorized: "You are not authorized to perform this action.",
  validation: "Please check your input and try again.",
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  appointmentBooked: "Appointment booked successfully!",
  brochureRequested: "Brochure request submitted successfully!",
  contactSubmitted: "Thank you for contacting us. We'll get back to you soon!",
  newsletterSubscribed: "Successfully subscribed to our newsletter!",
} as const;