import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'

export default function ProductsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/dashboard/products/upload">
          <Button className="bg-[#5A2B9C] hover:bg-[#4a2482] text-white">
            <Plus className="mr-2 h-4 w-4" /> Add New Product
          </Button>
        </Link>
      </div>
      {/* Here you would typically map through your products and display them */}
      <p>Your products will be displayed here.</p>
    </div>
  )
}

