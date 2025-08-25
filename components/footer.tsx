import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">AI</span>
              </div>
              <span className="font-bold text-xl">AI Tools Hub</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Discover, compare, and find the perfect AI tools for your needs. Stay ahead with the latest AI
              innovations.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Tools */}
          <div className="space-y-4">
            <h3 className="font-semibold">Tools</h3>
            <div className="space-y-2 text-sm">
              <Link href="/tools" className="block text-muted-foreground hover:text-foreground transition-colors">
                All Tools
              </Link>
              <Link
                href="/categories/ai-writing-tools"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                AI Writing
              </Link>
              <Link
                href="/categories/ai-image-generators"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Image Generators
              </Link>
              <Link
                href="/categories/ai-chatbots"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Chatbots
              </Link>
              <Link
                href="/categories/ai-code-assistants"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Code Assistants
              </Link>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold">Company</h3>
            <div className="space-y-2 text-sm">
              <Link href="/about" className="block text-muted-foreground hover:text-foreground transition-colors">
                About Us
              </Link>
              <Link href="/blog" className="block text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
              <Link href="/contact" className="block text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
              <Link href="/submit" className="block text-muted-foreground hover:text-foreground transition-colors">
                Submit Tool
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">Get weekly updates on new AI tools and features.</p>
            <div className="space-y-2">
              <Input placeholder="Enter your email" />
              <Button className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© 2024 AI Tools Hub. All rights reserved.</p>
          <div className="flex space-x-6 text-sm text-muted-foreground mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-foreground transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
