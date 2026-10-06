"use client";

import { useEffect } from "react";

/**
 * Fades `.reveal` elements in as they enter the viewport.
 * Content stays visible without JS; elements already on screen at load are never hidden.
 */
export default function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );

    const track = (el: Element) => {
      if (el.classList.contains("is-in")) return;
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add("is-in");
      } else {
        io.observe(el);
      }
    };

    document.querySelectorAll(".reveal").forEach(track);
    document.documentElement.classList.add("js-reveal");

    // Pick up sections rendered after client-side navigation
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) =>
        m.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.classList.contains("reveal")) track(node);
          node.querySelectorAll(".reveal").forEach(track);
        })
      );
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
