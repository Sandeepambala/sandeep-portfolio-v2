import Image from "next/image";
import { experience, profile } from "@/content/site";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
      <Reveal>
        <h2 className="label-mono">About</h2>
      </Reveal>

      <div className="mt-5 grid gap-8 lg:grid-cols-[320px_1fr] lg:gap-12">
        <Reveal>
          <div className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
              {profile.photo ? (
                <Image
                  src={profile.photo}
                  alt={`${profile.name}, ${profile.role}`}
                  width={640}
                  height={720}
                  className="aspect-4/5 w-full object-cover"
                  priority={false}
                />
              ) : (
                /* No photo set yet — a monogram reads as a deliberate choice
                   rather than a missing asset. See README to add one. */
                <div className="dot-grid flex aspect-4/5 items-center justify-center bg-surface-2">
                  <span
                    aria-hidden
                    className="flex size-20 items-center justify-center rounded-2xl bg-accent text-2xl font-bold text-white shadow-node"
                  >
                    {profile.initials}
                  </span>
                </div>
              )}
              <div className="p-4">
                <p className="text-base font-semibold">{profile.name}</p>
                <p className="mt-0.5 text-sm text-accent">{profile.role}</p>
                <p className="mt-2 text-xs text-muted">{profile.location}</p>
              </div>
            </div>

            <p className="mt-5 text-[15px] leading-relaxed text-body">
              I solve real business problems with open-source tools — Frappe, ERPNext and n8n.
              From AI-powered cold-calling systems to complete SaaS platforms, I build automation
              that works like a painkiller for operations teams.
            </p>
          </div>
        </Reveal>

        <ol className="relative">
          <div
            aria-hidden
            className="absolute top-2 bottom-2 left-[5px] w-px bg-line"
          />
          {experience.map((job, i) => (
            <Reveal
              key={`${job.company}-${job.period}`}
              delay={i * 80}
              as="li"
              className="relative block pb-9 pl-8 last:pb-0"
            >
                <span
                  aria-hidden
                  className={`absolute top-1.5 left-0 size-[11px] rounded-full border-2 ${
                    job.current ? "border-accent bg-accent" : "border-line bg-canvas"
                  }`}
                />
                <div className="rounded-2xl border border-line bg-surface p-5 shadow-card">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 sm:flex-nowrap">
                    <div className="min-w-0">
                      <p className="flex items-center gap-2 text-sm text-muted">
                        {job.company}
                        {job.current ? (
                          <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-semibold text-accent">
                            Current
                          </span>
                        ) : null}
                      </p>
                      <h3 className="mt-1 text-lg font-semibold tracking-[-0.015em]">{job.role}</h3>
                    </div>
                    <p className="shrink-0 text-sm text-muted sm:text-right">
                      {job.period}
                      <span className="block text-xs">{job.location}</span>
                    </p>
                  </div>

                  <ul className="mt-3.5 space-y-2">
                    {job.points.map((point) => (
                      <li
                        key={point}
                        className="relative pl-4 text-sm leading-relaxed text-body before:absolute before:top-[0.55rem] before:left-0 before:size-1 before:rounded-full before:bg-accent-line"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>

                  {job.achievement ? (
                    <p className="mt-4 border-l-2 border-accent pl-3 text-sm font-medium text-ink">
                      {job.achievement}
                    </p>
                  ) : null}
                </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
