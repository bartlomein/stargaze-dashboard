/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.stargaze-apis.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
