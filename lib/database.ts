// Database utility functions and types

export interface Tool {
  id: string
  name: string
  slug: string
  description: string
  short_description: string
  logo_url?: string
  website_url?: string
  category_id?: string
  vendor_id?: string
  pricing_model: "free" | "freemium" | "paid" | "enterprise"
  starting_price?: number
  pricing_currency: string
  pricing_period?: "one-time" | "monthly" | "yearly"
  features: string[]
  use_cases: string[]
  integrations: string[]
  supported_platforms: string[]
  api_available: boolean
  free_trial: boolean
  trial_days?: number
  rating?: number
  review_count: number
  is_featured: boolean
  is_published: boolean
  affiliate_url?: string
  affiliate_commission?: number
  meta_title?: string
  meta_description?: string
  created_at: string
  updated_at: string
  category?: Category
  vendor?: Vendor
  pricing_plans?: PricingPlan[]
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  created_at: string
  updated_at: string
}

export interface Vendor {
  id: string
  name: string
  slug: string
  description?: string
  website_url?: string
  logo_url?: string
  founded_year?: number
  headquarters?: string
  created_at: string
  updated_at: string
}

export interface PricingPlan {
  id: string
  tool_id: string
  name: string
  price?: number
  currency: string
  billing_period: "monthly" | "yearly" | "one-time"
  features: string[]
  limits: Record<string, any>
  is_popular: boolean
  order_index: number
  created_at: string
}

export interface Review {
  id: string
  tool_id: string
  user_name?: string
  user_email?: string
  rating: number
  title?: string
  content?: string
  pros: string[]
  cons: string[]
  is_verified: boolean
  is_published: boolean
  helpful_count: number
  created_at: string
  updated_at: string
}

export interface Comparison {
  id: string
  title: string
  slug: string
  description?: string
  tool_ids: string[]
  is_published: boolean
  view_count: number
  meta_title?: string
  meta_description?: string
  created_at: string
  updated_at: string
  tools?: Tool[]
}

export interface AffiliateClick {
  id: string
  tool_id: string
  user_ip?: string
  user_agent?: string
  referrer?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  clicked_at: string
}

// Database query helpers
export const DATABASE_QUERIES = {
  // Tools queries
  GET_PUBLISHED_TOOLS: `
    SELECT t.*, c.name as category_name, c.slug as category_slug, 
           v.name as vendor_name, v.slug as vendor_slug
    FROM tools t
    LEFT JOIN categories c ON t.category_id = c.id
    LEFT JOIN vendors v ON t.vendor_id = v.id
    WHERE t.is_published = true
    ORDER BY t.is_featured DESC, t.rating DESC, t.created_at DESC
  `,

  GET_TOOL_BY_SLUG: `
    SELECT t.*, c.name as category_name, c.slug as category_slug,
           v.name as vendor_name, v.slug as vendor_slug
    FROM tools t
    LEFT JOIN categories c ON t.category_id = c.id
    LEFT JOIN vendors v ON t.vendor_id = v.id
    WHERE t.slug = $1 AND t.is_published = true
  `,

  GET_TOOLS_BY_CATEGORY: `
    SELECT t.*, c.name as category_name, c.slug as category_slug,
           v.name as vendor_name, v.slug as vendor_slug
    FROM tools t
    LEFT JOIN categories c ON t.category_id = c.id
    LEFT JOIN vendors v ON t.vendor_id = v.id
    WHERE c.slug = $1 AND t.is_published = true
    ORDER BY t.is_featured DESC, t.rating DESC
  `,

  // Reviews queries
  GET_TOOL_REVIEWS: `
    SELECT * FROM reviews
    WHERE tool_id = $1 AND is_published = true
    ORDER BY created_at DESC
    LIMIT $2 OFFSET $3
  `,

  // Categories queries
  GET_ALL_CATEGORIES: `
    SELECT c.*, COUNT(t.id) as tool_count
    FROM categories c
    LEFT JOIN tools t ON c.id = t.category_id AND t.is_published = true
    GROUP BY c.id
    ORDER BY c.name
  `,

  // Pricing plans queries
  GET_TOOL_PRICING: `
    SELECT * FROM pricing_plans
    WHERE tool_id = $1
    ORDER BY order_index, price ASC
  `,

  // Search query
  SEARCH_TOOLS: `
    SELECT t.*, c.name as category_name, c.slug as category_slug,
           v.name as vendor_name, v.slug as vendor_slug,
           ts_rank(to_tsvector('english', t.name || ' ' || t.description), plainto_tsquery('english', $1)) as rank
    FROM tools t
    LEFT JOIN categories c ON t.category_id = c.id
    LEFT JOIN vendors v ON t.vendor_id = v.id
    WHERE t.is_published = true
    AND (
      to_tsvector('english', t.name || ' ' || t.description) @@ plainto_tsquery('english', $1)
      OR t.name ILIKE '%' || $1 || '%'
      OR t.description ILIKE '%' || $1 || '%'
    )
    ORDER BY rank DESC, t.is_featured DESC, t.rating DESC
  `,
} as const
