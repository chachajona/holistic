"use client";

import { useLocale } from "@/providers/LocaleProvider";
import { Languages } from "lucide-react";

import { languages } from "@/lib/i18n/languages";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageSwitcher() {
    const { locale, setLocale } = useLocale();

    const currentLanguage = languages.find(lang => lang.id === locale);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="font-robotoSlab text-primary-text hover:bg-navbar-accent-background/25 focus:bg-navbar-accent-background/25 md:font-robotoSerif md:text-navbar-text md:hover:bg-navbar-accent-background/90 md:hover:text-navbar-text gap-2 transition-colors"
                >
                    <Languages className="size-4" />
                    <span className="font-normal">
                        {currentLanguage?.title}
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="center"
                className="bg-primary-background text-primary-text border-primary-text/10 font-robotoSlab md:font-robotoSerif shadow-lg"
            >
                {languages.map(lang => (
                    <DropdownMenuItem
                        key={lang.id}
                        onClick={() => setLocale(lang.id)}
                        className={`cursor-pointer font-normal ${
                            locale === lang.id
                                ? "bg-navbar-accent-background/35 text-primary-text md:bg-navbar-accent-background/25 font-semibold"
                                : "text-primary-text hover:bg-navbar-accent-background/25"
                        }`}
                    >
                        {lang.title}
                        {locale === lang.id && <span className="ml-2">✓</span>}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
