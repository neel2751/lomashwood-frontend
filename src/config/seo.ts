import type { Metadata } from "next";

// Base SEO Configuration
export const seoConfig = {
  title: {
    default: "Lomash Wood - Premium Wooden Furniture & Home Decor",
    template: "%s | Lomash Wood",
  },
  description:
    "Discover exquisite handcrafted wooden furniture and home decor at Lomash Wood. Premium quality teak, sheesham, and mango wood products with timeless designs for your home.",
  keywords: [
    "wooden furniture",
    "teak furniture",
    "sheesham furniture",
    "mango wood furniture",
    "handcrafted furniture",
    "home decor",
    "wooden dining table",
    "wooden bed",
    "wooden sofa",
    "wooden wardrobe",
    "solid wood furniture",
    "premium furniture",
    "luxury furniture",
    "sustainable furniture",
    "eco-friendly furniture",
    "custom furniture",
    "traditional furniture",
    "modern furniture",
    "furniture showroom",
    "furniture store",
  ],
  authors: [
    {
      name: "Lomash Wood",
      url: process.env.NEXT_PUBLIC_APP_URL,
    },
  ],
  creator: "Lomash Wood",
  publisher: "Lomash Wood",
  applicationName: "Lomash Wood",
  referrer: "origin-when-cross-origin" as const,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large" as const,
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website" as const,
    locale: "en_IN",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "Lomash Wood",
    title: "Lomash Wood - Premium Wooden Furniture & Home Decor",
    description:
      "Discover exquisite handcrafted wooden furniture and home decor at Lomash Wood. Premium quality teak, sheesham, and mango wood products with timeless designs.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Lomash Wood - Premium Wooden Furniture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image" as const,
    site: "@lomashwood",
    creator: "@lomashwood",
    title: "Lomash Wood - Premium Wooden Furniture & Home Decor",
    description:
      "Discover exquisite handcrafted wooden furniture and home decor at Lomash Wood.",
    images: [`${process.env.NEXT_PUBLIC_APP_URL}/images/twitter-image.jpg`],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#2D5016",
      },
    ],
  },
  manifest: "/site.webmanifest",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2D5016" },
    { media: "(prefers-color-scheme: dark)", color: "#2D5016" },
  ],
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    bing: process.env.NEXT_PUBLIC_BING_VERIFICATION,
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL,
    languages: {
      "en-IN": process.env.NEXT_PUBLIC_APP_URL,
    },
  },
  category: "furniture",
};

// Default Metadata
export const defaultMetadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: seoConfig.title,
  description: seoConfig.description,
  keywords: seoConfig.keywords,
  authors: seoConfig.authors,
  creator: seoConfig.creator,
  publisher: seoConfig.publisher,
  applicationName: seoConfig.applicationName,
  referrer: seoConfig.referrer,
  robots: seoConfig.robots,
  openGraph: seoConfig.openGraph,
  twitter: seoConfig.twitter,
  icons: seoConfig.icons,
  manifest: seoConfig.manifest,
  themeColor: seoConfig.themeColor,
  verification: seoConfig.verification,
  alternates: seoConfig.alternates,
  category: seoConfig.category,
};

// Page-specific SEO configurations
export const pageSEO = {
  home: {
    title: "Premium Wooden Furniture & Home Decor - Lomash Wood",
    description:
      "Shop premium handcrafted wooden furniture online. Explore our collection of teak, sheesham, and mango wood dining tables, beds, sofas, wardrobes & more. Free shipping available.",
    keywords: [
      "buy wooden furniture online",
      "wooden furniture store",
      "handcrafted furniture India",
      "premium wood furniture",
    ],
  },
  products: {
    title: "Wooden Furniture Collection",
    description:
      "Browse our extensive collection of premium wooden furniture. Find the perfect pieces for your home including dining sets, bedroom furniture, living room furniture, and more.",
    keywords: [
      "wooden furniture catalog",
      "furniture collection",
      "buy furniture online",
    ],
  },
  about: {
    title: "About Us - Our Story & Craftsmanship",
    description:
      "Learn about Lomash Wood's journey in creating premium handcrafted wooden furniture. Discover our commitment to quality, sustainability, and traditional craftsmanship.",
    keywords: [
      "about lomash wood",
      "furniture craftsmen",
      "sustainable furniture",
    ],
  },
  contact: {
    title: "Contact Us - Get in Touch",
    description:
      "Have questions about our wooden furniture? Contact Lomash Wood today. Visit our showrooms, call us, or send a message. We're here to help you find the perfect furniture.",
    keywords: [
      "contact furniture store",
      "furniture showroom",
      "customer support",
    ],
  },
  blog: {
    title: "Furniture Blog - Tips, Trends & Care Guides",
    description:
      "Discover expert tips on furniture care, interior design trends, and home decor ideas. Read the Lomash Wood blog for inspiration and guidance.",
    keywords: [
      "furniture blog",
      "interior design tips",
      "furniture care guide",
    ],
  },
  showrooms: {
    title: "Our Showrooms - Visit Us",
    description:
      "Visit our Lomash Wood showrooms to experience our premium furniture collection in person. Find locations, hours, and book appointments.",
    keywords: ["furniture showroom", "visit furniture store", "furniture near me"],
  },
  cart: {
    title: "Shopping Cart",
    description: "Review your selected items and proceed to checkout.",
    keywords: [],
    robots: {
      index: false,
      follow: false,
    },
  },
  checkout: {
    title: "Checkout",
    description: "Complete your purchase securely.",
    keywords: [],
    robots: {
      index: false,
      follow: false,
    },
  },
  account: {
    title: "My Account",
    description: "Manage your account, orders, and preferences.",
    keywords: [],
    robots: {
      index: false,
      follow: false,
    },
  },
};

