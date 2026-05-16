"use client";
import { useRef, useEffect } from "react";

interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export function Magnetic({ children, strength = 0.3, className }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      target.current.x = (e.clientX - cx) * strength;
      target.current.y = (e.clientY - cy) * strength;
    };

    const handleMouseLeave = () => {
      target.current.x = 0;
      target.current.y = 0;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.1);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.1);
      el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      raf.current = requestAnimationFrame(animate);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    raf.current = requestAnimationFrame(animate);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(raf.current);
    };
  }, [strength]);

  return (
    <span ref={ref} className={className} style={{ display: "inline-block" }}>
      {children}
    </span>
  );
}
