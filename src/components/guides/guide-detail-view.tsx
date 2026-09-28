import React from "react";
import Link from "next/link";
import { Clock, Calendar, CheckCircle2, MapPin, ChevronRight, MessageSquare } from "lucide-react";
import { GuideItem } from "@/data/guides/types";
import { getRelatedGuidesForSlug } from "@/data/guides";
import { servicesData } from "@/data/services";
import { projectsData } from "@/data/projects";
import { getGuideBreadcrumbs, getLocalGuideBreadcrumbs } from "@/lib/seo/breadcrumbs";
import Breadcrumbs from "@/components/seo/breadcrumbs";
import JsonLd from "@/components/seo/json-ld";
import { generateGuideArticleSchema, generateFAQSchema } from "@/lib/seo/schema";
import { getWhatsAppUrl } from "@/lib/config/site";
import GuideBookingButton from "./guide-booking-button";
import styles from "./guide.module.css";

interface GuideDetailViewProps {
  guide: GuideItem;
}

export default function GuideDetailView({ guide }: GuideDetailViewProps) {
  const breadcrumbs = guide.isLocalGuide && guide.city
    ? getLocalGuideBreadcrumbs(
        guide.city === "hyderabad" ? "Hyderabad" : guide.city === "warangal" ? "Warangal" : "Karimnagar",
        guide.city
      )
    : getGuideBreadcrumbs(guide.title, guide.slug, guide.category);

  const relatedGuides = getRelatedGuidesForSlug(guide.slug, 3);
  const relatedServices = servicesData.filter((s) => guide.relatedServices.includes(s.slug));
  const relatedProjects = projectsData.filter((p) => guide.relatedProjects.includes(p.slug));

  const whatsappMessage = `Hello Benson, I was reading your guide on "${guide.title}" and would like to discuss interior design for my home.`;
  const whatsappUrl = getWhatsAppUrl(whatsappMessage);

  return (
    <article className={styles.guidePage}>
      {/* Schema.org Structured Data */}
      <JsonLd data={generateGuideArticleSchema(guide)} />
      {guide.faqs && guide.faqs.length > 0 && (
        <JsonLd data={generateFAQSchema(guide.faqs)} />
      )}

      <div className={styles.container}>
        {/* Breadcrumb Navigation */}
        <div className={styles.breadcrumbsWrap}>
          <Breadcrumbs items={breadcrumbs} includeSchema={true} />
        </div>

        {/* Guide Header */}
        <header className={styles.header}>
          <span className={styles.categoryEyebrow}>{guide.category}</span>
          <h1 className={styles.title}>{guide.title}</h1>

          <div className={styles.authorMetaRow}>
            <div className={styles.authorInfo}>
              <div className={styles.authorAvatar} aria-hidden="true">
                BC
              </div>
              <div className={styles.authorText}>
                <span className={styles.authorName}>Benson Cheripelli</span>
                <span className={styles.authorTitle}>Founder &amp; Principal Designer, Design My Nivas</span>
              </div>
            </div>

            <div className={styles.metaTags}>
              {guide.city && (
                <span className={styles.metaItem}>
                  <MapPin size={13} aria-hidden="true" />
                  <span style={{ textTransform: "capitalize" }}>{guide.city}</span>
                </span>
              )}
              <span className={styles.metaItem}>
                <Clock size={13} aria-hidden="true" />
                <span>{guide.readingTime}</span>
              </span>
              <span className={styles.metaItem}>
                <Calendar size={13} aria-hidden="true" />
                <span>Updated {guide.lastUpdated}</span>
              </span>
            </div>
          </div>
        </header>

        {/* Quick Executive Summary / AEO Direct Answer */}
        <div className={styles.summaryBox}>
          <span className={styles.summaryBadge}>Executive Summary &amp; Direct Answer</span>
          <p className={styles.summaryText}>{guide.summary}</p>
        </div>

        {/* Key Takeaways Card */}
        {guide.keyTakeaways && guide.keyTakeaways.length > 0 && (
          <div className={styles.takeawaysCard}>
            <h2 className={styles.takeawaysHeading}>Key Architectural Takeaways</h2>
            <ul className={styles.takeawaysList}>
              {guide.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className={styles.takeawayItem}>
                  <CheckCircle2 size={18} className={styles.checkIcon} aria-hidden="true" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Table of Contents */}
        {guide.sections && guide.sections.length > 1 && (
          <nav className={styles.tocBox} aria-label="Table of Contents">
            <h2 className={styles.tocTitle}>Table of Contents</h2>
            <ul className={styles.tocList}>
              {guide.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className={styles.tocLink}>
                    {section.title}
                  </a>
                </li>
              ))}
              {guide.faqs && guide.faqs.length > 0 && (
                <li>
                  <a href="#frequently-asked-questions" className={styles.tocLink}>
                    Frequently Asked Questions
                  </a>
                </li>
              )}
            </ul>
          </nav>
        )}

        {/* Main Article Body */}
        <div className={styles.articleBody}>
          {guide.sections.map((section) => (
            <section key={section.id} id={section.id} className={styles.section}>
              <h2 className={styles.sectionTitle}>{section.title}</h2>

              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className={styles.paragraph}>
                  {p}
                </p>
              ))}

              {/* Callout box */}
              {section.callout && (
                <div
                  className={`${styles.callout} ${
                    section.callout.type === "tip"
                      ? styles.calloutTip
                      : section.callout.type === "warning"
                      ? styles.calloutWarning
                      : styles.calloutInsight
                  }`}
                >
                  <div className={styles.calloutTitle}>{section.callout.title}</div>
                  <div className={styles.calloutText}>{section.callout.text}</div>
                </div>
              )}

              {/* Data Table */}
              {section.table && (
                <div className={styles.tableContainer}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        {section.table.headers.map((header, hIdx) => (
                          <th key={hIdx}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row, rIdx) => (
                        <tr key={rIdx}>
                          {row.map((cell, cIdx) => (
                            <td key={cIdx}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Checklist */}
              {section.checklist && (
                <ul className={styles.checklist}>
                  {section.checklist.map((item, itemIdx) => (
                    <li key={itemIdx} className={styles.checklistItem}>
                      <CheckCircle2 size={16} className={styles.checkIcon} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* FAQ Section */}
        {guide.faqs && guide.faqs.length > 0 && (
          <section id="frequently-asked-questions" className={styles.faqSection} aria-label="Frequently Asked Questions">
            <h2 className={styles.faqSectionTitle}>Frequently Asked Questions</h2>
            <div className={styles.faqList}>
              {guide.faqs.map((faq, fIdx) => (
                <div key={fIdx} className={styles.faqItem}>
                  <h3 className={styles.faqQuestion}>{faq.question}</h3>
                  <p className={styles.faqAnswer}>{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Cross-Link Exploration Section */}
        <section className={styles.crossLinksArea} aria-label="Related Resources & Services">
          <h2 className={styles.crossLinksTitle}>Related Services &amp; Projects</h2>
          <div className={styles.linksGrid}>
            {/* Related Services */}
            {relatedServices.map((service) => (
              <Link key={service.id} href={`/services/${service.slug}`} className={styles.linkCard}>
                <span className={styles.linkCardTag}>Service</span>
                <span className={styles.linkCardTitle}>{service.name}</span>
                <span className={styles.linkCardArrow}>
                  Explore Service <ChevronRight size={14} aria-hidden="true" />
                </span>
              </Link>
            ))}

            {/* Related Projects */}
            {relatedProjects.map((project) => (
              <Link key={project.id} href={`/projects/${project.slug}`} className={styles.linkCard}>
                <span className={styles.linkCardTag}>Real Project</span>
                <span className={styles.linkCardTitle}>{project.title}</span>
                <span className={styles.linkCardArrow}>
                  View Case Study <ChevronRight size={14} aria-hidden="true" />
                </span>
              </Link>
            ))}

            {/* Related Guides */}
            {relatedGuides.map((relGuide) => (
              <Link
                key={relGuide.slug}
                href={
                  relGuide.isLocalGuide && relGuide.city
                    ? `/interior-designers/${relGuide.city}/home-interior-guide`
                    : `/guides/${relGuide.slug}`
                }
                className={styles.linkCard}
              >
                <span className={styles.linkCardTag}>{relGuide.category}</span>
                <span className={styles.linkCardTitle}>{relGuide.title}</span>
                <span className={styles.linkCardArrow}>
                  Read Guide <ChevronRight size={14} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Bottom Turnkey Consultation CTA */}
        <div className={styles.ctaBanner}>
          <span className={styles.ctaEyebrow}>Turnkey Execution Guarantee</span>
          <h2 className={styles.ctaHeadline}>Ready to plan your home with 100% itemized pricing?</h2>
          <p className={styles.ctaSupporting}>
            Speak directly with Benson Cheripelli and our senior site engineering team. We guarantee calibrated BWP
            marine-grade woodwork, European soft-close hardware, and fixed-timeline handover across Hyderabad, Warangal,
            and Karimnagar.
          </p>

          <div className={styles.ctaActions}>
            <GuideBookingButton
              source={`guide-${guide.slug}`}
              label="Book a Free Consultation"
            />
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappButton}
              aria-label="Chat on WhatsApp with Benson Cheripelli"
            >
              <MessageSquare size={17} aria-hidden="true" />
              <span>WhatsApp Us Directly</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
