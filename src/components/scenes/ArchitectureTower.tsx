// @ts-nocheck
"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

/* ---------- constants ---------- */

const TIER_LEVELS = [2.4, 1.6, 0.8, 0.0, -0.8, -1.6];
const TIER_RADII = [0.55, 0.85, 1.15, 1.45, 1.75, 2.05];

/* ---------- sub-components ---------- */

function TierRing({ y, radius }: { y: number; radius: number }) {
  const half = radius;
  const corners: [number, number, number][] = [
    [-half, y, -half],
    [half, y, -half],
    [half, y, half],
    [-half, y, half],
    [-half, y, -half], // close
  ];

  const cross1: [number, number, number][] = [
    [-half, y, -half],
    [half, y, half],
  ];
  const cross2: [number, number, number][] = [
    [half, y, -half],
    [-half, y, half],
  ];

  return (
    <>
      <Line points={corners} color="#2A2F38" lineWidth={1.2} transparent opacity={0.55} />
      <Line points={cross1} color="#2A2F38" lineWidth={0.8} transparent opacity={0.25} />
      <Line points={cross2} color="#2A2F38" lineWidth={0.8} transparent opacity={0.25} />
    </>
  );
}

function VerticalEdges() {
  const edges = useMemo(() => {
    const result: [number, number, number][][] = [];
    // 4 corners
    for (let cx = 0; cx < 4; cx++) {
      const signs: [number, number][] = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
      const [sx, sz] = signs[cx];
      const pts: [number, number, number][] = TIER_LEVELS.map((y, i) => {
        const r = TIER_RADII[i];
        return [sx * r, y, sz * r] as [number, number, number];
      });
      result.push(pts);
    }
    return result;
  }, []);

  return (
    <>
      {edges.map((pts, i) => (
        <Line key={`edge-${i}`} points={pts} color="#2A2F38" lineWidth={1} transparent opacity={0.4} />
      ))}
    </>
  );
}

function CentralSpine() {
  const spinePoints: [number, number, number][] = [
    [0, TIER_LEVELS[0] + 0.3, 0],
    [0, TIER_LEVELS[TIER_LEVELS.length - 1] - 0.2, 0],
  ];

  return (
    <Line points={spinePoints} color="#C8A567" lineWidth={1.5} transparent opacity={0.6} />
  );
}

function PulseSpheres() {
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const count = 5;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const topY = TIER_LEVELS[0] + 0.3;
    const botY = TIER_LEVELS[TIER_LEVELS.length - 1] - 0.2;
    const range = topY - botY;

    for (let i = 0; i < count; i++) {
      const mesh = meshRefs.current[i];
      if (!mesh) continue;
      const phase = (i / count + t * 0.15) % 1;
      mesh.position.y = topY - phase * range;
      const mat = mesh.material as THREE.MeshBasicMaterial;
      // fade near edges
      const edgeDist = Math.min(phase, 1 - phase) * 2;
      mat.opacity = Math.min(edgeDist, 1) * 0.9;
    }
  });

  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <mesh key={`pulse-${i}`} ref={(el) => { meshRefs.current[i] = el; }}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#C8A567" transparent opacity={0.8} />
        </mesh>
      ))}
    </>
  );
}

function GoldCap() {
  return (
    <mesh position={[0, TIER_LEVELS[0] + 0.35, 0]}>
      <sphereGeometry args={[0.07, 12, 12]} />
      <meshBasicMaterial color="#C8A567" />
    </mesh>
  );
}

/* ---------- main export ---------- */

export function ArchitectureTower({
  mouseRef,
}: {
  mouseRef: React.RefObject<{ x: number; y: number }>;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += 0.0035;
    const mouse = mouseRef.current;
    if (mouse) {
      groupRef.current.rotation.x += (mouse.y * 0.1 - groupRef.current.rotation.x) * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {TIER_LEVELS.map((y, i) => (
        <TierRing key={`tier-${i}`} y={y} radius={TIER_RADII[i]} />
      ))}
      <VerticalEdges />
      <CentralSpine />
      <PulseSpheres />
      <GoldCap />
    </group>
  );
}
