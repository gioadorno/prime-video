/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/prime-video",
  distDir: "out",
  images: {
    domains: ["static.vecteezy.com", "themoviedb.org", "image.tmdb.org"],
  },
};

module.exports = nextConfig;
