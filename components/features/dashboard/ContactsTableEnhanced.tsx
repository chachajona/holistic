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
import { Badge } from "@/components/ui/badge";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

type Contact = Database["public"]["Tables"]["contacts"]["Row"];

export function ContactsTableEnhanced() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState<string>("all");
    const [filterStatus, setFilterStatus] = useState<string>("all");
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
                    console.log("Change received!", payload);

                    if (payload.eventType === "INSERT") {
                        const newContact = payload.new as Contact;
                        setContacts(prev => [newContact, ...prev]);
                        toast({
                            title: "New Contact",
                            description: `New contact from ${newContact.name}`,
                        });
                    } else if (payload.eventType === "UPDATE") {
                        const updatedContact = payload.new as Contact;
                        setContacts(prev =>
                            prev.map(contact =>
                                contact.id === updatedContact.id
                                    ? updatedContact
                                    : contact,
                            ),
                        );
                    } else if (payload.eventType === "DELETE") {
                        const deletedId = payload.old.id;
                        setContacts(prev =>
                            prev.filter(contact => contact.id !== deletedId),
                        );
                    }
                },
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [toast]);

    // Filter contacts based on search, type, and status
    useEffect(() => {
        let filtered = contacts;

        // Apply type filter
        if (filterType !== "all") {
            filtered = filtered.filter(
                contact => (contact as any).contact_type === filterType,
            );
        }

        // Apply status filter
        if (filterStatus !== "all") {
            filtered = filtered.filter(
                contact => (contact as any).status === filterStatus,
            );
        }

        // Apply search filter
        if (search) {
            const searchLower = search.toLowerCase();
            filtered = filtered.filter(
                contact =>
                    contact.name.toLowerCase().includes(searchLower) ||
                    contact.phone.toLowerCase().includes(searchLower) ||
                    contact.message.toLowerCase().includes(searchLower) ||
                    ((contact as any).treatment_name || "")
                        .toLowerCase()
                        .includes(searchLower),
            );
        }

        setFilteredContacts(filtered);
    }, [search, filterType, filterStatus, contacts]);

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
            <div className="mb-4 space-y-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                    <div className="relative flex-1">
                        <Search className="text-primary-text/40 absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                        <Input
                            placeholder="Search contacts..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="border-brown-300 bg-brown-50 text-primary-text placeholder:text-primary-text/40 pl-10"
                        />
                    </div>
                    <Select value={filterType} onValueChange={setFilterType}>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Filter by type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="general">General</SelectItem>
                            <SelectItem value="booking">Booking</SelectItem>
                            <SelectItem value="newsletter">
                                Newsletter
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <Select
                        value={filterStatus}
                        onValueChange={setFilterStatus}
                    >
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button
                        onClick={handleExport}
                        variant="outline"
                        className="border-primary-text text-primary-text hover:bg-brown-100 w-full md:w-auto"
                    >
                        <Download className="mr-2 size-4" />
                        Export CSV
                    </Button>
                </div>
            </div>

            <div className="bg-brown-50 rounded-lg border">
                {isLoading ? (
                    <div className="flex h-64 items-center justify-center">
                        <Loader2 className="text-primary-text size-8 animate-spin" />
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-brown-100/50">
                                <TableHead>Name</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Treatment</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Message</TableHead>
                                <TableHead>Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredContacts.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="text-primary-text/60 text-center"
                                    >
                                        No contacts found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredContacts.map(contact => {
                                    const contactType =
                                        (contact as any).contact_type ||
                                        "general";
                                    const status =
                                        (contact as any).status || "pending";
                                    const treatmentName = (contact as any)
                                        .treatment_name;

                                    return (
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
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        contactType ===
                                                        "booking"
                                                            ? "default"
                                                            : contactType ===
                                                                "newsletter"
                                                              ? "secondary"
                                                              : "outline"
                                                    }
                                                >
                                                    {contactType}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-primary-text text-sm">
                                                {treatmentName || "-"}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        status === "confirmed"
                                                            ? "default"
                                                            : status ===
                                                                "contacted"
                                                              ? "secondary"
                                                              : status ===
                                                                  "cancelled"
                                                                ? "destructive"
                                                                : "outline"
                                                    }
                                                >
                                                    {status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-primary-text">
                                                {truncateText(
                                                    contact.message,
                                                    30,
                                                )}
                                            </TableCell>
                                            <TableCell className="text-primary-text/60 text-sm">
                                                {formatDate(contact.created_at)}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
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
                                    Type
                                </p>
                                <Badge
                                    variant={
                                        (selectedContact as any)
                                            .contact_type === "booking"
                                            ? "default"
                                            : "secondary"
                                    }
                                >
                                    {(selectedContact as any).contact_type ||
                                        "general"}
                                </Badge>
                            </div>
                            {(selectedContact as any).treatment_name && (
                                <div>
                                    <p className="text-primary-text/60 text-sm font-medium">
                                        Treatment
                                    </p>
                                    <p className="text-primary-text text-base">
                                        {
                                            (selectedContact as any)
                                                .treatment_name
                                        }
                                    </p>
                                </div>
                            )}
                            <div>
                                <p className="text-primary-text/60 text-sm font-medium">
                                    Status
                                </p>
                                <Badge
                                    variant={
                                        (selectedContact as any).status ===
                                        "confirmed"
                                            ? "default"
                                            : (selectedContact as any)
                                                    .status === "contacted"
                                              ? "secondary"
                                              : "outline"
                                    }
                                >
                                    {(selectedContact as any).status ||
                                        "pending"}
                                </Badge>
                            </div>
                            <div>
                                <p className="text-primary-text/60 text-sm font-medium">
                                    Message
                                </p>
                                <p className="text-primary-text whitespace-pre-wrap text-base">
                                    {selectedContact.message}
                                </p>
                            </div>
                            {(selectedContact as any).source && (
                                <div>
                                    <p className="text-primary-text/60 text-sm font-medium">
                                        Source
                                    </p>
                                    <p className="text-primary-text text-sm">
                                        {(selectedContact as any).source}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
