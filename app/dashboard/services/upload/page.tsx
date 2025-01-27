import ServiceUploadForm from "@/components/dashboard/services/service-upload-form"

export default function ServiceUploadPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-xl font-bold mb-6">Upload New Service</h1>
      <ServiceUploadForm />
    </div>
  )
}

