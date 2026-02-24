import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['i.ibb.co'], 
  },
  typescript: {
    ignoreBuildErrors: true,
  },

};

export default nextConfig;
