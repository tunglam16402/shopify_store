import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['cdn.shopify.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.prismic.io',
      },
      {
        protocol: 'https',
        hostname: 'images.cdn.prismic.io',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
    ],
  },
  // reactCompiler: true,
  cacheComponents: true,
  // experimental: {
  //   ppr: 'incremental',
  // },
}

export default nextConfig
