/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The repo still uses the flat-config ESLint from the Vite era; lint manually via
  // `npm run lint` rather than blocking the production build on it.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
