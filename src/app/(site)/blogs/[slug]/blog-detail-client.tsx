"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Sparkles, ArrowRight } from "lucide-react";
import { BlogItem, estimateReadingTime } from "@/types/blog";
import { useBookingModal } from "@/context/booking-modal-context";
import BlogCard from "@/components/blogs/blog-card";

interface BlogDetailClientProps {
  blog: BlogItem;
  relatedBlogs?: BlogItem[];
}

export default function BlogDetailClient({
  blog,
  relatedBlogs = [],
}: BlogDetailClientProps) {
  const { openBookingModal } = useBookingModal();
  const readTime = estimateReadingTime(blog.content);

  const formattedDate = new Date(blog.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="article-page-wrapper">
      {/* 1. TOP SECTION: Featured Cover Image FIRST */}
      <section className="article-media-section">
        <div className="container-wide">
          <div className="article-hero-wrap">
            <div className="article-hero-frame">
              <Image
                src={blog.cover_image || "/Images/main-hero.webp"}
                alt={blog.title}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="article-hero-image"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. UNDER THE IMAGE: Navigation, Meta, Main Heading & Article Content */}
      <main className="article-content-section">
        <div className="container-narrow">
          {/* Back Navigation Button: Icon and text strictly side-by-side */}
          <div className="back-nav-row">
            <Link href="/blogs" className="back-link" aria-label="Back to all articles">
              <ArrowLeft size={16} className="back-arrow" aria-hidden="true" />
              <span className="back-link-text">Back to all articles</span>
            </Link>
          </div>

          {/* Metadata Row: Category badge, date, read-time strictly side-by-side */}
          <div className="article-meta-row">
            <span className="article-category-badge">DESIGN JOURNAL</span>
            <span className="article-meta-sep" aria-hidden="true">·</span>
            <span className="article-meta-item">
              <Calendar size={14} className="meta-icon" aria-hidden="true" />
              <span className="meta-text">{formattedDate}</span>
            </span>
            <span className="article-meta-sep" aria-hidden="true">·</span>
            <span className="article-meta-item">
              <Clock size={14} className="meta-icon" aria-hidden="true" />
              <span className="meta-text">{readTime}</span>
            </span>
          </div>

          {/* Main Article Title */}
          <h1 className="article-main-heading">{blog.title}</h1>

          {/* Structured Article Body */}
          <div className="article-body">
            {blog.content && blog.content.length > 0 ? (
              blog.content.map((block, idx) => {
                if (block.type === "paragraph") {
                  return (
                    <p key={idx} className="article-paragraph">
                      {block.text}
                    </p>
                  );
                }

                if (block.type === "subheading") {
                  return (
                    <h2 key={idx} className="article-subheading">
                      {block.text}
                    </h2>
                  );
                }

                if (block.type === "bullet_list") {
                  return (
                    <ul key={idx} className="article-bullet-list">
                      {block.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="article-bullet-item">
                          <span className="bullet-disc" aria-hidden="true" />
                          <span className="bullet-text">{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }

                return null;
              })
            ) : (
              <p className="article-paragraph">Article content will appear here.</p>
            )}
          </div>

          {/* Consultation CTA Card */}
          <div className="article-cta-box">
            <div className="cta-icon-pill">
              <Sparkles size={15} className="cta-sparkle-icon" aria-hidden="true" />
              <span className="cta-pill-text">Design My Nivas Studio</span>
            </div>
            <h3 className="cta-heading">
              Planning home interiors in Hyderabad, Warangal, or Karimnagar?
            </h3>
            <p className="cta-desc">
              Schedule a complimentary 45-minute spatial consultation. We will analyze your floor plan, discuss materials, and prepare an itemized price-locked BOQ.
            </p>
            <div className="cta-actions">
              <button
                type="button"
                onClick={() => openBookingModal({ source: `blog-${blog.slug}` })}
                className="btn btn-primary cta-booking-btn"
              >
                <span className="btn-label-text">Book Free Consultation</span>
                <ArrowRight size={15} className="btn-arrow-icon" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* 3. AFTER EVERY BLOG: Three New Blogs */}
      {relatedBlogs && relatedBlogs.length > 0 && (
        <section className="related-blogs-section" aria-label="More Design Articles">
          <div className="container-wide">
            <div className="related-blogs-header">
              <div className="related-header-left">
                <span className="related-eyebrow">CONTINUE READING</span>
                <h2 className="related-title">More design articles.</h2>
                <p className="related-subtitle">
                  Curated material breakdowns, joinery specifications, and turnkey residential execution guides.
                </p>
              </div>
              <div className="related-header-right">
                <Link href="/blogs" className="view-all-link">
                  <span>View All Articles</span>
                  <ArrowRight size={15} className="view-arrow" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="related-blogs-grid" role="list">
              {relatedBlogs.slice(0, 3).map((item) => (
                <div key={item.id} className="related-card-wrap">
                  <BlogCard blog={item} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <style jsx>{`
        .article-page-wrapper {
          background-color: var(--background);
          min-height: 100vh;
          padding-bottom: 5rem;
        }

        .container-wide {
          max-width: var(--container-wide, 1408px);
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .container-narrow {
          max-width: 780px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        /* 1. TOP COVER IMAGE SECTION */
        .article-media-section {
          padding: 7.75rem 0 2.5rem 0;
        }

        .article-hero-wrap {
          max-width: 1080px;
          margin: 0 auto;
        }

        .article-hero-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 20px;
          overflow: hidden;
          background-color: var(--background-muted);
          box-shadow: 0 16px 48px rgba(24, 24, 24, 0.08);
          border: 1px solid var(--border);
        }

        /* 2. CONTENT UNDER THE IMAGE */
        .article-content-section {
          padding-top: 1rem;
        }

        /* Back Navigation Row: strictly side-by-side */
        .back-nav-row {
          margin-bottom: 1.75rem;
        }

        :global(.back-link) {
          display: inline-flex !important;
          flex-direction: row !important;
          align-items: center !important;
          gap: 0.5rem !important;
          color: var(--foreground-muted);
          font-family: var(--font-body);
          font-size: 0.875rem;
          font-weight: 600;
          text-decoration: none;
          white-space: nowrap !important;
          transition: color 0.15s ease, transform 0.15s ease;
        }

        :global(.back-link:hover) {
          color: #29ABE2;
          transform: translateX(-3px);
        }

        :global(.back-arrow) {
          display: inline-block !important;
          flex-shrink: 0 !important;
          vertical-align: middle !important;
        }

        .back-link-text {
          display: inline !important;
          white-space: nowrap !important;
        }

        /* Metadata Row: strictly side-by-side */
        .article-meta-row {
          display: flex !important;
          flex-direction: row !important;
          align-items: center !important;
          gap: 0.625rem;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
        }

        .article-category-badge {
          background-color: rgba(41, 171, 226, 0.1);
          color: #29ABE2;
          font-family: var(--font-body);
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          padding: 0.25rem 0.65rem;
          border-radius: 6px;
          display: inline-block !important;
          white-space: nowrap !important;
        }

        .article-meta-sep {
          color: var(--foreground-subtle);
          opacity: 0.4;
          display: inline-block !important;
        }

        .article-meta-item {
          display: inline-flex !important;
          flex-direction: row !important;
          align-items: center !important;
          gap: 0.35rem !important;
          color: var(--foreground-subtle);
          font-family: var(--font-body);
          font-size: 0.8125rem;
          font-weight: 500;
          white-space: nowrap !important;
        }

        :global(.meta-icon) {
          display: inline-block !important;
          flex-shrink: 0 !important;
          vertical-align: middle !important;
        }

        .meta-text {
          display: inline !important;
          white-space: nowrap !important;
        }

        /* Main Heading */
        .article-main-heading {
          font-family: var(--font-display);
          font-size: clamp(2rem, 3.6vw, 3.125rem);
          font-weight: 650;
          line-height: 1.22;
          letter-spacing: -0.025em;
          color: var(--foreground);
          margin-bottom: 2.25rem;
        }

        /* Article Body Elements */
        .article-body {
          display: flex;
          flex-direction: column;
        }

        .article-paragraph {
          font-family: var(--font-body);
          font-size: 1.0625rem;
          line-height: 1.8;
          color: #2D2B28;
          margin-bottom: 1.75rem;
          font-weight: 400;
        }

        .article-subheading {
          font-family: var(--font-display);
          font-size: clamp(1.35rem, 2.2vw, 1.75rem);
          font-weight: 650;
          color: var(--foreground);
          line-height: 1.35;
          letter-spacing: -0.015em;
          margin-top: 2.25rem;
          margin-bottom: 1.125rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        .article-bullet-list {
          list-style: none;
          padding: 0;
          margin: 0 0 2rem 0;
          display: flex;
          flex-direction: column;
          gap: 0.875rem;
        }

        .article-bullet-item {
          display: flex;
          align-items: flex-start;
          gap: 0.875rem;
        }

        .bullet-disc {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #29ABE2;
          margin-top: 0.65rem;
          flex-shrink: 0;
        }

        .bullet-text {
          font-family: var(--font-body);
          font-size: 1rem;
          line-height: 1.7;
          color: #2D2B28;
          flex: 1;
        }

        /* Consultation CTA Box */
        .article-cta-box {
          margin-top: 3.5rem;
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 2.5rem 2.25rem;
          box-shadow: 0 8px 30px rgba(41, 171, 226, 0.08);
          position: relative;
          overflow: hidden;
        }

        .article-cta-box::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #29ABE2, #52BCE8);
        }

        .cta-icon-pill {
          display: inline-flex !important;
          flex-direction: row !important;
          align-items: center !important;
          gap: 0.45rem !important;
          background: rgba(41, 171, 226, 0.08);
          color: #29ABE2;
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.35rem 0.75rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          white-space: nowrap !important;
        }

        :global(.cta-sparkle-icon) {
          display: inline-block !important;
          flex-shrink: 0 !important;
          vertical-align: middle !important;
        }

        .cta-pill-text {
          display: inline !important;
          white-space: nowrap !important;
        }

        .cta-heading {
          font-family: var(--font-display);
          font-size: clamp(1.35rem, 2vw, 1.625rem);
          font-weight: 650;
          color: var(--foreground);
          line-height: 1.3;
          margin-bottom: 0.75rem;
        }

        .cta-desc {
          font-family: var(--font-body);
          font-size: 0.9375rem;
          line-height: 1.65;
          color: var(--foreground-muted);
          margin-bottom: 1.5rem;
        }

        /* Button: Icon and text strictly side-by-side */
        :global(.cta-booking-btn) {
          display: inline-flex !important;
          flex-direction: row !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 0.5rem !important;
          padding: 0.85rem 1.65rem !important;
          font-size: 0.9375rem !important;
          font-weight: 650 !important;
          border-radius: 12px !important;
          white-space: nowrap !important;
          cursor: pointer;
        }

        .btn-label-text {
          display: inline !important;
          white-space: nowrap !important;
        }

        :global(.btn-arrow-icon) {
          display: inline-block !important;
          flex-shrink: 0 !important;
          vertical-align: middle !important;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        :global(.cta-booking-btn:hover .btn-arrow-icon) {
          transform: translateX(4px);
        }

        /* 3. THREE NEW BLOGS SECTION */
        .related-blogs-section {
          margin-top: 5.5rem;
          padding-top: 4.5rem;
          border-top: 1px solid var(--border);
          background-color: rgba(239, 237, 231, 0.45);
          padding-bottom: 2rem;
        }

        .related-blogs-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 2.5rem;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .related-eyebrow {
          font-family: var(--font-body);
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #29ABE2;
          display: block;
          margin-bottom: 0.35rem;
        }

        .related-title {
          font-family: var(--font-display);
          font-size: clamp(1.75rem, 2.8vw, 2.25rem);
          font-weight: 650;
          color: var(--foreground);
          letter-spacing: -0.02em;
          margin-bottom: 0.35rem;
        }

        .related-subtitle {
          font-family: var(--font-body);
          font-size: 0.9375rem;
          color: var(--foreground-muted);
          max-width: 580px;
          line-height: 1.55;
        }

        :global(.view-all-link) {
          display: inline-flex !important;
          flex-direction: row !important;
          align-items: center !important;
          gap: 0.45rem !important;
          color: #29ABE2;
          font-family: var(--font-body);
          font-size: 0.875rem;
          font-weight: 700;
          text-decoration: none;
          white-space: nowrap !important;
          transition: transform 0.18s ease;
        }

        :global(.view-all-link:hover) {
          transform: translateX(3px);
        }

        :global(.view-arrow) {
          display: inline-block !important;
          flex-shrink: 0 !important;
        }

        .related-blogs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
        }

        .related-card-wrap {
          height: 100%;
        }

        @media (max-width: 1024px) {
          .related-blogs-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .article-media-section {
            padding: 7.25rem 0 1.5rem 0;
          }

          .article-hero-frame {
            border-radius: 14px;
          }

          .related-blogs-section {
            margin-top: 3.5rem;
            padding-top: 3rem;
          }

          .related-blogs-grid {
            grid-template-columns: 1fr;
          }

          .related-blogs-header {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </article>
  );
}
