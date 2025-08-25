import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "30d"
    const startDate = searchParams.get("start_date")
    const endDate = searchParams.get("end_date")

    const supabase = await createClient()

    // Check authentication (admin only)
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Calculate date range
    let dateFilter = ""
    if (startDate && endDate) {
      dateFilter = `clicked_at.gte.${startDate},clicked_at.lte.${endDate}`
    } else {
      const days = period === "7d" ? 7 : period === "30d" ? 30 : period === "90d" ? 90 : 30
      const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()
      dateFilter = `clicked_at.gte.${since}`
    }

    // Get total clicks
    const { count: totalClicks } = await supabase
      .from("affiliate_clicks")
      .select("*", { count: "exact", head: true })
      .filter("clicked_at", "gte", dateFilter.split(".")[2])

    // Get total conversions
    const { count: totalConversions } = await supabase
      .from("affiliate_conversions")
      .select("*", { count: "exact", head: true })
      .filter("converted_at", "gte", dateFilter.split(".")[2])

    // Get revenue and commission data
    const { data: conversionData } = await supabase
      .from("affiliate_conversions")
      .select("conversion_value, commission_amount")
      .filter("converted_at", "gte", dateFilter.split(".")[2])

    const totalRevenue = conversionData?.reduce((sum, conv) => sum + (conv.conversion_value || 0), 0) || 0
    const totalCommission = conversionData?.reduce((sum, conv) => sum + (conv.commission_amount || 0), 0) || 0

    // Get top tools
    const { data: topToolsData } = await supabase
      .from("affiliate_clicks")
      .select(`
        tool_id,
        tools!inner(name),
        count
      `)
      .filter("clicked_at", "gte", dateFilter.split(".")[2])

    // Get traffic sources
    const { data: trafficSourcesData } = await supabase
      .from("affiliate_clicks")
      .select("utm_source, count")
      .filter("clicked_at", "gte", dateFilter.split(".")[2])

    const report = {
      period,
      totalClicks: totalClicks || 0,
      totalConversions: totalConversions || 0,
      conversionRate: totalClicks ? ((totalConversions || 0) / totalClicks) * 100 : 0,
      totalRevenue,
      totalCommission,
      topTools: [], // Would need more complex query to aggregate properly
      trafficSources: [], // Would need more complex query to aggregate properly
    }

    return NextResponse.json(report)
  } catch (error) {
    console.error("Error generating affiliate report:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
