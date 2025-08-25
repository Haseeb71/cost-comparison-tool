"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ComparisonTable } from "@/components/comparison-table"
import { ToolSelector } from "@/components/tool-selector"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, X } from "lucide-react"

export default function ComparePage() {
  const searchParams = useSearchParams()
  const [selectedTools, setSelectedTools] = useState<string[]>([])

  useEffect(() => {
    const toolsParam = searchParams.get("tools")
    if (toolsParam) {
      setSelectedTools(toolsParam.split(","))
    }
  }, [searchParams])

  const addTool = (toolId: string) => {
    if (!selectedTools.includes(toolId) && selectedTools.length < 4) {
      setSelectedTools([...selectedTools, toolId])
    }
  }

  const removeTool = (toolId: string) => {
    setSelectedTools(selectedTools.filter((id) => id !== toolId))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Compare AI Tools</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select up to 4 AI tools to compare their features, pricing, and capabilities side by side.
            </p>
          </div>

          {selectedTools.length === 0 ? (
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-center">Get Started</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground mb-6">
                  Search and select AI tools to start comparing them.
                </p>
                <ToolSelector onSelect={addTool} />
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              <div className="flex flex-wrap items-center gap-4 justify-center">
                <span className="text-sm font-medium">Selected Tools ({selectedTools.length}/4):</span>
                {selectedTools.map((toolId) => (
                  <div key={toolId} className="flex items-center gap-2 bg-primary/10 rounded-full px-3 py-1">
                    <span className="text-sm">Tool {toolId}</span>
                    <Button variant="ghost" size="sm" onClick={() => removeTool(toolId)}>
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                {selectedTools.length < 4 && (
                  <ToolSelector
                    onSelect={addTool}
                    excludeIds={selectedTools}
                    trigger={
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Tool
                      </Button>
                    }
                  />
                )}
              </div>

              <ComparisonTable toolIds={selectedTools} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
