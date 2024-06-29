/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

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
