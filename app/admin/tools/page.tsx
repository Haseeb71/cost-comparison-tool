import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminLayout } from "@/components/admin/admin-layout"
import { ToolsManager } from "@/components/admin/tools-manager"

export default async function AdminToolsPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/admin/login")
  }

  // Get tools with relations
  const { data: tools } = await supabase
    .from("tools")
    .select(`
      *,
      category:categories(id, name, slug),
      vendor:vendors(id, name, slug)
    `)
    .order("created_at", { ascending: false })

  // Get categories and vendors for dropdowns
  const [{ data: categories }, { data: vendors }] = await Promise.all([
    supabase.from("categories").select("*").order("name"),
    supabase.from("vendors").select("*").order("name"),
  ])

  return (
    <AdminLayout>
      <ToolsManager tools={tools || []} categories={categories || []} vendors={vendors || []} />
    </AdminLayout>
  )
}
