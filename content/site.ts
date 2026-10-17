/**
 * Single source of truth for everything on the site.
 * Edit this file to update the portfolio — no component changes needed.
 */

export const profile = {
  name: "Sandeep Ambala",
  initials: "SA",
  role: "Business Automation Specialist",
  tagline: "AI automation and ERP systems that remove manual work",
  location: "Telangana, India · Remote",
  email: "sandeepambala31@gmail.com",
  linkedin: "https://linkedin.com/in/sandeep-ambala",
  github: "https://github.com/sandeepambala",
  available: true,
  availabilityLabel: "Available for consulting & projects",
  /** Drop your photo at public/sandeep.jpg and set this to "/sandeep.jpg". */
  photo: "",
  siteUrl: "https://sandeep-portfolio-v2-six.vercel.app",
} as const;

export const hero = {
  headline: ["Your operations,", "wired end to end."],
  /** Words in the headline rendered in the accent colour. */
  accentFrom: 1,
  body:
    "I connect the tools you already use into one automated system — ERPNext and Frappe at the core, AI agents and n8n doing the work nobody should be doing by hand.",
  primaryCta: { label: "Map my workflow", href: "#contact" },
  secondaryCta: { label: "See the systems", href: "#work" },
} as const;

/**
 * The hero diagram: a tangle on the left that resolves into order on the right.
 * Left-hand items are deliberately messy, right-hand items deliberately aligned —
 * the contrast is the whole argument, so keep both lists short and concrete.
 */
export const transformation = {
  before: {
    label: "Your problem",
    /**
     * Deliberately many and deliberately broad. A short list invites "none of
     * those are mine"; a crowded one guarantees a visitor finds theirs, and the
     * crowding itself is the message. Keep each line under ~20 characters so the
     * chips stay on one line, and keep `catchAll` last.
     */
    items: [
      "Manual data entry",
      "Excel everywhere",
      "Copy-paste all day",
      "Chasing follow-ups",
      "Quotes typed by hand",
      "Month-end chaos",
      "Enquiries slip away",
      "Orders over WhatsApp",
      "No single truth",
      "Stock never matches",
      "Approvals stuck",
      "Re-typing invoices",
      "Reports by hand",
      "Two systems, no sync",
      "Customers chasing",
      "Doing robot work",
      "Nothing's traceable",
      "Data in five places",
    ],
    catchAll: "…and yours, whatever it is",
  },
  middle: {
    label: "Me",
    name: "Sandeep",
    sub: "ERPNext · Frappe · AI",
  },
  after: {
    label: "Smooth",
    /** Exactly three — the calm on this side depends on it being few. */
    items: ["One system, one record", "Runs without being watched", "Hours back, every week"],
  },
} as const;

export type Capability = {
  title: string;
  description: string;
  icon: "bot" | "workflow" | "database" | "zap" | "server";
};

export const capabilities: Capability[] = [
  {
    icon: "bot",
    title: "AI agents & LLMs",
    description:
      "LangChain agents living inside ERPNext — research automation, content generation, document and audio processing.",
  },
  {
    icon: "workflow",
    title: "Workflow automation",
    description:
      "End-to-end pipelines with n8n, Pabbly and custom scripts that remove the manual middle step.",
  },
  {
    icon: "database",
    title: "ERPNext & Frappe",
    description:
      "Custom modules and doctypes, React and Vue front-ends, LMS and CRM builds — plus CRM migrations from HubSpot and Asana, done in Frappe's own language so your team isn't stuck translating.",
  },
  {
    icon: "zap",
    title: "Integrations & APIs",
    description:
      "WhatsApp, Meta, Telegram, Zoom, SOAP services, payment gateways and webhooks, wired straight into your ERP.",
  },
  {
    icon: "server",
    title: "Deployment & hosting, handled",
    description:
      "Domains, DNS, servers and deployments run through Claude Code connected to Hostinger — no separate DevOps hire on your project.",
  },
];

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  impact: string;
  tech: string[];
  featured?: boolean;
  /** Put a screenshot at public/work/<slug>.png and set this to "/work/<slug>.png". */
  image?: string;
};

