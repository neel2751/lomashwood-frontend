import { SEOMetadata } from "@/types";

export const siteConfig = {
  name: "Lomash Wood",
  title: "Lomash Wood - Premium Kitchen & Bedroom Solutions",
  description:
    "Lomash Wood compares prices and promotions to ensure you'll always find a beautiful kitchen at our best possible price. Explore our premium kitchen and bedroom collections.",
  url: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  ogImage: "/images/og-image.jpg",
  links: {
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "#",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#",
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL || "#",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "#",
  },
  contact: {
    email: "info@lomashwood.com",
    phone: "+91 1234567890",
    address: "123 Wood Street, Ahmedabad, Gujarat, India",
  },
  socialHandles: {
    twitter: "@lomashwood",
    instagram: "@lomashwood",
  },
};

export const defaultSEO: SEOMetadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  ogImage: siteConfig.ogImage,
  ogType: "website",
  keywords: [
    "kitchen design",
    "bedroom design",
    "custom kitchens",
    "modular kitchen",
    "fitted bedroom",
    "kitchen renovation",
    "bedroom furniture",
    "interior design",
    "home improvement",
    "lomash wood",
  ],
};

export const pageSEO = {
  home: {
    title: "Lomash Wood - Premium Kitchen & Bedroom Design",
    description:
      "Transform your home with Lomash Wood's premium kitchen and bedroom solutions. Best prices guaranteed with expert design consultation.",
    keywords: [
      "kitchen design",
      "bedroom design",
      "home renovation",
      "modular kitchen",
    ],
  },
  kitchen: {
    title: "Kitchen Collection - Lomash Wood",
    description:
      "Explore our stunning kitchen collection. From modern to classic designs, find your perfect kitchen at the best price.",
    keywords: [
      "kitchen collection",
      "modular kitchen",
      "kitchen designs",
      "fitted kitchen",
    ],
  },
  bedroom: {
    title: "Bedroom Collection - Lomash Wood",
    description:
      "Discover beautiful bedroom designs that combine style and functionality. Premium fitted bedrooms at competitive prices.",
    keywords: [
      "bedroom collection",
      "fitted bedroom",
      "bedroom furniture",
      "wardrobe designs",
    ],
  },
  sale: {
    title: "Special Offers - Lomash Wood",
    description:
      "Don't miss out on our exclusive kitchen and bedroom offers. Limited time deals on premium products.",
    keywords: ["kitchen offers", "bedroom sale", "discount", "promotions"],
  },
  finance: {
    title: "Finance Options - Lomash Wood",
    description:
      "Flexible finance options to help you create your dream kitchen or bedroom. Affordable payment plans available.",
    keywords: ["kitchen finance", "payment plans", "flexible payment", "EMI"],
  },
  showrooms: {
    title: "Find a Showroom - Lomash Wood",
    description:
      "Visit our showrooms to experience our products firsthand. Find your nearest Lomash Wood showroom.",
    keywords: ["showroom", "visit", "store location", "near me"],
  },
  blog: {
    title: "Blog & Inspiration - Lomash Wood",
    description:
      "Get inspired with our latest design ideas, tips, and trends for kitchens and bedrooms.",
    keywords: ["design ideas", "inspiration", "tips", "trends", "blog"],
  },
  about: {
    title: "About Us - Lomash Wood",
    description:
      "Learn about Lomash Wood's commitment to quality, craftsmanship, and customer satisfaction.",
    keywords: ["about us", "company", "quality", "craftsmanship"],
  },
  contact: {
    title: "Contact Us - Lomash Wood",
    description:
      "Get in touch with our team for expert advice and consultation. We're here to help bring your vision to life.",
    keywords: ["contact", "support", "consultation", "help"],
  },
  bookAppointment: {
    title: "Book Free Consultation - Lomash Wood",
    description:
      "Book your free consultation today. Choose from home visit, online consultation, or showroom visit.",
    keywords: [
      "book consultation",
      "free consultation",
      "appointment",
      "design consultation",
    ],
  },
  brochure: {
    title: "Download Brochure - Lomash Wood",
    description:
      "Download our latest brochure to explore our complete range of kitchen and bedroom products.",
    keywords: ["brochure", "catalogue", "download", "product range"],
  },
  ourProcess: {
    title: "Our Process - Lomash Wood",
    description:
      "Discover our simple 4-step process from consultation to installation. Quality guaranteed every step of the way.",
    keywords: ["process", "how it works", "steps", "installation"],
  },
  whyChooseUs: {
    title: "Why Choose Us - Lomash Wood",
    description:
      "Best price guarantee, expert design team, premium quality, and 10-year warranty. Discover why customers choose Lomash Wood.",
    keywords: [
      "why choose us",
      "benefits",
      "warranty",
      "quality",
      "price guarantee",
    ],
  },
} as const;

export type PageSEOKey = keyof typeof pageSEO;