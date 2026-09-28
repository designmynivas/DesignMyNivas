"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Edit3,
  Trash2,
  UploadCloud,
  Video,
  Eye,
  X,
  Play,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import {
  ProjectRow,
  createProjectRecord,
  updateProjectRecord,
  deleteProjectRecord,
  uploadProjectImageToStorage,
  isSupabaseConfigured,
} from "@/lib/supabase/queries";
import { projectsData } from "@/data/projects";
import { extractYouTubeId, getYouTubeThumbnail } from "@/lib/youtube";
import YouTubePlayerModal from "@/components/ui/youtube-player-modal";

const AVAILABLE_SERVICES = [
  "Complete Home Interiors",
  "Modular Kitchens",
  "Living Room Interiors",
  "Bedroom Interiors",
  "Wardrobes & Storage",
  "Customised Furniture",
  "False Ceiling & Lighting",
  "Turnkey Interior Execution",
];

const AVAILABLE_LOCATIONS = [
  "Hyderabad",
  "Warangal",
  "Karimnagar",
];

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form State - ONLY 3-4 details required
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  // 1. Title
  const [title, setTitle] = useState("");
  // 2. Location
  const [location, setLocation] = useState("Hyderabad");
  // 3. Service
  const [service, setService] = useState(AVAILABLE_SERVICES[0]);
  // 4. Media (Toggle: Image OR YouTube Video)
  const [mediaType, setMediaType] = useState<"image" | "youtube">("image");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");

  // Video preview modal
  const [previewVideoUrl, setPreviewVideoUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const isConfigured = isSupabaseConfigured();

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  // Load projects from Supabase or fallback fixture
  const loadProjects = useCallback(async () => {
    try {
      if (!isConfigured) {
        const mockRows: ProjectRow[] = projectsData.map((p) => ({
          id: p.id,
          title: p.title,
          slug: p.slug,
          location: p.location,
          service: p.type || "Complete Home Interiors",
          media_type: p.youtubeUrl ? "youtube" : "image",
          image_url: p.image || "/Images/main-hero.webp",
          youtube_url: p.youtubeUrl || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }));
        setProjects(mockRows);
        setIsLoading(false);
        return;
      }

      const supabase = createClient();
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProjects((data as ProjectRow[]) || []);
    } catch (err: unknown) {
      console.error("Failed to load projects:", err);
      const msg = err instanceof Error ? err.message : "Failed to load projects";
      setStatusMessage({ type: "error", text: msg });
    } finally {
      setIsLoading(false);
    }
  }, [isConfigured]);

  useEffect(() => {
    void Promise.resolve().then(() => {
      loadProjects();
    });
  }, [loadProjects]);

  // Open Form to Add
  const handleAddNew = () => {
    setEditingProjectId(null);
    setTitle("");
    setLocation("Hyderabad");
    setService(AVAILABLE_SERVICES[0]);
    setMediaType("image");
    setImageUrl("");
    setYoutubeUrl("");
    setStatusMessage(null);
    setIsFormOpen(true);
  };

  // Open Form to Edit
  const handleEdit = (project: ProjectRow) => {
    setEditingProjectId(project.id);
    setTitle(project.title);
    setLocation(project.location);
    setService(project.service);
    setMediaType(project.media_type || "image");
    setImageUrl(project.image_url || "");
    setYoutubeUrl(project.youtube_url || "");
    setStatusMessage(null);
    setIsFormOpen(true);
  };

  // Delete
  const handleDelete = async (projectId: string, projectTitle: string) => {
    if (!window.confirm(`Delete project "${projectTitle}"? This cannot be undone.`)) {
      return;
    }

    try {
      if (!isConfigured) {
        setProjects((prev) => prev.filter((p) => p.id !== projectId));
        setStatusMessage({ type: "success", text: `Deleted "${projectTitle}" (preview mode).` });
        return;
      }

      await deleteProjectRecord(projectId);
      setProjects((prev) => prev.filter((p) => p.id !== projectId));
      setStatusMessage({ type: "success", text: `Project "${projectTitle}" deleted successfully.` });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete project";
      setStatusMessage({ type: "error", text: msg });
    }
  };

  // Upload single portrait image to Supabase Storage
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setStatusMessage(null);

    try {
      if (!isConfigured) {
        const localUrl = URL.createObjectURL(file);
        setImageUrl(localUrl);
        setStatusMessage({ type: "success", text: "Image selected (local preview mode)." });
      } else {
        const publicUrl = await uploadProjectImageToStorage(file);
        setImageUrl(publicUrl);
        setStatusMessage({ type: "success", text: "Portrait image uploaded to Supabase Storage!" });
      }
    } catch (err: unknown) {
      console.error("Upload error:", err);
      const msg = err instanceof Error ? err.message : "Image upload failed";
      setStatusMessage({ type: "error", text: msg });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Save (Only 3-4 details total)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setStatusMessage({ type: "error", text: "Project title is required." });
      return;
    }

    if (mediaType === "image" && !imageUrl.trim()) {
      setStatusMessage({ type: "error", text: "Please upload 1 portrait image for this project." });
      return;
    }

    if (mediaType === "youtube" && !youtubeUrl.trim()) {
      setStatusMessage({ type: "error", text: "Please enter the YouTube video URL." });
      return;
    }

    setIsSaving(true);
    setStatusMessage(null);

    const slug = slugify(title.trim()) || `project-${Date.now()}`;

    const payload = {
      title: title.trim(),
      slug,
      location: location.trim() || "Hyderabad",
      service,
      media_type: mediaType,
      image_url: mediaType === "image" ? imageUrl.trim() : null,
      youtube_url: mediaType === "youtube" ? youtubeUrl.trim() : null,
    };

    try {
      if (!isConfigured) {
        if (editingProjectId) {
          setProjects((prev) =>
            prev.map((p) => (p.id === editingProjectId ? { ...p, ...payload, updated_at: new Date().toISOString() } : p))
          );
          setStatusMessage({ type: "success", text: "Project updated (local preview mode)." });
        } else {
          const newRow: ProjectRow = {
            id: `mock-${Date.now()}`,
            ...payload,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          setProjects((prev) => [newRow, ...prev]);
          setStatusMessage({ type: "success", text: "Project created (local preview mode)." });
        }
        setIsFormOpen(false);
        setIsSaving(false);
        return;
      }

      if (editingProjectId) {
        await updateProjectRecord(editingProjectId, payload);
        setStatusMessage({ type: "success", text: "Project updated successfully!" });
      } else {
        await createProjectRecord(payload);
        setStatusMessage({ type: "success", text: "Project published successfully!" });
      }

      setIsFormOpen(false);
      await loadProjects();
    } catch (err: unknown) {
      console.error("Save error:", err);
      const msg = err instanceof Error ? err.message : "Failed to save project";
      setStatusMessage({ type: "error", text: msg });
    } finally {
      setIsSaving(false);
    }
  };

  const parsedYoutubeId = extractYouTubeId(youtubeUrl);
  const ytThumbnail = parsedYoutubeId ? getYouTubeThumbnail(parsedYoutubeId, "hq") : null;

  return (
    <div className="projects-admin-root">
      {/* Top Banner & Action */}
      <div className="admin-page-header">
        <div>
          <div className="page-badge">PORTFOLIO CMS</div>
          <h1 className="page-heading">Projects</h1>
          <p className="page-desc">
            Upload 1 portrait image or 1 YouTube video per project. All cards display in matching portrait frames.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddNew}
          className="btn-add-primary"
        >
          <Plus size={18} />
          <span>Add Project</span>
        </button>
      </div>

      {/* Notification Banner */}
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

      {/* Projects Grid: All portrait cards with identical aspect ratio */}
      {isLoading ? (
        <div className="loading-state">
          <Loader2 className="animate-spin text-brand-blue" size={32} />
          <p>Loading projects...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="empty-state">
          <UploadCloud size={48} className="text-gray-400 mb-3" />
          <h3 className="empty-title">No Projects Found</h3>
          <p className="empty-subtitle">
            Click &quot;Add Project&quot; to upload your first project image or YouTube video tour.
          </p>
          <button type="button" onClick={handleAddNew} className="btn-add-primary mt-4">
            <Plus size={18} />
            <span>Create First Project</span>
          </button>
        </div>
      ) : (
        <div className="admin-portrait-grid">
          {projects.map((project) => {
            const isVideo = project.media_type === "youtube" && Boolean(project.youtube_url);
            let displayImage = project.image_url;

            if (isVideo && project.youtube_url) {
              const yId = extractYouTubeId(project.youtube_url);
              if (yId) {
                displayImage = getYouTubeThumbnail(yId, "hq");
              }
            }

            if (!displayImage) {
              displayImage = "/Images/main-hero.webp";
            }

            return (
              <div key={project.id} className="admin-project-card">
                {/* Portrait Card Media Frame (4:5 Aspect Ratio) */}
                <div className="card-portrait-wrap">
                  <div className="card-portrait-frame">
                    <Image
                      src={displayImage}
                      alt={project.title}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, 320px"
                      className="card-portrait-img"
                    />

                    <div className="card-location-tag">
                      <span>{project.location.toUpperCase()}</span>
                    </div>

                    {/* Centered Play Button Overlay if Video */}
                    {isVideo && project.youtube_url && (
                      <button
                        type="button"
                        onClick={() => setPreviewVideoUrl(project.youtube_url)}
                        className="card-play-overlay"
                        aria-label="Play YouTube video"
                      >
                        <div className="play-disc">
                          <Play size={22} fill="#FFFFFF" className="play-triangle" />
                        </div>
                        <span className="play-hint">Watch Tour</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Card Info */}
                <div className="card-body">
                  <div className="card-service-tag">{project.service}</div>
                  <h3 className="card-title">{project.title}</h3>

                  <div className="card-media-type-badge">
                    {isVideo ? (
                      <span className="badge-type video-type">
                        <Video size={13} />
                        <span>YouTube Video</span>
                      </span>
                    ) : (
                      <span className="badge-type image-type">
                        <ImageIcon size={13} />
                        <span>Portrait Photo</span>
                      </span>
                    )}
                  </div>

                  <div className="card-footer">
                    <Link
                      href="/projects"
                      target="_blank"
                      className="btn-preview"
                    >
                      <Eye size={14} />
                      <span>View</span>
                    </Link>

                    <div className="card-actions">
                      <button
                        type="button"
                        onClick={() => handleEdit(project)}
                        className="btn-action edit"
                        aria-label="Edit project"
                      >
                        <Edit3 size={14} />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(project.id, project.title)}
                        className="btn-action delete"
                        aria-label="Delete project"
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
                  {editingProjectId ? "Edit Project" : "Add Project"}
                </h2>
                <p className="modal-subtitle">
                  Enter 3–4 details: Title, Location, Service, and 1 Portrait Image OR YouTube Video URL.
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
              {/* Field 1: Project Title */}
              <div className="form-group">
                <label htmlFor="p-title" className="form-label">
                  1. Project Title <span className="req">*</span>
                </label>
                <input
                  id="p-title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Jubilee Haven Residence"
                  className="form-input"
                />
              </div>

              {/* Field 2 & 3: Location & Service in 2 Columns */}
              <div className="form-grid-2">
                {/* Field 2: Location */}
                <div className="form-group">
                  <label htmlFor="p-loc" className="form-label">
                    2. Location <span className="req">*</span>
                  </label>
                  <select
                    id="p-loc"
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

                {/* Field 3: Service Category */}
                <div className="form-group">
                  <label htmlFor="p-service" className="form-label">
                    3. Service Category <span className="req">*</span>
                  </label>
                  <select
                    id="p-service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="form-select"
                  >
                    {AVAILABLE_SERVICES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Field 4: Media Selector (1 Image OR 1 YouTube URL) */}
              <div className="form-group media-toggle-section">
                <label className="form-label">
                  4. Project Media (Choose either 1 Portrait Image OR 1 YouTube Video) <span className="req">*</span>
                </label>

                {/* Media Type Switcher */}
                <div className="media-toggle-tabs">
                  <button
                    type="button"
                    onClick={() => setMediaType("image")}
                    className={`toggle-tab ${mediaType === "image" ? "active" : ""}`}
                  >
                    <ImageIcon size={16} />
                    <span>1 Portrait Image</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMediaType("youtube")}
                    className={`toggle-tab ${mediaType === "youtube" ? "active" : ""}`}
                  >
                    <Video size={16} />
                    <span>1 YouTube Video / Short</span>
                  </button>
                </div>

                {/* OPTION A: 1 Portrait Image Upload */}
                {mediaType === "image" && (
                  <div className="media-upload-area">
                    <div
                      className="upload-dropzone"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <div className="dropzone-inner">
                        <UploadCloud size={32} className="text-brand-blue mb-1" />
                        <span className="dropzone-cta">
                          {isUploading ? "Uploading image to Supabase Storage..." : "Click to select 1 portrait photo"}
                        </span>
                        <span className="dropzone-hint">
                          Recommended portrait ratio (4:5 or 3:4). Directly saved to Supabase bucket.
                        </span>
                      </div>
                    </div>

                    {imageUrl && (
                      <div className="image-preview-box">
                        <div className="preview-portrait-frame">
                          <Image
                            src={imageUrl}
                            alt="Selected project preview"
                            fill
                            unoptimized
                            className="preview-img"
                          />
                        </div>
                        <div className="preview-details">
                          <span className="preview-label">Portrait Image Ready</span>
                          <button
                            type="button"
                            onClick={() => setImageUrl("")}
                            className="btn-remove-media"
                          >
                            <X size={14} />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* OPTION B: 1 YouTube Video URL */}
                {mediaType === "youtube" && (
                  <div className="media-yt-area">
                    <div className="yt-input-wrapper">
                      <Video size={18} className="yt-icon" />
                      <input
                        type="url"
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                        placeholder="Paste YouTube video or Shorts link (e.g. https://youtu.be/...)"
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
                      Works with standard YouTube videos and vertical Shorts. High-res portrait cover will be automatically extracted.
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
                          <span className="preview-label">YouTube Preview Detected</span>
                          <span className="preview-sub">Plays in modal on click</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Form Buttons */}
              <div className="modal-footer">
                <button
                  type="button"
                  disabled={isSaving || isUploading}
                  onClick={() => setIsFormOpen(false)}
                  className="btn-cancel"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving || isUploading}
                  className="btn-save"
                >
                  {isSaving ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>{editingProjectId ? "Update Project" : "Publish Project"}</span>
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
        title="Project Video Showcase"
      />

      <style jsx>{`
        .projects-admin-root {
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

        /* Portrait Grid (3 columns on desktop, all 4:5 ratio) */
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

        .admin-project-card {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .admin-project-card:hover {
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

        :global(.card-portrait-img) {
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .admin-project-card:hover :global(.card-portrait-img) {
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

        /* Centered Play Button Overlay */
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

        .admin-project-card:hover .card-play-overlay {
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

        .admin-project-card:hover .play-disc {
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

        .card-service-tag {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: #29ABE2;
          margin-bottom: 0.35rem;
        }

        .card-title {
          font-family: var(--font-display);
          font-size: 1.125rem;
          font-weight: 700;
          color: #111827;
          line-height: 1.3;
          margin: 0 0 0.75rem 0;
        }

        .card-media-type-badge {
          margin-bottom: 1rem;
        }

        .badge-type {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.2rem 0.5rem;
          border-radius: 6px;
        }

        .badge-type.video-type {
          background: #FEF2F2;
          color: #DC2626;
        }

        .badge-type.image-type {
          background: #F0FDF4;
          color: #16A34A;
        }

        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.85rem;
          border-top: 1px solid #F3F4F6;
          margin-top: auto;
        }

        .btn-preview {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.8125rem;
          font-weight: 600;
          color: #6B7280;
          text-decoration: none;
        }

        .btn-preview:hover {
          color: #29ABE2;
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

        /* Modal Styles */
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
          max-width: 580px;
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

        .form-grid-2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        @media (max-width: 540px) {
          .form-grid-2 {
            grid-template-columns: 1fr;
          }
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
        .form-select {
          width: 100%;
          height: 44px;
          padding: 0 0.85rem;
          background: #F9FAFB;
          border: 1.5px solid #E5E7EB;
          border-radius: 10px;
          font-size: 0.875rem;
          color: #111827;
          transition: all 0.15s ease;
        }

        .form-input:focus,
        .form-select:focus {
          outline: none;
          background: #FFFFFF;
          border-color: #29ABE2;
          box-shadow: 0 0 0 3px rgba(41, 171, 226, 0.15);
        }

        /* Media Toggle Tabs */
        .media-toggle-tabs {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.5rem;
          margin-bottom: 0.75rem;
          background: #F3F4F6;
          padding: 0.3rem;
          border-radius: 10px;
        }

        .toggle-tab {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          padding: 0.5rem;
          font-size: 0.8125rem;
          font-weight: 600;
          color: #6B7280;
          border: none;
          background: transparent;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.18s ease;
        }

        .toggle-tab.active {
          background: #FFFFFF;
          color: #111827;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
        }

        .upload-dropzone {
          border: 1.5px dashed #D1D5DB;
          border-radius: 12px;
          padding: 1.5rem 1rem;
          text-align: center;
          cursor: pointer;
          background: #FAFAFA;
          transition: all 0.18s ease;
        }

        .upload-dropzone:hover {
          border-color: #29ABE2;
          background: rgba(41, 171, 226, 0.03);
        }

        .dropzone-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .dropzone-cta {
          font-size: 0.875rem;
          font-weight: 600;
          color: #111827;
          margin-bottom: 0.25rem;
        }

        .dropzone-hint {
          font-size: 0.75rem;
          color: #6B7280;
        }

        .hidden {
          display: none;
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

        .btn-remove-media {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          background: none;
          border: none;
          color: #DC2626;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          padding: 0;
          width: fit-content;
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
