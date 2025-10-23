"use client";

import { useCallback, useEffect, useState } from "react";
import { Download, Loader2, Search } from "lucide-react";

import {
    exportContactsToCSV,
    formatDate,
    truncateText,
} from "@/lib/dashboard-utils";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

type Contact = Database["public"]["Tables"]["contacts"]["Row"];

export function ContactsTable() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(
        null,
    );
    const { toast } = useToast();

    const fetchContacts = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/dashboard/contacts");
            const data = await response.json();

            if (response.ok) {
                setContacts(data.contacts || []);
            } else {
                toast({
                    title: "Error",
                    description: "Failed to fetch contacts",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error("Error fetching contacts:", error);
            toast({
                title: "Error",
                description: "Failed to fetch contacts",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }, [toast]);

    // Fetch initial contacts
    useEffect(() => {
        fetchContacts();
    }, [fetchContacts]);

    // Set up real-time subscription
    useEffect(() => {
        const supabase = createClient();

        const channel = supabase
            .channel("contacts-changes")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "contacts",
                },
                payload => {
                    if (payload.eventType === "INSERT") {
                        const newContact = payload.new as Contact;
                        setContacts(prev => [newContact, ...prev]);
                        toast({
                            title: "New Contact Received",
                            description: `From ${newContact.name}`,
                        });
                    } else if (payload.eventType === "DELETE") {
                        setContacts(prev =>
                            prev.filter(
                                contact => contact.id !== payload.old.id,
                            ),
                        );
                    } else if (payload.eventType === "UPDATE") {
                        setContacts(prev =>
                            prev.map(contact =>
                                contact.id === payload.new.id
                                    ? (payload.new as Contact)
                                    : contact,
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

    // Filter contacts based on search
    useEffect(() => {
        if (!search) {
            setFilteredContacts(contacts);
        } else {
            const searchLower = search.toLowerCase();
            setFilteredContacts(
                contacts.filter(
                    contact =>
                        contact.name.toLowerCase().includes(searchLower) ||
                        contact.phone.toLowerCase().includes(searchLower) ||
                        contact.message.toLowerCase().includes(searchLower),
                ),
            );
        }
    }, [search, contacts]);

    function handleExport() {
        exportContactsToCSV(
            filteredContacts,
            `contacts-${new Date().toISOString().split("T")[0]}.csv`,
        );
        toast({
            title: "Export Successful",
            description: `Exported ${filteredContacts.length} contacts`,
        });
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1">
                    <Search className="text-primary-text/40 absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                    <Input
                        placeholder="Search contacts..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="border-brown-300 bg-brown-50 text-primary-text placeholder:text-primary-text/40 pl-10"
                    />
                </div>
                <Button
                    onClick={handleExport}
                    variant="outline"
                    disabled={filteredContacts.length === 0}
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
                                <TableHead>Name</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Message</TableHead>
                                <TableHead>Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredContacts.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="text-primary-text/60 text-center"
                                    >
                                        No contacts found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredContacts.map(contact => (
                                    <TableRow
                                        key={contact.id}
                                        className="hover:bg-brown-100/50 cursor-pointer"
                                        onClick={() =>
                                            setSelectedContact(contact)
                                        }
                                    >
                                        <TableCell className="text-primary-text font-medium">
                                            {contact.name}
                                        </TableCell>
                                        <TableCell className="text-primary-text">
                                            {contact.phone}
                                        </TableCell>
                                        <TableCell className="text-primary-text">
                                            {truncateText(contact.message, 50)}
                                        </TableCell>
                                        <TableCell className="text-primary-text/60 text-sm">
                                            {formatDate(contact.created_at)}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                )}
            </div>

            <div className="text-primary-text/60 text-sm">
                Total: {filteredContacts.length} contact
                {filteredContacts.length !== 1 ? "s" : ""}
            </div>

            {/* Contact Detail Dialog */}
            <Dialog
                open={!!selectedContact}
                onOpenChange={() => setSelectedContact(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Contact Details</DialogTitle>
                        <DialogDescription>
                            Submitted on{" "}
                            {selectedContact &&
                                formatDate(selectedContact.created_at)}
                        </DialogDescription>
                    </DialogHeader>
                    {selectedContact && (
                        <div className="space-y-4">
                            <div>
                                <p className="text-primary-text/60 text-sm font-medium">
                                    Name
                                </p>
                                <p className="text-primary-text text-base">
                                    {selectedContact.name}
                                </p>
                            </div>
                            <div>
                                <p className="text-primary-text/60 text-sm font-medium">
                                    Phone
                                </p>
                                <p className="text-primary-text text-base">
                                    {selectedContact.phone}
                                </p>
                            </div>
                            <div>
                                <p className="text-primary-text/60 text-sm font-medium">
                                    Message
                                </p>
                                <p className="text-primary-text whitespace-pre-wrap text-base">
                                    {selectedContact.message}
                                </p>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
