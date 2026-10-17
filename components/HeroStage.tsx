import type { CSSProperties } from "react";
import { chaosCards, chaosNotes, chaosTiles, orbitIcons, outcomes, profile } from "@/content/site";
import { capabilityIcons, chaosIcons } from "./Icons";

/* ---------------------------------------------------------------------------
 * Desktop stage. The SVG viewBox is exactly W × H and every absolutely
 * positioned element shares that coordinate space, so SVG path coordinates and
 * CSS offset-path coordinates are the same numbers throughout.
 * ------------------------------------------------------------------------- */
const W = 1152;
const H = 660;

const HUB = { cx: 576, cy: 330 };
const HUB_IN = 468; // where feed lines terminate
const HUB_OUT = 684; // where outcome lanes begin
const CARD_X = 812;
const CARD_TOPS = [132, 274, 416];
const CARD_CENTERS = CARD_TOPS.map((t) => t + 56);

/** [left, top, rotation] for each labelled chaos card. */
const CARD_POS: [number, number, number][] = [
  [28, 92, -5],
  [168, 128, 3],
  [96, 216, -3],
  [174, 316, 2],
  [18, 376, -4],
  [196, 432, 3],
  [86, 520, -2],
];

/** [left, top, rotation] for the icon-only tiles. */
const TILE_POS: [number, number, number][] = [
  [78, 272, 4],
  [262, 248, -6],
  [148, 456, 5],
  [286, 500, -3],
];

/** [left, top, rotation] for the handwritten notes. */
const NOTE_POS: [number, number, number][] = [
  [20, 42, -8],
  [206, 60, -5],
  [4, 180, -4],
  [250, 378, -7],
  [4, 574, -3],
  [228, 606, -6],
];

/** Where each feed line starts inside the cloud. They all converge on the hub. */
const FEED_STARTS: [number, number][] = [
  [330, 110],
  [296, 164],
  [352, 206],
  [310, 250],
  [364, 292],
  [300, 330],
  [358, 368],
  [312, 406],
  [348, 444],
  [302, 486],
  [354, 524],
  [322, 566],
];

const FEED = FEED_STARTS.map(
  ([x, y]) => `M${x} ${y} C ${x + 72} ${y}, ${HUB_IN - 60} ${HUB.cy}, ${HUB_IN} ${HUB.cy}`,
);

const LANES = [
  `M${HUB_OUT} ${HUB.cy} C ${HUB_OUT + 62} ${HUB.cy}, ${CARD_X - 62} ${CARD_CENTERS[0]}, ${CARD_X} ${CARD_CENTERS[0]}`,
  `M${HUB_OUT} ${HUB.cy} L ${CARD_X} ${CARD_CENTERS[1]}`,
  `M${HUB_OUT} ${HUB.cy} C ${HUB_OUT + 62} ${HUB.cy}, ${CARD_X - 62} ${CARD_CENTERS[2]}, ${CARD_X} ${CARD_CENTERS[2]}`,
];

/** Small curved arrows pointing from each note at the mess it describes. */
const NOTE_ARROWS = [
  "M46 78 C 44 96, 46 104, 52 116",
  "M250 92 C 262 108, 262 118, 258 130",
  "M56 206 C 70 212, 80 216, 92 222",
  "M300 404 C 296 416, 290 422, 282 430",
  "M52 600 C 70 606, 82 608, 96 606",
  "M268 630 C 286 626, 296 620, 306 610",
];

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

function CheckBadge() {
  return (
    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-live">
      <svg
        aria-hidden
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m5 13 4 4L19 7" />
      </svg>
    </span>
  );
}

