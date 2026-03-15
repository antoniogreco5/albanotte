/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
      {
        protocol: 'https',
        hostname: '*.shopify.com',
      },
    ],
  },
  // Enable experimental features as needed
  experimental: {
    // typedRoutes: true,
  },
};

module.exports = nextConfig;
