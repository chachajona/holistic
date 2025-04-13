"use client";

import { useEffect, useRef, useState } from "react";

interface LogoFillWaveBubblesLoaderProps {
    text?: string;
    size?: "small" | "medium" | "large";
    showText?: boolean;
    waveColor?: string;
    backgroundColor?: string;
    fillDuration?: number;
    autoRestart?: boolean;
    fillPercentage?: number;
    bubbleCount?: number;
}

export default function LogoFillWaveBubblesLoader({
    text = "Loading",
    size = "medium",
    showText = true,
    waveColor = "#9C8D87",
    backgroundColor = "rgba(220, 209, 205, 0.5)",
    fillDuration = 3,
    autoRestart = true,
    fillPercentage: externalFillPercentage,
    bubbleCount = 10,
}: LogoFillWaveBubblesLoaderProps) {
    const [dots, setDots] = useState(".");
    const [fillPercentage, setFillPercentage] = useState(0);
    const [bubbles, setBubbles] = useState<
        Array<{
            id: number;
            size: number;
            left: number;
            delay: number;
            duration: number;
        }>
    >([]);
    const animationRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);

    // Size mapping
    const sizeMap = {
        small: {
            container: "w-16 h-16",
            logo: 60,
            text: "text-sm",
            wave: 8,
        },
        medium: {
            container: "w-24 h-24",
            logo: 80,
            text: "text-base",
            wave: 12,
        },
        large: {
            container: "w-32 h-32",
            logo: 100,
            text: "text-lg",
            wave: 16,
        },
    };

    // Generate bubbles
    useEffect(() => {
        const newBubbles = Array.from({ length: bubbleCount }, (_, i) => ({
            id: i,
            size: Math.random() * 6 + 3, // 3-9px
            left: Math.random() * 80 + 10, // 10-90%
            delay: Math.random() * 2, // 0-2s delay
            duration: Math.random() * 2 + 2, // 2-4s duration
        }));
        setBubbles(newBubbles);
    }, [bubbleCount]);

    // Animate the dots
    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => {
                if (prev.length >= 3) return ".";
                return prev + ".";
            });
        }, 500);

        return () => clearInterval(interval);
    }, []);

    // Fill animation
    useEffect(() => {
        if (typeof externalFillPercentage === "number") {
            // If external fill percentage is provided, use it
            setFillPercentage(externalFillPercentage);
            return;
        }

        const animate = (timestamp: number) => {
            if (startTimeRef.current === null) {
                startTimeRef.current = timestamp;
            }

            const elapsed = timestamp - startTimeRef.current;
            const progress = Math.min(elapsed / (fillDuration * 1000), 1);

            const newFillPercentage = progress * 100;
            setFillPercentage(newFillPercentage);

            if (progress < 1) {
                animationRef.current = requestAnimationFrame(animate);
            } else if (autoRestart) {
                // Reset animation for continuous effect
                startTimeRef.current = null;
                setFillPercentage(0);
                animationRef.current = requestAnimationFrame(animate);
            }
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [fillDuration, autoRestart, externalFillPercentage]);

    // Calculate lighter and darker shades of the wave color
    const getLighterColor = (color: string, percent: number) => {
        // For hex colors
        if (color.startsWith("#")) {
            const hex = color.slice(1);
            const r = Number.parseInt(hex.slice(0, 2), 16);
            const g = Number.parseInt(hex.slice(2, 4), 16);
            const b = Number.parseInt(hex.slice(4, 6), 16);

            const newR = Math.min(255, r + ((255 - r) * percent) / 100);
            const newG = Math.min(255, g + ((255 - g) * percent) / 100);
            const newB = Math.min(255, b + ((255 - b) * percent) / 100);

            return `rgb(${Math.round(newR)}, ${Math.round(newG)}, ${Math.round(newB)})`;
        }

        // For other formats, return original
        return color;
    };

    const lighterColor = getLighterColor(waveColor, 20);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="relative">
                {/* Logo container with mask */}
                <div
                    className={`relative ${sizeMap[size].container} flex items-center justify-center overflow-hidden`}
                    style={{
                        backgroundColor,
                        WebkitMaskImage: `url(/logo.svg)`,
                        maskImage: `url(/logo.svg)`,
                        WebkitMaskSize: "contain",
                        maskSize: "contain",
                        WebkitMaskRepeat: "no-repeat",
                        maskRepeat: "no-repeat",
                        WebkitMaskPosition: "center",
                        maskPosition: "center",
                    }}
                >
                    {/* Fill container that grows from bottom to top */}
                    <div
                        className="absolute inset-x-0 bottom-0 w-full transition-all duration-300 ease-out"
                        style={{
                            height: `${fillPercentage}%`,
                            background: `linear-gradient(to bottom, ${lighterColor}, ${waveColor})`,
                        }}
                    >
                        {/* Wave SVG - much more pronounced and visible */}
                        <div
                            className="absolute inset-x-0 w-full"
                            style={{
                                top: `-${sizeMap[size].wave}px`,
                                height: `${sizeMap[size].wave}px`,
                            }}
                        >
                            <svg
                                width="100%"
                                height={sizeMap[size].wave}
                                className="animate-wave-slow"
                                preserveAspectRatio="none"
                                viewBox="0 0 100 20"
                            >
                                <path
                                    d="M0,20 L0,10 C15,0 35,20 50,10 C65,0 85,20 100,10 L100,20 Z"
                                    fill={waveColor}
                                />
                            </svg>

                            <svg
                                width="100%"
                                height={sizeMap[size].wave}
                                className="animate-wave-medium absolute left-0 top-0"
                                preserveAspectRatio="none"
                                viewBox="0 0 100 20"
                                style={{ opacity: 0.7 }}
                            >
                                <path
                                    d="M0,20 L0,10 C30,15 70,5 100,10 L100,20 Z"
                                    fill={lighterColor}
                                />
                            </svg>
                        </div>

                        {/* Bubbles */}
                        {bubbles.map(bubble => (
                            <div
                                key={bubble.id}
                                className="absolute rounded-full bg-white"
                                style={{
                                    width: `${bubble.size}px`,
                                    height: `${bubble.size}px`,
                                    left: `${bubble.left}%`,
                                    bottom: "10%",
                                    opacity: 0.7,
                                    animation: `bubble ${bubble.duration}s ease-in ${bubble.delay}s infinite`,
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Loading text with percentage */}
            {showText && (
                <div
                    className={`mt-4 ${sizeMap[size].text} flex items-center font-medium tracking-wide`}
                >
                    <span>{text}</span>
                    <span className="w-6 text-left">{dots}</span>
                    <span className="ml-2 text-sm">
                        {Math.round(fillPercentage)}%
                    </span>
                </div>
            )}

            {/* Add bubble animation keyframes */}
            <style jsx global>{`
                @keyframes bubble {
                    0% {
                        transform: translateY(0) scale(1);
                        opacity: 0.7;
                    }
                    100% {
                        transform: translateY(-100px) scale(0.5);
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    );
}
