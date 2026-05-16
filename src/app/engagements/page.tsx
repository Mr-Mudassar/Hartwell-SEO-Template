"use client";

import dynamic from "next/dynamic";
import { useReveal } from "@/hooks/useReveal";
import { useTransitionContext } from "@/components/layout/TransitionContext";
import { useMouseNorm } from "@/hooks/useMouseNorm";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/layout/Footer";
import { TIERS } from "@/lib/constants";

/* ---------- lazy-loaded components ---------- */
const SceneWrapper = dynamic(
  () => import("@/components/scenes/SceneWrapper").then((m) => m.SceneWrapper),
  { ssr: false }
);
const ParticleField = dynamic(
  () => import("@/components/scenes/ParticleField").then((m) => m.ParticleField),
  { ssr: false }
);
const PlanCard = dynamic(
  () => import("@/components/sections/PlanCard").then((m) => m.PlanCard),
  { ssr: false }
);
const CompareTable = dynamic(
  () => import("@/components/sections/CompareTable").then((m) => m.CompareTable),
  { ssr: false }
);
const FAQ = dynamic(
  () => import("@/components/sections/FAQ").then((m) => m.FAQ),
  { ssr: false }
);

/* ---------- SVG fallback ---------- */
function ParticleSVG() {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="currentColor"
      style={{ width: "100%", height: "100%", opacity: 0.15 }}
    >
      {Array.from({ length: 40 }).map((_, i) => (
        <circle
          key={i}
          cx={Math.random() * 400}
          cy={Math.random() * 300}
          r={Math.random() * 2 + 0.5}
        />
      ))}
    </svg>
  );
}

export default function EngagementsPage() {
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
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden",
          padding: "8rem var(--page-pad, 2rem) 4rem",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <SceneWrapper fallback={<ParticleSVG />}>
            <ParticleField mouseRef={mouseRef} />
          </SceneWrapper>
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "1400px",
            margin: "0 auto",
            width: "100%",
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
            Engagements
          </span>
          <h1
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 400,
              lineHeight: 1.05,
              margin: "1rem 0",
            }}
          >
            Engagement tiers.
          </h1>
          <p
            style={{
              maxWidth: "48ch",
              opacity: 0.6,
              lineHeight: 1.7,
              fontSize: "1.05rem",
            }}
          >
            Structured programs designed to compound. Choose the intensity that
            matches your growth ambition, or let us build something custom.
          </p>
        </div>
      </section>

      {/* ---- Plan Cards ---- */}
      <section
        style={{
          padding: "4rem var(--page-pad, 2rem)",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {TIERS.map((tier) => (
            <PlanCard
              key={tier.key}
              tier={{
                name: tier.name,
                subtitle: tier.sub,
                price: tier.price,
                blurb: tier.blurb,
                features: [...tier.features],
                featured: tier.featured,
              }}
              onContact={() => navigate("/contact")}
            />
          ))}
        </div>
      </section>

      {/* ---- Compare Table ---- */}
      <section
        className="reveal"
        style={{
          padding: "4rem var(--page-pad, 2rem)",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <CompareTable />
      </section>

      {/* ---- FAQ ---- */}
      <section
        className="reveal"
        style={{
          padding: "4rem var(--page-pad, 2rem)",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <FAQ />
      </section>

      {/* ---- Custom Retainer CTA ---- */}
      <section
        className="reveal"
        style={{
          padding: "6rem var(--page-pad, 2rem)",
          maxWidth: "1400px",
          margin: "0 auto",
          textAlign: "center",
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
          Custom Programs
        </span>
        <h2
          style={{
            fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
            fontWeight: 400,
            lineHeight: 1.15,
            margin: "1rem auto",
            maxWidth: "28ch",
          }}
        >
          Need something bespoke?
        </h2>
        <p
          style={{
            maxWidth: "50ch",
            margin: "0 auto 2rem",
            opacity: 0.6,
            lineHeight: 1.7,
          }}
        >
          Enterprise programs, multi-market rollouts, and custom retainers
          built around your specific growth objectives. Let&apos;s design it
          together.
        </p>
        <Button variant="solid" onClick={() => navigate("/contact")}>
          Start a conversation
        </Button>
      </section>

      <Footer />
    </main>
  );
}
