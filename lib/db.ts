import { join } from "path";
import Database from "better-sqlite3";

// Database singleton pattern
let db: Database.Database | null = null;

function getDatabase(): Database.Database {
    if (!db) {
        const dbPath = join(process.cwd(), "data", "newsletter.db");

        // Ensure data directory exists
        const fs = require("fs");
        const dataDir = join(process.cwd(), "data");
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }

        db = new Database(dbPath);

        // Create newsletter_subscribers table if it doesn't exist
        const migrate = db.prepare(`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        phone_number TEXT NOT NULL,
        email TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(phone_number)
      )
    `);

        migrate.run();

        // Create contact_forms table if it doesn't exist
        const createContactsTable = db.prepare(`
      CREATE TABLE IF NOT EXISTS contact_forms (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        message TEXT NOT NULL,
        agreed BOOLEAN NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

        createContactsTable.run();
    }

    return db;
}

// Newsletter subscriber functions
export interface NewsletterSubscriber {
    id?: number;
    phone_number: string;
    email?: string;
    created_at?: string;
    updated_at?: string;
}

export const newsletterDb = {
    // Add a new subscriber
    addSubscriber: (
        phoneNumber: string,
        email?: string,
    ): NewsletterSubscriber => {
        const db = getDatabase();
        const stmt = db.prepare(`
      INSERT INTO newsletter_subscribers (phone_number, email)
      VALUES (?, ?)
      ON CONFLICT(phone_number) DO UPDATE SET
        email = excluded.email,
        updated_at = CURRENT_TIMESTAMP
    `);

        stmt.run(phoneNumber, email);

        // Get the inserted/updated record
        const getStmt = db.prepare(`
      SELECT * FROM newsletter_subscribers 
      WHERE phone_number = ?
    `);

        return getStmt.get(phoneNumber) as NewsletterSubscriber;
    },

    // Get all subscribers
    getAllSubscribers: (): NewsletterSubscriber[] => {
        const db = getDatabase();
        const stmt = db.prepare(
            "SELECT * FROM newsletter_subscribers ORDER BY created_at DESC",
        );
        return stmt.all() as NewsletterSubscriber[];
    },

    // Get subscriber by phone
    getSubscriberByPhone: (
        phoneNumber: string,
    ): NewsletterSubscriber | undefined => {
        const db = getDatabase();
        const stmt = db.prepare(
            "SELECT * FROM newsletter_subscribers WHERE phone_number = ?",
        );
        return stmt.get(phoneNumber) as NewsletterSubscriber | undefined;
    },

    // Delete subscriber
    deleteSubscriber: (phoneNumber: string): boolean => {
        const db = getDatabase();
        const stmt = db.prepare(
            "DELETE FROM newsletter_subscribers WHERE phone_number = ?",
        );
        const deleteResult = stmt.run(phoneNumber);
        return deleteResult.changes > 0;
    },
};

// Contact form functions
export interface ContactFormSubmission {
    id?: number;
    name: string;
    email: string;
    phone?: string;
    message: string;
    agreed: boolean;
    created_at?: string;
    updated_at?: string;
}

export const contactDb = {
    // Save a contact form submission
    saveSubmission: (
        data: Omit<ContactFormSubmission, "id" | "created_at" | "updated_at">,
    ): ContactFormSubmission => {
        const db = getDatabase();
        const stmt = db.prepare(`
      INSERT INTO contact_forms (name, email, phone, message, agreed)
      VALUES (?, ?, ?, ?, ?)
    `);

        const insertResult = stmt.run(
            data.name,
            data.email,
            data.phone || null,
            data.message,
            data.agreed,
        );

        // Get the inserted record
        const getStmt = db.prepare(`
      SELECT * FROM contact_forms 
      WHERE id = ?
    `);

        return getStmt.get(
            insertResult.lastInsertRowid,
        ) as ContactFormSubmission;
    },

    // Get all submissions
    getAllSubmissions: (): ContactFormSubmission[] => {
        const db = getDatabase();
        const stmt = db.prepare(
            "SELECT * FROM contact_forms ORDER BY created_at DESC",
        );
        return stmt.all() as ContactFormSubmission[];
    },

    // Get submission by id
    getSubmissionById: (id: number): ContactFormSubmission | undefined => {
        const db = getDatabase();
        const stmt = db.prepare("SELECT * FROM contact_forms WHERE id = ?");
        return stmt.get(id) as ContactFormSubmission | undefined;
    },
};

// Close database connection (useful for testing)
export const closeDatabase = (): void => {
    if (db) {
        db.close();
        db = null;
    }
};
