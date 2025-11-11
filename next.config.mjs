/** @type {import('next').NextConfig} */
const nextConfig = {
//   output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: false, // ou true si tu veux des URL finissant par /
};

export default nextConfig;
