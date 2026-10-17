import { hero, profile, serviceBar, stats } from "@/content/site";
import HeroStage from "./HeroStage";
import { ArrowIcon, capabilityIcons } from "./Icons";
import PauseOffscreen from "./PauseOffscreen";

const BAR_TINT = [
  "bg-[#ece8ff] text-[#5b3ed6]",
  "bg-[#ffe6ef] text-[#c62f6a]",
  "bg-[#e1f6ea] text-[#12794f]",
  "bg-[#fff0dc] text-[#9a5a08]",
];

export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-4 pt-6 pb-12 sm:px-6 lg:px-8 lg:pb-16">
      <div className="flex flex-col items-center text-center">
        <p className="reveal inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-[13px] font-medium text-body shadow-card">
          <span aria-hidden className="flow-dot size-[7px] rounded-full bg-live" />
          {hero.badge}
        </p>

        <h1
          className="reveal mt-6 text-[clamp(2.5rem,7vw,4.25rem)] leading-[1.02] font-bold tracking-[-0.04em] text-balance"
          style={{ animationDelay: "80ms" }}
        >
          <span className="block">{hero.headline.lead}</span>
          <span className="headline-gradient block">{hero.headline.accent}</span>
        </h1>

        <p
          className="reveal mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-body text-balance sm:text-lg"
          style={{ animationDelay: "160ms" }}
        >
          {hero.body}
        </p>

        <div className="reveal mt-7 flex flex-wrap justify-center gap-3" style={{ animationDelay: "240ms" }}>
          <a
            href={hero.primaryCta.href}
            className="lift inline-flex min-h-11 items-center gap-2 rounded-[10px] bg-accent px-6 py-3.5 text-[15px] font-semibold text-white shadow-raised hover:bg-accent-hover"
          >
            {hero.primaryCta.label}
            <ArrowIcon width={17} height={17} />
          </a>
          <a
            href={hero.secondaryCta.href}
            className="lift inline-flex min-h-11 items-center rounded-[10px] border border-line bg-surface px-6 py-3.5 text-[15px] font-semibold text-ink hover:bg-surface-2"
          >
            {hero.secondaryCta.label}
          </a>
        </div>
      </div>

      {/* The stage overlaps the copy slightly on wide screens, the way the
          chaos crowds in from the edges in the reference. */}
      <div className="mt-6 lg:-mt-24">
        <PauseOffscreen>
          <HeroStage />
        </PauseOffscreen>
      </div>

      <div className="reveal mt-10 rounded-2xl border border-line bg-surface p-2 shadow-card">
        <ul className="grid divide-line sm:grid-cols-2 sm:divide-x lg:grid-cols-4">
          {serviceBar.map((item, i) => {
            const Icon = capabilityIcons[item.icon];
            return (
              <li key={item.title} className="flex items-center gap-3.5 px-5 py-4">
                <span
                  className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${BAR_TINT[i]}`}
                >
                  <Icon width={21} height={21} />
                </span>
                <span>
                  <span className="block text-[15px] font-bold text-ink">{item.title}</span>
                  <span className="block text-[14px] text-body">{item.sub}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <dl className="reveal mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-row-reverse items-baseline gap-1.5">
            <dt className="text-sm text-body">{stat.label}</dt>
            <dd className="text-[17px] font-bold text-ink">{stat.value}</dd>
          </div>
        ))}
      </dl>

      <p className="sr-only">
        {profile.name} — {profile.role}, {profile.location}.
      </p>
    </section>
  );
}
