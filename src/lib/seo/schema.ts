import { siteConfig, getCanonicalSiteUrl } from "@/lib/config/site";
import { ServiceItem } from "@/data/services";
import { ProjectItem } from "@/data/projects";
import { BlogRow } from "@/lib/supabase/queries";

const SITE_URL = getCanonicalSiteUrl();

/**
 * Organization Schema representing Design My Nivas & Founder Benson Cheripelli
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${SITE_URL}/#organization`,
    "name": "Design My Nivas",
    "alternateName": "DMN Interiors",
    "url": SITE_URL,
    "logo": {
      "@type": "ImageObject",
      "url": `${SITE_URL}/logo/dmn-logo.webp`,
      "caption": "Design My Nivas Interior Design Studio Logo",
    },
    "image": `${SITE_URL}/Images/main-hero.webp`,
    "description":
      "Residential interior design and turnkey interior execution across Hyderabad, Warangal, and Karimnagar. Founded by Benson Cheripelli.",
    "founder": {
      "@type": "Person",
      "@id": `${SITE_URL}/about/#benson-cheripelli`,
      "name": "Benson Cheripelli",
      "jobTitle": "Founder & Principal Interior Designer",
      "description":
        "Founder and creative head of Design My Nivas, leading turnkey residential interior design across Telangana with 5+ years of practice and 70+ completed homes.",
    },
    "telephone": siteConfig.phone,
    "email": siteConfig.email,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "addressCountry": "IN",
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Hyderabad",
        "containedInPlace": { "@type": "State", "name": "Telangana" },
      },
      {
        "@type": "City",
        "name": "Warangal",
        "containedInPlace": { "@type": "State", "name": "Telangana" },
      },
      {
        "@type": "City",
        "name": "Karimnagar",
        "containedInPlace": { "@type": "State", "name": "Telangana" },
      },
    ],
    "sameAs": [
      "https://instagram.com/designmynivas",
      "https://facebook.com/designmynivas",
      "https://www.youtube.com/@designmynivas",
    ],
    "priceRange": "₹₹ - ₹₹₹₹",
    "knowsAbout": [
      "Residential Interior Design",
      "Turnkey Interior Execution",
      "Complete Home Interiors",
      "Modular Kitchens",
      "Living Room Interiors",
      "Bedroom Interiors",
      "Wardrobes & Storage",
      "Customised Furniture",
      "False Ceiling & Lighting",
    ],
  };
}

/**
 * WebSite Schema for SearchAction integration
 */
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    "url": SITE_URL,
    "name": "Design My Nivas",
    "description":
      "Residential interior design and turnkey interior execution across Hyderabad, Warangal, and Karimnagar.",
    "publisher": {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

/**
 * LocalBusiness Schema for city-specific landing pages
 */
export function generateLocalBusinessSchema(city: "hyderabad" | "warangal" | "karimnagar") {
  const cityData = {
    hyderabad: {
      name: "Design My Nivas — Interior Designers Hyderabad",
      city: "Hyderabad",
      region: "Telangana",
      postalCode: "500081",
      lat: 17.4435,
      lng: 78.3772,
      description:
        "Full home residential interiors, custom modular kitchens, and turnkey execution in Hyderabad (Gachibowli, Kokapet, Financial District, Tellapur, Jubilee Hills).",
      url: `${SITE_URL}/interior-designers/hyderabad`,
    },
    warangal: {
      name: "Design My Nivas — Interior Designers Warangal",
      city: "Warangal",
      region: "Telangana",
      postalCode: "506001",
      lat: 17.9689,
      lng: 79.5941,
      description:
        "Turnkey residential interiors, bespoke modular kitchens, and woodwork execution for independent houses and duplexes in Warangal, Hanamkonda, and Kazipet.",
      url: `${SITE_URL}/interior-designers/warangal`,
    },
    karimnagar: {
      name: "Design My Nivas — Interior Designers Karimnagar",
      city: "Karimnagar",
      region: "Telangana",
      postalCode: "505001",
      lat: 18.4386,
      lng: 79.1288,
      description:
        "Turnkey home interior design, modular kitchens, and tailored wardrobes for family residences in Karimnagar, Mukarampura, and Vavilalapalli.",
      url: `${SITE_URL}/interior-designers/karimnagar`,
    },
  }[city];

  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${cityData.url}#localbusiness`,
    "name": cityData.name,
    "url": cityData.url,
    "telephone": siteConfig.phone,
    "priceRange": "₹₹ - ₹₹₹₹",
    "description": cityData.description,
    "founder": {
      "@type": "Person",
      "name": "Benson Cheripelli",
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": cityData.city,
      "addressRegion": cityData.region,
      "postalCode": cityData.postalCode,
      "addressCountry": "IN",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": cityData.lat,
      "longitude": cityData.lng,
    },
    "areaServed": [
      {
        "@type": "City",
        "name": cityData.city,
      },
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:30",
        "closes": "19:30",
      },
    ],
  };
}

