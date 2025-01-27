import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'

export default function ServicesPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Services</h1>
        <Link href="/dashboard/services/upload">
          <Button className="bg-[#5A2B9C] hover:bg-[#4a2482] text-white">
            <Plus className="mr-2 h-4 w-4" /> Add New Service
          </Button>
        </Link>
      </div>
      {/* Here you would typically map through your services and display them */}
      <p>Your services will be displayed here.</p>
    </div>
  )
}

