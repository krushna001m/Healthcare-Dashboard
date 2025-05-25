"use client"

import { navigationItems } from "../data/navigation"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
  darkMode: boolean
}

export default function Sidebar({ activeSection, onSectionChange, darkMode }: SidebarProps) {
  return (
    <aside
      className={`w-64 border-r h-full flex flex-col ${
        darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <div className="p-6">
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">General</h2>

        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"
                    : darkMode
                      ? "text-gray-300 hover:text-white hover:bg-gray-800"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
