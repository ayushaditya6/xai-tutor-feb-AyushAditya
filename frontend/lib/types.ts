export interface Email {
  id: number;
  sender_name: string;
  sender_email: string;
  recipient_name: string;
  recipient_email: string;
  subject: string;
  body: string;
  preview: string;
  attachments: { name: string; size: string }[];
  is_read: boolean;
  is_archived: boolean;
  created_at: string;
}

export type EmailTab = "all" | "unread" | "archive";
