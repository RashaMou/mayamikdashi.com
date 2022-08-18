/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    newNextLinkBehavior: true,
  },
  images: {
    domains: ['localhost', 'mayamikdashi.herokuapp.com', 'res.cloudinary.com'],
  },
};

module.exports = nextConfig;
