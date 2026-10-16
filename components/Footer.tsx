import { profile } from "@/content/site";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./Icons";

const links = [
  { href: `mailto:${profile.email}`, label: "Email", Icon: MailIcon, external: false },
  { href: profile.linkedin, label: "LinkedIn", Icon: LinkedInIcon, external: true },
  { href: profile.github, label: "GitHub", Icon: GitHubIcon, external: true },
];

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold">{profile.name}</p>
          <p className="mt-0.5 text-sm text-muted">
            {profile.role} · {profile.location}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {links.map(({ href, label, Icon, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              aria-label={label}
              className="flex size-11 items-center justify-center rounded-xl border border-line bg-surface text-body transition-colors hover:border-accent hover:text-accent"
            >
              <Icon width={18} height={18} />
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 lg:px-8">
        <p className="font-mono text-[11px] text-muted">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
