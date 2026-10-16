import { hero, profile, stats } from "@/content/site";
import { ArrowIcon } from "./Icons";
import TransformationGraph from "./TransformationGraph";

export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-4 pt-8 pb-14 sm:px-6 sm:pt-12 lg:px-8 lg:pb-20">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_560px] lg:gap-10">
        <div>
          {profile.available ? (
            <p className="reveal inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[13px] font-medium text-body">
              <span aria-hidden className="flow-dot size-[7px] rounded-full bg-live" />
              {profile.availabilityLabel}
            </p>
          ) : null}

          <h1
            className="reveal mt-6 text-[clamp(2.4rem,7vw,3.9rem)] leading-[1.05] font-bold tracking-[-0.035em] text-balance"
            style={{ animationDelay: "80ms" }}
          >
            {hero.headline.map((line, i) => (
              <span
                key={line}
                className={`block ${i >= hero.accentFrom ? "text-accent" : ""}`}
              >
                {line}
              </span>
            ))}
          </h1>

          <p
            className="reveal mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-body sm:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            {hero.body}
          </p>

          <div
            className="reveal mt-8 flex flex-wrap gap-3"
            style={{ animationDelay: "240ms" }}
          >
            <a
              href={hero.primaryCta.href}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-[10px] bg-accent px-6 py-3.5 text-[15px] font-semibold text-white shadow-raised transition-colors hover:bg-accent-hover sm:w-auto"
            >
              {hero.primaryCta.label}
              <ArrowIcon width={17} height={17} />
            </a>
            <a
              href={hero.secondaryCta.href}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-[10px] border border-line bg-surface px-6 py-3.5 text-[15px] font-semibold text-ink transition-colors hover:bg-surface-2 sm:w-auto"
            >
              {hero.secondaryCta.label}
            </a>
          </div>

          <dl
            className="reveal mt-9 flex flex-wrap gap-x-8 gap-y-3"
            style={{ animationDelay: "320ms" }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-row-reverse items-baseline gap-1.5">
                <dt className="text-sm text-body">{stat.label}</dt>
                <dd className="text-[17px] font-bold text-ink">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:justify-self-end">
          <TransformationGraph />
        </div>
      </div>
    </section>
  );
}
