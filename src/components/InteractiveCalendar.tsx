"use client"

import { useState } from "react"
import { calendarAppointments, appointmentCards } from "../data/appointments"
import { ChevronLeft, ChevronRight, Plus, Clock, User } from "lucide-react"

interface InteractiveCalendarProps {
  darkMode: boolean
  onAddAppointment: () => void
}

export default function InteractiveCalendar({ darkMode, onAddAppointment }: InteractiveCalendarProps) {
  const [selectedDate, setSelectedDate] = useState(28)
  const [currentMonth, setCurrentMonth] = useState("October 2021")
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month")

  const daysOfWeek = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"]
  const dates = [25, 26, 27, 28, 29, 30, 31]

  const getAppointmentsForDate = (date: number) => {
    return calendarAppointments[date.toString()] || []
  }

  const selectedAppointments = getAppointmentsForDate(selectedDate)

  return (
    <div className={`rounded-xl shadow-sm p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>This Week</p>
          <h2 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>{currentMonth}</h2>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            {["month", "week", "day"].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as any)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  viewMode === mode
                    ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-4">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className={`text-center text-xs font-medium py-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
          >
            {day}
          </div>
        ))}

        {dates.map((date) => {
          const appointments = getAppointmentsForDate(date)
          const isSelected = selectedDate === date
          const isToday = date === 28

          return (
            <div key={date} className="text-center">
              <button
                onClick={() => setSelectedDate(date)}
                className={`w-8 h-8 mx-auto flex items-center justify-center text-sm font-medium rounded-lg transition-colors ${
                  isSelected
                    ? "bg-indigo-600 text-white"
                    : isToday
                      ? "bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300"
                      : darkMode
                        ? "text-gray-300 hover:bg-gray-700"
                        : "text-gray-900 hover:bg-gray-100"
                }`}
              >
                {date}
              </button>

              <div className="mt-1 space-y-1">
                {appointments.slice(0, 2).map((appointment, index) => (
                  <div
                    key={index}
                    className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-1 py-0.5 rounded text-center cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                    title={`${appointment.time} - ${appointment.type} with ${appointment.doctor}`}
                  >
                    {appointment.time}
                  </div>
                ))}
                {appointments.length > 2 && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">+{appointments.length - 2} more</div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Selected Date Details */}
      <div className={`border-t pt-4 ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
            Appointments for {currentMonth.split(" ")[0]} {selectedDate}
          </h3>
          <button
            onClick={onAddAppointment}
            className="flex items-center space-x-1 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>

        {selectedAppointments.length > 0 ? (
          <div className="space-y-3">
            {selectedAppointments.map((appointment, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border transition-colors hover:shadow-md ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 hover:bg-gray-600"
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>{appointment.type}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-gray-500" />
                          <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                            {appointment.time}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3 text-gray-500" />
                          <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                            {appointment.doctor}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    className={`text-sm px-3 py-1 rounded-full border transition-colors ${
                      darkMode
                        ? "border-gray-600 text-gray-300 hover:bg-gray-600"
                        : "border-gray-300 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`text-center py-8 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No appointments scheduled for this date</p>
            <button
              onClick={onAddAppointment}
              className="mt-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
            >
              Schedule an appointment
            </button>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {appointmentCards.map((card) => (
          <div
            key={card.id}
            className="p-4 rounded-xl text-white cursor-pointer hover:opacity-90 transition-opacity"
            style={{ backgroundColor: card.color }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{card.icon}</span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  card.status === "confirmed" ? "bg-green-500" : "bg-yellow-500"
                }`}
              >
                {card.status}
              </span>
            </div>
            <h3 className="font-medium mb-1">{card.type}</h3>
            <p className="text-sm opacity-90 mb-2">{card.doctor}</p>
            <p className="text-sm opacity-75">{card.time}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
