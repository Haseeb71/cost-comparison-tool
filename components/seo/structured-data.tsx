"use client"

import Script from "next/script"

interface StructuredDataProps {
  data: any[]
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <>
      {data.map((item, index) => (
        <Script
          key={index}
          id={`structured-data-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item),
          }}
        />
      ))}
    </>
  )
}
