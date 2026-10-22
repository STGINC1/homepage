"use client";

import { useEffect, useRef, useState } from "react";
import { isZeusOrigin, parseZeusFrameMessage } from "@/lib/embed";

/** Gap kept between the fixed site header and the form when Zeus asks us to scroll. */
const SCROLL_GAP_PX = 16;

function headerHeight(): number {
  return document.querySelector(".site-header")?.getBoundingClientRect().height ?? 0;
}

type ApplicationFrameProps = {
  readonly src: string;
  readonly title: string;
};

/**
 * Iframe for the Zeus application. Zeus posts its content height (so the frame
 * grows with the form and never scrolls inside itself) and scroll requests
 * (for example, jump to the first error or the top of the next step).
 */
export function ApplicationFrame({ src, title }: ApplicationFrameProps) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      const frame = frameRef.current;
      if (!frame || event.source !== frame.contentWindow || !isZeusOrigin(event.origin)) return;

      const message = parseZeusFrameMessage(event.data);
      if (message?.type === "resize") {
        setHeight(message.height);
      } else if (message?.type === "scroll") {
        const frameTop = frame.getBoundingClientRect().top + window.scrollY;
        const top = frameTop + message.top - headerHeight() - SCROLL_GAP_PX;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <iframe
      ref={frameRef}
      src={src}
      title={title}
      // Until Zeus reports its height, fill most of the screen.
      style={height === null ? undefined : { height }}
      className="relative block h-[max(42rem,calc(100svh-7rem))] w-full border-0 bg-transparent"
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
}
