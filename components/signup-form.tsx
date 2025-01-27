"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, Lock, User, Phone, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { supabase } from "@/utils/supabase"

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const router = useRouter()

  const checkPasswordsMatch = () => {
    if (confirmPassword !== "" && password !== confirmPassword) {
      setPasswordsMatch(false)
    } else {
      setPasswordsMatch(true)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!passwordsMatch) {
      toast({
        title: "Password mismatch",
        description: "Please ensure your passwords match.",
        variant: "destructive",
      })
      return
    }
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const phone = formData.get("phone") as string
    const company = formData.get("company") as string
    const userType = formData.get("userType") as string

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            phone,
            company,
            user_type: userType,
          },
        },
      })

      if (error) throw error

      toast({
        title: "Sign up successful",
        description: "Please check your email to verify your account.",
      })

      router.push("/dashboard")
    } catch (error) {
      console.error("Error signing up:", error)
      toast({
        title: "Sign up failed",
        description: "There was an error signing up. Please try again.",
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
          <h1 className="text-4xl font-bold text-center">Airdomax Limited</h1>
          <p className="text-lg max-w-md">
            Providing you with the simplified business in the pharmaceutical Market Place
          </p>
        </div>
        <div className="text-sm ">© Airdomax Limited | 2025</div>
      </div>

      {/* Right side with form */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-2xl space-y-8">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-3xl font-bold">
              Get Started with <span className="text-[#5A2B9C]">Airdomax</span>
            </h1>
            <div className="w-16 h-1 bg-[#5A2B9C] mx-auto"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name*</Label>
                <Input id="firstName" name="firstName" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name*</Label>
                <Input id="lastName" name="lastName" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail*</Label>
                <div className="relative">
                  <Input id="email" name="email" type="email" required className="pl-10" />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number*</Label>
                <div className="relative">
                  <Input id="phone" name="phone" type="tel" inputMode="numeric" required className="pl-10" />
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company name*</Label>
              <div className="relative">
                <Input id="company" name="company" required className="pl-10" />
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>I'm a*</Label>
              <RadioGroup name="userType" defaultValue="manufacturer" className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="manufacturer" id="manufacturer" />
                  <Label htmlFor="manufacturer">Manufacturer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="regulator" id="regulator" />
                  <Label htmlFor="regulator">Regulator</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="distributor" id="distributor" />
                  <Label htmlFor="distributor">Distributor</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="vetting-agent" id="vetting-agent" />
                  <Label htmlFor="vetting-agent">Vetting Agent</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password*</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="pl-10"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password*</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  className="pl-10"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                    if (e.target.value !== "" && e.target.value !== password) {
                      setPasswordsMatch(false)
                    } else {
                      setPasswordsMatch(true)
                    }
                  }}
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>

            {!passwordsMatch && confirmPassword !== "" && (
              <p className="text-red-500 text-sm">Passwords do not match</p>
            )}

            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" required />
                <label htmlFor="terms" className="text-sm">
                  I agree to Airdomax{" "}
                  <Link href="/terms" className="text-blue-600 hover:underline">
                    Terms and Conditions
                  </Link>
                  <span className="text-red-500">*</span>
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="privacy" required />
                <label htmlFor="privacy" className="text-sm">
                  I agree to Airdomax{" "}
                  <Link href="/privacy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </Link>
                  <span className="text-red-500">*</span>
                </label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#5A2B9C] hover:bg-[#4a2482] text-white text-lg rounded-lg py-6"
              disabled={loading || !passwordsMatch || !password || !confirmPassword || password !== confirmPassword}
            >
              {loading ? "Signing up..." : "Sign up"}
            </Button>

            <div className="text-center">
              <span className="text-gray-600">Already have an account? </span>
              <Link href="/" className="text-blue-600 hover:underline">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

