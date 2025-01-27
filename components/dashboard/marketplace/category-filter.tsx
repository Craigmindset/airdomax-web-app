import { Category } from "./marketplace-page"

interface CategoryFilterProps {
  selectedCategory: Category
  onCategoryChange: (category: Category) => void
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const categories: Category[] = [
    "Manufacturer",
    "Distributors",
    "License Agent",
    "Vetting Agent",
    "Investors",
    "All"
  ]

  return (
    <div className="bg-gradient-to-r from-purple-900 to-black rounded-full p-1">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center space-x-2 text-white py-2">
          <span className="font-medium">Categories</span>
        </div>
        <div className="flex items-center space-x-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                selectedCategory === category
                  ? "bg-white text-purple-900"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

