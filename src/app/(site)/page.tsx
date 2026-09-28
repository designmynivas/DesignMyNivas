import dynamic from "next/dynamic";
import Hero from "@/components/home/hero";
import Statement from "@/components/home/statement";
import Services from "@/components/home/services";
import SelectedProjects from "@/components/home/selected-projects";
import TrustSection from "@/components/home/trust-section";
import WhyUs from "@/components/home/why-us";
import Founder from "@/components/home/founder";
import Testimonials from "@/components/home/testimonials";
import HomeBlogs from "@/components/home/home-blogs";
import FinalCTA from "@/components/home/final-cta";
import { getProjects, getTestimonials, getBlogs } from "@/lib/supabase/queries";
import JsonLd from "@/components/seo/json-ld";
import { generatePageMetadata } from "@/lib/seo/metadata";

// Heavy below-fold components: dynamically imported to reduce initial JS payload
// Process imports motion/react (~124KB), CostCalculator is 32KB of source
const Process = dynamic(() => import("@/components/home/process"), { ssr: true });
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

      {/* 01 Hero */}
      <Hero />

      {/* 02 Trust Metrics (5+ Years, 70+ Projects, 3 Locations) — right after hero */}
      <TrustSection />

      {/* 03 Short positioning statement */}
      <Statement />

      {/* 04 SERVICES (6 large cards, 2x3, View All Services) */}
      <Services />

      {/* 05 Selected Projects (newest 6 cards, 3x2, View All Projects) */}
      <SelectedProjects initialProjects={projects.slice(0, 6)} />

      {/* 06 Why Design My Nivas */}
      <WhyUs />

      {/* 07 Founder (Benson Cheripelli) */}
      <Founder />

      {/* 08 Process */}
      <Process />

      {/* 09 Testimonials (newest 3 video reviews) */}
      <Testimonials initialTestimonials={testimonials.slice(0, 3)} />

      {/* 10 Cost Estimator ("Planning your interiors?" -> Estimate Your Cost) */}
      <CostCalculatorSection />

      {/* 11 Editorial Guides & Insights (newest 4 blog cards) */}
      <HomeBlogs initialBlogs={blogs.slice(0, 4)} />

      {/* 12 Final Consultation CTA */}
      <FinalCTA />
    </>
  );
}
