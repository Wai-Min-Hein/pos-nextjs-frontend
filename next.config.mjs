/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*', // Match all routes starting with /api/
          destination: 'https://expresspos.vercel.app/:path*', // Proxy to the backend
        },
      ];
    },
  };
  
  export default nextConfig;
  