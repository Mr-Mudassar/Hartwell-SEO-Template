"use client";

import { useEffect, useRef, useState } from "react";

export function Loader() {
  const [count, setCount] = useState(0);
  const [gone, setGone] = useState(false);
  const [hidden, setHidden] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (count === 100) {
      const timer = setTimeout(() => {
        setGone(true);
        window.dispatchEvent(new CustomEvent("appReady"));

        setTimeout(() => {
          setHidden(true);
        }, 800);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [count]);

  if (hidden) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--color-bg, #0a0a0a)",
        transition: "transform 0.8s cubic-bezier(0.77, 0, 0.175, 1)",
        transform: gone ? "translateY(-100%)" : "translateY(0)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "72px",
            height: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              fontWeight: 500,
              color: "#fff",
              letterSpacing: "-0.02em",
            }}
          >
            H.
          </span>
          <div
            style={{
              position: "absolute",
              inset: "-2px",
              borderRadius: "50%",
              border: "2px solid transparent",
              borderTopColor: "var(--color-gold, #c9a84c)",
              animation: "spin 1s linear infinite",
            }}
          />
        </div>
        <div
          style={{
            fontSize: "0.75rem",
            fontFamily: "var(--font-mono, monospace)",
            color: "rgba(255, 255, 255, 0.5)",
            letterSpacing: "0.15em",
          }}
        >
          {String(count).padStart(3, "0")}
        </div>
      </div>
    </div>
  );
}
