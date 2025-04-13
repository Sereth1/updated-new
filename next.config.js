/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "avatars.githubusercontent.com", // GitHub avatars
      "lh3.googleusercontent.com", // Google avatars
      "platform-lookaside.fbsbx.com", // Facebook avatars
    ],
  },
};

module.exports = nextConfig;
