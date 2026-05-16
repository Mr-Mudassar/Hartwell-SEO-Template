// @ts-nocheck
"use client";
import { useRef, useMemo, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

/* ========== HELPERS ========== */

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

function lonMeridianPoints(lonDeg: number, segments = 64): [number, number, number][] {
  const lon = (lonDeg * Math.PI) / 180;
  const pts: [number, number, number][] = [];
  for (let i = 0; i <= segments; i++) {
    const phi = (i / segments) * Math.PI - Math.PI / 2;
    pts.push([Math.cos(phi) * Math.cos(lon), Math.sin(phi), Math.cos(phi) * Math.sin(lon)]);
  }
  return pts;
}

/** Convert lat/lon (degrees) to 3D position on sphere */
function latLonTo3D(lat: number, lon: number, r = 1.002): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return [
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  ];
}

function isInsidePolygon(lat: number, lon: number, polygon: [number, number][]): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [yi, xi] = polygon[i];
    const [yj, xj] = polygon[j];
    if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

/* ========== WORLD MAP DATA ========== */
// Simplified but geographically accurate continent outlines
// Each polygon: [latitude, longitude] pairs

const CONTINENTS: [number, number][][] = [
  // North America (main landmass)
  [
    [60,-140],[58,-137],[56,-133],[55,-130],[54,-129],[52,-128],[50,-127],
    [49,-125],[48,-124],[46,-124],[44,-124],[42,-124],[40,-124],[38,-123],
    [36,-122],[35,-121],[34,-120],[33,-118],[32,-117],[31,-115],[29,-113],
    [28,-112],[26,-110],[24,-109],[23,-106],[21,-105],[19,-104],[18,-103],
    [17,-101],[18,-97],[19,-96],[20,-92],[21,-90],[22,-88],[21,-87],
    [19,-88],[17,-88],[16,-87],[15,-85],[14,-84],[12,-84],[10,-83],
    [9,-80],[9,-78],[10,-76],[11,-75],[12,-73],[12,-71],[11,-70],
    [10,-67],[11,-64],[13,-62],[15,-61],[17,-62],[18,-64],[19,-67],
    [20,-73],[21,-76],[23,-80],[25,-80],[27,-80],[28,-81],[29,-82],
    [30,-84],[30,-86],[30,-88],[29,-90],[28,-93],[27,-97],[28,-97],
    [30,-94],[30,-90],[31,-89],[33,-88],[35,-86],[35,-83],[34,-80],
    [35,-77],[37,-76],[39,-75],[40,-74],[41,-72],[42,-71],[43,-70],
    [44,-68],[45,-67],[47,-65],[48,-64],[49,-62],[50,-58],[47,-54],
    [47,-56],[49,-56],[51,-56],[53,-57],[55,-60],[57,-62],[59,-64],
    [61,-65],[63,-68],[64,-72],[63,-76],[61,-79],[59,-81],[56,-82],
    [53,-84],[51,-86],[50,-89],[50,-93],[51,-96],[53,-99],[55,-101],
    [57,-104],[59,-108],[60,-112],[62,-118],[63,-124],[65,-130],
    [67,-138],[68,-145],[69,-152],[70,-157],[70,-162],[68,-165],
    [66,-167],[64,-166],[62,-163],[60,-155],[59,-148],[58,-140],
    [60,-140],
  ],
  // South America
  [
    [12,-72],[10,-73],[8,-73],[6,-73],[4,-72],[2,-70],[0,-69],
    [-2,-67],[-4,-65],[-5,-62],[-3,-58],[-2,-55],[-1,-51],[0,-50],
    [-1,-48],[-2,-45],[-3,-42],[-4,-39],[-5,-36],[-6,-35],[-8,-35],
    [-10,-36],[-12,-38],[-14,-39],[-16,-40],[-18,-40],[-20,-41],
    [-22,-42],[-23,-44],[-25,-46],[-27,-49],[-29,-50],[-31,-51],
    [-33,-53],[-35,-55],[-37,-57],[-39,-62],[-41,-64],[-43,-65],
    [-45,-66],[-47,-66],[-49,-68],[-51,-69],[-53,-70],[-55,-68],
    [-54,-66],[-52,-70],[-50,-74],[-48,-74],[-46,-75],[-44,-73],
    [-42,-72],[-40,-72],[-38,-71],[-36,-71],[-34,-72],[-32,-71],
    [-30,-71],[-28,-70],[-26,-70],[-24,-70],[-22,-70],[-20,-70],
    [-18,-71],[-16,-74],[-14,-76],[-12,-77],[-10,-78],[-8,-79],
    [-5,-80],[-3,-80],[-1,-79],[1,-77],[3,-77],[5,-76],[7,-75],
    [9,-76],[10,-75],[11,-74],[12,-72],
  ],
  // Africa
  [
    [37,-2],[36,0],[35,1],[34,2],[33,2],[32,1],[31,-1],[30,-3],
    [29,-5],[28,-8],[27,-10],[26,-13],[25,-15],[23,-16],[21,-17],
    [20,-17],[18,-16],[16,-16],[15,-17],[14,-17],[13,-16],[12,-15],
    [11,-14],[9,-13],[7,-11],[5,-8],[5,-5],[5,-2],[5,0],[5,2],
    [4,5],[4,8],[3,10],[2,10],[1,10],[0,10],[-1,10],[-2,12],
    [-4,12],[-6,13],[-8,14],[-10,14],[-12,14],[-14,13],[-16,12],
    [-18,12],[-20,14],[-22,15],[-24,15],[-26,16],[-28,17],[-30,18],
    [-32,18],[-34,18],[-34,20],[-33,24],[-31,27],[-30,30],[-28,33],
    [-26,34],[-24,36],[-22,36],[-20,36],[-18,38],[-16,40],[-14,41],
    [-12,42],[-10,42],[-8,44],[-6,45],[-4,42],[-2,41],[0,42],
    [2,42],[4,43],[5,44],[6,46],[8,48],[10,50],[11,50],[12,50],
    [13,48],[14,47],[15,44],[16,42],[18,40],[20,38],[22,37],
    [24,35],[26,34],[28,34],[30,32],[32,32],[33,30],[34,28],
    [35,22],[36,14],[37,10],[37,6],[37,2],[37,-2],
  ],
  // Europe
  [
    [36,-9],[37,-8],[38,-6],[39,-4],[40,-3],[41,-2],[42,0],[43,1],
    [43,3],[44,4],[45,6],[46,7],[47,7],[48,6],[49,5],[50,3],
    [51,3],[52,4],[53,6],[54,8],[55,9],[56,10],[57,11],[58,12],
    [59,11],[60,10],[61,7],[62,5],[63,7],[64,10],[65,12],[66,14],
    [67,15],[68,16],[69,18],[70,20],[70,24],[70,28],[70,30],
    [69,31],[68,30],[67,28],[66,25],[65,24],[64,22],[63,21],
    [62,24],[61,27],[60,28],[59,26],[58,23],[57,20],[56,18],
    [55,16],[54,14],[53,14],[52,16],[51,18],[50,17],[49,17],
    [48,20],[47,19],[46,16],[45,14],[44,13],[43,14],[42,16],
    [41,18],[40,20],[39,23],[38,24],[37,24],[36,23],[36,20],
    [37,16],[38,14],[38,10],[38,6],[38,2],[37,-2],[36,-5],[36,-9],
  ],
  // Middle East
  [
    [38,26],[37,28],[36,30],[35,33],[34,35],[33,36],[32,35],
    [31,34],[30,33],[29,34],[28,36],[27,37],[26,38],[25,39],
    [24,39],[22,39],[20,40],[18,42],[16,43],[14,44],[13,45],
    [12,44],[12,46],[13,48],[14,48],[15,50],[16,52],[18,54],
    [20,56],[22,56],[24,57],[25,56],[26,55],[27,56],[28,57],
    [29,56],[30,52],[30,49],[31,48],[32,47],[33,46],[34,44],
    [36,42],[37,40],[38,38],[39,36],[40,34],[40,30],[39,28],[38,26],
  ],
  // Asia (main body - Central + East)
  [
    [70,30],[70,40],[70,50],[69,55],[68,60],[67,65],[66,70],
    [65,73],[64,77],[63,80],[62,85],[61,90],[60,92],[58,90],
    [56,84],[54,78],[52,72],[50,66],[48,60],[46,55],[44,50],
    [42,48],[40,44],[38,44],[36,44],[35,44],[34,46],[32,48],
    [30,48],[28,50],[27,52],[26,54],[24,56],[22,58],[20,60],
    [18,62],[17,64],[16,66],[15,68],[14,72],[13,74],[12,76],
    [10,76],[8,77],[6,80],[4,82],[2,84],[1,86],[0,88],
    [0,92],[1,96],[2,100],[3,102],[4,104],[5,106],[6,106],
    [8,106],[10,106],[12,108],[14,108],[16,108],[18,108],
    [20,108],[22,108],[24,108],[26,110],[28,112],[30,116],
    [32,118],[34,120],[36,122],[38,124],[40,126],[42,128],
    [44,130],[46,132],[48,134],[50,136],[52,138],[54,140],
    [56,140],[58,140],[60,140],[62,142],[64,145],[66,150],
    [68,158],[70,165],[71,170],[72,175],[72,180],[72,170],
    [72,160],[71,150],[71,140],[72,130],[72,120],[72,110],
    [71,100],[70,90],[70,80],[70,70],[70,60],[70,50],[70,40],[70,30],
  ],
  // India (sub-polygon)
  [
    [30,70],[28,68],[26,68],[24,69],[22,70],[20,72],[18,73],
    [16,74],[14,76],[12,77],[10,76],[8,77],[8,79],[10,80],
    [12,80],[14,80],[16,80],[18,80],[20,82],[22,82],[24,82],
    [26,80],[28,78],[30,76],[32,74],[32,72],[30,70],
  ],
  // Southeast Asia (Malaysia, Indonesia hint)
  [
    [6,100],[4,101],[2,103],[1,104],[0,104],[-1,104],[-2,106],
    [-4,106],[-6,106],[-7,108],[-8,110],[-8,113],[-7,115],
    [-6,116],[-4,117],[-2,117],[0,115],[2,112],[4,108],[6,106],[6,100],
  ],
  // Japan
  [
    [45,142],[44,144],[43,144],[42,143],[40,140],[38,138],[36,136],
    [34,134],[33,132],[32,131],[33,130],[35,132],[37,135],[39,138],
    [41,140],[43,143],[45,142],
  ],
  // Australia
  [
    [-12,136],[-13,132],[-14,129],[-16,126],[-18,123],[-20,118],
    [-22,115],[-24,114],[-26,113],[-28,114],[-30,115],[-32,116],
    [-34,117],[-35,118],[-36,121],[-37,125],[-38,130],[-38,134],
    [-38,138],[-38,142],[-38,146],[-37,149],[-36,150],[-34,151],
    [-32,152],[-30,153],[-28,153],[-26,153],[-24,151],[-22,149],
    [-20,147],[-18,146],[-16,145],[-14,143],[-13,141],[-12,139],
    [-12,136],
  ],
  // Greenland
  [
    [60,-45],[62,-42],[64,-40],[66,-37],[68,-33],[70,-28],[72,-23],
    [74,-19],[76,-19],[78,-22],[80,-26],[82,-32],[82,-42],[80,-52],
    [78,-57],[76,-60],[74,-63],[72,-62],[70,-56],[68,-51],[66,-48],
    [64,-46],[62,-44],[60,-45],
  ],
  // UK & Ireland
  [
    [50,-6],[51,-5],[52,-4],[53,-3],[54,-3],[55,-4],[56,-5],
    [57,-5],[58,-4],[58,-3],[57,-2],[56,-1],[55,0],[54,0],
    [53,0],[52,1],[51,1],[50,0],[50,-2],[51,-4],[50,-6],
  ],
];

