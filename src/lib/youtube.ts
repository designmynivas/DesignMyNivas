/**
 * Robust YouTube URL parsing utility for Design My Nivas.
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/shorts/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 */
export function extractYouTubeId(url?: string | null): string | null {
  if (!url || typeof url !== "string") return null;

  const cleanUrl = url.trim();
  if (!cleanUrl) return null;

  // Regex covering standard watch, shorts, share, and embed URLs
  const regExp =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/i;

  const match = cleanUrl.match(regExp);
  if (match && match[1]) {
    return match[1];
  }

  // Fallback: If user directly pasted an 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(cleanUrl)) {
    return cleanUrl;
  }

  return null;
}

/**
 * Returns the high-resolution poster image for a YouTube video.
 */
export function getYouTubeThumbnail(videoId: string, quality: "hq" | "maxres" = "maxres"): string {
  if (!videoId) return "/Images/main-hero.webp";
  if (quality === "hq") {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

/**
 * Generates an embedded, privacy-friendly player URL with modest branding.
 */
export function getYouTubeEmbedUrl(videoId: string, autoplay = true): string {
  if (!videoId) return "";
  const params = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });
  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}
