"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Delay in milliseconds before the entrance animation starts. */
  delay?: number;
  className?: string;
  /** Render as something other than a div — e.g. "li" inside a list. */
  as?: ElementType;
};

/**
 * Fades content in once it scrolls into view.
 *
 * Deliberately driven by scroll position rather than IntersectionObserver:
 * an observer can miss elements during a fast scroll or an anchor jump and
 * leave them permanently invisible. A rect check re-runs on every scroll and
 * resize, so content can never get stuck hidden. It also renders visible on
 * the server and reveals immediately if JS never hydrates.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  // `null` = not yet measured on the client, so render visible.
  const [shown, setShown] = useState<boolean | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;

    const isInView = () => {
      const { top, bottom } = node.getBoundingClientRect();
      const viewport = window.innerHeight || document.documentElement.clientHeight;
      return top < viewport * 0.92 && bottom > 0;
    };

    // Hide anything that starts below the fold, then let scrolling reveal it.
    setShown(isInView());

    const check = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (isInView()) {
          setShown(true);
          window.removeEventListener("scroll", check);
          window.removeEventListener("resize", check);
        }
      });
    };

    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={[shown === false ? "opacity-0" : "reveal", className]
        .filter(Boolean)
        .join(" ")}
      style={shown && delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
