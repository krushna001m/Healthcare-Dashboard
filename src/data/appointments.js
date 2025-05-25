export const calendarAppointments = {
  25: [
    { time: "10:00", type: "Consultation", doctor: "Dr. Smith" },
    { time: "11:00", type: "Blood Test", doctor: "Lab Tech" },
    { time: "12:00", type: "X-Ray", doctor: "Radiologist" },
  ],
  26: [
    { time: "09:00", type: "Dentist", doctor: "Dr. Johnson" },
    { time: "10:00", type: "Checkup", doctor: "Dr. Williams" },
    { time: "13:00", type: "Therapy", doctor: "Dr. Brown" },
  ],
  27: [{ time: "12:00", type: "Follow-up", doctor: "Dr. Davis" }],
  28: [
    { time: "10:00", type: "Cardiology", doctor: "Dr. Wilson" },
    { time: "11:00", type: "Scan", doctor: "Technician" },
    { time: "14:00", type: "Consultation", doctor: "Dr. Miller" },
    { time: "16:00", type: "Therapy", doctor: "Dr. Garcia" },
  ],
  29: [
    { time: "14:00", type: "Dermatology", doctor: "Dr. Martinez" },
    { time: "15:00", type: "Checkup", doctor: "Dr. Anderson" },
  ],
  30: [{ time: "11:00", type: "Surgery Prep", doctor: "Dr. Taylor" }],
}

export const appointmentCards = [
  {
    id: "dentist",
    type: "Dentist",
    time: "09:00-11:00",
    doctor: "Dr. Cameron Williamson",
    icon: "🦷",
    color: "#3b82f6",
    status: "confirmed",
  },
  {
    id: "physiotherapy",
    type: "Physiotherapy Appointment",
    time: "11:00-12:00",
    doctor: "Dr. Kevin Djones",
    icon: "🏃",
    color: "#8b5cf6",
    status: "pending",
  },
]

export const upcomingSchedule = [
  {
    day: "On Thursday",
    appointments: [
      {
        id: "checkup",
        title: "Health checkup complete",
        time: "11:00 AM",
        icon: "🏥",
        color: "#ef4444",
        status: "completed",
      },
      {
        id: "ophthalmologist",
        title: "Ophthalmologist",
        time: "14:00 PM",
        icon: "👁️",
        color: "#3b82f6",
        status: "upcoming",
      },
    ],
  },
  {
    day: "On Saturday",
    appointments: [
      {
        id: "cardiologist",
        title: "Cardiologist",
        time: "12:00 AM",
        icon: "❤️",
        color: "#ef4444",
        status: "upcoming",
      },
      {
        id: "neurologist",
        title: "Neurologist",
        time: "16:00 PM",
        icon: "🧠",
        color: "#8b5cf6",
        status: "upcoming",
      },
    ],
  },
]

export const activityData = [
  { day: "Mon", value: 3, appointments: ["Checkup", "Blood Test", "Consultation"] },
  { day: "Tue", value: 5, appointments: ["Scan", "Therapy", "Follow-up", "X-Ray", "Dentist"] },
  { day: "Wed", value: 2, appointments: ["Consultation", "Lab Work"] },
  {
    day: "Thu",
    value: 7,
    appointments: ["Surgery", "Recovery", "Checkup", "Therapy", "Scan", "Consultation", "Follow-up"],
  },
  { day: "Fri", value: 4, appointments: ["Therapy", "Checkup", "Consultation", "Lab Work"] },
  { day: "Sat", value: 6, appointments: ["Scan", "Surgery Prep", "Consultation", "Therapy", "Follow-up", "Checkup"] },
  { day: "Sun", value: 3, appointments: ["Emergency", "Consultation", "Follow-up"] },
]