export const projects: Project[] = [
  {
    slug: "forms-pro",
    title: "Forms Pro for Frappe",
    subtitle: "Multi-step form builder on Frappe v16",
    description:
      "A full multi-step form builder built on Frappe UI. Forms map to existing DocTypes or create new ones, and every submission lands in ERPNext as a real record — no exports, no copy-paste.",
    impact: "Business forms that write straight into the ERP",
    tech: ["Frappe v16", "Frappe UI", "Vue", "Python", "Custom doctypes", "Claude Code"],
    featured: true,
  },
  {
    slug: "solar-crm-integration",
    title: "CRM Integration for a Swiss Solar Company",
    subtitle: "Legacy project system → Frappe CRM sync",
    description:
      "Connected a legacy project-management system's SOAP web service to a Frappe CRM. Projects, companies and contacts import automatically, with a settings page for credentials, a one-click connection test, batch fetching and an AI feature on top.",
    impact: "One CRM instead of two systems kept in sync by hand",
    tech: ["Frappe CRM", "SOAP / WSDL", "Python", "Encrypted credentials", "AI"],
    featured: true,
  },
  {
    slug: "erpnext-customer-portal",
    title: "ERPNext Customer Portal",
    subtitle: "Password-free portal with visit tracking",
    description:
      "Each customer gets a private, no-password link to their own portal inside ERPNext. Every visit is tracked, so the sales team knows exactly when a customer opened their quote or documents.",
    impact: "Customers self-serve; sales sees who's engaged and when",
    tech: ["ERPNext", "Frappe", "Python", "Web pages"],
  },
  {
    slug: "frappe-mcp-copilot",
    title: "Frappe MCP Connector & AI Copilot",
    subtitle: "Plug Claude straight into a Frappe site",
    description:
      "An installable Frappe app that exposes the site to Claude as an MCP connector, using Frappe's built-in OAuth so data never leaves the client's own server. Read-only by design, permission-aware, with path-traversal protection. Paired with a custom copilot chat front end.",
    impact: "Ask questions of your ERP in plain English, securely",
    tech: ["Frappe", "MCP", "OAuth2", "Claude", "Python"],
  },
  {
    slug: "frappe-claude-skills",
    title: "Claude Code Skills for Frappe",
    subtitle: "AI dev toolkit for the Frappe ecosystem",
    description:
      "A set of Claude Code skills covering DocTypes, hooks, APIs and Frappe UI conventions. Used daily on client work — a tester reports a bug on a call, and the fix is often live before they finish re-explaining it.",
    impact: "Bug fixes during the testing call, not the next sprint",
    tech: ["Claude Code", "Frappe", "Frappe UI", "ERPNext"],
  },
  {
    slug: "icd-logistics",
    title: "ICD Logistics Platform",
    subtitle: "Container yard management system",
    description:
      "ERPNext-based logistics platform for an inland container depot, with a React container-yard map for real-time visualisation. AI voice agents and a WhatsApp payment-reminder system automate customer communication.",
    impact: "Real-time container tracking with automated billing follow-ups",
    tech: ["ERPNext", "React", "AI voice agents", "WhatsApp API", "Frappe React SDK"],
    featured: true,
  },
  {
    slug: "gtm-cold-call",
    title: "GTM Monitoring & Cold Call System",
    subtitle: "AI lead research and script generation",
    description:
      "The whole cold-calling workflow, automated: leads flow from the research team to callers with AI-generated scripts powered by Perplexity. Calls record in real time and categorise themselves for instant insight.",
    impact: "70% less call-prep time and better pitch quality across sales teams",
    tech: ["ERPNext", "Perplexity API", "n8n", "Voice processing", "LLM"],
  },
  {
    slug: "ai-chatbot-saas",
    title: "AI Chatbot SaaS Platform",
    subtitle: "Website AI assistant with CRM integration",
    description:
      "A SaaS platform where any website adds an AI assistant with one JavaScript snippet. Visitor conversations, timelines and analytics land directly in ERPNext, auto-generating CRM leads and opportunities.",
    impact: "Multi-tenant architecture deployed across client websites",
    tech: ["Frappe", "LLM", "JavaScript", "ERPNext CRM", "Analytics"],
  },
  {
    slug: "shanthipath-yoga",
    title: "Shanthipath Yoga Learning Platform",
    subtitle: "End-to-end online learning and booking system",
    description:
      "A complete yoga education platform with 24/7 live Zoom class integration and automated link handling. Frappe LMS customised with retreat booking, secure payments and cloud recording embeds — no server storage overhead.",
    impact: "Scalable online education with zero manual intervention",
    tech: ["React", "Frappe LMS", "Python", "Zoom API", "Payment gateway"],
  },
  {
    slug: "ai-integration-app",
    title: "AI Integration App for ERPNext",
    subtitle: "Reusable Frappe + LangChain framework",
    description:
      "A reusable Frappe application that drops LLM capability into any ERPNext instance, with an agent framework supporting multiple providers for research, content, image generation and audio processing.",
    impact: "AI inside ERP workflows without bolting on external tools",
    tech: ["ERPNext", "LangChain", "Perplexity", "Python", "AI agents"],
  },
  {
    slug: "ai-social-media",
    title: "AI Social Media Manager",
    subtitle: "ERP-integrated content automation",
    description:
      "Publishes straight from the ERP to Twitter, LinkedIn and Reddit with AI-generated copy and images, using the company knowledge base as context so messaging stays on brand. Scheduling included.",
    impact: "Removed hours of weekly content creation and scheduling",
    tech: ["Frappe", "LangChain", "RAG", "Social APIs"],
  },
  {
    slug: "lms",
    title: "Learning Management System",
    subtitle: "Complete LMS on the Frappe framework",
    description:
      "Course enrolment, assessments, scoring, learning-streak tracking and certification workflows, with learner dashboards, performance analytics and automated certificate generation for 100+ learners.",
    impact: "End-to-end delivery with automated progress tracking",
    tech: ["ERPNext", "Frappe", "Python", "Custom doctypes"],
  },
  {
    slug: "email-classification-seo",
    title: "Email Classification & SEO Automation",
    subtitle: "Intelligent email processing and content generation",
    description:
      "Email classification with per-client rules — enquiry mail auto-creates opportunities in the ERP. Paired with SEO content and FAQ generation driven by intelligent web scraping for blogs and product pages.",
    impact: "Zero missed leads and consistent SEO content without manual research",
    tech: ["ERPNext", "AI classification", "Web scraping", "n8n"],
  },
  {
    slug: "vendor-onboarding",
    title: "Vendor Onboarding Portal",
    subtitle: "Self-service registration system",
    description:
      "Vendor registration with OTP email authentication, dynamic forms rendered by vendor class, real-time status tracking and stage-wise permission controls.",
    impact: "Transparent onboarding with far less back-and-forth",
    tech: ["Frappe", "Python", "Custom doctypes", "Web pages"],
  },
];

