export interface CookiePreferences {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
}

const CONSENT_KEY = "cookie-consent";

export const CONSENT_CHANGE_EVENT = "cookie-consent-change";
export const OPEN_COOKIE_SETTINGS_EVENT = "open-cookie-settings";

export function readCookieConsent(): CookiePreferences | null {
  if (typeof window === "undefined") return null;

  try {
    const saved = localStorage.getItem(CONSENT_KEY);
    if (!saved) return null;

    const parsed = JSON.parse(saved);
    return {
      necessary: true,
      analytics: parsed.analytics === true,
      marketing: parsed.marketing === true,
    };
  } catch {
    return null;
  }
}

export function saveCookieConsent(preferences: CookiePreferences) {
  localStorage.setItem(CONSENT_KEY, JSON.stringify(preferences));
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: preferences }));
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT));
}
