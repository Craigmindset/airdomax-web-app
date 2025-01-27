"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AdminAuthModal } from "@/components/admin/admin-auth-modal"
import { supabase } from "@/utils/supabase"
import { toast } from "@/components/ui/use-toast"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      toast({
        title: "Login successful",
        description: "Welcome back!",
      })

      router.push("/dashboard")
    } catch (error) {
      console.error("Error logging in:", error)
      let errorMessage = "An unexpected error occurred. Please try again."

      if (error.code === "invalid_credentials") {
        errorMessage = "Invalid email or password. Please check your credentials and try again."
      }

      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side with background */}
      <div
        className="relative hidden lg:flex flex-col items-center justify-center p-12 text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/signin-bg.jpg-tPN7anRsubWSQbSKGakzRq5rEAkWa2.jpeg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center space-y-4 mb-auto mt-auto">
          <h1 className="text-4xl font-bold">Airdomax Limited</h1>
          <p className="text-lg max-w-md">
            Providing you with the simplified business in the pharmaceutical Market Place
          </p>
        </div>
        <div className="text-sm flex items-center space-x-2">
          <span>© Airdomax Limited | 2025</span>
          <AdminAuthModal className="text-gray-300 hover:text-gray-100" />
        </div>
      </div>

      {/* Right side with form */}
      <div className="flex items-center justify-center p-8 relative">
        {/* Help Modal Button */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="absolute top-4 right-4 rounded-full hover:bg-gray-100">
              <HelpCircle className="h-5 w-5 text-gray-500" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Need Help?</DialogTitle>
              <DialogDescription>If you're having trouble logging in, here are some helpful tips:</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Forgot Password?</h4>
                <p className="text-sm text-gray-500">
                  Click the "Forgot password?" link below the login form to reset your password.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">New User?</h4>
                <p className="text-sm text-gray-500">
                  If you don't have an account yet, click the "click here" link to sign up.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Contact Support</h4>
                <p className="text-sm text-gray-500">
                  For additional assistance, please contact our support team at support@airdomax.com
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Log in to your account</h2>
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link href="/signup" className="text-blue-600 hover:underline">
                click here
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium" htmlFor="email">
                E-mail*
              </label>
              <div className="relative">
                <Input id="email" name="email" type="email" required className="pl-10" placeholder="Enter your email" />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium" htmlFor="password">
                Password*
              </label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="pl-10"
                  placeholder="Enter your password"
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>

            <Link href="/forgot-password" className="block text-sm text-blue-600 hover:underline">
              Forgot password?
            </Link>

            <Button type="submit" className="w-full bg-[#5A2B9C] hover:bg-[#4a2482] text-white py-6" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

