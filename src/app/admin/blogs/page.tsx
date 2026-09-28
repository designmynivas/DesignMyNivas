"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Edit3,
  Trash2,
  Upload,
  ExternalLink,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  ArrowUp,
  ArrowDown,
  List,
  Heading,
  AlignLeft,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";
import {
  BlogRow,
  getAdminBlogs,
  createBlogRecord,
  updateBlogRecord,
  deleteBlogRecord,
  toggleBlogPublish,
  uploadBlogCoverToStorage,
  isSupabaseConfigured,
  invalidateDataCache,
} from "@/lib/supabase/queries";
import { BlogBlock, BlogBlockType } from "@/types/blog";

interface EditorBlock {
  id: string;
  type: BlogBlockType;
  text?: string;
  items?: string[];
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const COVER_PRESETS = [
  { label: "Modular Kitchen", url: "/Images/services/modular-kitchens.webp" },
  { label: "Living Room", url: "/Images/services/living-room-interiors.webp" },
  { label: "Complete Home", url: "/Images/services/complete-home-interiors.webp" },
  { label: "Wardrobe & Storage", url: "/Images/services/wardrobes-storage.webp" },
];

function createDefaultBlocks(): EditorBlock[] {
  return [
    {
      id: `block-${Date.now()}-1`,
      type: "paragraph",
      text: "",
    },
    {
      id: `block-${Date.now()}-2`,
      type: "subheading",
      text: "",
    },
    {
      id: `block-${Date.now()}-3`,
      type: "paragraph",
      text: "",
    },
    {
      id: `block-${Date.now()}-4`,
      type: "bullet_list",
      items: [""],
    },
  ];
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Modal / Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [modalError, setModalError] = useState<string | null>(null);
  const modalScrollRef = useRef<HTMLDivElement>(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [blocks, setBlocks] = useState<EditorBlock[]>(createDefaultBlocks);
  const [published, setPublished] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const isConfigured = isSupabaseConfigured();

  const loadBlogs = useCallback(async () => {
    try {
      if (!isConfigured) {
        setBlogs([]);
        setIsLoading(false);
        return;
      }

      const data = await getAdminBlogs();
      setBlogs(data || []);
    } catch (err: unknown) {
      console.error("Failed to load blogs:", err);
      const msg = err instanceof Error ? err.message : "Failed to load blogs";
      setStatusMessage({ type: "error", text: msg });
    } finally {
      setIsLoading(false);
    }
  }, [isConfigured]);

  useEffect(() => {
    void Promise.resolve().then(() => {
      loadBlogs();
    });
  }, [loadBlogs]);

  // Open Form to Add New Blog
  const handleAddNew = () => {
    setEditingBlogId(null);
    setTitle("");
    setCoverImageUrl("");
    setBlocks(createDefaultBlocks());
    setPublished(true);
    setStatusMessage(null);
    setModalError(null);
    setIsFormOpen(true);
  };

  // Open Form to Edit Blog
  const handleEdit = (blog: BlogRow) => {
    setEditingBlogId(blog.id);
    setTitle(blog.title);
    setCoverImageUrl(blog.cover_image);
    setPublished(blog.published);

    const convertedBlocks: EditorBlock[] = (blog.content || []).map((b, idx) => ({
      id: `block-${idx}-${Date.now()}`,
      type: b.type,
      text: "text" in b ? b.text : "",
      items: "items" in b && Array.isArray(b.items) ? [...b.items] : [""],
    }));

    setBlocks(convertedBlocks.length > 0 ? convertedBlocks : createDefaultBlocks());
    setStatusMessage(null);
    setModalError(null);
    setIsFormOpen(true);
  };

  // Delete Blog
  const handleDelete = async (id: string, blogTitle: string) => {
    if (!window.confirm(`Delete article "${blogTitle}"? This cannot be undone.`)) {
      return;
    }

    try {
      if (!isConfigured) {
        setBlogs((prev) => prev.filter((b) => b.id !== id));
        setStatusMessage({ type: "success", text: `Deleted "${blogTitle}" (preview mode).` });
        return;
      }

      await deleteBlogRecord(id);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
      invalidateDataCache();
      setStatusMessage({ type: "success", text: `Article "${blogTitle}" deleted successfully.` });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete blog";
      setStatusMessage({ type: "error", text: msg });
    }
  };

  // Toggle Publish
  const handleTogglePublish = async (blog: BlogRow) => {
    const nextStatus = !blog.published;
    try {
      if (!isConfigured) {
        setBlogs((prev) =>
          prev.map((b) => (b.id === blog.id ? { ...b, published: nextStatus } : b))
        );
        setStatusMessage({
          type: "success",
          text: `Article is now ${nextStatus ? "Published" : "Draft"} (preview mode).`,
        });
        return;
      }

      await toggleBlogPublish(blog.id, nextStatus);
      setBlogs((prev) =>
        prev.map((b) => (b.id === blog.id ? { ...b, published: nextStatus } : b))
      );
      setStatusMessage({
        type: "success",
        text: `Article is now ${nextStatus ? "Published" : "Draft"}.`,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to toggle publish status";
      setStatusMessage({ type: "error", text: msg });
    }
  };

  // Upload Cover Image
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setStatusMessage(null);

    try {
      if (!isConfigured) {
        const localUrl = URL.createObjectURL(file);
        setCoverImageUrl(localUrl);
        setStatusMessage({ type: "success", text: "Image selected (local preview mode)." });
      } else {
        const publicUrl = await uploadBlogCoverToStorage(file);
        setCoverImageUrl(publicUrl);
        setStatusMessage({ type: "success", text: "Cover image uploaded to Supabase Storage!" });
      }
    } catch (err: unknown) {
      console.error("Upload error:", err);
      const msg = err instanceof Error ? err.message : "Cover image upload failed";
      setStatusMessage({ type: "error", text: msg });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Block management
  const addBlock = (type: BlogBlockType) => {
    const newBlock: EditorBlock = {
      id: `block-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      type,
      text: "",
      items: type === "bullet_list" ? [""] : undefined,
    };
    setBlocks((prev) => [...prev, newBlock]);
  };

  const removeBlock = (id: string) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  };

  const moveBlock = (index: number, direction: "up" | "down") => {
    setBlocks((prev) => {
      const copy = [...prev];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= copy.length) return copy;
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      return copy;
    });
  };

  const updateBlockText = (id: string, text: string) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, text } : b))
    );
  };

  const updateBulletItem = (blockId: string, itemIdx: number, value: string) => {
    setBlocks((prev) =>
      prev.map((b) => {
        if (b.id !== blockId || !b.items) return b;
        const newItems = [...b.items];
        newItems[itemIdx] = value;
        return { ...b, items: newItems };
      })
    );
  };

  const addBulletItem = (blockId: string) => {
    setBlocks((prev) =>
      prev.map((b) => {
        if (b.id !== blockId || !b.items) return b;
        return { ...b, items: [...b.items, ""] };
      })
    );
  };

  const removeBulletItem = (blockId: string, itemIdx: number) => {
    setBlocks((prev) =>
      prev.map((b) => {
        if (b.id !== blockId || !b.items) return b;
        if (b.items.length <= 1) return b;
        const newItems = b.items.filter((_, i) => i !== itemIdx);
        return { ...b, items: newItems };
      })
    );
  };

  // Save Blog
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError(null);

    if (!title.trim()) {
      setModalError("Please enter the main heading (title) for your article.");
      modalScrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (!coverImageUrl.trim()) {
      setModalError("Please upload or choose 1 cover image for your article.");
      modalScrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Convert editor blocks to clean JSON BlogBlock[]
    const cleanContent: BlogBlock[] = blocks
      .map((b) => {
        if (b.type === "paragraph") {
          return { type: "paragraph", text: (b.text || "").trim() };
        }
        if (b.type === "subheading") {
          return { type: "subheading", text: (b.text || "").trim() };
        }
        if (b.type === "bullet_list") {
          const cleanItems = (b.items || []).map((i) => i.trim()).filter(Boolean);
          return { type: "bullet_list", items: cleanItems };
        }
        return null;
      })
      .filter((b): b is BlogBlock => {
        if (!b) return false;
        if (b.type === "paragraph" || b.type === "subheading") return Boolean(b.text);
        if (b.type === "bullet_list") return Array.isArray(b.items) && b.items.length > 0;
        return false;
      });

    if (cleanContent.length === 0) {
      setModalError("Please enter at least one paragraph of text in your article content.");
      return;
    }

    setIsSaving(true);
    setStatusMessage(null);

    const slug = slugify(title.trim()) || `blog-${Date.now()}`;

    const payload = {
      title: title.trim(),
      slug,
      cover_image: coverImageUrl.trim(),
      content: cleanContent,
      published,
    };

    try {
      if (!isConfigured) {
        if (editingBlogId) {
          setBlogs((prev) =>
            prev.map((b) =>
              b.id === editingBlogId
                ? { ...b, ...payload, updated_at: new Date().toISOString() }
                : b
            )
          );
          setStatusMessage({ type: "success", text: "Article updated (preview mode)." });
        } else {
          const newBlog: BlogRow = {
            id: `mock-blog-${Date.now()}`,
            ...payload,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          setBlogs((prev) => [newBlog, ...prev]);
          setStatusMessage({ type: "success", text: "Article created (preview mode)." });
        }
        setModalError(null);
        setIsFormOpen(false);
        setIsSaving(false);
        return;
      }

      if (editingBlogId) {
        await updateBlogRecord(editingBlogId, payload);
        setStatusMessage({ type: "success", text: "Article updated successfully in Supabase!" });
      } else {
        await createBlogRecord(payload);
        setStatusMessage({ type: "success", text: "Article created and saved to Supabase!" });
      }

      setModalError(null);
      setIsFormOpen(false);
      await loadBlogs();
    } catch (err: unknown) {
      console.error("Save error:", err);
      const msg = err instanceof Error ? err.message : "Failed to save blog";
      setModalError(msg);
      setStatusMessage({ type: "error", text: msg });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="admin-page">
      {/* Top Header Bar */}
      <div className="admin-page-header">
        <div>
          <span className="page-eyebrow">EDITORIAL CONTENT</span>
          <h1 className="page-title">Blog Articles</h1>
          <p className="page-subtitle">
            Create and manage interior design guides, material selection breakdowns, and turnkey insights for homeowners.
          </p>
        </div>
        <button type="button" onClick={handleAddNew} className="btn-add-new">
          <Plus size={16} />
          <span>New Article</span>
        </button>
      </div>

      {/* Status Messages */}
      {statusMessage && (
        <div className={`status-banner ${statusMessage.type}`}>
          {statusMessage.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          <span>{statusMessage.text}</span>
          <button type="button" onClick={() => setStatusMessage(null)} className="status-close-btn">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Blogs List */}
      <div className="blogs-table-card">
        {isLoading ? (
          <div className="loading-state">
            <Loader2 size={28} className="spinner" />
            <p>Loading articles from Supabase...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="empty-state">
            <BookOpen size={40} className="empty-icon" />
            <h3>No articles published yet</h3>
            <p>Click &quot;New Article&quot; to write your first architectural blog post.</p>
            <button type="button" onClick={handleAddNew} className="btn-add-first">
              <Plus size={14} />
              <span>Create First Blog</span>
            </button>
          </div>
        ) : (
          <>
            {/* Desktop Table View (>= 769px) */}
            <div className="table-wrapper desktop-table-view">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th style={{ width: "100px" }}>Cover</th>
                    <th>Article Title &amp; Slug</th>
                    <th style={{ width: "120px" }}>Status</th>
                    <th style={{ width: "140px" }}>Date</th>
                    <th style={{ width: "180px", textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((b) => (
                    <tr key={b.id}>
                      <td>
                        <div className="table-thumb-frame">
                          <Image
                            src={b.cover_image || "/Images/main-hero.webp"}
                            alt={b.title}
                            fill
                            sizes="80px"
                            className="table-thumb-img"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="table-title-cell">
                          <span className="table-blog-title">{b.title}</span>
                          <span className="table-blog-slug">/blogs/{b.slug}</span>
                        </div>
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleTogglePublish(b)}
                          className={`status-pill ${b.published ? "published" : "draft"}`}
                          title="Click to toggle publish status"
                        >
                          {b.published ? <Eye size={12} /> : <EyeOff size={12} />}
                          <span>{b.published ? "Published" : "Draft"}</span>
                        </button>
                      </td>
                      <td>
                        <span className="table-date">
                          {new Date(b.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <div className="action-buttons-group">
                          <Link
                            href={`/blogs/${b.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="action-icon-btn view"
                            title="View public article"
                          >
                            <ExternalLink size={15} />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleEdit(b)}
                            className="action-icon-btn edit"
                            title="Edit article"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(b.id, b.title)}
                            className="action-icon-btn delete"
                            title="Delete article"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards List (< 769px) */}
            <div className="mobile-cards-view">
              {blogs.map((b) => (
                <div key={b.id} className="mobile-blog-card">
                  <div className="mobile-card-row-top">
                    <div className="mobile-thumb-wrap">
                      <Image
                        src={b.cover_image || "/Images/main-hero.webp"}
                        alt={b.title}
                        fill
                        sizes="100px"
                        className="mobile-thumb-img"
                      />
                    </div>
                    <div className="mobile-card-info">
                      <h3 className="mobile-blog-title">{b.title}</h3>
                      <span className="mobile-blog-slug">/blogs/{b.slug}</span>
                    </div>
                  </div>

                  <div className="mobile-card-row-meta">
                    <button
                      type="button"
                      onClick={() => handleTogglePublish(b)}
                      className={`status-pill ${b.published ? "published" : "draft"}`}
                      title="Click to toggle publish status"
                    >
                      {b.published ? <Eye size={12} /> : <EyeOff size={12} />}
                      <span>{b.published ? "Published" : "Draft"}</span>
                    </button>
                    <span className="table-date">
                      {new Date(b.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="mobile-card-row-actions">
                    <Link
                      href={`/blogs/${b.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mobile-action-btn view"
                      title="View public article"
                    >
                      <ExternalLink size={14} />
                      <span>View</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleEdit(b)}
                      className="mobile-action-btn edit"
                      title="Edit article"
                    >
                      <Edit3 size={14} />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(b.id, b.title)}
                      className="mobile-action-btn delete"
                      title="Delete article"
                    >
                      <Trash2 size={14} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Editor Modal / Drawer */}
      {isFormOpen && (
        <div className="modal-backdrop" onClick={() => setIsFormOpen(false)}>
          <div
            ref={modalScrollRef}
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <span className="modal-eyebrow">
                  {editingBlogId ? "EDITING ARTICLE" : "NEW ARTICLE"}
                </span>
                <h2 className="modal-title">
                  {editingBlogId ? "Edit Blog Article" : "Write Blog Article"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="modal-close-btn"
                aria-label="Close form"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Error Alert Banner */}
            {modalError && (
              <div className="modal-error-banner">
                <AlertCircle size={18} className="modal-error-icon" />
                <div className="modal-error-text">
                  <strong>Notice:</strong> {modalError}
                </div>
                <button
                  type="button"
                  onClick={() => setModalError(null)}
                  className="modal-error-close"
                  aria-label="Dismiss error"
                >
                  <X size={15} />
                </button>
              </div>
            )}

            <form onSubmit={handleSave} className="modal-form" noValidate>
              {/* Field 1: One Cover Image */}
              <div className={`form-section ${!coverImageUrl && modalError?.includes("cover image") ? "field-error-ring" : ""}`}>
                <div className="section-label-row">
                  <label className="section-label">
                    1. Cover Image <span className="req">*</span>
                  </label>
                  <span className="field-hint">1 landscape image required</span>
                </div>

                {/* Quick Presets Bar */}
                <div className="cover-presets-row">
                  <span className="presets-title">Quick presets:</span>
                  <div className="presets-list">
                    {COVER_PRESETS.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => {
                          setCoverImageUrl(preset.url);
                          setModalError(null);
                        }}
                        className={`preset-chip ${coverImageUrl === preset.url ? "is-selected" : ""}`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="image-upload-zone">
                  {coverImageUrl ? (
                    <div className="cover-preview-box">
                      <div className="cover-preview-frame">
                        <Image
                          src={coverImageUrl}
                          alt="Cover preview"
                          fill
                          sizes="600px"
                          className="cover-preview-img"
                        />
                      </div>
                      <div className="cover-preview-actions">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isUploading}
                          className="btn-replace-img"
                        >
                          <Upload size={14} />
                          <span>{isUploading ? "Uploading..." : "Replace"}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setCoverImageUrl("")}
                          className="btn-remove-img"
                        >
                          <Trash2 size={14} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="upload-dropzone"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {isUploading ? (
                        <div className="uploading-state">
                          <Loader2 size={24} className="spinner" />
                          <span>Uploading to Supabase Storage...</span>
                        </div>
                      ) : (
                        <>
                          <Upload size={24} className="upload-icon" />
                          <span className="upload-title">Tap to upload cover image from device</span>
                          <span className="upload-sub">PNG, JPG, or WebP landscape (or select a preset above)</span>
                        </>
                      )}
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden-file-input"
                  />

                  {/* Optional manual URL input fallback */}
                  <div className="url-fallback-row">
                    <span className="url-fallback-label">Or image URL:</span>
                    <input
                      type="url"
                      value={coverImageUrl}
                      onChange={(e) => {
                        setCoverImageUrl(e.target.value);
                        setModalError(null);
                      }}
                      placeholder="https://.../cover.jpg or /Images/services/modular-kitchens.webp"
                      className="url-input"
                    />
                  </div>
                </div>
              </div>

              {/* Field 2: Main Heading */}
              <div className={`form-section ${!title.trim() && modalError?.includes("heading") ? "field-error-ring" : ""}`}>
                <label className="section-label">
                  2. Main Heading (Title) <span className="req">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setModalError(null);
                  }}
                  placeholder="e.g. Modular Kitchen Materials Guide: Acrylic vs PU vs Laminate"
                  className="title-input"
                />
                {title.trim() && (
                  <div className="slug-preview">
                    <span>URL Slug:</span>
                    <code>/blogs/{slugify(title)}</code>
                  </div>
                )}
              </div>

              {/* Field 3: Structured Article Content */}
              <div className="form-section">
                <div className="content-section-header">
                  <div>
                    <label className="section-label">
                      3. Article Content <span className="req">*</span>
                    </label>
                    <p className="section-subtext">
                      Supports: Normal Paragraphs, Side Headings, and Bullet Points.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setBlocks(createDefaultBlocks())}
                    className="btn-template-reset"
                    title="Load standard structure: Paragraph → Subheading → Paragraph → Bullets"
                  >
                    <Sparkles size={13} />
                    <span>Standard Structure</span>
                  </button>
                </div>

                <div className="blocks-list">
                  {blocks.map((block, index) => (
                    <div key={block.id} className={`block-card block-${block.type}`}>
                      <div className="block-header">
                        <div className="block-type-pill">
                          {block.type === "paragraph" && <AlignLeft size={13} />}
                          {block.type === "subheading" && <Heading size={13} />}
                          {block.type === "bullet_list" && <List size={13} />}
                          <span>
                            {block.type === "paragraph" && "Normal Paragraph"}
                            {block.type === "subheading" && "Side Heading"}
                            {block.type === "bullet_list" && "Bullet Points"}
                          </span>
                        </div>

                        <div className="block-actions">
                          <button
                            type="button"
                            onClick={() => moveBlock(index, "up")}
                            disabled={index === 0}
                            className="block-action-btn"
                            title="Move Up"
                          >
                            <ArrowUp size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveBlock(index, "down")}
                            disabled={index === blocks.length - 1}
                            className="block-action-btn"
                            title="Move Down"
                          >
                            <ArrowDown size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeBlock(block.id)}
                            className="block-action-btn delete"
                            title="Delete this block"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      <div className="block-input-zone">
                        {block.type === "paragraph" && (
                          <textarea
                            value={block.text || ""}
                            onChange={(e) => {
                              updateBlockText(block.id, e.target.value);
                              setModalError(null);
                            }}
                            placeholder="Write paragraph text here..."
                            rows={3}
                            className="block-textarea"
                          />
                        )}

                        {block.type === "subheading" && (
                          <input
                            type="text"
                            value={block.text || ""}
                            onChange={(e) => {
                              updateBlockText(block.id, e.target.value);
                              setModalError(null);
                            }}
                            placeholder="Enter side heading text..."
                            className="block-subheading-input"
                          />
                        )}

                        {block.type === "bullet_list" && (
                          <div className="bullets-builder">
                            {(block.items || []).map((bullet, bulletIdx) => (
                              <div key={bulletIdx} className="bullet-row">
                                <span className="bullet-marker">•</span>
                                <input
                                  type="text"
                                  value={bullet}
                                  onChange={(e) => {
                                    updateBulletItem(block.id, bulletIdx, e.target.value);
                                    setModalError(null);
                                  }}
                                  placeholder={`Bullet point ${bulletIdx + 1}...`}
                                  className="bullet-input"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeBulletItem(block.id, bulletIdx)}
                                  disabled={(block.items || []).length <= 1}
                                  className="btn-remove-bullet"
                                  title="Remove this bullet"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() => addBulletItem(block.id)}
                              className="btn-add-bullet"
                            >
                              <Plus size={13} />
                              <span>Add Bullet Point</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Block Creation Quick Bar */}
                <div className="add-block-toolbar">
                  <span className="toolbar-label">+ Add New Section:</span>
                  <div className="toolbar-buttons">
                    <button
                      type="button"
                      onClick={() => addBlock("paragraph")}
                      className="toolbar-btn"
                    >
                      <AlignLeft size={14} />
                      <span>Paragraph</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => addBlock("subheading")}
                      className="toolbar-btn"
                    >
                      <Heading size={14} />
                      <span>Side Heading</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => addBlock("bullet_list")}
                      className="toolbar-btn"
                    >
                      <List size={14} />
                      <span>Bullet Points</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Publish Toggle */}
              <div className="form-section publish-toggle-section">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="custom-checkbox"
                  />
                  <div>
                    <span className="checkbox-title">Publish article publicly on /blogs</span>
                    <span className="checkbox-sub">Uncheck to save as a private draft.</span>
                  </div>
                </label>
              </div>

              {/* Form Footer Actions */}
              <div className="modal-footer">
                {modalError && (
                  <div className="modal-footer-error">
                    <AlertCircle size={15} className="flex-shrink-0" />
                    <span>{modalError}</span>
                  </div>
                )}
                <div className="modal-footer-actions">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    disabled={isSaving}
                    className="btn-cancel"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving || isUploading}
                    className="btn-submit"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 size={16} className="spinner" />
                        <span>Saving to Supabase...</span>
                      </>
                    ) : (
                      <span>{editingBlogId ? "Update Article" : "Publish Article"}</span>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .admin-page {
          padding: 2rem 2.5rem;
          max-width: 1300px;
          margin: 0 auto;
        }

        .admin-page-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 2rem;
          gap: 1.5rem;
        }

        .page-eyebrow {
          font-family: var(--font-body);
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #29ABE2;
          display: block;
          margin-bottom: 0.35rem;
        }

        .page-title {
          font-family: var(--font-display);
          font-size: 1.875rem;
          font-weight: 650;
          color: var(--foreground);
          margin-bottom: 0.4rem;
          letter-spacing: -0.02em;
        }

        .page-subtitle {
          font-family: var(--font-body);
          font-size: 0.9375rem;
          color: var(--foreground-muted);
          max-width: 650px;
          line-height: 1.5;
        }

        .btn-add-new {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: #29ABE2;
          color: #ffffff;
          border: none;
          border-radius: 10px;
          font-family: var(--font-body);
          font-size: 0.875rem;
          font-weight: 650;
          cursor: pointer;
          transition: background 0.15s ease, transform 0.15s ease;
          white-space: nowrap;
          box-shadow: 0 4px 14px rgba(41, 171, 226, 0.35);
        }

        .btn-add-new:hover {
          background: #1FA0D6;
          transform: translateY(-1px);
        }

        /* Status Banner */
        .status-banner {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1.25rem;
          border-radius: 10px;
          margin-bottom: 1.5rem;
          font-family: var(--font-body);
          font-size: 0.875rem;
        }

        .status-banner.success {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: #059669;
        }

        .status-banner.error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #DC2626;
        }

        .status-close-btn {
          margin-left: auto;
          background: none;
          border: none;
          color: inherit;
          cursor: pointer;
          opacity: 0.7;
        }

        /* Table Card */
        .blogs-table-card {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
        }

        .desktop-table-view {
          display: block;
          overflow-x: auto;
        }

        .mobile-cards-view {
          display: none;
        }

        .admin-table {
          width: 100%;
          min-width: 680px;
          border-collapse: collapse;
          font-family: var(--font-body);
          font-size: 0.875rem;
        }

        .admin-table th {
          background: #FAF8F5;
          text-align: left;
          padding: 0.875rem 1.25rem;
          font-weight: 650;
          color: var(--foreground-muted);
          font-size: 0.75rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border-bottom: 1px solid var(--border);
        }

        .admin-table td {
          padding: 1rem 1.25rem;
          border-bottom: 1px solid var(--border-subtle);
          color: var(--foreground);
          vertical-align: middle;
        }

        .admin-table tr:last-child td {
          border-bottom: none;
        }

        .admin-table tr:hover td {
          background-color: #FAF9F6;
        }

        .table-thumb-frame {
          position: relative;
          width: 80px;
          aspect-ratio: 16 / 10;
          border-radius: 8px;
          overflow: hidden;
          background: var(--background-muted);
        }

        :global(.table-thumb-img) {
          object-fit: cover;
        }

        .table-title-cell {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .table-blog-title {
          font-weight: 650;
          color: var(--foreground);
          font-size: 0.9375rem;
        }

        .table-blog-slug {
          font-size: 0.75rem;
          color: var(--foreground-subtle);
          font-family: monospace;
        }

        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.25rem 0.65rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 650;
          border: none;
          cursor: pointer;
          transition: opacity 0.15s ease;
        }

        .status-pill.published {
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
        }

        .status-pill.draft {
          background: rgba(245, 158, 11, 0.12);
          color: #D97706;
        }

        .table-date {
          font-size: 0.8125rem;
          color: var(--foreground-muted);
        }

        .action-buttons-group {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }

        .action-icon-btn {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--foreground-muted);
          cursor: pointer;
          text-decoration: none;
          transition: all 0.15s ease;
        }

        .action-icon-btn:hover {
          color: #29ABE2;
          border-color: #29ABE2;
          background: rgba(41, 171, 226, 0.05);
        }

        .action-icon-btn.delete:hover {
          color: #DC2626;
          border-color: #DC2626;
          background: rgba(239, 68, 68, 0.05);
        }

        /* Mobile Blog Card Styles (< 769px) */
        .mobile-blog-card {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 1.1rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
        }

        .mobile-card-row-top {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .mobile-thumb-wrap {
          position: relative;
          width: 72px;
          height: 48px;
          border-radius: 8px;
          overflow: hidden;
          background: var(--background-muted);
          flex-shrink: 0;
        }

        :global(.mobile-thumb-img) {
          object-fit: cover;
        }

        .mobile-card-info {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          flex: 1;
          min-width: 0;
        }

        .mobile-blog-title {
          font-size: 0.9375rem;
          font-weight: 650;
          color: var(--foreground);
          line-height: 1.35;
          margin: 0;
          word-break: break-word;
        }

        .mobile-blog-slug {
          font-size: 0.725rem;
          color: var(--foreground-subtle);
          font-family: monospace;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .mobile-card-row-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.4rem 0;
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
        }

        .mobile-card-row-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        :global(.mobile-action-btn) {
          flex: 1;
          height: 38px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          border-radius: 8px;
          font-size: 0.8125rem;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          border: 1px solid var(--border);
          background: #FAF9F6;
          color: var(--foreground);
          transition: all 0.15s ease;
        }

        :global(.mobile-action-btn.view:hover) {
          border-color: #29ABE2;
          color: #29ABE2;
          background: rgba(41, 171, 226, 0.05);
        }

        :global(.mobile-action-btn.edit:hover) {
          border-color: #29ABE2;
          color: #29ABE2;
          background: rgba(41, 171, 226, 0.05);
        }

        :global(.mobile-action-btn.delete:hover) {
          border-color: #DC2626;
          color: #DC2626;
          background: rgba(239, 68, 68, 0.05);
        }

        /* Loading & Empty State */
        .loading-state,
        .empty-state {
          padding: 4rem 1.5rem;
          text-align: center;
          color: var(--foreground-muted);
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .empty-icon {
          color: #29ABE2;
          margin-bottom: 0.75rem;
        }

        .empty-state h3 {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 650;
          color: var(--foreground);
          margin-bottom: 0.35rem;
        }

        .btn-add-first {
          margin-top: 1.25rem;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.65rem 1.25rem;
          background: #29ABE2;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
        }

        /* Modal / Drawer */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(18, 20, 24, 0.6);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          overflow-y: auto;
        }

        .modal-container {
          background: #ffffff;
          border-radius: 20px;
          width: 100%;
          max-width: 860px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
        }

        .modal-header {
          padding: 1.5rem 2rem;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          background: #FAF9F6;
          position: sticky;
          top: 0;
          z-index: 5;
        }

        .modal-eyebrow {
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #29ABE2;
        }

        .modal-title {
          font-family: var(--font-display);
          font-size: 1.4rem;
          font-weight: 650;
          color: var(--foreground);
        }

        .modal-close-btn {
          background: none;
          border: none;
          color: var(--foreground-muted);
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 6px;
        }

        .modal-close-btn:hover {
          color: var(--foreground);
        }

        .modal-form {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .form-section {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .section-label {
          font-family: var(--font-body);
          font-size: 0.9375rem;
          font-weight: 700;
          color: var(--foreground);
        }

        .req {
          color: #DC2626;
        }

        .section-subtext {
          font-size: 0.8125rem;
          color: var(--foreground-muted);
        }

        /* Cover Image Upload */
        .image-upload-zone {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .upload-dropzone {
          border: 2px dashed var(--border);
          border-radius: 14px;
          padding: 2.25rem 1.5rem;
          text-align: center;
          cursor: pointer;
          background: #FAF9F6;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          transition: border-color 0.15s ease, background 0.15s ease;
        }

        .upload-dropzone:hover {
          border-color: #29ABE2;
          background: rgba(41, 171, 226, 0.03);
        }

        .upload-icon {
          color: #29ABE2;
          margin-bottom: 0.25rem;
        }

        .upload-title {
          font-weight: 650;
          color: var(--foreground);
          font-size: 0.9375rem;
        }

        .upload-sub {
          font-size: 0.75rem;
          color: var(--foreground-subtle);
        }

        .uploading-state {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          color: #29ABE2;
          font-weight: 600;
          font-size: 0.9375rem;
        }

        .hidden-file-input {
          display: none;
        }

        .cover-preview-box {
          border: 1px solid var(--border);
          border-radius: 14px;
          overflow: hidden;
          background: #ffffff;
        }

        .cover-preview-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          background: #111;
        }

        :global(.cover-preview-img) {
          object-fit: cover;
        }

        .cover-preview-actions {
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: #FAF8F5;
          border-top: 1px solid var(--border-subtle);
        }

        .btn-replace-img,
        .btn-remove-img {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 0.85rem;
          border-radius: 8px;
          font-size: 0.8125rem;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-replace-img {
          background: #ffffff;
          border: 1px solid var(--border);
          color: var(--foreground);
        }

        .btn-remove-img {
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #DC2626;
        }

        .url-fallback-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .url-fallback-label {
          font-size: 0.75rem;
          color: var(--foreground-subtle);
          white-space: nowrap;
        }

        .url-input {
          flex: 1;
          padding: 0.5rem 0.75rem;
          border: 1px solid var(--border);
          border-radius: 8px;
          font-size: 0.8125rem;
          color: var(--foreground);
        }

        /* Title input */
        .title-input {
          padding: 0.875rem 1rem;
          border: 1.5px solid var(--border);
          border-radius: 10px;
          font-family: var(--font-display);
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--foreground);
          width: 100%;
        }

        .title-input:focus,
        .url-input:focus,
        .block-textarea:focus,
        .block-subheading-input:focus,
        .bullet-input:focus {
          outline: none;
          border-color: #29ABE2;
          box-shadow: 0 0 0 3px rgba(41, 171, 226, 0.15);
        }

        .slug-preview {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: var(--foreground-subtle);
        }

        .slug-preview code {
          color: #29ABE2;
          font-weight: 600;
        }

        /* Structured Blocks */
        .content-section-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
        }

        .btn-template-reset {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.35rem 0.75rem;
          background: rgba(41, 171, 226, 0.08);
          color: #29ABE2;
          border: 1px solid rgba(41, 171, 226, 0.25);
          border-radius: 8px;
          font-size: 0.75rem;
          font-weight: 650;
          cursor: pointer;
        }

        .blocks-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .block-card {
          border: 1px solid var(--border);
          border-radius: 12px;
          background: #ffffff;
          padding: 1rem;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.02);
          transition: border-color 0.15s ease;
        }

        .block-card:hover {
          border-color: #D0CCC4;
        }

        .block-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }

        .block-type-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: #FAF8F5;
          color: var(--foreground-muted);
          border: 1px solid var(--border-subtle);
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.02em;
        }

        .block-subheading .block-type-pill {
          color: #29ABE2;
          background: rgba(41, 171, 226, 0.08);
          border-color: rgba(41, 171, 226, 0.2);
        }

        .block-reorder-actions {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .block-action-btn {
          width: 26px;
          height: 26px;
          border-radius: 6px;
          border: 1px solid var(--border);
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--foreground-muted);
          cursor: pointer;
        }

        .block-action-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .block-action-btn.delete:hover {
          color: #DC2626;
          border-color: #DC2626;
          background: rgba(239, 68, 68, 0.05);
        }

        .block-textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid var(--border);
          border-radius: 8px;
          font-family: var(--font-body);
          font-size: 0.9375rem;
          line-height: 1.6;
          color: var(--foreground);
          resize: vertical;
        }

        .block-subheading-input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid var(--border);
          border-radius: 8px;
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 650;
          color: var(--foreground);
        }

        /* Bullets Builder */
        .bullets-builder {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .bullet-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .bullet-marker {
          color: #29ABE2;
          font-size: 1.25rem;
          line-height: 1;
        }

        .bullet-input {
          flex: 1;
          padding: 0.6rem 0.75rem;
          border: 1px solid var(--border);
          border-radius: 8px;
          font-family: var(--font-body);
          font-size: 0.875rem;
          color: var(--foreground);
        }

        .btn-remove-bullet {
          width: 28px;
          height: 28px;
          border-radius: 6px;
          border: 1px solid var(--border);
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--foreground-muted);
          cursor: pointer;
        }

        .btn-remove-bullet:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .btn-add-bullet {
          align-self: flex-start;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.35rem 0.75rem;
          background: #ffffff;
          border: 1px dashed #29ABE2;
          color: #29ABE2;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 650;
          cursor: pointer;
          margin-top: 0.25rem;
        }

        /* Add Block Toolbar */
        .add-block-toolbar {
          margin-top: 1rem;
          padding: 1rem;
          border: 1.5px dashed var(--border);
          border-radius: 12px;
          background: #FAF8F5;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .toolbar-label {
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--foreground-muted);
        }

        .toolbar-buttons {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .toolbar-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 0.85rem;
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 8px;
          color: var(--foreground);
          font-size: 0.8125rem;
          font-weight: 650;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .toolbar-btn:hover {
          border-color: #29ABE2;
          color: #29ABE2;
          background: rgba(41, 171, 226, 0.05);
        }

        /* Publish Checkbox */
        .publish-toggle-section {
          padding: 1rem 1.25rem;
          background: #FAF8F5;
          border-radius: 12px;
          border: 1px solid var(--border-subtle);
        }

        .checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          cursor: pointer;
        }

        .custom-checkbox {
          width: 18px;
          height: 18px;
          accent-color: #29ABE2;
          margin-top: 0.15rem;
        }

        .checkbox-title {
          font-weight: 650;
          font-size: 0.9375rem;
          color: var(--foreground);
          display: block;
        }

        .checkbox-sub {
          font-size: 0.75rem;
          color: var(--foreground-muted);
        }

        /* Modal Error Banner */
        .modal-error-banner {
          margin: 1rem 2rem 0;
          padding: 0.85rem 1.15rem;
          background: #FEF2F2;
          border: 1.5px solid #F87171;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #991B1B;
          font-size: 0.875rem;
        }

        :global(.modal-error-icon) {
          color: #DC2626;
          flex-shrink: 0;
        }

        .modal-error-text {
          flex: 1;
          line-height: 1.4;
        }

        .modal-error-close {
          background: none;
          border: none;
          color: #991B1B;
          cursor: pointer;
          padding: 0.25rem;
          opacity: 0.7;
          border-radius: 4px;
        }

        .modal-error-close:hover {
          opacity: 1;
          background: rgba(220, 38, 38, 0.1);
        }

        .field-error-ring {
          padding: 0.85rem;
          border: 1.5px solid #F87171;
          border-radius: 12px;
          background: #FFFBFB;
        }

        .section-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .field-hint {
          font-size: 0.75rem;
          color: var(--foreground-subtle);
        }

        /* Cover Presets */
        .cover-presets-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 0.5rem;
        }

        .presets-title {
          font-size: 0.75rem;
          font-weight: 650;
          color: var(--foreground-muted);
        }

        .presets-list {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          flex-wrap: wrap;
        }

        .preset-chip {
          padding: 0.3rem 0.65rem;
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--foreground);
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .preset-chip:hover {
          border-color: #29ABE2;
          color: #29ABE2;
        }

        .preset-chip.is-selected {
          background: #29ABE2;
          color: #ffffff;
          border-color: #29ABE2;
        }

        /* Footer */
        .modal-footer {
          padding: 1.25rem 2rem;
          border-top: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          background: #FAF9F6;
          position: sticky;
          bottom: 0;
          z-index: 5;
        }

        .modal-footer-error {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: #DC2626;
          font-size: 0.8125rem;
          font-weight: 600;
          flex: 1;
        }

        .modal-footer-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-left: auto;
        }

        .btn-cancel {
          padding: 0.75rem 1.25rem;
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.875rem;
          color: var(--foreground);
          cursor: pointer;
        }

        .btn-submit {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: #29ABE2;
          color: #ffffff;
          border: none;
          border-radius: 10px;
          font-weight: 650;
          font-size: 0.875rem;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(41, 171, 226, 0.35);
        }

        .btn-submit:hover:not(:disabled) {
          background: #1FA0D6;
        }

        .btn-submit:disabled,
        .btn-cancel:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .admin-page {
            padding: 1rem 0.85rem;
          }

          .admin-page-header {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
          }

          .btn-add-new {
            width: 100%;
            height: 44px;
            justify-content: center;
          }

          /* Hide wide table on mobile, show card list */
          .desktop-table-view {
            display: none !important;
          }

          .mobile-cards-view {
            display: flex !important;
            flex-direction: column;
            gap: 0.85rem;
            padding: 0.85rem;
          }

          .modal-backdrop {
            padding: 0.35rem;
            align-items: flex-end;
          }

          .modal-container {
            width: 100%;
            max-height: 94dvh;
            border-radius: 16px 16px 0 0;
          }

          .modal-header {
            padding: 1rem 1.15rem;
          }

          .modal-title {
            font-size: 1.15rem;
          }

          .modal-error-banner {
            margin: 0.75rem 1rem 0;
            font-size: 0.8125rem;
            padding: 0.65rem 0.85rem;
          }

          .modal-form {
            padding: 1rem;
            gap: 1.25rem;
          }

          .title-input,
          .block-textarea,
          .block-subheading-input,
          .bullet-input {
            font-size: 16px !important; /* Prevents auto-zoom in mobile Safari */
          }

          .modal-footer {
            padding: 1rem;
            flex-direction: column;
            align-items: stretch;
            gap: 0.75rem;
          }

          .modal-footer-error {
            width: 100%;
          }

          .modal-footer-actions {
            display: flex;
            flex-direction: column-reverse;
            width: 100%;
            gap: 0.65rem;
            margin-left: 0;
          }

          .btn-submit,
          .btn-cancel {
            width: 100%;
            height: 46px;
            justify-content: center;
            font-size: 0.9375rem;
          }

          .add-block-toolbar {
            flex-direction: column;
            align-items: stretch;
          }

          .toolbar-buttons {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }

          .toolbar-btn {
            justify-content: center;
            height: 40px;
          }
        }
      `}</style>
    </div>
  );
}
