"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Users, Package, Briefcase, BarChart, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: BarChart },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Services", href: "/admin/services", icon: Briefcase },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated")
    // Dispatch a storage event to notify other tabs
    window.dispatchEvent(new Event("storage"))
    router.push("/admin/login")
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white h-screen">
          <div className="flex items-center justify-center h-16 border-b">
            <span className="text-xl font-semibold">Admin Dashboard</span>
          </div>
          <nav className="mt-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-800 ${
                  pathname === item.href ? "bg-gray-100 text-gray-800" : ""
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            ))}
            <Button
              onClick={handleLogout}
              className="flex items-center w-full px-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </Button>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 p-8">
          {children}
        </div>
      </div>
    </div>
  )
}

