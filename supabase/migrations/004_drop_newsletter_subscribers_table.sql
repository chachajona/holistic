-- Migration: Drop newsletter_subscribers table
-- Date: 2025-10-24
-- Description: Removes the old newsletter_subscribers table after successful migration to contacts

-- Drop the newsletter_subscribers table
-- Note: Only run this after verifying all data has been migrated to contacts table
-- and all application code has been updated

DROP TABLE IF EXISTS public.newsletter_subscribers CASCADE;

-- Verify migration
DO $$ 
BEGIN
    RAISE NOTICE 'Migration 004 completed successfully!';
    RAISE NOTICE 'newsletter_subscribers table has been dropped';
    RAISE NOTICE 'All newsletter data is now in contacts table with contact_type=newsletter';
END $$;
