/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static HTML export
  output: 'export',

  // Ignore TypeScript build errors if needed
  typescript: {
    ignoreBuildErrors: true,
  },

  // Allow images without optimization
  images: {
    unoptimized: true,
  },

  // React strict mode
  reactStrictMode: true,
}

export default nextConfig
