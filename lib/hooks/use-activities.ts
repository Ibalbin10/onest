import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase"
import type { ActivityWithRelations } from "@/types"

export function useActivities(categorySlug?: string) {
  return useQuery({
    queryKey: ["activities", categorySlug],
    queryFn: async (): Promise<ActivityWithRelations[]> => {
      const supabase = createClient()
      
      let query = supabase
        .from("activities")
        .select(`
          *,
          communities (*),
          categories (*)
        `)
        .eq("status", "vetted")
        .order("created_at", { ascending: false })

      // If category slug provided, filter by it
      if (categorySlug) {
        query = query.eq("categories.slug", categorySlug)
      }

      const { data, error } = await query

      if (error) throw error
      return data as ActivityWithRelations[]
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
