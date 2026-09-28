"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  useWordCarousel,
  type UseWordCarouselOptions,
} from "@/components/ui/text-word-carousel-utils/use-word-carousel";

export interface TextWordCarouselProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    UseWordCarouselOptions {
  duration?: number;
}

export function TextWordCarousel({
  words,
  interval,
  className,
  duration = 0.35,
  ...props
}: TextWordCarouselProps) {
  const { currentWord, key } = useWordCarousel({ words, interval });

  return (
    <span className={cn("inline-block relative overflow-hidden align-baseline", className)}>
      <span
        key={key}
        className="inline-block animate-word-slide"
        style={{ animationDuration: `${duration}s` }}
        {...props}
      >
        {currentWord}
      </span>
      <style jsx>{`
        @keyframes wordSlideIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-word-slide {
          animation: wordSlideIn cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity;
        }
      `}</style>
    </span>
  );
}

export default TextWordCarousel;