/**
 * BreadcrumbList Schema generator
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * Service Schema for individual service pages
 */
export function generateServiceSchema(service: ServiceItem) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/services/${service.slug}#service`,
    "name": `${service.name} in Hyderabad, Warangal & Karimnagar`,
    "serviceType": service.name,
    "description": service.description,
    "provider": {
      "@id": `${SITE_URL}/#organization`,
    },
    "areaServed": [
      { "@type": "City", "name": "Hyderabad" },
      { "@type": "City", "name": "Warangal" },
      { "@type": "City", "name": "Karimnagar" },
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${service.name} Deliverables`,
      "itemListElement": service.whatWeDesign.map((item, idx) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": item,
        },
        "position": idx + 1,
      })),
    },
  };
}

/**
 * Article Schema for blog post pages
 */
export function generateArticleSchema(blog: BlogRow) {
  const publishedDate = blog.created_at ? new Date(blog.created_at).toISOString() : new Date().toISOString();
  const modifiedDate = blog.updated_at ? new Date(blog.updated_at).toISOString() : publishedDate;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}/blogs/${blog.slug}#article`,
    "headline": blog.title,
    "description": `Comprehensive interior design insights and material specifications for ${blog.title}.`,
    "image": blog.cover_image || `${SITE_URL}/brand/og-default.jpg`,
    "datePublished": publishedDate,
    "dateModified": modifiedDate,
    "author": {
      "@type": "Person",
      "name": "Benson Cheripelli",
      "jobTitle": "Founder & Principal Interior Designer",
      "url": `${SITE_URL}/about`,
    },
    "publisher": {
      "@id": `${SITE_URL}/#organization`,
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blogs/${blog.slug}`,
    },
  };
}

/**
 * VideoObject Schema for YouTube video tours / client testimonials
 */
export function generateVideoSchema({
  title,
  description,
  youtubeUrl,
  thumbnailUrl,
  uploadDate,
}: {
  title: string;
  description: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  uploadDate?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": title,
    "description": description,
    "thumbnailUrl": [thumbnailUrl],
    "uploadDate": uploadDate || "2024-01-01T00:00:00+05:30",
    "embedUrl": youtubeUrl,
    "publisher": {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

/**
 * Project / Work Schema for individual project pages
 */
export function generateProjectSchema(project: ProjectItem) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${SITE_URL}/projects/${project.slug}#project`,
    "name": project.title,
    "headline": `${project.title} — Residential Interior Execution in ${project.location}`,
    "description": project.description,
    "creator": {
      "@id": `${SITE_URL}/#organization`,
    },
    "locationCreated": {
      "@type": "Place",
      "name": project.location,
    },
    "image": project.image,
    "keywords": `${project.type}, interior design ${project.location}, turnkey interiors, Design My Nivas`,
  };

  if (project.youtubeUrl) {
    schema.video = {
      "@type": "VideoObject",
      "name": `${project.title} Video Tour`,
      "description": project.description,
      "thumbnailUrl": [project.image],
      "embedUrl": project.youtubeUrl,
      "uploadDate": project.created_at || "2024-01-01T00:00:00+05:30",
    };
  }

  return schema;
}

/**
 * FAQPage Schema for question-answer lists
 */
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}

/**
 * Article / Guide Schema for Educational & Planning Guides
 */
export function generateGuideArticleSchema(guide: {
  slug: string;
  title: string;
  metaDescription: string;
  category: string;
  readingTime: string;
  lastUpdated: string;
  isLocalGuide?: boolean;
  city?: string;
}) {
  const guideUrl = guide.isLocalGuide && guide.city
    ? `${SITE_URL}/interior-designers/${guide.city}/home-interior-guide`
    : `${SITE_URL}/guides/${guide.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${guideUrl}#article`,
    "headline": guide.title,
    "description": guide.metaDescription,
    "image": `${SITE_URL}/Images/main-hero.webp`,
    "datePublished": "2026-09-25T00:00:00+05:30",
    "dateModified": "2026-09-28T00:00:00+05:30",
    "articleSection": guide.category,
    "author": {
      "@type": "Person",
      "name": "Benson Cheripelli",
      "jobTitle": "Founder & Principal Interior Designer",
      "url": `${SITE_URL}/about`,
    },
    "publisher": {
      "@id": `${SITE_URL}/#organization`,
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": guideUrl,
    },
  };
}

