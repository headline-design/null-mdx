/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: '/docs-static',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
 
}

export default nextConfig
