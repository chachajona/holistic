"use client";

import { useCallback, useEffect, useState } from "react";
import { Download, Loader2, Search } from "lucide-react";

import { exportNewsletterToCSV, formatDate } from "@/lib/dashboard-utils";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

type NewsletterSubscriber =
    Database["public"]["Tables"]["newsletter_subscribers"]["Row"];

export function NewsletterTable() {
    const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
    const [filteredSubscribers, setFilteredSubscribers] = useState<
        NewsletterSubscriber[]
    >([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    const fetchSubscribers = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/dashboard/newsletter");
            const data = await response.json();

            if (response.ok) {
                setSubscribers(data.subscribers || []);
            } else {
                toast({
                    title: "Error",
                    description: "Failed to fetch newsletter subscribers",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error("Error fetching newsletter subscribers:", error);
            toast({
                title: "Error",
                description: "Failed to fetch newsletter subscribers",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }, [toast]);

    // Fetch initial subscribers
    useEffect(() => {
        fetchSubscribers();
    }, [fetchSubscribers]);

    // Set up real-time subscription
    useEffect(() => {
        const supabase = createClient();

        const channel = supabase
            .channel("newsletter-changes")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "newsletter_subscribers",
                },
                payload => {
                    if (payload.eventType === "INSERT") {
                        const newSubscriber =
                            payload.new as NewsletterSubscriber;
                        setSubscribers(prev => [newSubscriber, ...prev]);
                        toast({
                            title: "New Newsletter Subscriber",
                            description: `Phone: ${newSubscriber.phone_number}`,
                        });
                    } else if (payload.eventType === "DELETE") {
                        setSubscribers(prev =>
                            prev.filter(
                                subscriber => subscriber.id !== payload.old.id,
                            ),
                        );
                    } else if (payload.eventType === "UPDATE") {
                        setSubscribers(prev =>
                            prev.map(subscriber =>
                                subscriber.id === payload.new.id
                                    ? (payload.new as NewsletterSubscriber)
                                    : subscriber,
                            ),
                        );
                    }
                },
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [toast]);

    // Filter subscribers based on search
    useEffect(() => {
        if (!search) {
            setFilteredSubscribers(subscribers);
        } else {
            const searchLower = search.toLowerCase();
            setFilteredSubscribers(
                subscribers.filter(
                    subscriber =>
                        subscriber.phone_number
                            .toLowerCase()
                            .includes(searchLower) ||
                        subscriber.email?.toLowerCase().includes(searchLower),
                ),
            );
        }
    }, [search, subscribers]);

    function handleExport() {
        exportNewsletterToCSV(
            filteredSubscribers,
            `newsletter-subscribers-${new Date().toISOString().split("T")[0]}.csv`,
        );
        toast({
            title: "Export Successful",
            description: `Exported ${filteredSubscribers.length} subscribers`,
        });
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1">
                    <Search className="text-primary-text/40 absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                    <Input
                        placeholder="Search subscribers..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="border-brown-300 bg-brown-50 text-primary-text placeholder:text-primary-text/40 pl-10"
                    />
                </div>
                <Button
                    onClick={handleExport}
                    variant="outline"
                    disabled={filteredSubscribers.length === 0}
                    className="border-brown-300 bg-brown-100 text-primary-text hover:bg-brown-200"
                >
                    <Download className="mr-2 size-4" />
                    Export CSV
                </Button>
            </div>

            <div className="border-brown-300 rounded-md border">
                {isLoading ? (
                    <div className="flex items-center justify-center p-8">
                        <Loader2 className="text-primary-text/40 size-8 animate-spin" />
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Phone Number</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Subscribed Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredSubscribers.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={3}
                                        className="text-primary-text/60 text-center"
                                    >
                                        No subscribers found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredSubscribers.map(subscriber => (
                                    <TableRow
                                        key={subscriber.id}
                                        className="hover:bg-brown-100/50"
                                    >
                                        <TableCell className="text-primary-text font-medium">
                                            {subscriber.phone_number}
                                        </TableCell>
                                        <TableCell className="text-primary-text">
                                            {subscriber.email || "N/A"}
                                        </TableCell>
                                        <TableCell className="text-primary-text/60 text-sm">
                                            {formatDate(subscriber.created_at)}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                )}
            </div>

            <div className="text-primary-text/60 text-sm">
                Total: {filteredSubscribers.length} subscriber
                {filteredSubscribers.length !== 1 ? "s" : ""}
            </div>
        </div>
    );
}
