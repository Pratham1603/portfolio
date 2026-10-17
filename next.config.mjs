/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export: the whole site is prerendered, so it deploys as plain files
  // (Cloudflare Pages "Next.js (Static HTML Export)", Vercel, GitHub Pages, etc.).
  output: "export",
  images: { unoptimized: true },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
