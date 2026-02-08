"use client";

interface HeaderProps {
  onNewMessage: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export default function Header({ onNewMessage, searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className="flex h-14 flex-shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-gray-800">Emails</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-500">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            id="search-email-input"
            type="text"
            placeholder="Search Email"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-36 border-0 bg-transparent outline-none placeholder:text-gray-400"
            aria-label="Search email"
          />
        </div>
        <button
          type="button"
          onClick={onNewMessage}
          className="rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-900"
        >
          + New Message
        </button>
      </div>
    </header>
  );
}
