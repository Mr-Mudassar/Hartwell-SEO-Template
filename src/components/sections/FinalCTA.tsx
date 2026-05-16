"use client";
import { GradientMesh } from "@/components/ui/GradientMesh";
import { Magnetic } from "@/components/ui/Magnetic";
import { Button } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <section
      style={{
        position: "relative",
        padding: "8rem var(--page-pad, 2rem)",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <GradientMesh />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "800px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
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
          Engagements by application
        </span>

        <h2
          style={{
            fontSize: "clamp(2rem, 4vw, 3.25rem)",
            fontWeight: 400,
            margin: 0,
            lineHeight: 1.15,
          }}
        >
          Ready to make organic search a{" "}
          <em style={{ fontStyle: "italic" }}>measurable</em> line item?
        </h2>

        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <Magnetic>
            <Button variant="solid">Start a project</Button>
          </Magnetic>
          <Magnetic>
            <Button variant="ghost">View pricing</Button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
