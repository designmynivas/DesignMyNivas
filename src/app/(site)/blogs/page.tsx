import type { Metadata } from "next";
import BlogsClient from "./blogs-client";
import { getBlogs } from "@/lib/supabase/queries";
import { generatePageMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/json-ld";
import { generateBreadcrumbSchema } from "@/lib/seo/schema";
import { getStandardBreadcrumbs } from "@/lib/seo/breadcrumbs";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://designmynivas.com";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = generatePageMetadata({
  title: "Interior Design Journal & Guides | Design My Nivas",
  description:
    "Explore expert articles on modern interior design, modular kitchen finishes, architectural lighting, and turnkey residential execution across Hyderabad, Warangal, and Karimnagar.",
  path: "/blogs",
  keywords: [
    "interior design blog Hyderabad",
    "modular kitchen materials guide",
    "residential interior tips Telangana",
    "Design My Nivas journal",
  ],
});

export default async function BlogsPage() {
  const blogs = await getBlogs();
  const breadcrumbs = getStandardBreadcrumbs("Journal", "/blogs");
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/blogs#collection`,
    "url": `${SITE_URL}/blogs`,
    "name": "Design My Nivas Interior Design Journal",
    "description":
      "Expert interior design guides, material comparisons, and execution breakdowns for homeowners.",
    "publisher": {
      "@id": `${SITE_URL}/#organization`,
    },
  };

  return (
    <>
      <JsonLd data={[collectionSchema, breadcrumbSchema]} />
      <BlogsClient initialBlogs={blogs} />
    </>
  );
}
