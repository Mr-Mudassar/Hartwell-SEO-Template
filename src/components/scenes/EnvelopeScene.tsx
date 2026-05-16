// @ts-nocheck
"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

/* ---------- constants ---------- */

const BODY_W = 2.4;
const BODY_H = 1.4;
const HALF_W = BODY_W / 2;
const HALF_H = BODY_H / 2;
const PARTICLE_COUNT = 200;

/* ---------- sub-components ---------- */

function EnvelopeBody({ opacity }: { opacity: number }) {
  // wireframe rectangle
  const corners: [number, number, number][] = [
    [-HALF_W, -HALF_H, 0],
    [HALF_W, -HALF_H, 0],
    [HALF_W, HALF_H, 0],
    [-HALF_W, HALF_H, 0],
    [-HALF_W, -HALF_H, 0],
  ];

  // inner V-fold lines
  const vLeft: [number, number, number][] = [
    [-HALF_W, HALF_H, 0],
    [0, 0, 0],
  ];
  const vRight: [number, number, number][] = [
    [HALF_W, HALF_H, 0],
    [0, 0, 0],
  ];

  return (
    <group>
      {/* dark fill */}
      <mesh>
        <planeGeometry args={[BODY_W, BODY_H]} />
        <meshBasicMaterial color="#0E1014" transparent opacity={opacity * 0.9} />
      </mesh>
      {/* wireframe */}
      <Line points={corners} color="#2A2F38" lineWidth={1.5} transparent opacity={opacity * 0.6} />
      {/* V-fold */}
      <Line points={vLeft} color="#2A2F38" lineWidth={1} transparent opacity={opacity * 0.35} />
      <Line points={vRight} color="#2A2F38" lineWidth={1} transparent opacity={opacity * 0.35} />
    </group>
  );
}

function EnvelopeFlap({ flapAngle, opacity }: { flapAngle: number; opacity: number }) {
  // Triangle flap that hinges from top edge
  const flapPoints: [number, number, number][] = [
    [-HALF_W, 0, 0],
    [0, -HALF_H * 0.8, 0],
    [HALF_W, 0, 0],
    [-HALF_W, 0, 0],
  ];

  return (
    <group position={[0, HALF_H, 0]} rotation={[flapAngle, 0, 0]}>
      <Line points={flapPoints} color="#2A2F38" lineWidth={1.2} transparent opacity={opacity * 0.55} />
      <mesh>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([
              -HALF_W, 0, 0,
              0, -HALF_H * 0.8, 0,
              HALF_W, 0, 0,
            ]), 3]}
          />
        </bufferGeometry>
        <meshBasicMaterial color="#0E1014" transparent opacity={opacity * 0.7} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function WaxSeal({ opacity }: { opacity: number }) {
  return (
    <mesh position={[0, -0.1, 0.01]}>
      <circleGeometry args={[0.12, 16]} />
      <meshBasicMaterial color="#C8A567" transparent opacity={opacity * 0.9} />
    </mesh>
  );
}

function BeamLine({ visible, opacity }: { visible: boolean; opacity: number }) {
  if (!visible) return null;

  const beamPoints: [number, number, number][] = [
    [0, 0, 0],
    [0, 0, 2.5],
  ];

  return (
    <Line
      points={beamPoints}
      color="#C8A567"
      lineWidth={1.5}
      transparent
      opacity={opacity * 0.5}
    />
  );
}

function DissolveParticles({ active, progress }: { active: boolean; progress: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { geometry, velocities } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const vels = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Start at random position within envelope bounds
      positions[i * 3] = (Math.random() - 0.5) * BODY_W;
      positions[i * 3 + 1] = (Math.random() - 0.5) * BODY_H;
      positions[i * 3 + 2] = 0;

      // Velocity: mostly upward with some spread
      vels[i * 3] = (Math.random() - 0.5) * 1.5;
      vels[i * 3 + 1] = 0.8 + Math.random() * 2.5;
      vels[i * 3 + 2] = (Math.random() - 0.5) * 1.0;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions.slice(), 3));

    return { geometry: geo, velocities: vels };
  }, []);

  const startPositions = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * BODY_W;
      positions[i * 3 + 1] = (Math.random() - 0.5) * BODY_H;
      positions[i * 3 + 2] = 0;
    }
    return positions;
  }, []);

  useFrame(() => {
    if (!pointsRef.current || !active) return;

    const posAttr = pointsRef.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      arr[i3] = startPositions[i3] + velocities[i3] * progress;
      arr[i3 + 1] = startPositions[i3 + 1] + velocities[i3 + 1] * progress;
      arr[i3 + 2] = startPositions[i3 + 2] + velocities[i3 + 2] * progress;
    }

    posAttr.needsUpdate = true;

    const mat = pointsRef.current.material as THREE.PointsMaterial;
    mat.opacity = Math.max(0, 1 - progress * 1.2);
  });

  if (!active) return null;

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color="#C8A567"
        size={0.03}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

