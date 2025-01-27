import { Category } from "./marketplace-page"
import { MarketplaceCard } from "./marketplace-card"
import { useProductService } from "@/contexts/ProductServiceContext"

interface MarketplaceGridProps {
  selectedCategory: Category
}

export function MarketplaceGrid({ selectedCategory }: MarketplaceGridProps) {
  const { marketplaceCards } = useProductService()

  const filteredCards = marketplaceCards.filter(card => {
    if (selectedCategory === "All") return true
    return card.type.toLowerCase() === selectedCategory.toLowerCase()
  })

  if (filteredCards.length === 0) {
    return <div className="text-center py-8">No cards found matching the selected criteria.</div>
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredCards.map((card) => (
          <div key={card.id} className="w-full flex justify-center">
            <MarketplaceCard company={card} />
          </div>
        ))}
      </div>
    </div>
  )
}

