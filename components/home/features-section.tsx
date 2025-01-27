export function FeaturesSection() {
  const features = [
    {
      title: "Medicine ordering & prescription fulfillment",
      description: "Get your prescriptions filled and delivered to your doorstep",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Community as a service",
      description: "Connect with healthcare professionals and other users",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Largest marketplace",
      description: "Access the largest marketplace for medical products in Africa",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Medical hosting platform",
      description: "Host your medical practice on our platform",
      image: "/placeholder.svg?height=300&width=400",
    }
  ]

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-[#FF5733] mb-12">Our Features</h2>
        <div className="space-y-24">
          {features.map((feature, index) => (
            <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
              index % 2 === 0 ? '' : 'lg:flex-row-reverse'
            }`}>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#FF5733]" />
                    <span>Feature point 1</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#FF5733]" />
                    <span>Feature point 2</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#FF5733]" />
                    <span>Feature point 3</span>
                  </li>
                </ul>
                <button className="bg-black text-white px-6 py-2 rounded-full">
                  Learn More
                </button>
              </div>
              <div className="relative">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="rounded-lg shadow-xl w-full"
                />
                <div className="absolute -z-10 top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <div className="w-24 h-24 bg-[#FF5733]/20 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

