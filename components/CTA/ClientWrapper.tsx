"use client";

import { Suspense } from "react";

import { WellnessCTA } from "./index";

export default function WellnessCTAClient() {
    return (
        <Suspense
            fallback={
                <div className="py-16 text-center">
                    Loading wellness section...
                </div>
            }
        >
            <WellnessCTA />
        </Suspense>
    );
}
