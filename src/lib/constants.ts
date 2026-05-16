// Navigation
export const NAV_ITEMS = [
  { id: "home", label: "Overview", href: "/" },
  { id: "engagements", label: "Engagements", href: "/engagements" },
  { id: "services", label: "Services", href: "/services" },
  { id: "cases", label: "Case studies", href: "/case-studies" },
  { id: "insights", label: "Insights", href: "/insights" },
  { id: "about", label: "About", href: "/about" },
  { id: "contact", label: "Contact", href: "/contact" },
] as const;

export const ROUTE_LABELS: Record<string, string> = {
  "/": "Overview",
  "/engagements": "Engagements",
  "/services": "Services",
  "/case-studies": "Case studies",
  "/insights": "Insights",
  "/about": "About",
  "/contact": "Contact",
};

// Stats (Marquee)
export const STATS = [
  { value: "$47M", label: "attributed revenue" },
  { value: "1.2M", label: "keywords tracked" },
  { value: "94%", label: "client retention" },
  { value: "+312%", label: "avg organic lift, 12 mo" },
  { value: "62", label: "industries served" },
  { value: "7yr", label: "median tenure" },
] as const;

// Pillars
export const PILLARS = [
  {
    tag: "01 / TECHNICAL",
    title: "Technical Foundation",
    body: "Site architecture, indexation, Core Web Vitals, structured data, log-file analysis. The substrate every other discipline depends on.",
    icon: "tech" as const,
  },
  {
    tag: "02 / CONTENT",
    title: "Content Systems",
    body: "Topic authority maps, editorial frameworks, brief specs, refresh cadences. Content built for both relevance and conversion.",
    icon: "doc" as const,
  },
  {
    tag: "03 / AUTHORITY",
    title: "Authority Programs",
    body: "Digital PR, editorial link acquisition, founder-led thought leadership, brand-signal building. No marketplaces, ever.",
    icon: "graph" as const,
  },
] as const;

// Process stages
export const PROCESS_STAGES = [
  { n: "01", t: "Diagnose", d: "A 10-day discovery covering technical state, content inventory, authority profile, and revenue mapping. Output: a written diagnosis with prioritized exposures." },
  { n: "02", t: "Architect", d: "A 90-day execution plan tied to revenue targets. Each initiative has owners, dependencies, and a model for expected lift." },
  { n: "03", t: "Build", d: "Engineers ship technical fixes. Editors produce briefed content. The PR team places editorial links. Work moves through your tooling, not ours." },
  { n: "04", t: "Measure", d: "Custom dashboards attribute organic to revenue. Quarterly board-ready reports. We argue with the data publicly when it disagrees with us." },
  { n: "05", t: "Compound", d: "Topical authority and link velocity compound. We ship refresh cadences, brand SERP defense, and adjacent territory expansion." },
] as const;

// Home case showcase
export const HOME_CASES = [
  { client: "Hayfield & Co.", vert: "D2C Outdoor", traffic: 612, kw: "4,210", rev: "$2.4M" },
  { client: "Northbeam Cycles", vert: "E-commerce", traffic: 438, kw: "7,820", rev: "$5.1M" },
  { client: "Foundry Health", vert: "B2B SaaS", traffic: 1204, kw: "2,090", rev: "$3.8M" },
  { client: "Cohort Capital", vert: "Fintech", traffic: 329, kw: "980", rev: "$1.9M" },
] as const;

// Case studies page
export const CASES = [
  { c: "Hayfield & Co.", v: "D2C", m: "+612%", k: "Local to national", h: 320 },
  { c: "Northbeam Cycles", v: "E-com", m: "+438%", k: "Faceted-nav engineering", h: 240 },
  { c: "Foundry Health", v: "Health", m: "+1,204%", k: "Programmatic + topical authority", h: 280 },
  { c: "Cohort Capital", v: "Fintech", m: "+329%", k: "Brand SERP defense", h: 200 },
  { c: "Marrow Studio", v: "D2C", m: "+512%", k: "Editorial PR program", h: 260 },
  { c: "Lattice OS", v: "B2B SaaS", m: "+782%", k: "Glossary cluster", h: 220 },
  { c: "Quay Apparel", v: "E-com", m: "+218%", k: "Internal-link engineering", h: 300 },
  { c: "Sundial Bank", v: "Fintech", m: "+396%", k: "Compliance-safe content", h: 200 },
  { c: "Kelp & Kin", v: "Health", m: "+844%", k: "Local + content stack", h: 240 },
] as const;

