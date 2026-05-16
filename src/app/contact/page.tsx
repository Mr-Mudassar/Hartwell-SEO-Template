"use client";

import dynamic from "next/dynamic";
import { useReveal } from "@/hooks/useReveal";
import { useTransitionContext } from "@/components/layout/TransitionContext";
import { useMouseNorm } from "@/hooks/useMouseNorm";

/* ---------- lazy-loaded components ---------- */
const SceneWrapper = dynamic(
  () => import("@/components/scenes/SceneWrapper").then((m) => m.SceneWrapper),
  { ssr: false }
);
const EnvelopeScene = dynamic(
  () => import("@/components/scenes/EnvelopeScene").then((m) => m.EnvelopeScene),
  { ssr: false }
);
const ContactForm = dynamic(
  () => import("@/components/sections/ContactForm").then((m) => m.ContactForm),
  { ssr: false }
);

/* ---------- SVG fallback ---------- */
function EnvelopeSVG() {
  return (
    <svg
      viewBox="0 0 200 150"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      style={{ width: "100%", maxWidth: "200px", opacity: 0.2 }}
    >
      <rect x="10" y="30" width="180" height="110" rx="4" />
      <polyline points="10,30 100,90 190,30" />
    </svg>
  );
}

export default function ContactPage() {
  useReveal();
  const mouseRef = useMouseNorm();
  const { navigate } = useTransitionContext();

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
      }}
    >
      {/* ---- Left Aside ---- */}
      <aside
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "6rem var(--page-pad, 2rem)",
          borderRight: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {/* Envelope 3D scene */}
          <div style={{ width: "140px", height: "120px", position: "relative" }}>
            <SceneWrapper fallback={<EnvelopeSVG />}>
              <EnvelopeScene mouseRef={mouseRef} />
            </SceneWrapper>
          </div>

          <h1
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 400,
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            Let&apos;s talk.
          </h1>

          <p
            style={{
              maxWidth: "36ch",
              opacity: 0.6,
              lineHeight: 1.7,
              fontSize: "1rem",
            }}
          >
            Tell us about your organic search goals. We&apos;ll respond within
            one business day with an honest assessment of how we can help.
          </p>

          {/* Contact details */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              marginTop: "1rem",
            }}
          >
            <div>
              <span
                style={{
                  display: "block",
                  fontSize: "0.7rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  opacity: 0.35,
                  marginBottom: "0.25rem",
                }}
              >
                Email
              </span>
              <a
                href="mailto:hello@hartwellseo.com"
                style={{ color: "inherit", textDecoration: "none", fontSize: "0.95rem" }}
              >
                hello@hartwellseo.com
              </a>
            </div>

            <div>
              <span
                style={{
                  display: "block",
                  fontSize: "0.7rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  opacity: 0.35,
                  marginBottom: "0.25rem",
                }}
              >
                Studio
              </span>
              <span style={{ fontSize: "0.95rem", opacity: 0.7 }}>
                New York, NY
              </span>
            </div>

            <div>
              <span
                style={{
                  display: "block",
                  fontSize: "0.7rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  opacity: 0.35,
                  marginBottom: "0.25rem",
                }}
              >
                Hours
              </span>
              <span style={{ fontSize: "0.95rem", opacity: 0.7 }}>
                Mon &ndash; Fri, 9am &ndash; 6pm EST
              </span>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            opacity: 0.3,
            marginTop: "3rem",
          }}
        >
          Engagements by application only.
        </p>
      </aside>

      {/* ---- Right: Contact Form ---- */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "6rem var(--page-pad, 2rem)",
        }}
      >
        <ContactForm />
      </div>
    </main>
  );
}
