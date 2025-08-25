// Affiliate tracking utilities and types

export interface AffiliateClick {
  toolId: string
  userId?: string
  sessionId: string
  userIp?: string
  userAgent?: string
  referrer?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmTerm?: string
  utmContent?: string
  country?: string
  device?: string
  browser?: string
  os?: string
}

export interface AffiliateConversion {
  clickId: string
  toolId: string
  conversionValue?: number
  conversionType: "signup" | "trial" | "purchase" | "subscription"
  metadata?: Record<string, any>
}

// Generate unique session ID
export function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Parse UTM parameters from URL
export function parseUTMParameters(url: string): Record<string, string> {
  const urlObj = new URL(url)
  const params: Record<string, string> = {}

  const utmParams = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]
  utmParams.forEach((param) => {
    const value = urlObj.searchParams.get(param)
    if (value) {
      params[param] = value
    }
  })

  return params
}

// Get device information from user agent
export function parseUserAgent(userAgent: string) {
  const device = /Mobile|Android|iPhone|iPad/.test(userAgent) ? "mobile" : "desktop"

  let browser = "unknown"
  if (userAgent.includes("Chrome")) browser = "chrome"
  else if (userAgent.includes("Firefox")) browser = "firefox"
  else if (userAgent.includes("Safari")) browser = "safari"
  else if (userAgent.includes("Edge")) browser = "edge"

  let os = "unknown"
  if (userAgent.includes("Windows")) os = "windows"
  else if (userAgent.includes("Mac")) os = "macos"
  else if (userAgent.includes("Linux")) os = "linux"
  else if (userAgent.includes("Android")) os = "android"
  else if (userAgent.includes("iOS")) os = "ios"

  return { device, browser, os }
}

// Build affiliate URL with tracking parameters
export function buildAffiliateUrl(
  baseUrl: string,
  toolId: string,
  sessionId: string,
  utmParams?: Record<string, string>,
): string {
  const url = new URL(baseUrl)

  // Add tracking parameters
  url.searchParams.set("ref", "aitoolshub")
  url.searchParams.set("tool_id", toolId)
  url.searchParams.set("session_id", sessionId)

  // Add UTM parameters if provided
  if (utmParams) {
    Object.entries(utmParams).forEach(([key, value]) => {
      url.searchParams.set(key, value)
    })
  }

  return url.toString()
}

// Calculate commission based on tool settings
export function calculateCommission(
  conversionValue: number,
  commissionRate: number,
  commissionType: "percentage" | "fixed" = "percentage",
): number {
  if (commissionType === "fixed") {
    return commissionRate
  }
  return (conversionValue * commissionRate) / 100
}

// Validate affiliate click data
export function validateAffiliateClick(data: Partial<AffiliateClick>): boolean {
  return !!(data.toolId && data.sessionId)
}

// Generate affiliate report data
export interface AffiliateReport {
  period: string
  totalClicks: number
  totalConversions: number
  conversionRate: number
  totalRevenue: number
  totalCommission: number
  topTools: Array<{
    toolId: string
    toolName: string
    clicks: number
    conversions: number
    revenue: number
    commission: number
  }>
  trafficSources: Array<{
    source: string
    clicks: number
    conversions: number
    conversionRate: number
  }>
}

// Cookie utilities for tracking
export const TRACKING_COOKIE_NAME = "ath_session"
export const TRACKING_COOKIE_DURATION = 30 * 24 * 60 * 60 * 1000 // 30 days

export function setTrackingCookie(sessionId: string): void {
  if (typeof document !== "undefined") {
    const expires = new Date(Date.now() + TRACKING_COOKIE_DURATION).toUTCString()
    document.cookie = `${TRACKING_COOKIE_NAME}=${sessionId}; expires=${expires}; path=/; SameSite=Lax`
  }
}

export function getTrackingCookie(): string | null {
  if (typeof document === "undefined") return null

  const cookies = document.cookie.split(";")
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=")
    if (name === TRACKING_COOKIE_NAME) {
      return value
    }
  }
  return null
}