export const CASE_CATEGORIES = ["All", "D2C", "B2B SaaS", "E-com", "Fintech", "Health"] as const;

// Testimonials
export const TESTIMONIALS = [
  { q: "They rebuilt our site\u2019s information architecture in a quarter and quadrupled organic. The cadence of their work is unreasonable.", a: "Maren Kowalski", r: "VP Marketing, Hayfield & Co." },
  { q: "Most agencies write decks. Hartwell ships code. Our log files have never been this clean.", a: "Devon Park", r: "Head of Growth, Foundry Health" },
  { q: "We replaced three vendors with one team. They argue with our roadmap when they should, and that has been the unlock.", a: "Iris Madsen", r: "CMO, Northbeam Cycles" },
  { q: "They told us which keywords to ignore. That alone paid for the engagement.", a: "Theo Anand", r: "Founder, Cohort Capital" },
] as const;

// Pricing tiers
export const TIERS = [
  {
    key: "foundation", name: "Foundation", sub: "Establishing the channel", price: 1499,
    blurb: "For early-stage businesses establishing organic search as a measurable channel.",
    features: [
      "Technical audit + quarterly re-audit",
      "10 priority keywords",
      "On-page optimization (10 pages/mo)",
      "Monthly performance review",
      "Email support",
    ],
    cta: "Apply for Foundation",
    featured: false,
  },
  {
    key: "growth", name: "Growth", sub: "Scaling acquisition \u00b7 Most selected", price: 3499,
    blurb: "For established businesses scaling organic acquisition into a primary channel.",
    features: [
      "Everything in Foundation",
      "50 priority keywords",
      "Content production (4 long-form/mo)",
      "Authority building (8 placements/mo)",
      "Bi-weekly strategy calls",
      "Dedicated account lead",
    ],
    cta: "Apply for Growth",
    featured: true,
  },
  {
    key: "enterprise", name: "Enterprise", sub: "Defending market share", price: 7999,
    blurb: "For category leaders defending and expanding share in a competitive SERP.",
    features: [
      "Everything in Growth",
      "Unlimited keyword scope",
      "Dedicated 4-person pod",
      "Weekly strategy + monthly executive review",
      "Custom dashboards & attribution modeling",
      "Priority slack channel",
    ],
    cta: "Apply for Enterprise",
    featured: false,
  },
] as const;

// Compare table
export const COMPARE_ROWS = [
  ["Priority keywords", "10", "50", "Unlimited"],
  ["Technical audit", "Quarterly", "Continuous", "Continuous + log analysis"],
  ["Content briefs", "4 / mo", "12 / mo", "40+ / mo"],
  ["Authority placements", "\u2014", "8 / mo", "12+ / mo"],
  ["Strategy cadence", "Async", "Bi-weekly", "Weekly + monthly exec review"],
  ["Dedicated team", "Account lead", "Lead + editor", "4-person pod"],
  ["Custom dashboards", "\u2014", "\u2713", "\u2713 + attribution modeling"],
  ["International / multi-domain", "\u2014", "Add-on", "\u2713"],
] as const;

// FAQ
export const FAQ_ITEMS = [
  { q: "How long until I see results?", a: "Technical wins land within 30 days. Content velocity compounds at 90 days. Authority-driven gains show by month 6. Each engagement includes a model that predicts the curve and updates monthly." },
  { q: "Do you require contracts?", a: "A 90-day initial term, then month-to-month. We earn the relationship; we do not lock it in." },
  { q: "Will I work with the same team?", a: "Yes. Each engagement has a named lead, editor, and engineer. No rotating account managers." },
  { q: "Do you guarantee rankings?", a: "No serious consultancy does. We guarantee work output, transparency, and a model tied to revenue rather than vanity positions." },
  { q: "Can you work alongside our in-house team?", a: "Most of our clients have one. We embed in their tooling, attend their stand-ups, and ship through their CMS." },
] as const;

