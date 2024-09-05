/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [{ hostname: "raw.githubusercontent.com" }],
  },
};

export default config;
