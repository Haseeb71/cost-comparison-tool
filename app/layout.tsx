import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { StructuredData } from "@/components/seo/structured-data"
import { generateWebsiteSchema, generateOrganizationSchema } from "@/lib/seo"

export const metadata: Metadata = {
  title: {
    default: "AI Tools Hub - Compare & Discover the Best AI Tools",
    template: "%s | AI Tools Hub",
  },
  description:
    "Discover, compare, and find the perfect AI tools for your needs. Comprehensive reviews, pricing, and features comparison for 1000+ AI tools.",
  keywords: [
    "AI tools",
    "artificial intelligence",
    "AI software",
    "machine learning tools",
    "AI comparison",
    "AI directory",
    "ChatGPT alternatives",
    "AI writing tools",
    "AI image generators",
    "AI chatbots",
  ],
  authors: [{ name: "AI Tools Hub Team" }],
  creator: "AI Tools Hub",
  publisher: "AI Tools Hub",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://aitoolshub.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aitoolshub.com",
    siteName: "AI Tools Hub",
    title: "AI Tools Hub - Compare & Discover the Best AI Tools",
    description:
      "Discover, compare, and find the perfect AI tools for your needs. Comprehensive reviews, pricing, and features comparison.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Tools Hub - Compare & Discover the Best AI Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@aitoolshub",
    creator: "@aitoolshub",
    title: "AI Tools Hub - Compare & Discover the Best AI Tools",
    description:
      "Discover, compare, and find the perfect AI tools for your needs. Comprehensive reviews, pricing, and features comparison.",
    images: ["/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const websiteSchema = generateWebsiteSchema()
  const organizationSchema = generateOrganizationSchema()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
        <StructuredData data={[websiteSchema, organizationSchema]} />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
