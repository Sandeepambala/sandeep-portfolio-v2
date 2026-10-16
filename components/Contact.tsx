import { contact, profile } from "@/content/site";
import { ArrowIcon } from "./Icons";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 lg:px-8 lg:pb-16">
      <Reveal>
        <div className="flex flex-col items-start gap-6 rounded-3xl bg-ink px-6 py-9 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div>
            <h2 className="text-[1.75rem] leading-tight font-bold tracking-[-0.03em] text-white text-balance sm:text-3xl">
              {contact.heading}
            </h2>
            <p className="mt-2.5 max-w-xl text-[15px] leading-relaxed text-[#b3c0b9]">
              {contact.body}
            </p>
          </div>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-[11px] bg-accent px-7 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            {contact.cta}
            <ArrowIcon width={17} height={17} />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
