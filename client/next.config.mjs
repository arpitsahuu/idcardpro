/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "plus.unsplash.com",
          },
          {
            protocol: "https",
            hostname: "ik.imagekit.io",
          },
          {
            protocol: "https",
            hostname: "images.unsplash.com",
          },
          {
            protocol: "https",
            hostname: "res.cloudinary.com",
          },
          {
            protocol: "http",
            hostname: "res.cloudinary.com",
          },
        ],
      },
};

export default nextConfig;
