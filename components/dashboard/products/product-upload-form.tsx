"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Upload, X } from 'lucide-react'
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

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  quantityUnit: string;
  unitValue: number;
  category: string;
  images: string[];
}

interface ProductUploadFormProps {
  initialData?: Product;
  onSubmit?: (product: Product) => void;
}

export default function ProductUploadForm({ initialData, onSubmit }: ProductUploadFormProps) {
  const router = useRouter()
  const [images, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [category, setCategory] = useState('')
  const [quantityUnit, setQuantityUnit] = useState('units')
  const [unitValue, setUnitValue] = useState('')
  const { addProduct, editProduct } = useProductService()

  useEffect(() => {
    if (initialData) {
      setName(initialData.name)
      setDescription(initialData.description)
      setPrice(formatPrice(initialData.price))
      setQuantity(initialData.quantity.toString())
      setCategory(initialData.category)
      setImagePreviews(initialData.images)
      setQuantityUnit(initialData.quantityUnit)
      setUnitValue(initialData.unitValue.toString())
    }
  }, [initialData])

  const formatPrice = (price: number): string => {
    const dollars = Math.floor(price);
    const cents = Math.round((price - dollars) * 100);
    return `$${dollars}:${cents.toString().padStart(2, '0')}`;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setImages(prevImages => [...prevImages, ...files])
    
    files.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreviews(prevPreviews => [...prevPreviews, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (imagePreviews.length < 3) {
      toast({
        title: "Error",
        description: "Please upload at least 3 images.",
        variant: "destructive",
      })
      return
    }
    if (!category) {
      toast({
        title: "Error",
        description: "Please select a product category.",
        variant: "destructive",
      })
      return
    }
    setLoading(true)

    try {
      const parsedPrice = parseFloat(price.replace('$', '').replace(':', '.'))

      const updatedProduct: Product = {
        id: initialData?.id || Date.now().toString(),
        name,
        description,
        price: parsedPrice,
        quantity: parseInt(quantity),
        unitValue: parseFloat(unitValue) || 0,
        quantityUnit,
        category,
        images: imagePreviews,
      }

      if (onSubmit) {
        await onSubmit(updatedProduct)
      } else {
        if (initialData) {
          await editProduct(updatedProduct)
        } else {
          await addProduct(updatedProduct)
        }
        router.push('/dashboard/my-page')
      }

      toast({
        title: initialData ? "Product Updated" : "Product Uploaded",
        description: `Your product has been successfully ${initialData ? 'updated' : 'uploaded'}.`,
      })
    } catch (error) {
      console.error("Error submitting product:", error)
      toast({
        title: "Error",
        description: "An error occurred while submitting the product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Image upload section */}
      <div className="space-y-2">
        <Label htmlFor="images">Product Images (Minimum 3)</Label>
        <div className="flex flex-wrap gap-4">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="relative w-32 h-32">
              <img src={preview || "/placeholder.svg"} alt={`Product preview ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
              <button
                type="button"
                onClick={() => {
                  setImages(images.filter((_, i) => i !== index))
                  setImagePreviews(imagePreviews.filter((_, i) => i !== index))
                }}
                className="absolute top-1 right-1 bg-white rounded-full p-1"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
              {index === 0 && (
                <span className="absolute bottom-1 left-1 bg-white text-xs px-1 rounded">Main</span>
              )}
            </div>
          ))}
          {imagePreviews.length < 3 && (
            <label htmlFor="image-upload" className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400" />
            </label>
          )}
        </div>
        <Input
          id="image-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="hidden"
        />
        {imagePreviews.length < 3 && (
          <p className="text-sm text-red-500 mt-2">Please upload at least 3 images.</p>
        )}
      </div>

      {/* Product details form fields */}
      <div className="space-y-2">
        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (inputValue.length <= 50) {
              setName(inputValue);
            }
            if (inputValue.length === 50) {
              toast({
                title: "Character Limit Reached",
                description: "Maximum of 50 characters allowed for Product Name.",
              });
            }
          }}
          maxLength={50}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="text"
            placeholder="$0.00"
            value={price}
            onChange={(e) => {
              const input = e.target.value;
              const formatted = input.replace(/^\$?(\d*\.?\d{0,2}).*$/, (_, match) => {
                if (match) return `$${match}`;
                return input;
              });
              setPrice(formatted);
            }}
            onBlur={() => {
              if (price && !/^\$\d+\.\d{2}$/.test(price)) {
                const numericValue = parseFloat(price.replace('$', '')) || 0;
                setPrice(`$${numericValue.toFixed(2)}`);
              }
            }}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            type="number"
            min="0"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="weight">Weight</Label>
          <div className="flex space-x-2">
            <Input
              id="weight"
              type="number"
              min="0"
              placeholder="0"
              value={unitValue}
              onChange={(e) => setUnitValue(e.target.value)}
              className="w-1/2"
            />
            <Select value={quantityUnit} onValueChange={setQuantityUnit} className="w-1/2">
              <SelectTrigger>
                <SelectValue placeholder="Unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kg">Kg</SelectItem>
                <SelectItem value="pound">Pound</SelectItem>
                <SelectItem value="gram">Gram</SelectItem>
                <SelectItem value="ounce">Ounce</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Short Description (Max 500 characters)</Label>
        <Textarea 
          id="description"
          value={description}
          onChange={(e) => {
            if (e.target.value.length <= 500) {
              setDescription(e.target.value);
            }
          }}
          required 
          maxLength={500} 
        />
        <p className="text-sm text-gray-500 mt-1">
          Character count: {description.length} / 500
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Product Category</Label>
        <Select value={category} onValueChange={setCategory} required>
          <SelectTrigger id="category">
            <SelectValue placeholder="Please select your Product Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="drugs">Drugs</SelectItem>
            <SelectItem value="cosmetics">Cosmetics</SelectItem>
            <SelectItem value="food">Food</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-between items-center mt-6">
        <Link href="/dashboard/products">
          <Button type="button" variant="outline">Back to Products</Button>
        </Link>
        <Button 
          type="submit" 
          className="bg-[#5A2B9C] hover:bg-[#4a2482] text-white" 
          disabled={loading || imagePreviews.length < 3 || !category}
        >
          {loading ? "Uploading..." : initialData ? "Update Product" : "Upload Product"}
        </Button>
      </div>
    </form>
  )
}