// Services
export const SERVICES = [
  { t: "Technical Audits", d: "Crawl simulators, log-file analysis, render-blocking diagnosis, indexation hygiene. The boring work that moves rankings.", tag: "01" },
  { t: "Keyword Research", d: "Cluster-first, intent-mapped. We tell you which keywords to ignore as much as which to chase.", tag: "02" },
  { t: "On-Page SEO", d: "Page-by-page rewrites by editors who understand schema, search intent, and conversion copy.", tag: "03" },
  { t: "Authority Programs", d: "Editorial placements. Digital PR. Founder-led thought leadership. No marketplaces, ever.", tag: "04" },
  { t: "Local SEO", d: "GBP optimization, citation cleanup, local landing pages, review velocity for multi-location operators.", tag: "05" },
  { t: "E-commerce SEO", d: "Faceted-nav engineering, collection pages, product schema, internal-link architecture.", tag: "06" },
  { t: "Content Strategy", d: "Topic-authority maps, briefs editors actually want to write to, refresh and pruning cadences.", tag: "07" },
  { t: "Analytics & Reporting", d: "Custom dashboards, attribution modeling, board-ready reports tied to revenue.", tag: "08" },
] as const;

// Team
export const TEAM = [
  { n: "Mara Hartwell", r: "Founding Partner" },
  { n: "Jules Okafor", r: "Principal, Technical SEO" },
  { n: "Indra Lien", r: "Editor in Chief" },
  { n: "Cy Ramirez", r: "Head of Authority Programs" },
  { n: "Pelin Kaya", r: "Lead Engineer" },
  { n: "Ben Whitlock", r: "Director of Client Strategy" },
] as const;

// Milestones
export const MILESTONES = [
  ["2019", "Mara Hartwell leaves agency life and files Hartwell SEO the same week."],
  ["2020", "First Growth-tier client. Reaches $40k MRR by Q4."],
  ["2022", "Crosses 1M tracked keywords. Hires the first dedicated pod."],
  ["2024", "Opens NYC studio. $14M in client-attributed revenue YTD."],
  ["2026", "Releases an in-house ranking model trained on 8B SERP rows."],
] as const;

// Articles
export const ARTICLES = [
  { tag: "TECHNICAL", t: "The case against rendered HTML for ecommerce category pages", d: "2026.04.18", r: "12 min", e: "Why most React-rendered category pages still leak crawl budget \u2014 and the four mitigations that actually move the needle." },
  { tag: "CONTENT", t: "Brief specs that survive the editor", d: "2026.03.27", r: "9 min", e: "Content briefs fail at the handoff. A field-tested template plus the three mistakes we see most often." },
  { tag: "AUTHORITY", t: "Why we no longer chase Domain Rating", d: "2026.02.14", r: "7 min", e: "A two-year audit of 41 client engagements: DR-targeted campaigns underperformed topical-fit campaigns by 3.2x in attributed revenue." },
  { tag: "MEASUREMENT", t: "GA4 + GSC: a reconciliation playbook", d: "2026.01.30", r: "14 min", e: "The five reasons your two dashboards disagree, and the SQL to make them tell one story." },
  { tag: "TECHNICAL", t: "When schema actually moves rankings", d: "2025.12.12", r: "8 min", e: "Schema is over-promised. A quiet review of the four implementation patterns that produced rich results in our portfolio." },
  { tag: "CONTENT", t: "Refresh cadences that protect compounding", d: "2025.11.04", r: "10 min", e: "A model for when to refresh, when to merge, and when to deprecate \u2014 built from log-file decay curves." },
  { tag: "INDUSTRY", t: "AI overviews: what we are seeing in Q1 2026", d: "2025.10.22", r: "11 min", e: "Click-through behavior on AIO-affected SERPs across 14 verticals in our portfolio." },
  { tag: "AUTHORITY", t: "The digital PR brief that gets placements", d: "2025.09.15", r: "9 min", e: "How to write a brief that earns 30+ editorial placements per quarter, from a team that runs them." },
  { tag: "MEASUREMENT", t: "A forecasting model for organic, demystified", d: "2025.08.07", r: "13 min", e: "The compounding-traffic model we present to client boards, with the math." },
] as const;

export const INSIGHT_CATEGORIES = ["All", "Technical", "Content", "Authority", "Measurement", "Industry"] as const;
