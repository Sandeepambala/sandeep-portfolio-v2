# sandeep-portfolio-v2

Portfolio of **Sandeep Ambala** — Business Automation Specialist (AI automation, ERPNext & Frappe).

Design direction: **Workflow Canvas** — a dot-grid ground with the hero rendered as a live
automation graph (triggers → AI agent → actions), so the page demonstrates the service it sells.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, React 19, Turbopack) |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens, no config file) |
| Type safety | TypeScript, strict |
| Fonts | Plus Jakarta Sans + IBM Plex Mono via `next/font` (self-hosted, no layout shift) |
| Output | Fully static — every route prerendered |

No UI component library and no animation library: the whole site is ~9 components and one CSS file.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build (also typechecks)
npm run start      # serve the production build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
```

## Editing the content

**Everything on the page comes from [`content/site.ts`](content/site.ts).** Change text there, not
in the components — profile, hero copy, stats, the hero workflow graph, capabilities, all nine
projects, experience, stack, achievements, certifications and education.

A few specifics:

- **Your photo.** Drop the file at `public/sandeep.jpg`, then set `profile.photo` to
  `"/sandeep.jpg"`. Until it is set, the About card shows a placeholder.
- **Project screenshots.** Put an image at `public/work/<slug>.png` and set that project's `image`
  field. Without one, the card shows the project's subtitle on a neutral panel.
- **Featured projects.** The three cards at the top of *Selected work* are the projects with
  `featured: true`. The rest fall into the numbered list below.
- **Site URL.** Set `profile.siteUrl` to the real domain once deployed — it drives Open Graph tags
  and the JSON-LD `Person` schema.

## Design tokens

Colours, fonts and shadows live in the `@theme` block at the top of
[`app/globals.css`](app/globals.css). Change `--color-accent` there to recolour the whole site.

## Accessibility & performance notes

- Real `<a>`, `<button>`, `<dl>`/`<ol>` semantics throughout; a skip link opens the page.
- All interactive targets are at least 44px tall.
- Every entrance animation is switched off under `prefers-reduced-motion: reduce`.
- `Reveal` is scroll-position driven rather than `IntersectionObserver`-driven, so content can
  never get stuck invisible after a fast scroll or an anchor jump — and it renders visible if JS
  never runs.
- No horizontal overflow at 390px.

## Deploying

Push to GitHub, then import the repo at [vercel.com/new](https://vercel.com/new). No environment
variables and no build configuration are needed. Netlify and Cloudflare Pages work the same way
with `npm run build`.

## Layout

```
app/
  layout.tsx      fonts, metadata, JSON-LD, skip link
  page.tsx        section order
  globals.css     design tokens + animations
components/       Nav, Hero, WorkflowGraph, Capabilities, Work, About,
                  Stack, Credentials, Contact, Footer, Reveal, Icons
content/site.ts   all copy and data
```
