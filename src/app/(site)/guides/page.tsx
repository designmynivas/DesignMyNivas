import { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Clock, ChevronRight, Compass, ShieldCheck } from "lucide-react";
import { allGuides, getGuideCategories } from "@/data/guides";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { getGuidesHubBreadcrumbs } from "@/lib/seo/breadcrumbs";
import Breadcrumbs from "@/components/seo/breadcrumbs";
import JsonLd from "@/components/seo/json-ld";
import { getCanonicalSiteUrl } from "@/lib/config/site";
import styles from "./guides-hub.module.css";

export const metadata: Metadata = generatePageMetadata({
  title: "Homeowner Guides & Cost Planning Library",
  description:
    "50 homeowner guides on interior design, cost budgeting, room planning and turnkey execution by Benson Cheripelli and the Design My Nivas team.",
  path: "/guides",
  image: "/Images/main-hero.webp",
  keywords: [
    "home interior design guides",
    "interior cost planning library",
    "turnkey interior execution checklist",
    "modular kitchen planning guides",
    "interior designers Hyderabad Warangal Karimnagar",
  ],
});

export default function GuidesHubPage() {
  const categories = getGuideCategories();
  const siteUrl = getCanonicalSiteUrl();

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteUrl}/guides#collection`,
    "name": "Design My Nivas Homeowner Planning Guides Library",
    "description":
      "Comprehensive educational knowledge base covering residential interior budgeting, room ergonomics, modular cabinetry, and turnkey site engineering.",
    "url": `${siteUrl}/guides`,
    "publisher": {
      "@id": `${siteUrl}/#organization`,
    },
  };

  return (
    <main className={styles.hubPage}>
      <JsonLd data={collectionSchema} />

      <div className={styles.container}>
        {/* Breadcrumb Navigation */}
        <div className={styles.breadcrumbsWrap}>
          <Breadcrumbs items={getGuidesHubBreadcrumbs()} includeSchema={true} />
        </div>

        {/* Hub Header */}
        <header className={styles.heroSection}>
          <span className={styles.eyebrow}>
            <Compass size={14} aria-hidden="true" />
            <span>KNOWLEDGE &amp; PLANNING LIBRARY</span>
          </span>
          <h1 className={styles.headline}>Homeowner interior guides &amp; planning resources.</h1>
          <p className={styles.lead}>
            Practical, architectural guides on budgeting, material science, room ergonomics, and turnkey site
            execution from Benson Cheripelli and our Telangana project team. Written to help you make informed decisions
            with zero surprise costs.
          </p>

          <div className={styles.heroStats}>
            <div className={styles.statPill}>
              <span className={styles.statNumber}>50</span>
              <span className={styles.statLabel}>In-Depth Guides</span>
            </div>
            <div className={styles.statPill}>
              <span className={styles.statNumber}>8</span>
              <span className={styles.statLabel}>Core Categories</span>
            </div>
            <div className={styles.statPill}>
              <span className={styles.statNumber}>100%</span>
              <span className={styles.statLabel}>Itemized Pricing Philosophy</span>
            </div>
          </div>
        </header>

        {/* Category Filter Quick Jump */}
        <nav className={styles.categoryNav} aria-label="Jump to category">
          {categories.map((cat) => (
            <a key={cat.slug} href={`#${cat.slug}`} className={styles.categoryNavLink}>
              <span>{cat.name}</span>
              <span className={styles.navCount}>({cat.count})</span>
            </a>
          ))}
        </nav>

        {/* Categorized Guide Listings */}
        <div className={styles.categoriesStack}>
          {categories.map((category) => {
            const categoryGuides = allGuides.filter((g) => g.categorySlug === category.slug);

            return (
              <section key={category.slug} id={category.slug} className={styles.categoryGroup}>
                <div className={styles.categoryHeader}>
                  <div className={styles.categoryHeaderLeft}>
                    <span className={styles.groupBadge}>Group {category.group}</span>
                    <h2 className={styles.categoryTitle}>{category.name}</h2>
                  </div>
                  <p className={styles.categoryDesc}>{category.description}</p>
                </div>

                <div className={styles.guidesGrid}>
                  {categoryGuides.map((guide) => {
                    const href =
                      guide.isLocalGuide && guide.city
                        ? `/interior-designers/${guide.city}/home-interior-guide`
                        : `/guides/${guide.slug}`;

                    return (
                      <Link key={guide.slug} href={href} className={styles.guideCard}>
                        <div className={styles.cardTop}>
                          <span className={styles.cardCategory}>{guide.category}</span>
                          <span className={styles.cardTime}>
                            <Clock size={12} aria-hidden="true" />
                            <span>{guide.readingTime}</span>
                          </span>
                        </div>

                        <h3 className={styles.cardTitle}>{guide.title}</h3>

                        <p className={styles.cardSummary}>{guide.summary}</p>

                        <div className={styles.cardFooter}>
                          <span className={styles.readLink}>
                            <span>Read Full Guide</span>
                            <ChevronRight size={15} aria-hidden="true" />
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* Bottom Consultation Banner */}
        <div className={styles.hubFooterCta}>
          <div className={styles.ctaContent}>
            <span className={styles.ctaEyebrow}>
              <ShieldCheck size={16} aria-hidden="true" />
              <span>TRANSPARENT ARCHITECTURAL PRACTICE</span>
            </span>
            <h2 className={styles.ctaHeadline}>Ready to discuss your home interior?</h2>
            <p className={styles.ctaText}>
              Every home we design starts with a transparent, itemized consultation. Meet Benson Cheripelli to review
              floor plans, material samples, and fixed-price timelines across Hyderabad, Warangal, and Karimnagar.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/contact" className="btn btn-primary">
                <span>Book a Design Consultation</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