// Structured Data Schemas
export const structuredData = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Lomash Wood",
    url: process.env.NEXT_PUBLIC_APP_URL,
    logo: `${process.env.NEXT_PUBLIC_APP_URL}/images/logo.png`,
    description: seoConfig.description,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-1234567890",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      "https://www.facebook.com/lomashwood",
      "https://www.instagram.com/lomashwood",
      "https://twitter.com/lomashwood",
      "https://www.linkedin.com/company/lomashwood",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Furniture Street",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      postalCode: "400001",
      addressCountry: "IN",
    },
  },
  localBusiness: {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    name: "Lomash Wood",
    image: `${process.env.NEXT_PUBLIC_APP_URL}/images/store.jpg`,
    "@id": process.env.NEXT_PUBLIC_APP_URL,
    url: process.env.NEXT_PUBLIC_APP_URL,
    telephone: "+91-1234567890",
    priceRange: "₹₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Furniture Street",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      postalCode: "400001",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 19.076,
      longitude: 72.8777,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "10:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "11:00",
        closes: "18:00",
      },
    ],
  },
  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Lomash Wood",
    url: process.env.NEXT_PUBLIC_APP_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${process.env.NEXT_PUBLIC_APP_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  },
  breadcrumbList: (items: { name: string; url: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }),
  product: (product: {
    name: string;
    description: string;
    image: string;
    price: number;
    currency: string;
    availability: string;
    sku?: string;
    brand?: string;
    category?: string;
    rating?: number;
    reviewCount?: number;
  }) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: product.brand || "Lomash Wood",
    },
    offers: {
      "@type": "Offer",
      url: `${process.env.NEXT_PUBLIC_APP_URL}/products/${product.sku}`,
      priceCurrency: product.currency,
      price: product.price,
      availability: `https://schema.org/${product.availability}`,
      seller: {
        "@type": "Organization",
        name: "Lomash Wood",
      },
    },
    aggregateRating: product.rating
      ? {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.reviewCount || 0,
        }
      : undefined,
    category: product.category,
  }),
  blogPosting: (post: {
    title: string;
    description: string;
    image: string;
    datePublished: string;
    dateModified?: string;
    author: string;
    url: string;
  }) => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Lomash Wood",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_APP_URL}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": post.url,
    },
  }),
  faqPage: (faqs: { question: string; answer: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }),
};

// Helper function to generate page metadata
export function generatePageMetadata(
  page: keyof typeof pageSEO,
  customData?: Partial<Metadata>
): Metadata {
  const pageConfig = pageSEO[page];
  
  return {
    ...defaultMetadata,
    title: pageConfig.title,
    description: pageConfig.description,
    keywords: [...(seoConfig.keywords || []), ...(pageConfig.keywords || [])],
    robots: 'robots' in pageConfig ? pageConfig.robots : defaultMetadata.robots,
    openGraph: {
      ...seoConfig.openGraph,
      title: pageConfig.title,
      description: pageConfig.description,
    },
    twitter: {
      ...seoConfig.twitter,
      title: pageConfig.title,
      description: pageConfig.description,
    },
    ...customData,
  };
}

// Helper function to generate product metadata
export function generateProductMetadata(product: {
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
}): Metadata {
  return {
    ...defaultMetadata,
    title: `${product.name} - ${product.category}`,
    description: product.description,
    openGraph: {
      type: "website",
      locale: seoConfig.openGraph.locale,
      url: seoConfig.openGraph.url,
      siteName: seoConfig.openGraph.siteName,
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      ...seoConfig.twitter,
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}

// Helper function to generate blog post metadata
export function generateBlogPostMetadata(post: {
  title: string;
  excerpt: string;
  image: string;
  author: string;
  publishedAt: string;
  category: string;
}): Metadata {
  return {
    ...defaultMetadata,
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      ...seoConfig.openGraph,
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      ...seoConfig.twitter,
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default seoConfig;