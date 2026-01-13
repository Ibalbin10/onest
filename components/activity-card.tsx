import type { ActivityWithRelations } from "@/types"

interface ActivityCardProps {
  activity: ActivityWithRelations
  onClick?: () => void
}

export function ActivityCard({ activity, onClick }: ActivityCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left p-6 bg-white border border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-md transition-all"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        {activity.name}
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        by {activity.communities.name}
      </p>

      <div className="space-y-2">
        {activity.location && (
          <div className="flex items-center text-sm text-gray-700">
            <span className="mr-2">📍</span>
            <span>{activity.location}</span>
          </div>
        )}
        {activity.cadence && (
          <div className="flex items-center text-sm text-gray-700">
            <span className="mr-2">🔁</span>
            <span>{activity.cadence}</span>
          </div>
        )}
      </div>
    </button>
  )
}
