"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { TrendingUp, MousePointer, DollarSign, Target, Download } from "lucide-react"

interface AffiliateAnalyticsProps {
  data: {
    clicks: any[]
    conversions: any[]
    revenue: any[]
  }
}

export function AffiliateAnalytics({ data }: AffiliateAnalyticsProps) {
  const [period, setPeriod] = useState("30d")

  // Calculate metrics
  const totalClicks = data.clicks.length
  const totalConversions = data.conversions.length
  const conversionRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0
  const totalRevenue = data.revenue.reduce((sum, item) => sum + (item.conversion_value || 0), 0)
  const totalCommission = data.revenue.reduce((sum, item) => sum + (item.commission_amount || 0), 0)

  // Prepare chart data (simplified)
  const chartData = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000)
    const dateStr = date.toISOString().split("T")[0]

    const dayClicks = data.clicks.filter((click) => click.clicked_at.startsWith(dateStr)).length

    const dayConversions = data.conversions.filter((conversion) => conversion.converted_at.startsWith(dateStr)).length

    return {
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      clicks: dayClicks,
      conversions: dayConversions,
    }
  })

  const exportData = () => {
    // Simple CSV export
    const csvContent = [
      ["Date", "Clicks", "Conversions", "Conversion Rate"],
      ...chartData.map((row) => [
        row.date,
        row.clicks,
        row.conversions,
        row.clicks > 0 ? ((row.conversions / row.clicks) * 100).toFixed(2) + "%" : "0%",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `affiliate-analytics-${period}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Affiliate Analytics</h1>
          <p className="text-muted-foreground">Track clicks, conversions, and revenue</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={exportData}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClicks.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Affiliate link clicks</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversions</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalConversions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Successful conversions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate.toFixed(2)}%</div>
            <p className="text-xs text-muted-foreground">Click to conversion rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commission Earned</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCommission.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Total commission earned</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Clicks Over Time</CardTitle>
            <CardDescription>Daily affiliate link clicks</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="clicks" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Trend</CardTitle>
            <CardDescription>Daily conversions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="conversions" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Tools */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Tools</CardTitle>
          <CardDescription>Tools with the most clicks and conversions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tool</TableHead>
                <TableHead>Clicks</TableHead>
                <TableHead>Conversions</TableHead>
                <TableHead>Conversion Rate</TableHead>
                <TableHead>Commission</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div className="font-medium">ChatGPT</div>
                  <div className="text-sm text-muted-foreground">AI Chatbot</div>
                </TableCell>
                <TableCell>1,234</TableCell>
                <TableCell>56</TableCell>
                <TableCell>
                  <Badge variant="secondary">4.54%</Badge>
                </TableCell>
                <TableCell>$280.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="font-medium">DALL-E 3</div>
                  <div className="text-sm text-muted-foreground">AI Image Generator</div>
                </TableCell>
                <TableCell>987</TableCell>
                <TableCell>43</TableCell>
                <TableCell>
                  <Badge variant="secondary">4.36%</Badge>
                </TableCell>
                <TableCell>$215.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="font-medium">GitHub Copilot</div>
                  <div className="text-sm text-muted-foreground">AI Code Assistant</div>
                </TableCell>
                <TableCell>756</TableCell>
                <TableCell>32</TableCell>
                <TableCell>
                  <Badge variant="secondary">4.23%</Badge>
                </TableCell>
                <TableCell>$160.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
