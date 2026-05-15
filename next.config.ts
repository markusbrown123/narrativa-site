import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin Turbopack's workspace root to this repo. Avoids the "multiple
  // lockfiles" warning when an unrelated package-lock.json sits higher in
  // the filesystem.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
