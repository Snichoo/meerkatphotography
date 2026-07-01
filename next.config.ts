import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    deviceSizes: [360, 414, 640, 768, 1024, 1280, 1536, 1920, 2560],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
    qualities: [60, 70, 75, 80],
    formats: ["image/webp"],
    minimumCacheTTL: 2678400,
    // Photos uploaded through the Studio admin are served from Vercel Blob.
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
};

export default nextConfig;
