import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export — required for GitHub Pages (no Node server).
  output: "export",
  // Next.js Image Optimization needs a server; disable it for static export.
  images: {
    unoptimized: true,
  },
  // Trailing slashes make GitHub Pages routing more reliable.
  trailingSlash: true,
  // For a user Pages site (Hielkeai.github.io) basePath is empty.
  // If deploying to a project page (username.github.io/repo), set:
  //   basePath: "/repo-name"
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
