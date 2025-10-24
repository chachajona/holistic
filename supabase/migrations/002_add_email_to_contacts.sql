-- Migration: Add email field to contacts table
-- Date: 2025-10-24
-- Description: Adds email column to support newsletter subscribers in contacts table

-- Add email column to contacts table
ALTER TABLE contacts
ADD COLUMN IF NOT EXISTS email TEXT;

-- Add index for email searches
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email) WHERE email IS NOT NULL;

-- Update column comment
COMMENT ON COLUMN contacts.email IS 'Email address - required for newsletter subscriptions, optional for other contact types';

-- Verify migration
DO $$ 
BEGIN
    RAISE NOTICE 'Migration 002 completed successfully!';
    RAISE NOTICE 'Email column added to contacts table';
END $$;
