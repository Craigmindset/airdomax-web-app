"use client"

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useProfile } from "@/contexts/ProfileContext"
import { useProductService } from "@/contexts/ProductServiceContext"
import { useUser } from "@/contexts/UserContext"
import { Globe, Phone, Mail, Edit } from 'lucide-react'
import { Building2, Briefcase } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

function truncateDescription(description: string, maxLength: number = 50): string {
  if (description.length <= maxLength) return description;
  return description.slice(0, maxLength - 3) + "...";
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface EditProductModalProps {
  product: Product;
  onSave: (editedProduct: Product) => void;
}

function EditProductModal({ product, onSave }: EditProductModalProps) {
  const [editedProduct, setEditedProduct] = useState<Product>(product)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedProduct(prev => ({ ...prev, [name]: name === 'price' ? parseFloat(value) : value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(editedProduct)
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Product</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Product Name</Label>
          <Input id="name" name="name" value={editedProduct.name} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" value={editedProduct.description} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="price">Price</Label>
          <Input id="price" name="price" type="number" value={editedProduct.price} onChange={handleChange} step="0.01" />
        </div>
        <Button type="submit">Save Changes</Button>
      </form>
    </DialogContent>
  )
}

export default function MyPageContent() {
  const router = useRouter()
  const { profileImage } = useProfile()
  const { products, services } = useProductService()
  const { userData } = useUser()

  const handleRequest = (item: any) => {
    toast({
      title: "Request Sent",
      description: `Your request for ${item.name || item.type} has been sent successfully.`,
    })
  }

  const handleEdit = (item: any) => {
    if (item.name) {
      // It's a product
      router.push(`/dashboard/products/edit/${item.id}`)
    } else {
      // It's a service
      router.push(`/dashboard/services/edit/${item.id}`)
    }
  }

  const renderItems = (items: any[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <Card key={item.id} className="flex flex-col">
          <CardHeader>
            <div className="flex justify-between items-start mb-2">
              <Badge variant={item.name ? "default" : "secondary"}>
                {item.name ? "Product" : "Service"}
              </Badge>
            </div>
            <CardTitle>
              <span className="text-sm" title={item.name || item.type}>
                {(item.name || item.type)}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="aspect-square mb-4">
              <img
                src={item.image || item.images?.[0] || "/placeholder.svg"}
                alt={item.name || item.type}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <p
              className="text-sm text-gray-600 mb-2"
              title={item.description.slice(0, 500)}
            >
              {truncateDescription(item.description.slice(0, 500), 50)}
            </p>
            <p className="font-semibold text-lg">${item.price || item.cost}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              onClick={() => handleRequest(item)}
              className="bg-[#5A2B9C] hover:bg-[#4a2482] text-white"
            >
              Request {item.name ? "Product" : "Service"}
            </Button>
            <Button variant="outline" className="ml-2" onClick={() => handleEdit(item)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="space-y-6">
      <Card className="bg-purple-50">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            {/* First Column: Profile Image */}
            <div className="flex-shrink-0">
              <Avatar className="w-24 h-24">
                {profileImage ? (
                  <AvatarImage src={profileImage} alt={userData.firstName} />
                ) : (
                  <AvatarFallback>{userData.firstName.charAt(0)}</AvatarFallback>
                )}
              </Avatar>
            </div>

            {/* Second Column: User Info */}
            <div className="flex-grow space-y-3">
              <h2 className="text-xl font-bold">{userData.firstName} {userData.lastName}</h2>
              <div>
                <div className="flex items-center space-x-2 mb-0.5">
                  <Building2 className="h-4 w-4 text-gray-500" />
                  <h3 className="text-sm font-semibold">Company</h3>
                </div>
                <p className="text-gray-700 text-sm">{userData.companyName}</p>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-0.5">
                  <Briefcase className="h-4 w-4 text-gray-500" />
                  <h3 className="text-sm font-semibold">Company Sector</h3>
                </div>
                <p className="text-xs text-gray-600">
                  {userData.companySector.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                </p>
              </div>
            </div>

            {/* Third Column: Contact Info */}
            <div className="flex-shrink-0 space-y-2 pr-4">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-semibold">Website</p>
                  <p className="text-sm text-gray-600">{userData.website || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-semibold">Contact</p>
                  <p className="text-sm text-gray-600">{userData.contactNumber}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-semibold">Email</p>
                  <p className="text-sm text-gray-600">{userData.email}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          {renderItems([...products, ...services])}
        </TabsContent>
        <TabsContent value="products">
          {renderItems(products)}
        </TabsContent>
        <TabsContent value="services">
          {renderItems(services)}
        </TabsContent>
      </Tabs>
    </div>
  )
}

