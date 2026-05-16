"use client";
import { useState } from "react";
import { ServiceModal, type ServiceDetail } from "./ServiceModal";

const SERVICES: ServiceDetail[] = [
  {
    tag: "01",
    title: "Technical Audit",
    description:
      "Comprehensive crawl analysis, Core Web Vitals assessment, and infrastructure review to identify every technical barrier to search performance.",
    inputs: ["Full-site crawl data", "Server logs", "GSC & GA access", "Competitor benchmarks"],
    deliverables: ["200+ point audit report", "Priority matrix", "Fix implementation guide", "Baseline metrics dashboard"],
    cadence: ["One-time deep dive", "Quarterly re-audits", "Ongoing monitoring setup"],
  },
  {
    tag: "02",
    title: "Content Strategy",
    description:
      "Keyword universe mapping, topical cluster architecture, and content gap analysis to build systematic topical authority.",
    inputs: ["Business goals", "Audience research", "Competitor content audit", "Existing content inventory"],
    deliverables: ["Keyword universe map", "Content taxonomy", "Editorial calendar", "Brief templates"],
    cadence: ["Initial strategy: 4 weeks", "Monthly iterations", "Quarterly reviews"],
  },
  {
    tag: "03",
    title: "On-Page Optimization",
    description:
      "Entity-based content optimization, internal linking architecture, and semantic markup to maximize per-page search value.",
    inputs: ["Target keyword sets", "SERP analysis", "Content inventory", "User intent mapping"],
    deliverables: ["Optimization playbooks", "Internal link map", "Schema templates", "Title/meta framework"],
    cadence: ["Batch optimizations", "Bi-weekly sprints", "Monthly reporting"],
  },
  {
    tag: "04",
    title: "Link Acquisition",
    description:
      "Strategic digital PR and outreach campaigns to earn high-authority, topically relevant backlinks that compound domain strength.",
    inputs: ["Brand assets", "Expert sources", "Data studies", "Industry relationships"],
    deliverables: ["Prospect pipeline", "Outreach sequences", "Monthly link reports", "DR growth tracking"],
    cadence: ["Ongoing monthly", "Campaign-based sprints", "Quarterly strategy reviews"],
  },
  {
    tag: "05",
    title: "Local SEO",
    description:
      "Multi-location search optimization including GBP management, local content systems, and citation building at scale.",
    inputs: ["Location data", "GBP access", "Review platforms", "Local competitor set"],
    deliverables: ["GBP optimization", "Local landing pages", "Citation audit", "Review strategy"],
    cadence: ["Weekly GBP management", "Monthly reporting", "Quarterly strategy"],
  },
  {
    tag: "06",
    title: "Analytics & Attribution",
    description:
      "Custom measurement frameworks that connect organic search performance to pipeline, revenue, and business outcomes.",
    inputs: ["CRM data", "GA4 & GSC", "Revenue data", "Attribution models"],
    deliverables: ["Custom dashboards", "Revenue attribution", "Forecasting models", "Executive reports"],
    cadence: ["Real-time dashboards", "Monthly analysis", "Quarterly business reviews"],
  },
  {
    tag: "07",
    title: "Migration Support",
    description:
      "Risk-free site migrations with comprehensive redirect mapping, equity preservation, and post-migration monitoring.",
    inputs: ["Current URL structure", "Traffic data", "New IA plans", "Platform specs"],
    deliverables: ["Redirect map", "Pre-flight checklist", "Monitoring setup", "Post-launch report"],
    cadence: ["Pre-migration: 4-6 weeks", "Launch support", "90-day monitoring"],
  },
  {
    tag: "08",
    title: "Training & Enablement",
    description:
      "Upskill your internal team with custom SEO training, playbooks, and ongoing advisory to build lasting capability.",
    inputs: ["Team assessment", "Tool stack", "Current workflows", "Knowledge gaps"],
    deliverables: ["Custom curriculum", "Playbook library", "Tool training", "Certification tracks"],
    cadence: ["Workshop series", "Monthly office hours", "Quarterly assessments"],
  },
];

export function ServiceGrid() {
  const [activeService, setActiveService] = useState<ServiceDetail | null>(null);

  return (
    <>
      <section
        style={{
          padding: "6rem var(--page-pad, 2rem)",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1px",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {SERVICES.map((service) => (
            <button
              key={service.tag}
              type="button"
              onClick={() => setActiveService(service)}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                padding: "2rem",
                background: "rgba(255,255,255,0.01)",
                border: "none",
                color: "inherit",
                textAlign: "left",
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "background 0.3s ease",
              }}
              className="service-card"
            >
              <span
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  opacity: 0.3,
                }}
              >
                {service.tag} / 08
              </span>

              <h3 style={{ fontSize: "1.15rem", fontWeight: 400, margin: 0 }}>
                {service.title}
              </h3>

              <p
                style={{
                  fontSize: "0.8rem",
                  lineHeight: 1.6,
                  opacity: 0.5,
                  margin: 0,
                  flex: 1,
                }}
              >
                {service.description.slice(0, 80)}...
              </p>

              <span
                style={{
                  fontSize: "1rem",
                  opacity: 0.4,
                  transition: "transform 0.3s ease",
                }}
                className="service-arrow"
              >
                &rarr;
              </span>
            </button>
          ))}
        </div>
      </section>

      {activeService && (
        <ServiceModal
          service={activeService}
          onClose={() => setActiveService(null)}
        />
      )}

      <style jsx>{`
        .service-card:hover {
          background: rgba(255, 255, 255, 0.03) !important;
        }
        .service-card:hover .service-arrow {
          transform: translateX(4px);
        }
      `}</style>
    </>
  );
}
