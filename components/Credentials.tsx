import { achievements, certifications, education } from "@/content/site";
import Reveal from "./Reveal";

export default function Credentials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
      <Reveal>
        <h2 className="label-mono">Recognition &amp; credentials</h2>
      </Reveal>

      <div className="mt-5 grid gap-8 lg:grid-cols-3">
        <Reveal>
          <div>
            <h3 className="text-base font-semibold">Achievements</h3>
            <ul className="mt-3 space-y-3">
              {achievements.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-line bg-surface p-4 text-sm leading-relaxed text-body shadow-card"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div>
            <h3 className="text-base font-semibold">Certifications</h3>
            <ul className="mt-3 space-y-3">
              {certifications.map((cert) => (
                <li
                  key={cert.title}
                  className="rounded-xl border border-line bg-surface p-4 shadow-card"
                >
                  <p className="text-sm font-semibold">{cert.title}</p>
                  <p className="mt-1 text-sm text-muted">{cert.issuer}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div>
            <h3 className="text-base font-semibold">Education</h3>
            <ul className="mt-3 space-y-3">
              {education.map((item) => (
                <li
                  key={item.course}
                  className="rounded-xl border border-line bg-surface p-4 shadow-card"
                >
                  <p className="text-sm font-semibold">{item.course}</p>
                  <p className="mt-1 text-sm text-muted">{item.institution}</p>
                  <p className="mt-1 font-mono text-xs text-muted">{item.year}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
