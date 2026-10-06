"use client";

import { Children, useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SliderProps {
  children: ReactNode;
  label: string;
  /** Items visible per view at <640 / ≥640 / ≥900 / ≥1200px. Fractions show a peek of the next card. */
  perView: [number, number, number, number];
  /** Vertical position of the arrows, e.g. "40%" to centre them on an image rather than the whole card. */
  arrowTop?: string;
}

/**
 * Lightweight horizontal slider: native scroll-snap (touch swipe for free),
 * arrow buttons, and mouse drag on desktop. No animation library.
 */
export default function Slider({ children, label, perView, arrowTop }: SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, moved: false, startX: 0, startScroll: 0 });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [isStatic, setIsStatic] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const overflow = el.scrollWidth - el.clientWidth;
    setIsStatic(overflow <= 4);
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < overflow - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [update]);

  // Item count can change when admin-driven data refreshes
  const count = Children.count(children);
  useEffect(update, [count, update]);

  const page = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: reduce ? "auto" : "smooth" });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || e.button !== 0 || isStatic) return;
    const el = trackRef.current;
    if (!el) return;
    drag.current = { active: true, moved: false, startX: e.clientX, startScroll: el.scrollLeft };

    const onMove = (ev: PointerEvent) => {
      const dx = ev.clientX - drag.current.startX;
      if (!drag.current.moved && Math.abs(dx) > 6) {
        drag.current.moved = true;
        el.classList.add("is-dragging");
      }
      if (drag.current.moved) el.scrollLeft = drag.current.startScroll - dx;
    };
    const onUp = () => {
      drag.current.active = false;
      el.classList.remove("is-dragging");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  // Swallow the click that ends a drag so cards don't open accidentally
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  const style = {
    "--pv-base": perView[0],
    "--pv-sm": perView[1],
    "--pv-md": perView[2],
    "--pv-lg": perView[3],
  } as CSSProperties;

  return (
    <div
      className="slider"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      style={arrowTop ? ({ "--arrow-top": arrowTop } as CSSProperties) : undefined}
    >
      <button
        type="button"
        className="slider-arrow prev"
        onClick={() => page(-1)}
        disabled={!canPrev}
        aria-label="Previous"
      >
        <ChevronLeft size={20} aria-hidden="true" />
      </button>

      <div
        ref={trackRef}
        className={`slider-track ${isStatic ? "is-static" : ""}`}
        style={style}
        onPointerDown={onPointerDown}
        onClickCapture={onClickCapture}
        onDragStart={(e) => e.preventDefault()}
      >
        {Children.map(children, (child) => (
          <div className="slider-slide">{child}</div>
        ))}
      </div>

      <button
        type="button"
        className="slider-arrow next"
        onClick={() => page(1)}
        disabled={!canNext}
        aria-label="Next"
      >
        <ChevronRight size={20} aria-hidden="true" />
      </button>
    </div>
  );
}
