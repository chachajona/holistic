"use client";

import { Suspense } from "react";

import { StaticCtaServer } from "./StaticCtaServer";

export default function StaticCTAClient() {
    return (
        <Suspense
            fallback={
                <div className="py-16 text-center">
                    Loading static CTA section...
                </div>
            }
        >
            <StaticCtaServer />
        </Suspense>
    );
}
