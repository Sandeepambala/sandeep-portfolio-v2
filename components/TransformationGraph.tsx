import type { CSSProperties } from "react";
import { profile, transformation } from "@/content/site";

const { before, middle, after } = transformation;

/* ---------------------------------------------------------------------------
 * Desktop composition. The SVG viewBox is exactly W × H, and the particle
 * elements are absolutely positioned in the same box, so SVG path coordinates
 * and CSS offset-path coordinates are the same numbers. Change W or H and the
 * paths below must change with them.
 * ------------------------------------------------------------------------- */
const W = 620;
const H = 470;

/* Hub right edge is x 392, centre y 235 — where every lane below begins. */
const HUB = { left: 288, top: 183, width: 104, height: 104 };

/** Chaos chips: [left, top, rotation deg, final opacity]. Hand-placed, not generated. */
const CHIPS: [number, number, number, number][] = [
  [6, 38, -6, 0.95],
  [134, 28, 5, 0.8],
  [0, 76, 3, 1],
  [126, 68, -4, 0.7],
  [12, 114, 6, 0.9],
  [140, 110, -7, 1],
  [2, 152, -2, 0.75],
  [122, 148, 6, 0.95],
  [22, 190, 4, 1],
  [118, 188, -5, 0.7],
  [4, 228, 6, 0.85],
  [116, 226, -3, 1],
  [16, 266, -6, 0.75],
  [122, 264, 5, 0.9],
  [0, 304, 2, 1],
  [130, 302, -6, 0.8],
  [26, 342, 7, 0.9],
  [118, 376, 4, 0.7],
];

/** Per-chip drift, kept small: [dx, dy, duration s, delay s]. */
const DRIFT: [number, number, number, number][] = [
  [4, -3, 9, 0],
  [-3, 4, 11, 1.2],
  [3, 3, 8.5, 0.4],
  [-4, -2, 12, 2.1],
  [2, 4, 10, 0.9],
  [-3, -4, 9.5, 1.7],
  [4, 2, 11.5, 0.2],
  [-2, 3, 8, 2.4],
  [3, -4, 10.5, 1.1],
  [-4, 3, 9, 0.6],
  [2, 3, 12, 1.9],
  [-3, -3, 8.5, 0.3],
  [4, 3, 10, 2.2],
  [-2, -4, 11, 1.4],
  [3, 4, 9.5, 0.8],
  [-4, 2, 12.5, 2.6],
  [2, -3, 8, 1.5],
  [-3, 3, 10.5, 0.5],
];

/**
 * Six threads that loop, double back and cross before reaching the hub. They
 * are drawn behind the chips, so they read as wiring buried in the mess.
 * The crossing is the entire point — do not straighten these.
 */
const TANGLE = [
  "M36 44 C 140 16, 70 156, 176 138 C 240 124, 232 72, 288 221",
  "M12 232 C 112 210, 56 106, 168 174 C 232 216, 224 252, 288 239",
  "M44 400 C 150 392, 84 288, 188 316 C 252 334, 234 240, 288 229",
  "M74 138 C 8 214, 158 250, 122 316 C 94 364, 244 346, 288 245",
  "M204 50 C 256 106, 158 118, 198 210 C 228 278, 262 270, 288 233",
  "M112 260 C 36 272, 42 192, 118 202 C 192 212, 158 288, 236 262 C 280 248, 278 212, 288 227",
];

/** Three clean lanes out. No loops, no crossing, constant curvature. */
const LANES = [
  "M392 235 C 418 235, 420 165, 444 165",
  "M392 235 L 444 235",
  "M392 235 C 418 235, 420 305, 444 305",
];

const OUT_TOPS = [139, 209, 279];

/** Inbound particles: slow, uneven, one per thread plus a few doubled up. */
const IN_PARTICLES: { path: string; dur: number; delay: number }[] = TANGLE.flatMap((p, i) => [
  { path: p, dur: 7 + i * 0.8, delay: i * 1.1 },
  { path: p, dur: 7 + i * 0.8, delay: i * 1.1 + 3.4 },
]);

