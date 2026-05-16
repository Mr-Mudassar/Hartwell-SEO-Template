"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);
  const [isActive, setIsActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-active]")) {
        setIsActive(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-active]")) {
        setIsActive(false);
      }
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      ringPos.current.x = lerp(ringPos.current.x, mouse.current.x, 0.16);
      ringPos.current.y = lerp(ringPos.current.y, mouse.current.y, 0.16);

      if (ringRef.current) {
        const size = isActive ? 52 : 32;
        const offset = size / 2;
        ringRef.current.style.transform = `translate(${ringPos.current.x - offset}px, ${ringPos.current.y - offset}px)`;
        ringRef.current.style.width = `${size}px`;
        ringRef.current.style.height = `${size}px`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(rafId.current);
    };
  }, [isMobile, isActive]);

  if (isMobile) return null;

  return (
    <>
      <div className="custom-cursor-dot" ref={dotRef} />
      <div
        className={`custom-cursor-ring${isActive ? " active" : ""}`}
        ref={ringRef}
      />
      <style jsx>{`
        .custom-cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 6px;
          height: 6px;
          background: #fff;
          border-radius: 50%;
          pointer-events: none;
          z-index: 10001;
          will-change: transform;
        }

        .custom-cursor-ring {
          position: fixed;
          top: 0;
          left: 0;
          width: 32px;
          height: 32px;
          border: 1.5px solid var(--color-gold, #c9a84c);
          border-radius: 50%;
          pointer-events: none;
          z-index: 10000;
          will-change: transform, width, height;
          transition: width 0.3s ease, height 0.3s ease,
            background-color 0.3s ease;
          background-color: transparent;
        }

        .custom-cursor-ring.active {
          width: 52px;
          height: 52px;
          background-color: rgba(201, 168, 76, 0.1);
        }
      `}</style>
    </>
  );
}
