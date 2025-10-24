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
                    email: string | null;
                    message: string;
                    treatment_id: string | null;
                    treatment_name: string | null;
                    source: string;
                    contact_type: string;
                    status: string;
                    contacted_at: string | null;
                    contacted_by: string | null;
                    notes: string | null;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    name: string;
                    phone: string;
                    email?: string | null;
                    message: string;
                    treatment_id?: string | null;
                    treatment_name?: string | null;
                    source?: string;
                    contact_type?: string;
                    status?: string;
                    contacted_at?: string | null;
                    contacted_by?: string | null;
                    notes?: string | null;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    name?: string;
                    phone?: string;
                    email?: string | null;
                    message?: string;
                    treatment_id?: string | null;
                    treatment_name?: string | null;
                    source?: string;
                    contact_type?: string;
                    status?: string;
                    contacted_at?: string | null;
                    contacted_by?: string | null;
                    notes?: string | null;
                    created_at?: string;
                };
            };
        };
        Views: Record<string, never>;
        Functions: Record<string, never>;
        Enums: Record<string, never>;
    };
}
