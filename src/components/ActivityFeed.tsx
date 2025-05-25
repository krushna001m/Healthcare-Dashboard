"use client"

import { useState } from "react"
import { activityData } from "../data/appointments"
import { TrendingUp, Calendar, Users, Activity } from "lucide-react"

interface ActivityFeedProps {
  darkMode: boolean
}

export default function ActivityFeed({ darkMode }: ActivityFeedProps) {
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [viewType, setViewType] = useState<"chart" | "list">("chart")

  const maxValue = Math.max(...activityData.map((d) => d.value))
  const totalAppointments = activityData.reduce((sum, day) => sum + day.value, 0)
  const avgPerDay = Math.round(totalAppointments / activityData.length)

  const selectedDayData = activityData.find((d) => d.day === selectedDay)

  return (
    <div className={`rounded-xl shadow-sm p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Activity</h2>
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            {totalAppointments} appointments this week
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewType("chart")}
            className={`p-2 rounded-lg transition-colors ${
              viewType === "chart"
                ? "bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400"
                : darkMode
                  ? "text-gray-400 hover:text-gray-300"
                  : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewType("list")}
            className={`p-2 rounded-lg transition-colors ${
              viewType === "list"
                ? "bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400"
                : darkMode
                  ? "text-gray-400 hover:text-gray-300"
                  : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Calendar className="w-4 h-4" />
          </button>
        </div>
      </div>

      {viewType === "chart" ? (
        <>
          <div className="flex items-end space-x-4 h-32 mb-4">
            {activityData.map((item, index) => (
              <div key={item.day} className="flex-1 flex flex-col items-center">
                <div className="w-full flex items-end justify-center mb-2">
                  <button
                    onClick={() => setSelectedDay(selectedDay === item.day ? null : item.day)}
                    className={`w-6 rounded-t transition-all duration-300 hover:opacity-80 ${
                      selectedDay === item.day ? "ring-2 ring-indigo-400" : ""
                    }`}
                    style={{
                      height: `${(item.value / maxValue) * 80}px`,
                      minHeight: "8px",
                      background:
                        selectedDay === item.day
                          ? "linear-gradient(to top, #3b82f6, #1d4ed8)"
                          : "linear-gradient(to top, #06b6d4, #3b82f6)",
                    }}
                    title={`${item.day}: ${item.value} appointments`}
                  />
                </div>
                <span
                  className={`text-xs ${
                    selectedDay === item.day
                      ? "text-indigo-600 dark:text-indigo-400 font-medium"
                      : darkMode
                        ? "text-gray-400"
                        : "text-gray-500"
                  }`}
                >
                  {item.day}
                </span>
              </div>
            ))}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-blue-500" />
                <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Total</span>
              </div>
              <p className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>{totalAppointments}</p>
            </div>
            <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Average</span>
              </div>
              <p className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>{avgPerDay}</p>
            </div>
            <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-purple-500" />
                <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Peak</span>
              </div>
              <p className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>{maxValue}</p>
            </div>
          </div>

          {/* Selected Day Details */}
          {selectedDayData && (
            <div
              className={`p-4 rounded-lg border ${
                darkMode ? "bg-gray-700 border-gray-600" : "bg-blue-50 border-blue-200"
              }`}
            >
              <h4 className={`font-medium mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                {selectedDayData.day} - {selectedDayData.value} Appointments
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedDayData.appointments.map((appointment, index) => (
                  <span
                    key={index}
                    className={`text-xs px-2 py-1 rounded-full ${
                      darkMode ? "bg-gray-600 text-gray-300" : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {appointment}
                  </span>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="space-y-3">
          {activityData.map((item) => (
            <div
              key={item.day}
              className={`p-3 rounded-lg border transition-colors hover:shadow-md ${
                darkMode
                  ? "bg-gray-700 border-gray-600 hover:bg-gray-600"
                  : "bg-gray-50 border-gray-200 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500`} />
                  <span className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>{item.day}</span>
                </div>
                <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {item.value} appointments
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {item.appointments.slice(0, 3).map((appointment, index) => (
                  <span
                    key={index}
                    className={`text-xs px-2 py-1 rounded ${
                      darkMode ? "bg-gray-600 text-gray-300" : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {appointment}
                  </span>
                ))}
                {item.appointments.length > 3 && (
                  <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    +{item.appointments.length - 3} more
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
