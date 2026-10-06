import dynamic from "next/dynamic";
import Hero from "@/components/home/hero";
import TrustSection from "@/components/home/trust-section";
import Services from "@/components/home/services";
import SelectedProjects from "@/components/home/selected-projects";
import Testimonials from "@/components/home/testimonials";
import WhyUs from "@/components/home/why-us";
import HomeBlogs from "@/components/home/home-blogs";
import FinalCTA from "@/components/home/final-cta";
import { getProjects, getTestimonials, getBlogs } from "@/lib/supabase/queries";
import JsonLd from "@/components/seo/json-ld";
import { generatePageMetadata } from "@/lib/seo/metadata";

// Below-fold and interactive: split out of the initial bundle
const CostCalculatorSection = dynamic(() => import("@/components/home/cost-calculator-section"), { ssr: true });

export const revalidate = 60;

export const metadata = generatePageMetadata({
  title: "Interior Designers Hyderabad & Telangana | Design My Nivas",
  description:
    "Turnkey home interiors, modular kitchens and woodwork for flats and villas in Hyderabad, Warangal and Karimnagar. 100% itemized pricing, on-time handover.",
  path: "/",
  keywords: [
    "interior designers Hyderabad",
    "interior designers Warangal",
    "interior designers Karimnagar",
    "complete home interiors Hyderabad",
    "turnkey interior designers Telangana",
    "modular kitchen designers Hyderabad",
    "residential interior design",
    "Benson Cheripelli",
    "Design My Nivas",
  ],
});

export default async function HomePage() {
  const [projects, testimonials, blogs] = await Promise.all([
    getProjects(),
    getTestimonials(),
    getBlogs(),
  ]);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://designmynivas.com";

  const homeWebPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteUrl}/#webpage`,
    "url": siteUrl,
    "name": "Design My Nivas — Residential Interior Design & Turnkey Execution",
    "description":
      "Design My Nivas creates residential interiors, modular kitchens, bedrooms and turnkey home interiors across Hyderabad, Warangal and Karimnagar.",
    "about": {
      "@type": "HomeAndConstructionBusiness",
      "name": "Design My Nivas",
      "founder": {
        "@type": "Person",
        "name": "Benson Cheripelli",
      },
    },
  };

  return (
    <>
      <JsonLd data={homeWebPageSchema} />

      <Hero />
      <TrustSection />
      <Services />
      <SelectedProjects initialProjects={projects.slice(0, 8)} />
      <Testimonials initialTestimonials={testimonials} />
      <WhyUs />
      <CostCalculatorSection />
      <HomeBlogs initialBlogs={blogs.slice(0, 8)} />
      <FinalCTA />
    </>
  );
}
