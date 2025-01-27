"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

interface AdminAuthModalProps {
  className?: string;
}

export function AdminAuthModal({ className }: AdminAuthModalProps) {
  const [authCode, setAuthCode] = useState("")
  const [isOpen, setIsOpen] = useState(false) // Initialize isOpen to false to control the modal visibility
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (authCode === "admin123") {
      setIsOpen(false) // Close the modal after successful authentication
      localStorage.setItem("adminAuthCode", authCode)
      router.push("/admin/login")
    } else {
      toast({
        title: "Authentication Failed",
        description: "Invalid authentication code",
        variant: "destructive",
      })
    }
  }

  const handleOpenModal = () => {
    setIsOpen(true) // Open the modal when the button is clicked
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className={`text-sm ${className}`} onClick={handleOpenModal}> {/* Add onClick handler */}
          Admin
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Admin Authentication</DialogTitle>
          <DialogDescription>
            Enter the authentication code to access the admin login.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="authCode" className="text-right">
                Auth Code
              </Label>
              <Input
                id="authCode"
                type="password"
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Authenticate</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

