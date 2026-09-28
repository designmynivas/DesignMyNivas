"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Plus,
  Edit3,
  Trash2,
  Video,
  X,
  Play,
  Loader2,
  CheckCircle2,
  AlertCircle,
  MessageSquareQuote,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import {
  TestimonialRow,
  createTestimonialRecord,
  updateTestimonialRecord,
  deleteTestimonialRecord,
  isSupabaseConfigured,
} from "@/lib/supabase/queries";
import { extractYouTubeId, getYouTubeThumbnail } from "@/lib/youtube";
import YouTubePlayerModal from "@/components/ui/youtube-player-modal";

const SAMPLE_FALLBACK_TESTIMONIALS: TestimonialRow[] = [
  {
    id: "testi-1",
    client_name: "Ananya & Vikram Rao",
    location: "Hyderabad",
    quote:
      "Working with Benson and the Design My Nivas team was the most transparent experience we have ever had with home interiors. Every rupee was itemized from day one.",
    youtube_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "testi-2",
    client_name: "Dr. Srinivas Reddy",
    location: "Warangal",
    quote:
      "The turnkey supervision gave us total peace of mind. As doctors, we could not visit the construction site every day, but their weekly milestone photos kept us confident.",
    youtube_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "testi-3",
    client_name: "Kavitha & Ramesh V.",
    location: "Karimnagar",
    quote:
      "The factory-pressed BWP marine plywood quality and precision of the acrylic kitchen shutters blew us away. Every single soft-close hinge works flawlessly.",
    youtube_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const AVAILABLE_LOCATIONS = ["Hyderabad", "Warangal", "Karimnagar"];

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form State (ONLY 3-4 details)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // 1. Client Name
  const [clientName, setClientName] = useState("");
  // 2. Location
  const [location, setLocation] = useState("Hyderabad");
  // 3. Quote
  const [quote, setQuote] = useState("");
  // 4. YouTube URL (Shorts / Video)
  const [youtubeUrl, setYoutubeUrl] = useState("");

  // Video Preview Modal
  const [previewVideoUrl, setPreviewVideoUrl] = useState<string | null>(null);

  const isConfigured = isSupabaseConfigured();

  const loadTestimonials = useCallback(async () => {
    try {
      if (!isConfigured) {
        setTestimonials(SAMPLE_FALLBACK_TESTIMONIALS);
        setIsLoading(false);
        return;
      }

      const supabase = createClient();
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTestimonials((data as TestimonialRow[]) || []);
    } catch (err: unknown) {
      console.error("Failed to load testimonials:", err);
      const msg = err instanceof Error ? err.message : "Failed to load testimonials";
      setStatusMessage({ type: "error", text: msg });
    } finally {
      setIsLoading(false);
    }
  }, [isConfigured]);

  useEffect(() => {
    void Promise.resolve().then(() => {
      loadTestimonials();
    });
  }, [loadTestimonials]);

  const handleAddNew = () => {
    setEditingId(null);
    setClientName("");
    setLocation("Hyderabad");
    setQuote("");
    setYoutubeUrl("");
    setStatusMessage(null);
    setIsFormOpen(true);
  };

  const handleEdit = (item: TestimonialRow) => {
    setEditingId(item.id);
    setClientName(item.client_name);
    setLocation(item.location);
    setQuote(item.quote);
    setYoutubeUrl(item.youtube_url || "");
    setStatusMessage(null);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete testimonial from "${name}"?`)) return;

    try {
      if (!isConfigured) {
        setTestimonials((prev) => prev.filter((t) => t.id !== id));
        setStatusMessage({ type: "success", text: `Deleted testimonial from ${name} (preview mode).` });
        return;
      }

      await deleteTestimonialRecord(id);
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      setStatusMessage({ type: "success", text: `Testimonial from ${name} deleted successfully.` });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete testimonial";
      setStatusMessage({ type: "error", text: msg });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !quote.trim() || !youtubeUrl.trim()) {
      setStatusMessage({
        type: "error",
        text: "Client name, testimonial quote, and YouTube Video/Shorts URL are required.",
      });
      return;
    }

    setIsSaving(true);
    setStatusMessage(null);

    const payload = {
      client_name: clientName.trim(),
      location: location.trim() || "Hyderabad",
      quote: quote.trim(),
      youtube_url: youtubeUrl.trim() || null,
    };

    try {
      if (!isConfigured) {
        if (editingId) {
          setTestimonials((prev) =>
            prev.map((t) => (t.id === editingId ? { ...t, ...payload, updated_at: new Date().toISOString() } : t))
          );
          setStatusMessage({ type: "success", text: "Testimonial updated (local preview mode)." });
        } else {
          const newMock: TestimonialRow = {
            id: `mock-t-${Date.now()}`,
            ...payload,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          setTestimonials((prev) => [newMock, ...prev]);
          setStatusMessage({ type: "success", text: "Testimonial added (local preview mode)." });
        }
        setIsFormOpen(false);
        setIsSaving(false);
        return;
      }

      if (editingId) {
        await updateTestimonialRecord(editingId, payload);
        setStatusMessage({ type: "success", text: "Testimonial updated successfully!" });
      } else {
        await createTestimonialRecord(payload);
        setStatusMessage({ type: "success", text: "Testimonial published successfully!" });
      }

      setIsFormOpen(false);
      await loadTestimonials();
    } catch (err: unknown) {
      console.error("Save testimonial error:", err);
      const msg = err instanceof Error ? err.message : "Failed to save testimonial";
      setStatusMessage({ type: "error", text: msg });
    } finally {
      setIsSaving(false);
    }
  };

  const parsedYoutubeId = extractYouTubeId(youtubeUrl);
  const ytThumbnail = parsedYoutubeId ? getYouTubeThumbnail(parsedYoutubeId, "hq") : null;

  return (
    <div className="testimonials-admin-root">
      {/* Top Banner & Actions */}
      <div className="admin-page-header">
        <div>
          <div className="page-badge">CLIENT REVIEWS</div>
          <h1 className="page-heading">Testimonials</h1>
          <p className="page-desc">
            Manage homeowner reviews and portrait YouTube video/Shorts stories. All cards share portrait frames.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddNew}
          className="btn-add-primary"
        >
          <Plus size={18} />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Notifications */}
      {statusMessage && (
        <div className={`status-toast ${statusMessage.type}`}>
          {statusMessage.type === "success" ? (
            <CheckCircle2 size={18} />
          ) : (
            <AlertCircle size={18} />
          )}
          <span>{statusMessage.text}</span>
          <button
            type="button"
            onClick={() => setStatusMessage(null)}
            className="toast-close"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Testimonials Portrait Grid */}
      {isLoading ? (
        <div className="loading-state">
          <Loader2 className="animate-spin text-brand-blue" size={32} />
          <p>Loading testimonials...</p>
        </div>
      ) : testimonials.length === 0 ? (
        <div className="empty-state">
          <MessageSquareQuote size={48} className="text-gray-400 mb-3" />
          <h3 className="empty-title">No Testimonials Yet</h3>
          <p className="empty-subtitle">
            Add your first homeowner review or client YouTube short video.
          </p>
          <button type="button" onClick={handleAddNew} className="btn-add-primary mt-4">
            <Plus size={18} />
            <span>Add Testimonial</span>
          </button>
        </div>
      ) : (
        <div className="admin-portrait-grid">
          {testimonials.map((item) => {
            const ytId = extractYouTubeId(item.youtube_url);
            const thumbUrl = ytId ? getYouTubeThumbnail(ytId, "hq") : null;

            return (
              <div key={item.id} className="admin-testimonial-card">
                {/* 4:5 Portrait Frame */}
                <div className="card-portrait-wrap">
                  {thumbUrl && item.youtube_url ? (
                    <div className="card-portrait-frame video-frame">
                      <Image
                        src={thumbUrl}
                        alt={`${item.client_name} Review`}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 100vw, 320px"
                        className="card-portrait-img"
                      />
                      <div className="card-location-tag">
                        <span>{item.location.toUpperCase()}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPreviewVideoUrl(item.youtube_url)}
                        className="card-play-overlay"
                        aria-label="Play video review"
                      >
                        <div className="play-disc">
                          <Play size={22} fill="#FFFFFF" className="play-triangle" />
                        </div>
                        <span className="play-hint">Watch Review</span>
                      </button>
                    </div>
                  ) : (
                    <div className="card-portrait-frame quote-frame">
                      <span className="card-location-tag quote-loc">
                        {item.location.toUpperCase()}
                      </span>
                      <span className="quote-mark">&ldquo;</span>
                      <p className="quote-lead">&ldquo;{item.quote}&rdquo;</p>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="card-body">
                  <div className="client-header">
                    <h3 className="client-name">{item.client_name}</h3>
                    <span className="client-loc-pill">{item.location}</span>
                  </div>

                  <p className="quote-text">&ldquo;{item.quote}&rdquo;</p>

                  <div className="card-footer">
                    <div className="video-status">
                      {item.youtube_url ? (
                        <button
                          type="button"
                          onClick={() => setPreviewVideoUrl(item.youtube_url)}
                          className="btn-play-inline"
                        >
                          <Play size={12} fill="currentColor" />
                          <span>Play Video</span>
                        </button>
                      ) : (
                        <span className="verified-badge">Verified Client</span>
                      )}
                    </div>

                    <div className="card-actions">
                      <button
                        type="button"
                        onClick={() => handleEdit(item)}
                        className="btn-action edit"
                        aria-label="Edit review"
                      >
                        <Edit3 size={14} />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id, item.client_name)}
                        className="btn-action delete"
                        aria-label="Delete review"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* SIMPLIFIED 3-4 FIELD MODAL */}
      {isFormOpen && (
        <div className="modal-backdrop" onClick={() => !isSaving && setIsFormOpen(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2 className="modal-title">
                  {editingId ? "Edit Testimonial" : "Add Testimonial"}
                </h2>
                <p className="modal-subtitle">
                  Only 3–4 details: Client Name, Location, Short Quote, and YouTube Video/Shorts URL.
                </p>
              </div>
              <button
                type="button"
                onClick={() => !isSaving && setIsFormOpen(false)}
                className="modal-close-btn"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="modal-form">
              {/* Field 1: Client Name */}
              <div className="form-group">
                <label htmlFor="t-client" className="form-label">
                  1. Client / Homeowner Name <span className="req">*</span>
                </label>
                <input
                  id="t-client"
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Ananya & Vikram Rao"
                  className="form-input"
                />
              </div>

              {/* Field 2: Location */}
              <div className="form-group">
                <label htmlFor="t-loc" className="form-label">
                  2. Location <span className="req">*</span>
                </label>
                <select
                  id="t-loc"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="form-select"
                >
                  {AVAILABLE_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Field 3: Short Quote */}
              <div className="form-group">
                <label htmlFor="t-quote" className="form-label">
                  3. Short Testimonial Quote <span className="req">*</span>
                </label>
                <textarea
                  id="t-quote"
                  rows={3}
                  required
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="e.g. Working with Benson and team was seamless. Delivered on time with spotless turnkey finish."
                  className="form-textarea"
                />
              </div>

              {/* Field 4: YouTube URL */}
              <div className="form-group">
                <label htmlFor="t-yt" className="form-label">
                  4. YouTube Video or Shorts URL <span className="req">*</span>
                </label>
                <div className="yt-input-wrapper">
                  <Video size={18} className="yt-icon" />
                  <input
                    id="t-yt"
                    type="url"
                    required
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                    className="form-input yt-input"
                  />
                  {parsedYoutubeId && (
                    <button
                      type="button"
                      onClick={() => setPreviewVideoUrl(youtubeUrl)}
                      className="btn-test-yt"
                    >
                      <Play size={13} fill="currentColor" />
                      <span>Test</span>
                    </button>
                  )}
                </div>
                <span className="form-hint">
                  Supports YouTube Shorts and regular video reviews. Renders with an interactive play button.
                </span>

                {ytThumbnail && (
                  <div className="image-preview-box">
                    <div className="preview-portrait-frame">
                      <Image
                        src={ytThumbnail}
                        alt="YouTube Thumbnail"
                        fill
                        unoptimized
                        className="preview-img"
                      />
                      <div className="preview-play-icon">
                        <Play size={20} fill="#FFFFFF" />
                      </div>
                    </div>
                    <div className="preview-details">
                      <span className="preview-label">Video Review Connected</span>
                      <span className="preview-sub">Portrait card will feature a Play button overlay</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Form Buttons */}
              <div className="modal-footer">
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={() => setIsFormOpen(false)}
                  className="btn-cancel"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="btn-save"
                >
                  {isSaving ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>{editingId ? "Update Testimonial" : "Publish Testimonial"}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Video Modal Player */}
      <YouTubePlayerModal
        isOpen={Boolean(previewVideoUrl)}
        onClose={() => setPreviewVideoUrl(null)}
        videoUrl={previewVideoUrl}
        title="Homeowner Video Story"
      />

      <style jsx>{`
        .testimonials-admin-root {
          width: 100%;
        }

        .admin-page-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .page-badge {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #29ABE2;
          margin-bottom: 0.25rem;
        }

        .page-heading {
          font-family: var(--font-display);
          font-size: 1.875rem;
          font-weight: 700;
          color: #111827;
          letter-spacing: -0.02em;
          margin: 0 0 0.35rem 0;
        }

        .page-desc {
          font-size: 0.9375rem;
          color: #6B7280;
          max-width: 620px;
          line-height: 1.5;
          margin: 0;
        }

        .btn-add-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background-color: #29ABE2;
          color: #FFFFFF;
          font-size: 0.9375rem;
          font-weight: 600;
          padding: 0.65rem 1.25rem;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          transition: all 0.18s ease;
          box-shadow: 0 4px 12px rgba(41, 171, 226, 0.25);
        }

        .btn-add-primary:hover {
          background-color: #1E94C7;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(41, 171, 226, 0.35);
        }

        .status-toast {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1.25rem;
          border-radius: 12px;
          margin-bottom: 1.5rem;
          font-size: 0.875rem;
        }

        .status-toast.success {
          background: #ECFDF5;
          border: 1px solid #A7F3D0;
          color: #065F46;
        }

        .status-toast.error {
          background: #FEF2F2;
          border: 1px solid #FECACA;
          color: #991B1B;
        }

        .toast-close {
          margin-left: auto;
          background: none;
          border: none;
          color: inherit;
          cursor: pointer;
        }

        .loading-state,
        .empty-state {
          text-align: center;
          padding: 4rem 1.5rem;
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .empty-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 0.25rem;
        }

        .empty-subtitle {
          font-size: 0.875rem;
          color: #6B7280;
          max-width: 420px;
        }

        /* 3-column portrait grid */
        .admin-portrait-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        @media (max-width: 1024px) {
          .admin-portrait-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .admin-portrait-grid {
            grid-template-columns: 1fr;
          }
        }

        .admin-testimonial-card {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .admin-testimonial-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          border-color: #29ABE2;
        }

        /* 4:5 Portrait Frame */
        .card-portrait-wrap {
          padding: 12px 12px 0 12px;
          width: 100%;
        }

        .card-portrait-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          border-radius: 12px;
          overflow: hidden;
          background: #F3F4F6;
        }

        .video-frame {
          background: #111827;
        }

        .quote-frame {
          background: linear-gradient(135deg, #F8FAFC 0%, #EEF2F6 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1.5rem 1.25rem;
          text-align: center;
          border: 1px dashed #CBD5E1;
        }

        .quote-mark {
          font-family: var(--font-display);
          font-size: 3.5rem;
          color: #29ABE2;
          opacity: 0.4;
          line-height: 1;
        }

        .quote-lead {
          font-size: 0.8125rem;
          color: #475569;
          font-style: italic;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .quote-loc {
          background: rgba(41, 171, 226, 0.1) !important;
          color: #29ABE2 !important;
        }

        :global(.card-portrait-img) {
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .admin-testimonial-card:hover :global(.card-portrait-img) {
          transform: scale(1.03);
        }

        .card-location-tag {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(18, 20, 24, 0.85);
          backdrop-filter: blur(6px);
          color: #FFFFFF;
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 0.25rem 0.5rem;
          border-radius: 5px;
          z-index: 2;
        }

        /* Play Button Overlay */
        .card-play-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 0.5rem;
          background: rgba(18, 20, 24, 0.35);
          border: none;
          cursor: pointer;
          z-index: 3;
          transition: background 0.2s ease;
        }

        .admin-testimonial-card:hover .card-play-overlay {
          background: rgba(18, 20, 24, 0.5);
        }

        .play-disc {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #29ABE2;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-left: 2px;
          box-shadow: 0 4px 18px rgba(41, 171, 226, 0.6);
          transition: transform 0.2s ease;
        }

        .admin-testimonial-card:hover .play-disc {
          transform: scale(1.1);
        }

        .play-hint {
          font-size: 0.75rem;
          font-weight: 700;
          color: #FFFFFF;
          letter-spacing: 0.04em;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.7);
        }

        .card-body {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .client-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .client-name {
          font-family: var(--font-display);
          font-size: 1.0625rem;
          font-weight: 700;
          color: #111827;
        }

        .client-loc-pill {
          font-size: 0.6875rem;
          font-weight: 700;
          color: #4B5563;
          background: #F3F4F6;
          padding: 0.2rem 0.5rem;
          border-radius: 6px;
          text-transform: uppercase;
        }

        .quote-text {
          font-size: 0.84375rem;
          line-height: 1.55;
          color: #4B5563;
          font-style: italic;
          margin-bottom: 1.25rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex-grow: 1;
        }

        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.85rem;
          border-top: 1px solid #F3F4F6;
          margin-top: auto;
        }

        .btn-play-inline {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          font-weight: 700;
          color: #29ABE2;
          background: rgba(41, 171, 226, 0.08);
          border: 1px solid rgba(41, 171, 226, 0.25);
          border-radius: 6px;
          padding: 0.25rem 0.55rem;
          cursor: pointer;
        }

        .btn-play-inline:hover {
          background: #29ABE2;
          color: #FFFFFF;
        }

        .verified-badge {
          font-size: 0.6875rem;
          font-weight: 600;
          color: #059669;
          background: rgba(5, 150, 105, 0.08);
          border: 1px solid rgba(5, 150, 105, 0.2);
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
        }

        .card-actions {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .btn-action {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.35rem 0.65rem;
          font-size: 0.78125rem;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          border: 1px solid transparent;
          transition: all 0.15s ease;
        }

        .btn-action.edit {
          background: #F3F4F6;
          color: #374151;
          border-color: #E5E7EB;
        }

        .btn-action.edit:hover {
          background: #E5E7EB;
          color: #111827;
        }

        .btn-action.delete {
          background: #FEF2F2;
          color: #DC2626;
          border-color: #FEE2E2;
        }

        .btn-action.delete:hover {
          background: #FEE2E2;
        }

        /* Modal */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(18, 20, 24, 0.6);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          z-index: 1000;
        }

        .modal-container {
          background: #FFFFFF;
          border-radius: 20px;
          width: 100%;
          max-width: 540px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 1.5rem 1.75rem 1.25rem 1.75rem;
          border-bottom: 1px solid #F3F4F6;
        }

        .modal-title {
          font-family: var(--font-display);
          font-size: 1.35rem;
          font-weight: 700;
          color: #111827;
          margin: 0 0 0.25rem 0;
        }

        .modal-subtitle {
          font-size: 0.8125rem;
          color: #6B7280;
          margin: 0;
          line-height: 1.4;
        }

        .modal-close-btn {
          background: none;
          border: none;
          color: #9CA3AF;
          cursor: pointer;
          padding: 0.25rem;
        }

        .modal-close-btn:hover {
          color: #111827;
        }

        .modal-form {
          padding: 1.5rem 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .form-label {
          font-size: 0.8125rem;
          font-weight: 700;
          color: #374151;
        }

        .req {
          color: #DC2626;
        }

        .form-input,
        .form-select,
        .form-textarea {
          width: 100%;
          background: #F9FAFB;
          border: 1.5px solid #E5E7EB;
          border-radius: 10px;
          font-size: 0.875rem;
          color: #111827;
          transition: all 0.15s ease;
        }

        .form-input,
        .form-select {
          height: 44px;
          padding: 0 0.85rem;
        }

        .form-textarea {
          padding: 0.75rem 0.85rem;
          resize: vertical;
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          outline: none;
          background: #FFFFFF;
          border-color: #29ABE2;
          box-shadow: 0 0 0 3px rgba(41, 171, 226, 0.15);
        }

        .yt-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .yt-icon {
          position: absolute;
          left: 0.85rem;
          color: #9CA3AF;
        }

        .yt-input {
          padding-left: 2.5rem;
          padding-right: 5rem;
        }

        .btn-test-yt {
          position: absolute;
          right: 0.4rem;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          background: #29ABE2;
          color: #FFFFFF;
          border: none;
          border-radius: 6px;
          padding: 0.3rem 0.6rem;
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
        }

        .form-hint {
          font-size: 0.75rem;
          color: #6B7280;
          margin-top: 0.25rem;
          line-height: 1.4;
        }

        .image-preview-box {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 0.75rem;
          padding: 0.75rem;
          background: #F9FAFB;
          border: 1px solid #E5E7EB;
          border-radius: 10px;
        }

        .preview-portrait-frame {
          position: relative;
          width: 60px;
          aspect-ratio: 4 / 5;
          border-radius: 6px;
          overflow: hidden;
          background: #E5E7EB;
          flex-shrink: 0;
        }

        :global(.preview-img) {
          object-fit: cover;
        }

        .preview-play-icon {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.4);
        }

        .preview-details {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          flex-grow: 1;
        }

        .preview-label {
          font-size: 0.8125rem;
          font-weight: 600;
          color: #111827;
        }

        .preview-sub {
          font-size: 0.75rem;
          color: #6B7280;
        }

        .modal-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.75rem;
          padding-top: 1.25rem;
          border-top: 1px solid #F3F4F6;
          margin-top: 0.5rem;
        }

        .btn-cancel {
          padding: 0.65rem 1.15rem;
          background: #F3F4F6;
          color: #374151;
          border: 1px solid #E5E7EB;
          border-radius: 10px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-save {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.65rem 1.4rem;
          background: #29ABE2;
          color: #FFFFFF;
          border: none;
          border-radius: 10px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-save:disabled,
        .btn-cancel:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
