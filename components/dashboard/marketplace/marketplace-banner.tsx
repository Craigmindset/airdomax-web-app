export function MarketplaceBanner() {
  return (
    <div className="relative h-[200px] w-full overflow-hidden rounded-lg">
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2149431123.jpg-7wqi0gLPjVlre2YqeRTwMS1TAygYgv.jpeg"
        alt="Various pharmaceutical pills and capsules scattered on blue background"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#4B84D7]/80 to-transparent">
        <div className="h-full flex flex-col justify-center max-w-2xl p-6">
          <h1 className="text-3xl font-bold text-white mb-3">
            Pharmaceutical Marketplace
          </h1>
          <p className="text-white/90 text-base leading-snug">
            Connect with trusted manufacturers, distributors, and healthcare providers in our secure marketplace
          </p>
        </div>
      </div>
    </div>
  )
}

