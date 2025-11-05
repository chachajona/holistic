"use client";

import React from "react";
import { useLocale } from "@/providers/LocaleProvider";
import { FaFacebookMessenger } from "react-icons/fa";

import { getTranslationString } from "@/lib/i18n/utils";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * MessengerChat component props
 * @interface MessengerChatProps
 * @property {string} [pageId] - Facebook page ID (defaults to NEXT_PUBLIC_FACEBOOK_PAGE_ID env var)
 * @property {string} [themeColor] - Theme color for the button (defaults to #9a7f74)
 * @property {string} [className] - Additional CSS classes
 * @property {() => void} [onMessengerClick] - Callback fired when messenger button is clicked
 */
interface MessengerChatProps {
    pageId?: string;
    themeColor?: string;
    className?: string;
    onMessengerClick?: () => void;
}

// Constants
const TOOLTIP_DELAY_MS = 300;
const TOOLTIP_OFFSET_PX = 12;
const DEFAULT_THEME_COLOR = "#9a7f74";
const FACEBOOK_PAGE_ID_REGEX = /^\d{15,17}$/;

const MessengerChat: React.FC<MessengerChatProps> = ({
    pageId = process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID || "",
    themeColor = DEFAULT_THEME_COLOR,
    className = "",
    onMessengerClick,
}) => {
    const { t } = useLocale();

    // Validation
    if (!pageId) {
        console.warn("MessengerChat: Missing NEXT_PUBLIC_FACEBOOK_PAGE_ID");
        return null;
    }

    if (!FACEBOOK_PAGE_ID_REGEX.test(pageId)) {
        console.error(
            `MessengerChat: Invalid PAGE_ID format "${pageId}". Expected numeric ID.`,
        );
        return null;
    }

    const messengerUrl = `https://m.me/${pageId}`;
    const openChatLabel = getTranslationString(
        t("messenger.openChat"),
        "Open Messenger Chat",
    );
    const chatWithUsLabel = getTranslationString(
        t("messenger.chatWithUs"),
        "Chat with us on Messenger",
    );

    const handleClick = () => {
        // Analytics tracking hook
        if (onMessengerClick) {
            onMessengerClick();
        }

        // Optional: Add Google Analytics tracking
        if (typeof window !== "undefined" && window.gtag) {
            window.gtag("event", "messenger_click", {
                event_category: "engagement",
                event_label: "messenger_chat_button",
            });
        }
    };

    return (
        <div
            className={cn("fixed bottom-4 end-4 z-[100]", className)}
            data-testid="messenger-chat-widget"
        >
            <TooltipProvider delayDuration={TOOLTIP_DELAY_MS}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            asChild
                            variant="default"
                            size="icon"
                            className="size-10 rounded-full p-3 shadow-lg transition-all hover:scale-110 md:size-14 md:p-4 lg:size-16 lg:p-5"
                            style={{
                                backgroundColor: themeColor,
                            }}
                            aria-label={openChatLabel}
                            data-testid="messenger-chat-button"
                        >
                            <a
                                href={messengerUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={handleClick}
                                data-testid="messenger-chat-link"
                            >
                                <FaFacebookMessenger className="size-6 text-white md:size-7 lg:size-8" />
                            </a>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent
                        side="left"
                        sideOffset={TOOLTIP_OFFSET_PX}
                        data-testid="messenger-chat-tooltip"
                    >
                        <p className="font-medium">{chatWithUsLabel}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
};

export default MessengerChat;
