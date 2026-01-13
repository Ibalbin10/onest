import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const activityId = searchParams.get("id")
  const destination = searchParams.get("dest")

  if (!activityId || !destination) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 }
    )
  }

  const supabase = createClient()

  const { data: activity } = await supabase
    .from("activities")
    .select("id")
    .eq("id", activityId)
    .single()

  if (!activity) {
    return NextResponse.json(
      { error: "Activity not found" },
      { status: 404 }
    )
  }

  supabase
    .from("engagement_events")
    .insert({
      activity_id: activityId,
      destination_url: destination,
    })
    .then()

  return NextResponse.redirect(destination, { status: 302 })
}
