"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { FaFacebookMessenger } from "react-icons/fa";

import { Button } from "@/components/ui/button";

interface MessengerChatProps {
    pageId?: string;
    themeColor?: string;
    loggedInGreeting?: string;
    loggedOutGreeting?: string;
}

declare global {
    interface Window {
        fbAsyncInit?: () => void;
        FB: any;
    }
}

const MessengerChat: React.FC<MessengerChatProps> = ({
    pageId = "holisticrep",
    themeColor = "#9a7f74",
    loggedInGreeting = "Xin chào! Chúng tôi có thể giúp gì cho bạn?",
    loggedOutGreeting = "Xin chào! Chúng tôi có thể giúp gì cho bạn?",
}) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Load Facebook SDK
        const loadFacebookSDK = () => {
            const script = document.createElement("script");
            script.src =
                "https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js";
            script.async = true;
            script.defer = true;
            script.crossOrigin = "anonymous";
            document.body.appendChild(script);

            window.fbAsyncInit = () => {
                window.FB?.init({
                    xfbml: true,
                    version: "v18.0",
                });
            };
        };

        loadFacebookSDK();

        return () => {
            delete window?.fbAsyncInit;
            const fbRoot = document.getElementById("fb-root");
            if (fbRoot) fbRoot.remove();
            const fbScript = document.querySelector(
                'script[src*="connect.facebook.net"]',
            );
            if (fbScript) fbScript.remove();
        };
    }, []);

    const toggleChat = () => {
        setIsOpen(!isOpen);
        if (window.FB) {
            if (!isOpen) {
                window.FB.CustomerChat.show(true);
                window.FB.CustomerChat.showDialog();
            } else {
                window.FB.CustomerChat.hide();
            }
        }
    };

    return (
        <>
            {/* Facebook Customer Chat Plugin */}
            <div id="fb-root" />
            <div
                className="fb-customerchat"
                data-attribution="biz_inbox"
                data-page-id={pageId}
                data-theme-color={themeColor}
                data-logged-in-greeting={loggedInGreeting}
                data-logged-out-greeting={loggedOutGreeting}
            />

            <div className="fixed bottom-4 end-4 z-[100]">
                <Button
                    onClick={toggleChat}
                    variant="default"
                    size="icon"
                    className="rounded-full bg-[#9a7f74] p-3 shadow-lg hover:bg-[#9a7f74]/90"
                    aria-label="Open chat"
                >
                    {isOpen ? (
                        <X className="size-6 text-white" />
                    ) : (
                        <FaFacebookMessenger className="size-6 text-white" />
                    )}
                </Button>
            </div>
        </>
    );
};

export default MessengerChat;
