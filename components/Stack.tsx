import { stack } from "@/content/site";
import Reveal from "./Reveal";

export default function Stack() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
      <Reveal>
        <h2 className="label-mono">Stack</h2>
      </Reveal>

      <dl className="mt-5 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
        {stack.map((group, i) => (
          <Reveal key={group.group} delay={i * 60}>
            <div className="border-t border-line pt-4">
              <dt className="text-sm font-semibold">{group.group}</dt>
              <dd className="mt-2.5">
                <ul className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-line bg-surface px-2.5 py-1 text-[13px] text-body"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
