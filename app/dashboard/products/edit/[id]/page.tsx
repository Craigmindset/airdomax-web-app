"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useProductService, Product } from "@/contexts/ProductServiceContext"
import ProductUploadForm from "@/components/dashboard/products/product-upload-form"
import { toast } from "@/components/ui/use-toast"

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { products, editProduct } = useProductService()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = () => {
      try {
        const productToEdit = products.find(p => p.id === params.id)
        if (productToEdit) {
          setProduct(productToEdit)
        } else {
          setError("Product not found")
          toast({
            title: "Error",
            description: "Product not found. Redirecting to products page.",
            variant: "destructive",
          })
          setTimeout(() => router.push('/dashboard/products'), 3000)
        }
      } catch (err) {
        console.error("Error fetching product:", err)
        setError("An error occurred while fetching the product")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id, products, router])

  const handleSubmit = async (updatedProduct: Product) => {
    try {
      await editProduct(updatedProduct)
      toast({
        title: "Product Updated",
        description: "Your product has been successfully updated.",
      })
      router.push('/dashboard/my-page')
    } catch (error) {
      console.error("Error updating product:", error)
      toast({
        title: "Error",
        description: "An error occurred while updating the product. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      {product ? (
        <ProductUploadForm initialData={product} onSubmit={handleSubmit} />
      ) : (
        <div>No product found</div>
      )}
    </div>
  )
}

