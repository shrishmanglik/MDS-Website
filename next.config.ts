import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',

  // Static export doesn't support Next.js image optimization.
  // We're not using next/image yet, but this prevents build errors
  // if any component accidentally imports it.
  images: {
    unoptimized: true,
  },

  // Trailing slashes produce cleaner URLs on static hosts
  // /about/ serves /about/index.html instead of /about.html
  trailingSlash: true,
}

export default nextConfig
