"use client";

import type { Email } from "@/lib/types";

interface EmailDetailProps {
  email: Email;
  onArchive: (id: number) => void;
  onMarkRead: (id: number) => void;
}

export default function EmailDetail({ email, onArchive, onMarkRead }: EmailDetailProps) {
  const dateStr = new Date(email.created_at).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="flex h-full flex-col overflow-hidden bg-white">
      <div className="flex-shrink-0 border-b border-gray-200 px-4 py-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex gap-3">
            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600">
              {email.sender_name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </div>
            <div>
              <p className="font-medium text-gray-900">{email.sender_name}</p>
              <p className="text-sm text-gray-500">{email.sender_email}</p>
              <p className="mt-1 text-sm text-gray-600">
                To: {email.recipient_name}
              </p>
              <p className="text-xs text-gray-500">{dateStr}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onMarkRead(email.id)}
              className="rounded p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              title="Mark as read"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => onArchive(email.id)}
              className="rounded p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              title="Archive"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </button>
            <button type="button" className="rounded p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600" title="Forward">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
            </button>
            <button type="button" className="rounded p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600" title="More">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="6" r="1.5" />
                <circle cx="12" cy="12" r="1.5" />
                <circle cx="12" cy="18" r="1.5" />
              </svg>
            </button>
          </div>
        </div>
        <h2 className="mt-3 text-lg font-semibold text-gray-900">{email.subject}</h2>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-3">
        <div className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">
          {email.body}
        </div>
        {email.attachments && email.attachments.length > 0 && (
          <div className="mt-4 rounded-lg border border-gray-200 p-3">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-500">Attachments</p>
            <ul className="space-y-2">
              {email.attachments.map((att, i) => (
                <li key={i} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">{att.name}</span>
                  <span className="text-gray-500">{att.size}</span>
                  <a
                    href="#"
                    className="text-blue-600 hover:underline"
                    onClick={(e) => e.preventDefault()}
                  >
                    Download
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
