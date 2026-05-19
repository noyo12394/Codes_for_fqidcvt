import type { NextConfig } from "next";

const isPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isPages ? "/Codes_for_fqidcvt" : undefined,
  assetPrefix: isPages ? "/Codes_for_fqidcvt/" : undefined,
  trailingSlash: true,
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
