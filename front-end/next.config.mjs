/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/entrar',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
