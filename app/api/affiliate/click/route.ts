import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"
import { parseUTMParameters, parseUserAgent, validateAffiliateClick } from "@/lib/affiliate-tracking"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { toolId, sessionId, referrer } = body

    // Validate required fields
    if (!validateAffiliateClick({ toolId, sessionId })) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = await createClient()

    // Get client information
    const userIp = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    const userAgent = request.headers.get("user-agent") || "unknown"
    const refererUrl = request.headers.get("referer") || referrer || ""

    // Parse UTM parameters
    const utmParams = refererUrl ? parseUTMParameters(refererUrl) : {}

    // Parse user agent for device info
    const deviceInfo = parseUserAgent(userAgent)

    // Get country from IP (you might want to use a service like MaxMind)
    // For now, we'll leave it as unknown
    const country = "unknown"

    // Insert affiliate click record
    const { data: clickData, error: clickError } = await supabase
      .from("affiliate_clicks")
      .insert({
        tool_id: toolId,
        session_id: sessionId,
        user_ip: userIp,
        user_agent: userAgent,
        referrer: refererUrl,
        utm_source: utmParams.utm_source,
        utm_medium: utmParams.utm_medium,
        utm_campaign: utmParams.utm_campaign,
        utm_term: utmParams.utm_term,
        utm_content: utmParams.utm_content,
        country,
        device: deviceInfo.device,
        browser: deviceInfo.browser,
        os: deviceInfo.os,
      })
      .select()
      .single()

    if (clickError) {
      console.error("Error tracking affiliate click:", clickError)
      return NextResponse.json({ error: "Failed to track click" }, { status: 500 })
    }

    // Get tool information for building affiliate URL
    const { data: tool, error: toolError } = await supabase
      .from("tools")
      .select("website_url, affiliate_url")
      .eq("id", toolId)
      .single()

    if (toolError || !tool) {
      return NextResponse.json({ error: "Tool not found" }, { status: 404 })
    }

    // Return the affiliate URL (or website URL if no affiliate URL)
    const targetUrl = tool.affiliate_url || tool.website_url

    return NextResponse.json({
      success: true,
      clickId: clickData.id,
      targetUrl,
    })
  } catch (error) {
    console.error("Error in affiliate click API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
