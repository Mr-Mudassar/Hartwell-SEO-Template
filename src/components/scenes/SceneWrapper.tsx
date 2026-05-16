"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useShouldRender3D } from "@/hooks/useShouldRender3D";

interface SceneWrapperProps {
  fallback: React.ReactNode;
  className?: string;
  children: React.ReactNode;
  camera?: { position: [number, number, number]; fov?: number };
}

export function SceneWrapper({ fallback, className, children, camera }: SceneWrapperProps) {
  const shouldRender = useShouldRender3D();
  if (!shouldRender) return <>{fallback}</>;
  return (
    <div
      className={className}
      aria-hidden="true"
      style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
    >
      <Canvas
        camera={{ position: camera?.position ?? [0, 0, 5], fov: camera?.fov ?? 38 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent", width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}