/** Outbound particles: evenly spaced on each lane, identical speed. */
const OUT_PARTICLES: { path: string; dur: number; delay: number }[] = LANES.flatMap((p, i) =>
  [0, 1, 2].map((n) => ({ path: p, dur: 2.4, delay: i * 0.25 + n * 0.8 })),
);

function Label({ text, accent }: { text: string; accent?: boolean }) {
  return (
    <span
      className={`font-mono text-[10px] tracking-[0.14em] uppercase ${
        accent ? "text-accent" : "text-muted"
      }`}
    >
      {text}
    </span>
  );
}

function Check() {
  return (
    <svg
      aria-hidden
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-live)"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 shrink-0"
    >
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}

function Particle({
  path,
  dur,
  delay,
  kind,
}: {
  path: string;
  dur: number;
  delay: number;
  kind: "in" | "out";
}) {
  return (
    <span
      aria-hidden
      className={`particle particle-${kind}`}
      style={
        {
          offsetPath: `path("${path}")`,
          "--dur": `${dur}s`,
          "--delay": `${delay}s`,
        } as CSSProperties
      }
    />
  );
}

export default function TransformationGraph() {
  return (
    <div
      aria-label={`${before.label}: ${before.items.join(", ")}, ${before.catchAll}. Through me. ${
        after.label
      }: ${after.items.join(", ")}.`}
    >
      {/* ---------------- Desktop ---------------- */}
      <div className="relative mx-auto hidden lg:block" style={{ width: W, height: H }}>
        <svg
          aria-hidden
          className="absolute inset-0"
          width={W}
          height={H}
          viewBox={`0 0 ${W} ${H}`}
          fill="none"
        >
          {TANGLE.map((d, i) => (
            <path
              key={d}
              d={d}
              stroke="var(--color-thread)"
              strokeWidth="1.6"
              strokeDasharray="3 5"
              className="fade-path"
              style={{ animationDelay: `${250 + i * 90}ms` }}
            />
          ))}
          {LANES.map((d, i) => (
            <path
              key={d}
              d={d}
              stroke="var(--color-accent-line)"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="draw-path"
              style={{ animationDelay: `${1150 + i * 110}ms` }}
            />
          ))}
        </svg>

        {IN_PARTICLES.map((p, i) => (
          <Particle key={`in-${i}`} {...p} kind="in" />
        ))}
        {OUT_PARTICLES.map((p, i) => (
          <Particle key={`out-${i}`} {...p} kind="out" />
        ))}

        <div className="absolute top-0 left-0">
          <Label text={before.label} />
        </div>
        <div
          className="absolute text-center"
          style={{ left: HUB.left, top: 159, width: HUB.width }}
        >
          <Label text={middle.label} accent />
        </div>
        <div className="absolute" style={{ left: 444, top: 112 }}>
          <Label text={after.label} accent />
        </div>

        {before.items.map((text, i) => {
          const [left, top, rot, o] = CHIPS[i];
          const [dx, dy, dur, delay] = DRIFT[i];
          return (
            <span
              key={text}
              className="chaos-chip absolute rounded-md border border-dashed border-line bg-surface/80 px-2 py-1 text-[10px] whitespace-nowrap text-muted"
              style={
                {
                  left,
                  top,
                  rotate: `${rot}deg`,
                  "--o": o,
                  "--dx": `${dx}px`,
                  "--dy": `${dy}px`,
                  "--dur": `${dur}s`,
                  "--delay": `${delay}s`,
                  "--in": `${i * 45}ms`,
                } as CSSProperties
              }
            >
              {text}
            </span>
          );
        })}

        <span
          className="chaos-chip absolute rounded-md border border-ink/25 bg-surface px-2.5 py-1.5 text-[11px] font-semibold whitespace-nowrap text-ink shadow-card"
          style={{ left: 8, top: 418, rotate: "-1deg", "--in": "900ms" } as CSSProperties}
        >
          {before.catchAll}
        </span>

        <div
          className="reveal absolute flex flex-col items-center justify-center rounded-2xl bg-accent text-center shadow-node"
          style={{ ...HUB, animationDelay: "1000ms" }}
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-white/15 text-sm font-bold text-white">
            {profile.initials}
          </span>
          <span className="mt-2 text-sm font-bold text-white">{middle.name}</span>
          <span className="mt-0.5 px-2 text-[10px] leading-tight text-accent-soft">
            {middle.sub}
          </span>
        </div>

        {after.items.map((text, i) => (
          <div
            key={text}
            className="reveal absolute flex items-start gap-2 rounded-xl border border-line bg-surface px-3.5 py-3 text-[13px] leading-snug font-medium text-ink shadow-card"
            style={{ left: 444, top: OUT_TOPS[i], width: 176, animationDelay: `${1300 + i * 120}ms` }}
          >
            <Check />
            {text}
          </div>
        ))}
      </div>

      {/* ---------------- Mobile / tablet ---------------- */}
      <div className="lg:hidden">
        <Label text={before.label} />

        {/* A smaller, denser cluster — same idea, fewer chips so it stays legible. */}
        <div className="relative mt-2 h-60">
          {before.items.slice(0, 11).map((text, i) => {
            const pos = MOBILE_CHIPS[i];
            const [dx, dy, dur, delay] = DRIFT[i];
            return (
              <span
                key={text}
                className="chaos-chip absolute rounded-md border border-dashed border-line bg-surface/80 px-2 py-1 text-[10px] whitespace-nowrap text-muted"
                style={
                  {
                    left: `${pos[0]}%`,
                    top: pos[1],
                    rotate: `${pos[2]}deg`,
                    "--o": 0.9,
                    "--dx": `${dx}px`,
                    "--dy": `${dy}px`,
                    "--dur": `${dur}s`,
                    "--delay": `${delay}s`,
                    "--in": `${i * 45}ms`,
                  } as CSSProperties
                }
              >
                {text}
              </span>
            );
          })}
          <span
            className="chaos-chip absolute rounded-md border border-ink/25 bg-surface px-2.5 py-1.5 text-[11px] font-semibold whitespace-nowrap text-ink shadow-card"
            style={{ left: "2%", top: 216, rotate: "-1deg", "--in": "600ms" } as CSSProperties}
          >
            {before.catchAll}
          </span>
        </div>

        <FlowRail />

        <div className="reveal flex items-center gap-3 rounded-2xl bg-accent p-3.5 shadow-node">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-sm font-bold text-white">
            {profile.initials}
          </span>
          <span>
            <span className="block font-mono text-[10px] tracking-[0.14em] text-accent-soft uppercase">
              {middle.label}
            </span>
            <span className="block text-base font-bold text-white">{middle.name}</span>
            <span className="block text-[11px] text-accent-soft">{middle.sub}</span>
          </span>
        </div>

        <FlowRail accent />

        <Label text={after.label} accent />
        <ul className="mt-2 space-y-1.5">
          {after.items.map((text, i) => (
            <li
              key={text}
              className="reveal flex items-start gap-2 rounded-xl border border-line bg-surface px-3.5 py-3 text-[13px] font-medium text-ink shadow-card"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <Check />
              {text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Mobile chip placement: [left %, top px, rotation deg]. */
const MOBILE_CHIPS: [number, number, number][] = [
  [1, 0, -5],
  [48, 6, 4],
  [6, 40, 3],
  [52, 46, -4],
  [0, 80, 5],
  [46, 86, -6],
  [8, 120, -2],
  [50, 126, 5],
  [2, 160, 4],
  [44, 166, -5],
  [10, 194, 6],
];

/** A short vertical rail with dots falling down it — the mobile stand-in for flow. */
function FlowRail({ accent }: { accent?: boolean }) {
  return (
    <div aria-hidden className="relative mx-auto my-3 h-8 w-px overflow-hidden">
      <div className={`absolute inset-0 ${accent ? "bg-accent-line" : "bg-dot"}`} />
      {[0, 1].map((n) => (
        <span
          key={n}
          className={`drop-dot absolute -left-[2px] size-[5px] rounded-full ${
            accent ? "bg-accent" : "bg-dot"
          }`}
          style={{ "--dur": "2.2s", "--delay": `${n * 1.1}s` } as CSSProperties}
        />
      ))}
    </div>
  );
}
