"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, X } from "lucide-react";
import { ProjectItem } from "@/data/projects";
import { extractYouTubeId, getYouTubeThumbnail, getYouTubeEmbedUrl } from "@/lib/youtube";
import { useBookingModal } from "@/context/booking-modal-context";

interface ProjectCardProps {
  project: ProjectItem;
  priority?: boolean;
}

export default function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const [isPlayingInline, setIsPlayingInline] = useState(false);
  const { openBookingModal } = useBookingModal();

  const title = project.title;
  const slug = project.slug;
  const youtubeUrl = project.youtubeUrl;
  const ytId = youtubeUrl ? extractYouTubeId(youtubeUrl) : null;

  let initialImage = project.image || "/Images/main-hero.webp";
  if (ytId && (!project.image || project.image === "/Images/main-hero.webp")) {
    initialImage = getYouTubeThumbnail(ytId, "maxres");
  }

  const [imageSrc, setImageSrc] = useState(initialImage);
  const location = project.location;
  const projectType = project.type;
  const client = project.client;
  const description = project.description;

  const handleCardClick = (e: React.MouseEvent) => {
    // If the click originated from an explicit link, button, or inline video player, let that element handle it
    const target = e.target as HTMLElement;
    if (
      target.closest("button") ||
      target.closest("a") ||
      target.closest(".project-inline-video") ||
      target.closest("iframe")
    ) {
      return;
    }
    openBookingModal({
      service: project.service || project.type,
      source: `project-card-${slug}`,
    });
  };

  const handleBookConsultation = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openBookingModal({
      service: project.service || project.type,
      source: `project-card-btn-${slug}`,
    });
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPlayingInline(true);
  };

  return (
    <>
      <article
        className={`project-card ${isPlayingInline ? "is-playing-video" : ""}`}
        role="listitem"
        onClick={handleCardClick}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            if ((e.target as HTMLElement).closest("button") || (e.target as HTMLElement).closest("a")) return;
            e.preventDefault();
            openBookingModal({
              service: project.service || project.type,
              source: `project-card-${slug}`,
            });
          }
        }}
      >
        {/* Portrait Image / Video Frame with Inset Gap */}
        <div className="project-image-wrap">
          <div className="project-image-frame">
            {isPlayingInline && ytId ? (
              <div className="project-inline-video">
                <iframe
                  src={getYouTubeEmbedUrl(ytId, true)}
                  title={`${title} Video Tour`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="project-inline-iframe"
                />
                <button
                  type="button"
                  className="project-video-close"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlayingInline(false);
                  }}
                  aria-label="Close video"
                  title="Stop & close video"
                >
                  <X size={15} />
                </button>
              </div>
            ) : (
              <>
                <Image
                  src={imageSrc}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={priority}
                  className="project-cover-image"
                  style={{ objectFit: "cover" }}
                  onError={() => {
                    if (ytId && imageSrc !== getYouTubeThumbnail(ytId, "hq")) {
                      setImageSrc(getYouTubeThumbnail(ytId, "hq"));
                    }
                  }}
                />
                <div className="project-location-badge">
                  <span>{location.toUpperCase()}</span>
                </div>

                {/* YouTube Video Overlay Play Button */}
                {youtubeUrl && (
                  <button
                    type="button"
                    onClick={handlePlayClick}
                    className="project-play-button"
                    aria-label={`Play video tour for ${title}`}
                  >
                    <div className="play-icon-disc">
                      <Play size={20} fill="#FFFFFF" className="play-icon" />
                    </div>
                    <span className="play-label">Watch Tour</span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Structured Architectural Content */}
        <div className="project-card-body">
          <div className="project-meta-strip">
            <span className="project-type-tag">{projectType.toUpperCase()}</span>
            <span className="project-meta-sep" aria-hidden="true">·</span>
            <span className="project-client-name">{client}</span>
          </div>

          <h3 className="project-title">
            <Link href={`/projects/${slug}`} className="project-title-link">
              {title}
            </Link>
          </h3>

          <p className="project-desc">{description}</p>

          {/* Action Buttons Row:
              1st Primary: "Book Consultation" (solid sky blue)
              2nd CTA: "Video Details" (when video exists, grey/black stroke or active playing state)
          */}
          <div className="project-cta-row">
            <button
              type="button"
              onClick={handleBookConsultation}
              className="project-btn-primary"
              aria-label={`Book Consultation for ${title}`}
            >
              <span>Book Consultation</span>
            </button>

            {youtubeUrl && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsPlayingInline((prev) => !prev);
                }}
                className={`project-btn-video ${isPlayingInline ? "is-playing" : ""}`}
                aria-label={isPlayingInline ? `Stop video for ${title}` : `Watch video details for ${title}`}
              >
                {isPlayingInline ? (
                  <>
                    <span className="playing-pulse-indicator" aria-hidden="true" />
                    <span>Playing Video</span>
                  </>
                ) : (
                  <>
                    <Play size={13} fill="currentColor" />
                    <span>Video Details</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </article>

      <style jsx>{`
        .project-card {
          background-color: #ffffff;
          border: 1px solid var(--border);
          border-radius: 20px;
          overflow: hidden;
          transition: border-color 0.22s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.22s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 1px 3px rgba(24, 24, 24, 0.02);
          height: 100%;
          display: flex;
          flex-direction: column;
          cursor: pointer;
        }

        .project-card:hover {
          border-color: #29ABE2;
          box-shadow: 0 14px 36px rgba(41, 171, 226, 0.12), 0 2px 8px rgba(0, 0, 0, 0.04);
          transform: translateY(-2px);
        }

        /* Portrait Image / Video Frame with Inset Gap */
        .project-image-wrap {
          padding: 14px 14px 0 14px;
          position: relative;
          width: 100%;
        }

        .project-image-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          background-color: var(--background-muted);
          border-radius: 14px;
          overflow: hidden;
        }

        :global(.project-cover-image) {
          object-fit: cover;
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .project-card:hover :global(.project-cover-image) {
          transform: scale(1.03);
        }

        .project-location-badge {
          position: absolute;
          top: 14px;
          right: 14px;
          background-color: rgba(24, 24, 24, 0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: #ffffff;
          font-family: var(--font-body);
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          padding: 0.3rem 0.625rem;
          border-radius: 6px;
          z-index: 2;
        }

        /* Video Play Overlay Button — NO blur, transparent bg, just centered play disc */
        .project-play-button {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 0.625rem;
          background: transparent;
          border: none;
          color: #FFFFFF;
          cursor: pointer;
          z-index: 3;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .project-card:hover .project-play-button {
          background: rgba(18, 20, 24, 0.15);
        }

        .play-icon-disc {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: #29ABE2;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-left: 3px;
          box-shadow: 0 4px 20px rgba(41, 171, 226, 0.55);
          transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.22s ease;
        }

        .project-card:hover .play-icon-disc {
          transform: scale(1.12);
          box-shadow: 0 6px 26px rgba(41, 171, 226, 0.7);
        }

        .play-label {
          font-family: var(--font-body);
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: #FFFFFF;
          text-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
        }

        .project-card-body {
          padding: 1.5rem 1.5rem 1.75rem 1.5rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .project-meta-strip {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.625rem;
          flex-wrap: wrap;
        }

        .project-type-tag {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #29ABE2;
        }

        .project-meta-sep {
          color: var(--foreground-subtle);
          opacity: 0.4;
          font-size: 0.75rem;
        }

        .project-client-name {
          font-family: var(--font-body);
          font-size: 0.75rem;
          color: var(--foreground-subtle);
          font-weight: 500;
        }

        .project-title {
          font-family: var(--font-display);
          font-size: clamp(1.35rem, 2.2vw, 1.625rem);
          font-weight: 650;
          color: var(--foreground);
          line-height: 1.25;
          letter-spacing: -0.02em;
          margin-bottom: 0.75rem;
          transition: color 0.15s ease;
        }

        .project-title-link {
          color: inherit;
          text-decoration: none;
          display: inline-block;
          transition: color 0.15s ease;
        }

        .project-title-link:hover {
          color: #29ABE2;
          text-decoration: underline;
        }

        .project-card:hover .project-title {
          color: #29ABE2;
        }

        .project-desc {
          font-family: var(--font-body);
          font-size: 0.9375rem;
          line-height: 1.6;
          color: var(--foreground-muted);
          margin-bottom: 1.5rem;
          flex-grow: 1;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .project-cta-row {
          margin-top: auto;
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: nowrap;
          width: 100%;
        }

        /* 1st Primary Button: Solid Sky Blue Glow (#29ABE2) */
        .project-btn-primary {
          display: inline-flex !important;
          flex-direction: row !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 0.45rem !important;
          height: 42px !important;
          padding: 0 1.25rem !important;
          background: linear-gradient(180deg, #3BB6EA 0%, #1793C9 100%) !important;
          color: #FFFFFF !important;
          border: 1px solid #29ABE2 !important;
          border-radius: 12px !important;
          font-family: var(--font-body) !important;
          font-size: 0.8125rem !important;
          font-weight: 650 !important;
          cursor: pointer !important;
          white-space: nowrap !important;
          flex: 1 1 0px !important;
          width: 100% !important;
          box-shadow: 0 4px 14px rgba(41, 171, 226, 0.4) !important;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1) !important;
          text-decoration: none !important;
        }

        .project-btn-primary:hover {
          background: linear-gradient(180deg, #48BEF0 0%, #1388BC 100%) !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(41, 171, 226, 0.55) !important;
        }

        .project-btn-primary span {
          white-space: nowrap !important;
          display: inline !important;
        }

        /* 2nd CTA Button: White BG with Black/Grey Stroke (When Video Exists) */
        :global(.project-btn-video),
        .project-btn-video {
          display: inline-flex !important;
          flex-direction: row !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 0.45rem !important;
          height: 42px !important;
          padding: 0 1rem !important;
          background: #FFFFFF !important;
          color: #181818 !important;
          border: 1.5px solid #D8D5CF !important;
          border-radius: 12px !important;
          font-family: var(--font-body) !important;
          font-size: 0.8125rem !important;
          font-weight: 600 !important;
          cursor: pointer !important;
          white-space: nowrap !important;
          flex: 1 1 0px !important;
          min-width: 110px !important;
          transition: all 0.2s ease !important;
          text-decoration: none !important;
        }

        :global(.project-btn-video:hover),
        .project-btn-video:hover {
          border-color: #181818 !important;
          background: #F7F5F0 !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 4px 12px rgba(24, 24, 24, 0.08) !important;
        }

        :global(.project-btn-video.is-playing),
        .project-btn-video.is-playing {
          background: rgba(41, 171, 226, 0.12) !important;
          border-color: #29ABE2 !important;
          color: #29ABE2 !important;
        }

        .playing-pulse-indicator {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #29ABE2;
          display: inline-block;
          animation: pulsePlayDotProject 1.4s ease-in-out infinite;
        }

        @keyframes pulsePlayDotProject {
          0%, 100% {
            transform: scale(0.85);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.3);
            opacity: 1;
          }
        }

        /* Inline Video Player Elements */
        .project-inline-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background: #000000;
          z-index: 4;
        }

        .project-inline-iframe {
          width: 100%;
          height: 100%;
          border: none;
          display: block;
        }

        .project-video-close {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(18, 20, 24, 0.82);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          padding: 0;
        }

        .project-video-close:hover {
          background: #29ABE2;
          border-color: #29ABE2;
          color: #ffffff;
          transform: scale(1.08);
        }

        .project-btn-video span {
          white-space: nowrap !important;
          display: inline !important;
        }

        :global(.project-btn-primary svg),
        :global(.project-btn-video svg) {
          flex-shrink: 0 !important;
          display: inline-block !important;
        }

        .arrow-icon {
          display: inline-block;
          flex-shrink: 0;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .project-btn-primary:hover .arrow-icon {
          transform: translateX(3px);
        }

        @media (max-width: 540px) {
          .project-image-wrap {
            padding: 10px 10px 0 10px;
          }

          .project-card-body {
            padding: 1.25rem 1.125rem 1.35rem 1.125rem;
          }

          .project-cta-row {
            display: flex !important;
            flex-direction: row !important;
            gap: 0.5rem !important;
          }

          .project-btn-primary {
            flex: 1 1 0px !important;
            justify-content: center !important;
            height: 42px !important;
            font-size: 0.8125rem !important;
          }

          :global(.project-btn-video),
          .project-btn-video {
            flex: 1 1 0px !important;
            min-width: 0 !important;
            justify-content: center !important;
            height: 42px !important;
            font-size: 0.8125rem !important;
          }
        }
      `}</style>
    </>
  );
}
