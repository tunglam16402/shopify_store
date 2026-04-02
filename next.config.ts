import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['cdn.shopify.com', 'cvpfzhthbagmelqgibke.supabase.co'],
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
