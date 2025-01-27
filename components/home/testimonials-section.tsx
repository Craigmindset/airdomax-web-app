export function TestimonialsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-12">
          <span className="text-[#FF5733]">"</span> Real Stories from Real Customers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600 mb-4">
              "The platform has revolutionized how we manage our healthcare needs. It's simple, efficient, and reliable."
            </p>
            <div className="flex items-center gap-4">
              <img
                src="/placeholder.svg?height=40&width=40"
                alt="Customer"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h4 className="font-semibold">Sarah Johnson</h4>
                <p className="text-sm text-gray-500">Healthcare Provider</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600 mb-4">
              "Access to quality healthcare has never been easier. This platform is a game-changer."
            </p>
            <div className="flex items-center gap-4">
              <img
                src="/placeholder.svg?height=40&width=40"
                alt="Customer"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h4 className="font-semibold">Michael Smith</h4>
                <p className="text-sm text-gray-500">Patient</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

