"use client";
import { useRef, useEffect, useState } from "react";

type HeadingSegment = string | { em: string } | { br: true };

interface SplitHeadingProps {
  as?: "h1" | "h2" | "h3";
  children: HeadingSegment[];
  className?: string;
  delay?: number;
  stagger?: number;
}

export function SplitHeading({
  as: Tag = "h2",
  children,
  className,
  delay = 0,
  stagger = 0.025,
}: SplitHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
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
  }, [delay]);

  let charIndex = 0;

  const renderSegment = (segment: HeadingSegment, segIdx: number) => {
    if (typeof segment === "object" && "br" in segment) {
      return <br key={`br-${segIdx}`} />;
    }

    const text = typeof segment === "string" ? segment : segment.em;
    const isEm = typeof segment === "object" && "em" in segment;
    const chars = text.split("");

    const rendered = chars.map((char) => {
      const idx = charIndex++;
      return (
        <span
          key={idx}
          aria-hidden="true"
          style={{
            display: "inline-block",
            opacity: revealed ? 1 : 0,
            clipPath: revealed
              ? "inset(0 0 0 0)"
              : "inset(0 0 100% 0)",
            transform: revealed ? "translateY(0)" : "translateY(100%)",
            transition: `opacity 0.5s ease ${idx * stagger}s, clip-path 0.5s ease ${idx * stagger}s, transform 0.5s ease ${idx * stagger}s`,
            whiteSpace: char === " " ? "pre" : undefined,
          }}
        >
          {char}
        </span>
      );
    });

    if (isEm) {
      return (
        <em key={`em-${segIdx}`} style={{ fontStyle: "italic" }}>
          {rendered}
        </em>
      );
    }

    return <span key={`seg-${segIdx}`}>{rendered}</span>;
  };

  // Build aria-label from segments
  const ariaLabel = children
    .map((seg) => {
      if (typeof seg === "string") return seg;
      if ("em" in seg) return seg.em;
      return "";
    })
    .join("");

  return (
    <Tag ref={ref} className={className} aria-label={ariaLabel}>
      {children.map(renderSegment)}
    </Tag>
  );
}
