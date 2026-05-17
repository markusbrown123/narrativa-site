import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin Turbopack's workspace root to this repo. Avoids the "multiple
  // lockfiles" warning when an unrelated package-lock.json sits higher in
  // the filesystem.
  turbopack: {
    root: path.join(__dirname),
  },

  // Allow next/image to load Dropbox-hosted assets that Nicole pastes
  // into the Google Sheet. We accept both the share host and the
  // direct content host since `normalizeDropboxUrl` rewrites to the
  // latter — covering the share host keeps it safe if a row slips
  // through un-normalized.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.dropbox.com" },
      { protocol: "https", hostname: "dropbox.com" },
      { protocol: "https", hostname: "dl.dropboxusercontent.com" },
    ],
  },
};

export default nextConfig;
