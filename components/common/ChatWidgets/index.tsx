"use client";

import React from "react";
import { usePathname } from "next/navigation";

import MessengerChat from "@/components/common/MessengerChat";
import ZaloChat from "@/components/common/ZaloChat";

/**
 * ChatWidgets component that displays both Zalo and Messenger chat buttons
 * stacked vertically with Zalo above Messenger
 * Appears globally on all pages except Sanity Studio (/studio routes)
 */
const ChatWidgets: React.FC = () => {
    const pathname = usePathname();

    // Don't render chat widgets in Sanity Studio
    if (pathname?.startsWith("/studio")) {
        return null;
    }

    return (
        <>
            <ZaloChat className="bottom-24" />
            <MessengerChat />
        </>
    );
};

export default ChatWidgets;
