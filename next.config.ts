import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
      {
        protocol: 'https',
        hostname: 'cvpfzhthbagmelqgibke.supabase.co',
      },
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
      {
        protocol: 'https',
        hostname: 'printworksmarket.com',
      },
    ],
  },
  reactCompiler: true,
  cacheComponents: true,
  reactStrictMode: false,
  productionBrowserSourceMaps: false,
}

export default nextConfig
