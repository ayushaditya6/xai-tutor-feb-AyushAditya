"use client";

import { useState } from "react";

const navItems = [
  { icon: "◉", label: "Dashboard" },
  { icon: "🔔", label: "Notifications" },
  { icon: "✓", label: "Tasks" },
  { icon: "📅", label: "Calendar" },
  { icon: "▣", label: "Widgets" },
];

const marketingItems = [
  { label: "Product" },
  { label: "Emails", active: true },
  { label: "Integration" },
  { label: "Contacts" },
];

const favoriteItems = [
  { label: "Opportunity Stages", color: "bg-red-500" },
  { label: "Key Metrics", color: "bg-green-500" },
  { label: "Product Plan", color: "bg-orange-500" },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const [favoritesCollapsed, setFavoritesCollapsed] = useState(false);
  return (
    <aside
      className={`flex flex-col border-r border-gray-200 bg-white transition-all duration-200 ${collapsed ? "w-16" : "w-56"
        }`}
    >
      <div className="flex h-14 items-center gap-2 border-b border-gray-200 px-3">
        <button
          type="button"
          onClick={onToggle}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-white hover:bg-orange-600"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <span className="text-lg">⭐</span>
        </button>
        {!collapsed && (
          <>
            <span className="flex-1 font-semibold text-gray-800">Cusana</span>
            <button
              type="button"
              onClick={onToggle}
              className="flex h-6 w-6 items-center justify-center rounded text-gray-500 hover:bg-gray-100"
              title="Collapse sidebar"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
          </>
        )}
      </div>
      {!collapsed && (
        <div className="border-b border-gray-200 px-3 py-2">
          <div className="flex items-center justify-between gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Search...</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="rounded bg-gray-200 px-1.5 py-0.5 text-xs font-medium text-gray-600">
                ⌘K
              </kbd>
            </div>
          </div>
        </div>
      )}
      <nav className="flex-1 overflow-y-auto py-2">
        <div className="space-y-0.5 px-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              <span className="text-gray-400">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </div>
        <div className="mt-4 px-3">
          {!collapsed && <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Marketing</p>}
          <div className="space-y-0.5">
            {marketingItems.map((item) => (
              <button
                key={item.label}
                type="button"
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm ${item.active ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {!collapsed && <span>{item.label}</span>}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4 px-3">
          {!collapsed && (
            <button
              type="button"
              onClick={() => setFavoritesCollapsed(!favoritesCollapsed)}
              className="mb-2 flex w-full items-center justify-between text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-gray-600"
            >
              <span>Favorite</span>
              <svg
                className={`h-3 w-3 transition-transform ${favoritesCollapsed ? '-rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
          {!favoritesCollapsed && (
            <div className="space-y-0.5">
              {favoriteItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                >
                  <span className={`h-2 w-2 rounded ${item.color}`} />
                  {!collapsed && <span>{item.label}</span>}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="mt-4 space-y-0.5 px-2">
          <button type="button" className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
            {!collapsed && <span>Settings</span>}
          </button>
          <button type="button" className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
            {!collapsed && <span>Help & Center</span>}
          </button>
        </div>
      </nav>
      {!collapsed && (
        <div className="border-t border-gray-200 p-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 flex-shrink-0 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium text-blue-700">
              RB
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-800">Richard Brown</p>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                <div className="h-full w-[62%] rounded-full bg-blue-500" />
              </div>
              <p className="mt-0.5 text-xs text-gray-500">6.2GB of 10GB</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
