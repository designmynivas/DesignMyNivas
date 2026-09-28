"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BreadcrumbItem } from "@/lib/seo/breadcrumbs";
import JsonLd from "@/components/seo/json-ld";
import { generateBreadcrumbSchema } from "@/lib/seo/schema";

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  includeSchema?: boolean;
  className?: string;
}

export default function Breadcrumbs({
  items,
  includeSchema = true,
  className = "",
}: BreadcrumbsProps) {
  if (!items || items.length === 0) return null;

  return (
    <>
      {includeSchema && <JsonLd data={generateBreadcrumbSchema(items)} />}
      <nav
        aria-label="Breadcrumb"
        className={`seo-breadcrumbs ${className}`}
      >
        <ol className="breadcrumbs-list">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li
                key={item.url + index}
                className={`breadcrumb-item ${isLast ? "is-current" : ""}`}
              >
                {isLast ? (
                  <span
                    className="breadcrumb-text-current"
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link href={item.url} className="breadcrumb-link">
                      {item.name}
                    </Link>
                    <ChevronRight
                      size={13}
                      className="breadcrumb-separator-icon"
                      aria-hidden="true"
                    />
                  </>
                )}
              </li>
            );
          })}
        </ol>

        <style jsx>{`
          .seo-breadcrumbs {
            display: flex;
            align-items: center;
            font-size: 0.8125rem;
            line-height: 1.4;
            color: #64748B;
            margin-bottom: 1.25rem;
            overflow-x: auto;
            white-space: nowrap;
            -webkit-overflow-scrolling: touch;
            padding: 0.25rem 0;
          }

          .breadcrumbs-list {
            display: inline-flex;
            align-items: center;
            list-style: none;
            padding: 0;
            margin: 0;
            gap: 0.35rem;
          }

          .breadcrumb-item {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
          }

          .breadcrumb-link {
            color: #475569;
            text-decoration: none;
            transition: color 0.15s ease;
            font-weight: 500;
          }

          .breadcrumb-link:hover {
            color: #0284C7;
          }

          .breadcrumb-separator-icon {
            color: #94A3B8;
            flex-shrink: 0;
          }

          .breadcrumb-text-current {
            color: #0F172A;
            font-weight: 600;
            max-width: 280px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          @media (max-width: 640px) {
            .seo-breadcrumbs {
              font-size: 0.75rem;
              margin-bottom: 0.85rem;
            }
            .breadcrumb-text-current {
              max-width: 180px;
            }
          }
        `}</style>
      </nav>
    </>
  );
}
