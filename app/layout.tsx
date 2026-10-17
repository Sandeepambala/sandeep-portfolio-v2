import type { Metadata } from "next";
import { Caveat, IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { capabilities, experience, profile, projects, stack } from "@/content/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-plex-mono",
  display: "swap",
});

/** Only for the hero's handwritten margin notes — one weight, nothing else. */
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-caveat",
  display: "swap",
});

const title = `${profile.name} — ERPNext, Frappe & AI Automation Developer`;
const description =
  "I build AI automation and ERP systems that remove manual work — ERPNext, Frappe, n8n and LLM agents. 50+ workflows built for 5+ enterprise clients. Available for consulting and projects.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { default: title, template: `%s — ${profile.name}` },
  description,
  applicationName: profile.name,
  keywords: [
    "ERPNext developer",
    "Frappe developer",
    "ERPNext consultant India",
    "Frappe framework developer",
    "AI automation consultant",
    "n8n automation expert",
    "LangChain ERPNext",
    "business process automation",
    "workflow automation consultant",
    "ERPNext customisation",
    "Frappe CRM migration",
    "HubSpot to Frappe migration",
    profile.name,
  ],
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  publisher: profile.name,
  alternates: { canonical: "/" },
  category: "technology",
  openGraph: {
    type: "profile",
    url: profile.siteUrl,
    title,
    description,
    siteName: profile.name,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // The favicon comes from app/icon.svg, which Next wires up automatically.
};

export const viewport = {
  themeColor: "#f5f7f4",
  width: "device-width",
  initialScale: 1,
};

/**
 * One @graph rather than several loose blobs, so Google can resolve the
 * relationships between the person, the page and the work.
 */
function structuredData() {
  const personId = `${profile.siteUrl}/#person`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: profile.name,
        jobTitle: profile.role,
        description,
        email: `mailto:${profile.email}`,
        url: profile.siteUrl,
        image: `${profile.siteUrl}/opengraph-image`,
        sameAs: [profile.linkedin, profile.github],
        address: { "@type": "PostalAddress", addressRegion: "Telangana", addressCountry: "IN" },
        knowsAbout: [
          ...capabilities.map((c) => c.title),
          ...stack.flatMap((g) => [...g.items]),
        ],
        worksFor: {
          "@type": "Organization",
          name: experience[0].company,
        },
        alumniOf: experience
          .map((e) => e.company)
          .filter((c, i, all) => all.indexOf(c) === i)
          .map((name) => ({ "@type": "Organization", name })),
      },
      {
        "@type": "WebSite",
        "@id": `${profile.siteUrl}/#website`,
        url: profile.siteUrl,
        name: title,
        description,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${profile.siteUrl}/#webpage`,
        url: profile.siteUrl,
        name: title,
        isPartOf: { "@id": `${profile.siteUrl}/#website` },
        about: { "@id": personId },
        primaryImageOfPage: `${profile.siteUrl}/opengraph-image`,
      },
      {
        "@type": "ItemList",
        "@id": `${profile.siteUrl}/#work`,
        name: "Selected work",
        numberOfItems: projects.length,
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "CreativeWork",
            name: p.title,
            description: p.description,
            about: p.subtitle,
            keywords: p.tech.join(", "),
            creator: { "@id": personId },
            // A real URL turns the entry from a claim into something crawlable.
            ...(p.link ? { url: p.link.href } : {}),
          },
        })),
      },
    ],
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${plexMono.variable} ${caveat.variable}`}
    >
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }}
        />
      </body>
    </html>
  );
}
