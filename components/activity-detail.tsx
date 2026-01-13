"use client"

import type { ActivityWithRelations } from "@/types"

interface ActivityDetailProps {
  activity: ActivityWithRelations
  onClose?: () => void
}

export function ActivityDetail({ activity, onClose }: ActivityDetailProps) {
  const externalUrl = activity.communities.instagram_url || activity.communities.website_url

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {activity.name}
            </h2>
            <p className="text-gray-600">by {activity.communities.name}</p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
              ×
            </button>
          )}
        </div>
        <div className="p-6 space-y-6">
          {activity.description && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">About</h3>
              <p className="text-gray-700 leading-relaxed">{activity.description}</p>
            </div>
          )}
          {externalUrl && (
            <div className="pt-4">
              <a
                href={`/api/exit?id=${activity.id}&dest=${encodeURIComponent(externalUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gray-900 text-white text-center py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                View on Instagram →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
