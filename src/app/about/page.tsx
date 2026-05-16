"use client";

import dynamic from "next/dynamic";
import { useReveal } from "@/hooks/useReveal";
import { useTransitionContext } from "@/components/layout/TransitionContext";
import { useMouseNorm } from "@/hooks/useMouseNorm";
import { Footer } from "@/components/layout/Footer";
// Data is embedded in TeamGrid and Timeline components directly

/* ---------- lazy-loaded components ---------- */
const SceneWrapper = dynamic(
  () => import("@/components/scenes/SceneWrapper").then((m) => m.SceneWrapper),
  { ssr: false }
);
const LinkGraphScene = dynamic(
  () => import("@/components/scenes/LinkGraph").then((m) => m.LinkGraph),
  { ssr: false }
);
const TeamGrid = dynamic(
  () => import("@/components/sections/TeamGrid").then((m) => m.TeamGrid),
  { ssr: false }
);
const Timeline = dynamic(
  () => import("@/components/sections/Timeline").then((m) => m.Timeline),
  { ssr: false }
);

/* ---------- SVG fallback ---------- */
function GraphSVG() {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.5"
      style={{ width: "100%", height: "100%", opacity: 0.2 }}
    >
      <circle cx="200" cy="200" r="60" />
      <circle cx="120" cy="100" r="25" />
      <circle cx="300" cy="120" r="20" />
      <circle cx="320" cy="280" r="30" />
      <circle cx="80" cy="300" r="18" />
      <line x1="200" y1="200" x2="120" y2="100" />
      <line x1="200" y1="200" x2="300" y2="120" />
      <line x1="200" y1="200" x2="320" y2="280" />
      <line x1="200" y1="200" x2="80" y2="300" />
    </svg>
  );
}

/* ---------- values data ---------- */
const VALUES = [
  {
    tag: "01",
    title: "Evidence",
    body: "Every recommendation is grounded in data — crawl logs, search console metrics, competitive intelligence, and attribution models. We don't guess.",
  },
  {
    tag: "02",
    title: "Transparency",
    body: "Real-time dashboards, weekly updates, and plain-language reporting. You'll always know what we're doing, why, and what it's producing.",
  },
  {
    tag: "03",
    title: "Compounding",
    body: "We build systems, not campaigns. Each initiative reinforces the next — technical foundations support content, which earns authority, which accelerates rankings.",
  },
] as const;

export default function AboutPage() {
  useReveal();
  const mouseRef = useMouseNorm();
  const { navigate } = useTransitionContext();

  return (
    <main>
      {/* ---- Hero ---- */}
      <section
        className="reveal"
        style={{
          position: "relative",
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          padding: "8rem var(--page-pad, 2rem) 4rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
            maxWidth: "1400px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <span
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                opacity: 0.4,
              }}
            >
              About
            </span>
            <h1
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                fontWeight: 400,
                lineHeight: 1.05,
                margin: 0,
              }}
            >
              Built by operators, for operators.
            </h1>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.5rem",
              }}
            >
              <p style={{ opacity: 0.6, lineHeight: 1.7, fontSize: "0.95rem" }}>
                Hartwell SEO was founded on a simple thesis: organic search
                should be measured in revenue, not rankings. Every member of our
                team has operated in-house before — we understand the pressure to
                prove ROI.
              </p>
              <p style={{ opacity: 0.6, lineHeight: 1.7, fontSize: "0.95rem" }}>
                We&apos;re a senior team by design. No account managers relaying
                messages, no junior analysts running your strategy. You work
                directly with the people doing the work.
              </p>
            </div>
          </div>

          <div style={{ position: "relative", aspectRatio: "1", width: "100%" }}>
            <SceneWrapper fallback={<GraphSVG />} camera={{ position: [0, 0, 6], fov: 45 }}>
              <LinkGraphScene mouseRef={mouseRef} />
            </SceneWrapper>
          </div>
        </div>
      </section>

      {/* ---- Approach / Values ---- */}
      <section
        className="reveal"
        style={{
          padding: "6rem var(--page-pad, 2rem)",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <span
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            opacity: 0.4,
            display: "block",
            marginBottom: "2rem",
          }}
        >
          Our Approach
        </span>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {VALUES.map((value) => (
            <article
              key={value.tag}
              style={{
                padding: "2.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                background: "rgba(255,255,255,0.01)",
              }}
            >
              <span
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  opacity: 0.35,
                }}
              >
                {value.tag}
              </span>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 400, margin: 0 }}>
                {value.title}
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  lineHeight: 1.7,
                  opacity: 0.6,
                  margin: 0,
                }}
              >
                {value.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ---- Team Grid ---- */}
      <section
        className="reveal"
        style={{
          padding: "4rem var(--page-pad, 2rem)",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <span
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            opacity: 0.4,
            display: "block",
            marginBottom: "2rem",
          }}
        >
          The Team
        </span>
        <TeamGrid />
      </section>

      {/* ---- Timeline ---- */}
      <section
        className="reveal"
        style={{
          padding: "4rem var(--page-pad, 2rem) 6rem",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <span
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            opacity: 0.4,
            display: "block",
            marginBottom: "2rem",
          }}
        >
          Milestones
        </span>
        <Timeline />
      </section>

      <Footer />
    </main>
  );
}
