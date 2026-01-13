/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ['@fluently/ui', '@fluently/types', '@neondatabase/auth'],
    optimizePackageImports: ['@fluently/ui'],
    async redirects() {
        return [
            {
                source: '/login',
                destination: '/auth/sign-in',
                permanent: true,
            },
            {
                source: '/register',
                destination: '/auth/sign-up',
                permanent: true,
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            'lucide-react': require.resolve('lucide-react'),
        };
        return config;
    },
};

module.exports = nextConfig;
