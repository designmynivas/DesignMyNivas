import type { MetadataRoute } from "next";
import { getCanonicalSiteUrl } from "@/lib/config/site";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getCanonicalSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/services",
          "/services/*",
          "/projects",
          "/projects/*",
          "/blogs",
          "/blogs/*",
          "/about",
          "/testimonials",
          "/contact",
          "/interior-designers/*",
        ],
        disallow: [
          "/admin",
          "/admin/*",
          "/login",
          "/api/*",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
