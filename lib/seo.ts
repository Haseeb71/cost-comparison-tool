import type { Tool, Category, Review } from "./database"

// SEO utility functions
export function generateMetaTitle(title: string, suffix = "AI Tools Hub"): string {
  return `${title} | ${suffix}`
}

export function generateMetaDescription(description: string, maxLength = 160): string {
  if (description.length <= maxLength) return description
  return description.substring(0, maxLength - 3).trim() + "..."
}

export function generateCanonicalUrl(path: string, baseUrl = "https://aitoolshub.com"): string {
  return `${baseUrl}${path}`
}

// Schema.org structured data generators
export function generateWebsiteSchema(baseUrl = "https://aitoolshub.com") {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AI Tools Hub",
    description: "Discover, compare, and find the perfect AI tools for your needs",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    sameAs: [
      "https://twitter.com/aitoolshub",
      "https://linkedin.com/company/aitoolshub",
      "https://github.com/aitoolshub",
    ],
  }
}

export function generateOrganizationSchema(baseUrl = "https://aitoolshub.com") {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AI Tools Hub",
    description: "The ultimate directory for AI tools and software",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "hello@aitoolshub.com",
    },
    sameAs: [
      "https://twitter.com/aitoolshub",
      "https://linkedin.com/company/aitoolshub",
      "https://github.com/aitoolshub",
    ],
  }
}

export function generateSoftwareApplicationSchema(tool: Tool, baseUrl = "https://aitoolshub.com") {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description || tool.short_description,
    url: tool.website_url,
    applicationCategory: tool.category?.name || "AI Software",
    operatingSystem: tool.supported_platforms?.join(", ") || "Web",
    offers: [],
  }

  // Add logo if available
  if (tool.logo_url) {
    schema.image = tool.logo_url
  }

  // Add developer/vendor information
  if (tool.vendor) {
    schema.author = {
      "@type": "Organization",
      name: tool.vendor.name,
      url: tool.vendor.website_url,
    }
  }

  // Add pricing information
  if (tool.pricing_plans && tool.pricing_plans.length > 0) {
    schema.offers = tool.pricing_plans.map((plan: any) => ({
      "@type": "Offer",
      name: plan.name,
      price: plan.price || 0,
      priceCurrency: plan.currency || "USD",
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 1 year from now
      availability: "https://schema.org/InStock",
    }))
  } else if (tool.starting_price) {
    schema.offers = [
      {
        "@type": "Offer",
        price: tool.starting_price,
        priceCurrency: tool.pricing_currency || "USD",
        priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        availability: "https://schema.org/InStock",
      },
    ]
  } else if (tool.pricing_model === "free") {
    schema.offers = [
      {
        "@type": "Offer",
        price: 0,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
    ]
  }

  // Add rating if available
  if (tool.rating && tool.review_count > 0) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: tool.rating,
      reviewCount: tool.review_count,
      bestRating: 5,
      worstRating: 1,
    }
  }

  // Add features
  if (tool.features && tool.features.length > 0) {
    schema.featureList = tool.features
  }

  return schema
}

export function generateReviewSchema(review: Review, tool: Tool, baseUrl = "https://aitoolshub.com") {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "SoftwareApplication",
      name: tool.name,
      url: tool.website_url,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    name: review.title,
    reviewBody: review.content,
    author: {
      "@type": "Person",
      name: review.user_name || "Anonymous",
    },
    datePublished: review.created_at,
    publisher: {
      "@type": "Organization",
      name: "AI Tools Hub",
      url: baseUrl,
    },
  }
}

export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  }
}

export function generateCollectionPageSchema(category: Category, tools: Tool[], baseUrl = "https://aitoolshub.com") {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name} - AI Tools Hub`,
    description: category.description,
    url: `${baseUrl}/categories/${category.slug}`,
    mainEntity: {
      "@type": "ItemList",
      name: category.name,
      description: category.description,
      numberOfItems: tools.length,
      itemListElement: tools.map((tool, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "SoftwareApplication",
          name: tool.name,
          description: tool.short_description,
          url: `${baseUrl}/tools/${tool.slug}`,
          image: tool.logo_url,
        },
      })),
    },
  }
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

// Open Graph helpers
export function generateOpenGraphTags(data: {
  title: string
  description: string
  url: string
  image?: string
  type?: string
}) {
  return {
    "og:title": data.title,
    "og:description": data.description,
    "og:url": data.url,
    "og:type": data.type || "website",
    "og:site_name": "AI Tools Hub",
    "og:image": data.image || "/og-image.png",
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:image:alt": data.title,
  }
}

// Twitter Card helpers
export function generateTwitterCardTags(data: {
  title: string
  description: string
  image?: string
  card?: string
}) {
  return {
    "twitter:card": data.card || "summary_large_image",
    "twitter:site": "@aitoolshub",
    "twitter:creator": "@aitoolshub",
    "twitter:title": data.title,
    "twitter:description": data.description,
    "twitter:image": data.image || "/twitter-image.png",
    "twitter:image:alt": data.title,
  }
}
