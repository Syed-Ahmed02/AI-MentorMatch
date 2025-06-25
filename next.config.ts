import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: [
    '@opentelemetry/sdk-node',
    '@opentelemetry/instrumentation',
    'require-in-the-middle',
    'handlebars',
    'dotprompt'
  ],
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Exclude problematic packages from server-side bundling
      config.externals = config.externals || [];
      config.externals.push(
        '@opentelemetry/sdk-node',
        '@opentelemetry/instrumentation',
        'require-in-the-middle',
        'handlebars'
      );
    }

    // Fix for handlebars
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };

    return config;
  },
};

export default nextConfig; 