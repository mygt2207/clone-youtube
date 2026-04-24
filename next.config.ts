import type { NextConfig } from 'next';
import { schema } from '@/shared/libs';

schema.parse(process.env);

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [new URL('https://img.youtube.com/vi/**')],
  },
};

export default nextConfig;
