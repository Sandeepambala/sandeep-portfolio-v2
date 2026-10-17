/**
 * One scroll listener for every Reveal on the page.
 *
 * The previous version gave each Reveal its own `scroll` and `resize` listener.
 * With ~40 of them that is ~80 listeners all measuring on the same frames —
 * pure waste. This keeps a single rAF-throttled pass over a shared registry
 * and drops the listeners entirely once the last element has been revealed.
 *
 * It stays scroll-position driven rather than IntersectionObserver driven on
 * purpose: an observer can miss elements during a fast scroll or an anchor jump
 * and strand them invisible. A rect check re-runs on every frame that matters,
 * so nothing can get stuck.
 */

type Entry = { el: HTMLElement; show: () => void };

const registry = new Set<Entry>();
let frame = 0;
let listening = false;

/** Reveal a little before the element's top edge arrives, so it never pops in. */
const THRESHOLD = 0.92;

function inView(el: HTMLElement) {
  const { top, bottom } = el.getBoundingClientRect();
  const viewport = window.innerHeight || document.documentElement.clientHeight;
  return top < viewport * THRESHOLD && bottom > 0;
}

function flush() {
  frame = 0;
  for (const entry of registry) {
    if (inView(entry.el)) {
      entry.show();
      registry.delete(entry);
    }
  }
  if (registry.size === 0) stop();
}

function schedule() {
  if (frame) return;
  frame = requestAnimationFrame(flush);
}

function start() {
  if (listening) return;
  listening = true;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
}

function stop() {
  if (!listening) return;
  listening = false;
  window.removeEventListener("scroll", schedule);
  window.removeEventListener("resize", schedule);
  if (frame) {
    cancelAnimationFrame(frame);
    frame = 0;
  }
}

/**
 * Registers an element. Returns true when it is already in view (so the caller
 * can render it visible immediately and skip the hidden state entirely), and an
 * unsubscribe function for cleanup.
 */
export function observe(el: HTMLElement, show: () => void): { visible: boolean; off: () => void } {
  if (inView(el)) return { visible: true, off: () => {} };

  const entry: Entry = { el, show };
  registry.add(entry);
  start();

  return {
    visible: false,
    off: () => {
      registry.delete(entry);
      if (registry.size === 0) stop();
    },
  };
}
