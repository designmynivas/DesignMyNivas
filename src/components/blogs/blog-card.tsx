"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { BlogItem, getBlogPreview, estimateReadingTime } from "@/types/blog";

interface BlogCardProps {
  blog: BlogItem;
  priority?: boolean;
}

export default function BlogCard({ blog, priority = false }: BlogCardProps) {
  const preview = getBlogPreview(blog.content, 150);
  const readTime = estimateReadingTime(blog.content);

  const formattedDate = new Date(blog.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="blog-card">
      <Link href={`/blogs/${blog.slug}`} className="blog-card-link" aria-label={`Read article: ${blog.title}`}>
        {/* Landscape Image Frame with Inset Spacing */}
        <div className="blog-image-wrap">
          <div className="blog-image-frame">
            <Image
              src={blog.cover_image || "/Images/main-hero.webp"}
              alt={blog.title}
              fill
              sizes="(max-width: 640px) 90vw, (max-width: 1200px) 34vw, 25vw"
              priority={priority}
              className="blog-cover-image"
              style={{ objectFit: "cover" }}
            />
            <div className="blog-tag-badge">
              <span>DESIGN JOURNAL</span>
            </div>
          </div>
        </div>

        {/* Card Content Area */}
        <div className="blog-card-body">
          <div className="blog-meta-strip">
            <span className="blog-meta-item">
              <Calendar size={13} className="meta-icon" />
              <span>{formattedDate}</span>
            </span>
            <span className="blog-meta-sep" aria-hidden="true">·</span>
            <span className="blog-meta-item">
              <Clock size={13} className="meta-icon" />
              <span>{readTime}</span>
            </span>
          </div>

          <h3 className="blog-card-title">{blog.title}</h3>

          <p className="blog-card-preview">{preview}</p>

          <div className="blog-card-footer">
            <span className="read-more-text">Read Article</span>
            <ArrowRight size={15} className="read-arrow-icon" aria-hidden="true" />
          </div>
        </div>
      </Link>

      <style jsx>{`
        .blog-card {
          background-color: #ffffff;
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          transition: border-color 0.22s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.22s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 16px rgba(24, 24, 24, 0.03);
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .blog-card:hover {
          border-color: #29ABE2;
          box-shadow: 0 14px 36px rgba(41, 171, 226, 0.12), 0 2px 8px rgba(0, 0, 0, 0.04);
          transform: translateY(-3px);
        }

        .blog-card-link {
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 100%;
        }

        /* Landscape Image Frame with 14px Inset Gap */
        .blog-image-wrap {
          padding: 10px 10px 0 10px;
          position: relative;
          width: 100%;
        }

        .blog-image-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          background-color: var(--background-muted);
          border-radius: 10px;
          overflow: hidden;
        }

        :global(.blog-cover-image) {
          object-fit: cover;
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .blog-card:hover :global(.blog-cover-image) {
          transform: scale(1.04);
        }

        .blog-tag-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          background-color: rgba(24, 24, 24, 0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: #ffffff;
          font-family: var(--font-body);
          font-size: 0.625rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 0.2rem 0.5rem;
          border-radius: 6px;
          z-index: 2;
        }

        /* Content Area */
        .blog-card-body {
          padding: 0.875rem 1rem 1rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .blog-meta-strip {
          display: flex !important;
          flex-direction: row !important;
          align-items: center !important;
          gap: 0.45rem !important;
          margin-bottom: 0.4rem;
          color: var(--foreground-subtle);
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 500;
          flex-wrap: wrap !important;
        }

        .blog-meta-item {
          display: inline-flex !important;
          flex-direction: row !important;
          align-items: center !important;
          gap: 0.35rem !important;
          white-space: nowrap !important;
        }

        :global(.meta-icon) {
          display: inline-block !important;
          flex-shrink: 0 !important;
          vertical-align: middle !important;
        }

        .blog-meta-sep {
          opacity: 0.5;
          display: inline-block !important;
        }

        .blog-card-title {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 650;
          color: var(--foreground);
          line-height: 1.35;
          letter-spacing: -0.01em;
          margin-bottom: 0.4rem;
          overflow-wrap: anywhere;
          transition: color 0.18s ease;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .blog-card:hover .blog-card-title {
          color: #29ABE2;
        }

        .blog-card-preview {
          font-family: var(--font-body);
          font-size: 0.8125rem;
          line-height: 1.5;
          color: var(--foreground-muted);
          margin-bottom: 0.75rem;
          flex-grow: 1;
          overflow-wrap: anywhere;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .blog-card-footer {
          margin-top: auto;
          display: inline-flex !important;
          flex-direction: row !important;
          align-items: center !important;
          gap: 0.45rem !important;
          color: #29ABE2;
          font-family: var(--font-body);
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          padding-top: 0.625rem;
          border-top: 1px solid var(--border-subtle);
          white-space: nowrap !important;
        }

        .read-more-text {
          display: inline !important;
          white-space: nowrap !important;
        }

        :global(.read-arrow-icon) {
          display: inline-block !important;
          flex-shrink: 0 !important;
          vertical-align: middle !important;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .blog-card:hover :global(.read-arrow-icon) {
          transform: translateX(4px);
        }

      `}</style>
    </article>
  );
}
