// @ts-nocheck
"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

/* ---------- helpers ---------- */

function randomSpherePos(radius: number): THREE.Vector3 {
  const u = Math.random();
  const v = Math.random();
  const theta = 2 * Math.PI * u;
  const phi = Math.acos(2 * v - 1);
  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

/* ---------- types ---------- */

interface NodeData {
  position: THREE.Vector3;
  phaseOffset: number;
  ring: number;
}

interface ParticleData {
  nodeIndex: number;
  progress: number;
  speed: number;
}

/* ---------- sub-components ---------- */

function CenterNode() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    const s = 1 + 0.05 * Math.sin(t * 1.2);
    meshRef.current.scale.setScalar(s);
  });

  return (
    <group>
      {/* core */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshBasicMaterial color="#C8A567" />
      </mesh>
      {/* glow shell */}
      <mesh>
        <sphereGeometry args={[0.32, 16, 16]} />
        <meshBasicMaterial color="#C8A567" transparent opacity={0.18} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

function OuterNodes({ nodes }: { nodes: NodeData[] }) {
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    nodes.forEach((node, i) => {
      const mesh = meshRefs.current[i];
      if (!mesh) return;
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.4 + 0.5 * Math.sin(t * 1.5 + node.phaseOffset);
      const s = 0.8 + 0.2 * Math.sin(t * 1.2 + node.phaseOffset);
      mesh.scale.setScalar(s);
    });
  });

  return (
    <>
      {nodes.map((node, i) => (
        <mesh
          key={i}
          ref={(el) => { meshRefs.current[i] = el; }}
          position={[node.position.x, node.position.y, node.position.z]}
        >
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color="#C8A567" transparent opacity={0.7} />
        </mesh>
      ))}
    </>
  );
}

function Edges({ nodes }: { nodes: NodeData[] }) {
  const lineRefs = useRef<(THREE.Line | null)[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    nodes.forEach((node, i) => {
      const lineObj = lineRefs.current[i];
      if (!lineObj) return;
      const mat = lineObj.material as THREE.LineBasicMaterial;
      mat.opacity = 0.2 + 0.2 * Math.sin(t * 0.8 + node.phaseOffset);
    });
  });

  return (
    <>
      {nodes.map((node, i) => (
        <Line
          key={`edge-${i}`}
          ref={(el: THREE.Line | null) => { lineRefs.current[i] = el; }}
          points={[
            [0, 0, 0],
            [node.position.x, node.position.y, node.position.z],
          ]}
          color="#2A2F38"
          lineWidth={0.8}
          transparent
          opacity={0.4}
        />
      ))}
    </>
  );
}

function Particles({ nodes }: { nodes: NodeData[] }) {
  const particlesRef = useRef<ParticleData[]>(
    Array.from({ length: 60 }, () => ({
      nodeIndex: Math.floor(Math.random() * nodes.length),
      progress: Math.random(),
      speed: 0.003 + Math.random() * 0.007,
    }))
  );

  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(() => {
    particlesRef.current.forEach((p, i) => {
      const mesh = meshRefs.current[i];
      if (!mesh) return;

      p.progress += p.speed;
      if (p.progress >= 1) {
        p.progress = 0;
        p.nodeIndex = Math.floor(Math.random() * nodes.length);
        p.speed = 0.003 + Math.random() * 0.007;
      }

      const node = nodes[p.nodeIndex];
      const t = p.progress;
      mesh.position.x = node.position.x * (1 - t);
      mesh.position.y = node.position.y * (1 - t);
      mesh.position.z = node.position.z * (1 - t);

      const mat = mesh.material as THREE.MeshBasicMaterial;
      const edgeFade = Math.min(t, 1 - t) * 4;
      mat.opacity = Math.min(edgeFade, 1) * 0.9;
    });
  });

  return (
    <>
      {Array.from({ length: 60 }, (_, i) => (
        <mesh key={`particle-${i}`} ref={(el) => { meshRefs.current[i] = el; }}>
          <sphereGeometry args={[0.02, 6, 6]} />
          <meshBasicMaterial color="#C8A567" transparent opacity={0} />
        </mesh>
      ))}
    </>
  );
}

/* ---------- main export ---------- */

export function LinkGraph({
  mouseRef,
}: {
  mouseRef: React.RefObject<{ x: number; y: number }>;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo<NodeData[]>(() => {
    const result: NodeData[] = [];
    const rings = [
      { count: 10, radius: 1.4 },
      { count: 14, radius: 2.2 },
      { count: 12, radius: 2.8 },
    ];
    rings.forEach((ring, ringIdx) => {
      for (let i = 0; i < ring.count; i++) {
        result.push({
          position: randomSpherePos(ring.radius),
          phaseOffset: Math.random() * Math.PI * 2,
          ring: ringIdx,
        });
      }
    });
    return result;
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += 0.0015;
    const mouse = mouseRef.current;
    if (mouse) {
      groupRef.current.rotation.x += (mouse.y * 0.12 - groupRef.current.rotation.x) * 0.02;
      groupRef.current.rotation.z += (-mouse.x * 0.06 - groupRef.current.rotation.z) * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      <CenterNode />
      <OuterNodes nodes={nodes} />
      <Edges nodes={nodes} />
      <Particles nodes={nodes} />
    </group>
  );
}