/* ========== SERVICE CITIES & CONNECTIONS ========== */

const SERVICE_CITIES = [
  { name: "New York", lat: 40.7, lon: -74.0 },
  { name: "London", lat: 51.5, lon: -0.12 },
  { name: "Dubai", lat: 25.2, lon: 55.3 },
  { name: "Singapore", lat: 1.35, lon: 103.8 },
  { name: "Sydney", lat: -33.9, lon: 151.2 },
  { name: "San Francisco", lat: 37.8, lon: -122.4 },
  { name: "Toronto", lat: 43.7, lon: -79.4 },
  { name: "Berlin", lat: 52.5, lon: 13.4 },
  { name: "Tokyo", lat: 35.7, lon: 139.7 },
  { name: "Mumbai", lat: 19.1, lon: 72.9 },
  { name: "São Paulo", lat: -23.5, lon: -46.6 },
  { name: "Cape Town", lat: -33.9, lon: 18.4 },
];

const CONNECTIONS: [number, number][] = [
  [0, 1],  // New York → London
  [1, 7],  // London → Berlin
  [1, 2],  // London → Dubai
  [2, 9],  // Dubai → Mumbai
  [9, 3],  // Mumbai → Singapore
  [3, 8],  // Singapore → Tokyo
  [5, 0],  // San Francisco → New York
  [0, 10], // New York → São Paulo
  [1, 11], // London → Cape Town
  [3, 4],  // Singapore → Sydney
];

