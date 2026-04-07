import path from "node:path";
import { fileURLToPath } from "node:url";

import type { NextConfig } from "next";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  output: "export",
  /** Emit `/about/index.html` so GitHub Pages resolves `/about/` reliably. */
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Lock tracing to this app when other lockfiles exist higher in the tree (local dev).
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
