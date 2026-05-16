"use client";
import { useRef, useEffect, useState } from "react";

interface SectionDividerProps {
  label?: string;
  className?: string;
}

export function SectionDivider({ label, className }: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{ position: "relative", padding: "1rem 0" }}
    >
      <hr
        style={{
          border: "none",
          height: "1px",
          background: "currentColor",
          opacity: 0.15,
          width: visible ? "100%" : "0%",
          transition: "width 1s cubic-bezier(0.16, 1, 0.3, 1)",
          margin: 0,
        }}
      />
      {label && (
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "var(--background, #0a0a0a)",
            padding: "0 1rem",
            fontSize: "0.75rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            opacity: visible ? 0.5 : 0,
            transition: "opacity 0.6s ease 0.4s",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