/* ========== GENERATION FUNCTIONS ========== */

function generateWorldDots(outlines: [number, number][][]): Float32Array {
  const pts: [number, number, number][] = [];

  for (const outline of outlines) {
    // Outline dots (dense interpolation)
    for (let i = 0; i < outline.length - 1; i++) {
      const [lat1, lon1] = outline[i];
      const [lat2, lon2] = outline[i + 1];
      const dist = Math.sqrt((lat2 - lat1) ** 2 + (lon2 - lon1) ** 2);
      const steps = Math.max(2, Math.round(dist / 1.2));
      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        pts.push(latLonTo3D(lat1 + (lat2 - lat1) * t, lon1 + (lon2 - lon1) * t));
      }
    }

    // Fill interior
    const lats = outline.map((p) => p[0]);
    const lons = outline.map((p) => p[1]);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLon = Math.min(...lons);
    const maxLon = Math.max(...lons);

    for (let lat = minLat + 2.5; lat < maxLat; lat += 2.5) {
      for (let lon = minLon + 2.5; lon < maxLon; lon += 2.5) {
        if (isInsidePolygon(lat, lon, outline)) {
          pts.push(latLonTo3D(lat, lon));
        }
      }
    }
  }

  const arr = new Float32Array(pts.length * 3);
  for (let i = 0; i < pts.length; i++) {
    arr[i * 3] = pts[i][0];
    arr[i * 3 + 1] = pts[i][1];
    arr[i * 3 + 2] = pts[i][2];
  }
  return arr;
}

