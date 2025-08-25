"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { generateSessionId, setTrackingCookie, getTrackingCookie } from "@/lib/affiliate-tracking"

interface AffiliateLinkProps {
  toolId: string
  toolName: string
  websiteUrl: string
  affiliateUrl?: string
  className?: string
  children?: React.ReactNode
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "default" | "lg"
}

export function AffiliateLink({
  toolId,
  toolName,
  websiteUrl,
  affiliateUrl,
  className = "",
  children,
  variant = "default",
  size = "default",
}: AffiliateLinkProps) {
  const [isTracking, setIsTracking] = useState(false)

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    setIsTracking(true)

    try {
      // Get or create session ID
      let sessionId = getTrackingCookie()
      if (!sessionId) {
        sessionId = generateSessionId()
        setTrackingCookie(sessionId)
      }

      // Track the click
      const response = await fetch("/api/affiliate/click", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          toolId,
          sessionId,
          referrer: window.location.href,
        }),
      })

      const data = await response.json()

      if (data.success && data.targetUrl) {
        // Open the affiliate/website URL
        window.open(data.targetUrl, "_blank", "noopener,noreferrer")
      } else {
        // Fallback to direct URL
        window.open(affiliateUrl || websiteUrl, "_blank", "noopener,noreferrer")
      }
    } catch (error) {
      console.error("Error tracking affiliate click:", error)
      // Fallback to direct URL
      window.open(affiliateUrl || websiteUrl, "_blank", "noopener,noreferrer")
    } finally {
      setIsTracking(false)
    }
  }

  return (
    <Button variant={variant} size={size} className={className} onClick={handleClick} disabled={isTracking}>
      {children || (
        <>
          <ExternalLink className="h-4 w-4 mr-2" />
          {isTracking ? "Opening..." : `Visit ${toolName}`}
        </>
      )}
    </Button>
  )
}
