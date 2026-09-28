"use client";

import React, { useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { extractYouTubeId, getYouTubeEmbedUrl } from "@/lib/youtube";

interface YouTubePlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string | null;
  videoId?: string | null;
  title?: string;
}

export default function YouTubePlayerModal({
  isOpen,
  onClose,
  videoUrl,
  videoId,
  title = "Video Player",
}: YouTubePlayerModalProps) {
  const resolvedId = videoId || (videoUrl ? extractYouTubeId(videoUrl) : null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !resolvedId) return null;

  const embedUrl = getYouTubeEmbedUrl(resolvedId, true);

  return (
    <div
      className="yt-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className="yt-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="yt-modal-header">
          <span className="yt-modal-title">{title}</span>
          <button
            type="button"
            className="yt-modal-close"
            onClick={onClose}
            aria-label="Close video player"
          >
            <X size={20} />
          </button>
        </div>

        <div className="yt-player-frame">
          <iframe
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="yt-iframe"
          />
        </div>
      </div>

      <style jsx>{`
        .yt-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background-color: rgba(15, 17, 21, 0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.25rem;
          animation: ytFadeIn 0.2s ease-out;
        }

        .yt-modal-container {
          width: 100%;
          max-width: 920px;
          background: #121418;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
          display: flex;
          flex-direction: column;
          animation: ytScaleUp 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .yt-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.875rem 1.25rem;
          background: rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .yt-modal-title {
          font-family: var(--font-body);
          font-size: 0.875rem;
          font-weight: 600;
          color: #E2E8F0;
          letter-spacing: 0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          padding-right: 1rem;
        }

        .yt-modal-close {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #CBD5E1;
          width: 34px;
          height: 34px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.18s ease;
          flex-shrink: 0;
        }

        .yt-modal-close:hover {
          background: rgba(255, 255, 255, 0.16);
          color: #FFFFFF;
          border-color: #29ABE2;
        }

        .yt-player-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          background-color: #000000;
        }

        :global(.yt-iframe) {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: none;
        }

        @keyframes ytFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes ytScaleUp {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(6px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @media (max-width: 640px) {
          .yt-modal-backdrop {
            padding: 0.75rem;
          }

          .yt-modal-container {
            border-radius: 14px;
          }

          .yt-modal-header {
            padding: 0.625rem 0.875rem;
          }
        }
      `}</style>
    </div>
  );
}
