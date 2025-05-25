"use client"

import { useState } from "react"
import { upcomingSchedule } from "../data/appointments"
import { MoreHorizontal, CheckCircle, Clock, AlertCircle } from "lucide-react"

interface UpcomingScheduleProps {
  darkMode: boolean
}

export default function UpcomingSchedule({ darkMode }: UpcomingScheduleProps) {
  const [expandedDay, setExpandedDay] = useState<string | null>(null)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "upcoming":
        return <Clock className="w-4 h-4 text-blue-500" />
      case "urgent":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "upcoming":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "urgent":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    }
  }

  return (
    <div className={`rounded-xl shadow-sm p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>The Upcoming Schedule</h2>
        <button
          className={`text-sm px-3 py-1 rounded-lg border transition-colors ${
            darkMode
              ? "border-gray-600 text-gray-300 hover:bg-gray-700"
              : "border-gray-300 text-gray-600 hover:bg-gray-100"
          }`}
        >
          View All
        </button>
      </div>

      <div className="space-y-6">
        {upcomingSchedule.map((daySchedule, dayIndex) => (
          <div key={dayIndex}>
            <button
              onClick={() => setExpandedDay(expandedDay === daySchedule.day ? null : daySchedule.day)}
              className={`w-full text-left flex items-center justify-between mb-3 p-2 rounded-lg transition-colors ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
              }`}
            >
              <h3 className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                {daySchedule.day} ({daySchedule.appointments.length} appointments)
              </h3>
              <MoreHorizontal className="w-4 h-4 text-gray-400" />
            </button>

            <div
              className={`grid gap-3 transition-all duration-200 ${
                expandedDay === daySchedule.day ? "grid-cols-1" : "grid-cols-2"
              }`}
            >
              {daySchedule.appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className={`p-3 rounded-lg border transition-all duration-200 hover:shadow-md cursor-pointer ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 hover:bg-gray-600"
                      : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                  } ${expandedDay === daySchedule.day ? "p-4" : ""}`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm flex-shrink-0"
                      style={{ backgroundColor: appointment.color }}
                    >
                      {appointment.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-medium truncate ${darkMode ? "text-white" : "text-gray-900"}`}>
                          {appointment.title}
                        </p>
                        {getStatusIcon(appointment.status)}
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{appointment.time}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </div>

                      {expandedDay === daySchedule.day && (
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                          <div className="flex items-center justify-between">
                            <button className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
                              Reschedule
                            </button>
                            <button className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className={`mt-6 pt-6 border-t grid grid-cols-3 gap-4 ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
        <div className="text-center">
          <p className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>12</p>
          <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>This Week</p>
        </div>
        <div className="text-center">
          <p className={`text-2xl font-bold text-green-600`}>8</p>
          <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Completed</p>
        </div>
        <div className="text-center">
          <p className={`text-2xl font-bold text-blue-600`}>4</p>
          <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Upcoming</p>
        </div>
      </div>
    </div>
  )
}
