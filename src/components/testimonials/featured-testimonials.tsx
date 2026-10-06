"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import type { Testimonial } from "@/types/testimonial";
import YouTubePlayerModal from "@/components/ui/youtube-player-modal";
import { extractYouTubeId, getYouTubeThumbnail } from "@/lib/youtube";

/** One testimonial at a time; the video (when there is one) is the visual focus. */
export default function FeaturedTestimonials({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [thumbFallback, setThumbFallback] = useState<Record<string, boolean>>({});

  if (items.length === 0) return null;

  const current = items[index % items.length];
  const ytId = extractYouTubeId(current.youtube_url);
  const thumb = ytId ? getYouTubeThumbnail(ytId, thumbFallback[current.id] ? "hq" : "maxres") : null;
  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + items.length) % items.length);

  return (
    <div className="ft">
      <div key={current.id} className={`ft-card ${thumb ? "" : "no-video"}`}>
        {thumb && (
          <button
            type="button"
            className="ft-video"
            onClick={() => setPlaying(true)}
            aria-label={`Play video story from ${current.client_name}`}
          >
            <Image
              src={thumb}
              alt=""
              fill
              sizes="280px"
              style={{ objectFit: "cover" }}
              onError={() => setThumbFallback((f) => ({ ...f, [current.id]: true }))}
            />
            <span className="ft-play" aria-hidden="true">
              <Play size={20} fill="currentColor" />
            </span>
          </button>
        )}

        <figure className="ft-body">
          <span className="ft-mark" aria-hidden="true">&ldquo;</span>
          <blockquote className="ft-quote">{current.quote}</blockquote>
          <figcaption className="ft-who">
            <span className="ft-name">{current.client_name}</span>
            <span className="ft-loc">{current.location}</span>
          </figcaption>

          {items.length > 1 && (
            <div className="ft-nav">
              <button type="button" className="ft-arrow" onClick={() => go(-1)} aria-label="Previous testimonial">
                <ChevronLeft size={18} aria-hidden="true" />
              </button>
              <div className="ft-dots">
                {items.map((t, i) => (
                  <button
                    key={t.id}
                    type="button"
                    className={`ft-dot ${i === index ? "is-active" : ""}`}
                    onClick={() => setIndex(i)}
                    aria-label={`Show testimonial ${i + 1}`}
                    aria-current={i === index}
                  />
                ))}
              </div>
              <button type="button" className="ft-arrow" onClick={() => go(1)} aria-label="Next testimonial">
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </div>
          )}
        </figure>
      </div>

      <YouTubePlayerModal
        isOpen={playing}
        onClose={() => setPlaying(false)}
        videoUrl={current.youtube_url}
        title={`${current.client_name} · ${current.location}`}
        vertical={Boolean(current.youtube_url?.includes("/shorts/"))}
      />

      <style jsx>{`
        .ft-card {
          display: grid;
          grid-template-columns: 260px minmax(0, 1fr);
          gap: clamp(1.5rem, 4vw, 3.5rem);
          align-items: center;
          padding: clamp(1rem, 2.5vw, 1.5rem);
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 24px;
          animation: ftIn 0.45s var(--ease-out);
        }

        .ft-card.no-video {
          grid-template-columns: 1fr;
          padding: clamp(1.5rem, 4vw, 3rem);
        }

        .ft-video {
          position: relative;
          aspect-ratio: 9 / 16;
          width: 100%;
          padding: 0;
          border: none;
          border-radius: 16px;
          overflow: hidden;
          background: #121418;
          cursor: pointer;
        }

        .ft-play {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 60px;
          height: 60px;
          margin: -30px 0 0 -30px;
          border-radius: 50%;
          background: var(--brand-blue);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-left: 3px;
          box-shadow: 0 6px 24px rgba(41, 171, 226, 0.6);
          transition: transform 0.2s var(--ease-out);
        }

        .ft-video:hover .ft-play {
          transform: scale(1.08);
        }

        .ft-body {
          margin: 0;
          padding-right: clamp(0rem, 2vw, 1.5rem);
        }

        .ft-mark {
          display: block;
          font-family: var(--font-display);
          font-size: 4rem;
          line-height: 0.6;
          color: var(--brand-blue);
          height: 2rem;
        }

        .ft-quote {
          margin: 0;
          font-family: var(--font-display);
          font-size: clamp(1.25rem, 2.4vw, 1.875rem);
          font-weight: 550;
          line-height: 1.35;
          letter-spacing: -0.02em;
          color: var(--foreground);
        }

        .ft-who {
          margin-top: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .ft-name {
          font-weight: 650;
          color: var(--foreground);
          text-transform: capitalize;
        }

        .ft-loc {
          font-size: 0.875rem;
          color: var(--foreground-muted);
        }

        .ft-nav {
          margin-top: 1.75rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .ft-arrow {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 1px solid var(--border);
          background: #ffffff;
          color: var(--foreground);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: color 0.15s, border-color 0.15s;
        }

        .ft-arrow:hover {
          color: var(--brand-blue);
          border-color: var(--brand-blue);
        }

        .ft-dots {
          display: flex;
          gap: 0.4rem;
        }

        .ft-dot {
          width: 8px;
          height: 8px;
          padding: 0;
          border: none;
          border-radius: 8px;
          background: var(--border);
          cursor: pointer;
          transition: width 0.25s var(--ease-out), background 0.2s;
        }

        .ft-dot.is-active {
          width: 24px;
          background: var(--brand-blue);
        }

        @keyframes ftIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }

        @media (max-width: 720px) {
          .ft-card {
            grid-template-columns: 1fr;
          }

          .ft-video {
            width: 62%;
            max-width: 240px;
            margin: 0 auto;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ft-card {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
