import type { SiteConfig } from "@/types/site";

/**
 * Resolves the canonical production domain.
 * Enforces https://designmynivas.com so canonical tags, OpenGraph,
 * sitemap, and robots never point to localhost or Vercel preview URLs.
 */
export function getCanonicalSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!envUrl || envUrl.includes("localhost") || envUrl.includes("127.0.0.1") || envUrl.includes(".vercel.app")) {
    return "https://designmynivas.com";
  }
  return envUrl.replace(/\/$/, "");
}

export const siteConfig: SiteConfig = {
  name: "Design My Nivas",
  founder: "Benson Cheripelli",
  tagline: "Your Space | Your Story | Our Design",
  description:
    "Design My Nivas creates residential interiors, modular kitchens, bedrooms and turnkey home interiors across Hyderabad, Warangal and Karimnagar.",
  url: getCanonicalSiteUrl(),
  primaryLocations: ["Hyderabad", "Warangal", "Karimnagar"],
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+91 78935 25257",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917893525257",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@designmynivas.com",
};

/**
 * Helper to build direct WhatsApp link with a custom message.
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const cleanNumber = siteConfig.whatsapp.replace(/\D/g, "");
  const defaultMessage =
    "Hello Design My Nivas, I would like to enquire about residential interior design for my home.";
  const text = encodeURIComponent(customMessage || defaultMessage);
  return `https://wa.me/${cleanNumber}?text=${text}`;
}

export const servicesList = [
  {
    number: "01",
    title: "Complete Home Interiors",
    description: "A coordinated interior for your entire home.",
  },
  {
    number: "02",
    title: "Modular Kitchens",
    description:
      "Storage, workflow and finishes designed around your everyday cooking.",
  },
  {
    number: "03",
    title: "Living Room Interiors",
    description:
      "A space designed for everyday living, guests and family time.",
  },
  {
    number: "04",
    title: "Bedroom Interiors",
    description: "Comfort, storage and personal style brought together.",
  },
  {
    number: "05",
    title: "Wardrobes & Storage",
    description:
      "Storage solutions designed around the space you actually have.",
  },
  {
    number: "06",
    title: "Customised Furniture",
    description: "Furniture planned specifically for your home.",
  },
  {
    number: "07",
    title: "False Ceiling & Lighting",
    description:
      "Lighting and ceiling details that shape the atmosphere of a room.",
  },
  {
    number: "08",
    title: "Turnkey Interior Execution",
    description: "One coordinated process from design through execution.",
  },
];

export const processSteps = [
  {
    number: "01",
    name: "Understand",
    description:
      "We start with your home, lifestyle, requirements and budget.",
  },
  {
    number: "02",
    name: "Design",
    description:
      "We turn your requirements into a considered interior design.",
  },
  {
    number: "03",
    name: "Plan",
    description:
      "Materials, finishes, furniture, lighting and execution are planned before work begins.",
  },
  {
    number: "04",
    name: "Execute",
    description:
      "The team coordinates execution with attention to quality and detail.",
  },
  {
    number: "05",
    name: "Handover",
    description: "Your finished space, ready to live in.",
  },
];

export const trustMetrics = [
  { value: "5+", label: "Years of practice" },
  { value: "70+", label: "Homes completed" },
  { value: "3", label: "Studio hubs" },
  { value: "100%", label: "Locked estimates" },
];

export const whyDmnPoints = [
  {
    number: "01",
    keyword: "Personalised",
    description: "Every layout is custom calibrated to your family's living rhythm.",
  },
  {
    number: "02",
    keyword: "Functional",
    description: "Aesthetics paired with everyday ergonomics to make daily life effortless.",
  },
  {
    number: "03",
    keyword: "Detailed",
    description: "Architectural lighting, tactile veneers, and calibrated joinery down to the millimeter.",
  },
  {
    number: "04",
    keyword: "Transparent",
    description: "Honest line-item pricing with zero hidden costs and verified factory-grade materials.",
  },
  {
    number: "05",
    keyword: "End-to-End",
    description: "One turnkey team managing 3D design, procurement, and on-site execution.",
  },
  {
    number: "06",
    keyword: "Timely Handover",
    description: "Committed schedules with multi-stage quality audits at every key milestone.",
  },
];
