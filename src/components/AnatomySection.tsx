import { anatomyIndicators } from "../data/healthData"

export default function AnatomySection() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 relative">
      <div className="relative w-full h-96 flex items-center justify-center">
        <img src="/images/anatomy-figure.png" alt="Human Anatomy" className="h-80 object-contain" />

        {anatomyIndicators.map((indicator) => (
          <div
            key={indicator.id}
            className="absolute bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg"
            style={indicator.position}
          >
            {indicator.label}
          </div>
        ))}

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-cyan-400 text-white px-4 py-2 rounded-full text-sm font-medium">
          Healthy Legs
        </div>
      </div>
    </div>
  )
}
