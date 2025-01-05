/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/prime-video",
  images: {
    domains: ["static.vecteezy.com", "themoviedb.org", "image.tmdb.org"],
  },
};

module.exports = nextConfig;
