"use client";
import { useState, useEffect } from "react";

export function useShouldRender3D(): boolean {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Check WebGL support
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (gl) setOk(true);
    } catch {
      // no WebGL
    }
  }, []);
  return ok;
}
