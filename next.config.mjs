/** @type {import('next').NextConfig} */
const nextConfig = {
//   output: 'export',
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.maximilienherr.fr" }],
        destination: "https://maximilienherr.fr/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          { type: "host", value: "maximilienherr.fr" },
          { type: "header", key: "x-forwarded-proto", value: "http" },
        ],
        destination: "https://maximilienherr.fr/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    minimumCacheTTL: 2678400,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [
      { protocol: "https", hostname: "www.frandroid.com" },
      { protocol: "https", hostname: "images.frandroid.com" },
      { protocol: "https", hostname: "frandroid.com" },
      { protocol: "https", hostname: "droidsoft.fr" },
      { protocol: "https", hostname: "*.droidsoft.fr" },
      { protocol: "https", hostname: "lecafedugeek.fr" },
      { protocol: "https", hostname: "*.lecafedugeek.fr" },
      { protocol: "https", hostname: "i0.wp.com" },
      { protocol: "https", hostname: "i1.wp.com" },
      { protocol: "https", hostname: "i2.wp.com" },
      { protocol: "https", hostname: "c0.lestechnophiles.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  trailingSlash: false, // ou true si tu veux des URL finissant par /
};

export default nextConfig;
