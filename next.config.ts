import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin Turbopack's workspace root to this repo. Avoids the "multiple
  // lockfiles" warning when an unrelated package-lock.json sits higher in
  // the filesystem.
  turbopack: {
    root: path.join(__dirname),
  },

  // Retired pages send visitors (and old links) somewhere useful.
  async redirects() {
    return [
      { source: "/services", destination: "/speaker", permanent: true },
      { source: "/mentor-program", destination: "/", permanent: true },
    ];
  },

  // Allow next/image to load the Dropbox and Google Drive pictures Nicole
  // pastes into the Google Sheet. Dropbox: both the share host and the
  // direct host, since `normalizeDropboxUrl` rewrites to the latter and
  // the share host keeps a row that slips through un-normalised working.
  // Drive: lib/cms/drive.ts turns share links into Drive's direct address.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.dropbox.com" },
      { protocol: "https", hostname: "dropbox.com" },
      { protocol: "https", hostname: "dl.dropboxusercontent.com" },
      {
        protocol: "https",
        hostname: "drive.usercontent.google.com",
        pathname: "/download",
      },
    ],
  },
};

export default nextConfig;
