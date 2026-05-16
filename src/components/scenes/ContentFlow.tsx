// @ts-nocheck
"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

/* ---------- constants ---------- */

const PLANE_W = 6;
const PLANE_H = 4;
const SEGMENTS = 36;
const PAGE_COUNT = 7;

/* ---------- sub-components ---------- */

function WireframePlane() {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(PLANE_W, PLANE_H, SEGMENTS, SEGMENTS);
    geo.rotateX(-Math.PI / 2);
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    const posAttr = meshRef.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < posAttr.count; i++) {
      const x = arr[i * 3];
      const z = arr[i * 3 + 2];
      arr[i * 3 + 1] =
        Math.sin(x * 1.2 + t * 0.8) * 0.08 +
        Math.cos(z * 1.5 + t * 0.6) * 0.06 +
        Math.sin((x + z) * 0.8 + t * 1.1) * 0.04;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshBasicMaterial color="#2A2F38" wireframe transparent opacity={0.35} />
    </mesh>
  );
}

interface PageData {
  width: number;
  height: number;
  x: number;
  z: number;
  speed: number;
  yOffset: number;
  birthTime: number;
}

function DriftingPages() {
  const pagesRef = useRef<PageData[]>(
    Array.from({ length: PAGE_COUNT }, () => createPage(Math.random() * 4))
  );
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  function createPage(birthTime: number): PageData {
    return {
      width: 0.25 + Math.random() * 0.35,
      height: 0.35 + Math.random() * 0.45,
      x: (Math.random() - 0.5) * 4,
      z: (Math.random() - 0.5) * 2.5,
      speed: 0.15 + Math.random() * 0.25,
      yOffset: -0.5,
      birthTime,
    };
  }

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    pagesRef.current.forEach((page, i) => {
      const mesh = meshRefs.current[i];
      if (!mesh) return;

      const age = t - page.birthTime;
      const lifecycle = 5; // seconds
      const cycleAge = age % lifecycle;

      // Y position: rise from -0.5 to 3.0
      const progress = cycleAge / lifecycle;
      const y = -0.5 + progress * 3.5;

      // Fade in/out
      let opacity = 1;
      if (progress < 0.15) opacity = progress / 0.15;
      else if (progress > 0.85) opacity = (1 - progress) / 0.15;

      mesh.position.set(page.x, y, page.z);
      mesh.rotation.x = -0.2 + Math.sin(t * 0.5 + i) * 0.1;
      mesh.rotation.y = Math.sin(t * 0.3 + i * 1.5) * 0.15;

      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = opacity * 0.5;
    });
  });

  return (
    <>
      {pagesRef.current.map((page, i) => (
        <mesh key={`page-${i}`} ref={(el) => { meshRefs.current[i] = el; }}>
          <planeGeometry args={[page.width, page.height]} />
          <meshBasicMaterial
            color="#C8A567"
            wireframe
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </>
  );
}

/* ---------- main export ---------- */

export function ContentFlow({
  mouseRef,
}: {
  mouseRef: React.RefObject<{ x: number; y: number }>;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const mouse = mouseRef.current;
    if (mouse) {
      groupRef.current.rotation.y += (mouse.x * 0.1 - groupRef.current.rotation.y) * 0.02;
      groupRef.current.rotation.x += (mouse.y * 0.06 - groupRef.current.rotation.x) * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      <WireframePlane />
      <DriftingPages />
    </group>
  );
}
