/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export: the whole site is prerendered, so it deploys as plain files
  // (Cloudflare Pages "Next.js (Static HTML Export)", Vercel, GitHub Pages, etc.).
  images: { unoptimized: true },
};

export default nextConfig;
