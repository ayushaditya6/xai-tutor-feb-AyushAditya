"use client";

import { useState } from "react";
import type { Email } from "@/lib/types";

interface ReplyComposerProps {
  replyTo: Email | null;
  onSend: (email: {
    sender_name: string;
    sender_email: string;
    recipient_name: string;
    recipient_email: string;
    subject: string;
    body: string;
  }) => Promise<void>;
  onCancel: () => void;
}

const CURRENT_USER = { name: "Richard Brown", email: "richard.brown@company.com" };

export default function ReplyComposer({ replyTo, onSend, onCancel }: ReplyComposerProps) {
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  if (!replyTo) return null;

  const subject = replyTo.subject.startsWith("Re:") ? replyTo.subject : `Re: ${replyTo.subject}`;

  const handleSend = async () => {
    setSending(true);
    try {
      await onSend({
        sender_name: CURRENT_USER.name,
        sender_email: CURRENT_USER.email,
        recipient_name: replyTo.sender_name,
        recipient_email: replyTo.sender_email,
        subject,
        body: body.trim() || "No content.",
      });
      setBody("");
      onCancel();
    } finally {
      setSending(false);
    }
  };

  // Get user initials
  const initials = CURRENT_USER.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex-shrink-0 border-t border-gray-200 bg-white">
      <div className="flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          {/* Left: User Avatar and Name */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
              {initials}
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowEmail(!showEmail)}
                className="flex items-center gap-2 text-sm font-medium text-gray-800 hover:text-gray-900"
              >
                <span>{CURRENT_USER.name}</span>
                <svg
                  className={`h-4 w-4 transition-transform ${showEmail ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showEmail && (
                <div className="absolute left-0 top-full mt-1 rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-lg">
                  <p className="text-xs text-gray-600">{CURRENT_USER.email}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Enlarge and Close Icons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded p-2 text-gray-500 hover:bg-gray-100"
              title="Enlarge"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="rounded p-2 text-gray-500 hover:bg-gray-100"
              title="Close"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>


        {/* Text Area */}
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Type your reply..."
          className="min-h-[150px] w-full resize-y border-0 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-0"
          rows={6}
        />

        {/* Bottom Toolbar */}
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left: Send Button and Action Icons */}
          <div className="flex items-center gap-2">
            {/* Combined Send Button with Schedule */}
            <div className="flex items-center rounded-lg bg-gray-900 text-white hover:bg-gray-800">
              <button
                type="button"
                onClick={handleSend}
                disabled={sending}
                className="px-4 py-2 text-sm font-medium disabled:opacity-50"
              >
                {sending ? "Sending..." : "Send Now"}
              </button>
              <div className="h-6 w-px bg-gray-700"></div>
              <button
                type="button"
                className="px-3 py-2 hover:bg-gray-800"
                title="Schedule"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>

            {/* Attachment Icon */}
            <button type="button" className="rounded p-2 text-gray-500 hover:bg-gray-100" title="Attachment">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>

            {/* Emoji Icon */}
            <button type="button" className="rounded p-2 text-gray-500 hover:bg-gray-100" title="Emoji">
              <span className="text-xl">😀</span>
            </button>

            {/* Picture Icon */}
            <button type="button" className="rounded p-2 text-gray-500 hover:bg-gray-100" title="Picture">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>

            {/* More (3 dots) Icon */}
            <button type="button" className="rounded p-2 text-gray-500 hover:bg-gray-100" title="More">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="5" cy="12" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="19" cy="12" r="2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
