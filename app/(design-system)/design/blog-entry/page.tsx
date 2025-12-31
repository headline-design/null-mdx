import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

const categories = ["All", "Engineering", "Design", "Product", "Company"]

const featuredPost = {
  title: "Introducing our new design system",
  description:
    "A comprehensive guide to our refreshed visual language and component library that powers all our products.",
  date: "December 20, 2024",
  readTime: "8 min read",
  author: "Sarah Chen",
  category: "Design",
  image: "/abstract-dark-gradient-product-launch.jpg",
  href: "#",
}

const posts = [
  {
    title: "Building performant React applications",
    description: "Learn the techniques and patterns we use to build fast, responsive user interfaces.",
    date: "December 18, 2024",
    readTime: "6 min read",
    author: "Alex Rivera",
    category: "Engineering",
    href: "#",
  },
  {
    title: "Our approach to product development",
    description: "How we balance user needs, business goals, and technical constraints.",
    date: "December 15, 2024",
    readTime: "5 min read",
    author: "Jordan Lee",
    category: "Product",
    href: "#",
  },
  {
    title: "Scaling our infrastructure",
    description: "The architectural decisions that helped us grow to millions of users.",
    date: "December 12, 2024",
    readTime: "10 min read",
    author: "Morgan Kim",
    category: "Engineering",
    href: "#",
  },
  {
    title: "Designing for accessibility",
    description: "Making our products usable by everyone, regardless of ability.",
    date: "December 10, 2024",
    readTime: "7 min read",
    author: "Taylor Park",
    category: "Design",
    href: "#",
  },
]

export default function BlogEntryPage() {
  return (
    <>
      <main className="flex-1">
        {/* Hero */}
        <section className="py-12 md:py-16 border-b border-border">
          <div className="container max-w-6xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">Blog</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Insights, tutorials, and updates from our team. Learn how we build products and solve problems.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="py-6 border-b border-border sticky top-16 bg-background/95 backdrop-blur z-40">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category, i) => (
                <Button key={category} variant={i === 0 ? "default" : "outline"} size="sm" className="shrink-0">
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-12 border-b border-border">
          <div className="container max-w-6xl mx-auto px-4">
            <Link href={featuredPost.href} className="group block">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-muted">
                  <Image
                    src={featuredPost.image || "/placeholder.svg"}
                    alt={featuredPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <Badge className="mb-4">{featuredPost.category}</Badge>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground mb-4">{featuredPost.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {featuredPost.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-12">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              {posts.map((post) => (
                <Link key={post.title} href={post.href} className="group block">
                  <article className="h-full p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors">
                    <Badge variant="secondary" className="mb-3">
                      {post.category}
                    </Badge>
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">{post.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{post.author}</span>
                      <span>·</span>
                      <span>{post.date}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button variant="outline" className="gap-2 bg-transparent">
                Load more posts
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-12 border-t border-border">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-foreground mb-3">Subscribe to our newsletter</h2>
              <p className="text-muted-foreground mb-6">
                Get the latest posts delivered straight to your inbox. No spam, unsubscribe anytime.
              </p>
              <form className="flex gap-3">
                <Input type="email" placeholder="Enter your email" className="flex-1" />
                <Button type="submit">Subscribe</Button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
