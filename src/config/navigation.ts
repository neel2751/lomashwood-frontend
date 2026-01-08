import { NavLink } from "@/types";

// Main Navigation Links (Desktop Navbar - from PDF)
export const mainNavigation: NavLink[] = [
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
];

// Hamburger Menu Links (Mobile Menu - from PDF)
export const hamburgerMenuLinks: NavLink[] = [
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
];

// Footer Navigation
export const footerNavigation = {
  company: [
    {
      label: "About Us",
      href: "/about",
    },
    {
      label: "Our Process",
      href: "/our-process",
    },
    {
      label: "Why Choose Us",
      href: "/why-choose-us",
    },
    {
      label: "Contact Us",
      href: "/contact",
    },
    {
      label: "Careers",
      href: "/careers",
    },
  ],
  products: [
    {
      label: "Kitchen Collection",
      href: "/kitchen",
    },
    {
      label: "Bedroom Collection",
      href: "/bedroom",
    },
    {
      label: "Media Wall",
      href: "/media-wall",
    },
    {
      label: "Special Offers",
      href: "/sale",
    },
    {
      label: "Our Projects",
      href: "/projects",
    },
  ],
  support: [
    {
      label: "Book Consultation",
      href: "/book-appointment",
    },
    {
      label: "Finance Options",
      href: "/finance",
    },
    {
      label: "Find Showroom",
      href: "/showrooms",
    },
    {
      label: "Download Brochure",
      href: "/brochure",
    },
    {
      label: "FAQs",
      href: "/faqs",
    },
  ],
  legal: [
    {
      label: "Terms & Conditions",
      href: "/terms-conditions",
    },
    {
      label: "Privacy Policy",
      href: "/privacy-policy",
    },
    {
      label: "Cookies Policy",
      href: "/cookies",
    },
    {
      label: "Sitemap",
      href: "/sitemap.xml",
    },
  ],
};

// User Account Navigation
export const accountNavigation: NavLink[] = [
  {
    label: "Dashboard",
    href: "/my-account",
    icon: "LayoutDashboard",
  },
  {
    label: "My Profile",
    href: "/my-account/profile",
    icon: "User",
  },
  {
    label: "My Orders",
    href: "/my-account/orders",
    icon: "ShoppingBag",
  },
  {
    label: "My Appointments",
    href: "/my-account/appointments",
    icon: "Calendar",
  },
  {
    label: "Wishlist",
    href: "/my-account/wishlist",
    icon: "Heart",
  },
  {
    label: "Saved Designs",
    href: "/my-account/saved-designs",
    icon: "Bookmark",
  },
  {
    label: "Settings",
    href: "/my-account/settings",
    icon: "Settings",
  },
];

// Mobile Bottom Navigation (Optional)
export const mobileBottomNavigation: NavLink[] = [
  {
    label: "Home",
    href: "/",
    icon: "Home",
  },
  {
    label: "Kitchen",
    href: "/kitchen",
    icon: "ChefHat",
  },
  {
    label: "Bedroom",
    href: "/bedroom",
    icon: "Bed",
  },
  {
    label: "Offers",
    href: "/sale",
    icon: "Tag",
  },
  {
    label: "More",
    href: "/menu",
    icon: "Menu",
  },
];

// Breadcrumb Configuration
export const breadcrumbConfig = {
  "/": { label: "Home" },
  "/kitchen": { label: "Kitchen Collection" },
  "/bedroom": { label: "Bedroom Collection" },
  "/sale": { label: "Special Offers" },
  "/showrooms": { label: "Find a Showroom" },
  "/finance": { label: "Finance Options" },
  "/inspiration": { label: "Inspiration & Guide" },
  "/blog": { label: "Our Blog" },
  "/brochure": { label: "Download Brochure" },
  "/book-appointment": { label: "Book Consultation" },
  "/about": { label: "About Us" },
  "/our-process": { label: "Our Process" },
  "/why-choose-us": { label: "Why Choose Us" },
  "/contact": { label: "Contact Us" },
  "/media-wall": { label: "Media Wall" },
  "/my-account": { label: "My Account" },
};

// Quick Links (CTA Buttons)
export const quickLinks = {
  primary: {
    label: "Book Free Consultation",
    href: "/book-appointment",
  },
  secondary: {
    label: "Download Brochure",
    href: "/brochure",
  },
};

// Social Media Links
export const socialLinks = [
  {
    name: "Facebook",
    href: process.env.NEXT_PUBLIC_FACEBOOK_URL || "#",
    icon: "Facebook",
  },
  {
    name: "Instagram",
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#",
    icon: "Instagram",
  },
  {
    name: "Twitter",
    href: process.env.NEXT_PUBLIC_TWITTER_URL || "#",
    icon: "Twitter",
  },
  {
    name: "LinkedIn",
    href: process.env.NEXT_PUBLIC_LINKEDIN_URL || "#",
    icon: "Linkedin",
  },
];

// Help & Support Links
export const helpLinks: NavLink[] = [
  {
    label: "Help Center",
    href: "/help",
    icon: "HelpCircle",
  },
  {
    label: "Contact Support",
    href: "/contact",
    icon: "MessageCircle",
  },
  {
    label: "FAQs",
    href: "/faqs",
    icon: "FileQuestion",
  },
  {
    label: "Live Chat",
    href: "#",
    icon: "MessageSquare",
  },
];