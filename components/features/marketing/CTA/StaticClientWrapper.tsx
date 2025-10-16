"use client";

import { Suspense } from "react";

import { StaticCTA } from "./index";

export default function StaticCTAClient() {
    return (
        <Suspense
            fallback={
                <div className="py-16 text-center">
                    Loading static CTA section...
                </div>
            }
        >
            <StaticCTA />
        </Suspense>
    );
}
