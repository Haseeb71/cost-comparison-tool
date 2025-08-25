"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ToolForm } from "./tool-form"
import { Search, Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react"

interface ToolsManagerProps {
  tools: any[]
  categories: any[]
  vendors: any[]
}

export function ToolsManager({ tools, categories, vendors }: ToolsManagerProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTool, setSelectedTool] = useState<any>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const filteredTools = tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.vendor?.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleEditTool = (tool: any) => {
    setSelectedTool(tool)
    setIsFormOpen(true)
  }

  const handleAddTool = () => {
    setSelectedTool(null)
    setIsFormOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Tools Management</h1>
          <p className="text-muted-foreground">Manage AI tools, pricing, and features</p>
        </div>
        <Button onClick={handleAddTool}>
          <Plus className="h-4 w-4 mr-2" />
          Add Tool
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tools by name, category, or vendor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tools Table */}
      <Card>
        <CardHeader>
          <CardTitle>Tools ({filteredTools.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tool</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Pricing</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTools.map((tool) => (
                  <TableRow key={tool.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        {tool.logo_url ? (
                          <img
                            src={tool.logo_url || "/placeholder.svg"}
                            alt={tool.name}
                            className="h-8 w-8 rounded object-cover"
                          />
                        ) : (
                          <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center">
                            <span className="text-xs font-medium">{tool.name.charAt(0)}</span>
                          </div>
                        )}
                        <div>
                          <div className="font-medium">{tool.name}</div>
                          <div className="text-sm text-muted-foreground truncate max-w-48">
                            {tool.short_description}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {tool.category ? (
                        <Badge variant="secondary">{tool.category.name}</Badge>
                      ) : (
                        <span className="text-muted-foreground">No category</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {tool.vendor ? tool.vendor.name : <span className="text-muted-foreground">No vendor</span>}
                    </TableCell>
                    <TableCell>
                      <Badge variant={tool.pricing_model === "free" ? "default" : "outline"}>
                        {tool.pricing_model === "free"
                          ? "Free"
                          : tool.starting_price
                            ? `$${tool.starting_price}`
                            : tool.pricing_model}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {tool.is_published ? (
                          <Eye className="h-4 w-4 text-green-500" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="text-sm">{tool.is_published ? "Published" : "Draft"}</span>
                        {tool.is_featured && (
                          <Badge variant="default" className="text-xs">
                            Featured
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {tool.rating ? (
                        <div className="flex items-center space-x-1">
                          <span className="font-medium">{tool.rating}</span>
                          <span className="text-muted-foreground text-sm">({tool.review_count})</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">No rating</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEditTool(tool)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={async () => {
                            if (confirm("Are you sure you want to delete this tool?")) {
                              try {
                                const response = await fetch(`/api/admin/tools/${tool.id}`, {
                                  method: "DELETE",
                                })
                                if (response.ok) {
                                  window.location.reload()
                                } else {
                                  const errorData = await response.json()
                                  alert(errorData.error || "Failed to delete tool")
                                }
                              } catch (err) {
                                alert("An error occurred while deleting the tool")
                              }
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Tool Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedTool ? "Edit Tool" : "Add New Tool"}</DialogTitle>
          </DialogHeader>
          <ToolForm
            tool={selectedTool}
            categories={categories}
            vendors={vendors}
            onClose={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
