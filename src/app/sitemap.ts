import type { MetadataRoute } from "next";
import { getBlogs, getProjects } from "@/lib/supabase/queries";
import { servicesData } from "@/data/services";
import { getAllLocationSlugs } from "@/data/locations";
import { getCanonicalSiteUrl } from "@/lib/config/site";
import { allGeneralGuides, localGuides } from "@/data/guides";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getCanonicalSiteUrl();

  // Meaningful static content release/review timestamp (avoids artificial freshness signals)
  const STATIC_LAST_MOD = new Date("2026-09-25T00:00:00.000Z");

  // Core static pages
  const coreRoutes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/projects", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/testimonials", priority: 0.75, changeFrequency: "weekly" as const },
    { path: "/blogs", priority: 0.8, changeFrequency: "daily" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
  ].map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: STATIC_LAST_MOD,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Service pages (8 core pillar services)
  const serviceRoutes = servicesData.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified: STATIC_LAST_MOD,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Location landing pages (Hyderabad, Warangal, Karimnagar)
  const locationRoutes = getAllLocationSlugs().map((citySlug) => ({
    url: `${siteUrl}/interior-designers/${citySlug}`,
    lastModified: STATIC_LAST_MOD,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Project pages (dynamic from Supabase + static)
  let projectRoutes: MetadataRoute.Sitemap = [];
  try {
    const projects = await getProjects();
    projectRoutes = projects.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified: new Date(project.created_at || new Date()),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch {
    // Project fallbacks handled gracefully
  }

  // Blog pages (published blogs only from Supabase)
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const blogs = await getBlogs();
    blogRoutes = blogs.map((blog) => ({
      url: `${siteUrl}/blogs/${blog.slug}`,
      lastModified: new Date(blog.updated_at || blog.created_at),
      changeFrequency: "weekly" as const,
      priority: 0.75,
    }));
  } catch {
    // Blog fallbacks handled gracefully
  }

  // Guides Hub & Educational Guides
  const guidesHubRoute: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/guides`,
      lastModified: STATIC_LAST_MOD,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
  ];

  // 47 General Educational & Planning Guides
  const generalGuideRoutes: MetadataRoute.Sitemap = allGeneralGuides.map((guide) => ({
    url: `${siteUrl}/guides/${guide.slug}`,
    lastModified: STATIC_LAST_MOD,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  // 3 Localized Homeowner Guides (Hyderabad, Warangal, Karimnagar)
  const localGuideRoutes: MetadataRoute.Sitemap = localGuides.map((guide) => ({
    url: `${siteUrl}/interior-designers/${guide.city || guide.slug}/home-interior-guide`,
    lastModified: STATIC_LAST_MOD,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    ...coreRoutes,
    ...serviceRoutes,
    ...locationRoutes,
    ...projectRoutes,
    ...blogRoutes,
    ...guidesHubRoute,
    ...generalGuideRoutes,
    ...localGuideRoutes,
  ];
}
