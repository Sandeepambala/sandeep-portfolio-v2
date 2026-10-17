"use client";

import { useEffect, useState } from "react";
import { nav, profile } from "@/content/site";
import { onScroll } from "@/lib/reveal-manager";

const SECTIONS = nav.map((item) => item.href.slice(1));

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  /* Rides the shared scroll pass — no listener of its own. */
  useEffect(() =>
    onScroll(() => {
      setScrolled(window.scrollY > 12);

      // The section whose top has most recently passed a third of the viewport.
      const line = window.innerHeight / 3;
      let current: string | null = null;
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    }),
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,backdrop-filter,box-shadow] duration-300 ease-[var(--ease-hover)] ${
        scrolled ? "bg-canvas/80 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md" : "bg-canvas"
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 transition-[padding] duration-300 ease-[var(--ease-hover)] sm:px-6 lg:px-8 ${
          scrolled ? "py-2" : "py-3"
        }`}
      >
        <a
          href="#top"
          className="lift flex items-center gap-2.5 rounded-xl border border-line bg-surface py-2 pr-4 pl-2.5 shadow-card hover:border-accent/40"
        >
          <span className="flex size-7 items-center justify-center rounded-lg bg-accent text-[11px] font-bold text-white">
            {profile.initials}
          </span>
          <span className="text-[15px] font-semibold">{profile.name}</span>
        </a>

        <nav className="hidden items-center gap-1 rounded-xl border border-line bg-surface p-1.5 shadow-card md:flex">
          {nav.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ease-[var(--ease-hover)] ${
                  isActive ? "text-ink" : "text-body hover:bg-surface-2 hover:text-ink"
                }`}
              >
                {item.label}
                <span
                  aria-hidden
                  className={`absolute inset-x-3 -bottom-0.5 h-0.5 origin-center rounded-full bg-accent transition-transform duration-300 ease-[var(--ease-entrance)] ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            );
          })}
          <a
            href="#contact"
            className="lift rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover"
          >
            Book a call
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="flex size-11 items-center justify-center rounded-xl border border-line bg-surface shadow-card transition-colors duration-200 hover:border-accent/40 md:hidden"
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

      {/* Height-animated so the panel slides rather than snaps. */}
      <div
        id="mobile-nav"
        className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-[var(--ease-entrance)] md:hidden ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <nav className="min-h-0">
          <div className="mx-4 mb-3 rounded-xl border border-line bg-surface p-2 shadow-card">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                tabIndex={open ? undefined : -1}
                className="block rounded-lg px-4 py-3 text-[15px] font-medium text-body transition-colors duration-200 hover:bg-surface-2 hover:text-ink"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              tabIndex={open ? undefined : -1}
              className="mt-1 block rounded-lg bg-accent px-4 py-3 text-center text-[15px] font-semibold text-white"
            >
              Book a call
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
