-- Migration: Migrate newsletter_subscribers data to contacts table
-- Date: 2025-10-24
-- Description: Copies all newsletter subscriber data to contacts table with contact_type='newsletter'

-- Migrate newsletter subscribers to contacts table
INSERT INTO contacts (
    phone,
    email,
    name,
    message,
    contact_type,
    source,
    status,
    created_at
)
SELECT 
    phone_number,
    email,
    'Newsletter Subscriber' as name,
    'Subscribed to newsletter' as message,
    'newsletter' as contact_type,
    'newsletter-form' as source,
    'pending' as status,
    created_at
FROM newsletter_subscribers
ON CONFLICT DO NOTHING;

-- Verify migration
DO $$ 
DECLARE
    newsletter_count INTEGER;
    migrated_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO newsletter_count FROM newsletter_subscribers;
    SELECT COUNT(*) INTO migrated_count FROM contacts WHERE contact_type = 'newsletter';
    
    RAISE NOTICE 'Migration 003 completed successfully!';
    RAISE NOTICE 'Newsletter subscribers in old table: %', newsletter_count;
    RAISE NOTICE 'Newsletter contacts in new table: %', migrated_count;
END $$;
