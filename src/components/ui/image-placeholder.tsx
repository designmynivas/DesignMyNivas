import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  aspect?: "hero" | "landscape" | "portrait" | "square" | "editorial";
  label?: string;
  className?: string;
}

/**
 * Placeholder component for images that haven't been supplied yet.
 * Renders a clean architectural placeholder with optional label.
 * Replace with real next/image when photography is available.
 */
export default function ImagePlaceholder({
  aspect = "landscape",
  label,
  className,
}: ImagePlaceholderProps) {
  const aspectMap = {
    hero: "16 / 9",
    landscape: "3 / 2",
    portrait: "3 / 4",
    square: "1 / 1",
    editorial: "4 / 5",
  };

  return (
    <div
      className={cn("image-placeholder", className)}
      role="img"
      aria-label={label || "Image placeholder"}
      style={{
        aspectRatio: aspectMap[aspect],
        backgroundColor: "var(--background-muted)",
        border: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
        color: "var(--foreground-muted)",
      }}
    >
      {/* Subtle architectural pattern */}
      <svg
        width="44"
        height="44"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.25 }}
      >
        <rect x="8" y="16" width="32" height="24" rx="1" stroke="currentColor" strokeWidth="1" />
        <path d="M8 32 L20 24 L28 30 L36 22 L40 26" stroke="currentColor" strokeWidth="1" fill="none" />
        <circle cx="32" cy="22" r="3" stroke="currentColor" strokeWidth="1" />
      </svg>
      {label && (
        <span
          style={{
            position: "absolute",
            bottom: "var(--space-sm)",
            left: "var(--space-sm)",
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-eyebrow)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--foreground-muted)",
            backgroundColor: "rgba(255, 255, 255, 0.75)",
            padding: "2px 8px",
            backdropFilter: "blur(4px)",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
