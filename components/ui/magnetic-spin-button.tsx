"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Magnetic } from "./magnetic";
import { SpinningText } from "./spinning-text";

interface MagneticSpinButtonProps {
    href: string;
    text: string;
    className?: string;
    size?:
        | "sm"
        | "md"
        | "lg"
        | {
              default: "sm" | "md" | "lg";
              sm?: "sm" | "md" | "lg";
              md?: "sm" | "md" | "lg";
              lg?: "sm" | "md" | "lg";
          };
}

export function MagneticSpinButton({
    href,
    text,
    className,
    size = "md",
}: MagneticSpinButtonProps) {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true });

    const sizeConfig = {
        sm: {
            buttonSize: "size-20",
            fontSize: 0.7,
            radius: 4,
            arrowSize: "size-4",
        },
        md: {
            buttonSize: "size-24",
            fontSize: 0.8,
            radius: 5,
            arrowSize: "size-5",
        },
        lg: {
            buttonSize: "size-48",
            fontSize: 1.5,
            radius: 6,
            arrowSize: "size-10",
        },
    };

    // Determine size based on breakpoint
    let sizeToUse = typeof size === "string" ? size : size.default;

    // Use useEffect or a responsive hook to update size based on screen width
    // Example with a simple window check (you can use a more sophisticated approach)
    useEffect(() => {
        if (typeof size === "object") {
            const handleResize = () => {
                const width = window.innerWidth;
                if (width >= 1024 && size.lg) sizeToUse = size.lg;
                else if (width >= 768 && size.md) sizeToUse = size.md;
                else if (width >= 640 && size.sm) sizeToUse = size.sm;
                else sizeToUse = size.default;
            };

            handleResize();
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, [size]);

    const { buttonSize, fontSize, radius, arrowSize } = sizeConfig[sizeToUse];

    return (
        <div className={cn("relative", className)} ref={containerRef}>
            <Magnetic intensity={0.5} range={300}>
                <div className="group relative">
                    {/* Button as background */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Link
                            href={href}
                            className={cn(
                                buttonSize,
                                "bg-brown-900 flex scale-110 items-center justify-center rounded-full md:scale-100 md:bg-transparent",
                                "group-hover:bg-brown-950 transition-all duration-300 group-hover:scale-110",
                            )}
                            aria-label={text}
                        >
                            <ArrowRight
                                className={`${arrowSize} text-white duration-500 group-hover:-rotate-45 `}
                                aria-hidden="true"
                            />
                        </Link>
                    </div>

                    {/* Spinning Text Ring with higher z-index */}
                    <div className="relative z-20">
                        {isInView && (
                            <SpinningText
                                className="font-robotoSlab text-white"
                                fontSize={fontSize}
                                radius={radius}
                                variants={{
                                    container: {
                                        hidden: {
                                            opacity: 1,
                                        },
                                        visible: {
                                            opacity: 1,
                                            rotate: 360,
                                            transition: {
                                                rotate: {
                                                    type: "tween",
                                                    ease: "linear",
                                                    duration: 10,
                                                    repeat: Number.POSITIVE_INFINITY,
                                                    repeatType: "loop",
                                                },
                                                staggerChildren: 0.03,
                                                delayChildren: 0.1,
                                            },
                                        },
                                    },
                                    item: {
                                        hidden: {
                                            opacity: 0,
                                            filter: "blur(4px)",
                                        },
                                        visible: {
                                            opacity: 1,
                                            filter: "blur(0px)",
                                            transition: {
                                                duration: 0.8,
                                            },
                                        },
                                    },
                                }}
                            >
                                {text}
                            </SpinningText>
                        )}
                    </div>
                </div>
            </Magnetic>
        </div>
    );
}
