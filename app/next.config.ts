import type { NextConfig } from "next";

// Pin workspace root locally so Next/Turbopack does not infer the wrong
// root from a stray parent package-lock.json (breaks the production CSS
// pipeline). On Vercel the build runs in an isolated dir and this pin
// breaks the deploy finalize step (routes-manifest ENOENT), so skip it
// there and let Vercel's own adapter resolve paths.
const isVercel = !!process.env.VERCEL;

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  ...(isVercel
    ? {}
    : {
        turbopack: {
          root: __dirname,
        },
        outputFileTracingRoot: __dirname,
      }),
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
  },
};

export default nextConfig;
