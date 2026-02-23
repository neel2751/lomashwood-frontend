'use client'

import Head from "next/head"
import { usePathname } from "next/navigation"

import { siteConfig } from "@/config/site"

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  type?: "website" | "article" | "product"
  publishedTime?: string
  modifiedTime?: string
  author?: string
  noIndex?: boolean
  canonicalUrl?: string
}

export function SEOHead({
  title,
  description,
  keywords = [],
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  noIndex = false,
  canonicalUrl,
}: SEOHeadProps) {
  const pathname = usePathname()
  const currentUrl = `${siteConfig.url}${pathname}`
  
  const pageTitle = title 
    ? `${title} | ${siteConfig.name}` 
    : siteConfig.name
  const pageDescription = description || siteConfig.description
  const pageImage = image || `${siteConfig.url}/images/og-image.jpg`

  const siteKeywords = (siteConfig as any).keywords || []
  const pageKeywords = [...keywords, ...siteKeywords].join(", ")
  
  const canonical = canonicalUrl || currentUrl

  const twitterHandle = (siteConfig as any).twitter || 
                        siteConfig.socialHandles?.twitter || 
                        siteConfig.links?.twitter

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      {pageKeywords && <meta name="keywords" content={pageKeywords} />}
      {author && <meta name="author" content={author} />}
      
      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:image:alt" content={title || siteConfig.name} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:locale" content="en_US" />
      
      {/* Article Meta */}
      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === "article" && author && (
        <meta property="article:author" content={author} />
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
      {twitterHandle && (
        <meta name="twitter:site" content={twitterHandle} />
      )}
      
      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#ffffff" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      
      {/* Favicon */}
      <link rel="icon" href="/icons/favicon.ico" />
      <link rel="apple-touch-icon" sizes="192x192" href="/icons/icon-192.png" />
      <link rel="apple-touch-icon" sizes="512x512" href="/icons/icon-512.png" />
      
      {/* Manifest */}
      <link rel="manifest" href="/manifest.json" />
      
      {/* Additional Meta */}
      <meta name="format-detection" content="telephone=no" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
    </Head>
  )
}