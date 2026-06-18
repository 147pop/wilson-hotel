

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "winpax-files.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
