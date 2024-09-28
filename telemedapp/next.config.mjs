/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/login",
        destination:
          "https://telemedicine-pilot-d2anbuaxedbfdba9.southafricanorth-01.azurewebsites.net/login",
      },
    ];
  },
};

export default nextConfig;