function Chevron() {
  return (
    <svg
      aria-hidden
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-muted"
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

/** The glowing core: a soft halo, a slowly turning ring of capability icons, the hub. */
function Hub({ size = 300 }: { size?: number }) {
  const radius = size * 0.39;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div aria-hidden className="hub-halo absolute inset-0 rounded-full" />
      <div
        aria-hidden
        className="absolute rounded-full border border-accent-line/60"
        style={{ inset: size * 0.11 }}
      />

      {/* The ring turns; each bubble turns back, so the icons stay upright. */}
      <div aria-hidden className="orbit absolute inset-0">
        {orbitIcons.map((name, i) => {
          const Icon = capabilityIcons[name];
          const angle = (i / orbitIcons.length) * 2 * Math.PI - Math.PI / 2;
          return (
            <span
              key={name}
              className="absolute flex size-11 items-center justify-center rounded-full border border-line bg-surface text-accent shadow-card"
              style={{
                left: size / 2 + Math.cos(angle) * radius - 22,
                top: size / 2 + Math.sin(angle) * radius - 22,
              }}
            >
              <span className="orbit-reverse flex">
                <Icon width={19} height={19} />
              </span>
            </span>
          );
        })}
      </div>

      <div
        className="absolute flex flex-col items-center justify-center rounded-2xl bg-accent shadow-node"
        style={{
          left: size / 2 - 58,
          top: size / 2 - 58,
          width: 116,
          height: 116,
        }}
      >
        <span className="text-[26px] leading-none font-bold tracking-tight text-white">
          {profile.initials}
        </span>
        <span className="mt-2 font-mono text-[9px] tracking-[0.18em] text-accent-soft uppercase">
          Automation
        </span>
      </div>
    </div>
  );
}

function ChaosCard({
  icon,
  label,
  count,
}: {
  icon: string;
  label: string;
  count?: number;
}) {
  const Icon = chaosIcons[icon];
  return (
    <>
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-muted">
        <Icon width={17} height={17} />
      </span>
      <span className="text-[12px] leading-tight font-medium text-body">{label}</span>
      {count ? (
        <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#e5484d] px-1.5 text-[10px] font-bold text-white shadow-card">
          {count}
        </span>
      ) : null}
    </>
  );
}

function OutcomeCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex h-28 items-start gap-3 rounded-2xl border border-line bg-surface p-4 shadow-card">
      <CheckBadge />
      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-bold text-ink">{title}</p>
        <p className="mt-1 text-[13px] leading-snug text-body">{body}</p>
      </div>
      <Chevron />
    </div>
  );
}

