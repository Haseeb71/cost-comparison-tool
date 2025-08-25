import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminLayout } from "@/components/admin/admin-layout"
import { AffiliateAnalytics } from "@/components/admin/affiliate-analytics"

export default async function AdminAnalyticsPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/admin/login")
  }

  // Get analytics data
  const [clicksResult, conversionsResult, revenueResult] = await Promise.all([
    supabase
      .from("affiliate_clicks")
      .select("*")
      .gte("clicked_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),
    supabase
      .from("affiliate_conversions")
      .select("*")
      .gte("converted_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),
    supabase
      .from("affiliate_conversions")
      .select("conversion_value, commission_amount")
      .gte("converted_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),
  ])

  const analyticsData = {
    clicks: clicksResult.data || [],
    conversions: conversionsResult.data || [],
    revenue: revenueResult.data || [],
  }

  return (
    <AdminLayout>
      <AffiliateAnalytics data={analyticsData} />
    </AdminLayout>
  )
}