/**
 * The project count is derived, so adding a project to the list above keeps
 * the hero stat and the Work heading honest without a second edit.
 */
export const stats = [
  { value: "50+", label: "workflows built" },
  { value: "170+", label: "people trained" },
  { value: `${projects.length}`, label: "projects delivered" },
  { value: "5+", label: "enterprise clients" },
] as const;

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  current?: boolean;
  points: string[];
  achievement?: string;
};

export const experience: Experience[] = [
  {
    company: "FinByz Tech Pvt Ltd",
    role: "Software Developer — ERPNext / Frappe / AI Automation",
    period: "Aug 2025 — Present",
    location: "Ahmedabad, Gujarat (Remote)",
    current: true,
    points: [
      "Building ERPNext and Frappe enterprise applications for 5+ clients — workflow automation, dashboards and operational integrations",
      "Engineering custom ERPNext front-ends with React and the Frappe React SDK",
      "Integrating LLMs into ERP systems to enable AI-driven automation",
      "Developing n8n automation pipelines connecting ERPNext to external APIs and messaging platforms",
      "Creating operational dashboards and workspaces that improve visibility for business teams",
      "Built a Forms Pro app, a password-free ERPNext customer portal and a SOAP-based CRM data integration for international clients",
      "Fix and ship bugs live with the testing team using custom Claude Code skills for Frappe",
      "Interview and evaluate Frappe / ERPNext developer candidates alongside senior leadership",
    ],
    achievement: "Best AI & Client Success Champion (Feb 2026) — within six months of joining",
  },
  {
    company: "Freelance",
    role: "Frappe / ERPNext & Web Developer",
    period: "2025 — Present",
    location: "Remote",
    current: true,
    points: [
      "Deliver client websites and servers end to end, including hosting, DNS and deployment via Claude Code and Hostinger",
      "Migrate businesses from HubSpot and Asana to Frappe CRM and ERPNext",
    ],
  },
  {
    company: "Valuepitch",
    role: "Product Manager & ERPNext Solution Engineer",
    period: "Oct 2024 — Mar 2025",
    location: "India",
    points: [
      "Led ERP product discovery, roadmap planning and solution demos for automation-driven enterprise platforms",
      "Managed cross-functional teams across development, automation and UI/UX",
      "Built automation pipelines with n8n, Pabbly and Google Apps Script",
      "Integrated Meta and WhatsApp APIs to automate CRM communication and lead engagement",
    ],
    achievement: "Promoted for exceptional problem-solving across technical and client-facing work",
  },
  {
    company: "Valuepitch",
    role: "AI Workflow Specialist & Trainer",
    period: "Jun 2023 — Sep 2024",
    location: "India",
    points: [
      "Trained 170+ professionals on AI-powered workflow automation and productivity tools",
      "Built internal dashboards and monitoring systems that improved operational tracking and reporting",
    ],
    achievement: "Best Employee of the Month",
  },
];

