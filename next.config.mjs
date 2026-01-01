/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: '/docs-static',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  async rewrites() {
    return [
      {
        source: '/blog/:path*',
        destination: '/null-mdx/blog/:path*',
      },
      {
        source: '/docs/:path*',
        destination: '/null-mdx/docs/:path*',
      },
      {
        source: '/about',
        destination: '/null-mdx/about',
      },
      {
        source: '/design/:path*',
        destination: '/null-mdx/design/:path*',
      },
      {
        source: '/assets',
        destination: '/null-mdx/assets',
      },
      {
        source: '/api/null-mdx/assets/:path*',
        destination: '/null-mdx/api/assets/:path*',
      },
      {
        source: '/api/null-mdx/search',
        destination: '/null-mdx/api/search',
      },
    ]
  },
}

export default nextConfig
