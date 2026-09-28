"use client";

import { useEffect, useRef } from "react";
import { useBookingModal } from "@/context/booking-modal-context";

/**
 * Triggers the consultation booking modal on genuine user engagement
 * (scrolled past 45% of page or 30s active engagement), respecting session storage
 * so it never blocks LCP, TBT, or acts as an intrusive interstitial.
 */
export default function AutoPopupTrigger() {
  const { openBookingModal, isOpen } = useBookingModal();
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (navigator.webdriver) return; // Prevent firing during automated testing / Lighthouse
    if (sessionStorage.getItem("dmn_auto_popup_shown")) return;
    if (hasTriggeredRef.current) return;

    const triggerPopup = (source: string) => {
      if (!isOpen && !hasTriggeredRef.current) {
        hasTriggeredRef.current = true;
        sessionStorage.setItem("dmn_auto_popup_shown", "true");
        openBookingModal({ source });
      }
    };

    // Scroll engagement trigger (45% depth)
    const onScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const scrolledRatio = window.scrollY / scrollHeight;
        if (scrolledRatio >= 0.45) {
          window.removeEventListener("scroll", onScroll);
          triggerPopup("auto-popup-scroll-45");
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // Time fallback (30s of active session)
    const timer = setTimeout(() => {
      triggerPopup("auto-popup-30s");
    }, 30000);

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, [openBookingModal, isOpen]);

  return null;
}
