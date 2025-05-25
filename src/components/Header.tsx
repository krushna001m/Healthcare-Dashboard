"use client"

import { Search, Bell, Plus, Moon, Sun } from "lucide-react"
import { useState } from "react"

interface HeaderProps {
  onAddAppointment: () => void
  darkMode: boolean
  toggleDarkMode: () => void
}

export default function Header({ onAddAppointment, darkMode, toggleDarkMode }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [notifications] = useState([
    { id: 1, message: "Appointment reminder: Dentist at 9:00 AM", time: "5 min ago" },
    { id: 2, message: "Lab results are ready", time: "1 hour ago" },
    { id: 3, message: "Prescription refill due", time: "2 hours ago" },
  ])
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <header
      className={`border-b px-6 py-4 flex items-center justify-between ${
        darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <div className="flex items-center space-x-8">
        <h1 className="text-2xl font-bold">
          <span className="text-cyan-500">Health</span>
          <span className={darkMode ? "text-white" : "text-gray-900"}>care.</span>
        </h1>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search patients, appointments, tests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`pl-10 pr-4 py-2 border rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
              darkMode
                ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                : "bg-gray-50 border-gray-200 text-gray-900"
            }`}
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-lg transition-colors ${
            darkMode
              ? "text-gray-300 hover:text-white hover:bg-gray-800"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          }`}
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative p-2 rounded-lg transition-colors ${
              darkMode
                ? "text-gray-300 hover:text-white hover:bg-gray-800"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <Bell className="w-5 h-5" />
            {notifications.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>

          {showNotifications && (
            <div
              className={`absolute right-0 top-12 w-80 rounded-lg shadow-lg border z-50 ${
                darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
              }`}
            >
              <div className="p-4">
                <h3 className={`font-medium mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>Notifications</h3>
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div key={notification.id} className={`p-3 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                      <p className={`text-sm ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <img
            src="/placeholder.svg?height=32&width=32"
            alt="User Avatar"
            className="w-8 h-8 rounded-full bg-cyan-500"
          />
          <span className={`text-sm font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>Dr. Sarah Wilson</span>
        </div>

        <button
          onClick={onAddAppointment}
          className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </header>
  )
}
