"use client";

import React from "react";
import MessengerChat from "@/components/common/MessengerChat";
import ZaloChat from "@/components/common/ZaloChat";

/**
 * ChatWidgets component that displays both Zalo and Messenger chat buttons
 * stacked vertically with Zalo above Messenger
 * Appears globally on all pages
 */
const ChatWidgets: React.FC = () => {
    return (
        <>
            <ZaloChat className="bottom-24" />
            <MessengerChat />
        </>
    );
};

export default ChatWidgets;
