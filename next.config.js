/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['multimedia.infojobs.net']
  }
}

module.exports = nextConfig