/* ---------- main export ---------- */

export function EnvelopeScene({
  mouseRef,
  submitted = false,
}: {
  mouseRef: React.RefObject<{ x: number; y: number }>;
  submitted?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const submittedTime = useRef<number | null>(null);
  const dissolveProgress = useRef(0);
  const envelopeOpacity = useRef(1);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const t = clock.getElapsedTime();

    // Handle submitted state
    if (submitted && submittedTime.current === null) {
      submittedTime.current = t;
    }

    if (submitted && submittedTime.current !== null) {
      const elapsed = t - submittedTime.current;
      dissolveProgress.current = Math.min(elapsed / 2.5, 1);
      envelopeOpacity.current = Math.max(0, 1 - elapsed / 2.0);
    }

    // Breathing flap animation
    const flapAngle = submitted
      ? Math.PI * 0.55 * 0.8 // open wide when submitted
      : Math.PI * 0.55 * (0.55 + 0.4 * Math.sin(t * 0.8));

    // Store flap angle for child component via userData
    groupRef.current.userData.flapAngle = flapAngle;
    groupRef.current.userData.envelopeOpacity = envelopeOpacity.current;
    groupRef.current.userData.beamVisible = flapAngle > Math.PI * 0.55 * 0.5;
    groupRef.current.userData.dissolveActive = submitted;
    groupRef.current.userData.dissolveProgress = dissolveProgress.current;

    // Mouse parallax
    const mouse = mouseRef.current;
    if (mouse) {
      groupRef.current.rotation.y += (mouse.x * 0.12 - groupRef.current.rotation.y) * 0.025;
      groupRef.current.rotation.x += (mouse.y * 0.06 - groupRef.current.rotation.x) * 0.025;
    }
  });

  return (
    <group ref={groupRef}>
      <EnvelopeInner groupRef={groupRef} submitted={submitted} />
    </group>
  );
}

/* Inner component that reads parent userData each frame */
function EnvelopeInner({
  groupRef,
  submitted,
}: {
  groupRef: React.RefObject<THREE.Group | null>;
  submitted: boolean;
}) {
  const flapRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Group>(null);
  const beamRef = useRef<THREE.Group>(null);
  const dissolveProgressRef = useRef(0);
  const dissolveActiveRef = useRef(false);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const t = clock.getElapsedTime();
    const { flapAngle, envelopeOpacity, beamVisible, dissolveActive, dissolveProgress } =
      groupRef.current.userData;

    // Update flap rotation
    if (flapRef.current) {
      flapRef.current.rotation.x = flapAngle || 0;
    }

    dissolveProgressRef.current = dissolveProgress || 0;
    dissolveActiveRef.current = dissolveActive || false;
  });

  // Use a simpler approach: render with animated values
  return (
    <>
      <EnvelopeAnimated
        submitted={submitted}
      />
    </>
  );
}

