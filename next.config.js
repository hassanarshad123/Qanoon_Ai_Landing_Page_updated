/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  turbopack: {},
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination:
          process.env.FASTAPI_URL
            ? `${process.env.FASTAPI_URL}/api/v1/:path*`
            : "http://localhost:8000/api/v1/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
