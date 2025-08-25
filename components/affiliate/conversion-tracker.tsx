"use client"

import { useEffect } from "react"
import { getTrackingCookie } from "@/lib/affiliate-tracking"

interface ConversionTrackerProps {
  toolId?: string
  conversionType: "signup" | "trial" | "purchase" | "subscription"
  conversionValue?: number
  metadata?: Record<string, any>
}

export function ConversionTracker({ toolId, conversionType, conversionValue, metadata }: ConversionTrackerProps) {
  useEffect(() => {
    const trackConversion = async () => {
      const sessionId = getTrackingCookie()
      if (!sessionId || !toolId) return

      try {
        await fetch("/api/affiliate/conversion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessionId,
            toolId,
            conversionType,
            conversionValue,
            metadata,
          }),
        })
      } catch (error) {
        console.error("Error tracking conversion:", error)
      }
    }

    trackConversion()
  }, [toolId, conversionType, conversionValue, metadata])

  return null // This component doesn't render anything
}