function generateOutlinePoints(outlines: [number, number][][]): [number, number, number][][] {
  return outlines.map((outline) =>
    outline.map(([lat, lon]) => latLonTo3D(lat, lon, 1.003))
  );
}

/** Generate a great-circle arc between two cities, elevated above sphere */
function generateCityArc(fromIdx: number, toIdx: number): [number, number, number][] {
  const from = SERVICE_CITIES[fromIdx];
  const to = SERVICE_CITIES[toIdx];
  const startVec = new THREE.Vector3(...latLonTo3D(from.lat, from.lon, 1.0));
  const endVec = new THREE.Vector3(...latLonTo3D(to.lat, to.lon, 1.0));

  const mid = startVec.clone().add(endVec).multiplyScalar(0.5).normalize().multiplyScalar(1.35);
  const curve = new THREE.QuadraticBezierCurve3(startVec, mid, endVec);
  return curve.getPoints(50).map((p): [number, number, number] => [p.x, p.y, p.z]);
}

/* ========== SUB-COMPONENTS ========== */

function LatitudeRings() {
  const rings = useMemo(() => {
    const result: [number, number, number][][] = [];
    for (let lat = -80; lat <= 80; lat += 8) {
      result.push(latRingPoints(lat));
    }
    return result;
  }, []);

  return (
    <>
      {rings.map((pts, i) => (
        <Line key={`lat-${i}`} points={pts} color="#2A3444" lineWidth={1} transparent opacity={0.55} />
      ))}
    </>
  );
}

