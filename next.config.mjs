/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true, // ← keep your compiler

  // THIS IS THE ONLY THING YOU NEED TO ADD
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;