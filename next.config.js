/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  distDir: 'build',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
