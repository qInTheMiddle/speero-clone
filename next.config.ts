import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'speero.net',
      },
      {
        protocol: 'https',
        hostname: 'd387y4kg551l2d.cloudfront.net',
      },
    ],
  },
};

export default nextConfig;
