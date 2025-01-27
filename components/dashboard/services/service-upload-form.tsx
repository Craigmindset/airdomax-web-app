"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, X, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"
import { useProductService } from "@/contexts/ProductServiceContext"

export default function ServiceUploadForm() {
  const router = useRouter()
  const [images, setImages] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const { addService } = useProductService()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setImages(prevImages => [...prevImages, ...files])
  }

  const removeImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    
    // Create a new service object
    const newService = {
      id: Date.now().toString(),
      type: formData.get('service-type') as string,
      description: formData.get('description') as string,
      cost: parseFloat(formData.get('cost') as string),
      duration: parseInt(formData.get('duration') as string),
      images: images.map(image => URL.createObjectURL(image))
    }

    // Add the new service to the context
    addService(newService)

    setLoading(false)
    toast({
      title: "Service Uploaded",
      description: "Your service has been successfully uploaded.",
    })
    router.push("/dashboard/my-page")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="images">Service Images</Label>
        <div className="flex flex-wrap gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative w-24 h-24">
              <img
                src={URL.createObjectURL(image) || "/placeholder.svg"}
                alt={`Service preview ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-white rounded-full p-1"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          ))}
          <label htmlFor="image-upload" className="w-24 h-24 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer">
            <Plus className="w-8 h-8 text-gray-400" />
          </label>
        </div>
        <Input
          id="image-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="service-type">Service Type</Label>
        <Select name="service-type" required>
          <SelectTrigger>
            <SelectValue placeholder="Select a service type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="licence-regulatory">Licence Regulatory</SelectItem>
            <SelectItem value="business-vetting">Business Vetting</SelectItem>
            <SelectItem value="government-approval">Government Approval Documents</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description of the Service</Label>
        <Textarea id="description" name="description" required className="min-h-[100px]" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="cost">Cost of the Service</Label>
          <Input id="cost" name="cost" type="number" step="0.01" min="0" required placeholder="Enter cost in USD" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="duration">Delivery Duration (in days)</Label>
          <Input id="duration" name="duration" type="number" min="1" required placeholder="Enter number of days" />
        </div>
      </div>

      <div className="flex justify-between items-center mt-6">
        <Link href="/dashboard/services">
          <Button type="button" variant="outline">Back to Services</Button>
        </Link>
        <Button type="submit" className="bg-[#5A2B9C] hover:bg-[#4a2482] text-white" disabled={loading}>
          {loading ? "Uploading..." : "Upload Service"}
        </Button>
      </div>
    </form>
  )
}

