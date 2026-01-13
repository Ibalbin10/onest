"use client"

import { useCategories } from "@/lib/hooks/use-categories"
import { cn } from "@/lib/utils"
import type { Category } from "@/types"

interface CategoryGridProps {
  onCategorySelect: (slug: string | null) => void
  selectedCategory: string | null
}

export function CategoryGrid({
  onCategorySelect,
  selectedCategory,
}: CategoryGridProps) {
  const { data: categories, isLoading } = useCategories()

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-24 bg-gray-100 rounded-lg animate-pulse"
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* "All" option */}
        <button
          onClick={() => onCategorySelect(null)}
          className={cn(
            "flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all",
            "hover:border-gray-400 hover:shadow-sm",
            selectedCategory === null
              ? "border-gray-900 bg-gray-50 shadow-sm"
              : "border-gray-200 bg-white"
          )}
        >
          <span className="text-3xl mb-2">✨</span>
          <span className="text-sm font-medium text-gray-900">All</span>
        </button>

        {categories?.map((category: Category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.slug)}
            className={cn(
              "flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all",
              "hover:border-gray-400 hover:shadow-sm",
              selectedCategory === category.slug
                ? "border-gray-900 bg-gray-50 shadow-sm"
                : "border-gray-200 bg-white"
            )}
          >
            <span className="text-3xl mb-2">{category.emoji}</span>
            <span className="text-sm font-medium text-gray-900 text-center">
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
