"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Plus } from "lucide-react"

interface ToolFormProps {
  tool?: any
  categories: any[]
  vendors: any[]
  onClose: () => void
}

export function ToolForm({ tool, categories, vendors, onClose }: ToolFormProps) {
  const [formData, setFormData] = useState({
    name: tool?.name || "",
    slug: tool?.slug || "",
    short_description: tool?.short_description || "",
    description: tool?.description || "",
    logo_url: tool?.logo_url || "",
    website_url: tool?.website_url || "",
    category_id: tool?.category_id || "",
    vendor_id: tool?.vendor_id || "",
    pricing_model: tool?.pricing_model || "freemium",
    starting_price: tool?.starting_price || "",
    pricing_currency: tool?.pricing_currency || "USD",
    pricing_period: tool?.pricing_period || "monthly",
    features: tool?.features || [],
    use_cases: tool?.use_cases || [],
    integrations: tool?.integrations || [],
    supported_platforms: tool?.supported_platforms || [],
    api_available: tool?.api_available || false,
    free_trial: tool?.free_trial || false,
    trial_days: tool?.trial_days || "",
    is_featured: tool?.is_featured || false,
    is_published: tool?.is_published || true,
    affiliate_url: tool?.affiliate_url || "",
    affiliate_commission: tool?.affiliate_commission || "",
    meta_title: tool?.meta_title || "",
    meta_description: tool?.meta_description || "",
  })

  const [newFeature, setNewFeature] = useState("")
  const [newUseCase, setNewUseCase] = useState("")
  const [newIntegration, setNewIntegration] = useState("")
  const [newPlatform, setNewPlatform] = useState("")

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addArrayItem = (field: string, value: string, setter: (value: string) => void) => {
    if (value.trim()) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], value.trim()],
      }))
      setter("")
    }
  }

  const removeArrayItem = (field: string, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_: any, i: number) => i !== index),
    }))
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleNameChange = (name: string) => {
    handleInputChange("name", name)
    if (!tool) {
      // Auto-generate slug for new tools
      handleInputChange("slug", generateSlug(name))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement save functionality
    console.log("Saving tool:", formData)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Tool Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g., ChatGPT"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => handleInputChange("slug", e.target.value)}
                placeholder="e.g., chatgpt"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="short_description">Short Description *</Label>
            <Input
              id="short_description"
              value={formData.short_description}
              onChange={(e) => handleInputChange("short_description", e.target.value)}
              placeholder="Brief one-line description"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Full Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Detailed description of the tool"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="logo_url">Logo URL</Label>
              <Input
                id="logo_url"
                value={formData.logo_url}
                onChange={(e) => handleInputChange("logo_url", e.target.value)}
                placeholder="https://example.com/logo.png"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website_url">Website URL</Label>
              <Input
                id="website_url"
                value={formData.website_url}
                onChange={(e) => handleInputChange("website_url", e.target.value)}
                placeholder="https://example.com"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categorization */}
      <Card>
        <CardHeader>
          <CardTitle>Categorization</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category_id} onValueChange={(value) => handleInputChange("category_id", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vendor">Vendor</Label>
              <Select value={formData.vendor_id} onValueChange={(value) => handleInputChange("vendor_id", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vendor" />
                </SelectTrigger>
                <SelectContent>
                  {vendors.map((vendor) => (
                    <SelectItem key={vendor.id} value={vendor.id}>
                      {vendor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing */}
      <Card>
        <CardHeader>
          <CardTitle>Pricing Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pricing_model">Pricing Model</Label>
              <Select
                value={formData.pricing_model}
                onValueChange={(value) => handleInputChange("pricing_model", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="freemium">Freemium</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="starting_price">Starting Price</Label>
              <Input
                id="starting_price"
                type="number"
                step="0.01"
                value={formData.starting_price}
                onChange={(e) => handleInputChange("starting_price", e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pricing_period">Billing Period</Label>
              <Select
                value={formData.pricing_period}
                onValueChange={(value) => handleInputChange("pricing_period", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                  <SelectItem value="one-time">One-time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="free_trial"
                checked={formData.free_trial}
                onCheckedChange={(checked) => handleInputChange("free_trial", checked)}
              />
              <Label htmlFor="free_trial">Free Trial Available</Label>
            </div>
            {formData.free_trial && (
              <div className="space-y-2">
                <Input
                  type="number"
                  value={formData.trial_days}
                  onChange={(e) => handleInputChange("trial_days", e.target.value)}
                  placeholder="Trial days"
                  className="w-32"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>Features & Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Key Features</Label>
            <div className="flex gap-2">
              <Input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Add a feature"
                onKeyPress={(e) => e.key === "Enter" && addArrayItem("features", newFeature, setNewFeature)}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => addArrayItem("features", newFeature, setNewFeature)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.features.map((feature: string, index: number) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {feature}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeArrayItem("features", index)} />
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Use Cases</Label>
            <div className="flex gap-2">
              <Input
                value={newUseCase}
                onChange={(e) => setNewUseCase(e.target.value)}
                placeholder="Add a use case"
                onKeyPress={(e) => e.key === "Enter" && addArrayItem("use_cases", newUseCase, setNewUseCase)}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => addArrayItem("use_cases", newUseCase, setNewUseCase)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.use_cases.map((useCase: string, index: number) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {useCase}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeArrayItem("use_cases", index)} />
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="api_available"
                checked={formData.api_available}
                onCheckedChange={(checked) => handleInputChange("api_available", checked)}
              />
              <Label htmlFor="api_available">API Available</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="is_featured"
                checked={formData.is_featured}
                onCheckedChange={(checked) => handleInputChange("is_featured", checked)}
              />
              <Label htmlFor="is_featured">Featured Tool</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="is_published"
                checked={formData.is_published}
                onCheckedChange={(checked) => handleInputChange("is_published", checked)}
              />
              <Label htmlFor="is_published">Published</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Actions */}
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">{tool ? "Update Tool" : "Create Tool"}</Button>
      </div>
    </form>
  )
}
