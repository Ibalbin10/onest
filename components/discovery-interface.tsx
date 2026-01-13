"use client"

import { useState } from "react"
import { CategoryGrid } from "./category-grid"
import { ActivityList } from "./activity-list"

export function DiscoveryInterface() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  return (
    <div className="space-y-12">
      <CategoryGrid
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      <ActivityList categorySlug={selectedCategory} />
    </div>
  )
}
