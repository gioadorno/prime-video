/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export", 
	images: {
		domains: ["static.vecteezy.com", "themoviedb.org", "image.tmdb.org"],
	},
};

module.exports = nextConfig;
