import type { Metadata } from "next";
import TestimonialsClient from "./testimonials-client";
import { getTestimonials } from "@/lib/supabase/queries";
import { generatePageMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/json-ld";
import { generateBreadcrumbSchema } from "@/lib/seo/schema";
import { getStandardBreadcrumbs } from "@/lib/seo/breadcrumbs";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = generatePageMetadata({
  title: "Client Testimonials & Experiences | Design My Nivas",
  description:
    "Video reviews and stories from homeowners who chose Design My Nivas for turnkey interiors in Hyderabad, Warangal and Karimnagar.",
  path: "/testimonials",
  keywords: [
    "Design My Nivas reviews",
    "interior design testimonials Hyderabad",
    "turnkey interior feedback Warangal",
    "home interior client experiences",
  ],
});

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();
  const breadcrumbs = getStandardBreadcrumbs("Testimonials", "/testimonials");
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <>
      <JsonLd data={[breadcrumbSchema]} />
      <TestimonialsClient initialTestimonials={testimonials} />
    </>
  );
}
