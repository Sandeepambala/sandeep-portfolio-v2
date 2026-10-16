import { capabilities } from "@/content/site";
import { capabilityIcons } from "./Icons";
import Reveal from "./Reveal";

export default function Capabilities() {
  return (
    <section id="build" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
      <Reveal>
        <h2 className="label-mono">What I build</h2>
      </Reveal>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {capabilities.map((cap, i) => {
          const Icon = capabilityIcons[cap.icon];
          return (
            <Reveal key={cap.title} delay={i * 70}>
              <article className="h-full rounded-2xl border border-line bg-surface p-5 shadow-card transition-shadow hover:shadow-raised">
                <span className="flex size-9 items-center justify-center rounded-[10px] bg-accent-soft text-accent">
                  <Icon width={19} height={19} />
                </span>
                <h3 className="mt-3.5 text-base font-semibold">{cap.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-body">{cap.description}</p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
