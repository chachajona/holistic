/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    serverExternalPackages: ["sharp"],
    experimental: {
        esmExternals: true,
        turbo: {
            rules: {
                "*.svg": {
                    loaders: ["@svgr/webpack"],
                    as: "*.js",
                },
            },
        },
        allowedDevOrigins: ['http://localhost:3000', 'http://127.0.0.1:3000', 'https://3000-idx-holistic-1744517801727.cluster-bec2e4635ng44w7ed22sa22hes.cloudworkstations.dev'],
    },
    images: {
        domains: ["images.unsplash.com"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.sanity.io",
            },
        ],
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                child_process: false,
                path: false,
                os: false,
            };
        }
        return config;
    },
};

export default nextConfig;
