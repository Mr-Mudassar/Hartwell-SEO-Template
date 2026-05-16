"use client";
import { useRef, useEffect, useState } from "react";

interface FadeInProps {
  text: string;
  as?: "span" | "div";
  className?: string;
  trigger?: "view" | "mount";
  delay?: number;
  stagger?: number;
}

export function FadeIn({
  text,
  as: Tag = "span",
  className,
  trigger = "view",
  delay = 0,
  stagger = 0.03,
}: FadeInProps) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (trigger === "mount") {
      const timeout = setTimeout(() => setRevealed(true), delay * 1000);
      return () => clearTimeout(timeout);
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setRevealed(true), delay * 1000);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [trigger, delay]);

  const chars = text.split("");

  return (
    <Tag ref={ref as React.RefObject<HTMLElement & HTMLSpanElement & HTMLDivElement>} className={className} aria-label={text}>
      {chars.map((char, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            display: "inline-block",
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(0.3em)",
            transition: `opacity 0.4s ease ${i * stagger}s, transform 0.4s ease ${i * stagger}s`,
            whiteSpace: char === " " ? "pre" : undefined,
          }}
        >
          {char}
        </span>
      ))}
    </Tag>
  );
}
