import ProductUploadForm from "@/components/dashboard/products/product-upload-form"

export default function ProductUploadPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Upload New Product</h1>
      <ProductUploadForm />
    </div>
  )
}

