"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { observe } from "@/lib/reveal-manager";

type RevealProps = {
  children: ReactNode;
  /** Delay in milliseconds before the entrance animation starts. */
  delay?: number;
  className?: string;
  /** Render as something other than a div — e.g. "li" inside a list. */
  as?: ElementType;
  /** Direction the content travels in from. Default "up". */
  from?: "up" | "left" | "right";
};

const FROM_CLASS = {
  up: "reveal",
  left: "reveal-left",
  right: "reveal-right",
} as const;

/**
 * Fades content in as it scrolls into view, through a single shared scroll
 * listener (see lib/reveal-manager). Renders visible on the server and reveals
 * immediately if JS never hydrates, so content is never hidden from a crawler
 * or from a browser that failed to run the script.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
  from = "up",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  // `null` = not yet measured on the client, so render visible.
  const [shown, setShown] = useState<boolean | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const { visible, off } = observe(node, () => setShown(true));
    setShown(visible);
    return off;
  }, []);

  return (
    <Tag
      ref={ref}
      className={[shown === false ? "opacity-0" : FROM_CLASS[from], className]
        .filter(Boolean)
        .join(" ")}
      style={shown && delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
