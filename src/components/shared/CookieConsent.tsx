"use client"

import { X } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"


interface CookieConsentProps {
  className?: string
}

export function CookieConsent({ className }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  })
  const [showPreferences, setShowPreferences] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setIsVisible(true)
    } else {
      try {
        const savedPreferences = JSON.parse(consent)
        setPreferences(savedPreferences)
        applyConsent(savedPreferences)
      } catch (error) {
        setIsVisible(true)
      }
    }
  }, [])

  const applyConsent = (prefs: typeof preferences) => {
    if (prefs.analytics) {
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("consent", "update", {
          analytics_storage: "granted",
        })
      }
    }

    if (prefs.marketing) {
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("consent", "update", {
          ad_storage: "granted",
        })
      }
    }
  }

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    }
    localStorage.setItem("cookie-consent", JSON.stringify(allAccepted))
    setPreferences(allAccepted)
    applyConsent(allAccepted)
    setIsVisible(false)
  }

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
    }
    localStorage.setItem("cookie-consent", JSON.stringify(onlyNecessary))
    setPreferences(onlyNecessary)
    applyConsent(onlyNecessary)
    setIsVisible(false)
  }

  const handleSavePreferences = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(preferences))
    applyConsent(preferences)
    setIsVisible(false)
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom-5",
        className
      )}
    >
      <Card className="mx-auto max-w-4xl border-2 shadow-xl">
        <div className="relative p-6">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
          </Button>

          {!showPreferences ? (
            <div className="space-y-4">
              <div className="pr-8">
                <h3 className="mb-2 text-lg font-semibold">
                  We value your privacy
                </h3>
                <p className="text-sm text-muted-foreground">
                  We use cookies to enhance your browsing experience, serve
                  personalized content, and analyze our traffic. By clicking
                  "Accept All", you consent to our use of cookies.{" "}
                  <Link
                    href="/cookies"
                    className="underline hover:text-foreground"
                  >
                    Learn more
                  </Link>
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowPreferences(true)}
                  className="w-full sm:w-auto"
                >
                  Customize
                </Button>
                <Button
                  variant="outline"
                  onClick={handleRejectAll}
                  className="w-full sm:w-auto"
                >
                  Reject All
                </Button>
                <Button
                  onClick={handleAcceptAll}
                  className="w-full sm:w-auto"
                >
                  Accept All
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="pr-8">
                <h3 className="mb-2 text-lg font-semibold">
                  Cookie Preferences
                </h3>
                <p className="text-sm text-muted-foreground">
                  Choose which cookies you want to accept. You can change your
                  preferences at any time.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex-1">
                    <h4 className="font-medium">Necessary Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Required for the website to function properly.
                    </p>
                  </div>
                  <div className="ml-4 text-sm font-medium text-muted-foreground">
                    Always Active
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex-1">
                    <h4 className="font-medium">Analytics Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Help us understand how visitors interact with our website.
                    </p>
                  </div>
                  <label className="relative ml-4 inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) =>
                        setPreferences((prev) => ({
                          ...prev,
                          analytics: e.target.checked,
                        }))
                      }
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-ring peer-focus:ring-offset-2" />
                  </label>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex-1">
                    <h4 className="font-medium">Marketing Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Used to deliver personalized advertisements.
                    </p>
                  </div>
                  <label className="relative ml-4 inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) =>
                        setPreferences((prev) => ({
                          ...prev,
                          marketing: e.target.checked,
                        }))
                      }
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-ring peer-focus:ring-offset-2" />
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowPreferences(false)}
                  className="w-full sm:w-auto"
                >
                  Back
                </Button>
                <Button
                  onClick={handleSavePreferences}
                  className="w-full sm:w-auto"
                >
                  Save Preferences
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}