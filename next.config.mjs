/** @type {import('next').NextConfig} */
const nextConfig = {
//   output: 'export',
  images: {
    unoptimized: true,
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
      { protocol: "https", hostname: "i2.wp.com" }
    ],
  },
  trailingSlash: false, // ou true si tu veux des URL finissant par /
};

export default nextConfig;
