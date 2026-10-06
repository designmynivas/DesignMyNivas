"use client";

import React, { useState } from "react";
import BlogCard from "@/components/blogs/blog-card";
import { BlogItem } from "@/types/blog";
import { BookOpen } from "lucide-react";

interface BlogsClientProps {
  initialBlogs: BlogItem[];
}

export default function BlogsClient({ initialBlogs }: BlogsClientProps) {
  const [blogs, setBlogs] = useState<BlogItem[]>(initialBlogs || []);
  const [prevInitial, setPrevInitial] = useState(initialBlogs);

  if (initialBlogs !== prevInitial) {
    setPrevInitial(initialBlogs);
    setBlogs(initialBlogs || []);
  }

  return (
    <div className="blogs-page-wrapper">
      {/* Header Section */}
      <section className="blogs-header-section">
        <div className="container-wide">
          <div className="blogs-header-content">
            <h1 className="blogs-main-title">
              Interior Design <span className="hl">Blogs</span>
            </h1>
            <p className="blogs-main-subtitle">
              Practical ideas and guides for planning your home.
            </p>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="blogs-grid-section" aria-label="Interior Design Articles">
        <div className="container-wide">
          {blogs.length > 0 ? (
            <div className="blogs-grid">
              {blogs.map((blog, idx) => (
                <BlogCard key={blog.id} blog={blog} priority={idx < 2} />
              ))}
            </div>
          ) : (
            <div className="blogs-empty-state">
              <div className="empty-icon-circle">
                <BookOpen size={28} className="empty-icon" />
              </div>
              <h2 className="empty-title">Articles Coming Soon</h2>
              <p className="empty-text">
                Our design team is crafting comprehensive interior design guides and material selection breakdowns. Check back soon for fresh insights.
              </p>
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        .blogs-page-wrapper {
          background-color: var(--background);
          min-height: 100vh;
          padding-bottom: 5rem;
        }

        .blogs-header-section {
          padding: 8rem 0 2.5rem 0;
          border-bottom: 1px solid var(--border-subtle);
          background: linear-gradient(180deg, rgba(247, 245, 240, 0.4) 0%, rgba(239, 237, 231, 0.6) 100%);
        }

        .blogs-header-content {
          max-width: 820px;
          margin: 0 auto;
          text-align: center;
        }

        .hl {
          color: var(--brand-blue);
        }

        .blogs-main-title {
          font-family: var(--font-display);
          font-size: clamp(2.25rem, 4.2vw, 3.5rem);
          font-weight: 680;
          line-height: 1.1;
          letter-spacing: -0.03em;
          color: var(--foreground);
          margin-bottom: 0.75rem;
        }

        .blogs-main-subtitle {
          font-family: var(--font-body);
          font-size: clamp(1rem, 1.3vw, 1.1875rem);
          line-height: 1.65;
          color: var(--foreground-muted);
          max-width: 680px;
          margin: 0 auto;
        }

        .blogs-grid-section {
          padding: 3.5rem 0 2rem 0;
        }

        .blogs-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
        }

        @media (max-width: 1200px) {
          .blogs-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* Empty State */
        .blogs-empty-state {
          text-align: center;
          padding: 5rem 1.5rem;
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 20px;
          max-width: 580px;
          margin: 0 auto;
        }

        .empty-icon-circle {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(41, 171, 226, 0.08);
          color: #29ABE2;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.25rem auto;
        }

        .empty-title {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 650;
          color: var(--foreground);
          margin-bottom: 0.5rem;
        }

        .empty-text {
          font-family: var(--font-body);
          font-size: 0.9375rem;
          line-height: 1.6;
          color: var(--foreground-muted);
        }

        @media (max-width: 900px) {
          .blogs-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }

          .blogs-header-section {
            padding: 7rem 0 2.5rem 0;
          }
        }

        @media (max-width: 540px) {
          .blogs-header-section {
            padding: 6.75rem 0 2rem 0;
          }

          .blogs-grid-section {
            padding: 2rem 0;
          }

          .blogs-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
