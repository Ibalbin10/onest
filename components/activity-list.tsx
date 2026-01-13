"use client"

import { useActivities } from "@/lib/hooks/use-activities"
import { ActivityCard } from "./activity-card"
import { ActivityDetail } from "./activity-detail"
import { useState } from "react"
import type { ActivityWithRelations } from "@/types"

interface ActivityListProps {
  categorySlug: string | null
}

export function ActivityList({ categorySlug }: ActivityListProps) {
  const { data: activities, isLoading, error } = useActivities(categorySlug || undefined)
  const [selectedActivity, setSelectedActivity] = useState<ActivityWithRelations | null>(null)

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-48 bg-gray-100 rounded-lg animate-pulse" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Failed to load activities. Please try again later.</p>
      </div>
    )
  }

  if (!activities || activities.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">
          No activities found. Check back soon for new communities!
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activities.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            onClick={() => setSelectedActivity(activity)}
          />
        ))}
      </div>

      {selectedActivity && (
        <ActivityDetail
          activity={selectedActivity}
          onClose={() => setSelectedActivity(null)}
        />
      )}
    </>
  )
}
