"use client";

import type { Email, EmailTab } from "@/lib/types";

interface EmailListProps {
  emails: Email[];
  selectedId: number | null;
  tab: EmailTab;
  onTabChange: (tab: EmailTab) => void;
  onSelectEmail: (email: Email) => void;
  onArchive: (id: number) => void;
  searchQuery: string;
}

function formatDate(createdAt: string): string {
  const d = new Date(createdAt);
  const now = new Date();
  const sameDay = d.toDateString() === now.toDateString();
  if (sameDay) return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: false });
  const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays < 7) return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function EmailList({
  emails,
  selectedId,
  tab,
  onTabChange,
  onSelectEmail,
  onArchive,
  searchQuery,
}: EmailListProps) {
  const filtered = searchQuery.trim()
    ? emails.filter(
      (e) =>
        e.sender_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.preview?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : emails;

  const tabs: { id: EmailTab; label: string }[] = [
    { id: "all", label: "All Mails" },
    { id: "unread", label: "Unread" },
    { id: "archive", label: "Archive" },
  ];

  return (
    <div className="flex h-full flex-col border-r border-gray-200 bg-white">
      <div className="flex flex-shrink-0 items-center border-b border-gray-200 px-3 py-2">
        <div className="flex items-center gap-1 rounded-lg bg-gray-100 p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onTabChange(t.id)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${tab === t.id
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
                }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500 text-sm">
            No emails
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {filtered.map((email) => (
              <li
                key={email.id}
                className={`group cursor-pointer border-l-2 transition-colors ${selectedId === email.id
                  ? "border-l-blue-500 bg-blue-50/50"
                  : "border-l-transparent hover:bg-gray-50"
                  }`}
                onClick={() => onSelectEmail(email)}
              >
                <div className="flex gap-3 px-3 py-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-600">
                    {getInitials(email.sender_name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <span className={`truncate text-sm ${email.is_read ? "font-normal text-gray-600" : "font-semibold text-gray-900"}`}>
                        {email.sender_name}
                      </span>
                      <span className="flex-shrink-0 text-xs text-gray-500">{formatDate(email.created_at)}</span>
                    </div>
                    <p className={`mt-0.5 truncate text-sm ${email.is_read ? "text-gray-500" : "text-gray-700"}`}>
                      {email.subject}
                    </p>
                    <p className="mt-0.5 line-clamp-2 text-xs text-gray-500">{email.preview}</p>
                    <div className="mt-1 flex items-center justify-between">
                      {!email.is_read && (
                        <span className="h-2 w-2 rounded-full bg-blue-500" aria-hidden />
                      )}
                      <div className="ml-auto flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onArchive(email.id);
                          }}
                          className="rounded p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
                          title="Archive"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="rounded p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
                          title="Forward"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="rounded p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
                          title="More"
                        >
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="6" r="1.5" />
                            <circle cx="12" cy="12" r="1.5" />
                            <circle cx="12" cy="18" r="1.5" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
