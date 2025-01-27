"use client"

import { useState } from "react"
import { MarketplaceBanner } from "./marketplace-banner"
import { MarketplaceGrid } from "./marketplace-grid"
import { CategoryFilter } from "./category-filter"

export type Category = "Manufacturer" | "Distributors" | "License Agent" | "Vetting Agent" | "Investors" | "All"

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All")

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category)
  }

  return (
    <div className="min-h-full bg-gray-50">
      <MarketplaceBanner />
      <div className="px-4 py-6">
        <CategoryFilter 
          selectedCategory={selectedCategory} 
          onCategoryChange={handleCategoryChange} 
        />
        <div className="mt-6">
          <MarketplaceGrid 
            selectedCategory={selectedCategory}
          />
        </div>
      </div>
    </div>
  )
}

