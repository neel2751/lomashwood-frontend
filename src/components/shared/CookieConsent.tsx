"use client"

import { Cookie } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import {
  OPEN_COOKIE_SETTINGS_EVENT,
  openCookieSettings,
  readCookieConsent,
  saveCookieConsent,
} from "@/lib/cookie-consent"
import type { CookiePreferences } from "@/lib/cookie-consent"
import { cn } from "@/lib/utils"


interface CookieConsentProps {
  className?: string
}

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
}

const toggleClassName =
  "peer h-6 w-11 rounded-full bg-lomash-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-lomash-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-lomash-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-lomash-primary peer-focus-visible:ring-offset-2"

export function CookieConsent({ className }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences)
  const [showPreferences, setShowPreferences] = useState(false)

  useEffect(() => {
    const saved = readCookieConsent()
    if (saved) {
      setPreferences(saved)
    } else {
      setIsVisible(true)
    }

    const handleOpen = () => {
      setPreferences(readCookieConsent() ?? defaultPreferences)
      setShowPreferences(true)
      setIsVisible(true)
    }

    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, handleOpen)
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, handleOpen)
  }, [])

  const save = (prefs: CookiePreferences) => {
    saveCookieConsent(prefs)
    setPreferences(prefs)
    setShowPreferences(false)
    setIsVisible(false)
  }

  const handleAcceptAll = () => save({ necessary: true, analytics: true, marketing: true })
  const handleRejectAll = () => save({ necessary: true, analytics: false, marketing: false })
  const handleSavePreferences = () => save(preferences)

  if (!isVisible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom-5",
        className
      )}
    >
      <div className="mx-auto max-w-4xl max-h-[85dvh] overflow-y-auto rounded-lg border border-lomash-gray-200 border-t-4 border-t-lomash-primary bg-white shadow-2xl">
        <div className="p-5 md:p-6">
          {!showPreferences ? (
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
              <div className="flex flex-1 items-start gap-4">
                <div className="hidden h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-lomash-primary to-lomash-secondary shadow-lg sm:flex">
                  <Cookie className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-bold text-lomash-dark">
                    We value your privacy
                  </h3>
                  <p className="text-sm leading-relaxed text-lomash-gray-600">
                    We use cookies to keep our website working and, with your
                    permission, to understand how it is used and to measure our
                    advertising. You can accept all cookies, reject the optional
                    ones, or choose which to allow.{" "}
                    <Link
                      href="/cookies"
                      className="font-medium text-lomash-secondary underline hover:text-lomash-primary"
                    >
                      Cookie Policy
                    </Link>
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:justify-end lg:flex-shrink-0">
                <Button
                  variant="ghost"
                  onClick={() => setShowPreferences(true)}
                  className="w-full text-lomash-dark sm:w-auto"
                >
                  Customise
                </Button>
                <Button
                  variant="outline"
                  onClick={handleRejectAll}
                  className="w-full border-lomash-dark text-lomash-dark hover:bg-lomash-dark hover:text-white sm:w-auto"
                >
                  Reject All
                </Button>
                <Button
                  onClick={handleAcceptAll}
                  className="w-full bg-lomash-primary text-white hover:bg-lomash-accent sm:w-auto"
                >
                  Accept All
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="mb-1 text-lg font-bold text-lomash-dark">
                  Cookie Preferences
                </h3>
                <p className="text-sm text-lomash-gray-600">
                  Choose which cookies you want to allow. You can change your
                  preferences at any time from the Cookie Settings link at the
                  bottom of the page.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg border border-lomash-gray-200 bg-lomash-gray-50 p-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lomash-dark">Necessary Cookies</h4>
                    <p className="text-sm text-lomash-gray-600">
                      Required for the website to work, such as keeping you signed in.
                    </p>
                  </div>
                  <div className="ml-4 text-sm font-medium text-lomash-secondary">
                    Always Active
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-lomash-gray-200 p-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lomash-dark">Analytics Cookies</h4>
                    <p className="text-sm text-lomash-gray-600">
                      Help us understand how visitors use our website.
                    </p>
                  </div>
                  <label className="relative ml-4 inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      aria-label="Analytics cookies"
                      checked={preferences.analytics}
                      onChange={(e) =>
                        setPreferences((prev) => ({
                          ...prev,
                          analytics: e.target.checked,
                        }))
                      }
                      className="peer sr-only"
                    />
                    <div className={toggleClassName} />
                  </label>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-lomash-gray-200 p-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lomash-dark">Marketing Cookies</h4>
                    <p className="text-sm text-lomash-gray-600">
                      Used to measure our advertising and show you more relevant adverts.
                    </p>
                  </div>
                  <label className="relative ml-4 inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      aria-label="Marketing cookies"
                      checked={preferences.marketing}
                      onChange={(e) =>
                        setPreferences((prev) => ({
                          ...prev,
                          marketing: e.target.checked,
                        }))
                      }
                      className="peer sr-only"
                    />
                    <div className={toggleClassName} />
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                <Button
                  variant="outline"
                  onClick={handleRejectAll}
                  className="w-full border-lomash-dark text-lomash-dark hover:bg-lomash-dark hover:text-white sm:w-auto"
                >
                  Reject All
                </Button>
                <Button
                  onClick={handleSavePreferences}
                  className="w-full bg-lomash-primary text-white hover:bg-lomash-accent sm:w-auto"
                >
                  Save Preferences
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      Cookie Settings
    </button>
  )
}
