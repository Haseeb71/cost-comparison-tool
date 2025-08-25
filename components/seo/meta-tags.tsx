import Head from "next/head"
import { generateOpenGraphTags, generateTwitterCardTags } from "@/lib/seo"

interface MetaTagsProps {
  title: string
  description: string
  canonical?: string
  image?: string
  noindex?: boolean
  keywords?: string[]
  author?: string
  publishedTime?: string
  modifiedTime?: string
  type?: string
}

export function MetaTags({
  title,
  description,
  canonical,
  image,
  noindex = false,
  keywords = [],
  author,
  publishedTime,
  modifiedTime,
  type = "website",
}: MetaTagsProps) {
  const ogTags = generateOpenGraphTags({
    title,
    description,
    url: canonical || "",
    image,
    type,
  })

  const twitterTags = generateTwitterCardTags({
    title,
    description,
    image,
  })

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(", ")} />}
      {author && <meta name="author" content={author} />}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Robots */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      {Object.entries(ogTags).map(([property, content]) => (
        <meta key={property} property={property} content={content} />
      ))}

      {/* Twitter Card */}
      {Object.entries(twitterTags).map(([name, content]) => (
        <meta key={name} name={name} content={content} />
      ))}

      {/* Article specific */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Favicon and Icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Theme Color */}
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
    </Head>
  )
}
