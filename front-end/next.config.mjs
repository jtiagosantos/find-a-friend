/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'find-a-friend-app.s3.amazonaws.com',
      },
    ],
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/organizacao/entrar',
        permanent: false,
      },
      {
        source: '/organizacao',
        destination: '/organizacao/entrar',
        permanent: false,
      },
    ];
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    config.optimization.minimize = true;

    return config;
  },
};

export default nextConfig;
