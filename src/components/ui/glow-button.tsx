"use client";

import React, { forwardRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ComponentProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  label?: string;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  children?: React.ReactNode;
}

export const Component = forwardRef<HTMLButtonElement, ComponentProps>(
  ({ label = "Generate", onClick, className, children, ...props }, ref) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 200);
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        type="button"
        aria-label={typeof label === "string" ? label : "Button"}
        className={cn("glow-btn", className)}
        onClick={handleClick}
        data-state={isClicked ? "clicked" : undefined}
        {...props}
      >
        {children ? (
          children
        ) : (
          <span className="flex items-center justify-center gap-1.5">
            {label}
            <Sparkles size={16} className="ml-0.5" />
          </span>
        )}
      </button>
    );
  }
);

Component.displayName = "Component";

export const GlowButton = Component;
export default Component;
