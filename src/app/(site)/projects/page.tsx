import type { Metadata } from "next";
import ProjectsClient from "./projects-client";
import { getProjects } from "@/lib/supabase/queries";
import { generatePageMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/json-ld";
import { generateBreadcrumbSchema } from "@/lib/seo/schema";
import { getStandardBreadcrumbs } from "@/lib/seo/breadcrumbs";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://designmynivas.com";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = generatePageMetadata({
  title: "Homes We've Designed | Design My Nivas Portfolio",
  description:
    "Explore residential interiors designed and executed by Design My Nivas across Hyderabad, Warangal and Karimnagar. Complete flats, luxury villas, and penthouses with 100% itemized pricing.",
  path: "/projects",
  keywords: [
    "interior design portfolio Hyderabad",
    "completed residential projects Warangal",
    "home interior designs Karimnagar",
    "Design My Nivas projects",
    "real client homes Telangana",
  ],
});

export default async function ProjectsPage() {
  const projects = await getProjects();
  const breadcrumbs = getStandardBreadcrumbs("Projects", "/projects");
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/projects#portfolio`,
    "url": `${SITE_URL}/projects`,
    "name": "Design My Nivas Residential Portfolio",
    "description":
      "Completed residential interior design and turnkey execution projects across Hyderabad, Warangal, and Karimnagar.",
    "publisher": {
      "@id": `${SITE_URL}/#organization`,
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": projects.slice(0, 10).map((project, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "url": `${SITE_URL}/projects/${project.slug}`,
        "name": project.title,
      })),
    },
  };

  return (
    <>
      <JsonLd data={[portfolioSchema, breadcrumbSchema]} />
      <ProjectsClient initialProjects={projects} />
    </>
  );
}