/* Fully self-contained animated envelope */
function EnvelopeAnimated({ submitted }: { submitted: boolean }) {
  const flapGroupRef = useRef<THREE.Group>(null);
  const envelopeGroupRef = useRef<THREE.Group>(null);
  const submittedTimeRef = useRef<number | null>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (submitted && submittedTimeRef.current === null) {
      submittedTimeRef.current = t;
    }

    // Flap breathing
    let flapAngle: number;
    if (submitted) {
      flapAngle = Math.PI * 0.55 * 0.8;
    } else {
      flapAngle = Math.PI * 0.55 * (0.55 + 0.4 * Math.sin(t * 0.8));
    }

    if (flapGroupRef.current) {
      flapGroupRef.current.rotation.x = flapAngle;
    }

    // Envelope fade out on submit
    if (envelopeGroupRef.current && submitted && submittedTimeRef.current !== null) {
      const elapsed = t - submittedTimeRef.current;
      const opacity = Math.max(0, 1 - elapsed / 2.0);
      envelopeGroupRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh || child instanceof THREE.Line) {
          const mat = (child as THREE.Mesh).material as THREE.Material;
          if ("opacity" in mat) {
            (mat as THREE.MeshBasicMaterial).opacity *= opacity;
          }
        }
      });
    }
  });

  const beamVisible = true; // controlled by flapAngle threshold in rendering

  // Flap triangle corners
  const flapPoints: [number, number, number][] = [
    [-HALF_W, 0, 0],
    [0, -HALF_H * 0.8, 0],
    [HALF_W, 0, 0],
    [-HALF_W, 0, 0],
  ];

  const bodyCorners: [number, number, number][] = [
    [-HALF_W, -HALF_H, 0],
    [HALF_W, -HALF_H, 0],
    [HALF_W, HALF_H, 0],
    [-HALF_W, HALF_H, 0],
    [-HALF_W, -HALF_H, 0],
  ];

  const vLeft: [number, number, number][] = [
    [-HALF_W, HALF_H, 0],
    [0, 0, 0],
  ];
  const vRight: [number, number, number][] = [
    [HALF_W, HALF_H, 0],
    [0, 0, 0],
  ];

  const beamPoints: [number, number, number][] = [
    [0, 0, 0],
    [0, 0, 2.5],
  ];

  return (
    <group ref={envelopeGroupRef}>
      {/* Body fill */}
      <mesh>
        <planeGeometry args={[BODY_W, BODY_H]} />
        <meshBasicMaterial color="#0E1014" transparent opacity={0.9} />
      </mesh>

      {/* Body wireframe */}
      <Line points={bodyCorners} color="#2A2F38" lineWidth={1.5} transparent opacity={0.6} />

      {/* V-fold lines */}
      <Line points={vLeft} color="#2A2F38" lineWidth={1} transparent opacity={0.35} />
      <Line points={vRight} color="#2A2F38" lineWidth={1} transparent opacity={0.35} />

      {/* Wax seal */}
      <mesh position={[0, -0.1, 0.01]}>
        <circleGeometry args={[0.12, 16]} />
        <meshBasicMaterial color="#C8A567" transparent opacity={0.9} />
      </mesh>

      {/* Flap - hinges from top edge */}
      <group position={[0, HALF_H, 0]} ref={flapGroupRef}>
        <Line points={flapPoints} color="#2A2F38" lineWidth={1.2} transparent opacity={0.55} />
        <mesh>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array([
                -HALF_W, 0, 0,
                0, -HALF_H * 0.8, 0,
                HALF_W, 0, 0,
              ]), 3]}
            />
          </bufferGeometry>
          <meshBasicMaterial color="#0E1014" transparent opacity={0.7} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Beam line from center */}
      <Line points={beamPoints} color="#C8A567" lineWidth={1.5} transparent opacity={0.35} />

      {/* Dissolve particles */}
      <DissolveParticlesAnimated submitted={submitted} />
    </group>
  );
}

function DissolveParticlesAnimated({ submitted }: { submitted: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const startTimeRef = useRef<number | null>(null);

  const { geometry, velocities, startPositions } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const starts = new Float32Array(PARTICLE_COUNT * 3);
    const vels = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * BODY_W;
      const y = (Math.random() - 0.5) * BODY_H;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = 0;
      starts[i * 3] = x;
      starts[i * 3 + 1] = y;
      starts[i * 3 + 2] = 0;

      vels[i * 3] = (Math.random() - 0.5) * 1.5;
      vels[i * 3 + 1] = 0.8 + Math.random() * 2.5;
      vels[i * 3 + 2] = (Math.random() - 0.5) * 1.0;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    return { geometry: geo, velocities: vels, startPositions: starts };
  }, []);

  useFrame(({ clock }) => {
    if (!submitted || !pointsRef.current) return;

    const t = clock.getElapsedTime();
    if (startTimeRef.current === null) startTimeRef.current = t;

    const elapsed = t - startTimeRef.current;
    const progress = Math.min(elapsed / 2.5, 1);

    const posAttr = pointsRef.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      arr[i3] = startPositions[i3] + velocities[i3] * progress;
      arr[i3 + 1] = startPositions[i3 + 1] + velocities[i3 + 1] * progress;
      arr[i3 + 2] = startPositions[i3 + 2] + velocities[i3 + 2] * progress;
    }
    posAttr.needsUpdate = true;

    const mat = pointsRef.current.material as THREE.PointsMaterial;
    mat.opacity = Math.max(0, 1 - progress * 1.3);
  });

  if (!submitted) return null;

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color="#C8A567"
        size={0.03}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}
