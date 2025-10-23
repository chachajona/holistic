"use client";

import { useState } from "react";
import { Activity, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ContactsTable } from "./ContactsTable";
import { NewsletterTable } from "./NewsletterTable";

export function DashboardClient() {
    const [activeTab, setActiveTab] = useState("contacts");
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
                            Manage contacts and newsletter subscribers
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

                {/* Tabs */}
                <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                >
                    <TabsList className="bg-primary-background grid w-full max-w-md grid-cols-2">
                        <TabsTrigger
                            value="contacts"
                            className="text-primary-text data-[state=active]:bg-navbar-accent-background data-[state=active]:text-navbar-text"
                        >
                            Contacts
                        </TabsTrigger>
                        <TabsTrigger
                            value="newsletter"
                            className="text-primary-text data-[state=active]:bg-navbar-accent-background data-[state=active]:text-navbar-text"
                        >
                            Newsletter Subscribers
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="contacts" className="mt-6">
                        <div className="bg-primary-background rounded-lg p-6 shadow-md">
                            <ContactsTable />
                        </div>
                    </TabsContent>

                    <TabsContent value="newsletter" className="mt-6">
                        <div className="bg-primary-background rounded-lg p-6 shadow-md">
                            <NewsletterTable />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
