"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import AdminLayout from "@/components/admin/admin-layout"

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      const authCode = localStorage.getItem("adminAuthCode")
      const isAdminAuthenticated = localStorage.getItem("adminAuthenticated") === "true"
      
      if (authCode === "admin123" && isAdminAuthenticated) {
        setIsAuthenticated(true)
      } else if (pathname !== "/admin/login") {
        router.push("/admin/login")
      }
    }

    checkAuth()
    window.addEventListener("storage", checkAuth)

    return () => {
      window.removeEventListener("storage", checkAuth)
    }
  }, [router, pathname])

  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  return isAuthenticated ? <AdminLayout>{children}</AdminLayout> : null
}

