import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Sparkles, TrendingUp, Shield } from "lucide-react"

export function Hero() {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Discover the Future of AI</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Find the Perfect AI Tool for Every Task
        </h1>

        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Compare features, pricing, and reviews of 1000+ AI tools. Make informed decisions with our comprehensive
          database and expert insights.
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for AI writing tools, image generators, chatbots..."
              className="pl-12 pr-4 py-6 text-lg rounded-xl border-2 focus:border-primary"
            />
            <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-lg">Search</Button>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button asChild size="lg" className="rounded-xl">
            <Link href="/tools">Browse All Tools</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-xl bg-transparent">
            <Link href="/categories">Explore Categories</Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <div className="text-2xl font-bold">1000+</div>
            <div className="text-muted-foreground">AI Tools Listed</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <div className="text-2xl font-bold">50K+</div>
            <div className="text-muted-foreground">Verified Reviews</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <div className="text-2xl font-bold">25+</div>
            <div className="text-muted-foreground">Categories</div>
          </div>
        </div>
      </div>
    </section>
  )
}
