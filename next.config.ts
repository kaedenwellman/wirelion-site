import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every page is statically generated; there is no server-side data.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // The Halloween competition page became the winning project's page.
  async redirects() {
    return [{ source: "/projects/reactive-jack-o-lantern", destination: "/projects/hollow-hive", permanent: true }];
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
