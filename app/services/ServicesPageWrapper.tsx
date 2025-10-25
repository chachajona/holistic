"use client";

import { createContext, useContext, useState, ReactNode } from "react";

import PageLoaderWrapper from "@/components/common/PageLoaderWrapper";

interface ServicesLoadingContextType {
    setContentLoaded: () => void;
}

const ServicesLoadingContext = createContext<
    ServicesLoadingContextType | undefined
>(undefined);

export function useServicesLoading() {
    const context = useContext(ServicesLoadingContext);
    return context;
}

interface ServicesPageWrapperProps {
    children: ReactNode;
}

export function ServicesPageWrapper({ children }: ServicesPageWrapperProps) {
    const [isContentLoaded, setIsContentLoaded] = useState(false);

    const contextValue = {
        setContentLoaded: () => setIsContentLoaded(true),
    };

    return (
        <ServicesLoadingContext.Provider value={contextValue}>
            <PageLoaderWrapper isContentLoaded={isContentLoaded}>
                {children}
            </PageLoaderWrapper>
        </ServicesLoadingContext.Provider>
    );
}
