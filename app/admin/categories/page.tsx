import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminLayout } from "@/components/admin/admin-layout"
import { CategoriesManager } from "@/components/admin/categories-manager"

export default async function AdminCategoriesPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/admin/login")
  }

  const { data: categories } = await supabase
    .from("categories")
    .select(`
      *,
      tools:tools(count)
    `)
    .order("name")

  return (
    <AdminLayout>
      <CategoriesManager categories={categories || []} />
    </AdminLayout>
  )
}
