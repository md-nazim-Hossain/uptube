/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.youtube.com",
      },
    ],
  },
};

export default nextConfig;
