

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "winpax-files.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
