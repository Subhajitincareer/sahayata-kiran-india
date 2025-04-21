
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from "@/components/ui/menubar"
import { Link, useLocation } from "react-router-dom"
import { Home, MessageSquare, ChartLine, BookOpen, Calendar } from "lucide-react"

const navItems = [
  {
    to: "/",
    label: "Home",
    icon: Home,
  },
  {
    to: "/chat",
    label: "Chat",
    icon: MessageSquare,
  },
  {
    to: "/mood-tracker",
    label: "Mood",
    icon: ChartLine,
  },
  {
    to: "/assessment",
    label: "Assessment",
    icon: Calendar,
  },
  {
    to: "/resources",
    label: "Resources",
    icon: BookOpen,
  },
]

export function MobileMenubar() {
  const location = useLocation()
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow md:hidden">
      <Menubar className="justify-between w-full px-2 bg-transparent border-0 shadow-none">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.to
          return (
            <MenubarMenu key={item.to}>
              <MenubarTrigger asChild>
                <Link
                  to={item.to}
                  className={`flex flex-col items-center px-2 py-1.5 ${isActive ? "text-sahayata-blue font-bold" : "text-gray-700"}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-xs leading-none mt-1">{item.label}</span>
                </Link>
              </MenubarTrigger>
            </MenubarMenu>
          )
        })}
      </Menubar>
    </nav>
  )
}
