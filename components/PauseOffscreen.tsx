"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Pauses every CSS animation inside once the content scrolls out of view.
 *
 * The hero runs 21 particles and 31 drifting chips forever; left alone they
 * keep the compositor busy while the visitor reads a section far below. If
 * IntersectionObserver is unavailable the animations simply keep running —
 * the failure mode is the old behaviour, never hidden content.
 */
export default function PauseOffscreen({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => node.classList.toggle("motion-paused", !entry.isIntersecting),
      { rootMargin: "120px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref}>{children}</div>;
}
