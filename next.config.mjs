/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_HAS_OPEN_AI_KEY: process.env.OPENAI_API_KEY ? "true" : "false",
  },
};

export default nextConfig;
