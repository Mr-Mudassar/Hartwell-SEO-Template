"use client";

import dynamic from "next/dynamic";
import { useReveal } from "@/hooks/useReveal";
import { useMouseNorm } from "@/hooks/useMouseNorm";
import { useTransitionContext } from "@/components/layout/TransitionContext";
import { Hero } from "@/components/sections/Hero";
import { MarqueeBand } from "@/components/sections/MarqueeBand";
import { Pillars } from "@/components/sections/Pillars";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/layout/Footer";

/* ---------- lazy-loaded section components ---------- */
const Process = dynamic(
  () => import("@/components/sections/Process").then((m) => m.Process),
  { ssr: false }
);
const CaseShowcase = dynamic(
  () => import("@/components/sections/CaseShowcase").then((m) => m.CaseShowcase),
  { ssr: false }
);
const Testimonials = dynamic(
  () => import("@/components/sections/Testimonials").then((m) => m.Testimonials),
  { ssr: false }
);
const InsightsPreview = dynamic(
  () => import("@/components/sections/InsightsPreview").then((m) => m.InsightsPreview),
  { ssr: false }
);
const FinalCTA = dynamic(
  () => import("@/components/sections/FinalCTA").then((m) => m.FinalCTA),
  { ssr: false }
);

/* ---------- 3-D scenes ---------- */
const SceneWrapper = dynamic(
  () => import("@/components/scenes/SceneWrapper").then((m) => m.SceneWrapper),
  { ssr: false }
);
const LinkGraphScene = dynamic(
  () => import("@/components/scenes/LinkGraph").then((m) => m.LinkGraph),
  { ssr: false }
);

/* ---------- SVG fallback for LinkGraph ---------- */
function LinkGraphSVG() {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.5"
      style={{ width: "100%", height: "100%", opacity: 0.3 }}
    >
      <circle cx="200" cy="200" r="80" />
      <circle cx="120" cy="120" r="30" />
      <circle cx="280" cy="140" r="25" />
      <circle cx="300" cy="280" r="35" />
      <circle cx="100" cy="300" r="20" />
      <line x1="200" y1="200" x2="120" y2="120" />
      <line x1="200" y1="200" x2="280" y2="140" />
      <line x1="200" y1="200" x2="300" y2="280" />
      <line x1="200" y1="200" x2="100" y2="300" />
    </svg>
  );
}

export default function HomePage() {
  useReveal();
  const mouseRef = useMouseNorm();
  const { navigate } = useTransitionContext();

  return (
    <main className="home">
      <Hero />
      <MarqueeBand />
      <Pillars />
      <Process />
      <CaseShowcase />

      {/* ---- Authority Graph Section ---- */}
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
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <span
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                opacity: 0.4,
              }}
            >
              03 / Authority
            </span>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 400,
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              Authority compounds.
            </h2>
            <p
              style={{
                maxWidth: "42ch",
                opacity: 0.6,
                lineHeight: 1.7,
                fontSize: "1rem",
              }}
            >
              Every high-relevance placement strengthens the next. Our link
              acquisition and digital PR programs build domain trust that
              accelerates ranking velocity across your entire keyword footprint.
            </p>
            <div>
              <Button variant="ghost" onClick={() => navigate("/services")}>
                Explore authority building
              </Button>
            </div>
          </div>

          <div style={{ position: "relative", aspectRatio: "1", width: "100%" }}>
            <SceneWrapper fallback={<LinkGraphSVG />} camera={{ position: [0, 0, 6], fov: 45 }}>
              <LinkGraphScene mouseRef={mouseRef} />
            </SceneWrapper>
          </div>
        </div>
      </section>

      <Testimonials />
      <InsightsPreview />
      <FinalCTA />
      <Footer />
    </main>
  );
}
