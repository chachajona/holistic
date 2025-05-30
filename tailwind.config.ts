import type { Config } from "tailwindcss";

const config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "1.25rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            fontFamily: {
                roboto: ["var(--font-roboto)"],
                robotoSerif: ["var(--font-serif)"],
                robotoMono: ["var(--font-mono)"],
                robotoSlab: ["var(--font-slab)"],
            },
            backgroundImage: {
                "hero-pattern": "url('/Hero.png')",
            },
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                brown: {
                    50: "#E9E4E2",
                    100: "#DED6D4",
                    200: "#C8BBB7",
                    300: "#B1A09A",
                    400: "#9B857D",
                    500: "#90776E",
                    600: "#826B63",
                    700: "#65534D",
                    800: "#483C37",
                    900: "#483C37",
                    950: "#1D1816",
                },
                "primary-text": "#744D40",
                "primary-hover": "#2B2321",
                "primary-background": "#DDD5D1",
                "navbar-background": "#9a7f74",
                "navbar-accent-background": "#90776E",
                "navbar-text": "#DDD5D1",
                "navbar-accent-text": "#2B2321",
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                shimmer: {
                    from: {
                        backgroundPosition: "0 0",
                    },
                    to: {
                        backgroundPosition: "-200% 0",
                    },
                },
                shake: {
                    "0%, 100%": { transform: "translateX(0)" },
                    "25%": { transform: "translateX(-5px)" },
                    "75%": { transform: "translateX(5px)" },
                },
                "wave-slow": {
                    "0%": { transform: "translateX(0) rotate(0)" },
                    "50%": { transform: "translateX(-25%) rotate(2deg)" },
                    "100%": { transform: "translateX(0) rotate(0)" },
                },
                "wave-medium": {
                    "0%": { transform: "translateX(0) rotate(0)" },
                    "50%": { transform: "translateX(25%) rotate(-2deg)" },
                    "100%": { transform: "translateX(0) rotate(0)" },
                },
                bubble: {
                    "0%": {
                        transform: "translateY(0)",
                        opacity: "0.7",
                    },
                    "100%": {
                        transform: "translateY(-100px)",
                        opacity: "0",
                    },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                shimmer: "shimmer 2s linear infinite",
                shake: "shake 3s ease-in-out infinite",
                "wave-slow": "wave-slow 7s ease-in-out infinite",
                "wave-medium": "wave-medium 5s ease-in-out infinite",
                bubble: "bubble 3s ease-in infinite",
            },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
        require("@tailwindcss/typography"),
    ],
} satisfies Config;

export default config;
