-- Migration: Add booking support to contacts table
-- Date: 2025-10-23
-- Description: Adds columns to support booking requests in the existing contacts table

-- Add new columns for booking functionality
ALTER TABLE contacts
ADD COLUMN IF NOT EXISTS treatment_id VARCHAR(100),
ADD COLUMN IF NOT EXISTS treatment_name VARCHAR(200),
ADD COLUMN IF NOT EXISTS source VARCHAR(50) DEFAULT 'contact-form',
ADD COLUMN IF NOT EXISTS contact_type VARCHAR(20) DEFAULT 'general',
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS contacted_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS contacted_by VARCHAR(100),
ADD COLUMN IF NOT EXISTS notes TEXT;

-- Add column comments for documentation
COMMENT ON COLUMN contacts.treatment_id IS 'Treatment slug (e.g., giac-hoi) - only for booking requests';
COMMENT ON COLUMN contacts.treatment_name IS 'Treatment display name - only for booking requests';
COMMENT ON COLUMN contacts.source IS 'Source page: contact-form, services-page, hero-form, etc.';
COMMENT ON COLUMN contacts.contact_type IS 'Type: general, booking, newsletter';
COMMENT ON COLUMN contacts.status IS 'Status: pending, contacted, confirmed, cancelled';
COMMENT ON COLUMN contacts.contacted_at IS 'When staff contacted the customer';
COMMENT ON COLUMN contacts.contacted_by IS 'Staff member who made contact';
COMMENT ON COLUMN contacts.notes IS 'Internal staff notes about this contact';

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_contacts_type ON contacts(contact_type);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_source ON contacts(source);
CREATE INDEX IF NOT EXISTS idx_contacts_treatment ON contacts(treatment_id) WHERE treatment_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_contacts_type_status ON contacts(contact_type, status);
CREATE INDEX IF NOT EXISTS idx_contacts_created ON contacts(created_at DESC);

-- Verify migration
DO $$ 
BEGIN
    RAISE NOTICE 'Migration completed successfully!';
    RAISE NOTICE 'New columns added to contacts table';
    RAISE NOTICE 'Indexes created for better performance';
END $$;
