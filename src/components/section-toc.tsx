"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

interface TocItem {
  id: string;
  title: string;
}

interface TocProps {
  items: readonly TocItem[];
}

/** A section becomes "current" once its top passes this point on the screen. */
const ACTIVATION_RATIO = 0.32;
const MIN_ACTIVATION_PX = 160;

/** Tracks which section is being read: the last one whose top has passed the activation line. */
function useActiveSection(ids: readonly string[]): [number, (index: number) => void] {
  const [activeIndex, setActiveIndex] = useState(0);
  const lockUntil = useRef(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      if (Date.now() < lockUntil.current) return;
      const line = Math.max(MIN_ACTIVATION_PX, window.innerHeight * ACTIVATION_RATIO);
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;

      let next = 0;
      ids.forEach((id, index) => {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= line) next = index;
      });
      if (atBottom) next = ids.length - 1;
      setActiveIndex(next);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [ids]);

  // Clicking a link highlights it right away and holds it while the page scrolls there.
  const select = useCallback((index: number) => {
    lockUntil.current = Date.now() + 900;
    setActiveIndex(index);
  }, []);

  return [activeIndex, select];
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Desktop: sticky side list with a sliding indicator and progress. */
export function SectionTocSidebar({ items }: TocProps) {
  const ids = useMemo(() => items.map((item) => item.id), [items]);
  const [activeIndex, select] = useActiveSection(ids);
  const listRef = useRef<HTMLOListElement>(null);
  const [indicator, setIndicator] = useState({ top: 0, height: 0 });

  // Slide the indicator bar to the active link.
  useLayoutEffect(() => {
    const link = listRef.current?.querySelectorAll<HTMLElement>("a")[activeIndex];
    if (link) setIndicator({ top: link.offsetTop, height: link.offsetHeight });
  }, [activeIndex]);

  const progress = (activeIndex + 1) / items.length;

  return (
    <div className="sticky top-28">
      <p className="text-xs font-semibold tracking-[0.2em] text-stone uppercase">On this page</p>
      <p className="mt-2 text-sm font-semibold text-ink">
        Section {activeIndex + 1} of {items.length}
      </p>
      <div className="mt-2 h-1 overflow-clip rounded-full bg-ink/10">
        <div
          className="h-full origin-left rounded-full bg-gradient-to-r from-brand-bright to-lapis transition-transform duration-500 ease-[var(--ease-out-expo)]"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <ol ref={listRef} className="relative mt-5 space-y-1 border-l border-ink/10">
        <span
          aria-hidden="true"
          className="absolute -left-px w-[3px] rounded-full bg-brand transition-all duration-500 ease-[var(--ease-out-expo)]"
          style={{ top: indicator.top, height: indicator.height }}
        />
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <li key={item.id} className="pl-3">
              <a
                href={`#${item.id}`}
                onClick={() => select(index)}
                aria-current={isActive ? "location" : undefined}
                className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-all duration-300 ${
                  isActive
                    ? "bg-brand/10 font-semibold text-brand-deep"
                    : "text-stone hover:bg-ink/[0.04] hover:text-ink"
                }`}
              >
                <span
                  className={`font-display grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold transition-colors duration-300 ${
                    isActive ? "bg-brand text-white" : "bg-ink/[0.06] text-stone"
                  }`}
                >
                  {pad(index + 1)}
                </span>
                {item.title}
              </a>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/** Phones/tablets: sticky chip bar under the header. Place it inside the content column. */
export function SectionTocChips({ items }: TocProps) {
  const ids = useMemo(() => items.map((item) => item.id), [items]);
  const [activeIndex, select] = useActiveSection(ids);
  const chipsRef = useRef<HTMLOListElement>(null);

  // Keep the active chip in view without moving the page vertically.
  useEffect(() => {
    const bar = chipsRef.current;
    const chip = bar?.querySelectorAll<HTMLElement>("a")[activeIndex];
    if (!bar || !chip) return;
    bar.scrollTo({ left: chip.offsetLeft - (bar.clientWidth - chip.offsetWidth) / 2, behavior: "smooth" });
  }, [activeIndex]);

  const progress = (activeIndex + 1) / items.length;

  return (
    <nav
      aria-label="Sections"
      className="sticky top-[4.5rem] z-30 -mx-4 mb-8 border-b border-ink/10 bg-white/90 backdrop-blur-md sm:-mx-6 lg:hidden"
    >
      <ol ref={chipsRef} className="flex gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] sm:px-6">
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <li key={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                onClick={() => select(index)}
                aria-current={isActive ? "location" : undefined}
                className={`flex min-h-9 items-center gap-2 rounded-full px-3.5 text-sm whitespace-nowrap transition-colors duration-300 ${
                  isActive ? "bg-brand text-white" : "bg-ink/[0.05] text-stone"
                }`}
              >
                <span className="font-display text-xs font-bold">{pad(index + 1)}</span>
                {item.title}
              </a>
            </li>
          );
        })}
      </ol>
      <div className="h-0.5 bg-ink/5">
        <div
          className="h-full origin-left bg-brand transition-transform duration-500 ease-[var(--ease-out-expo)]"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </nav>
  );
}
