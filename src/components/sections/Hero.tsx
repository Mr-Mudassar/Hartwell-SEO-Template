"use client";
import dynamic from "next/dynamic";
import { GradientMesh } from "@/components/ui/GradientMesh";
import { FadeIn } from "@/components/ui/FadeIn";
import { Magnetic } from "@/components/ui/Magnetic";
import { Button } from "@/components/ui/Button";
import { useMouseNorm } from "@/hooks/useMouseNorm";
import { GlobeSVG } from "@/components/scenes/GlobeSVG";

const SceneWrapper = dynamic(
  () => import("@/components/scenes/SceneWrapper").then((m) => m.SceneWrapper),
  { ssr: false }
);
const Globe = dynamic(
  () => import("@/components/scenes/Globe").then((m) => m.Globe),
  { ssr: false }
);

export function Hero() {
  const mouse = useMouseNorm();

  return (
    <section
      className="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <GradientMesh />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          gap: "4rem",
          padding: "0 var(--page-pad, 2rem)",
          maxWidth: "1400px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Left Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <span
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                opacity: 0.5,
                borderRight: "1px solid rgba(255,255,255,0.15)",
                paddingRight: "1rem",
              }}
            >
              Technical SEO
            </span>
            <span
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                opacity: 0.5,
              }}
            >
              Hartwell &middot; Est. 2019
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)",
              lineHeight: 1.05,
              fontWeight: 400,
              margin: 0,
            }}
          >
            <FadeIn text="Search performance," trigger="mount" delay={0.2} />
            <br />
            <FadeIn
              text="engineered."
              trigger="mount"
              delay={0.6}
              className="text-em"
            />
          </h1>

          <p
            style={{
              maxWidth: "36ch",
              opacity: 0.6,
              lineHeight: 1.6,
              fontSize: "1.05rem",
            }}
          >
            We architect organic search systems that compound — turning
            technical precision into measurable revenue growth.
          </p>

          <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
            <Magnetic>
              <Button variant="solid">Start a project</Button>
            </Magnetic>
            <Magnetic>
              <Button variant="ghost">View case studies</Button>
            </Magnetic>
          </div>
        </div>

        {/* Right Column — Globe */}
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "1",
            maxWidth: "560px",
            justifySelf: "end",
          }}
        >
          <SceneWrapper
            fallback={<GlobeSVG />}
            className="w-full h-full"
            camera={{ position: [0, 0, 3.4], fov: 38 }}
          >
            <Globe mouseRef={mouse} />
          </SceneWrapper>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.25rem var(--page-pad, 2rem)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          fontSize: "0.7rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          opacity: 0.45,
        }}
      >
        <span>FIG. 01 &middot; GLOBAL SEARCH DEMAND, REAL-TIME</span>
        <span>SCROLL &darr;</span>
      </div>
    </section>
  );
}
