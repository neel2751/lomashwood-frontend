"use client";

import { useEffect } from "react";

const HOME_SCROLL_POSITION_KEY = "home-scroll-position";
const HOME_SCROLL_RESTORE_PENDING_KEY = "home-scroll-restore-pending";
const HOME_SCROLL_SECTION_KEY = "home-scroll-section";

export function markHomeScrollForRestore(sectionId?: string) {
  if (typeof window === "undefined") return;

  sessionStorage.setItem(HOME_SCROLL_POSITION_KEY, String(window.scrollY));
  if (sectionId) {
    sessionStorage.setItem(HOME_SCROLL_SECTION_KEY, sectionId);
  }
  sessionStorage.setItem(HOME_SCROLL_RESTORE_PENDING_KEY, "1");
}

export default function HomeScrollRestore() {
  useEffect(() => {
    const pending = sessionStorage.getItem(HOME_SCROLL_RESTORE_PENDING_KEY);
    const storedY = sessionStorage.getItem(HOME_SCROLL_POSITION_KEY);
    const sectionId = sessionStorage.getItem(HOME_SCROLL_SECTION_KEY);

    if (pending !== "1" || !storedY) return;

    const targetY = Number.parseInt(storedY, 10);
    if (Number.isNaN(targetY)) {
      sessionStorage.removeItem(HOME_SCROLL_POSITION_KEY);
      sessionStorage.removeItem(HOME_SCROLL_RESTORE_PENDING_KEY);
      return;
    }

    let attempts = 0;
    const maxAttempts = 30;

    const restoreUntilSettled = () => {
      attempts += 1;

      const sectionElement = sectionId ? document.getElementById(sectionId) : null;

      if (sectionElement) {
        const sectionTop = Math.max(0, sectionElement.getBoundingClientRect().top + window.scrollY - 92);
        window.scrollTo({ top: sectionTop, behavior: "auto" });
      } else {
        window.scrollTo({ top: targetY, behavior: "auto" });
      }

      const targetTop = sectionId
        ? (() => {
            const node = document.getElementById(sectionId);
            if (!node) return targetY;
            return Math.max(0, node.getBoundingClientRect().top + window.scrollY - 92);
          })()
        : targetY;

      const reached = Math.abs(window.scrollY - targetTop) <= 8;
      const timedOut = attempts >= maxAttempts;

      if (reached || timedOut) {
        sessionStorage.removeItem(HOME_SCROLL_RESTORE_PENDING_KEY);
        if (reached) {
          sessionStorage.removeItem(HOME_SCROLL_SECTION_KEY);
        }
        return;
      }

      requestAnimationFrame(() => {
        setTimeout(restoreUntilSettled, 80);
      });
    };

    requestAnimationFrame(() => {
      restoreUntilSettled();
    });
  }, []);

  return null;
}
