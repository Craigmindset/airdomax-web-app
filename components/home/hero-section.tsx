"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <div className="relative bg-gradient-to-br from-[#FFF5F2] to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-[#FF5733] font-handwriting text-3xl mb-4">Health is hip!</h2>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Building the African health ecosystem of the future through{" "}
              <span className="text-[#FF5733]">Network</span>
            </h1>
            <p className="text-gray-600 mb-8">
              We are a health solution company rendering technology products and services to promote access to affordable and quality healthcare across Africa.
            </p>
            <div className="mb-8">
              <h3 className="text-gray-700 mb-4">Recognized by</h3>
              <div className="flex flex-wrap gap-8 items-center">
                <img src="/placeholder.svg?height=40&width=120" alt="Partner 1" className="h-10" />
                <img src="/placeholder.svg?height=40&width=120" alt="Partner 2" className="h-10" />
                <img src="/placeholder.svg?height=40&width=120" alt="Partner 3" className="h-10" />
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screen%20shot.jpg-lp0uVVh1hkpMSFQBP9R6pQ5w7c2INt.jpeg"
                alt="Mobile App Interface"
                className="w-full rounded-lg shadow-xl"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-[#FF5733]/10 rounded-full filter blur-xl"></div>
            <div className="absolute -top-4 -left-4 w-72 h-72 bg-[#FF5733]/10 rounded-full filter blur-xl"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

