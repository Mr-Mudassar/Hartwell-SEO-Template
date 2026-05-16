"use client";

import dynamic from "next/dynamic";
import { useReveal } from "@/hooks/useReveal";
import { useTransitionContext } from "@/components/layout/TransitionContext";
import { useMouseNorm } from "@/hooks/useMouseNorm";
import { Footer } from "@/components/layout/Footer";

/* ---------- lazy-loaded components ---------- */
const SceneWrapper = dynamic(
  () => import("@/components/scenes/SceneWrapper").then((m) => m.SceneWrapper),
  { ssr: false }
);
const ArchitectureTower = dynamic(
  () =>
    import("@/components/scenes/ArchitectureTower").then(
      (m) => m.ArchitectureTower
    ),
  { ssr: false }
);
const ContentFlow = dynamic(
  () => import("@/components/scenes/ContentFlow").then((m) => m.ContentFlow),
  { ssr: false }
);
const ServiceGrid = dynamic(
  () => import("@/components/sections/ServiceGrid").then((m) => m.ServiceGrid),
  { ssr: false }
);

/* ---------- SVG fallbacks ---------- */
function TowerSVG() {
  return (
    <svg
      viewBox="0 0 300 400"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.5"
      style={{ width: "100%", height: "100%", opacity: 0.2 }}
    >
      <rect x="80" y="300" width="140" height="60" />
      <rect x="95" y="220" width="110" height="80" />
      <rect x="110" y="140" width="80" height="80" />
      <rect x="125" y="60" width="50" height="80" />
      <line x1="150" y1="60" x2="150" y2="20" />
    </svg>
  );
}

function FlowSVG() {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.5"
      style={{ width: "100%", height: "100%", opacity: 0.2 }}
    >
      <path d="M40 150 Q100 80 200 150 T360 150" />
      <circle cx="40" cy="150" r="6" />
      <circle cx="200" cy="150" r="6" />
      <circle cx="360" cy="150" r="6" />
    </svg>
  );
}

export default function ServicesPage() {
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
              Services
            </span>
            <h1
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                fontWeight: 400,
                lineHeight: 1.05,
                margin: 0,
              }}
            >
              Disciplines, not deliverables.
            </h1>
            <p
              style={{
                maxWidth: "42ch",
                opacity: 0.6,
                lineHeight: 1.7,
                fontSize: "1.05rem",
              }}
            >
              We don&apos;t sell line items. We build integrated programs across
              technical architecture, content strategy, and authority
              development — each reinforcing the others.
            </p>
          </div>

          <div style={{ position: "relative", aspectRatio: "1", width: "100%" }}>
            <SceneWrapper fallback={<TowerSVG />} camera={{ position: [0, 0.5, 5.5], fov: 42 }}>
              <ArchitectureTower mouseRef={mouseRef} />
            </SceneWrapper>
          </div>
        </div>
      </section>

      {/* ---- Content Velocity ---- */}
      <section
        className="reveal"
        style={{
          padding: "6rem var(--page-pad, 2rem)",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          <div style={{ position: "relative", aspectRatio: "4/3", width: "100%" }}>
            <SceneWrapper fallback={<FlowSVG />} camera={{ position: [0, 2, 4], fov: 42 }}>
              <ContentFlow mouseRef={mouseRef} />
            </SceneWrapper>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <span
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                opacity: 0.4,
              }}
            >
              Content Velocity
            </span>
            <h2
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
                fontWeight: 400,
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              Velocity without volume.
            </h2>
            <p
              style={{
                maxWidth: "42ch",
                opacity: 0.6,
                lineHeight: 1.7,
                fontSize: "1rem",
              }}
            >
              Publishing more isn&apos;t the answer. Our content programs
              prioritize topical depth, semantic structure, and user-intent
              alignment to build authority that ranks and converts.
            </p>
          </div>
        </div>
      </section>

      {/* ---- Service Grid (8 cards, 4x2) ---- */}
      <section
        className="reveal"
        style={{
          padding: "4rem var(--page-pad, 2rem)",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <ServiceGrid />
      </section>

      <Footer />
    </main>
  );
}
