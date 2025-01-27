"use client"

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Camera, X } from 'lucide-react'
import ReactCountryFlag from "react-country-flag"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useProfile } from "@/contexts/ProfileContext"
import { useUser } from "@/contexts/UserContext"

const countries = [
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "JP", name: "Japan" },
  { code: "CN", name: "China" },
  { code: "IN", name: "India" },
  { code: "BR", name: "Brazil" },
  { code: "NG", name: "Nigeria" },
  // Add more countries as needed
]

export default function ProfileForm() {
  const router = useRouter()
  const { profileImage, setProfileImage } = useProfile()
  const { setUserData } = useUser()
  const [country, setCountry] = useState<{ value: string; display: string }>({ value: '', display: '' })
  const [countryCode, setCountryCode] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const matchedCountry = countries.find(c => c.name.toLowerCase() === country.value.toLowerCase())
    if (matchedCountry) {
      setCountryCode(matchedCountry.code)
    } else {
      setCountryCode('')
    }
  }, [country.value])

  useEffect(() => {
    const storedImage = localStorage.getItem('profileImage')
    if (storedImage) {
      setProfileImage(storedImage)
    }
  }, [setProfileImage])

  const handleClearCountry = () => {
    setCountry({ value: '', display: '' })
    setCountryCode('')
  }

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const imageDataUrl = reader.result as string
        setProfileImage(imageDataUrl)
        localStorage.setItem('profileImage', imageDataUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    const formData = new FormData(e.currentTarget)
    const userData = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      companyName: formData.get('companyName') as string,
      website: formData.get('website') as string,
      contactNumber: formData.get('contactNumber') as string,
      email: formData.get('email') as string,
      companySector: formData.get('companySector') as string,
    }

    setUserData(userData)
    
    try {
      // Here you would typically send the form data to your API
      // For now, we'll simulate an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Navigate to verification page after successful submission
      router.push('/dashboard/verification')
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <div className="h-full overflow-hidden text-xs">
      <div className="h-full overflow-y-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 flex flex-col items-center">
            <div className="relative cursor-pointer" onClick={handleImageClick}>
              <Avatar className="h-20 w-20">
                {profileImage ? (
                  <AvatarImage src={profileImage} alt="Profile" />
                ) : (
                  <AvatarFallback>CN</AvatarFallback>
                )}
              </Avatar>
              <div className="absolute bottom-0 right-0 rounded-full bg-white p-2 shadow-lg">
                <Camera className="h-6 w-6 text-gray-600" />
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            <h2 className="mt-4 text-sm font-medium">Upload Profile Image</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 mt-12">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-xs">First Name</Label>
                <Input id="firstName" name="firstName" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-xs">Last Name</Label>
                <Input id="lastName" name="lastName" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactNumber" className="text-xs">Contact Number</Label>
                <Input id="contactNumber" name="contactNumber" type="tel" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs">Email Address</Label>
                <Input id="email" name="email" type="email" required />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address" className="text-xs">Address</Label>
                <Input id="address" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state" className="text-xs">State*</Label>
                <Input id="state" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="text-xs">Country*</Label>
                <div className="relative">
                  <Input
                    id="country"
                    value={country.display}
                    onChange={(e) => {
                      const inputValue = e.target.value
                      const capitalizedValue = inputValue
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')
                      setCountry({ value: capitalizedValue, display: inputValue })
                    }}
                    required
                    className="pl-10 pr-10"
                    placeholder="Enter your country"
                  />
                  {countryCode && (
                    <ReactCountryFlag
                      countryCode={countryCode}
                      svg
                      style={{
                        width: '1.5em',
                        height: '1.5em',
                        position: 'absolute',
                        left: '0.5rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                      }}
                    />
                  )}
                  {country.value && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2"
                      onClick={handleClearCountry}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-xs">Company Name*</Label>
                <Input id="companyName" name="companyName" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyRegId" className="text-xs">Company Country Reg. ID*</Label>
                <Input id="companyRegId" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="socialMedia" className="text-xs">Social Media Handle</Label>
                <Input id="socialMedia" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website" className="text-xs">Website</Label>
                <Input id="website" name="website" type="url" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companySector" className="text-xs">Company Sector*</Label>
                <Select name="companySector" required>
                  <SelectTrigger id="companySector">
                    <SelectValue placeholder="Select company sector" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manufacturer">Manufacturer</SelectItem>
                    <SelectItem value="distributor">Distributor</SelectItem>
                    <SelectItem value="license-regulator">License Regulator</SelectItem>
                    <SelectItem value="vetting-agent">Vetting Agent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="productCategory" className="text-xs">Product Category*</Label>
                <Select>
                  <SelectTrigger id="productCategory">
                    <SelectValue placeholder="Select product category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prescription">Prescription Drugs</SelectItem>
                    <SelectItem value="otc">Over-the-Counter</SelectItem>
                    <SelectItem value="medical-supplies">Medical Supplies</SelectItem>
                    <SelectItem value="equipment">Medical Equipment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="marketIntent" className="text-xs">Market Place intent*</Label>
                <Select>
                  <SelectTrigger id="marketIntent">
                    <SelectValue placeholder="Select market place intent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buyer">Buyer</SelectItem>
                    <SelectItem value="seller">Seller</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="companyBio" className="text-xs">Company Bio</Label>
                <Textarea 
                  id="companyBio" 
                  className="min-h-[150px] bg-[#F8FDFF]" 
                  placeholder="Tell us about your company..."
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox id="accuracy" className="mt-1" required />
                <div>
                  <Label htmlFor="accuracy" className="font-normal text-xs">
                    <span className="font-semibold">Accuracy of Information:</span> You acknowledge that all information provided by you during registration, profile creation, or any other interaction with this website is true, accurate, and complete to the best of your knowledge.
                  </Label>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox id="liability" className="mt-1" required />
                <div>
                  <Label htmlFor="liability" className="font-normal text-xs">
                    <span className="font-semibold">Liability for False Information:</span> You understand and agree that you are solely responsible for the accuracy of the information you provide. You agree to indemnify and hold harmless the website owner and its affiliates from any and all claims, losses, damages, liabilities, costs, and expenses (including attorneys' fees) arising from or related to any inaccurate, misleading, or fraudulent information you provide.
                  </Label>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#5A2B9C] hover:bg-[#4a2482] text-white py-6 mt-8"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

