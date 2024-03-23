/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["picsum.photos"]
    },
    experimental: {
        forceSwcTransforms: true,
      },
}

module.exports = nextConfig
