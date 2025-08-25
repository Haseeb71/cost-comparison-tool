import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminLayout } from "@/components/admin/admin-layout"
import { VendorsManager } from "@/components/admin/vendors-manager"

export default async function AdminVendorsPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/admin/login")
  }

  // Get vendors
  const { data: vendors } = await supabase
    .from("vendors")
    .select("*")
    .order("name")

  return (
    <AdminLayout>
      <VendorsManager vendors={vendors || []} />
    </AdminLayout>
  )
}
