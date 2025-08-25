"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash2, Search } from "lucide-react"

interface VendorsManagerProps {
  vendors: any[]
}

export function VendorsManager({ vendors }: VendorsManagerProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedVendor, setSelectedVendor] = useState<any>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const filteredVendors = vendors.filter((vendor) =>
    vendor.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Vendors Management</h1>
          <p className="text-muted-foreground">Manage AI tool vendors and companies</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Vendor
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search vendors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Vendors Table */}
      <Card>
        <CardHeader>
          <CardTitle>Vendors ({filteredVendors.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Website</TableHead>
                <TableHead>Founded</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {vendor.logo_url ? (
                        <img
                          src={vendor.logo_url}
                          alt={vendor.name}
                          className="h-8 w-8 rounded object-cover"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-medium">{vendor.name.charAt(0)}</span>
                        </div>
                      )}
                      <span className="font-medium">{vendor.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="text-sm bg-muted px-2 py-1 rounded">{vendor.slug}</code>
                  </TableCell>
                  <TableCell>
                    {vendor.website_url ? (
                      <a
                        href={vendor.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Visit
                      </a>
                    ) : (
                      <span className="text-muted-foreground">No website</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {vendor.founded_year || <span className="text-muted-foreground">Unknown</span>}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedVendor(vendor)
                          setIsFormOpen(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={async () => {
                          if (confirm("Are you sure you want to delete this vendor?")) {
                            try {
                              const response = await fetch(`/api/admin/vendors/${vendor.id}`, {
                                method: "DELETE",
                              })
                              if (response.ok) {
                                window.location.reload()
                              } else {
                                const errorData = await response.json()
                                alert(errorData.error || "Failed to delete vendor")
                              }
                            } catch (err) {
                              alert("An error occurred while deleting the vendor")
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
        </CardContent>
      </Card>

      {/* Vendor Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedVendor ? "Edit Vendor" : "Add New Vendor"}</DialogTitle>
          </DialogHeader>
          <VendorForm
            vendor={selectedVendor}
            onClose={() => {
              setIsFormOpen(false)
              setSelectedVendor(null)
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

function VendorForm({ vendor, onClose }: { vendor?: any; onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: vendor?.name || "",
    slug: vendor?.slug || "",
    description: vendor?.description || "",
    website_url: vendor?.website_url || "",
    logo_url: vendor?.logo_url || "",
    founded_year: vendor?.founded_year || "",
    headquarters: vendor?.headquarters || "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleNameChange = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      name,
      slug: !vendor ? generateSlug(name) : prev.slug,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const url = vendor ? `/api/admin/vendors/${vendor.id}` : "/api/admin/vendors"
      const method = vendor ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to save vendor")
      }

      // Refresh the page to show updated data
      window.location.reload()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Vendor Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder="e.g., OpenAI"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">URL Slug *</Label>
        <Input
          id="slug"
          value={formData.slug}
          onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
          placeholder="e.g., openai"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          placeholder="Brief description of the vendor"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="website_url">Website URL</Label>
          <Input
            id="website_url"
            value={formData.website_url}
            onChange={(e) => setFormData((prev) => ({ ...prev, website_url: e.target.value }))}
            placeholder="https://example.com"
            type="url"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="logo_url">Logo URL</Label>
          <Input
            id="logo_url"
            value={formData.logo_url}
            onChange={(e) => setFormData((prev) => ({ ...prev, logo_url: e.target.value }))}
            placeholder="https://example.com/logo.png"
            type="url"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="founded_year">Founded Year</Label>
          <Input
            id="founded_year"
            value={formData.founded_year}
            onChange={(e) => setFormData((prev) => ({ ...prev, founded_year: e.target.value }))}
            placeholder="e.g., 2015"
            type="number"
            min="1800"
            max={new Date().getFullYear()}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="headquarters">Headquarters</Label>
          <Input
            id="headquarters"
            value={formData.headquarters}
            onChange={(e) => setFormData((prev) => ({ ...prev, headquarters: e.target.value }))}
            placeholder="e.g., San Francisco, CA"
          />
        </div>
      </div>

      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
          {error}
        </div>
      )}

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : (vendor ? "Update Vendor" : "Create Vendor")}
        </Button>
      </div>
    </form>
  )
}
