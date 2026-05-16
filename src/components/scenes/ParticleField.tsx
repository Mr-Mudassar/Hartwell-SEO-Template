// @ts-nocheck
"use client";
import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ---------- helpers ---------- */

function sampleTextPositions(text: string, count: number): Float32Array {
  const canvas = document.createElement("canvas");
  const w = 512;
  const h = 128;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#fff";
  ctx.font = "bold 72px Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, w / 2, h / 2);

  const imageData = ctx.getImageData(0, 0, w, h).data;
  const candidates: [number, number][] = [];

  for (let y = 0; y < h; y += 2) {
    for (let x = 0; x < w; x += 2) {
      const idx = (y * w + x) * 4;
      if (imageData[idx] > 128) {
        candidates.push([x, y]);
      }
    }
  }

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    if (candidates.length > 0) {
      const [px, py] = candidates[Math.floor(Math.random() * candidates.length)];
      // Map canvas coords to 3D: center at origin, scale down
      positions[i * 3] = (px / w - 0.5) * 6;
      positions[i * 3 + 1] = -(py / h - 0.5) * 1.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
    } else {
      positions[i * 3] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
    }
  }
  return positions;
}

function randomSpherePositions(count: number, minR: number, maxR: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const r = minR + Math.random() * (maxR - minR);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.cos(phi);
    positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
  }
  return positions;
}

/* ---------- main export ---------- */

const PARTICLE_COUNT = 1400;
const CYCLE_DURATION = 8; // seconds

export function ParticleField({
  mouseRef,
}: {
  mouseRef: React.RefObject<{ x: number; y: number }>;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const textTargets = useRef<Float32Array>(new Float32Array(PARTICLE_COUNT * 3));
  const ambientPositions = useRef<Float32Array>(
    randomSpherePositions(PARTICLE_COUNT, 4, 8)
  );
  const initialized = useRef(false);

  // Generate text target positions on mount (client-side only)
  useEffect(() => {
    textTargets.current = sampleTextPositions("ENGAGE", PARTICLE_COUNT);
    initialized.current = true;
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    // Start from ambient positions
    const startPositions = randomSpherePositions(PARTICLE_COUNT, 4, 8);
    geo.setAttribute("position", new THREE.BufferAttribute(startPositions, 3));
    return geo;
  }, []);

  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      color: "#C8A567",
      size: 0.04,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current || !initialized.current) return;

    const t = clock.getElapsedTime();
    const cycleT = (t % CYCLE_DURATION) / CYCLE_DURATION; // 0..1

    const posAttr = pointsRef.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    const pos = posAttr.array as Float32Array;
    const target = textTargets.current;
    const ambient = ambientPositions.current;

    // Animation phases:
    // 0-0.35: form text (lerp from ambient to text)
    // 0.35-0.60: hold text
    // 0.60-1.0: disperse back to ambient
    let mixFactor: number;
    if (cycleT < 0.35) {
      // forming: ease in
      const p = cycleT / 0.35;
      mixFactor = p * p * (3 - 2 * p); // smoothstep
    } else if (cycleT < 0.60) {
      mixFactor = 1;
    } else {
      // dispersing: ease out
      const p = (cycleT - 0.60) / 0.40;
      mixFactor = 1 - p * p * (3 - 2 * p);
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      pos[i3] = ambient[i3] + (target[i3] - ambient[i3]) * mixFactor;
      pos[i3 + 1] = ambient[i3 + 1] + (target[i3 + 1] - ambient[i3 + 1]) * mixFactor;
      pos[i3 + 2] = ambient[i3 + 2] + (target[i3 + 2] - ambient[i3 + 2]) * mixFactor;
    }

    posAttr.needsUpdate = true;

    // Mouse parallax on the Points object rotation
    const mouse = mouseRef.current;
    if (mouse) {
      pointsRef.current.rotation.y += (mouse.x * 0.15 - pointsRef.current.rotation.y) * 0.02;
      pointsRef.current.rotation.x += (mouse.y * 0.08 - pointsRef.current.rotation.x) * 0.02;
    }
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}
