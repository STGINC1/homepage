"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const REVEAL_SELECTOR = ".reveal, .reveal-left, .reveal-right, .reveal-zoom, .count-num";
const HEADER_SOLID_AFTER_PX = 40;

const clamp01 = (value: number): number => Math.min(1, Math.max(0, value));

/** 0 when the element's top enters the bottom of the screen, 1 when its bottom leaves the top. */
function coverProgress(element: Element, viewport: number): number {
  const rect = element.getBoundingClientRect();
  return clamp01((viewport - rect.top) / (viewport + rect.height));
}

/**
 * Scroll effects for browsers without CSS scroll-driven animations (e.g. Firefox).
 * Supported browsers run everything in CSS and this component does nothing.
 * It adds .sda-fallback to <html> and feeds scroll progress to motion.css as variables.
 */
export function ScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const hasScrollTimeline = CSS.supports("animation-timeline: scroll()");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (hasScrollTimeline || prefersReducedMotion || !("IntersectionObserver" in window)) return;

    const root = document.documentElement;
    root.classList.add("sda-fallback");

    // One-shot reveals and counters.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    document.querySelectorAll(REVEAL_SELECTOR).forEach((element) => {
      if (!element.classList.contains("is-visible")) observer.observe(element);
    });

    // Scroll-linked effects, updated at most once per frame.
    const stories = Array.from(document.querySelectorAll<HTMLElement>(".story"));
    const routes = Array.from(document.querySelectorAll<HTMLElement>(".route-section"));
    const bands = Array.from(document.querySelectorAll<HTMLElement>(".scroll-band"));
    let frame = 0;

    const update = () => {
      frame = 0;
      const viewport = window.innerHeight;
      const scrolled = window.scrollY;
      const scrollable = Math.max(1, root.scrollHeight - viewport);

      root.style.setProperty("--sp", clamp01(scrolled / scrollable).toFixed(4));
      root.style.setProperty("--hp", clamp01(scrolled / viewport).toFixed(4));
      root.style.setProperty("--hd", clamp01(scrolled / (viewport * 0.85)).toFixed(4));
      root.classList.toggle("is-scrolled", scrolled > HEADER_SOLID_AFTER_PX);

      for (const story of stories)
        story.style.setProperty("--story-p", coverProgress(story, viewport).toFixed(4));
      for (const band of bands) band.style.setProperty("--band-p", coverProgress(band, viewport).toFixed(4));
      for (const route of routes) {
        const rect = route.getBoundingClientRect();
        const progress = clamp01((viewport * 0.8 - rect.top) / Math.max(1, rect.height * 0.85));
        route.style.setProperty("--route-p", progress.toFixed(4));
      }
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
