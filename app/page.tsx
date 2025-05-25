"use client"

import { useState } from "react"
import Header from "../src/components/Header"
import Sidebar from "../src/components/Sidebar"
import DashboardMainContent from "../src/components/DashboardMainContent"
import { useLocalStorage } from "../src/hooks/useLocalStorage"

export default function App() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [showAppointmentModal, setShowAppointmentModal] = useState(false)
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false)

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "dark" : ""}`}>
      <Header
        onAddAppointment={() => setShowAppointmentModal(true)}
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
      />
      <div className="flex flex-1">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} darkMode={darkMode} />
        <DashboardMainContent activeSection={activeSection} darkMode={darkMode} />
      </div>
    </div>
  )
}