function LongitudeMeridians() {
  const meridians = useMemo(() => {
    const result: [number, number, number][][] = [];
    for (let lon = 0; lon < 360; lon += 10) {
      result.push(lonMeridianPoints(lon));
    }
    return result;
  }, []);

  return (
    <>
      {meridians.map((pts, i) => (
        <Line key={`lon-${i}`} points={pts} color="#2A3444" lineWidth={1} transparent opacity={0.55} />
      ))}
    </>
  );
}

function WorldMap() {
  const dotGeometry = useMemo(() => {
    const positions = generateWorldDots(CONTINENTS);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  const outlines = useMemo(() => generateOutlinePoints(CONTINENTS), []);

  return (
    <group>
      <points geometry={dotGeometry}>
        <pointsMaterial
          color="#C8A567"
          size={0.024}
          transparent
          opacity={0.7}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      {outlines.map((pts, i) => (
        <Line
          key={`outline-${i}`}
          points={pts}
          color="#C8A567"
          lineWidth={1.5}
          transparent
          opacity={0.4}
        />
      ))}
    </group>
  );
}

function InnerSphere() {
  return (
    <mesh>
      <sphereGeometry args={[0.985, 48, 48]} />
      <meshBasicMaterial color="#0E1014" />
    </mesh>
  );
}

function RimGlow() {
  return (
    <mesh>
      <sphereGeometry args={[1.04, 48, 48]} />
      <meshBasicMaterial color="#C8A567" transparent opacity={0.08} side={THREE.BackSide} />
    </mesh>
  );
}

/* ========== SERVICE NODES ========== */

function ServiceNodes() {
  const positions = useMemo(
    () => SERVICE_CITIES.map((city) => latLonTo3D(city.lat, city.lon, 1.01)),
    []
  );

  const ringRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ringRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const pulse = 1 + 0.3 * Math.sin(t * 2 + i * 0.8);
      mesh.scale.setScalar(pulse);
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.4 + 0.3 * Math.sin(t * 2 + i * 0.8 + Math.PI);
    });
  });

  return (
    <group>
      {positions.map((pos, i) => (
        <group key={`city-${i}`} position={pos}>
          {/* Solid node */}
          <mesh>
            <sphereGeometry args={[0.025, 12, 12]} />
            <meshBasicMaterial color="#C8A567" />
          </mesh>
          {/* Pulsing ring */}
          <mesh ref={(el) => { ringRefs.current[i] = el; }} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.035, 0.045, 24]} />
            <meshBasicMaterial color="#C8A567" transparent opacity={0.5} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ========== CONNECTION ARCS ========== */

function ConnectionArc({ points, delay }: { points: [number, number, number][]; delay: number }) {
  const matRef = useRef<THREE.LineBasicMaterial>(null);
  const pulseRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(points.length * 3);
    points.forEach((p, i) => {
      positions[i * 3] = p[0];
      positions[i * 3 + 1] = p[1];
      positions[i * 3 + 2] = p[2];
    });
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [points]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const cycle = 5;
    const age = ((t - delay) % cycle + cycle) % cycle;

    // Arc line opacity
    if (matRef.current) {
      let opacity = 0;
      if (age < 0.5) opacity = age / 0.5;
      else if (age < 3) opacity = 1;
      else if (age < 4) opacity = 1 - (age - 3);
      matRef.current.opacity = opacity * 0.5;
    }

    // Traveling pulse dot
    if (pulseRef.current) {
      const progress = Math.min(age / 3, 1);
      const idx = Math.floor(progress * (points.length - 1));
      const pt = points[Math.min(idx, points.length - 1)];
      pulseRef.current.position.set(pt[0], pt[1], pt[2]);

      const mat = pulseRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = (age < 0.3 || age > 3.5) ? 0 : 0.9;
    }
  });

  return (
    <group>
      <line geometry={geometry}>
        <lineBasicMaterial ref={matRef} color="#C8A567" transparent opacity={0} />
      </line>
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0} />
      </mesh>
    </group>
  );
}

