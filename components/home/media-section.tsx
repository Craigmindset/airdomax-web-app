export function MediaSection() {
  const mediaItems = [
    {
      image: "/placeholder.svg?height=200&width=300",
      title: "Featured in TechCrunch",
      date: "June 2023",
    },
    {
      image: "/placeholder.svg?height=200&width=300",
      title: "Healthcare Innovation Award",
      date: "July 2023",
    },
    {
      image: "/placeholder.svg?height=200&width=300",
      title: "Impact in African Healthcare",
      date: "August 2023",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-[#FF5733] mb-12">Media Mentions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mediaItems.map((item, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

