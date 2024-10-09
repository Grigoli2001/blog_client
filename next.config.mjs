/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true, // Enable styled-components for SSR
  },
  images: {
    domains: ["firebasestorage.googleapis.com"], // Add your domain here
  },
};

export default nextConfig;
