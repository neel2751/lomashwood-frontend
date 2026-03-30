"use client"

import { usePathname, useSearchParams } from "next/navigation"
import Script from "next/script"
import { useEffect } from "react"

interface AnalyticsProps {
  googleAnalyticsId?: string
  facebookPixelId?: string
}

export function Analytics({
  googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID,
  facebookPixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || process.env.NEXT_PUBLIC_FB_PIXEL_ID,
}: AnalyticsProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      trackPageView(pathname)
    }
  }, [pathname, searchParams])

  const trackPageView = (url: string) => {
    if (googleAnalyticsId && typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("config", googleAnalyticsId, {
        page_path: url,
      })
    }

    if (facebookPixelId && typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "PageView")
    }
  }

  return (
    <>
      {/* Google Analytics */}
      {googleAnalyticsId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAnalyticsId}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

      {/* Facebook Pixel */}
      {facebookPixelId && (
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${facebookPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  )
}

export const analyticsEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window !== "undefined") {
    if ((window as any).gtag) {
      (window as any).gtag("event", eventName, eventParams)
    }

    if ((window as any).fbq) {
      (window as any).fbq("track", eventName, eventParams)
    }
  }
}

export const trackEvent = {
  productView: (productId: string, productName: string, category: string) => {
    analyticsEvent("view_item", {
      item_id: productId,
      item_name: productName,
      item_category: category,
    })
  },
  
  addToWishlist: (productId: string, productName: string) => {
    analyticsEvent("add_to_wishlist", {
      item_id: productId,
      item_name: productName,
    })
  },
  
  bookAppointment: (appointmentType: string) => {
    analyticsEvent("book_appointment", {
      appointment_type: appointmentType,
    })
  },
  
  submitForm: (formName: string) => {
    analyticsEvent("form_submit", {
      form_name: formName,
    })
  },
  
  search: (searchTerm: string) => {
    analyticsEvent("search", {
      search_term: searchTerm,
    })
  },
  
  clickCTA: (ctaName: string, location: string) => {
    analyticsEvent("cta_click", {
      cta_name: ctaName,
      location,
    })
  },
}