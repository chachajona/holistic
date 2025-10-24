"use client";

import { useState } from "react";
import { Activity, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

import { ContactsTableEnhanced } from "./ContactsTableEnhanced";

export function DashboardClient() {
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    async function handleLogout() {
        setIsLoggingOut(true);
        try {
            await signOut({ callbackUrl: "/dashboard/login" });
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setIsLoggingOut(false);
        }
    }

    return (
        <div className="font-roboto bg-brown-50 min-h-screen p-4 md:p-8">
            <div className="mx-auto max-w-7xl space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="font-robotoSlab text-primary-text text-3xl font-bold">
                            Dashboard
                        </h1>
                        <p className="text-primary-text/60 mt-1 text-sm">
                            Manage all contacts in one unified view
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-primary-text/60 flex items-center gap-2 text-sm">
                            <Activity className="size-4 text-green-600" />
                            <span>Live updates enabled</span>
                        </div>
                        <Button
                            variant="outline"
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className="border-brown-300 bg-brown-100 text-primary-text hover:bg-brown-200"
                        >
                            <LogOut className="mr-2 size-4" />
                            {isLoggingOut ? "Logging out..." : "Logout"}
                        </Button>
                    </div>
                </div>

                {/* Unified Contacts Table */}
                <div className="bg-primary-background rounded-lg p-6 shadow-md">
                    <ContactsTableEnhanced />
                </div>
            </div>
        </div>
    );
}
