"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { useReveal } from "@/hooks/useReveal";
import { useTransitionContext } from "@/components/layout/TransitionContext";
import { useMouseNorm } from "@/hooks/useMouseNorm";
import { Footer } from "@/components/layout/Footer";
import { CASES } from "@/lib/constants";

/* ---------- lazy-loaded components ---------- */
const SceneWrapper = dynamic(
  () => import("@/components/scenes/SceneWrapper").then((m) => m.SceneWrapper),
  { ssr: false }
);
const MetricSphere = dynamic(
  () => import("@/components/scenes/MetricSphere").then((m) => m.MetricSphere),
  { ssr: false }
);
const CaseCard = dynamic(
  () => import("@/components/sections/CaseCard").then((m) => m.CaseCard),
  { ssr: false }
);

/* ---------- category constants ---------- */
const CATEGORIES = ["All", "D2C", "B2B SaaS", "E-com", "Fintech", "Health"] as const;

/* ---------- SVG fallback ---------- */
function SphereSVG() {
  return (
    <svg
      viewBox="0 0 300 300"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.5"
      style={{ width: "100%", height: "100%", opacity: 0.2 }}
    >
      <circle cx="150" cy="150" r="100" />
      <ellipse cx="150" cy="150" rx="100" ry="40" />
      <ellipse cx="150" cy="150" rx="40" ry="100" />
    </svg>
  );
}

export default function CaseStudiesPage() {
  useReveal();
  const mouseRef = useMouseNorm();
  const { navigate } = useTransitionContext();
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? CASES
        : CASES.filter((c) => c.v === activeCategory),
    [activeCategory]
  );

  return (
    <main>
      {/* ---- Hero ---- */}
      <section
        className="reveal"
        style={{
          position: "relative",
          minHeight: "60vh",
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
              Case Studies
            </span>
            <h1
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                fontWeight: 400,
                lineHeight: 1.05,
                margin: 0,
              }}
            >
              Selected work.
            </h1>
            <p
              style={{
                maxWidth: "42ch",
                opacity: 0.6,
                lineHeight: 1.7,
                fontSize: "1.05rem",
              }}
            >
              Measurable outcomes across industries. Each engagement is
              engineered around a clear thesis, executed with precision, and
              reported with transparency.
            </p>
          </div>

          <div style={{ position: "relative", aspectRatio: "1", width: "100%" }}>
            <SceneWrapper fallback={<SphereSVG />} camera={{ position: [0, 0, 4], fov: 42 }}>
              <MetricSphere mouseRef={mouseRef} />
            </SceneWrapper>
          </div>
        </div>
      </section>

      {/* ---- Category Filters ---- */}
      <section
        style={{
          padding: "0 var(--page-pad, 2rem) 2rem",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "0.5rem 1.25rem",
                fontSize: "0.8rem",
                letterSpacing: "0.05em",
                border: "1px solid",
                borderColor:
                  activeCategory === cat
                    ? "var(--color-gold, #c9a84c)"
                    : "rgba(255,255,255,0.12)",
                background:
                  activeCategory === cat
                    ? "rgba(201,168,76,0.1)"
                    : "transparent",
                color:
                  activeCategory === cat
                    ? "var(--color-gold, #c9a84c)"
                    : "rgba(255,255,255,0.6)",
                borderRadius: "2rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ---- Masonry Grid ---- */}
      <section
        style={{
          padding: "2rem var(--page-pad, 2rem) 4rem",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
          }}
        >
          {filtered.map((caseItem, i) => (
            <CaseCard
              key={caseItem.c}
              c={caseItem.c}
              v={caseItem.v}
              m={caseItem.m}
              k={caseItem.k}
              h={caseItem.h}
              index={i}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <p
            style={{
              textAlign: "center",
              opacity: 0.4,
              padding: "4rem 0",
              fontSize: "0.9rem",
            }}
          >
            No case studies in this category yet.
          </p>
        )}
      </section>

      <Footer />
    </main>
  );
}
