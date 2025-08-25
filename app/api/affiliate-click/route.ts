import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { toolId } = await request.json()

    if (!toolId) {
      return NextResponse.json({ error: "Tool ID is required" }, { status: 400 })
    }

    const supabase = await createClient()

    // Get client IP and user agent
    const userIp = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    const userAgent = request.headers.get("user-agent") || "unknown"
    const referrer = request.headers.get("referer") || ""

    // Extract UTM parameters from referrer if available
    const url = new URL(referrer || request.url)
    const utmSource = url.searchParams.get("utm_source")
    const utmMedium = url.searchParams.get("utm_medium")
    const utmCampaign = url.searchParams.get("utm_campaign")

    // Insert affiliate click record
    const { error } = await supabase.from("affiliate_clicks").insert({
      tool_id: toolId,
      user_ip: userIp,
      user_agent: userAgent,
      referrer: referrer,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
    })

    if (error) {
      console.error("Error tracking affiliate click:", error)
      return NextResponse.json({ error: "Failed to track click" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in affiliate click API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
