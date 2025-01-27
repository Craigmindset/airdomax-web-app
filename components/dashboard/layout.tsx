"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Search, HelpCircle, Plus, Bell, User, Mail, Package, Users, CreditCard, Settings, LogOut, SlidersHorizontal, MessageSquare, Briefcase, Upload, Layout, Wallet, FileText, Sun, Moon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useProfile } from "@/contexts/ProfileContext"
import { useWallet } from "@/contexts/WalletContext"
import { useTheme } from "@/contexts/ThemeContext"

const scrollbarHideClass = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Profile", href: "/dashboard/profile" },
  { name: "About us", href: "/dashboard/about" },
  { name: "Services", href: "/dashboard/services" },
  { name: "Market Place", href: "/dashboard/marketplace" },
]

const sidebarNavigation = [
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "My Page", href: "/dashboard/my-page", icon: Layout },
  { name: "Messages", href: "/dashboard/chat", icon: Mail },
  { name: "Products", href: "/dashboard/products", icon: Package },
  { name: "Services", href: "/dashboard/services", icon: Briefcase },
  { name: "Search", href: "/dashboard/search", icon: Users },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Market Post", href: "/dashboard/market-post", icon: FileText },
  { name: "Log Out", href: "/", icon: LogOut },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { profileImage } = useProfile()
  const router = useRouter()
  const { balance } = useWallet()
  const { theme, toggleTheme } = useTheme()

  return (
    <div className={`min-h-screen h-screen flex flex-col font-poppins overflow-hidden ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
      <style>{scrollbarHideClass}</style>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        body {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
      {/* Top Navigation - Sticky */}
      <header className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-b sticky top-0 z-10`}>
        <div className="max-w-[1920px] mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/dashboard">
                <div className="bg-black text-white px-6 py-2 text-lg font-semibold">
                  Logo
                </div>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 mx-4 mt-0.5">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    pathname === item.href
                      ? "text-black font-semibold"
                      : "text-gray-500 hover:text-gray-900"
                  } text-sm font-medium whitespace-nowrap`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Search and Actions */}
            <div className="flex items-center space-x-2 mr-4 mt-1.5">
              <div className="relative flex items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Specify your search"
                    className="w-full max-w-md pl-10 pr-16 py-2 rounded-full border-gray-200"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                    <div className="h-4 w-px bg-gray-300 mx-2" />
                    <SlidersHorizontal className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100">
                  <HelpCircle className="h-5 w-5 text-gray-500" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-gray-100"
                  onClick={() => router.push('/dashboard/products/upload')}
                >
                  <Plus className="h-5 w-5 text-gray-500" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100">
                  <Bell className="h-5 w-5 text-gray-500" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-gray-100"
                  onClick={() => router.push('/dashboard/chat')}
                >
                  <MessageSquare className="h-5 w-5 text-gray-500" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-gray-100 relative w-12 h-12"
                  onClick={() => router.push('/dashboard/wallet')}
                >
                  <Wallet className="h-5 w-5 text-gray-500" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    ${balance}
                  </span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-full ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  onClick={toggleTheme}
                >
                  {theme === 'light' ? <Moon className="h-5 w-5 text-gray-500" /> : <Sun className="h-5 w-5 text-gray-300" />}
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        {profileImage ? (
                          <AvatarImage src={profileImage} alt="Profile" />
                        ) : (
                          <AvatarFallback>U</AvatarFallback>
                        )}
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/')}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden h-[calc(100vh-2.5rem)]">
        {/* Sidebar - Sticky */}
        <div className={`w-56 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-r flex flex-col h-full`}>
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="p-4 pt-8 pb-20">
              <h2 className="text-lg font-semibold mb-4">Menu</h2>
              <nav className="space-y-[25px]">
                {sidebarNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      if (item.name === "Log Out") {
                        e.preventDefault();
                        router.push('/');
                      }
                    }}
                    className={`${
                      pathname === item.href
                        ? "bg-gray-50 text-[#5A2B9C]"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    } group flex items-center px-3 py-2 text-sm font-medium rounded-md`}
                  >
                    <item.icon
                      className={`${
                        pathname === item.href ? "text-[#5A2B9C]" : "text-gray-400"
                      } mr-3 h-5 w-5`}
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Main Content - Scrollable */}
        <div className="flex-1 flex flex-col">
          <main className="flex-1 overflow-y-auto p-4 scrollbar-hide">
            <div className="max-w-[1656px] mx-auto h-full">
              {children}
            </div>
          </main>
        </div>
      </div>
      <footer className="bg-black text-white py-1 w-full text-center">
        <div className="text-sm">
          © Airdomax Limited | 2025
        </div>
      </footer>
    </div>
  )
}

