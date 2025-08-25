import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ThumbsUp, ThumbsDown } from "lucide-react"

interface ToolReviewsProps {
  toolId: string
  reviews: any[]
}

export function ToolReviews({ toolId, reviews }: ToolReviewsProps) {
  if (!reviews || reviews.length === 0) {
    return null
  }

  return (
    <div className="max-w-6xl mx-auto px-4 mt-12">
      <Card>
        <CardHeader>
          <CardTitle>User Reviews ({reviews.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-6 last:border-b-0">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium">{review.user_name || "Anonymous"}</span>
                    {review.is_verified && (
                      <Badge variant="secondary" className="text-xs">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {review.title && <h4 className="font-medium mb-2">{review.title}</h4>}

              {review.content && <p className="text-muted-foreground mb-4">{review.content}</p>}

              {(review.pros?.length > 0 || review.cons?.length > 0) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {review.pros?.length > 0 && (
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <ThumbsUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">Pros</span>
                      </div>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {review.pros.map((pro: string, index: number) => (
                          <li key={index}>• {pro}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {review.cons?.length > 0 && (
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <ThumbsDown className="h-4 w-4 text-red-500" />
                        <span className="text-sm font-medium">Cons</span>
                      </div>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {review.cons.map((con: string, index: number) => (
                          <li key={index}>• {con}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
