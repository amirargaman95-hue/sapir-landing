import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  // Pin workspace root to this project so Next/Turbopack does not infer
  // the wrong root from a stray parent package-lock.json (breaks the
  // production CSS pipeline). __dirname = this project directory.
  turbopack: {
    root: __dirname,
  },
  outputFileTracingRoot: __dirname,
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
  },
};

export default nextConfig;
