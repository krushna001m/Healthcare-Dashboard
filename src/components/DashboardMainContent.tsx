"use client"

import { useState } from "react"
import BodyScanner from "./BodyScanner"
import HealthStatusCards from "./HealthStatusCards"
import InteractiveCalendar from "./InteractiveCalendar"
import UpcomingSchedule from "./UpcomingSchedule"
import ActivityFeed from "./ActivityFeed"
import AppointmentModal from "./AppointmentModal"

interface DashboardMainContentProps {
  activeSection: string
  darkMode: boolean
}

export default function DashboardMainContent({ activeSection, darkMode }: DashboardMainContentProps) {
  const [showAppointmentModal, setShowAppointmentModal] = useState(false)

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column - Body Scanner and Health Status */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              <BodyScanner darkMode={darkMode} />
              <HealthStatusCards darkMode={darkMode} />
            </div>

            {/* Middle Column - Calendar */}
            <div className="col-span-12 lg:col-span-4">
              <InteractiveCalendar darkMode={darkMode} onAddAppointment={() => setShowAppointmentModal(true)} />
            </div>

            {/* Right Column - Schedule and Activity */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              <UpcomingSchedule darkMode={darkMode} />
              <ActivityFeed darkMode={darkMode} />
            </div>
          </div>
        )

      case "calendar":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <InteractiveCalendar darkMode={darkMode} onAddAppointment={() => setShowAppointmentModal(true)} />
            </div>
            <div className="space-y-6">
              <UpcomingSchedule darkMode={darkMode} />
              <ActivityFeed darkMode={darkMode} />
            </div>
          </div>
        )

      case "appointments":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UpcomingSchedule darkMode={darkMode} />
            <ActivityFeed darkMode={darkMode} />
          </div>
        )

      case "statistics":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ActivityFeed darkMode={darkMode} />
            <HealthStatusCards darkMode={darkMode} />
          </div>
        )

      default:
        return (
          <div className={`text-center py-12 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            <h2 className="text-2xl font-semibold mb-4">
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </h2>
            <p>This section is under development.</p>
          </div>
        )
    }
  }

  return (
    <main className={`flex-1 p-6 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="mb-6">
        <h1 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
          {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
        </h1>
        {activeSection === "dashboard" && (
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            Welcome back! Here's your health overview.
          </p>
        )}
      </div>

      {renderContent()}

      <AppointmentModal
        isOpen={showAppointmentModal}
        onClose={() => setShowAppointmentModal(false)}
        darkMode={darkMode}
      />
    </main>
  )
}
