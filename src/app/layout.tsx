import type { Metadata } from "next";
import { Figtree, Poppins } from "next/font/google";
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Suspense } from "react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Analytics } from "@/components/shared/Analytics";
import { siteConfig, defaultSEO } from "@/config/site";
import { Providers } from "@/providers/Providers";
import "@/styles/globals.css";

const facebookPixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || process.env.NEXT_PUBLIC_FB_PIXEL_ID || "";

const figtree = Figtree({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url || 'http://localhost:3000'),
  title: {
    default: defaultSEO.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: defaultSEO.description,
  keywords: defaultSEO.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    title: defaultSEO.title,
    description: defaultSEO.description,
    siteName: siteConfig.name,
    images: [
      {
        url: defaultSEO.ogImage || `/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultSEO.title,
    description: defaultSEO.description,
    images: [defaultSEO.ogImage || `/images/og-image.jpg`],
    creator: siteConfig.socialHandles.twitter,
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
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${figtree.className} ${poppins.variable}`}>
      <body className="font-sans antialiased m-0 p-0">
        <Suspense fallback={null}>
          <Analytics facebookPixelId={facebookPixelId} />
        </Suspense>
        {facebookPixelId && (
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${facebookPixelId}&ev=PageView&noscript=1`}
            />
          </noscript>
        )}
        <NuqsAdapter>
          <Providers>
            <div className="flex flex-col min-h-[100dvh] w-full mx-w-full overflow-x-hidden">
              <Header />
              <main className="flex-1 w-full">{children}</main>
              <Footer />
            </div>
          </Providers>
        </NuqsAdapter>
      </body>
    </html>
  );
}