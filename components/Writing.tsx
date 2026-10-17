import { writing } from "@/content/site";
import { ArrowIcon } from "./Icons";
import Reveal from "./Reveal";

export default function Writing() {
  return (
    <section id="writing" className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 lg:px-8 lg:pb-16">
      <Reveal>
        <h2 className="label-mono">{writing.heading}</h2>
      </Reveal>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {writing.items.map((item, i) => (
          <Reveal key={item.title} delay={i * 70}>
            <article className="lift h-full rounded-2xl border border-line bg-surface p-5 shadow-card hover:border-accent/40 hover:shadow-raised">
              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-body">{item.body}</p>
              {"href" in item && item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-hover"
                >
                  {item.cta}
                  <ArrowIcon width={15} height={15} />
                </a>
              ) : null}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
