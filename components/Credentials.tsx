import { achievements, certifications, education } from "@/content/site";
import Reveal from "./Reveal";

function AwardMark() {
  return (
    <svg
      aria-hidden
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="9" r="5" />
      <path d="m9 13.5-1.5 7L12 18l4.5 2.5L15 13.5" />
    </svg>
  );
}

/** A labelled list of rows separated by rules — lighter than a grid of cards. */
function RowList({
  title,
  rows,
}: {
  title: string;
  rows: { primary: string; secondary: string; meta?: string }[];
}) {
  return (
    <div>
      <h3 className="text-base font-semibold">{title}</h3>
      <dl className="mt-3">
        {rows.map((row) => (
          <div
            key={row.primary}
            className="flex items-baseline justify-between gap-4 border-t border-line py-3.5 last:border-b"
          >
            <div className="min-w-0">
              <dt className="text-sm font-semibold">{row.primary}</dt>
              <dd className="mt-0.5 text-sm text-muted">{row.secondary}</dd>
            </div>
            {row.meta ? (
              <dd className="shrink-0 font-mono text-xs text-muted">{row.meta}</dd>
            ) : null}
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function Credentials() {
  return (
    <section id="proof" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
      <Reveal>
        <h2 className="label-mono">Recognition &amp; credentials</h2>
      </Reveal>

      {/* Awards lead — they are the strongest proof here, so they get the width. */}
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {achievements.map((item, i) => (
          <Reveal key={item} delay={i * 70} className="h-full">
            <article className="lift flex h-full gap-3 rounded-2xl border border-line bg-surface p-5 shadow-card hover:border-accent/40 hover:shadow-raised">
              <span className="mt-0.5 shrink-0 text-accent">
                <AwardMark />
              </span>
              <p className="text-sm leading-relaxed text-body">{item}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
        <Reveal from="left">
          <RowList
            title="Certifications"
            rows={certifications.map((c) => ({ primary: c.title, secondary: c.issuer }))}
          />
        </Reveal>
        <Reveal from="right" delay={80}>
          <RowList
            title="Education"
            rows={education.map((e) => ({
              primary: e.course,
              secondary: e.institution,
              meta: e.year,
            }))}
          />
        </Reveal>
      </div>
    </section>
  );
}
