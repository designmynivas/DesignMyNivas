"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";
import type { Testimonial } from "@/types/testimonial";
import { extractYouTubeId, getYouTubeThumbnail, getYouTubeEmbedUrl } from "@/lib/youtube";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const [isPlayingInline, setIsPlayingInline] = useState(false);

  const youtubeUrl = testimonial.youtube_url;
  const youtubeId = youtubeUrl ? extractYouTubeId(youtubeUrl) : null;
  const thumbnailUrl = youtubeId ? getYouTubeThumbnail(youtubeId) : null;

  return (
    <>
      <article
        className={`testimonial-card ${youtubeUrl ? "video-testimonial-card" : ""} ${isPlayingInline ? "is-playing-video" : ""}`}
        role="listitem"
        onClick={() => {
          if (youtubeUrl && !isPlayingInline) setIsPlayingInline(true);
        }}
      >
        {/* If video testimonial: Landscape Video Frame with Inset Spacing */}
        {youtubeUrl && (thumbnailUrl || isPlayingInline) && (
          <div className="testimonial-video-wrap">
            <div className="testimonial-video-frame">
              {isPlayingInline && youtubeId ? (
                <div className="testimonial-inline-video">
                  <iframe
                    src={getYouTubeEmbedUrl(youtubeId, true)}
                    title={`${testimonial.client_name} Review Video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="testimonial-inline-iframe"
                  />
                  <button
                    type="button"
                    className="testimonial-video-close"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsPlayingInline(false);
                    }}
                    aria-label="Stop video"
                    title="Stop & close video"
                  >
                    <X size={15} />
                  </button>
                </div>
              ) : (
                <>
                  {thumbnailUrl && (
                    <Image
                      src={thumbnailUrl}
                      alt={`${testimonial.client_name} Review`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="testimonial-cover-image"
                    />
                  )}
                  <div className="testimonial-play-overlay">
                    <div className="play-icon-circle">
                      <Play size={20} fill="#FFFFFF" className="play-triangle" />
                    </div>
                    <span className="play-cta-text">Watch Client Story</span>
                  </div>
                  <div className="testimonial-location-tag">
                    <span>{testimonial.location.toUpperCase()}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="testimonial-body">
          {!youtubeUrl && (
            <div className="card-top-row">
              <span className="quote-mark" aria-hidden="true">&ldquo;</span>
              <div className="location-tag">{testimonial.location}</div>
            </div>
          )}

          <blockquote className="testimonial-quote">
            <p>&ldquo;{testimonial.quote}&rdquo;</p>
          </blockquote>

          <div className="testimonial-footer">
            <div className="client-info">
              <span className="client-name">{testimonial.client_name}</span>
              {testimonial.project_title && (
                <span className="client-project">{testimonial.project_title}</span>
              )}
            </div>
            {youtubeUrl ? (
              <button
                type="button"
                className={`watch-video-pill ${isPlayingInline ? "is-playing" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPlayingInline((prev) => !prev);
                }}
                aria-label={isPlayingInline ? "Stop video" : "Play video"}
              >
                {isPlayingInline ? (
                  <>
                    <span className="playing-pulse-indicator" aria-hidden="true" />
                    <span>Playing Video</span>
                  </>
                ) : (
                  <>
                    <Play size={12} fill="currentColor" />
                    <span>Play Video</span>
                  </>
                )}
              </button>
            ) : (
              <span className="verified-badge">Verified Homeowner</span>
            )}
          </div>
        </div>

        <style jsx>{`
          .testimonial-card {
            display: flex;
            flex-direction: column;
            border: 1px solid var(--border);
            border-radius: 20px;
            background-color: #ffffff;
            box-shadow: 0 4px 16px rgba(24, 24, 24, 0.03);
            transition: border-color 0.22s cubic-bezier(0.16, 1, 0.3, 1),
                        box-shadow 0.22s cubic-bezier(0.16, 1, 0.3, 1),
                        transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
            height: 100%;
            overflow: hidden;
          }

          .testimonial-card:hover {
            border-color: var(--brand-blue);
            box-shadow: 0 12px 32px rgba(24, 24, 24, 0.06);
            transform: translateY(-2px);
          }

          .video-testimonial-card {
            cursor: pointer;
          }

          /* Portrait Video Frame with 14px Inset Gap */
          .testimonial-video-wrap {
            padding: 14px 14px 0 14px;
            width: 100%;
          }

          .testimonial-video-frame {
            position: relative;
            width: 100%;
            aspect-ratio: 4 / 5;
            background-color: #121418;
            border-radius: 14px;
            overflow: hidden;
          }

          :global(.testimonial-cover-image) {
            object-fit: cover;
            transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .testimonial-card:hover :global(.testimonial-cover-image) {
            transform: scale(1.03);
          }

          .testimonial-play-overlay {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 0.625rem;
            background: rgba(18, 20, 24, 0.35);
            transition: background 0.2s ease;
          }

          .testimonial-card:hover .testimonial-play-overlay {
            background: rgba(18, 20, 24, 0.5);
          }

          .play-icon-circle {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #29ABE2;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 20px rgba(41, 171, 226, 0.5);
            transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .play-triangle {
            margin-left: 3px;
          }

          .testimonial-card:hover .play-icon-circle {
            transform: scale(1.1);
          }

          .play-cta-text {
            font-family: var(--font-body);
            font-size: 0.8125rem;
            font-weight: 700;
            color: #FFFFFF;
            letter-spacing: 0.04em;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
          }

          .testimonial-location-tag {
            position: absolute;
            top: 12px;
            right: 12px;
            background-color: rgba(24, 24, 24, 0.85);
            backdrop-filter: blur(8px);
            color: #ffffff;
            font-family: var(--font-body);
            font-size: 0.6875rem;
            font-weight: 700;
            letter-spacing: 0.1em;
            padding: 0.25rem 0.55rem;
            border-radius: 6px;
            z-index: 2;
          }

          .testimonial-body {
            padding: 1.75rem 1.75rem 1.75rem 1.75rem;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
          }

          .card-top-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1.25rem;
          }

          .quote-mark {
            font-family: var(--font-display);
            font-size: 3rem;
            line-height: 0.8;
            color: var(--brand-blue);
          }

          .location-tag {
            font-family: var(--font-body);
            font-size: 0.6875rem;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: var(--foreground-subtle);
            background-color: var(--background);
            padding: 0.25rem 0.625rem;
            border-radius: 6px;
          }

          .testimonial-quote p {
            font-family: var(--font-display);
            font-size: 1.0625rem;
            line-height: 1.65;
            color: var(--foreground);
            margin-bottom: 1.75rem;
            flex-grow: 1;
          }

          .testimonial-footer {
            margin-top: auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-top: 1.25rem;
            border-top: 1px solid var(--border-subtle);
            gap: 1rem;
          }

          .client-info {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
          }

          .client-name {
            font-family: var(--font-body);
            font-size: 0.9375rem;
            font-weight: 650;
            color: var(--foreground);
          }

          .client-project {
            font-size: 0.78125rem;
            color: var(--foreground-muted);
          }

          .verified-badge {
            font-size: 0.6875rem;
            font-weight: 600;
            color: #059669;
            background-color: rgba(5, 150, 105, 0.08);
            border: 1px solid rgba(5, 150, 105, 0.2);
            padding: 0.2rem 0.5rem;
            border-radius: 4px;
            white-space: nowrap;
          }

          .watch-video-pill {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            padding: 0.35rem 0.75rem;
            background: rgba(41, 171, 226, 0.08);
            color: #29ABE2;
            border: 1.5px solid rgba(41, 171, 226, 0.3);
            border-radius: 8px;
            font-size: 0.75rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .watch-video-pill:hover {
            background: #29ABE2;
            color: #FFFFFF;
          }

          .watch-video-pill.is-playing {
            background: rgba(41, 171, 226, 0.15);
            border-color: #29ABE2;
            color: #29ABE2;
          }

          .playing-pulse-indicator {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #29ABE2;
            display: inline-block;
            animation: pulsePlayDot 1.4s ease-in-out infinite;
          }

          @keyframes pulsePlayDot {
            0%, 100% {
              transform: scale(0.85);
              opacity: 0.6;
            }
            50% {
              transform: scale(1.3);
              opacity: 1;
            }
          }

          /* Inline Video Styles */
          .testimonial-inline-video {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            background: #000000;
            z-index: 4;
          }

          .testimonial-inline-iframe {
            width: 100%;
            height: 100%;
            border: none;
            display: block;
          }

          .testimonial-video-close {
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

          .testimonial-video-close:hover {
            background: #29ABE2;
            border-color: #29ABE2;
            color: #ffffff;
            transform: scale(1.08);
          }

          @media (max-width: 540px) {
            .testimonial-video-wrap {
              padding: 10px 10px 0 10px;
            }

            .testimonial-body {
              padding: 1.25rem;
            }
          }
        `}</style>
      </article>
    </>
  );
}
