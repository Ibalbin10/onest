import type { Database } from "./supabase"

export type Category = Database["public"]["Tables"]["categories"]["Row"]
export type Community = Database["public"]["Tables"]["communities"]["Row"]
export type Activity = Database["public"]["Tables"]["activities"]["Row"]
export type EngagementEvent = Database["public"]["Tables"]["engagement_events"]["Row"]
export type HostSubmission = Database["public"]["Tables"]["host_submissions"]["Row"]

export type ActivityWithRelations = Activity & {
  communities: Community
  categories: Category
}

export type HostSubmissionForm = Omit<
  HostSubmission,
  "id" | "created_at" | "status"
>
