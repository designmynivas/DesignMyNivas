"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useBookingModal } from "@/context/booking-modal-context";
import styles from "./hero.module.css";

interface Slide {
  title: string;
  /** Trailing phrase of the title, shown in brand blue */
  highlight: string;
  image: string;
  alt: string;
}

const SLIDES: Slide[] = [
  {
    title: "Your home, delivered",
    highlight: "exactly as designed.",
    image: "/Images/main-hero.webp",
    alt: "Living room interior designed and executed by Design My Nivas",
  },
  {
    title: "Thoughtful interiors.",
    highlight: "Precise execution.",
    image: "/Images/services/living-room-interiors.webp",
    alt: "Living room with blue accent wall panelling and cove lighting",
  },
  {
    title: "Designed around",
    highlight: "the way you live.",
    image: "/Images/services/modular-kitchens.webp",
    alt: "Modular kitchen with marble island and blue cabinetry",
  },
  {
    title: "From first sketch to",
    highlight: "final handover.",
    image: "/Images/services/bedroom-interiors.webp",
    alt: "Master bedroom with fluted headboard wall and built-in wardrobes",
  },
];

const INTERVAL_MS = 6500;

export default function Hero() {
  const { openBookingModal } = useBookingModal();
  const [active, setActive] = useState(0);
  // Slides beyond the first load only once they're about to be shown
  const [loadedUpTo, setLoadedUpTo] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const touchX = useRef<number | null>(null);

  const go = useCallback((index: number) => {
    const next = (index + SLIDES.length) % SLIDES.length;
    setActive(next);
    // Load the slide being shown plus the one after it
    setLoadedUpTo((n) => Math.max(n, Math.min(next + 1, SLIDES.length - 1)));
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    // Warm the next slide's image shortly after first paint
    const t = setTimeout(() => setLoadedUpTo((n) => Math.max(n, 1)), 1500);
    return () => {
      mq.removeEventListener("change", sync);
      clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const t = setTimeout(() => {
      if (document.visibilityState === "visible") go(active + 1);
    }, INTERVAL_MS);
    return () => clearTimeout(t);
  }, [active, paused, reduceMotion, go]);

  return (
    <section
      className={styles.hero}
      aria-roledescription="carousel"
      aria-label="Design My Nivas — residential interior design"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(active + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      {SLIDES.map((slide, i) => {
        const isActive = i === active;
        return (
          <div
            key={slide.title}
            className={`${styles.slide} ${isActive ? styles.isActive : ""}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${SLIDES.length}`}
            aria-hidden={!isActive}
          >
            <div className={styles.media}>
              {i <= loadedUpTo && (
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={i === 0}
                  fetchPriority={i === 0 ? "high" : "low"}
                  sizes="100vw"
                  className={styles.image}
                />
              )}
              <div className={styles.scrim} aria-hidden="true" />
            </div>

            <div className={styles.contentWrap}>
              <div className={styles.content}>
                {i === 0 ? (
                  <h1 className={styles.headline}>
                    {slide.title} <span className={styles.hl}>{slide.highlight}</span>
                  </h1>
                ) : (
                  <p className={styles.headline}>
                    {slide.title} <span className={styles.hl}>{slide.highlight}</span>
                  </p>
                )}
                <button
                  type="button"
                  className={styles.cta}
                  onClick={() => openBookingModal({ source: `hero-slide-${i + 1}` })}
                  tabIndex={isActive ? 0 : -1}
                >
                  <span>Book a Consultation</span>
                  <ArrowRight size={17} aria-hidden="true" className={styles.ctaArrow} />
                </button>
              </div>
            </div>
          </div>
        );
      })}

      <div className={styles.controls}>
        <div className={styles.dots}>
          {SLIDES.map((slide, i) => (
            <button
              key={slide.title}
              type="button"
              className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
              onClick={() => go(i)}
              aria-label={`Show slide ${i + 1}`}
              aria-current={i === active}
            >
              <span
                className={styles.dotFill}
                style={{ animationDuration: `${INTERVAL_MS}ms`, animationPlayState: paused ? "paused" : "running" }}
              />
            </button>
          ))}
        </div>
        <div className={styles.arrows}>
          <button type="button" className={styles.arrow} onClick={() => go(active - 1)} aria-label="Previous slide">
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button type="button" className={styles.arrow} onClick={() => go(active + 1)} aria-label="Next slide">
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
