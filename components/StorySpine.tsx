"use client";

import { useEffect, useState } from "react";
import { onScroll } from "@/lib/reveal-manager";

/**
 * The page read as one continuous flow, the way the hero reads left to right.
 *
 * A rail down the left edge fills as you scroll and names the chapter you are
 * in, so scrolling narrates rather than just moving. It rides the shared scroll
 * listener, so it costs no extra handler.
 */
const CHAPTERS = [
  { id: "build", label: "What I build" },
  { id: "work", label: "The work" },
  { id: "about", label: "Who I am" },
  { id: "stack", label: "How I build it" },
  { id: "proof", label: "Proof" },
  { id: "contact", label: "Let's talk" },
] as const;

export default function StorySpine() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(-1);

  useEffect(() =>
    onScroll(() => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0);

      // The chapter whose top has most recently crossed the middle of the screen.
      const line = window.innerHeight * 0.45;
      let current = -1;
      CHAPTERS.forEach((c, i) => {
        const el = document.getElementById(c.id);
        if (el && el.getBoundingClientRect().top <= line) current = i;
      });
      setActive(current);
    }),
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-1/2 left-5 z-30 hidden -translate-y-1/2 xl:block"
    >
      <div className="relative flex h-[46vh] w-px justify-center bg-line">
        <span
          className="absolute top-0 left-0 w-px origin-top bg-accent transition-[height] duration-150 ease-out"
          style={{ height: `${progress * 100}%` }}
        />

        {CHAPTERS.map((c, i) => {
          const isActive = i === active;
          const isPast = i < active;
          return (
            <span
              key={c.id}
              className="absolute flex items-center gap-2.5"
              style={{ top: `${(i / (CHAPTERS.length - 1)) * 100}%`, left: 0 }}
            >
              <span
                className={`-ml-[3.5px] block rounded-full transition-all duration-300 ease-[var(--ease-entrance)] ${
                  isActive
                    ? "size-2 bg-accent ring-4 ring-accent/15"
                    : isPast
                      ? "size-1.5 bg-accent"
                      : "size-1.5 bg-line"
                }`}
              />
              <span
                className={`font-mono text-[10px] tracking-[0.12em] whitespace-nowrap uppercase transition-all duration-300 ease-[var(--ease-entrance)] ${
                  isActive
                    ? "translate-x-0 text-accent opacity-100"
                    : "-translate-x-1 text-muted opacity-0"
                }`}
              >
                {c.label}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
