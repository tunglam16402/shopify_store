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
    ],
  },
  // experimental: {
  //   ppr: 'incremental',
  // },
}

export default nextConfig
