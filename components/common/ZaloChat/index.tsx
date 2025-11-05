"use client";

import React from "react";
import { useLocale } from "@/providers/LocaleProvider";
import { SiZalo } from "react-icons/si";

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
 * ZaloChat component props
 * @interface ZaloChatProps
 * @property {string} [zaloId] - Zalo ID (defaults to NEXT_PUBLIC_ZALO_ID env var)
 * @property {string} [themeColor] - Theme color for the button (defaults to #826B63)
 * @property {string} [className] - Additional CSS classes
 * @property {() => void} [onZaloClick] - Callback fired when zalo button is clicked
 */
interface ZaloChatProps {
    zaloId?: string;
    themeColor?: string;
    className?: string;
    onZaloClick?: () => void;
}

// Constants
const TOOLTIP_DELAY_MS = 300;
const TOOLTIP_OFFSET_PX = 12;
const DEFAULT_THEME_COLOR = "#826B63";
const ZALO_ID_REGEX = /^\d+$/;

const ZaloChat: React.FC<ZaloChatProps> = ({
    zaloId = process.env.NEXT_PUBLIC_ZALO_ID || "",
    themeColor = DEFAULT_THEME_COLOR,
    className = "",
    onZaloClick,
}) => {
    const { t } = useLocale();

    // Validation
    if (!zaloId) {
        console.warn("ZaloChat: Missing NEXT_PUBLIC_ZALO_ID");
        return null;
    }

    if (!ZALO_ID_REGEX.test(zaloId)) {
        console.error(
            `ZaloChat: Invalid Zalo ID format "${zaloId}". Expected numeric Zalo ID.`,
        );
        return null;
    }

    const zaloUrl = `https://zalo.me/${zaloId}`;
    const openChatLabel = getTranslationString(
        t("zalo.openChat"),
        "Open Zalo Chat",
    );
    const chatWithUsLabel = getTranslationString(
        t("zalo.chatWithUs"),
        "Chat with us on Zalo",
    );

    const handleClick = () => {
        // Analytics tracking hook
        if (onZaloClick) {
            onZaloClick();
        }

        // Optional: Add Google Analytics tracking
        if (typeof window !== "undefined" && window.gtag) {
            window.gtag("event", "zalo_click", {
                event_category: "engagement",
                event_label: "zalo_chat_button",
            });
        }
    };

    return (
        <div
            className={cn("fixed bottom-4 end-4 z-[100]", className)}
            data-testid="zalo-chat-widget"
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
                            data-testid="zalo-chat-button"
                        >
                            <a
                                href={zaloUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={handleClick}
                                data-testid="zalo-chat-link"
                            >
                                <SiZalo className="size-6 text-white md:size-7 lg:size-8" />
                            </a>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent
                        side="left"
                        sideOffset={TOOLTIP_OFFSET_PX}
                        data-testid="zalo-chat-tooltip"
                    >
                        <p className="font-medium">{chatWithUsLabel}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
};

export default ZaloChat;