export const stack = [
  {
    group: "ERP & frameworks",
    items: ["ERPNext", "Frappe", "Frappe v16", "Frappe UI", "Frappe CRM", "Frappe LMS", "Frappe React SDK", "Raven"],
  },
  {
    group: "AI & automation",
    items: ["Claude Code", "MCP", "LangChain", "Perplexity", "OpenAI", "n8n", "Pabbly", "RAG"],
  },
  {
    group: "Languages & web",
    items: ["Python", "JavaScript", "TypeScript", "Vue", "React", "Next.js", "Tailwind CSS"],
  },
  {
    group: "Data & infra",
    items: ["MariaDB", "Redis", "Linux", "Bench", "Git", "Hostinger", "DNS / SSL", "Vercel"],
  },
  {
    group: "Integrations",
    items: ["WhatsApp API", "Meta API", "Telegram", "Zoom API", "SOAP / WSDL", "OAuth2", "Payment gateways", "Webhooks"],
  },
] as const;

export const achievements = [
  "Best AI & Client Success Champion at FinByz Tech — within six months of joining (Feb 2026)",
  "Best Employee of the Month at Valuepitch for high-impact automation delivery",
  "Promoted to ERPNext Solution Engineer at Valuepitch for solving complex technical and client-facing challenges",
] as const;

export const certifications = [
  { title: "HackWithHyderabad", issuer: "HackWithIndia — Certificate of Participation" },
  { title: "Prompt Engineering for ChatGPT", issuer: "Great Learning" },
  { title: "Python Programming Workshop", issuer: "Be10x" },
] as const;

export const education = [
  {
    course: "B.Com (Computer Applications)",
    institution: "Bhavitha Degree College, Bellampalli",
    year: "2022 — 2025",
  },
  { course: "SSC (10th)", institution: "Yuva Sangatan High School, Bellampalli", year: "2018 — 2019" },
] as const;

export const writing = {
  heading: "Writing & community",
  items: [
    {
      title: "Frappe + AI, in plain language",
      body: "Storyteller posts on building with Frappe, ERPNext and AI — plus a weekly Monday AI News series.",
      cta: "Read on LinkedIn",
      href: profile.linkedin,
    },
    {
      title: "Open source",
      body: "Contributing back to the Frappe ecosystem that the rest of this work is built on.",
    },
  ],
} as const;

export const nav = [
  { label: "Work", href: "#work" },
  { label: "What I build", href: "#build" },
  { label: "About", href: "#about" },
] as const;

export const contact = {
  heading: "Show me your most annoying process.",
  body: "I'll map it as a workflow and tell you what can be automated — free, no pitch.",
  cta: "Book a 20-min call",
} as const;
