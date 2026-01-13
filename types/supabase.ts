export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activities: {
        Row: {
          id: string
          community_id: string
          category_id: string
          name: string
          description: string | null
          cadence: string | null
          location: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          community_id: string
          category_id: string
          name: string
          description?: string | null
          cadence?: string | null
          location?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          community_id?: string
          category_id?: string
          name?: string
          description?: string | null
          cadence?: string | null
          location?: string | null
          status?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "activities_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activities_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          }
        ]
      }
      categories: {
        Row: {
          id: string
          name: string
          emoji: string
          slug: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          emoji: string
          slug: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          emoji?: string
          slug?: string
          created_at?: string
        }
        Relationships: []
      }
      communities: {
        Row: {
          id: string
          name: string
          description: string | null
          instagram_url: string | null
          website_url: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          instagram_url?: string | null
          website_url?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          instagram_url?: string | null
          website_url?: string | null
          status?: string
          created_at?: string
        }
        Relationships: []
      }
      engagement_events: {
        Row: {
          id: string
          activity_id: string
          destination_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          activity_id: string
          destination_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          activity_id?: string
          destination_url?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "engagement_events_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          }
        ]
      }
      host_submissions: {
        Row: {
          id: string
          host_name: string
          email: string
          community_name: string
          role: string | null
          instagram_url: string | null
          category_slug: string | null
          city: string | null
          description: string | null
          avg_attendance: number | null
          brand_ready: boolean
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          host_name: string
          email: string
          community_name: string
          role?: string | null
          instagram_url?: string | null
          category_slug?: string | null
          city?: string | null
          description?: string | null
          avg_attendance?: number | null
          brand_ready?: boolean
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          host_name?: string
          email?: string
          community_name?: string
          role?: string | null
          instagram_url?: string | null
          category_slug?: string | null
          city?: string | null
          description?: string | null
          avg_attendance?: number | null
          brand_ready?: boolean
          status?: string
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
