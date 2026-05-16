// @ts-nocheck
"use client";
import { useRef, useMemo, useState, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

/* ---------- constants ---------- */

const LABEL_DATA = [
  "+312% organic revenue",
  "$47M attributed pipeline",
  "1.2M monthly visits",
  "94% engagement renewal",
];

/* ---------- helpers ---------- */

function latRingPoints(latDeg: number, segments = 64): [number, number, number][] {
  const lat = (latDeg * Math.PI) / 180;
  const r = Math.cos(lat);
  const y = Math.sin(lat);
  const pts: [number, number, number][] = [];
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    pts.push([r * Math.cos(theta), y, r * Math.sin(theta)]);
  }
  return pts;
}

/* ---------- sub-components ---------- */

function LatitudeRings() {
  const rings = useMemo(() => {
    const result: { pts: [number, number, number][]; isEquator: boolean }[] = [];
    for (let lat = -75; lat <= 75; lat += 10) {
      result.push({
        pts: latRingPoints(lat),
        isEquator: lat === 0,
      });
    }
    return result;
  }, []);

  return (
    <>
      {rings.map((ring, i) => (
        <Line
          key={`lat-${i}`}
          points={ring.pts}
          color={ring.isEquator ? "#C8A567" : "#2A2F38"}
          lineWidth={ring.isEquator ? 2 : 1}
          transparent
          opacity={ring.isEquator ? 0.8 : 0.4}
        />
      ))}
    </>
  );
}

function InnerCore() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    const s = 1 + 0.12 * Math.sin(t * 0.8);
    meshRef.current.scale.setScalar(s);
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.32, 16, 16]} />
        <meshBasicMaterial color="#C8A567" transparent opacity={0.9} />
      </mesh>
      {/* glow shell */}
      <mesh>
        <sphereGeometry args={[0.45, 16, 16]} />
        <meshBasicMaterial color="#C8A567" transparent opacity={0.12} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

/* ---------- main export ---------- */

export interface LabelAnchor {
  x: number;
  y: number;
  text: string;
  visible: boolean;
}

export function MetricSphere({
  mouseRef,
  onLabelsUpdate,
}: {
  mouseRef: React.RefObject<{ x: number; y: number }>;
  onLabelsUpdate?: (labels: LabelAnchor[]) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera, size } = useThree();
  const isDragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });

  // Label anchor 3D positions (orbiting at r=1.85)
  const labelAnchors = useMemo(() => {
    return LABEL_DATA.map((text, i) => {
      const angle = (i / LABEL_DATA.length) * Math.PI * 2;
      return {
        text,
        baseAngle: angle,
        position: new THREE.Vector3(),
      };
    });
  }, []);

  const tempVec = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const t = clock.getElapsedTime();

    // Slow auto-rotation (only when not dragging)
    if (!isDragging.current) {
      groupRef.current.rotation.y += 0.003;
    }

    // Mouse parallax
    const mouse = mouseRef.current;
    if (mouse && !isDragging.current) {
      groupRef.current.rotation.x += (mouse.y * 0.1 - groupRef.current.rotation.x) * 0.015;
    }

    // Project label anchors to screen coordinates
    if (onLabelsUpdate) {
      const labels: LabelAnchor[] = labelAnchors.map((anchor) => {
        const angle = anchor.baseAngle + t * 0.2;
        const r = 1.85;
        const x3d = r * Math.cos(angle);
        const z3d = r * Math.sin(angle);
        const y3d = 0.3 * Math.sin(angle * 0.5);

        tempVec.set(x3d, y3d, z3d);
        // Apply group world matrix
        groupRef.current!.localToWorld(tempVec);

        // Project to NDC
        tempVec.project(camera);

        // Convert NDC to percentage
        const px = (tempVec.x * 0.5 + 0.5) * 100;
        const py = (-tempVec.y * 0.5 + 0.5) * 100;

        // Check if in front of camera
        const visible = tempVec.z < 1;

        return { x: px, y: py, text: anchor.text, visible };
      });

      onLabelsUpdate(labels);
    }
  });

  const onPointerDown = useCallback((e: THREE.Event) => {
    isDragging.current = true;
    const event = e as unknown as PointerEvent;
    lastPointer.current = { x: event.clientX, y: event.clientY };
  }, []);

  const onPointerMove = useCallback((e: THREE.Event) => {
    if (!isDragging.current || !groupRef.current) return;
    const event = e as unknown as PointerEvent;
    const dx = event.clientX - lastPointer.current.x;
    const dy = event.clientY - lastPointer.current.y;
    groupRef.current.rotation.y += dx * 0.005;
    groupRef.current.rotation.x += dy * 0.005;
    lastPointer.current = { x: event.clientX, y: event.clientY };
  }, []);

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <group
      ref={groupRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {/* invisible sphere for pointer events */}
      <mesh>
        <sphereGeometry args={[2, 16, 16]} />
        <meshBasicMaterial visible={false} />
      </mesh>
      <LatitudeRings />
      <InnerCore />
    </group>
  );
}

/* ---------- label overlay component ---------- */

export function MetricSphereLabels({ labels }: { labels: LabelAnchor[] }) {
  return (
    <>
      {labels.map((label, i) =>
        label.visible ? (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${label.x}%`,
              top: `${label.y}%`,
              transform: "translate(-50%, -50%)",
              color: "#C8A567",
              fontSize: "0.65rem",
              fontFamily: "monospace",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              opacity: 0.85,
              textShadow: "0 0 8px rgba(200, 165, 103, 0.3)",
            }}
          >
            {label.text}
          </div>
        ) : null
      )}
    </>
  );
}
