/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
        port: "",
      },
    ],
  },
  eslint: {
    // Disable ESLint checks during production builds
    ignoreDuringBuilds: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
