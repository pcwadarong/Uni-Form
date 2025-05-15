/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { domains: ["firebase.google.com"] },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
