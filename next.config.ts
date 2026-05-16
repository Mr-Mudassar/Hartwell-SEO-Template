import type { NextConfig } from "next";

const config: NextConfig = {
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
};

export default config;
