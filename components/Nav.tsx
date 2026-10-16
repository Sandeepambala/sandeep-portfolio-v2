"use client";

import { useEffect, useState } from "react";
import { nav, profile } from "@/content/site";

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-canvas/85 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="flex items-center gap-2.5 rounded-xl border border-line bg-surface py-2 pr-4 pl-2.5 shadow-card"
        >
          <span className="flex size-7 items-center justify-center rounded-lg bg-accent text-[11px] font-bold text-white">
            {profile.initials}
          </span>
          <span className="text-[15px] font-semibold">{profile.name}</span>
        </a>

        <nav className="hidden items-center gap-1 rounded-xl border border-line bg-surface p-1.5 shadow-card md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-body transition-colors hover:bg-surface-2 hover:text-ink"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            Book a call
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="flex size-11 items-center justify-center rounded-xl border border-line bg-surface shadow-card md:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="mx-4 mb-3 rounded-xl border border-line bg-surface p-2 shadow-card md:hidden"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-4 py-3 text-[15px] font-medium text-body hover:bg-surface-2 hover:text-ink"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-1 block rounded-lg bg-accent px-4 py-3 text-center text-[15px] font-semibold text-white"
          >
            Book a call
          </a>
        </nav>
      ) : null}
    </header>
  );
}
