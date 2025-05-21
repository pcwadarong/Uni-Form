/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { domains: ["firebase.google.com"] },
  matcher: ["/user/:path*"],
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
