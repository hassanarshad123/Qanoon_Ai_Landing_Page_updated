/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  turbopack: {},
  async rewrites() {
    // Only proxy to FastAPI backend when FASTAPI_URL is explicitly set
    if (!process.env.FASTAPI_URL) return [];
    return [
      {
        source: "/api/v1/:path*",
        destination: `${process.env.FASTAPI_URL}/api/v1/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
