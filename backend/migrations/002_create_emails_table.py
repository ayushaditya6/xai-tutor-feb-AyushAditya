"""
Migration: Create emails table
Version: 002
Description: Creates the emails table for the email client
"""

import sqlite3
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database import DATABASE_PATH


def upgrade():
    """Apply the migration."""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()

    cursor.execute("SELECT 1 FROM _migrations WHERE name = ?", ("002_create_emails_table",))
    if cursor.fetchone():
        print("Migration 002_create_emails_table already applied. Skipping.")
        conn.close()
        return

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS emails (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sender_name TEXT NOT NULL,
            sender_email TEXT NOT NULL,
            recipient_name TEXT NOT NULL,
            recipient_email TEXT NOT NULL,
            subject TEXT NOT NULL,
            body TEXT NOT NULL,
            preview TEXT,
            attachments TEXT,
            is_read INTEGER DEFAULT 0,
            is_archived INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    # Seed sample emails matching the design
    sample_emails = [
        (
            "Michael Lee",
            "michael.lee@company.com",
            "Richard Brown",
            "richard.brown@company.com",
            "Follow-Up: Product Demo Feedback 📊",
            "Hi Richard, I wanted to follow up on our product demo from last week. Could you share your feedback when you have a moment?",
            "Hi Richard, I wanted to follow up on our product demo from last week. Could you share your feedback when you have a moment? Best, Michael",
            None,
            0,
            0,
        ),
        (
            "Jane Doe",
            "jane.doe@business.com",
            "Richard Brown",
            "richard.brown@company.com",
            "Proposal for Partnership 🤝",
            "Hi John,\n\nI hope this email finds you well. I wanted to reach out to explore a potential partnership between Jane Corp and John Organisation Corp.\n\nWe believe there are strong synergies that could benefit both organizations in terms of market reach, product alignment, and implementation strategies.\n\nWould you be open to a discussion? I'd love to hear your thoughts or find a convenient time to discuss.\n\nWarm regards,\nJane Doe",
            "Hi John, I wanted to reach out to explore a potential partnership between Jane Corp and John Organisation Corp...",
            '[{"name":"Proposal Partnership.pdf","size":"1.5 MB"}]',
            1,
            0,
        ),
        (
            "Support Team",
            "support@service.com",
            "Richard Brown",
            "richard.brown@company.com",
            "Contract Renewal Due 📋",
            "Your annual contract is coming up for renewal. Please review the attached terms.",
            "Your annual contract is coming up for renewal. Please review the attached terms.",
            None,
            0,
            0,
        ),
        (
            "Sarah Wilson",
            "sarah.wilson@corp.com",
            "Richard Brown",
            "richard.brown@company.com",
            "Meeting Notes from Q4 Review 📝",
            "Here are the key action items from our Q4 review meeting.",
            "Here are the key action items from our Q4 review meeting. Let me know if you have questions.",
            None,
            0,
            0,
        ),
        (
            "David Chen",
            "david.chen@tech.io",
            "Richard Brown",
            "richard.brown@company.com",
            "Re: Integration API Documentation 🔗",
            "I've updated the API docs with the new endpoints. Please take a look.",
            "I've updated the API docs with the new endpoints. Please take a look. Thanks, David",
            None,
            0,
            0,
        ),
    ]

    cursor.executemany(
        """INSERT INTO emails (
            sender_name, sender_email, recipient_name, recipient_email,
            subject, body, preview, attachments, is_read, is_archived
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
        sample_emails,
    )

    cursor.execute("INSERT INTO _migrations (name) VALUES (?)", ("002_create_emails_table",))
    conn.commit()
    conn.close()
    print("Migration 002_create_emails_table applied successfully.")


def downgrade():
    """Revert the migration."""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    cursor.execute("DROP TABLE IF EXISTS emails")
    cursor.execute("DELETE FROM _migrations WHERE name = ?", ("002_create_emails_table",))
    conn.commit()
    conn.close()
    print("Migration 002_create_emails_table reverted successfully.")
