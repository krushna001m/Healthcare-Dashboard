import { calendarAppointments, appointmentCards } from "../data/appointments"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function CalendarView() {
  const daysOfWeek = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"]
  const dates = [25, 26, 27, 28, 29, 30, 31]

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-gray-500">This Week</p>
          <h2 className="text-xl font-semibold text-gray-900">October 2021</h2>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-1 hover:bg-gray-100 rounded">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-4">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}

        {dates.map((date) => (
          <div key={date} className="text-center">
            <div
              className={`w-8 h-8 mx-auto flex items-center justify-center text-sm font-medium rounded-lg ${
                date === 28 ? "bg-indigo-600 text-white" : "text-gray-900"
              }`}
            >
              {date}
            </div>

            <div className="mt-1 space-y-1">
              {calendarAppointments[date.toString()]?.map((time, index) => (
                <div key={index} className="text-xs bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-center">
                  {time}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        {appointmentCards.map((card) => (
          <div key={card.id} className="p-4 rounded-xl text-white" style={{ backgroundColor: card.color }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{card.icon}</span>
              <span className="text-sm opacity-90">{card.time}</span>
            </div>
            <h3 className="font-medium mb-1">{card.type}</h3>
            <p className="text-sm opacity-90">{card.doctor}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
