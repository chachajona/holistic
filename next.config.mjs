/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    serverExternalPackages: ["sharp"],
    experimental: {
        esmExternals: true,
    },
    turbopack: {
        rules: {
            "*.svg": {
                loaders: ["@svgr/webpack"],
                as: "*.js",
            },
        },
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
