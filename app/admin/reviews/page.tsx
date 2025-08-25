import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminLayout } from "@/components/admin/admin-layout"
import { ReviewsManager } from "@/components/admin/reviews-manager"

export default async function AdminReviewsPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/admin/login")
  }

  const { data: reviews } = await supabase
    .from("reviews")
    .select(`
      *,
      tool:tools(id, name, slug)
    `)
    .order("created_at", { ascending: false })

  return (
    <AdminLayout>
      <ReviewsManager reviews={reviews || []} />
    </AdminLayout>
  )
}
