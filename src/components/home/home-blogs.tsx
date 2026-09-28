"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import BlogCard from "@/components/blogs/blog-card";
import { BlogItem } from "@/types/blog";

interface HomeBlogsProps {
  initialBlogs?: BlogItem[];
}

export default function HomeBlogs({ initialBlogs = [] }: HomeBlogsProps) {
  const [blogs, setBlogs] = useState<BlogItem[]>(initialBlogs.slice(0, 4));
  const [prevInitial, setPrevInitial] = useState(initialBlogs);

  if (initialBlogs !== prevInitial) {
    setPrevInitial(initialBlogs);
    setBlogs(initialBlogs.slice(0, 4));
  }

  useEffect(() => {
    let isMounted = true;
    const fetchLatest = () => {
      import("@/lib/supabase/queries").then(({ getBlogs }) => getBlogs()).then((data) => {
        if (isMounted && data) {
          setBlogs(data.slice(0, 4));
        }
      });
    };

    if (!initialBlogs || initialBlogs.length === 0) {
      fetchLatest();
    }

    const handleUpdate = () => fetchLatest();
    window.addEventListener("dmn-blogs-updated", handleUpdate);
    window.addEventListener("focus", handleUpdate);

    return () => {
      isMounted = false;
      window.removeEventListener("dmn-blogs-updated", handleUpdate);
      window.removeEventListener("focus", handleUpdate);
    };
  }, [initialBlogs]);

  return (
    <section className="section home-blogs-section" id="editorial-blogs" aria-label="Editorial Insights & Guides">
      <div className="container-wide">
        {/* Section Header */}
        <div className="blogs-header">
          <div className="blogs-header-text">
            <span className="eyebrow blogs-eyebrow">EDITORIAL &amp; INSIGHTS</span>
            <h2 className="blogs-headline">Interior ideas &amp; design guides.</h2>
            <p className="blogs-supporting">
              Practical guides on material science, space planning, lighting ergonomics, and turnkey residential execution from our Telangana design team.
            </p>
          </div>

          <div className="blogs-header-actions">
            <Link
              href="/blogs"
              className="btn btn-secondary blogs-cta-link"
              aria-label="Explore All Articles"
              style={{
                display: "inline-flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "8px",
                whiteSpace: "nowrap",
                textDecoration: "none",
              }}
            >
              <span style={{ display: "inline", whiteSpace: "nowrap" }}>Explore All Articles</span>
              <ArrowRight size={15} style={{ display: "inline-block", flexShrink: 0 }} />
            </Link>
          </div>
        </div>

        {/* 4 Cards: 2 Columns Desktop (2x2), 1 Column Mobile (1x4) */}
        {blogs.length > 0 ? (
          <div className="home-blogs-grid" role="list">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="home-blogs-empty-box">
            <div className="empty-disc">
              <BookOpen size={24} className="text-brand-blue" />
            </div>
            <h3 className="empty-head">Editorial Guides Coming Soon</h3>
            <p className="empty-sub">
              Our design team is crafting comprehensive interior design guides and material selection breakdowns.
            </p>
          </div>
        )}

        {/* Mobile View All Link */}
        {blogs.length > 0 && (
          <div className="mobile-view-all-row">
            <Link
              href="/blogs"
              className="btn btn-secondary mobile-view-all-btn"
              style={{
                display: "inline-flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                whiteSpace: "nowrap",
                width: "100%",
                textDecoration: "none",
              }}
            >
              <span style={{ display: "inline", whiteSpace: "nowrap" }}>View All Articles</span>
              <ArrowRight size={15} style={{ display: "inline-block", flexShrink: 0 }} />
            </Link>
          </div>
        )}
      </div>

      <style jsx>{`
        .home-blogs-section {
          background-color: var(--background);
          padding: var(--space-96) 0;
          border-top: 1px solid var(--border-subtle);
        }

        .blogs-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          margin-bottom: var(--space-48);
        }

        .blogs-header-text {
          max-width: 680px;
        }

        .blogs-eyebrow {
          color: #29ABE2;
          margin-bottom: 0.75rem;
          display: block;
        }

        .blogs-headline {
          font-family: var(--font-display);
          font-size: var(--text-statement);
          font-weight: 650;
          line-height: 1.15;
          letter-spacing: -0.025em;
          color: var(--foreground);
          margin-bottom: 0.75rem;
        }

        .blogs-supporting {
          font-family: var(--font-body);
          font-size: var(--text-body);
          line-height: 1.6;
          color: var(--foreground-muted);
          margin: 0;
        }

        .blogs-header-actions {
          flex-shrink: 0;
        }

        .blogs-cta-link {
          height: 44px;
          padding: 0 1.25rem;
          font-weight: 600;
          border-radius: 980px;
          transition: all 0.2s ease;
        }

        .home-blogs-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }

        .home-blogs-empty-box {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 3.5rem 1.5rem;
          text-align: center;
          max-width: 560px;
          margin: 0 auto;
        }

        .empty-disc {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(41, 171, 226, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem auto;
        }

        .text-brand-blue {
          color: #29ABE2;
        }

        .empty-head {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 650;
          color: var(--foreground);
          margin-bottom: 0.4rem;
        }

        .empty-sub {
          font-family: var(--font-body);
          font-size: 0.875rem;
          color: var(--foreground-muted);
          margin: 0;
          line-height: 1.5;
        }

        .mobile-view-all-row {
          display: none;
          margin-top: 2rem;
        }

        @media (max-width: 900px) {
          .home-blogs-grid {
            grid-template-columns: 1fr;
            gap: 1.75rem;
          }

          .blogs-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
            margin-bottom: 2rem;
          }

          .blogs-header-actions {
            display: none;
          }

          .mobile-view-all-row {
            display: block;
          }
        }
      `}</style>
    </section>
  );
}
