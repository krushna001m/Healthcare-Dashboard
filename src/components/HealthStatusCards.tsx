"use client"

import { useState } from "react"
import { healthStatusData } from "../data/healthData"
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react"

interface HealthStatusCardsProps {
  darkMode: boolean
}

export default function HealthStatusCards({ darkMode }: HealthStatusCardsProps) {
  const [selectedCard, setSelectedCard] = useState<string | null>(null)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case "excellent":
        return <TrendingUp className="w-4 h-4 text-green-600" />
      default:
        return <TrendingDown className="w-4 h-4 text-red-500" />
    }
  }

  const getProgressGradient = (color: string) => {
    const gradients = {
      "#ef4444": "from-red-400 to-red-600",
      "#22c55e": "from-green-400 to-green-600",
      "#f97316": "from-orange-400 to-orange-600",
    }
    return gradients[color as keyof typeof gradients] || "from-gray-400 to-gray-600"
  }

  return (
    <div className="space-y-4">
      {healthStatusData.map((item) => (
        <div
          key={item.id}
          className={`rounded-xl shadow-sm p-4 transition-all duration-200 cursor-pointer ${
            darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:shadow-md"
          } ${selectedCard === item.id ? "ring-2 ring-indigo-400" : ""}`}
          onClick={() => setSelectedCard(selectedCard === item.id ? null : item.id)}
        >
          <div className="flex items-center space-x-3 mb-3">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                darkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              {item.id === "lungs" && "🫁"}
              {item.id === "teeth" && "🦷"}
              {item.id === "bone" && "🦴"}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>{item.title}</h3>
                {getStatusIcon(item.status)}
              </div>
              <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{item.date}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Health Score</span>
              <span className={`text-sm font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                {item.progress}%
              </span>
            </div>
            <div className={`w-full h-2 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}>
              <div
                className={`h-2 rounded-full bg-gradient-to-r ${getProgressGradient(item.color)} transition-all duration-500`}
                style={{ width: `${item.progress}%` }}
              />
            </div>
          </div>

          {selectedCard === item.id && (
            <div className={`mt-4 pt-4 border-t ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
              <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{item.details}</p>
              <div className="mt-3 flex space-x-2">
                <button className="text-xs px-3 py-1 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors">
                  View Details
                </button>
                <button
                  className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                    darkMode
                      ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                      : "border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Schedule Checkup
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Summary Card */}
      <div
        className={`rounded-xl shadow-sm p-4 border-2 border-dashed ${
          darkMode ? "bg-gray-800 border-gray-600" : "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200"
        }`}
      >
        <div className="text-center">
          <div
            className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
              darkMode ? "bg-gray-700" : "bg-white"
            }`}
          >
            <TrendingUp className="w-6 h-6 text-green-500" />
          </div>
          <h3 className={`font-medium mb-1 ${darkMode ? "text-white" : "text-gray-900"}`}>Overall Health</h3>
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Your health metrics are trending positively
          </p>
          <div className="mt-3">
            <span className="text-2xl font-bold text-green-600">
              {Math.round(healthStatusData.reduce((sum, item) => sum + item.progress, 0) / healthStatusData.length)}%
            </span>
            <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Average Score</p>
          </div>
        </div>
      </div>
    </div>
  )
}
