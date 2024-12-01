/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Ignore ESLint errors during builds (temporarily)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignore TypeScript errors during builds (temporarily)
    ignoreBuildErrors: true,
  },
  // Additional configurations
  reactStrictMode: true,
};

export default nextConfig;
