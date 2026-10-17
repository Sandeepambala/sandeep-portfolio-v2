import Image from "next/image";
import { projects, type Project } from "@/content/site";
import { ExternalLinkIcon } from "./Icons";
import Reveal from "./Reveal";

function Thumb({ project }: { project: Project }) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={`${project.title} interface`}
        width={640}
        height={360}
        className="h-26 w-full border-b border-line object-cover"
      />
    );
  }

  return (
    <div className="flex h-26 items-center justify-center border-b border-line bg-surface-2">
      <span className="font-mono text-[11px] text-muted">{project.subtitle}</span>
    </div>
  );
}

/** Shown wherever a project has something a visitor can actually open. */
function ProjectLink({ project, className }: { project: Project; className?: string }) {
  if (!project.link) return null;

  return (
    <a
      href={project.link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors duration-200 hover:text-accent-hover ${className ?? ""}`}
    >
      {project.link.label}
      <span className="sr-only"> — {project.title} (opens in a new tab)</span>
      <ExternalLinkIcon width={14} height={14} />
    </a>
  );
}

function FeaturedCard({ project, delay }: { project: Project; delay: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className="lift flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card hover:border-accent/40 hover:shadow-raised">
        <Thumb project={project} />
        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-lg font-bold tracking-[-0.015em]">{project.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-body">{project.description}</p>
          <p className="mt-3 border-l-2 border-accent pl-3 text-sm font-medium text-ink">
            {project.impact}
          </p>
          <ul className="mt-4 flex flex-wrap gap-1.5 pt-1">
            {project.tech.map((t) => (
              <li
                key={t}
                className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-semibold text-accent"
              >
                {t}
              </li>
            ))}
          </ul>
          {/* mt-auto pins the link to the bottom so cards of different heights line up. */}
          <ProjectLink project={project} className="mt-auto pt-4" />
        </div>
      </article>
    </Reveal>
  );
}

function ListRow({
  project,
  index,
  numberFrom,
}: {
  project: Project;
  index: number;
  numberFrom: number;
}) {
  return (
    <Reveal delay={index * 50}>
      <article className="grid gap-x-6 gap-y-2 border-t border-line py-5 md:grid-cols-12 md:items-baseline">
        <span className="font-mono text-xs text-muted md:col-span-1">
          {String(numberFrom + index).padStart(2, "0")}
        </span>
        <div className="md:col-span-4">
          <h3 className="text-base font-semibold">{project.title}</h3>
          <p className="mt-1 font-mono text-[11px] tracking-[0.06em] text-accent uppercase">
            {project.subtitle}
          </p>
        </div>
        <div className="md:col-span-5">
          <p className="text-sm leading-relaxed text-body">{project.description}</p>
          <ProjectLink project={project} className="mt-2" />
        </div>
        <p className="text-sm text-muted md:col-span-2 md:text-right">
          {project.tech.slice(0, 3).join(" · ")}
        </p>
      </article>
    </Reveal>
  );
}

export default function Work() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="label-mono">Selected work</h2>
            <p className="mt-1.5 text-[1.75rem] font-bold tracking-[-0.03em] sm:text-3xl">
              Running in production today
            </p>
          </div>
          <p className="text-sm text-muted">{projects.length} systems shipped</p>
        </div>
      </Reveal>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {featured.map((project, i) => (
          <FeaturedCard key={project.slug} project={project} delay={i * 80} />
        ))}
      </div>

      <div className="mt-12">
        <Reveal>
          <h3 className="label-mono mb-1">More systems</h3>
        </Reveal>
        {rest.map((project, i) => (
          <ListRow
            key={project.slug}
            project={project}
            index={i}
            numberFrom={featured.length + 1}
          />
        ))}
        <div className="border-t border-line" />
      </div>
    </section>
  );
}
