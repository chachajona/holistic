"use client";

import { ReactNode, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import LogoFillWaveBubblesLoader from "@/components/common/Loading";

interface PageLoaderWrapperProps {
    children: ReactNode;
    isContentLoaded: boolean;
    minLoadTimeMs?: number;
}

export default function PageLoaderWrapper({
    children,
    isContentLoaded,
    minLoadTimeMs = 2500,
}: PageLoaderWrapperProps) {
    const [isDisplayingLoader, setIsDisplayingLoader] = useState(true);
    const [startTime] = useState(Date.now());

    useEffect(() => {
        if (isContentLoaded) {
            const elapsedTime = Date.now() - startTime;
            const remainingTime = minLoadTimeMs - elapsedTime;

            if (remainingTime <= 0) {
                setIsDisplayingLoader(false);
            } else {
                const timer = setTimeout(() => {
                    setIsDisplayingLoader(false);
                }, remainingTime);
                return () => clearTimeout(timer);
            }
        }
    }, [isContentLoaded, minLoadTimeMs, startTime]);

    return (
        <div className="relative min-h-screen">
            <AnimatePresence>
                {isDisplayingLoader && (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-primary-background fixed inset-0 z-50 flex items-center justify-center"
                    >
                        <LogoFillWaveBubblesLoader
                            showText={false}
                            size="medium"
                            autoRestart={false}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            <div
                className={`min-h-screen ${isDisplayingLoader ? "opacity-0" : "opacity-100 transition-opacity delay-100 duration-300"}`}
            >
                {children}
            </div>
        </div>
    );
}