export default function HeroStage() {
  const storyLabel = `The mess: ${chaosCards.map((c) => c.label).join(", ")}. It all runs through one automated system. The result: ${outcomes.map((o) => `${o.title} — ${o.body}`).join(" ")}`;

  return (
    <div aria-label={storyLabel}>
      {/* ------------------------------- Desktop ------------------------------ */}
      <div className="relative mx-auto hidden lg:block" style={{ width: W, height: H }}>
        <svg
          aria-hidden
          className="absolute inset-0"
          width={W}
          height={H}
          viewBox={`0 0 ${W} ${H}`}
          fill="none"
        >
          {/* The constellation behind the mess: everything loosely tied to everything. */}
          {FEED.map((d, i) => (
            <path
              key={d}
              d={d}
              stroke="var(--color-accent-line)"
              strokeWidth="1"
              strokeOpacity="0.55"
              className="fade-path"
              style={{ animationDelay: `${420 + i * 55}ms` }}
            />
          ))}

          {NOTE_ARROWS.map((d, i) => (
            <path
              key={d}
              d={d}
              stroke="var(--color-thread)"
              strokeWidth="1.4"
              strokeLinecap="round"
              className="fade-path"
              style={{ animationDelay: `${900 + i * 80}ms` }}
            />
          ))}

          {LANES.map((d, i) => (
            <path
              key={d}
              d={d}
              stroke="var(--color-accent)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeOpacity="0.85"
              className="draw-path"
              style={{ animationDelay: `${1250 + i * 130}ms` }}
            />
          ))}
        </svg>

        {FEED.map((p, i) => (
          <Particle key={`in-${i}`} path={p} dur={6 + (i % 4) * 0.9} delay={i * 0.45} kind="in" />
        ))}
        {LANES.flatMap((p, i) =>
          [0, 1, 2].map((n) => (
            <Particle
              key={`out-${i}-${n}`}
              path={p}
              dur={2.6}
              delay={i * 0.2 + n * 0.87}
              kind="out"
            />
          )),
        )}

        {chaosNotes.map((note, i) => (
          <span
            key={note.id}
            className="chaos-chip absolute font-[family-name:var(--font-caveat)] text-[19px] text-muted"
            style={
              {
                left: NOTE_POS[i][0],
                top: NOTE_POS[i][1],
                rotate: `${NOTE_POS[i][2]}deg`,
                "--o": 1,
                "--in": `${850 + i * 70}ms`,
                "--dur": `${10 + i}s`,
                "--delay": `${i * 0.7}s`,
                "--dx": "2px",
                "--dy": "-2px",
              } as CSSProperties
            }
          >
            {note.text}
          </span>
        ))}

        {chaosTiles.map((tile, i) => {
          const Icon = chaosIcons[tile.icon];
          return (
            <span
              key={tile.id}
              className="chaos-chip absolute flex size-12 items-center justify-center rounded-xl border border-line bg-surface text-muted shadow-card"
              style={
                {
                  left: TILE_POS[i][0],
                  top: TILE_POS[i][1],
                  rotate: `${TILE_POS[i][2]}deg`,
                  "--o": 0.95,
                  "--in": `${260 + i * 70}ms`,
                  "--dur": `${8 + i * 1.4}s`,
                  "--delay": `${i * 0.9}s`,
                  "--dx": `${i % 2 ? -4 : 4}px`,
                  "--dy": `${i % 2 ? 3 : -3}px`,
                } as CSSProperties
              }
            >
              <Icon width={20} height={20} />
            </span>
          );
        })}

        {chaosCards.map((card, i) => (
          <span
            key={card.id}
            className="chaos-chip absolute flex max-w-[190px] items-center gap-2.5 rounded-xl border border-line bg-surface py-2.5 pr-4 pl-2.5 shadow-card"
            style={
              {
                left: CARD_POS[i][0],
                top: CARD_POS[i][1],
                rotate: `${CARD_POS[i][2]}deg`,
                "--o": 1,
                "--in": `${i * 80}ms`,
                "--dur": `${9 + i * 0.8}s`,
                "--delay": `${i * 0.6}s`,
                "--dx": `${i % 2 ? -5 : 5}px`,
                "--dy": `${i % 3 ? 4 : -4}px`,
              } as CSSProperties
            }
          >
            <ChaosCard icon={card.icon} label={card.label} count={card.count} />
          </span>
        ))}

        <div
          className="reveal absolute"
          style={{ left: HUB.cx - 150, top: HUB.cy - 150, animationDelay: "1050ms" }}
        >
          <Hub />
        </div>

        {outcomes.map((o, i) => (
          <div
            key={o.id}
            className="reveal absolute"
            style={{
              left: CARD_X,
              top: CARD_TOPS[i],
              width: W - CARD_X,
              animationDelay: `${1450 + i * 140}ms`,
            }}
          >
            <OutcomeCard title={o.title} body={o.body} />
          </div>
        ))}
      </div>

      {/* --------------------------- Mobile / tablet -------------------------- */}
      <div className="lg:hidden">
        <div className="relative mx-auto h-72 max-w-md">
          {chaosCards.slice(0, 5).map((card, i) => {
            const pos: [number, number, number][] = [
              [0, 0, -5],
              [48, 30, 4],
              [4, 92, 3],
              [44, 150, -4],
              [0, 212, 5],
            ];
            return (
              <span
                key={card.id}
                className="chaos-chip absolute flex items-center gap-2.5 rounded-xl border border-line bg-surface py-2.5 pr-4 pl-2.5 shadow-card"
                style={
                  {
                    left: `${pos[i][0]}%`,
                    top: pos[i][1],
                    rotate: `${pos[i][2]}deg`,
                    "--o": 1,
                    "--in": `${i * 80}ms`,
                    "--dur": `${9 + i}s`,
                    "--delay": `${i * 0.6}s`,
                    "--dx": `${i % 2 ? -4 : 4}px`,
                    "--dy": "3px",
                  } as CSSProperties
                }
              >
                <ChaosCard icon={card.icon} label={card.label} count={card.count} />
              </span>
            );
          })}
          <span
            className="chaos-chip absolute right-2 bottom-1 font-[family-name:var(--font-caveat)] text-[18px] text-muted"
            style={{ rotate: "-6deg", "--o": 1, "--in": "500ms" } as CSSProperties}
          >
            …and the rest of it
          </span>
        </div>

        <div className="mt-2 flex justify-center">
          <Hub size={232} />
        </div>

        <div className="mt-4 space-y-3">
          {outcomes.map((o, i) => (
            <div key={o.id} className="reveal" style={{ animationDelay: `${i * 110}ms` }}>
              <OutcomeCard title={o.title} body={o.body} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
