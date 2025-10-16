export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export interface Database {
    public: {
        Tables: {
            contacts: {
                Row: {
                    id: string;
                    name: string;
                    phone: string;
                    message: string;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    name: string;
                    phone: string;
                    message: string;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    name?: string;
                    phone?: string;
                    message?: string;
                    created_at?: string;
                };
            };
            newsletter_subscribers: {
                Row: {
                    id: string;
                    phone_number: string;
                    email: string | null;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    phone_number: string;
                    email?: string | null;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    phone_number?: string;
                    email?: string | null;
                    created_at?: string;
                };
            };
        };
        Views: Record<string, never>;
        Functions: Record<string, never>;
        Enums: Record<string, never>;
    };
}
