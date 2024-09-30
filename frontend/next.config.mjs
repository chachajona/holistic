import withPlaiceholder from "@plaiceholder/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
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
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fallback: {
                    fs: false,
                    path: false,
                    os: false,
                    child_process: false,
                },
            };
        }
        return config;
    },
};

export default withPlaiceholder(nextConfig);
