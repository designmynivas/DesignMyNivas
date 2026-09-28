"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Play,
  X,
  ArrowRight,
  CheckCircle2,
  Layers,
  Sparkles
} from "lucide-react";
import { ProjectItem } from "@/data/projects";
import { useBookingModal } from "@/context/booking-modal-context";
import { extractYouTubeId, getYouTubeEmbedUrl } from "@/lib/youtube";
import Breadcrumbs from "@/components/seo/breadcrumbs";
import { getProjectBreadcrumbs } from "@/lib/seo/breadcrumbs";

interface ProjectDetailClientProps {
  project: ProjectItem;
  relatedProjects: ProjectItem[];
}

export default function ProjectDetailClient({
  project,
  relatedProjects,
}: ProjectDetailClientProps) {
  const { openBookingModal } = useBookingModal();
  const [isPlayingInline, setIsPlayingInline] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  const breadcrumbs = getProjectBreadcrumbs(project.title, project.slug);
  const ytId = project.youtubeUrl ? extractYouTubeId(project.youtubeUrl) : null;
  const gallery = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];

  // Resolve matching service slug if available
  const serviceSlug =
    project.service?.toLowerCase().replace(/\s+/g, "-") ||
    project.type?.toLowerCase().replace(/\s+/g, "-") ||
    "complete-home-interiors";

  // Resolve matching location slug
  const locationSlug = project.location?.toLowerCase().includes("warangal")
    ? "warangal"
    : project.location?.toLowerCase().includes("karimnagar")
    ? "karimnagar"
    : "hyderabad";

  return (
    <div className="project-detail-container">
      {/* 01. Breadcrumb & Header */}
      <section className="project-header-section">
        <div className="container-wide">
          <Breadcrumbs items={breadcrumbs} includeSchema={false} />

          <div className="project-title-row">
            <div className="title-left">
              <div className="meta-badge-row">
                <span className="project-type-tag">{project.type}</span>
                <span className="badge-sep">·</span>
                <Link
                  href={`/interior-designers/${locationSlug}`}
                  className="location-link-badge"
                >
                  <MapPin size={13} />
                  <span>{project.location}</span>
                </Link>
              </div>

              <h1 className="project-h1">{project.title}</h1>
              <p className="project-lead">{project.description}</p>
            </div>

            <div className="title-right">
              <button
                type="button"
                onClick={() =>
                  openBookingModal({
                    service: project.service || project.type,
                    source: `project-${project.slug}-header`,
                  })
                }
                className="btn-book-project"
                aria-label={`Discuss a project like ${project.title}`}
              >
                <span>Discuss Similar Home</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 02. Media Hero: Image or Inline Video */}
      <section className="project-media-section" aria-label="Project Visual Presentation">
        <div className="container-wide">
          <div className="media-stage-box">
            {isPlayingInline && ytId ? (
              <div className="video-player-frame">
                <iframe
                  src={getYouTubeEmbedUrl(ytId, true)}
                  title={`${project.title} Video Walkthrough`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="stage-iframe"
                />
                <button
                  type="button"
                  onClick={() => setIsPlayingInline(false)}
                  className="close-stage-video"
                  aria-label="Close Video"
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <div className="image-stage-frame">
                <Image
                  src={gallery[activeGalleryIndex] || project.image}
                  alt={`${project.title} — ${project.type} designed by Design My Nivas in ${project.location}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 75vw"
                  className="stage-img"
                  style={{ objectFit: "cover" }}
                />

                {project.youtubeUrl && (
                  <button
                    type="button"
                    onClick={() => setIsPlayingInline(true)}
                    className="play-walkthrough-btn"
                    aria-label="Watch Video Walkthrough"
                  >
                    <div className="play-disc">
                      <Play size={22} fill="#FFFFFF" />
                    </div>
                    <span>Watch Video Tour</span>
                  </button>
                )}

                <div className="stage-caption-strip">
                  <span>{project.scope}</span>
                </div>
              </div>
            )}
          </div>

          {/* Gallery Thumbnail Selector if multiple images */}
          {gallery.length > 1 && !isPlayingInline && (
            <div className="gallery-thumbs-row">
              {gallery.map((img, idx) => (
                <button
                  key={img + idx}
                  type="button"
                  onClick={() => setActiveGalleryIndex(idx)}
                  className={`thumb-btn ${activeGalleryIndex === idx ? "is-active" : ""}`}
                  aria-label={`View photo ${idx + 1} of ${project.title}`}
                >
                  <Image
                    src={img}
                    alt={`${project.title} view ${idx + 1}`}
                    fill
                    sizes="120px"
                    style={{ objectFit: "cover" }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 03. Project Blueprint & Architectural Specifications */}
      <section className="specs-section" aria-label="Project Specifications">
        <div className="container-wide">
          <div className="specs-card-grid">
            <div className="spec-card">
              <span className="spec-label">Project Type</span>
              <span className="spec-value">{project.type}</span>
            </div>
            <div className="spec-card">
              <span className="spec-label">Location</span>
              <span className="spec-value">{project.location}</span>
            </div>
            <div className="spec-card">
              <span className="spec-label">Client</span>
              <span className="spec-value">{project.client}</span>
            </div>
            <div className="spec-card">
              <span className="spec-label">Execution Scope</span>
              <span className="spec-value">{project.scope}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 04. Design Challenge & Solution */}
      <section className="story-section" aria-label="Design Approach">
        <div className="container-wide">
          <div className="story-grid">
            <div className="story-card challenge-box">
              <div className="story-icon">
                <Layers size={22} />
              </div>
              <h2 className="story-title">Design Challenge</h2>
              <p className="story-desc">
                {project.story ||
                  `Creating a cohesive spatial identity for this ${project.location} residence while balancing ample concealed storage, modern acoustics, and natural ambient illumination.`}
              </p>
            </div>

            <div className="story-card solution-box">
              <div className="story-icon">
                <Sparkles size={22} />
              </div>
              <h2 className="story-title">Design Solution & Execution</h2>
              <p className="story-desc">
                {project.designApproach ||
                  `Our engineering team designed precision-calibrated BWP marine-grade modular woodwork, continuous ceiling cove lighting, and tactile natural finishes tailored specifically to the homeowner's routines.`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 05. Key Execution Highlights */}
      {project.highlights && project.highlights.length > 0 && (
        <section className="highlights-section" aria-label="Project Highlights">
          <div className="container-wide">
            <div className="highlights-card">
              <h2 className="highlights-title">Key Execution Highlights</h2>
              <div className="highlights-grid">
                {project.highlights.map((item, idx) => (
                  <div key={item + idx} className="highlight-item">
                    <CheckCircle2 size={18} className="check-icon" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 06. Materials & Joinery Specifications */}
      <section className="materials-section" aria-label="Materials Used">
        <div className="container-wide">
          <div className="materials-card">
            <div className="materials-header">
              <span className="section-eyebrow">Material Specifications</span>
              <h2 className="materials-title">Materials & Hardware Selected</h2>
              <p className="materials-lead">
                Every component was selected for longevity, termite immunity, and flawless tactile interaction.
              </p>
            </div>

            <div className="materials-grid">
              <div className="mat-item">
                <h3 className="mat-heading">Core Carcass Plywood</h3>
                <p className="mat-text">
                  IS:710 Certified Boiling Water Proof (BWP) Marine Plywood with 72-hour boiling water resistance.
                </p>
              </div>
              <div className="mat-item">
                <h3 className="mat-heading">Hardware & Runners</h3>
                <p className="mat-text">
                  European soft-close hinges, tandem drawer runners, and push-to-open magnetic latches.
                </p>
              </div>
              <div className="mat-item">
                <h3 className="mat-heading">Architectural Lighting</h3>
                <p className="mat-text">
                  3000K warm-white recessed COB spotlights and indirect concealed LED cove lighting.
                </p>
              </div>
              <div className="mat-item">
                <h3 className="mat-heading">Surfacing & Edge Finishes</h3>
                <p className="mat-text">
                  Factory-pressed scratch-resistant laminates and 1mm machine-applied PVC edge banding.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 07. Contextual Internal Links (Related Service & Location) */}
      <section className="contextual-links-section" aria-label="Related Services and Locations">
        <div className="container-wide">
          <div className="context-cards-row">
            <div className="context-card">
              <span className="ctx-eyebrow">Related Service</span>
              <h3 className="ctx-title">{project.service || project.type}</h3>
              <p className="ctx-desc">
                Learn more about our methodology, scope of work, and pricing structure for this service.
              </p>
              <Link href={`/services/${serviceSlug}`} className="ctx-link">
                <span>Explore Service Details</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="context-card">
              <span className="ctx-eyebrow">Local Service Area</span>
              <h3 className="ctx-title">Interior Design in {project.location}</h3>
              <p className="ctx-desc">
                Explore local projects, client home typologies, and turnkey site supervision in {project.location}.
              </p>
              <Link href={`/interior-designers/${locationSlug}`} className="ctx-link">
                <span>Explore {project.location} Studio</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 08. Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="related-projects-section" aria-label="More Completed Projects">
          <div className="container-wide">
            <div className="section-head">
              <h2 className="related-heading">More Homes We&apos;ve Designed</h2>
              <Link href="/projects" className="view-all-projects-link">
                <span>View All Projects</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="related-grid">
              {relatedProjects.slice(0, 3).map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className="related-item-card"
                >
                  <div className="related-img-frame">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                    <span className="related-loc">{p.location}</span>
                  </div>
                  <div className="related-content">
                    <span className="related-type">{p.type}</span>
                    <h3 className="related-title">{p.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 09. Consultation Banner */}
      <section className="project-cta-banner">
        <div className="container-wide">
          <div className="cta-banner-inner">
            <h2 className="cta-banner-h2">Love the design of {project.title}?</h2>
            <p className="cta-banner-p">
              Schedule a personalized consultation with Benson Cheripelli to discuss materials, 3D layouts, and budget estimates for your home.
            </p>
            <button
              type="button"
              onClick={() =>
                openBookingModal({
                  service: project.service || project.type,
                  source: `project-${project.slug}-bottom-cta`,
                })
              }
              className="btn-book-project"
            >
              <span>Book Complimentary Consultation</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        .project-detail-container {
          background-color: #FAFAFA;
          color: #181818;
          padding-top: 100px;
          min-height: 100vh;
        }

        .container-wide {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        /* Header */
        .project-header-section {
          padding: 1.5rem 0 2rem;
        }

        .project-title-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 2rem;
          margin-top: 0.5rem;
        }

        .meta-badge-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .project-type-tag {
          font-size: 0.8125rem;
          font-weight: 700;
          color: #0284C7;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .badge-sep {
          color: #CBD5E1;
        }

        .location-link-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.8125rem;
          color: #475569;
          text-decoration: none;
          background: #F1F5F9;
          padding: 0.2rem 0.6rem;
          border-radius: 9999px;
          transition: background 0.15s ease;
        }

        .location-link-badge:hover {
          background: #E2E8F0;
          color: #0F172A;
        }

        .project-h1 {
          font-family: var(--font-inter, sans-serif);
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          font-weight: 700;
          color: #0F172A;
          line-height: 1.15;
          letter-spacing: -0.025em;
          text-transform: capitalize;
          margin: 0 0 0.85rem 0;
        }

        .project-lead {
          font-size: 1.0625rem;
          line-height: 1.6;
          color: #475569;
          max-width: 680px;
          margin: 0;
        }

        .btn-book-project {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #0284C7;
          color: #FFFFFF;
          font-size: 0.9375rem;
          font-weight: 600;
          padding: 0.875rem 1.5rem;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(2, 132, 199, 0.25);
          white-space: nowrap;
        }

        .btn-book-project:hover {
          background: #0369A1;
          transform: translateY(-1px);
        }

        /* Media Stage */
        .project-media-section {
          padding: 1.5rem 0 3rem;
        }

        .media-stage-box {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
          background: #0F172A;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 12px 36px rgba(0,0,0,0.1);
        }

        .image-stage-frame {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .play-walkthrough-btn {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: inline-flex;
          align-items: center;
          gap: 0.85rem;
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #FFFFFF;
          font-size: 0.9375rem;
          font-weight: 600;
          padding: 0.75rem 1.5rem;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .play-walkthrough-btn:hover {
          background: #0284C7;
          border-color: #0284C7;
          transform: translate(-50%, -50%) scale(1.04);
        }

        .play-disc {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #0284C7;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stage-caption-strip {
          position: absolute;
          bottom: 1rem;
          left: 1rem;
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(6px);
          color: #FFFFFF;
          font-size: 0.8125rem;
          font-weight: 500;
          padding: 0.4rem 0.85rem;
          border-radius: 6px;
        }

        .video-player-frame {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .stage-iframe {
          width: 100%;
          height: 100%;
          border: none;
        }

        .close-stage-video {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(15, 23, 42, 0.85);
          color: #FFFFFF;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s ease;
        }

        .close-stage-video:hover {
          background: #0284C7;
        }

        .gallery-thumbs-row {
          display: flex;
          gap: 0.75rem;
          margin-top: 1rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
        }

        .thumb-btn {
          position: relative;
          width: 110px;
          aspect-ratio: 16/10;
          border-radius: 8px;
          overflow: hidden;
          border: 2px solid transparent;
          cursor: pointer;
          flex-shrink: 0;
          background: #E2E8F0;
          transition: border-color 0.15s ease;
        }

        .thumb-btn.is-active {
          border-color: #0284C7;
        }

        /* Specs */
        .specs-section {
          padding: 1rem 0 2.5rem;
        }

        .specs-card-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          padding: 1.75rem;
        }

        .spec-card {
          display: flex;
          flex-direction: column;
        }

        .spec-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          color: #64748B;
          font-weight: 600;
          margin-bottom: 0.35rem;
        }

        .spec-value {
          font-size: 1rem;
          font-weight: 700;
          color: #0F172A;
        }

        /* Story */
        .story-section {
          padding: 2rem 0;
        }

        .story-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.75rem;
        }

        .story-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          padding: 2.25rem;
        }

        .story-icon {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: rgba(2, 132, 199, 0.08);
          color: #0284C7;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }

        .story-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #0F172A;
          margin: 0 0 0.75rem 0;
        }

        .story-desc {
          font-size: 0.95rem;
          line-height: 1.65;
          color: #475569;
          margin: 0;
        }

        /* Highlights */
        .highlights-section {
          padding: 2rem 0;
        }

        .highlights-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          padding: 2.25rem;
        }

        .highlights-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #0F172A;
          margin: 0 0 1.5rem 0;
        }

        .highlights-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        .highlight-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9375rem;
          color: #334155;
          font-weight: 500;
        }

        .check-icon {
          color: #0284C7;
          flex-shrink: 0;
        }

        /* Materials */
        .materials-section {
          padding: 2.5rem 0;
        }

        .materials-card {
          background: #0F172A;
          color: #FFFFFF;
          border-radius: 16px;
          padding: 3rem;
        }

        .section-eyebrow {
          font-size: 0.8125rem;
          font-weight: 700;
          text-transform: uppercase;
          color: #38BDF8;
          letter-spacing: 0.05em;
          display: block;
          margin-bottom: 0.5rem;
        }

        .materials-title {
          font-size: 1.75rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
          color: #FFFFFF;
        }

        .materials-lead {
          font-size: 0.95rem;
          color: #94A3B8;
          margin: 0 0 2.5rem 0;
        }

        .materials-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .mat-item {
          border-top: 1px solid rgba(255,255,255,0.12);
          padding-top: 1.25rem;
        }

        .mat-heading {
          font-size: 1rem;
          font-weight: 600;
          color: #FFFFFF;
          margin: 0 0 0.5rem 0;
        }

        .mat-text {
          font-size: 0.8125rem;
          line-height: 1.55;
          color: #94A3B8;
          margin: 0;
        }

        /* Contextual Internal Links */
        .contextual-links-section {
          padding: 2.5rem 0;
        }

        .context-cards-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.75rem;
        }

        .context-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
        }

        .ctx-eyebrow {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          color: #0284C7;
          margin-bottom: 0.4rem;
        }

        .ctx-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #0F172A;
          margin: 0 0 0.65rem 0;
        }

        .ctx-desc {
          font-size: 0.875rem;
          line-height: 1.6;
          color: #64748B;
          margin: 0 0 1.25rem 0;
          flex-grow: 1;
        }

        .ctx-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: #0284C7;
          text-decoration: none;
        }

        .ctx-link:hover {
          text-decoration: underline;
        }

        /* Related Projects */
        .related-projects-section {
          padding: 3rem 0;
        }

        .section-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.75rem;
        }

        .related-heading {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0F172A;
          margin: 0;
        }

        .view-all-projects-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: #0284C7;
          text-decoration: none;
        }

        .related-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
        }

        .related-item-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          overflow: hidden;
          text-decoration: none;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .related-item-card:hover {
          transform: translateY(-3px);
          border-color: #0284C7;
        }

        .related-img-frame {
          position: relative;
          aspect-ratio: 16/10;
          background: #0F172A;
        }

        .related-loc {
          position: absolute;
          top: 0.6rem;
          right: 0.6rem;
          background: rgba(15, 23, 42, 0.8);
          color: #FFFFFF;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.2rem 0.5rem;
          border-radius: 9999px;
        }

        .related-content {
          padding: 1.25rem;
        }

        .related-type {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          color: #0284C7;
        }

        .related-title {
          font-size: 1.0625rem;
          font-weight: 700;
          color: #0F172A;
          margin: 0.25rem 0 0 0;
          text-transform: capitalize;
        }

        /* Bottom CTA */
        .project-cta-banner {
          padding: 2rem 0 5rem;
        }

        .cta-banner-inner {
          background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
          border-radius: 16px;
          padding: clamp(2.5rem, 5vw, 3.5rem);
          text-align: center;
          color: #FFFFFF;
        }

        .cta-banner-h2 {
          font-size: clamp(1.75rem, 3vw, 2.25rem);
          font-weight: 700;
          margin: 0 0 0.85rem 0;
          color: #FFFFFF;
        }

        .cta-banner-p {
          font-size: 1.0625rem;
          color: #94A3B8;
          max-width: 580px;
          margin: 0 auto 2rem auto;
          line-height: 1.6;
        }

        @media (max-width: 1024px) {
          .specs-card-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .materials-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .related-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .project-title-row {
            flex-direction: column;
            align-items: stretch;
          }
          .story-grid, .highlights-grid, .context-cards-row {
            grid-template-columns: 1fr;
          }
          .materials-card {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
