import {
  LayoutDashboard,
  History,
  Calendar,
  Clock,
  BarChart3,
  TestTube,
  MessageCircle,
  HelpCircle,
  Settings,
} from "lucide-react"

export const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "history", label: "History", icon: History },
  { id: "calendar", label: "Calendar", icon: Calendar },
  { id: "appointments", label: "Appointments", icon: Clock },
  { id: "statistics", label: "Statistics", icon: BarChart3 },
  { id: "tests", label: "Tests", icon: TestTube },
  { id: "chat", label: "Chat", icon: MessageCircle },
  { id: "support", label: "Support", icon: HelpCircle },
  { id: "setting", label: "Setting", icon: Settings },
]
