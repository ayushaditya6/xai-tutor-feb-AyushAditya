import type { Email } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function fetchEmails(tab?: string): Promise<Email[]> {
  const q = tab && tab !== "all" ? `?tab=${tab}` : "";
  const res = await fetch(`${API_BASE}/emails${q}`);
  if (!res.ok) throw new Error("Failed to fetch emails");
  const data = await res.json();
  return data.emails;
}

export async function fetchEmail(id: number): Promise<Email> {
  const res = await fetch(`${API_BASE}/emails/${id}`);
  if (!res.ok) throw new Error("Failed to fetch email");
  return res.json();
}

export async function createEmail(email: {
  sender_name: string;
  sender_email: string;
  recipient_name: string;
  recipient_email: string;
  subject: string;
  body: string;
  attachments?: string;
}): Promise<Email> {
  const res = await fetch(`${API_BASE}/emails`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(email),
  });
  if (!res.ok) throw new Error("Failed to create email");
  return res.json();
}

export async function updateEmail(
  id: number,
  updates: { is_read?: boolean; is_archived?: boolean; subject?: string; body?: string }
): Promise<Email> {
  const res = await fetch(`${API_BASE}/emails/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Failed to update email");
  return res.json();
}

export async function deleteEmail(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/emails/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete email");
}
