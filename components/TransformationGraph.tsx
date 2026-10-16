import { profile, transformation } from "@/content/site";

const { before, middle, after } = transformation;

/* Desktop geometry. The SVG viewBox below matches this box exactly. */
const W = 560;
const H = 380;
const BEFORE_TOPS = [24, 96, 168, 240];
const AFTER_TOPS = [88, 162, 236];
const COL_W = 152;

/** Each messy chip sits at a slightly different angle. Order matches BEFORE_TOPS. */
const TILT = ["-2.2deg", "1.6deg", "-1.1deg", "2deg"];

/**
 * Left-hand paths wander and cross each other; right-hand paths are clean and
 * parallel. The crossing is the point — don't "tidy" these curves.
 */
const TANGLE = [
  "M152 44 C 202 44, 172 224, 222 202",
  "M152 116 C 212 116, 158 144, 222 166",
  "M152 188 C 182 188, 216 94, 222 158",
  "M152 260 C 206 260, 164 148, 222 192",
];

const RESOLVED = [
  "M340 182 C 376 182, 378 108, 410 108",
  "M340 182 L 410 182",
  "M340 182 C 376 182, 378 256, 410 256",
];

const HUB = { left: 222, top: 130, width: 118, height: 104 };

function ColumnLabel({ text, accent }: { text: string; accent?: boolean }) {
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

export default function TransformationGraph() {
  return (
    <div
      aria-label={`${before.label}: ${before.items
        .map((i) => i.text)
        .join(", ")}. Through me. ${after.label}: ${after.items.map((i) => i.text).join(", ")}.`}
    >
      {/* Desktop: tangle resolving into order */}
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
              stroke="var(--color-dot)"
              strokeWidth="1.6"
              strokeDasharray="4 4"
              className="fade-path"
              style={{ animationDelay: `${300 + i * 110}ms` }}
            />
          ))}
          {RESOLVED.map((d, i) => (
            <path
              key={d}
              d={d}
              stroke="var(--color-accent-line)"
              strokeWidth="2"
              className="draw-path"
              style={{ animationDelay: `${1050 + i * 110}ms` }}
            />
          ))}
        </svg>

        <div className="absolute" style={{ left: 0, top: 0 }}>
          <ColumnLabel text={before.label} />
        </div>
        <div
          className="absolute text-center"
          style={{ left: HUB.left, top: 106, width: HUB.width }}
        >
          <ColumnLabel text={middle.label} accent />
        </div>
        <div className="absolute" style={{ left: 410, top: 60 }}>
          <ColumnLabel text={after.label} accent />
        </div>

        {before.items.map((item, i) => (
          <div
            key={item.id}
            className="reveal absolute rounded-lg border border-dashed border-line bg-surface/70 px-3 py-2 text-[13px] leading-snug text-muted"
            style={{
              left: 0,
              top: BEFORE_TOPS[i],
              width: COL_W,
              rotate: TILT[i],
              animationDelay: `${i * 90}ms`,
            }}
          >
            {item.text}
          </div>
        ))}

        <div
          className="reveal absolute flex flex-col items-center justify-center rounded-2xl bg-accent text-center shadow-node"
          style={{ ...HUB, animationDelay: "850ms" }}
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-white/15 text-sm font-bold text-white">
            {profile.initials}
          </span>
          <span className="mt-2 text-sm font-bold text-white">{middle.name}</span>
          <span className="mt-0.5 px-2 text-[10px] leading-tight text-accent-soft">
            {middle.sub}
          </span>
        </div>

        {after.items.map((item, i) => (
          <div
            key={item.id}
            className="reveal absolute flex items-start gap-2 rounded-lg border border-line bg-surface px-3 py-2.5 text-[13px] leading-snug font-medium text-ink shadow-card"
            style={{
              left: 410,
              top: AFTER_TOPS[i],
              width: COL_W,
              animationDelay: `${1200 + i * 110}ms`,
            }}
          >
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
            {item.text}
          </div>
        ))}
      </div>

      {/* Mobile / tablet: the same three beats, stacked */}
      <div className="lg:hidden">
        <ColumnLabel text={before.label} />
        <ul className="mt-2 space-y-1.5">
          {before.items.map((item, i) => (
            <li
              key={item.id}
              className="reveal rounded-lg border border-dashed border-line bg-surface/70 px-3 py-2 text-[13px] text-muted"
              style={{ rotate: TILT[i], animationDelay: `${i * 70}ms` }}
            >
              {item.text}
            </li>
          ))}
        </ul>

        <div aria-hidden className="mx-auto my-3 h-7 w-px bg-dot" />

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

        <div aria-hidden className="mx-auto my-3 h-7 w-px bg-accent-line" />

        <ColumnLabel text={after.label} accent />
        <ul className="mt-2 space-y-1.5">
          {after.items.map((item, i) => (
            <li
              key={item.id}
              className="reveal flex items-start gap-2 rounded-lg border border-line bg-surface px-3 py-2.5 text-[13px] font-medium text-ink shadow-card"
              style={{ animationDelay: `${i * 70}ms` }}
            >
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
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
