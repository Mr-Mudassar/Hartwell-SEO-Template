"use client";
import { Counter } from "@/components/ui/Counter";

const CASES = [
  {
    num: "01",
    client: "NovaTech Solutions",
    blurb:
      "Enterprise SaaS platform struggling with thin content and technical debt. We rebuilt their search architecture from the ground up.",
    stats: [
      { to: 312, suffix: "%", label: "Organic growth" },
      { to: 4.2, suffix: "x", decimals: 1, label: "Revenue impact" },
      { to: 89, suffix: "%", label: "Page 1 keywords" },
    ],
    duration: "14-month engagement",
  },
  {
    num: "02",
    client: "Meridian Health",
    blurb:
      "Multi-location healthcare provider with fragmented local SEO presence. We unified their search strategy across 120+ locations.",
    stats: [
      { to: 485, suffix: "%", label: "Local visibility" },
      { to: 2.8, suffix: "M", decimals: 1, label: "Annual visits" },
      { to: 156, suffix: "%", label: "Lead increase" },
    ],
    duration: "18-month engagement",
  },
  {
    num: "03",
    client: "Arcadia Finance",
    blurb:
      "Fintech startup in a competitive YMYL space. We established topical authority and E-E-A-T signals that outranked incumbents.",
    stats: [
      { to: 728, suffix: "%", label: "Organic traffic" },
      { to: 47, suffix: "", label: "Featured snippets" },
      { to: 6.1, suffix: "x", decimals: 1, label: "ROI" },
    ],
    duration: "12-month engagement",
  },
  {
    num: "04",
    client: "Vertex Commerce",
    blurb:
      "E-commerce brand with 40K+ SKUs and crawl budget issues. We optimized their product taxonomy and programmatic SEO system.",
    stats: [
      { to: 215, suffix: "%", label: "Revenue from search" },
      { to: 38, suffix: "K", label: "Indexed pages" },
      { to: 94, suffix: "%", label: "Crawl efficiency" },
    ],
    duration: "16-month engagement",
  },
];

function CaseGraph({ seed }: { seed: number }) {
  // Generate a random-ish upward polyline based on seed
  const points: string[] = [];
  let y = 60;
  for (let i = 0; i <= 8; i++) {
    const x = (i / 8) * 160;
    y = Math.max(8, y - (3 + ((seed * (i + 1) * 7) % 9)));
    points.push(`${x},${y}`);
  }

  return (
    <svg
      width="160"
      height="64"
      viewBox="0 0 160 64"
      fill="none"
      style={{ opacity: 0.4 }}
    >
      <polyline
        points={points.join(" ")}
        stroke="var(--gold, #d4af37)"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Area fill under the line */}
      <polyline
        points={`0,64 ${points.join(" ")} 160,64`}
        stroke="none"
        fill="var(--gold, #d4af37)"
        opacity="0.08"
      />
    </svg>
  );
}

export function CaseShowcase() {
  return (
    <section
      style={{
        padding: "6rem var(--page-pad, 2rem)",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        {CASES.map((cs, i) => (
          <article
            key={cs.num}
            className="reveal"
            style={{
              position: "sticky",
              top: `${80 + i * 40}px`,
              border: "1px solid rgba(255,255,255,0.08)",
              borderBottom:
                i < CASES.length - 1
                  ? "none"
                  : "1px solid rgba(255,255,255,0.08)",
              background: "var(--background, #0a0a0a)",
              zIndex: i,
              padding: "2.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            {/* Meta row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  opacity: 0.4,
                }}
              >
                Case &middot; {cs.num} of 04
              </span>
              <span
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  opacity: 0.3,
                  writingMode: "vertical-lr",
                  transform: "rotate(180deg)",
                }}
              >
                {cs.client}
              </span>
            </div>

            {/* Content grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr auto",
                gap: "3rem",
                alignItems: "start",
              }}
            >
              {/* Client + blurb */}
              <div>
                <h3
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: 400,
                    margin: "0 0 1rem 0",
                  }}
                >
                  {cs.client}
                </h3>
                <p
                  style={{
                    fontSize: "0.9rem",
                    lineHeight: 1.7,
                    opacity: 0.6,
                    margin: 0,
                  }}
                >
                  {cs.blurb}
                </p>
              </div>

              {/* Stats */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
              >
                {cs.stats.map((stat) => (
                  <div key={stat.label}>
                    <div
                      style={{
                        fontSize: "1.75rem",
                        fontWeight: 300,
                        color: "var(--gold, #d4af37)",
                      }}
                    >
                      <Counter
                        to={stat.to}
                        suffix={stat.suffix}
                        decimals={stat.decimals || 0}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        opacity: 0.4,
                      }}
                    >
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Sparkline */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CaseGraph seed={i + 1} />
              </div>
            </div>

            {/* Footer */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                paddingTop: "1.25rem",
                fontSize: "0.8rem",
              }}
            >
              <span style={{ opacity: 0.4 }}>{cs.duration}</span>
              <a
                href="/insights"
                style={{
                  opacity: 0.6,
                  textDecoration: "none",
                  color: "inherit",
                  transition: "opacity 0.2s ease",
                }}
              >
                Read the case study &rarr;
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
