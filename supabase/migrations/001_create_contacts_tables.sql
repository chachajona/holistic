-- Create contacts table
CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone_number TEXT NOT NULL UNIQUE,
    email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_contacts_phone ON public.contacts(phone);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON public.contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_newsletter_phone ON public.newsletter_subscribers(phone_number);
CREATE INDEX IF NOT EXISTS idx_newsletter_created_at ON public.newsletter_subscribers(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create policies for contacts table
-- Allow anyone to insert (for form submissions)
CREATE POLICY "Allow public insert on contacts"
    ON public.contacts
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Only authenticated users can read (for admin access)
CREATE POLICY "Allow authenticated read on contacts"
    ON public.contacts
    FOR SELECT
    TO authenticated
    USING (true);

-- Create policies for newsletter_subscribers table
-- Allow anyone to insert (for newsletter signups)
CREATE POLICY "Allow public insert on newsletter_subscribers"
    ON public.newsletter_subscribers
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Only authenticated users can read (for admin access)
CREATE POLICY "Allow authenticated read on newsletter_subscribers"
    ON public.newsletter_subscribers
    FOR SELECT
    TO authenticated
    USING (true);

-- Add comments for documentation
COMMENT ON TABLE public.contacts IS 'Stores contact form submissions from users';
COMMENT ON TABLE public.newsletter_subscribers IS 'Stores newsletter subscription information';
COMMENT ON COLUMN public.contacts.phone IS 'Primary contact phone number';
COMMENT ON COLUMN public.newsletter_subscribers.phone_number IS 'Primary phone number for newsletter subscription';
