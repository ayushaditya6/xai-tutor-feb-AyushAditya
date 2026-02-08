"use client";

import { useState, useEffect, useCallback } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import EmailList from "./components/EmailList";
import EmailDetail from "./components/EmailDetail";
import ReplyComposer from "./components/ReplyComposer";
import NewMessageModal from "./components/NewMessageModal";
import type { Email, EmailTab } from "@/lib/types";
import { fetchEmails, createEmail, updateEmail } from "@/lib/api";

export default function Home() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [tab, setTab] = useState<EmailTab>("all");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [replyingTo, setReplyingTo] = useState<Email | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadEmails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await fetchEmails(tab);
      setEmails(list);
      if (selectedEmail) {
        const updated = list.find((e) => e.id === selectedEmail.id);
        if (updated) setSelectedEmail(updated);
        else setSelectedEmail(list[0] ?? null);
      } else if (list.length > 0 && !selectedEmail) {
        setSelectedEmail(list[0]);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load emails");
    } finally {
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => {
    loadEmails();
  }, [loadEmails]);

  useEffect(() => {
    if (selectedEmail && !emails.find((e) => e.id === selectedEmail.id)) {
      setSelectedEmail(emails[0] ?? null);
    }
  }, [emails, selectedEmail]);

  const handleSelectEmail = useCallback(async (email: Email) => {
    setSelectedEmail(email);
    if (!email.is_read) {
      try {
        const updated = await updateEmail(email.id, { is_read: true });
        setEmails((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
        setSelectedEmail(updated);
      } catch {
        // ignore
      }
    }
  }, []);

  const handleArchive = useCallback(async (id: number) => {
    try {
      await updateEmail(id, { is_archived: true });
      await loadEmails();
      if (selectedEmail?.id === id) {
        setSelectedEmail(emails.find((e) => e.id !== id) ?? null);
        setReplyingTo(null);
      }
    } catch {
      // ignore
    }
  }, [loadEmails, selectedEmail, emails]);

  const handleMarkRead = useCallback(async (id: number) => {
    try {
      const updated = await updateEmail(id, { is_read: true });
      setEmails((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
      if (selectedEmail?.id === id) setSelectedEmail(updated);
    } catch {
      // ignore
    }
  }, [selectedEmail]);

  const handleSendEmail = useCallback(
    async (email: Parameters<typeof createEmail>[0]) => {
      const created = await createEmail(email);
      setEmails((prev) => [created, ...prev]);
      setSelectedEmail(created);
      setReplyingTo(null);
    },
    []
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById("search-email-input")?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <div className="flex flex-1 flex-col min-w-0">
        <Header
          onNewMessage={() => setShowNewMessage(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <div className="flex flex-1 min-h-0">
          <div className="w-80 flex-shrink-0">
            <EmailList
              emails={emails}
              selectedId={selectedEmail?.id ?? null}
              tab={tab}
              onTabChange={setTab}
              onSelectEmail={handleSelectEmail}
              onArchive={handleArchive}
              searchQuery={searchQuery}
            />
          </div>
          <div className="flex flex-1 flex-col min-w-0 bg-white">
            {error && (
              <div className="px-4 py-2 bg-red-50 text-red-700 text-sm">
                {error}
              </div>
            )}
            {loading && emails.length === 0 ? (
              <div className="flex flex-1 items-center justify-center text-gray-500">
                Loading...
              </div>
            ) : selectedEmail ? (
              <>
                <div className="flex-1 min-h-0 overflow-hidden">
                  <EmailDetail
                    email={selectedEmail}
                    onArchive={handleArchive}
                    onMarkRead={handleMarkRead}
                  />
                </div>
                {replyingTo ? (
                  <ReplyComposer
                    replyTo={replyingTo}
                    onSend={handleSendEmail}
                    onCancel={() => setReplyingTo(null)}
                  />
                ) : (
                  <div className="flex-shrink-0 border-t border-gray-200 px-4 py-2">
                    <button
                      type="button"
                      onClick={() => setReplyingTo(selectedEmail)}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      Reply
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-1 items-center justify-center text-gray-500 text-sm">
                Select an email
              </div>
            )}
          </div>
        </div>
      </div>
      {showNewMessage && (
        <NewMessageModal
          onClose={() => setShowNewMessage(false)}
          onSend={handleSendEmail}
        />
      )}
    </div>
  );
}
