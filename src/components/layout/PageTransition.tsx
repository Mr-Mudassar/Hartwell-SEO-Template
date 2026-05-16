"use client";

import { useRef, useEffect, useState } from "react";
import { useTransitionContext } from "./TransitionContext";

export function PageTransition() {
  const { isTransitioning, targetLabel } = useTransitionContext();
  const [phase, setPhase] = useState<"idle" | "enter" | "exit">("idle");
  const prevTransitioning = useRef(false);

  useEffect(() => {
    if (isTransitioning && !prevTransitioning.current) {
      // Ensure panels are at start position before animating in
      setPhase("idle");
      // Use rAF to guarantee the idle (no-transition) frame renders first
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPhase("enter");
        });
      });
    } else if (!isTransitioning && prevTransitioning.current) {
      setPhase("exit");
    }
    prevTransitioning.current = isTransitioning;
  }, [isTransitioning]);

  const getTransform = () => {
    switch (phase) {
      case "idle":
        return "translateX(-105%) skewX(-5deg)";
      case "enter":
        return "translateX(0%) skewX(0deg)";
      case "exit":
        return "translateX(105%) skewX(-5deg)";
    }
  };

  const getTransition = () => {
    switch (phase) {
      case "idle":
        return "none";
      case "enter":
        return "transform 0.52s cubic-bezier(0.77, 0, 0.175, 1)";
      case "exit":
        return "transform 0.58s cubic-bezier(0.77, 0, 0.175, 1)";
    }
  };

  const panelBase: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    transformOrigin: "left center",
    transition: getTransition(),
    transform: getTransform(),
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9998,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <div style={{ ...panelBase, background: "#111", zIndex: 1 }} />
      <div
        style={{
          ...panelBase,
          background: "var(--color-bg, #0a0a0a)",
          zIndex: 2,
          transitionDelay: phase === "idle" ? "0s" : "0.04s",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          zIndex: 3,
          opacity: phase === "enter" ? 1 : 0,
          transition: phase === "idle" ? "none" : "opacity 0.2s ease",
          transitionDelay: phase === "enter" ? "0.25s" : "0s",
        }}
      >
        <span
          style={{
            fontSize: "0.6875rem",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "rgba(255, 255, 255, 0.4)",
          }}
        >
          Loading
        </span>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.25rem",
            color: "#fff",
            fontWeight: 500,
            textTransform: "capitalize",
          }}
        >
          {targetLabel}
        </span>
      </div>
    </div>
  );
}
