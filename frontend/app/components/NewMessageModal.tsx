"use client";

import { useState } from "react";

const CURRENT_USER = { name: "Richard Brown", email: "richard.brown@company.com" };

interface NewMessageModalProps {
  onClose: () => void;
  onSend: (email: {
    sender_name: string;
    sender_email: string;
    recipient_name: string;
    recipient_email: string;
    subject: string;
    body: string;
  }) => Promise<void>;
}

export default function NewMessageModal({ onClose, onSend }: NewMessageModalProps) {
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!recipientName.trim() || !recipientEmail.trim() || !subject.trim()) return;
    setSending(true);
    try {
      await onSend({
        sender_name: CURRENT_USER.name,
        sender_email: CURRENT_USER.email,
        recipient_name: recipientName.trim(),
        recipient_email: recipientEmail.trim(),
        subject: subject.trim(),
        body: body.trim() || "No content.",
      });
      onClose();
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div
        className="w-full max-w-lg rounded-xl border border-gray-200 bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-gray-200 px-4 py-3 font-semibold text-gray-800">New Message</div>
        <div className="space-y-3 p-4">
          <div>
            <label className="block text-xs font-medium text-gray-500">To (Name)</label>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="Recipient name"
              className="mt-1 w-full rounded border border-gray-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500">To (Email)</label>
            <input
              type="email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              placeholder="email@example.com"
              className="mt-1 w-full rounded border border-gray-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
              className="mt-1 w-full rounded border border-gray-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500">Message</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Type your message..."
              className="mt-1 min-h-[120px] w-full resize-y rounded border border-gray-200 px-3 py-2 text-sm"
              rows={4}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 border-t border-gray-200 px-4 py-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSend}
            disabled={sending || !recipientName.trim() || !recipientEmail.trim() || !subject.trim()}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {sending ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
