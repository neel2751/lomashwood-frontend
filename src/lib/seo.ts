import type { Metadata } from "next";

// ============================================================================
// SITE CONFIGURATION
// ============================================================================

export const siteConfig = {
  name: "Lomash Wood",
  title: "Lomash Wood - Premium Wooden Furniture & Products",
  description:
    "Discover premium wooden furniture and products crafted with excellence. Lomash Wood offers high-quality wooden furniture, home decor, and custom woodwork solutions.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://lomashwood.com",
  ogImage: "/images/og-image.jpg",
  twitterHandle: "@lomashwood",
  creator: "Lomash Wood",
  keywords: [
    "wooden furniture",
    "premium furniture",
    "custom woodwork",
    "home decor",
    "wooden products",
    "furniture manufacturer",
    "solid wood furniture",
    "handcrafted furniture",
    "luxury furniture",
    "eco-friendly furniture",
  ],
  authors: [
    {
      name: "Lomash Wood",
      url: process.env.NEXT_PUBLIC_SITE_URL || "https://lomashwood.com",
    },
  ],
  locale: "en_US",
  type: "website",
};

export const companyInfo = {
  name: "Lomash Wood",
  legalName: "Lomash Wood Industries",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@lomashwood.com",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+91-XXXXXXXXXX",
  address: {
    streetAddress: "Your Street Address",
    addressLocality: "Your City",
    addressRegion: "Your State",
    postalCode: "000000",
    addressCountry: "IN",
  },
  social: {
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://facebook.com/lomashwood",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/lomashwood",
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL || "https://twitter.com/lomashwood",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com/company/lomashwood",
  },
};

// ============================================================================
// DEFAULT METADATA
// ============================================================================

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitterHandle,
    site: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
      },
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: siteConfig.url,
  },
};

// ============================================================================
// METADATA GENERATORS
// ============================================================================

interface PageSEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
}

export function generatePageMetadata({
  title,
  description,
  path = "",
  image,
  keywords,
  type = "website",
  publishedTime,
  modifiedTime,
  noindex = false,
}: PageSEOProps): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image || siteConfig.ogImage;

  const baseOpenGraph = {
    locale: siteConfig.locale,
    url,
    title,
    description,
    siteName: siteConfig.name,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  };

  return {
    title,
    description,
    keywords: keywords || siteConfig.keywords,
    alternates: {
      canonical: url,
    },
    openGraph:
      type === "article"
        ? {
            ...baseOpenGraph,
            type: "article",
            publishedTime,
            modifiedTime,
          }
        : {
            ...baseOpenGraph,
            type: "website",
          },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: siteConfig.twitterHandle,
      site: siteConfig.twitterHandle,
    },
    robots: noindex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
  };
}

interface ProductSEOProps {
  title: string;
  description: string;
  image: string;
  price?: number;
  currency?: string;
  availability?: "in stock" | "out of stock" | "preorder";
  brand?: string;
  sku?: string;
  category?: string;
}

export function generateProductMetadata({
  title,
  description,
  image,
}: ProductSEOProps): Metadata {
  return {
    title,
    description,
    openGraph: {
      type: "website",
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

// ============================================================================
// JSON-LD SCHEMA GENERATORS
// ============================================================================

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: companyInfo.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo.png`,
    description: siteConfig.description,
    email: companyInfo.email,
    telephone: companyInfo.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: companyInfo.address.streetAddress,
      addressLocality: companyInfo.address.addressLocality,
      addressRegion: companyInfo.address.addressRegion,
      postalCode: companyInfo.address.postalCode,
      addressCountry: companyInfo.address.addressCountry,
    },
    sameAs: [
      companyInfo.social.facebook,
      companyInfo.social.instagram,
      companyInfo.social.twitter,
      companyInfo.social.linkedin,
    ],
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      "@type": "Organization",
      name: companyInfo.legalName,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

export function generateProductSchema({
  name,
  description,
  image,
  price,
  currency = "INR",
  availability = "InStock",
  brand = siteConfig.name,
  sku,
  category,
  rating,
  reviewCount,
}: {
  name: string;
  description: string;
  image: string;
  price: number;
  currency?: string;
  availability?: "InStock" | "OutOfStock" | "PreOrder";
  brand?: string;
  sku?: string;
  category?: string;
  rating?: number;
  reviewCount?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    ...(sku && { sku }),
    ...(category && { category }),
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: currency,
      availability: `https://schema.org/${availability}`,
      url: siteConfig.url,
    },
    ...(rating &&
      reviewCount && {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: rating,
          reviewCount,
        },
      }),
  };
}

export function generateArticleSchema({
  title,
  description,
  image,
  datePublished,
  dateModified,
  authorName = siteConfig.name,
}: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: companyInfo.legalName,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/images/logo.png`,
      },
    },
  };
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: companyInfo.legalName,
    image: `${siteConfig.url}/images/logo.png`,
    "@id": siteConfig.url,
    url: siteConfig.url,
    telephone: companyInfo.phone,
    email: companyInfo.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: companyInfo.address.streetAddress,
      addressLocality: companyInfo.address.addressLocality,
      addressRegion: companyInfo.address.addressRegion,
      postalCode: companyInfo.address.postalCode,
      addressCountry: companyInfo.address.addressCountry,
    },
    priceRange: "₹₹₹",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
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
  };
}

