/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "firebase.google.com",
      "lh3.googleusercontent.com",
      "firebasestorage.googleapis.com",
      "images.unsplash.com",
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
