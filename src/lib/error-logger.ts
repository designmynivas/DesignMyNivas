"use client";

export interface SiteErrorItem {
  id: string;
  message: string;
  source?: string;
  stack?: string;
  timestamp: string;
  severity: "error" | "warning";
}

const STORAGE_KEY = "dmn_website_errors_log";
const listeners: Array<(errors: SiteErrorItem[]) => void> = [];

/**
 * Returns all logged site errors
 */
export function getSiteErrors(): SiteErrorItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

/**
 * Logs a new site error
 */
export function logSiteError(
  error: Error | string,
  source?: string,
  severity: "error" | "warning" = "error"
): void {
  if (typeof window === "undefined") return;

  try {
    const existing = getSiteErrors();
    const message = typeof error === "string" ? error : error.message || "Unknown error";
    const stack = typeof error !== "string" && error.stack ? error.stack : undefined;

    const newItem: SiteErrorItem = {
      id: `err_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      message,
      source: source || (typeof window !== "undefined" ? window.location.pathname : "System"),
      stack,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      severity,
    };

    // Keep last 25 errors
    const updated = [newItem, ...existing].slice(0, 25);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Notify listeners
    listeners.forEach((fn) => fn(updated));
  } catch (e) {
    console.error("Failed to log site error:", e);
  }
}

/**
 * Clears all logged site errors
 */
export function clearSiteErrors(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    listeners.forEach((fn) => fn([]));
  } catch (e) {
    console.error("Failed to clear site errors:", e);
  }
}

/**
 * Subscribe to error changes
 */
export function subscribeToSiteErrors(
  callback: (errors: SiteErrorItem[]) => void
): () => void {
  listeners.push(callback);
  return () => {
    const idx = listeners.indexOf(callback);
    if (idx !== -1) listeners.splice(idx, 1);
  };
}

/**
 * Setup global window error listeners once
 */
let isListenerAttached = false;
export function initGlobalErrorCapture(): void {
  if (typeof window === "undefined" || isListenerAttached) return;
  isListenerAttached = true;

  window.addEventListener("error", (event) => {
    logSiteError(event.error || event.message, event.filename || window.location.pathname);
  });

  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason instanceof Error ? event.reason.message : String(event.reason);
    logSiteError(`Unhandled Promise Rejection: ${reason}`, window.location.pathname);
  });
}
