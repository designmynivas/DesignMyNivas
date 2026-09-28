import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn("section-heading", className)}
      style={{
        textAlign: align,
        maxWidth: align === "center" ? "680px" : undefined,
        marginLeft: align === "center" ? "auto" : undefined,
        marginRight: align === "center" ? "auto" : undefined,
      }}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2
        style={{
          marginTop: eyebrow ? "var(--space-sm)" : undefined,
          lineHeight: 1.15,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            marginTop: "var(--space-md)",
            fontSize: "var(--text-body-lg)",
            color: "var(--foreground-muted)",
            lineHeight: 1.7,
            maxWidth: align === "left" ? "560px" : undefined,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