function ConnectionArcs() {
  const arcsData = useMemo(
    () =>
      CONNECTIONS.map(([from, to], i) => ({
        points: generateCityArc(from, to),
        delay: i * 0.7,
      })),
    []
  );

  return (
    <>
      {arcsData.map((arc, i) => (
        <ConnectionArc key={`conn-${i}`} points={arc.points} delay={arc.delay} />
      ))}
    </>
  );
}

/* ========== MOUSE DRAG CONTROLLER ========== */

function DragController({ groupRef }: { groupRef: React.RefObject<THREE.Group> }) {
  const { gl } = useThree();
  const isDragging = useRef(false);
  const prevMouse = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  const onPointerDown = useCallback((e: PointerEvent) => {
    isDragging.current = true;
    prevMouse.current = { x: e.clientX, y: e.clientY };
    velocity.current = { x: 0, y: 0 };
    gl.domElement.style.cursor = "grabbing";
  }, [gl]);

  const onPointerMove = useCallback((e: PointerEvent) => {
    if (!isDragging.current || !groupRef.current) return;
    const dx = e.clientX - prevMouse.current.x;
    const dy = e.clientY - prevMouse.current.y;
    prevMouse.current = { x: e.clientX, y: e.clientY };

    // Rotate the globe based on drag
    groupRef.current.rotation.y += dx * 0.005;
    groupRef.current.rotation.x += dy * 0.005;

    // Clamp x rotation to prevent flipping
    groupRef.current.rotation.x = Math.max(-1.2, Math.min(1.2, groupRef.current.rotation.x));

    velocity.current = { x: dx * 0.005, y: dy * 0.005 };
  }, [groupRef]);

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
    gl.domElement.style.cursor = "grab";
  }, [gl]);

  // Attach events
  const attached = useRef(false);
  useFrame(() => {
    if (!attached.current) {
      const el = gl.domElement;
      el.style.cursor = "grab";
      el.addEventListener("pointerdown", onPointerDown);
      el.addEventListener("pointermove", onPointerMove);
      el.addEventListener("pointerup", onPointerUp);
      el.addEventListener("pointerleave", onPointerUp);
      attached.current = true;
    }

    // Apply inertia when not dragging
    if (!isDragging.current && groupRef.current) {
      velocity.current.x *= 0.95;
      velocity.current.y *= 0.95;
      if (Math.abs(velocity.current.x) > 0.0001) {
        groupRef.current.rotation.y += velocity.current.x;
      }
      if (Math.abs(velocity.current.y) > 0.0001) {
        groupRef.current.rotation.x += velocity.current.y;
        groupRef.current.rotation.x = Math.max(-1.2, Math.min(1.2, groupRef.current.rotation.x));
      }
    }
  });

  // Cleanup on unmount
  const cleanupRef = useRef<() => void>();
  cleanupRef.current = () => {
    const el = gl.domElement;
    el.removeEventListener("pointerdown", onPointerDown);
    el.removeEventListener("pointermove", onPointerMove);
    el.removeEventListener("pointerup", onPointerUp);
    el.removeEventListener("pointerleave", onPointerUp);
  };

  return null;
}

/* ========== MAIN EXPORT ========== */

export function Globe({ mouseRef }: { mouseRef: React.RefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);
  const isDragActive = useRef(false);

  useFrame(() => {
    if (!groupRef.current) return;
    // Slow auto-rotation (only when not being dragged — drag handled by DragController)
    groupRef.current.rotation.y += 0.001;
  });

  return (
    <>
      <DragController groupRef={groupRef} />
      <group ref={groupRef} rotation={[0.15, -0.4, 0]}>
        <InnerSphere />
        <LatitudeRings />
        <LongitudeMeridians />
        <WorldMap />
        <RimGlow />
        <ServiceNodes />
        <ConnectionArcs />
      </group>
    </>
  );
}
