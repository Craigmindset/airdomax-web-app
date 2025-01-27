import { User, Truck, UserCheck, Pill, Store, TrendingUp, Users, LayoutGrid } from 'lucide-react'
import { Category } from "./marketplace-page"

interface MarketplaceFiltersProps {
  selectedFilter: Category
  onFilterChange: (filter: Category) => void
}

export function MarketplaceFilters({ selectedFilter, onFilterChange }: MarketplaceFiltersProps) {
  const filters = [
    { label: "Manufacturer", icon: User },
    { label: "Distributors", icon: Truck },
    { label: "Vetting Agent", icon: UserCheck },
    { label: "Pharmacist", icon: Pill },
    { label: "Retailers", icon: Store },
    { label: "Investors", icon: TrendingUp },
    { label: "Partners", icon: Users },
    { label: "All", icon: LayoutGrid },
  ]

  return (
    <div className="w-56 bg-white rounded-lg p-6 h-fit">
      <h2 className="text-lg font-semibold text-purple-900 mb-6">FILTER SEARCH</h2>
      <nav className="space-y-6">
        {filters.map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => onFilterChange(label as Category)}
            className={`flex items-center space-x-3 w-full px-3 py-2 rounded-lg transition-colors ${
              selectedFilter === label
                ? "bg-purple-100 text-purple-900"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Icon className="h-5 w-5" />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

