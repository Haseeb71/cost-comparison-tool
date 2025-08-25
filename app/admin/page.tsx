import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default async function AdminPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/admin/login")
  }

  // Check if user has admin profile, create one if it doesn't exist
  let { data: adminProfile } = await supabase.from("admin_profiles").select("*").eq("id", data.user.id).single()
  
  if (!adminProfile) {
    try {
      // Create admin profile for the user
      const { data: newProfile, error: createError } = await supabase
        .from("admin_profiles")
        .insert({
          id: data.user.id,
          email: data.user.email,
          full_name: data.user.user_metadata?.full_name || data.user.email,
          role: 'admin',
          is_active: true
        })
        .select()
        .single()
      
      if (createError) {
        console.error('Error creating admin profile:', createError)
        // If table doesn't exist, redirect to setup page
        if (createError.code === 'PGRST205') {
          redirect("/admin/setup-required")
        }
        redirect("/admin/unauthorized")
      }
      
      adminProfile = newProfile
    } catch (error) {
      console.error('Unexpected error:', error)
      redirect("/admin/unauthorized")
    }
  }

  if (!adminProfile.is_active) {
    redirect("/admin/unauthorized")
  }

  // Get dashboard stats
  const [toolsCount, categoriesCount, reviewsCount, clicksCount] = await Promise.all([
    supabase.from("tools").select("id", { count: "exact" }),
    supabase.from("categories").select("id", { count: "exact" }),
    supabase.from("reviews").select("id", { count: "exact" }),
    supabase.from("affiliate_clicks").select("id", { count: "exact" }),
  ])

  const stats = {
    tools: toolsCount.count || 0,
    categories: categoriesCount.count || 0,
    reviews: reviewsCount.count || 0,
    clicks: clicksCount.count || 0,
  }

  return <AdminDashboard stats={stats} user={data.user} adminProfile={adminProfile} />
}
