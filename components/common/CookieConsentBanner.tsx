"use client";

import React from "react";
import { useCookieConsent } from "@/providers/CookieConsentProvider";
import { useLocale } from "@/providers/LocaleProvider";
import { Cookie, Shield } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function CookieConsentBanner() {
    const [mounted, setMounted] = React.useState(false);
    const { settings, acceptAll, acceptNecessary } = useCookieConsent();
    const { t } = useLocale();

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || !settings.showBanner) {
        return null;
    }

    return (
        <div className="border-primary-text bg-primary-background fixed inset-x-0 bottom-0 z-[110] border-t shadow-lg">
            <div className="container mx-auto flex flex-col items-start gap-4 p-4 sm:flex-row sm:items-center">
                {/* Icon and Message */}
                <div className="flex flex-1 items-start gap-3">
                    <Cookie className="text-primary-text mt-1 size-6 shrink-0" />
                    <div className="flex-1">
                        <h3 className="text-primary-text mb-1 font-semibold">
                            {t("cookieConsent.title")}
                        </h3>
                        <p className="text-primary-text mb-2 text-sm opacity-80">
                            {t("cookieConsent.description")}
                        </p>

                        {/* Quick Links */}
                        <div className="flex flex-wrap gap-2 text-xs">
                            <Badge
                                variant="outline"
                                className="border-primary-text text-primary-text gap-1"
                            >
                                <Shield className="size-3" />
                                {t("cookieConsent.gdprCompliant")}
                            </Badge>
                            <a
                                href="/cookie-policy"
                                className="text-primary-text hover:text-primary-hover text-xs hover:underline"
                            >
                                {t("cookieConsent.cookiePolicy")}
                            </a>
                            <a
                                href="/privacy-policy"
                                className="text-primary-text hover:text-primary-hover text-xs hover:underline"
                            >
                                {t("cookieConsent.privacyPolicy")}
                            </a>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 sm:ml-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={acceptNecessary}
                        aria-label="Reject non-essential cookies"
                        className="border-primary-text text-primary-text hover:bg-primary-text/10"
                    >
                        {t("cookieConsent.reject")}
                    </Button>
                    <Button
                        size="sm"
                        onClick={acceptAll}
                        aria-label="Accept all cookies including analytics and marketing"
                        className="bg-primary-text text-primary-background hover:bg-primary-text/90"
                    >
                        {t("cookieConsent.acceptAll")}
                    </Button>
                </div>
            </div>
        </div>
    );
}
