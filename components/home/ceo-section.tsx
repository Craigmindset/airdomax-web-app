export function CEOSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#FF5733] mb-6">Meet our CEO</h2>
            <p className="text-gray-600 mb-6">
              Learn about our vision for transforming healthcare in Africa and how we're making it happen.
            </p>
            <button className="bg-black text-white px-6 py-2 rounded-full">
              Watch Video
            </button>
          </div>
          <div className="relative">
            <img
              src="/placeholder.svg?height=400&width=600"
              alt="CEO"
              className="rounded-lg shadow-xl w-full"
            />
            <div className="absolute -z-10 bottom-0 right-0 transform translate-x-1/4 translate-y-1/4">
              <div className="w-24 h-24 bg-[#FF5733]/20 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

