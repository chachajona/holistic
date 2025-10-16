/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    serverExternalPackages: ["sharp"],
    experimental: {
        esmExternals: true,
    },
    async rewrites() {
        return [
            {
                source: "/dich-vu",
                destination: "/services",
            },
            {
                source: "/gioi-thieu",
                destination: "/about",
            },
            {
                source: "/phuong-phap",
                destination: "/treatments",
            },
            {
                source: "/phuong-phap/:slug",
                destination: "/treatments/:slug",
            },
            {
                source: "/dat-lich",
                destination: "/booking",
            },
            {
                source: "/blog/:slug",
                destination: "/blog/:slug",
            },
        ];
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
