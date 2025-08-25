import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminLayout } from "./admin-layout"
import { Package, Tags, Star, MousePointer, BarChart3 } from "lucide-react"

interface AdminDashboardProps {
  stats: {
    tools: number
    categories: number
    reviews: number
    clicks: number
  }
  user: any
  adminProfile: any
}

export function AdminDashboard({ stats, user, adminProfile }: AdminDashboardProps) {
  const statCards = [
    {
      title: "Total Tools",
      value: stats.tools,
      description: "AI tools in database",
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "Categories",
      value: stats.categories,
      description: "Tool categories",
      icon: Tags,
      color: "text-green-600",
    },
    {
      title: "Reviews",
      value: stats.reviews,
      description: "User reviews",
      icon: Star,
      color: "text-yellow-600",
    },
    {
      title: "Affiliate Clicks",
      value: stats.clicks,
      description: "Total clicks tracked",
      icon: MousePointer,
      color: "text-purple-600",
    },
  ]

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {adminProfile.full_name || user.email}!</h1>
          <p className="text-muted-foreground mt-2">Here's what's happening with your AI tools platform.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5" />
                <span>Manage Tools</span>
              </CardTitle>
              <CardDescription>Add, edit, and organize AI tools</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5" />
                <span>Review Moderation</span>
              </CardTitle>
              <CardDescription>Approve and manage user reviews</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Analytics</span>
              </CardTitle>
              <CardDescription>View traffic and performance metrics</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New tool added: ChatGPT</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Review approved for DALL-E 3</p>
                  <p className="text-xs text-muted-foreground">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Category updated: AI Writing Tools</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
