import { unparse } from "papaparse";

import type { Database } from "./supabase/types";

type Contact = Database["public"]["Tables"]["contacts"]["Row"];

/**
 * Format a date string to a readable format
 */
export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);
}

/**
 * Export contacts data to CSV and trigger download
 */
export function exportContactsToCSV(contacts: Contact[], filename?: string) {
    const csvData = contacts.map(contact => ({
        Name: contact.name,
        Phone: contact.phone,
        Message: contact.message,
        "Submitted At": formatDate(contact.created_at),
    }));

    const csv = unparse(csvData);
    downloadCSV(csv, filename || `contacts-${Date.now()}.csv`);
}

/**
 * Export newsletter subscribers to CSV and trigger download
 */
export function exportNewsletterToCSV(
    subscribers: {
        id: string;
        phone_number: string;
        email: string | null;
        created_at: string;
    }[],
    filename?: string,
) {
    const csvData = subscribers.map(subscriber => ({
        "Phone Number": subscriber.phone_number,
        Email: subscriber.email || "N/A",
        "Subscribed At": formatDate(subscriber.created_at),
    }));

    const csv = unparse(csvData);
    downloadCSV(csv, filename || `newsletter-subscribers-${Date.now()}.csv`);
}

/**
 * Trigger browser download of CSV file
 */
function downloadCSV(csvContent: string, filename: string) {
    if (typeof window === "undefined") {
        console.warn("downloadCSV can only be called in browser environment");
        return;
    }
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
}
