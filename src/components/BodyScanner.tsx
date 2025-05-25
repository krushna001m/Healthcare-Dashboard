"use client"

import { useState } from "react"
import { bodyParts, scanningModes } from "../data/healthData"
import { Play, Pause, RotateCcw, Zap } from "lucide-react"

interface BodyScannerProps {
  darkMode: boolean
}

export default function BodyScanner({ darkMode }: BodyScannerProps) {
  const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [selectedMode, setSelectedMode] = useState("quick")
  const [scanResults, setScanResults] = useState<any>(null)

  const startScan = () => {
    setIsScanning(true)
    setScanProgress(0)
    setScanResults(null)

    const mode = scanningModes.find((m) => m.id === selectedMode)
    const duration = mode?.id === "quick" ? 2000 : mode?.id === "detailed" ? 8000 : 5000

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsScanning(false)
          // Simulate scan results
          setScanResults({
            overall: "Good",
            issues: selectedBodyPart ? 1 : 0,
            recommendations: 3,
            timestamp: new Date().toLocaleString(),
          })
          return 100
        }
        return prev + 100 / (duration / 100)
      })
    }, 100)
  }

  const resetScan = () => {
    setIsScanning(false)
    setScanProgress(0)
    setScanResults(null)
    setSelectedBodyPart(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "#22c55e"
      case "good":
        return "#3b82f6"
      case "warning":
        return "#f59e0b"
      case "excellent":
        return "#10b981"
      default:
        return "#6b7280"
    }
  }

  const selectedPart = bodyParts.find((part) => part.id === selectedBodyPart)

  return (
    <div className={`rounded-xl shadow-sm p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Body Scanner</h2>
        <div className="flex items-center space-x-2">
          <select
            value={selectedMode}
            onChange={(e) => setSelectedMode(e.target.value)}
            className={`px-3 py-1 rounded-lg border text-sm ${
              darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            {scanningModes.map((mode) => (
              <option key={mode.id} value={mode.id}>
                {mode.name} ({mode.duration})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Body Diagram */}
        <div className="relative">
          <div className="relative w-full h-96 flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 rounded-lg overflow-hidden">
            <img src="/images/detailed-anatomy.png" alt="Human Anatomy" className="h-80 object-contain" />

            {/* Scanning overlay */}
            {isScanning && (
              <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
                <div
                  className="w-full h-1 bg-blue-500 animate-pulse"
                  style={{
                    transform: `translateY(${-150 + scanProgress * 3}px)`,
                    boxShadow: "0 0 20px rgba(59, 130, 246, 0.8)",
                  }}
                />
              </div>
            )}

            {/* Body part indicators */}
            {bodyParts.map((part) => (
              <button
                key={part.id}
                onClick={() => setSelectedBodyPart(part.id)}
                className={`absolute w-4 h-4 rounded-full border-2 border-white shadow-lg transition-all duration-200 hover:scale-125 ${
                  selectedBodyPart === part.id ? "ring-4 ring-blue-400" : ""
                }`}
                style={{
                  ...part.position,
                  backgroundColor: getStatusColor(part.status),
                  transform: "translate(-50%, -50%)",
                }}
                title={part.name}
              />
            ))}
          </div>

          {/* Scan Controls */}
          <div className="mt-4 flex items-center justify-center space-x-4">
            <button
              onClick={isScanning ? () => setIsScanning(false) : startScan}
              disabled={scanProgress > 0 && scanProgress < 100}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {isScanning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isScanning ? "Pause Scan" : "Start Scan"}</span>
            </button>

            <button
              onClick={resetScan}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                darkMode
                  ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>

          {/* Progress Bar */}
          {scanProgress > 0 && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Scanning Progress</span>
                <span className={`text-sm font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {Math.round(scanProgress)}%
                </span>
              </div>
              <div className={`w-full h-2 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                <div
                  className="h-2 bg-blue-600 rounded-full transition-all duration-200"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Scan Results Panel */}
        <div className="space-y-4">
          {selectedPart && (
            <div
              className={`p-4 rounded-lg border ${
                darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"
              }`}
            >
              <h3 className={`font-medium mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>{selectedPart.name}</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getStatusColor(selectedPart.status) }}
                  />
                  <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    Status: {selectedPart.status}
                  </span>
                </div>
                <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  Last scan: {selectedPart.lastScan}
                </p>
                <p className={`text-sm ${darkMode ? "text-gray-200" : "text-gray-800"}`}>{selectedPart.details}</p>
                <div className="mt-3">
                  <h4 className={`text-sm font-medium mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    Recommendations:
                  </h4>
                  <ul className="space-y-1">
                    {selectedPart.recommendations.map((rec, index) => (
                      <li key={index} className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                        • {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {scanResults && (
            <div
              className={`p-4 rounded-lg border ${
                darkMode ? "bg-green-900 border-green-700" : "bg-green-50 border-green-200"
              }`}
            >
              <div className="flex items-center space-x-2 mb-3">
                <Zap className="w-5 h-5 text-green-600" />
                <h3 className={`font-medium ${darkMode ? "text-green-300" : "text-green-800"}`}>Scan Complete</h3>
              </div>
              <div className="space-y-2">
                <p className={`text-sm ${darkMode ? "text-green-200" : "text-green-700"}`}>
                  Overall Health: {scanResults.overall}
                </p>
                <p className={`text-sm ${darkMode ? "text-green-200" : "text-green-700"}`}>
                  Issues Found: {scanResults.issues}
                </p>
                <p className={`text-sm ${darkMode ? "text-green-200" : "text-green-700"}`}>
                  Recommendations: {scanResults.recommendations}
                </p>
                <p className={`text-xs ${darkMode ? "text-green-300" : "text-green-600"}`}>
                  Completed: {scanResults.timestamp}
                </p>
              </div>
            </div>
          )}

          {!selectedPart && !scanResults && (
            <div
              className={`p-8 text-center rounded-lg border-2 border-dashed ${
                darkMode ? "border-gray-600 text-gray-400" : "border-gray-300 text-gray-500"
              }`}
            >
              <Zap className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">Interactive Body Scanner</p>
              <p className="text-sm">Click on any body part to view detailed information, or start a full body scan.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
